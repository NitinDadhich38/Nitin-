import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { logAuditEvent } from "@/lib/audit";
import { kycSubmissionSchema } from "@/lib/validations/auth";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const admin = createAdminClient();

    // 1. Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch existing profile
    const { data: profile } = await admin
      .from("user_profiles")
      .select("id, role, organization_id, email, full_name")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "User profile not found." }, { status: 404 });
    }

    // 3. Validate input
    const json = await request.json();
    const result = kycSubmissionSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const {
      entityCategory = "SELLER",
      org,
      business = {},
      bank = {},
      ubos = [],
      uboExemptions = {},
      contacts = {},
      signatories = [],
      regulatoryDeclarations = {},
      registryAccounts = [],
      project = {},
      declaration = {},
      buyerRegistry,
      declarationAccepted,
    } = result.data;

    if (!declarationAccepted) {
      return NextResponse.json(
        { error: "You must accept the legal declaration before submitting." },
        { status: 400 }
      );
    }

    let orgId = profile.organization_id;

    // Compile comprehensive institutional metadata snapshot
    const institutionalSnapshot = {
      entity_category: entityCategory,
      business_details: business,
      bank_details: bank,
      ubo_details: ubos,
      ubo_exemptions: uboExemptions,
      contact_persons: contacts,
      authorized_signatories: signatories,
      regulatory_declarations: regulatoryDeclarations,
      registry_accounts: registryAccounts,
      project_details: project,
      declaration_details: declaration,
    };

    // Base organization payload
    const baseOrgPayload: Record<string, any> = {
      legal_name: org.legalName,
      trade_name: org.tradeName || null,
      registration_type: org.registrationType,
      registration_number: org.registrationNumber || null,
      gstin: org.gstin ? org.gstin.toUpperCase() : null,
      pan: org.pan.toUpperCase(),
      country: org.country,
      state: org.state,
      city: org.city,
      address_line_1: org.addressLine1,
      address_line_2: org.addressLine2 || null,
      pincode: org.pincode,
      website: org.website || null,
      kyc_status: "PENDING",
      kyc_notes: JSON.stringify(institutionalSnapshot), // Fail-safe archival
      updated_at: new Date().toISOString(),
    };

    // Full payload including separate JSONB columns
    const fullOrgPayload = {
      ...baseOrgPayload,
      ...institutionalSnapshot,
    };

    // 4. Create or update organization (resilient to schema migrations)
    if (orgId) {
      // Try full payload first
      let { error: updateError } = await admin
        .from("organizations")
        .update(fullOrgPayload)
        .eq("id", orgId);

      // If failed due to missing columns, fallback to base payload
      if (updateError) {
        console.warn("[Org Update] Retrying with base payload:", updateError.message);
        const retry = await admin
          .from("organizations")
          .update(baseOrgPayload)
          .eq("id", orgId);
        updateError = retry.error;
      }

      if (updateError) {
        console.error("[Org Update Error]", updateError);
        return NextResponse.json(
          { error: "Failed to update organization details: " + updateError.message },
          { status: 500 }
        );
      }
    } else {
      // Try inserting with full payload
      let { data: newOrg, error: createError } = await admin
        .from("organizations")
        .insert(fullOrgPayload)
        .select()
        .single();

      // If failed due to missing columns, fallback to base payload
      if (createError) {
        console.warn("[Org Insert] Retrying with base payload:", createError.message);
        const retry = await admin
          .from("organizations")
          .insert(baseOrgPayload)
          .select()
          .single();
        newOrg = retry.data;
        createError = retry.error;
      }

      if (createError || !newOrg) {
        console.error("[Org Create Error]", createError);
        return NextResponse.json(
          { error: "Failed to create organization profile: " + (createError?.message || "Unknown error") },
          { status: 500 }
        );
      }

      orgId = newOrg.id;
    }

    // 5. Update user profile with org link & registry account details
    const profileUpdates: Record<string, any> = {
      organization_id: orgId,
    };

    if (contacts?.frontOffice?.name) {
      profileUpdates.full_name = contacts.frontOffice.name;
    }
    if (contacts?.frontOffice?.phone) {
      profileUpdates.phone = contacts.frontOffice.phone;
    }
    if (contacts?.frontOffice?.designation) {
      profileUpdates.designation = contacts.frontOffice.designation;
    }

    if (registryAccounts && registryAccounts.length > 0) {
      profileUpdates.preferred_registry = registryAccounts[0].registry;
      profileUpdates.registry_account_id = registryAccounts[0].accountNumber;
      profileUpdates.registry_account_holder = registryAccounts[0].accountName;
    } else if (buyerRegistry) {
      profileUpdates.registry_account_id = buyerRegistry.registryAccountId || null;
      profileUpdates.registry_account_holder = buyerRegistry.registryAccountHolderName || null;
      profileUpdates.preferred_registry = buyerRegistry.preferredRegistry || null;
    }

    const { error: profileUpdateError } = await admin
      .from("user_profiles")
      .update(profileUpdates)
      .eq("id", user.id);

    if (profileUpdateError) {
      console.error("[User Profile Org Link Error]", profileUpdateError);
    }

    // 6. Audit logging
    await logAuditEvent({
      action: "KYC_SUBMIT",
      userId: user.id,
      organizationId: orgId,
      resource: `organizations:${orgId}`,
      metadata: {
        legalName: org.legalName,
        panMasked: `XXXXX${org.pan.slice(-4)}`,
        role: profile.role,
        entityCategory,
      },
    });

    // 7. Admin notification via Resend (optional, non-blocking)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "PRAN Compliance <notifications@pranapp.in>",
          to: ["contact@pranapp.in"],
          subject: `New KYC Application: ${org.legalName} (${profile.role})`,
          text: `A new KYC application has been submitted by ${profile.full_name} (${profile.email}) for organization "${org.legalName}". Please review in the Admin KYC console.`,
        });
      } catch (emailErr) {
        console.error("[Resend Notification Error]", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      organizationId: orgId,
      status: "PENDING",
      message: "KYC submitted successfully and is now queued for compliance verification.",
    });
  } catch (error: any) {
    console.error("[KYC Submit Exception]", error);
    return NextResponse.json(
      { error: "Internal server error while submitting KYC." },
      { status: 500 }
    );
  }
}
