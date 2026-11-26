import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { logAuditEvent } from "@/lib/audit";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 30;

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = loginSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const admin = createAdminClient();
    const supabase = createClient();

    // 1. Check if account is locked
    const { data: profile } = await admin
      .from("user_profiles")
      .select("id, role, organization_id, failed_login_count, locked_until")
      .eq("email", email)
      .maybeSingle();

    if (profile?.locked_until) {
      const lockExpiry = new Date(profile.locked_until).getTime();
      const now = Date.now();
      if (lockExpiry > now) {
        const remainingMinutes = Math.ceil((lockExpiry - now) / (60 * 1000));
        await logAuditEvent({
          action: "LOGIN_FAILED",
          userId: profile.id,
          metadata: { reason: "account_locked", email },
        });
        return NextResponse.json(
          {
            error: `Account is temporarily locked due to excessive failed attempts. Please try again in ${remainingMinutes} minute(s).`,
          },
          { status: 423 }
        );
      }
    }

    // 2. Attempt authentication
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.user) {
      // Increment failed count if user exists
      if (profile) {
        const newCount = (profile.failed_login_count || 0) + 1;
        const updates: { failed_login_count: number; locked_until?: string | null } = {
          failed_login_count: newCount,
        };

        if (newCount >= MAX_FAILED_ATTEMPTS) {
          const lockoutDate = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
          updates.locked_until = lockoutDate.toISOString();
        }

        await admin
          .from("user_profiles")
          .update(updates)
          .eq("id", profile.id);
      }

      await logAuditEvent({
        action: "LOGIN_FAILED",
        userId: profile?.id,
        metadata: { email, reason: authError?.message || "auth_failed" },
      });

      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 3. Reset failed login counter on success
    if (profile?.failed_login_count) {
      await admin
        .from("user_profiles")
        .update({ failed_login_count: 0, locked_until: null })
        .eq("id", profile.id);
    }

    // 4. Determine destination based on KYC status and role
    let destination = "/onboarding/kyc";
    let orgData: any = null;

    if (profile?.organization_id) {
      const { data: org } = await admin
        .from("organizations")
        .select("id, kyc_status")
        .eq("id", profile.organization_id)
        .single();
      orgData = org;

      if (org?.kyc_status === "APPROVED") {
        if (profile.role === "SELLER") {
          destination = "/dashboard/seller";
        } else if (profile.role === "BUYER") {
          destination = "/dashboard/buyer";
        } else if (profile.role === "ADMIN") {
          destination = "/admin/kyc";
        }
      } else {
        destination = "/onboarding/kyc/status";
      }
    } else if (profile?.role === "ADMIN") {
      destination = "/admin/kyc";
    }

    await logAuditEvent({
      action: "LOGIN",
      userId: authData.user.id,
      organizationId: profile?.organization_id,
      metadata: { role: profile?.role },
    });

    return NextResponse.json({
      success: true,
      destination,
      role: profile?.role,
      kycStatus: orgData?.kyc_status || null,
    });
  } catch (error: any) {
    console.error("[Login Error]", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
