-- PRAN — Migration 003: Institutional KYC Schema Extensions
-- Aligns PRAN database with Indian Carbon Market (ICM), PRAN KYC Form, and Xpansiv CBL Markets standards.
-- Run this in the Supabase SQL Editor.

DO $$
BEGIN
  -- 1. Add entity category (Seller / Buyer / Trader)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'entity_category'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN entity_category TEXT NOT NULL DEFAULT 'SELLER'
        CHECK (entity_category IN ('SELLER', 'BUYER', 'TRADER_BROKER'));
  END IF;

  -- 2. Business nature, turnover, employees, source of funds, public/regulated status
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'business_details'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN business_details JSONB NOT NULL DEFAULT '{}'::jsonb;
  END IF;

  -- 3. Banking & settlement information
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'bank_details'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN bank_details JSONB NOT NULL DEFAULT '{}'::jsonb;
  END IF;

  -- 4. Ultimate Beneficial Owners (UBOs)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'ubo_details'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN ubo_details JSONB NOT NULL DEFAULT '[]'::jsonb;
  END IF;

  -- 5. UBO Exemption checkboxes
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'ubo_exemptions'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN ubo_exemptions JSONB NOT NULL DEFAULT '{}'::jsonb;
  END IF;

  -- 6. Key contacts (Front Office & Back Office)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'contact_persons'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN contact_persons JSONB NOT NULL DEFAULT '{}'::jsonb;
  END IF;

  -- 7. Authorized signatories
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'authorized_signatories'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN authorized_signatories JSONB NOT NULL DEFAULT '[]'::jsonb;
  END IF;

  -- 8. Regulatory, AML & Sanctions declarations
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'regulatory_declarations'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN regulatory_declarations JSONB NOT NULL DEFAULT '{}'::jsonb;
  END IF;

  -- 9. Linked Registry Accounts (Verra, GS, ICR, I-REC, GCC, Puro, etc.)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'registry_accounts'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN registry_accounts JSONB NOT NULL DEFAULT '[]'::jsonb;
  END IF;

  -- 10. Seller Project submission details
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'project_details'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN project_details JSONB NOT NULL DEFAULT '{}'::jsonb;
  END IF;

  -- 11. Statutory declaration info
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'declaration_details'
  ) THEN
    ALTER TABLE public.organizations 
      ADD COLUMN declaration_details JSONB NOT NULL DEFAULT '{}'::jsonb;
  END IF;

END $$;

-- 12. Update kyc_documents check constraint to support all institutional document types
ALTER TABLE public.kyc_documents DROP CONSTRAINT IF EXISTS kyc_documents_document_type_check;
ALTER TABLE public.kyc_documents ADD CONSTRAINT kyc_documents_document_type_check
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
    'SHAREHOLDERS_UBO_LIST',
    'FINANCIAL_STATEMENTS',
    'BUSINESS_LICENSE',
    'PROJECT_DESIGN_DOCUMENT',
    'OTHER'
  ));
