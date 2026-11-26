import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { logAuditEvent } from "@/lib/audit";
import { projectSubmissionSchema } from "@/lib/validations/auth";
import crypto from "crypto";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

    // 2. Fetch user profile & organization
    const { data: profile } = await admin
      .from("user_profiles")
      .select("id, role, organization_id")
      .eq("id", user.id)
      .single();

    if (!profile || !profile.organization_id) {
      return NextResponse.json(
        { error: "You must complete organization onboarding first." },
        { status: 400 }
      );
    }

    if (profile.role !== "SELLER" && profile.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only approved project developers/sellers can list projects." },
        { status: 403 }
      );
    }

    // 3. Verify organization KYC status is APPROVED
    const { data: org } = await admin
      .from("organizations")
      .select("id, legal_name, kyc_status")
      .eq("id", profile.organization_id)
      .single();

    if (!org || org.kyc_status !== "APPROVED") {
      return NextResponse.json(
        {
          error:
            "Your organization KYC verification must be approved before you can list projects on the marketplace.",
        },
        { status: 403 }
      );
    }

    // 4. Validate payload
    const json = await request.json();
    const result = projectSubmissionSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const val = result.data;

    // 5. Generate slug
    const baseSlug = slugify(val.name);
    const uniqueSuffix = crypto.randomBytes(3).toString("hex");
    const slug = `${baseSlug}-${uniqueSuffix}`;

    // Compute USD price if not provided (default ~83 INR/USD)
    const priceInr = val.pricePerCreditInr;
    const priceUsd =
      val.pricePerCreditUsd || Number((priceInr / 83.5).toFixed(2));

    // 6. Insert project in PAUSED status
    const { data: project, error: insertError } = await admin
      .from("projects")
      .insert({
        name: val.name,
        slug,
        developer_name: org.legal_name,
        source_type: "DEVELOPER",
        registry: val.registry,
        registry_project_id: val.registryProjectId,
        project_type: val.projectType,
        country: val.country,
        location: val.location,
        vintage_year: val.vintageYear,
        credits_available: val.creditsAvailable,
        price_per_credit_inr: priceInr,
        price_per_credit_usd: priceUsd,
        short_description: val.shortDescription,
        full_description: val.fullDescription || null,
        methodology: val.methodology || null,
        sdg_tags: val.sdgTags || [],
        verification_status: "VERIFIED",
        status: "PAUSED", // Requires PRAN compliance review to activate
        seller_id: org.id,
        submitted_by: user.id,
        submission_date: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError || !project) {
      console.error("[Project Submission Insert Error]", insertError);
      return NextResponse.json(
        { error: "Failed to create project listing." },
        { status: 500 }
      );
    }

    // 7. Audit log
    await logAuditEvent({
      action: "PROJECT_SUBMIT",
      userId: user.id,
      organizationId: org.id,
      resource: `projects:${project.id}`,
      metadata: {
        projectName: val.name,
        registry: val.registry,
        volume: val.creditsAvailable,
      },
    });

    return NextResponse.json({
      success: true,
      projectId: project.id,
      slug: project.slug,
      message: "Project submitted successfully. It is currently under review by PRAN.",
    });
  } catch (error: any) {
    console.error("[Project Submission Exception]", error);
    return NextResponse.json(
      { error: "Internal server error while submitting project." },
      { status: 500 }
    );
  }
}
