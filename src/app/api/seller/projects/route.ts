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
      .select("id, role, organization_id")
      .eq("id", user.id)
      .single();

    if (!profile || !profile.organization_id) {
      return NextResponse.json({ projects: [] });
    }

    const { data: projects, error } = await admin
      .from("projects")
      .select("*")
      .eq("seller_id", profile.organization_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Seller Projects Fetch Error]", error);
      return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
    }

    return NextResponse.json({ projects: projects || [] });
  } catch (error: any) {
    console.error("[Seller Projects Exception]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
