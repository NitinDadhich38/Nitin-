import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { logAuditEvent } from "@/lib/audit";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = registrationSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password, fullName, phone, role } = result.data;
    const origin = new URL(request.url).origin;

    const supabase = createClient();
    const admin = createAdminClient();

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
          phone,
        },
        emailRedirectTo: `${origin}/api/auth/callback?next=/onboarding/kyc`,
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const user = authData.user;
    if (!user) {
      return NextResponse.json(
        { error: "User registration could not be completed." },
        { status: 500 }
      );
    }

    // Provision user_profile row via admin client (bypasses RLS before email verification)
    const { error: profileError } = await admin.from("user_profiles").upsert({
      id: user.id,
      role,
      full_name: fullName,
      email,
      phone: phone || null,
      is_primary_contact: true,
    });

    if (profileError) {
      console.error("[Profile Creation Error]", profileError);
    }

    // Immutable audit log
    await logAuditEvent({
      action: "REGISTER",
      userId: user.id,
      metadata: { role, email },
    });

    return NextResponse.json({
      success: true,
      message:
        "Registration successful. A verification link has been sent to your email.",
      requiresEmailVerification: !authData.session,
    });
  } catch (error: any) {
    console.error("[Registration Error]", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
