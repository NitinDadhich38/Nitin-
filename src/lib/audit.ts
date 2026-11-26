import { createAdminClient } from "@/lib/supabase/admin";
import type { AuditAction } from "@/types/auth";
import { headers } from "next/headers";

interface AuditLogOptions {
  action: AuditAction;
  userId?: string | null;
  organizationId?: string | null;
  resource?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Appends an immutable entry to public.audit_log using the admin client.
 * Captures IP address and User-Agent automatically from request headers.
 */
export async function logAuditEvent({
  action,
  userId,
  organizationId,
  resource,
  metadata = {},
}: AuditLogOptions): Promise<void> {
  try {
    const headerList = headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : null;
    const userAgent = headerList.get("user-agent") || null;

    const admin = createAdminClient();
    const { error } = await admin.from("audit_log").insert({
      action,
      user_id: userId || null,
      organization_id: organizationId || null,
      resource: resource || null,
      ip_address: ipAddress,
      user_agent: userAgent,
      metadata,
    });

    if (error) {
      console.error("[AuditLog Error]", error.message);
    }
  } catch (err) {
    // Non-blocking catch to ensure core flows are not halted
    console.error("[AuditLog Exception]", err);
  }
}
