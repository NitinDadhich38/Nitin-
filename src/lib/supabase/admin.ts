import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Privileged Supabase client using the SERVICE ROLE key — bypasses RLS.
 * SERVER-ONLY. Never import this into Client Components or expose the key.
 * Use for admin/order operations that must read or write across all rows
 * (e.g. marking an order paid after server-side Razorpay signature verification).
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
