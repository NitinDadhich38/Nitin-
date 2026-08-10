# Architecture.md — Technical Architecture
### Project: PRAN | Phase 1 Build
### Defines HOW we build: stack, structure, data model, flows.

---

## 0. HOW THE AI MUST USE THIS FILE

```
This document defines the LOCKED technical stack and structure.
Do NOT introduce any framework, library, or service not listed here.
If you think something else is better, ASK — do not substitute silently.
Follow the folder structure exactly. Follow the data model exactly.
```

---

## 1. THE LOCKED TECH STACK

```
LAYER            TOOL                      NOTES
──────────────   ───────────────────────   ─────────────────────────────────
Framework        Next.js 14 (App Router)   Frontend + backend in one
Language         TypeScript                Strict mode on
Styling          Tailwind CSS              Utility classes only
Components        shadcn/ui                 Base component library
Animation        Framer Motion             Scroll reveals, transitions
3D globe          react-three-fiber + drei  Homepage opening only
Charts           recharts                  Calculator + dashboard
Database         Supabase (PostgreSQL)     DB + auth + storage in one
Auth             Supabase Auth             Admin login (Phase 1)
File storage     Supabase Storage          Documents, images, certificates
Payments         Razorpay                  Escrow pay-in + Route later
Email            Resend                    Transactional email
PDF              @react-pdf/renderer       Certificates
Forms            react-hook-form + zod     All forms + validation
Hosting          Vercel                    Deploy from GitHub
Domain           pranglobal.com            Registered/DNS at hosteasy.in.
                                           NOT Cloudflare (corrected 2026-08-09).
```

### How the domain actually works (founder has no hosting background)

```
hosteasy.in  →  keeps the DOMAIN (DNS zone) and the @pranglobal.com MAILBOXES
Vercel       →  runs the Next.js app
Supabase     →  database + auth + file storage

hosteasy CANNOT run this app — it serves PHP, not Node. The old static
HTML/CSS/JS/PHP site in public_html is superseded, but is left in place as a
rollback: flipping the A record back restores it.

GOING LIVE = edit two records in hosteasy's Zone Editor (A for the root,
CNAME for www) to the values Vercel displays. Do NOT change nameservers —
that would break the founder's email. Resend also needs TXT records added
for domain verification; TXT records do not disturb MX.
```

### Libraries NOT to use

```
❌ Redux (use React state / Zustand only if truly needed)
❌ Prisma (use Supabase client directly)
❌ NextAuth (use Supabase Auth)
❌ Firebase (using Supabase)
❌ Any blockchain / web3 library
❌ Any AI SDK in Phase 1 (Claude API comes in Phase 4)
❌ MongoDB or any non-Postgres database
❌ jQuery, Bootstrap, Material UI (Tailwind + shadcn only)
```

---

## 2. FOLDER STRUCTURE (Follow Exactly)

```
src/
├── app/
│   ├── (marketing)/              Public website pages
│   │   ├── page.tsx              Homepage (cinematic)
│   │   ├── intelligence/         Carbon Intelligence hub + 4 sub-pages
│   │   ├── solutions/            Enterprise, Government, Developers, Public
│   │   ├── dashboard/            Carbon Market Dashboard (public data page)
│   │   ├── why-carbon-markets/   Mission page
│   │   ├── about/                Why We Exist, Team, Press
│   │   ├── resources/            Blog, Compliance Library, explainers, glossary
│   │   ├── contact/              Contact / Request Demo
│   │   └── legal/                Terms, Privacy, Compliance
│   ├── marketplace/
│   │   ├── page.tsx              Listing (Bloomberg layout)
│   │   └── [slug]/page.tsx       Project detail
│   ├── calculator/
│   │   └── page.tsx              Personal + Business toggle
│   ├── verify/
│   │   └── [orderId]/page.tsx    Public certificate verification
│   ├── admin/
│   │   ├── projects/             Add, edit, list projects
│   │   ├── orders/               Order management
│   │   └── submissions/          Contact form submissions
│   └── api/
│       ├── orders/               Create order, verify payment, webhook
│       ├── contact/              Contact form handler
│       └── certificate/          Certificate generation
├── components/
│   ├── ui/                       shadcn base components
│   ├── marketing/                Homepage sections, cinematic globe
│   ├── marketplace/              Project cards, filters, detail panel
│   ├── calculator/               Calculator steps, result charts
│   ├── shared/                   Header, footer, nav
│   └── forms/                    Reusable form components
├── lib/
│   ├── supabase.ts               DB client (browser + server)
│   ├── razorpay.ts               Payment helpers
│   ├── resend.ts                 Email helpers
│   ├── emission-factors.ts       ALL calculator factors (cited sources)
│   ├── config.ts                 Placeholder numbers, fees, constants
│   └── utils.ts                  Shared helpers
└── types/
    └── index.ts                  All TypeScript types
```

