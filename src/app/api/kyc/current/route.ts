import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createClient();
    const admin = createAdminClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await admin
      .from("user_profiles")
      .select("id, role, organization_id, full_name, email, phone, registry_account_id, registry_account_holder, preferred_registry")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    let organization = null;
    let documents: any[] = [];

    if (profile.organization_id) {
      const { data: org } = await admin
        .from("organizations")
        .select("*")
        .eq("id", profile.organization_id)
        .single();
      
      if (org) {
        organization = { ...org };
        // If separate JSONB fields are empty but kyc_notes has snapshot, merge them
        if (org.kyc_notes && (!org.business_details || Object.keys(org.business_details).length === 0)) {
          try {
            const parsed = JSON.parse(org.kyc_notes);
            organization = {
              ...parsed,
              ...organization,
            };
          } catch {
            // Not a JSON string, ignore
          }
        }
      }

      const { data: docs } = await admin
        .from("kyc_documents")
        .select("id, document_type, file_name, file_size_bytes, mime_type, verified, created_at")
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false });
      documents = docs || [];
    }

    return NextResponse.json({
      profile,
      organization,
      documents,
    });
  } catch (error: any) {
    console.error("[Get KYC Current Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
