-- PRAN — Stage U1: User accounts, KYC, and audit trail.
-- Run this AFTER supabase/schema.sql in the Supabase SQL editor.
--
-- TABLES CREATED:
--   1. organizations     — the KYC entity (one per company)
--   2. kyc_documents     — uploaded verification docs (private storage)
--   3. user_profiles     — links auth.users → organizations, holds role
--   4. audit_log         — immutable security trail (append-only)
--
-- ALTERATIONS:
--   - projects gains seller_id, submitted_by, submission_date, admin_review_notes
--
-- STORAGE BUCKETS:
--   - kyc-documents      (private)
--   - seller-project-uploads (private)
--
-- Statements use IF NOT EXISTS / ON CONFLICT DO NOTHING so re-running is safe.
-- Money columns use numeric, never float (CLAUDE.md rule).

-- ── 1. organizations ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.organizations (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Legal identity
  legal_name           TEXT NOT NULL,
  trade_name           TEXT,
  registration_type    TEXT NOT NULL
    CHECK (registration_type IN (
      'PRIVATE_LIMITED', 'LLP', 'PARTNERSHIP',
      'SOLE_PROPRIETORSHIP', 'TRUST', 'SOCIETY',
      'GOVERNMENT', 'OTHER'
    )),
  registration_number  TEXT,
  gstin                TEXT,
  pan                  TEXT NOT NULL,
  country              TEXT NOT NULL DEFAULT 'India',
  state                TEXT,
  city                 TEXT,
  address_line_1       TEXT,
  address_line_2       TEXT,
  pincode              TEXT,
  website              TEXT,

  -- KYC lifecycle
  kyc_status           TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (kyc_status IN (
      'PENDING',
      'DOCUMENTS_REQUESTED',
      'UNDER_REVIEW',
      'APPROVED',
      'REJECTED',
      'SUSPENDED'
    )),
  kyc_reviewed_by      UUID REFERENCES auth.users(id),
  kyc_reviewed_at      TIMESTAMPTZ,
  kyc_rejection_reason TEXT,
  kyc_notes            TEXT,

  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_organizations_kyc_status
  ON public.organizations (kyc_status);
CREATE INDEX IF NOT EXISTS idx_organizations_pan
  ON public.organizations (pan);

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- ── 2. kyc_documents ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.kyc_documents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL
    REFERENCES public.organizations(id) ON DELETE CASCADE,
  document_type   TEXT NOT NULL
    CHECK (document_type IN (
      'PAN_CARD',
      'GST_CERTIFICATE',
      'CERTIFICATE_OF_INCORPORATION',
      'PARTNERSHIP_DEED',
      'BOARD_RESOLUTION',
      'ADDRESS_PROOF',
      'BANK_STATEMENT',
      'REGISTRY_CERTIFICATE',
      'AUTHORIZED_SIGNATORY_ID',
      'OTHER'
    )),
  file_url        TEXT NOT NULL,
  file_name       TEXT NOT NULL,
  file_size_bytes BIGINT,
  mime_type       TEXT,
  uploaded_by     UUID NOT NULL REFERENCES auth.users(id),
  verified        BOOLEAN NOT NULL DEFAULT false,
  admin_note      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_kyc_docs_org
  ON public.kyc_documents (organization_id);

ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;

-- ── 3. user_profiles ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id       UUID REFERENCES public.organizations(id),
  role                  TEXT NOT NULL
    CHECK (role IN ('BUYER', 'SELLER', 'ADMIN')),
  full_name             TEXT NOT NULL,
  email                 TEXT NOT NULL,
  phone                 TEXT,
  designation           TEXT,
  is_primary_contact    BOOLEAN NOT NULL DEFAULT false,

  -- Buyer-specific
  registry_account_id   TEXT,
  preferred_registry    TEXT,

  -- Seller-specific
  bank_account_verified BOOLEAN NOT NULL DEFAULT false,

  -- Security
  email_verified        BOOLEAN NOT NULL DEFAULT false,
  phone_verified        BOOLEAN NOT NULL DEFAULT false,
  last_login_at         TIMESTAMPTZ,
  failed_login_count    INTEGER NOT NULL DEFAULT 0,
  locked_until          TIMESTAMPTZ,

  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_org
  ON public.user_profiles (organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role
  ON public.user_profiles (role);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- ── 4. audit_log ────────────────────────────────────────────────────────
-- APPEND-ONLY: no UPDATE or DELETE policies. No data is ever overwritten.

CREATE TABLE IF NOT EXISTS public.audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id),
  action      TEXT NOT NULL,
  resource    TEXT,
  ip_address  INET,
  user_agent  TEXT,
  metadata    JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_user
  ON public.audit_log (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_action
  ON public.audit_log (action);
CREATE INDEX IF NOT EXISTS idx_audit_created
  ON public.audit_log (created_at);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- ── 5. Alter existing projects table ────────────────────────────────────
-- These columns are new; DO NOTHING if they already exist (idempotent via
-- the IF NOT EXISTS on the table — for columns, Postgres lacks that syntax,
-- so we use a DO block).

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'projects'
      AND column_name = 'seller_id'
  ) THEN
    ALTER TABLE public.projects
      ADD COLUMN seller_id UUID REFERENCES public.organizations(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'projects'
      AND column_name = 'submitted_by'
  ) THEN
    ALTER TABLE public.projects
      ADD COLUMN submitted_by UUID REFERENCES auth.users(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'projects'
      AND column_name = 'submission_date'
  ) THEN
    ALTER TABLE public.projects
      ADD COLUMN submission_date TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'projects'
      AND column_name = 'admin_review_notes'
  ) THEN
    ALTER TABLE public.projects
      ADD COLUMN admin_review_notes TEXT;
  END IF;