---

## 3. THE DATA MODEL (Supabase Tables)

```
SCOPE NOTE 2026-08-09 — Only `projects` is built in the current phase, plus
Supabase Auth for a SINGLE admin account and a Storage bucket for project
images/documents. `orders` is DEFERRED with the escrow flow. There are NO
user/buyer/seller/KYC tables in this phase — the founder dropped that scope
on 2026-08-09; the buyer side is handled off-platform.

Until `projects` exists, the marketplace reads static TypeScript from
src/lib/marketplace-data.ts through getProjects()/getProject(). Those two
accessors are the seam: the DB cutover happens inside them and nothing in
the UI changes. Keep the static files afterwards as seed + fallback.

INGEST PATHS into `projects` (admin console, Phase 1.5):
  1. EXCEL IMPORT — primary. Upload sheet → map columns → preview rows →
     commit. PRΛN_Portfolio.xlsx is the reference shape.
  2. MANUAL FORM — one-offs.
  3. GOLD STANDARD PRE-FILL — public API, no key, matched on
     `sustaincert_id` (NOT `id`). Fills description, coords, SDGs,
     methodology, crediting period, est. annual credits.
     ⚠ NO OTHER REGISTRY IS REACHABLE. Verra is Okta-gated, ICR needs a
     token, UCR's domain is parked, CDM is bot-blocked (all probed
     2026-08-01). Never show an auto-fetch affordance for those four.
  ⚠ NO REGISTRY PUBLISHES PROJECT PHOTOS — verified directly. Images come
     from the developer via upload, or the sector stock fallback. Stock
     photos keep hasRealPhoto=false and are never captioned as the site.
```

```
TABLE: projects
  id, name, slug, developer_name, source_type ('DEVELOPER'|'BROKER'|'REGISTRY'),
  short_description, full_description, project_type, registry,
  registry_project_id, methodology, country, location, vintage_year,
  price_per_credit_usd, price_per_credit_inr, credits_available,
  verification_status ('VERIFIED'|'PENDING'), cover_image_url, gallery_urls,
  documents (jsonb), sdg_tags (jsonb), status ('ACTIVE'|'PAUSED'|'SOLD_OUT'),
  created_at

TABLE: orders
  id, order_reference (PRAN-ORD-YYYYMMDD-XXXX), project_id, buyer_name,
  buyer_company, buyer_email, buyer_phone, buyer_registry_account_id,
  quantity, price_per_credit, credit_subtotal, platform_fee, gst_amount,
  total_amount, status (see flow below), razorpay_order_id,
  razorpay_payment_id, agreement_accepted (bool), transfer_proof_url,
  retirement_certificate_url, internal_notes, created_at, updated_at

  ORDER STATUS FLOW (exact values):
  INITIATED → PAYMENT_PENDING → PAYMENT_RECEIVED →
  AWAITING_SELLER_TRANSFER → TRANSFER_PROOF_UPLOADED →
  TRANSFER_VERIFIED → COMPLETED
  Plus: CANCELLED, REFUNDED

TABLE: contact_submissions
  id, name, email, company, phone, message, type ('CONTACT'|'DEMO'),
  created_at

TABLE: calculator_results   (optional, for lead capture)
  id, type ('PERSONAL'|'BUSINESS'), inputs (jsonb), total_tco2e (numeric),
  breakdown (jsonb), email (nullable), created_at
```

