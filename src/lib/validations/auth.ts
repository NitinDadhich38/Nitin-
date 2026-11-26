/**
 * PRAN — Zod validation schemas for auth, registration, and KYC.
 *
 * Every form submission and API input is validated through these schemas
 * on BOTH client (react-hook-form) and server (API route). If a constraint
 * changes, change it HERE — forms and routes import from this one file.
 *
 * Security note: these schemas are the first line of input sanitization.
 * Supabase parameterized queries prevent SQL injection; Zod prevents
 * malformed data from ever reaching the query.
 */

import { z } from "zod";

// ── Shared patterns ─────────────────────────────────────────────────────

/** PAN format: 5 letters + 4 digits + 1 letter (Indian permanent account number). */
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

/**
 * GSTIN format: 2 digits (state) + PAN (10 chars) + 1 digit + Z + 1 check char.
 * Total 15 characters. Example: 27AAPFU0939F1ZV
 */
const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9][A-Z][0-9A-Z]$/;

/** Indian PIN code: exactly 6 digits, first digit is 1-9. */
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

/**
 * Password policy (financial platform standard):
 * - Minimum 12 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 digit
 * - At least 1 special character
 */
const PASSWORD_MIN_LENGTH = 12;

// ── Registration ────────────────────────────────────────────────────────

export const registerSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address")
    .max(255, "Email is too long"),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    )
    .max(128, "Password is too long")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must include at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must include at least one lowercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must include at least one digit",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: "Password must include at least one special character",
    }),
  confirmPassword: z.string(),
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name is too long"),
  phone: z
    .string()
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  role: z.enum(["BUYER", "SELLER"], {
    message: "Select whether you want to buy or sell",
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and privacy policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;

// ── Login ───────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ── Password Reset ──────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
      )
      .max(128, "Password is too long")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must include at least one uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must include at least one lowercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must include at least one digit",
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "Password must include at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// ── KYC Organization Details ────────────────────────────────────────────

export const kycOrganizationSchema = z.object({
  legal_name: z
    .string()
    .min(2, "Legal name is required")
    .max(500, "Legal name is too long"),
  trade_name: z.string().max(500).optional().or(z.literal("")),
  registration_type: z.enum(
    [
      "PRIVATE_LIMITED",
      "LLP",
      "PARTNERSHIP",
      "SOLE_PROPRIETORSHIP",
      "TRUST",
      "SOCIETY",
      "GOVERNMENT",
      "OTHER",
    ],
    { message: "Select your organization type" },
  ),
  registration_number: z.string().max(50).optional().or(z.literal("")),
  gstin: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || GSTIN_REGEX.test(val),
      "Enter a valid 15-character GSTIN",
    ),
  pan: z
    .string()
    .min(1, "PAN is required")
    .refine((val) => PAN_REGEX.test(val), "Enter a valid 10-character PAN"),
  country: z.string().min(1, "Country is required").default("India"),
  state: z.string().max(100).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  address_line_1: z.string().max(500).optional().or(z.literal("")),
  address_line_2: z.string().max(500).optional().or(z.literal("")),
  pincode: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || PINCODE_REGEX.test(val),
      "Enter a valid 6-digit PIN code",
    ),
  website: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) =>
        !val ||
        /^https?:\/\/.+/.test(val) ||
        /^[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}/.test(val),
      "Enter a valid website URL",
    ),
});

export type KycOrganizationInput = z.infer<typeof kycOrganizationSchema>;

// ── KYC Declaration ─────────────────────────────────────────────────────

export const kycDeclarationSchema = z.object({
  information_accurate: z.literal(true, {
    message: "You must confirm that the information is accurate",
  }),
  authorize_verification: z.literal(true, {
    message: "You must authorize PRAN to verify your information",
  }),
});

export type KycDeclarationInput = z.infer<typeof kycDeclarationSchema>;

// ── File Upload Validation ──────────────────────────────────────────────

/** Allowed MIME types for KYC document uploads. */
export const ALLOWED_DOCUMENT_MIMES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

/** Maximum file size: 10 MB. */
export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;

/** File extensions corresponding to allowed MIME types. */
export const ALLOWED_DOCUMENT_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
] as const;

