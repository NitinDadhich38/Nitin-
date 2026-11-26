import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function DashboardPage() {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const { data: profile } = await admin
    .from("user_profiles")
    .select("role, organization_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !profile.organization_id) {
    redirect("/onboarding/kyc");
  }

  const { data: org } = await admin
    .from("organizations")
    .select("kyc_status")
    .eq("id", profile.organization_id)
    .maybeSingle();

  if (!org || org.kyc_status !== "APPROVED") {
    redirect("/onboarding/kyc/status");
  }

  if (profile.role === "SELLER") {
    redirect("/dashboard/seller");
  }

  if (profile.role === "ADMIN") {
    redirect("/admin/kyc");
  }

  redirect("/dashboard/buyer");
}