END
$$;


-- ══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY POLICIES
-- ══════════════════════════════════════════════════════════════════════════

-- Helper: get the current user's organization_id
-- (used in multiple policies below)

-- ── organizations policies ──────────────────────────────────────────────

-- Users can only SELECT their own org
DROP POLICY IF EXISTS "org_own_read" ON public.organizations;
CREATE POLICY "org_own_read"
  ON public.organizations FOR SELECT TO authenticated
  USING (
    id = (SELECT organization_id FROM public.user_profiles WHERE id = auth.uid())
  );

-- Users can INSERT an org (during KYC signup — they don't have one yet).
-- The insert trigger or server code must link the profile afterward.
DROP POLICY IF EXISTS "org_insert" ON public.organizations;
CREATE POLICY "org_insert"
  ON public.organizations FOR INSERT TO authenticated
  WITH CHECK (true);

-- Users can UPDATE their own org only while KYC is in a mutable state
DROP POLICY IF EXISTS "org_own_update" ON public.organizations;
CREATE POLICY "org_own_update"
  ON public.organizations FOR UPDATE TO authenticated
  USING (
    id = (SELECT organization_id FROM public.user_profiles WHERE id = auth.uid())
    AND kyc_status IN ('PENDING', 'DOCUMENTS_REQUESTED', 'REJECTED')
  );

-- ── kyc_documents policies ──────────────────────────────────────────────

DROP POLICY IF EXISTS "kyc_docs_own_read" ON public.kyc_documents;
CREATE POLICY "kyc_docs_own_read"
  ON public.kyc_documents FOR SELECT TO authenticated
  USING (
    organization_id = (
      SELECT organization_id FROM public.user_profiles WHERE id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "kyc_docs_own_insert" ON public.kyc_documents;
CREATE POLICY "kyc_docs_own_insert"
  ON public.kyc_documents FOR INSERT TO authenticated
  WITH CHECK (
    organization_id = (
      SELECT organization_id FROM public.user_profiles WHERE id = auth.uid()
    )
  );

-- ── user_profiles policies ──────────────────────────────────────────────

-- A user can read only their own profile
DROP POLICY IF EXISTS "profile_own_read" ON public.user_profiles;
CREATE POLICY "profile_own_read"
  ON public.user_profiles FOR SELECT TO authenticated
  USING (id = auth.uid());

-- A user can insert their own profile (signup)
DROP POLICY IF EXISTS "profile_own_insert" ON public.user_profiles;
CREATE POLICY "profile_own_insert"
  ON public.user_profiles FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

-- A user can update only their own profile
DROP POLICY IF EXISTS "profile_own_update" ON public.user_profiles;
CREATE POLICY "profile_own_update"
  ON public.user_profiles FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- ── audit_log policies ──────────────────────────────────────────────────
-- Append-only: insert from server, no client reads (admin uses service role)

DROP POLICY IF EXISTS "audit_insert_only" ON public.audit_log;
CREATE POLICY "audit_insert_only"
  ON public.audit_log FOR INSERT TO authenticated
  WITH CHECK (true);

-- ── projects policies (seller-specific, ADDED to existing policies) ─────

-- Sellers can see their own org's projects regardless of status
DROP POLICY IF EXISTS "projects_seller_own" ON public.projects;
CREATE POLICY "projects_seller_own"
  ON public.projects FOR SELECT TO authenticated
  USING (
    seller_id IS NOT NULL
    AND seller_id = (
      SELECT organization_id FROM public.user_profiles WHERE id = auth.uid()
    )
  );

-- Sellers can insert projects for their own org (always start PAUSED)
DROP POLICY IF EXISTS "projects_seller_insert" ON public.projects;
CREATE POLICY "projects_seller_insert"
  ON public.projects FOR INSERT TO authenticated
  WITH CHECK (
    seller_id = (
      SELECT organization_id FROM public.user_profiles WHERE id = auth.uid()
    )
    AND status = 'PAUSED'
  );

-- Sellers can update their own org's projects while PAUSED
DROP POLICY IF EXISTS "projects_seller_update" ON public.projects;
CREATE POLICY "projects_seller_update"
  ON public.projects FOR UPDATE TO authenticated
  USING (
    seller_id = (
      SELECT organization_id FROM public.user_profiles WHERE id = auth.uid()
    )
    AND status = 'PAUSED'
  );


-- ══════════════════════════════════════════════════════════════════════════
-- STORAGE BUCKETS
-- ══════════════════════════════════════════════════════════════════════════

-- Private bucket for KYC documents — NEVER public
INSERT INTO storage.buckets (id, name, public)
VALUES ('kyc-documents', 'kyc-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Private bucket for raw seller project uploads before admin review
INSERT INTO storage.buckets (id, name, public)
VALUES ('seller-project-uploads', 'seller-project-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- ── KYC documents storage RLS ───────────────────────────────────────────

-- Users can upload to their own org's folder: kyc-documents/{org_id}/*
DROP POLICY IF EXISTS "kyc_storage_insert" ON storage.objects;
CREATE POLICY "kyc_storage_insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'kyc-documents'
    AND (storage.foldername(name))[1] = (
      SELECT organization_id::text
      FROM public.user_profiles WHERE id = auth.uid()
    )
  );

-- Users can read their own org's KYC docs
DROP POLICY IF EXISTS "kyc_storage_select" ON storage.objects;
CREATE POLICY "kyc_storage_select"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'kyc-documents'
    AND (storage.foldername(name))[1] = (
      SELECT organization_id::text
      FROM public.user_profiles WHERE id = auth.uid()
    )
  );

-- ── Seller project uploads storage RLS ──────────────────────────────────

DROP POLICY IF EXISTS "seller_uploads_insert" ON storage.objects;
CREATE POLICY "seller_uploads_insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'seller-project-uploads'
    AND (storage.foldername(name))[1] = (
      SELECT organization_id::text
      FROM public.user_profiles WHERE id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "seller_uploads_select" ON storage.objects;
CREATE POLICY "seller_uploads_select"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'seller-project-uploads'
    AND (storage.foldername(name))[1] = (
      SELECT organization_id::text
      FROM public.user_profiles WHERE id = auth.uid()
    )
  );


-- ══════════════════════════════════════════════════════════════════════════
-- AUTO-UPDATE updated_at TRIGGER
-- ══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_organizations_updated ON public.organizations;
CREATE TRIGGER trg_organizations_updated
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_user_profiles_updated ON public.user_profiles;
CREATE TRIGGER trg_user_profiles_updated
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