export const documentUploadSchema = z.object({
  document_type: z.enum([
    "PAN_CARD",
    "GST_CERTIFICATE",
    "CERTIFICATE_OF_INCORPORATION",
    "PARTNERSHIP_DEED",
    "BOARD_RESOLUTION",
    "ADDRESS_PROOF",
    "BANK_STATEMENT",
    "REGISTRY_CERTIFICATE",
    "AUTHORIZED_SIGNATORY_ID",
    "OTHER",
  ]),
});

export type DocumentUploadInput = z.infer<typeof documentUploadSchema>;

// ── Buyer Registry Account ──────────────────────────────────────────────

export const buyerAccountSchema = z.object({
  preferred_registry: z.string().min(1, "Select a registry"),
  registry_account_id: z
    .string()
    .min(1, "Enter your registry account ID")
    .max(100, "Account ID is too long"),
  account_holder_name: z
    .string()
    .min(2, "Account holder name is required")
    .max(200, "Name is too long"),
});

export type BuyerAccountInput = z.infer<typeof buyerAccountSchema>;

// ── Seller Project Submission ───────────────────────────────────────────

export const sellerProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(500, "Project name is too long"),
  registry: z.string().min(1, "Select a registry"),
  registry_project_id: z
    .string()
    .min(1, "Registry project ID is required")
    .max(100, "Project ID is too long"),
  short_description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),
  full_description: z.string().max(10000).optional().or(z.literal("")),
  project_type: z.string().min(1, "Select a project type").max(200),
  methodology: z.string().max(500).optional().or(z.literal("")),
  country: z.string().min(1, "Country is required").max(100),
  location: z.string().max(500).optional().or(z.literal("")),
  vintage_year: z
    .number()
    .int()
    .min(2000, "Vintage year must be 2000 or later")
    .max(2100, "Vintage year is too far in the future"),
  price_per_credit_usd: z
    .number()
    .positive("Price must be positive")
    .max(10000, "Price seems too high — verify")
    .optional(),
  price_per_credit_inr: z
    .number()
    .positive("Price must be positive")
    .max(1000000, "Price seems too high — verify")
    .optional(),
  credits_available: z
    .number()
    .positive("Credits must be positive")
    .max(100_000_000, "Volume seems too high — verify"),
  sdg_tags: z.array(z.number().int().min(1).max(17)).optional(),
});

export type SellerProjectInput = z.infer<typeof sellerProjectSchema>;

// ── Admin KYC Review ────────────────────────────────────────────────────

export const kycReviewSchema = z.object({
  action: z.enum(["APPROVE", "REJECT", "REQUEST_DOCUMENTS", "SUSPEND"]),
  reason: z.string().max(2000).optional().or(z.literal("")),
  notes: z.string().max(5000).optional().or(z.literal("")),
});

export type KycReviewInput = z.infer<typeof kycReviewSchema>;

// ── Aliases & Composite Schemas ─────────────────────────────────────────

export const registrationSchema = registerSchema;
export type RegistrationInput = RegisterInput;

export const buyerRegistrySchema = z.object({
  preferredRegistry: z.string().min(1, "Select a registry"),
  registryAccountId: z.string().min(1, "Enter your registry account ID"),
  registryAccountHolderName: z.string().optional(),
});
export type BuyerRegistryInput = z.infer<typeof buyerRegistrySchema>;

export const projectSubmissionSchema = z.object({
  name: z.string().min(3),
  registry: z.string().min(1),
  registryProjectId: z.string().min(1),
  projectType: z.string().min(1),
  country: z.string().min(1),
  location: z.string().min(1),
  vintageYear: z.number().int(),
  creditsAvailable: z.number().positive(),
  pricePerCreditInr: z.number().positive(),
  pricePerCreditUsd: z.number().positive().optional(),
  methodology: z.string().optional(),
  shortDescription: z.string().min(10),
  fullDescription: z.string().optional(),
  sdgTags: z.array(z.number()).optional(),
});
export type ProjectSubmissionInput = z.infer<typeof projectSubmissionSchema>;

