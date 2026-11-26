import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { logAuditEvent } from "@/lib/audit";
import type { KycStatus, AuditAction } from "@/types/auth";
import { Resend } from "resend";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminCheck = await verifyAdminAuth();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const orgId = params.id;
    const json = await request.json();
    const { status, reason, notes } = json as {
      status: KycStatus;
      reason?: string;
      notes?: string;
    };

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const admin = createAdminClient();

    // Check organization exists
    const { data: org, error: orgError } = await admin
      .from("organizations")
      .select("id, legal_name, kyc_status")
      .eq("id", orgId)
      .single();

    if (orgError || !org) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    // Update organization status
    const { error: updateError } = await admin
      .from("organizations")
      .update({
        kyc_status: status,
        kyc_reviewed_by: adminCheck.userId,
        kyc_reviewed_at: new Date().toISOString(),
        kyc_rejection_reason: reason || null,
        kyc_notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orgId);

    if (updateError) {
      console.error("[KYC Admin Review Update Error]", updateError);
      return NextResponse.json({ error: "Failed to update review status" }, { status: 500 });
    }

    // Determine audit action
    let auditAction: AuditAction = "KYC_UPDATE";
    if (status === "APPROVED") auditAction = "KYC_APPROVE";
    else if (status === "REJECTED") auditAction = "KYC_REJECT";
    else if (status === "DOCUMENTS_REQUESTED") auditAction = "KYC_REQUEST_DOCS";

    await logAuditEvent({
      action: auditAction,
      userId: adminCheck.userId,
      organizationId: orgId,
      resource: `organizations:${orgId}`,
      metadata: { newStatus: status, reason },
    });

    // Notify organization primary user by email
    const { data: primaryUser } = await admin
      .from("user_profiles")
      .select("email, full_name, role")
      .eq("organization_id", orgId)
      .eq("is_primary_contact", true)
      .maybeSingle();

    if (primaryUser?.email && process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const subject = `PRAN KYC Status Update: ${status}`;
        let bodyText = `Hello ${primaryUser.full_name},\n\nYour organization KYC application for ${org.legal_name} has been updated to: ${status}.\n\n`;

        if (status === "APPROVED") {
          bodyText += `Congratulations! Your organization is verified. You now have full access to trading and project listing on PRAN.\nSign in here: https://pranglobal.com/login`;
        } else if (status === "DOCUMENTS_REQUESTED") {
          bodyText += `Our compliance team requires additional information:\n"${reason || "Please upload updated corporate documentation."}"\nPlease sign in to upload: https://pranglobal.com/onboarding/kyc`;
        } else if (status === "REJECTED") {
          bodyText += `Your application could not be approved due to:\n"${reason || "Documentation mismatch"}"\nPlease contact compliance if you wish to appeal: contact@pranapp.in`;
        }

        await resend.emails.send({
          from: "PRAN Compliance <notifications@pranapp.in>",
          to: [primaryUser.email],
          subject,
          text: bodyText,
        });
      } catch (emailErr) {
        console.error("[Email Notification Error]", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      status,
      message: `Organization KYC updated to ${status}.`,
    });
  } catch (error: any) {
    console.error("[Admin KYC Review Exception]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
