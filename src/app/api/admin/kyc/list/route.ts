import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const adminCheck = await verifyAdminAuth();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const admin = createAdminClient();
    let query = admin
      .from("organizations")
      .select(`
        id,
        legal_name,
        trade_name,
        registration_type,
        pan,
        gstin,
        kyc_status,
        created_at,
        updated_at,
        user_profiles (
          id,
          full_name,
          email,
          role,
          phone
        ),
        kyc_documents (
          id,
          document_type,
          verified
        )
      `)
      .order("created_at", { ascending: false });

    if (status && status !== "ALL") {
      query = query.eq("kyc_status", status);
    }

    const { data: orgs, error } = await query;

    if (error) {
      console.error("[Admin KYC List Error]", error);
      return NextResponse.json({ error: "Failed to load KYC applications" }, { status: 500 });
    }

    return NextResponse.json({ organizations: orgs || [] });
  } catch (error: any) {
    console.error("[Admin KYC List Exception]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
