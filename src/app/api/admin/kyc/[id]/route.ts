import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminCheck = await verifyAdminAuth();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const orgId = params.id;
    const admin = createAdminClient();

    const { data: org, error: orgError } = await admin
      .from("organizations")
      .select("*")
      .eq("id", orgId)
      .single();

    if (orgError || !org) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    const { data: users } = await admin
      .from("user_profiles")
      .select("*")
      .eq("organization_id", orgId);

    const { data: docs } = await admin
      .from("kyc_documents")
      .select("*")
      .eq("organization_id", orgId)
      .order("created_at", { ascending: false });

    let organization = org ? { ...org } : null;
    if (org && org.kyc_notes && (!org.business_details || Object.keys(org.business_details).length === 0)) {
      try {
        const parsed = JSON.parse(org.kyc_notes);
        organization = {
          ...parsed,
          ...organization,
        };
      } catch {
        // Not a JSON string
      }
    }

    return NextResponse.json({
      organization,
      users: users || [],
      documents: docs || [],
    });
  } catch (error: any) {
    console.error("[Get Single KYC Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
