import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { buyerRegistrySchema } from "@/lib/validations/auth";
import { logAuditEvent } from "@/lib/audit";

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
      .select("id, role, organization_id, registry_account_id, registry_account_holder, preferred_registry")
      .eq("id", user.id)
      .single();

    return NextResponse.json({ account: profile });
  } catch (error: any) {
    console.error("[Buyer Account GET Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
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

    const json = await request.json();
    const result = buyerRegistrySchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { preferredRegistry, registryAccountId, registryAccountHolderName } =
      result.data;

    const { error: updateError } = await admin
      .from("user_profiles")
      .update({
        preferred_registry: preferredRegistry,
        registry_account_id: registryAccountId,
        registry_account_holder: registryAccountHolderName,
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("[Buyer Account Update Error]", updateError);
      return NextResponse.json(
        { error: "Failed to update registry account details." },
        { status: 500 }
      );
    }

    await logAuditEvent({
      action: "KYC_UPDATE",
      userId: user.id,
      metadata: {
        actionType: "REGISTRY_ACCOUNT_UPDATED",
        registry: preferredRegistry,
        accountId: registryAccountId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Registry account details updated successfully.",
    });
  } catch (error: any) {
    console.error("[Buyer Account PUT Exception]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
