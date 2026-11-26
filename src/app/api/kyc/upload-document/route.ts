import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { logAuditEvent } from "@/lib/audit";
import type { KycDocumentType } from "@/types/auth";
import crypto from "crypto";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

// Magic bytes validation
function validateMagicBytes(buffer: Buffer, mimeType: string): boolean {
  if (buffer.length < 8) return false;

  // PDF: %PDF (25 50 44 46)
  if (mimeType === "application/pdf") {
    return (
      buffer[0] === 0x25 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x44 &&
      buffer[3] === 0x46
    );
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (mimeType === "image/png") {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    );
  }

  // JPEG: FF D8 FF
  if (mimeType === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  // WebP: RIFF .... WEBP
  if (mimeType === "image/webp") {
    const isRiff =
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46;
    const isWebp =
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50;
    return isRiff && isWebp;
  }

  return false;
}

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const admin = createAdminClient();

    // 1. Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch user profile and verify organization
    const { data: profile } = await admin
      .from("user_profiles")
      .select("id, role, organization_id")
      .eq("id", user.id)
      .single();

    if (!profile || !profile.organization_id) {
      return NextResponse.json(
        { error: "Organization profile must be created before uploading documents." },
        { status: 400 }
      );
    }

    // 3. Parse multipart form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const documentType = formData.get("documentType") as KycDocumentType | null;

    if (!file || !documentType) {
      return NextResponse.json(
        { error: "Both file and documentType are required." },
        { status: 400 }
      );
    }

    // 4. Validate file size and declared MIME type
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds the 10MB limit." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF, JPG, PNG, and WebP are accepted." },
        { status: 400 }
      );
    }

    // 5. Inspect magic bytes for binary integrity
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!validateMagicBytes(buffer, file.type)) {
      return NextResponse.json(
        { error: "File contents do not match the expected format. Upload rejected." },
        { status: 400 }
      );
    }

    // 6. Generate sanitized, randomized storage path
    const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
    const uniqueFileName = `${documentType.toLowerCase()}_${crypto.randomUUID()}.${extension}`;
    const storagePath = `${profile.organization_id}/${uniqueFileName}`;

    // 7. Upload to private Supabase Storage bucket
    const { error: uploadError } = await admin.storage
      .from("kyc-documents")
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("[Storage Upload Error]", uploadError);
      return NextResponse.json(
        { error: "Failed to store document securely. Please try again." },
        { status: 500 }
      );
    }

    // 8. Insert record into kyc_documents table
    let { data: docRecord, error: dbError } = await admin
      .from("kyc_documents")
      .insert({
        organization_id: profile.organization_id,
        document_type: documentType,
        file_url: storagePath,
        file_name: file.name,
        file_size_bytes: file.size,
        mime_type: file.type,
        uploaded_by: user.id,
        verified: false,
      })
      .select()
      .single();

    if (dbError && dbError.message?.includes("document_type")) {
      console.warn("[Document Upload] Retrying with OTHER fallback for constraint:", dbError.message);
      const retry = await admin
        .from("kyc_documents")
        .insert({
          organization_id: profile.organization_id,
          document_type: "OTHER",
          file_url: storagePath,
          file_name: `[${documentType}] ${file.name}`,
          file_size_bytes: file.size,
          mime_type: file.type,
          uploaded_by: user.id,
          verified: false,
          admin_note: `Original Type: ${documentType}`,
        })
        .select()
        .single();
      docRecord = retry.data;
      dbError = retry.error;
    }

    if (dbError || !docRecord) {
      console.error("[KYC Document DB Insert Error]", dbError);
      return NextResponse.json(
        { error: "Failed to record document metadata: " + (dbError?.message || "Unknown error") },
        { status: 500 }
      );
    }

    // 9. Audit event
    await logAuditEvent({
      action: "KYC_DOCUMENT_UPLOAD",
      userId: user.id,
      organizationId: profile.organization_id,
      resource: `kyc_documents:${docRecord.id}`,
      metadata: {
        documentType,
        fileName: file.name,
        fileSize: file.size,
      },
    });

    return NextResponse.json({
      success: true,
      document: {
        id: docRecord.id,
        documentType: docRecord.document_type,
        fileName: docRecord.file_name,
        createdAt: docRecord.created_at,
      },
    });
  } catch (error: any) {
    console.error("[Document Upload Exception]", error);
    return NextResponse.json(
      { error: "Internal server error while processing document." },
      { status: 500 }
    );
  }
}