### Row Level Security

```
projects              → public can SELECT where status='ACTIVE'; admin full
orders                → admin only
contact_submissions   → admin only (insert allowed from server)
calculator_results    → insert allowed; select admin only
```

---

## 4. THE ESCROW PAYMENT ARCHITECTURE

```
CLIENT                    SERVER (Next.js API)         RAZORPAY
──────                    ────────────────────         ────────
Buy form submit    →      POST /api/orders/create
                          Creates order (PAYMENT_PENDING)
                          Creates Razorpay order       →  returns order_id
Open checkout      ←      returns razorpay order_id
Buyer pays         →      ─────────────────────────────→  processes payment
                          POST /api/orders/verify      ←  payment + signature
                          VERIFY SIGNATURE (server)
                          If valid: PAYMENT_RECEIVED →
                          AWAITING_SELLER_TRANSFER
                          Email PRAN team + buyer
Confirmation       ←      returns success + order_ref

CRITICAL: Payment is only trusted after server-side signature verification.
Signature = HMAC_SHA256(razorpay_order_id + "|" + razorpay_payment_id,
            RAZORPAY_KEY_SECRET). Compare with razorpay_signature.
Never mark an order paid from the browser alone.
```

---

## 5. THE CALCULATOR ARCHITECTURE

```
All emission factors live in ONE file: lib/emission-factors.ts
Each factor has a comment citing source + year. Example structure:

// Source: DEFRA UK GHG Conversion Factors 2024
// Source: India CEA grid emission factor (electricity)
// Source: GHG Protocol Corporate Standard

export const FACTORS = {
  electricity_india_kwh: 0.716,   // kgCO2e per kWh — CEA 2024
  lpg_cylinder: 42.5,             // kgCO2e per 14.2kg cylinder — DEFRA
  petrol_km: 0.170,               // kgCO2e per km — DEFRA
  // ... etc
};

The calculation function must be PURE and testable:
  calculatePersonal(inputs) → { total_tco2e, breakdown }
  calculateBusiness(inputs) → { total_tco2e, scope1, scope2, scope3, breakdown }

PERSONAL inputs: electricity, cooking fuel, vehicle, flights, diet, consumption
BUSINESS inputs: Scope 1 (fuel, fleet), Scope 2 (electricity),
                 Scope 3 (travel, commute, spend-based)

Every result shows the mandatory disclaimer:
"Estimate based on [DEFRA/GHG Protocol] published emission factors.
For regulatory or reporting purposes, a formal third-party assessment
is recommended."
```

---

## 6. ENVIRONMENT VARIABLES

```
Maintain .env.example with every variable (placeholder values):

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          (server only, never exposed)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=                 (server only)
RAZORPAY_WEBHOOK_SECRET=             (server only)
RESEND_API_KEY=                      (server only)
PRAN_TEAM_EMAIL=                     (where order/contact notifications go)
PRAN_FROM_EMAIL=                     (noreply@pranglobal.com)
NEXT_PUBLIC_SITE_URL=                (https://pranglobal.com)

NEVER hard-code any of these values in code. Always read from env.
NEVER commit .env.local. Only .env.example is committed.
```

---

## 7. DEPLOYMENT

```
- Code lives on GitHub (org: pran-global)
- Vercel connects to the GitHub repo, auto-deploys on push to main
- Environment variables set in the Vercel dashboard (not in repo)
- Domain pranglobal.com pointed via Cloudflare → Vercel
- Supabase project hosted (free tier to start)
- Test on a Vercel preview URL before pointing the domain
```

---

## 8. RESPONSIVENESS + PERFORMANCE

```
- Mobile-first. Test every page at 375px width.
- The 3D globe MUST lazy-load and MUST have a static fallback for
  slow connections / low-end devices.
- Images optimized via next/image.
- No layout shift; use skeleton loaders (one consistent style).
```

---

*Architecture.md — PRAN Phase 1 | The stack is locked. Ask before deviating.*
