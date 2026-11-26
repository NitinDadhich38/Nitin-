import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { logAuditEvent } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const adminCheck = await verifyAdminAuth();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get("documentId");

    if (!documentId) {
      return NextResponse.json({ error: "documentId is required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: doc, error: docError } = await admin
      .from("kyc_documents")
      .select("id, organization_id, file_url, file_name, mime_type")
      .eq("id", documentId)
      .single();

    if (docError || !doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Generate 60-second time-limited signed URL
    const { data: signedData, error: signError } = await admin.storage
      .from("kyc-documents")
      .createSignedUrl(doc.file_url, 60);

    if (signError || !signedData?.signedUrl) {
      console.error("[Signed URL Error]", signError);
      return NextResponse.json({ error: "Failed to generate signed document link" }, { status: 500 });
    }

    // Audit log document view
    await logAuditEvent({
      action: "KYC_DOCUMENT_VIEW",
      userId: adminCheck.userId,
      organizationId: doc.organization_id,
      resource: `kyc_documents:${doc.id}`,
      metadata: { fileName: doc.file_name },
    });

    return NextResponse.json({
      signedUrl: signedData.signedUrl,
      fileName: doc.file_name,
      mimeType: doc.mime_type,
    });
  } catch (error: any) {
    console.error("[Doc URL Exception]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