export const institutionalKycSubmissionSchema = z.object({
  entityCategory: z.enum(["SELLER", "BUYER", "TRADER_BROKER"]).default("SELLER"),
  org: z.object({
    legalName: z.string().min(2, "Legal name is required"),
    tradeName: z.string().optional(),
    registrationType: z.enum([
      "PRIVATE_LIMITED",
      "LLP",
      "PARTNERSHIP",
      "SOLE_PROPRIETORSHIP",
      "TRUST",
      "SOCIETY",
      "GOVERNMENT",
      "OTHER",
    ]),
    registrationNumber: z.string().optional(),
    gstin: z.string().optional(),
    pan: z.string().min(1, "PAN is required"),
    country: z.string().default("India"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    addressLine1: z.string().min(1, "Address is required"),
    addressLine2: z.string().optional(),
    pincode: z.string().min(1, "Pincode is required"),
    website: z.string().optional(),
  }),
  business: z.object({
    natureOfBusiness: z.string().optional(),
    turnover: z.string().optional(),
    turnoverCurrency: z.string().default("INR"),
    employeeCount: z.string().optional(),
    dateOfIncorporation: z.string().optional(),
    operatingAddress: z.string().optional(),
    sourceOfFunds: z.enum(["OPERATIONAL", "INVESTOR", "OTHER"]).default("OPERATIONAL"),
    sourceOfFundsDesc: z.string().optional(),
    isPubliclyTraded: z.boolean().default(false),
    stockExchangeCode: z.string().optional(),
    isRegulated: z.boolean().default(false),
    regulatorName: z.string().optional(),
  }).optional(),
  bank: z.object({
    accountName: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    ifscSwift: z.string().optional(),
    currency: z.string().default("INR"),
    branchAddress: z.string().optional(),
    accountType: z.string().default("Current"),
  }).optional(),
  ubos: z.array(z.object({
    fullName: z.string(),
    nationality: z.string(),
    idType: z.string(),
    idNumber: z.string(),
    percentageOwnership: z.string(),
  })).optional(),
  uboExemptions: z.object({
    noNaturalUbo: z.boolean().optional(),
    govtOwned: z.boolean().optional(),
    nonProfit: z.boolean().optional(),
    publiclyListed: z.boolean().optional(),
    otherReason: z.string().optional(),
  }).optional(),
  contacts: z.object({
    frontOffice: z.object({
      name: z.string().optional(),
      designation: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
    }).optional(),
    backOffice: z.object({
      name: z.string().optional(),
      designation: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
    }).optional(),
  }).optional(),
  signatories: z.array(z.object({
    fullName: z.string(),
    designation: z.string(),
    nationality: z.string(),
    idType: z.string(),
    idNumber: z.string(),
    signingAuthority: z.string(),
  })).optional(),
  regulatoryDeclarations: z.object({
    actingOnBehalf: z.boolean().default(false),
    actingOnBehalfDetails: z.string().optional(),
    pepInvolved: z.boolean().default(false),
    pepDetails: z.string().optional(),
    sanctionsSubject: z.boolean().default(false),
    sanctionsDetails: z.string().optional(),
    legalDisputes: z.boolean().default(false),
    legalDisputesDetails: z.string().optional(),
    relatedParty: z.boolean().default(false),
    relatedPartyDetails: z.string().optional(),
  }).optional(),
  registryAccounts: z.array(z.object({
    registry: z.string(),
    accountName: z.string(),
    accountNumber: z.string(),
    authorizedRep: z.string().optional(),
  })).optional(),
  project: z.object({
    projectName: z.string().optional(),
    registry: z.string().optional(),
    registryProjectId: z.string().optional(),
    methodology: z.string().optional(),
    projectType: z.string().optional(),
    location: z.string().optional(),
    creditingPeriod: z.string().optional(),
    estAnnualCredits: z.string().optional(),
    vintageYears: z.string().optional(),
    creditsOffered: z.string().optional(),
  }).optional(),
  declaration: z.object({
    signatoryName: z.string().optional(),
    designation: z.string().optional(),
    date: z.string().optional(),
    accepted: z.boolean().default(true),
  }).optional(),
  buyerRegistry: buyerRegistrySchema.optional(),
  declarationAccepted: z.boolean(),
});

export const kycSubmissionSchema = institutionalKycSubmissionSchema;
export type KycSubmissionInput = z.infer<typeof kycSubmissionSchema>;


