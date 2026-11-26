import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminAuthResult {
  isAdmin: boolean;
  userId?: string;
  userEmail?: string;
}

/**
 * Server-side check verifying the current caller has an authenticated session
 * and is explicitly registered with role === 'ADMIN' in user_profiles.
 */
export async function verifyAdminAuth(): Promise<AdminAuthResult> {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { isAdmin: false };
  }

  const { data: profile } = await admin
    .from("user_profiles")
    .select("id, role, email")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "ADMIN") {
    return { isAdmin: false, userId: user.id };
  }

  return {
    isAdmin: true,
    userId: user.id,
    userEmail: profile.email,
  };
}
