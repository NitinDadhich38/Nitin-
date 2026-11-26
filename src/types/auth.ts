/**
 * PRAN — TypeScript types for the user/KYC/auth system.
 *
 * These mirror the Supabase tables defined in supabase/002_users_kyc.sql
 * exactly. If you add a column there, add it here too — they must never drift.
 *
 * Naming: types use PascalCase, enum-like string unions use SCREAMING_SNAKE.
 */

// ── Registration & Role ─────────────────────────────────────────────────

export type UserRole = "BUYER" | "SELLER" | "ADMIN";

// ── Organization & KYC ──────────────────────────────────────────────────

export type RegistrationType =
  | "PRIVATE_LIMITED"
  | "LLP"
  | "PARTNERSHIP"
  | "SOLE_PROPRIETORSHIP"
  | "TRUST"
  | "SOCIETY"
  | "GOVERNMENT"
  | "OTHER";

export type KycStatus =
  | "PENDING"
  | "DOCUMENTS_REQUESTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED";

export interface Organization {
  id: string;
  legal_name: string;
  trade_name: string | null;
  registration_type: RegistrationType;
  registration_number: string | null;
  gstin: string | null;
  pan: string;
  country: string;
  state: string | null;
  city: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  pincode: string | null;
  website: string | null;
  kyc_status: KycStatus;
  entity_category?: "SELLER" | "BUYER" | "TRADER_BROKER";
  business_details?: Record<string, any>;
  bank_details?: Record<string, any>;
  ubo_details?: any[];
  ubo_exemptions?: Record<string, boolean>;
  contact_persons?: Record<string, any>;
  authorized_signatories?: any[];
  regulatory_declarations?: Record<string, any>;
  registry_accounts?: any[];
  project_details?: Record<string, any>;
  declaration_details?: Record<string, any>;
  kyc_reviewed_by: string | null;
  kyc_reviewed_at: string | null;
  kyc_rejection_reason: string | null;
  kyc_notes: string | null;
  created_at: string;
  updated_at: string;
}

// ── KYC Documents ───────────────────────────────────────────────────────

export type KycDocumentType =
  | "PAN_CARD"
  | "GST_CERTIFICATE"
  | "CERTIFICATE_OF_INCORPORATION"
  | "PARTNERSHIP_DEED"
  | "BOARD_RESOLUTION"
  | "ADDRESS_PROOF"
  | "BANK_STATEMENT"
  | "REGISTRY_CERTIFICATE"
  | "AUTHORIZED_SIGNATORY_ID"
  | "SHAREHOLDERS_UBO_LIST"
  | "FINANCIAL_STATEMENTS"
  | "BUSINESS_LICENSE"
  | "PROJECT_DESIGN_DOCUMENT"
  | "OTHER";

export interface KycDocument {
  id: string;
  organization_id: string;
  document_type: KycDocumentType;
  file_url: string;
  file_name: string;
  file_size_bytes: number | null;
  mime_type: string | null;
  uploaded_by: string;
  verified: boolean;
  admin_note: string | null;
  created_at: string;
}

/** Human-readable labels for each document type — used in forms and admin UI. */
export const KYC_DOCUMENT_LABELS: Record<KycDocumentType, string> = {
  PAN_CARD: "PAN Card of Entity",
  GST_CERTIFICATE: "GST Registration Certificate",
  CERTIFICATE_OF_INCORPORATION: "Certificate of Incorporation / Registration",
  PARTNERSHIP_DEED: "Partnership Deed / Trust Constitution",
  BOARD_RESOLUTION: "Board Resolution / Power of Attorney",
  ADDRESS_PROOF: "Proof of Registered Office Address",
  BANK_STATEMENT: "Bank Statement / Cancelled Cheque",
  REGISTRY_CERTIFICATE: "Carbon / REC Registry Account Proof",
  AUTHORIZED_SIGNATORY_ID: "ID Proof of Authorized Signatories",
  SHAREHOLDERS_UBO_LIST: "List of Shareholders & UBOs (with ID Proof)",
  FINANCIAL_STATEMENTS: "Audited Financial Statements (Last 2 Years)",
  BUSINESS_LICENSE: "Business License / MSME / Trade Certificate",
  PROJECT_DESIGN_DOCUMENT: "Project Design Document (PDD) / Validation Report",
  OTHER: "Other Supporting Document",
};

// ── User Profiles ───────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  organization_id: string | null;
  role: UserRole;
  full_name: string;
  email: string;
  phone: string | null;
  designation: string | null;
  is_primary_contact: boolean;

  // Buyer-specific
  registry_account_id: string | null;
  preferred_registry: string | null;

  // Seller-specific
  bank_account_verified: boolean;

  // Security
  email_verified: boolean;
  phone_verified: boolean;
  last_login_at: string | null;
  failed_login_count: number;
  locked_until: string | null;

  created_at: string;
  updated_at: string;
}

// ── Audit Log ───────────────────────────────────────────────────────────

export type AuditAction =
  | "LOGIN"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "REGISTER"
  | "PASSWORD_RESET"
  | "KYC_SUBMIT"
  | "KYC_UPDATE"
  | "KYC_DOCUMENT_UPLOAD"
  | "KYC_DOCUMENT_VIEW"
  | "KYC_APPROVE"
  | "KYC_REJECT"
  | "KYC_REQUEST_DOCS"
  | "KYC_SUSPEND"
  | "PROJECT_SUBMIT"
  | "PROJECT_UPDATE"
  | "PROJECT_ACTIVATE"
  | "PROJECT_PAUSE"
  | "ACCOUNT_LOCK"
  | "ACCOUNT_UNLOCK";

export interface AuditLogEntry {
  id: string;
  user_id: string | null;
  action: AuditAction;
  resource: string | null;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ── KYC Status Labels & Colors ──────────────────────────────────────────

export const KYC_STATUS_CONFIG: Record<
  KycStatus,
  { label: string; color: "success" | "pending" | "danger" | "info" }
> = {
  PENDING: { label: "Pending Review", color: "pending" },
  DOCUMENTS_REQUESTED: { label: "Documents Requested", color: "info" },
  UNDER_REVIEW: { label: "Under Review", color: "info" },
  APPROVED: { label: "Approved", color: "success" },
  REJECTED: { label: "Rejected", color: "danger" },
  SUSPENDED: { label: "Suspended", color: "danger" },
};

// ── Registry Options ────────────────────────────────────────────────────
// Used in both seller project listing and buyer account setup.

export const REGISTRY_OPTIONS = [
  { value: "gold_standard", label: "Gold Standard" },
  { value: "verra", label: "Verra (VCS)" },
  { value: "icr", label: "Indian Carbon Registry (ICR)" },
  { value: "cdm", label: "Clean Development Mechanism (CDM)" },
  { value: "ucr", label: "Universal Carbon Registry (UCR)" },
  { value: "irec", label: "I-REC" },
] as const;
