# Phases.md — Build Order (Manageable Steps)
### Project: PRAN | Phase 1 Build
### The AI cannot build everything at once. Build in THIS order.

---

## 0. HOW THE AI MUST USE THIS FILE

```
Build in the exact order below. Each numbered task is a single Claude Code
session. Do not start a task until the previous one is tested and committed.
Do not skip ahead. Do not combine tasks.
After each task: test in the browser, then git commit, then update Memory.md.
```

---

## PHASE 1 OVERVIEW

```
STAGE          WHAT                              WEEK
─────────────  ────────────────────────────────  ──────
Stage 0        Setup + foundation                Day 1-2
Stage A        The website                       Week 1
Stage B        The marketplace                   Week 2
Stage C        The calculator + procurement      Week 3
```

Everything below Stage C (AI reporting, intelligence) is Phase 2-4 and lives
in the separate build playbook — NOT built now.

---

## ⚑ REVISED BUILD ORDER — FOUNDER DECISION 2026-08-09

```
THIS SECTION SUPERSEDES THE STAGE A/B/C ORDER BELOW.
The website (Stage A) and the marketplace UI (B.3/B.4) are already BUILT
against static TypeScript data. The founder has re-sequenced what remains.
```

**What the founder dropped from this phase** (explicitly, 2026-08-09):
buyer/seller self-registration, buyer & seller dashboards, and on-platform
KYC. Reason: "it may make it quite complex, and I may not handle it widely."
The buyer side is managed by the founder off-platform for now. This reverses
nothing that was built — it defers work that had not started.

**What replaces it:** an admin-only project console. The founder onboards
projects *on behalf of* developers, who send details directly.

```
STAGE 1 — CONTENT PASS                                    founder-driven
  The founder reads every page and specifies content changes. No new
  technology. Can run in parallel with everything else.

STAGE 2 — THE CONNECTION LAYER            "so that I can connect to everyone"
  2.1  Buy request → email. "Request to Buy" becomes a real form
       (project pre-filled) that emails the purchase inbox via Resend.
  2.2  Contact form → live PRAN inbox. Route already exists at
       src/app/api/contact/route.ts; needs real keys + delivery.
  2.3  Auto-reply on every submission. Timeframe wording TBC by founder.
  2.4  WhatsApp click-to-chat link + direct email, in footer + /contact.
  2.5  Calculator: verify DEFRA / GHG Protocol / CEA factors against
       current published values, expand business mode to Scope 1/2/3,
       cite every source on-page.
  ★ SHIP STAGE 2 TO THE LIVE DOMAIN. No database needed for any of it.

STAGE 3 — ADMIN PROJECT CONSOLE                     the only DB work now
  3.1  Supabase: `projects` table + Storage bucket + RLS. Founder runs SQL.
  3.2  Admin auth (Supabase Auth, single admin). Server-checked on every
       /admin route — CLAUDE.md hard rule, no exceptions.
  3.3  /admin/projects — list, edit, publish, unpublish, delete.
  3.4  EXCEL IMPORT (the primary path). Upload the developer's sheet,
       map columns, preview every row, then commit. The existing
       PRΛN_Portfolio.xlsx shape is the reference format.
  3.5  Manual single-project form for one-offs.
  3.6  "Fetch from Gold Standard" pre-fill button. GOLD STANDARD ONLY —
       see the registry-access table in Memory.md §2 (2026-08-01 probe).
       Verra / ICR / UCR / CDM have no reachable public API; those fields
       stay manual. Do NOT promise auto-fetch in the UI for them.
  3.7  Cut the marketplace over from static TS to the DB, behind the
       existing getProjects()/getProject() accessors in marketplace-data.ts.
       Static files remain the seed/fallback.

DEFERRED — NOT THIS PHASE
  Razorpay + escrow pay-in, retirement certificates, /verify pages,
  buyer/seller accounts, KYC, seller self-registration. Revisit once
  Stages 1-3 are live and working.
```

**Two constraints that bind the admin console** (both verified, not assumed):

1. **No registry publishes project photography.** Not one. Images come from
   the developer or from the existing sector stock fallback. `hasRealPhoto`
   must stay false for stock — never caption one as the project site.
2. **Registry auto-fetch is Gold Standard only**, matched on GS's
   `sustaincert_id` (NOT their `id`). Re-probe before assuming any other
   registry has opened up.

---

## STAGE 0 — SETUP (Day 1-2)

```
TASK 0.1  Create Next.js 14 project (TypeScript, Tailwind), folder
          structure per Architecture.md, install all locked libraries.
          Confirm dev server runs with a blank homepage.

TASK 0.2  Set up Supabase client (lib/supabase.ts, browser + server).
          Create .env.example with every variable. Tell founder which
          keys to copy and where.

TASK 0.3  Set up the design system (Design.md): Tailwind config, CSS
          variables, fonts via next/font, and a /style-guide page showing
          every color, text style, and button variant. Founder reviews.

TASK 0.4  Build global header + footer per the sitemap. Sticky header
          with scroll blur. Mobile slide-out menu.
```

---

## STAGE A — THE WEBSITE (Week 1)

```
TASK A.1  Homepage Section 0: the 3D globe opening (react-three-fiber).
          Skippable after 2s. Static fallback for slow devices. Three
          text beats + two CTA buttons. TEST ON A PHONE.

TASK A.2  Homepage Sections 1-8: the continuous narrative scroll (Why We
          Exist → Marketplace → Carbon Intelligence → Solutions → Trust →
          Leadership → Resources → Closing CTA). Placeholder numbers in
          lib/config.ts. Styled placeholders, no grey boxes.

TASK A.3  Carbon Intelligence hub page + 4 sub-pages (Procurement, ESG,
          BRSR, CBAM). Informational only in Phase 1 (no working AI yet).

TASK A.4  Solutions pages: Enterprise, Government, Project Developers,
          General Public. Public page uses consumer-fintech tone.

TASK A.5  Why Carbon Markets Matter (mission page).

TASK A.6  Team page structure (placeholder photos/bios — founder fills
          later). Company timeline section.

TASK A.7  Resources: Blog listing, Compliance Library, CCTS explainer,
          Voluntary Market explainer, Glossary. Plain-English summaries
          in PRAN's own words only.

TASK A.8  Carbon Market Dashboard page (static/placeholder data Phase 1,
          designed to feel live). Numbers from lib/config.ts.

TASK A.9  Legal pages: Terms, Privacy, Compliance Framework (placeholder,
          marked "lawyer review needed").

TASK A.10 Contact / Request Demo forms — MUST WORK. Save to Supabase +
          send emails via Resend (team + confirmation). Test end-to-end.

★ END OF STAGE A: Deploy to Vercel, point pranglobal.com. Website is LIVE.
```

---

## STAGE B — THE MARKETPLACE (Week 2)

```
TASK B.1  Create marketplace tables in Supabase (projects, orders) per
          Architecture.md. Set Row Level Security. Founder runs the SQL.

TASK B.2  Admin auth (Supabase Auth) + admin project entry: add, edit,
          pause, delete projects at /admin/projects. Image + document
          upload to Supabase Storage. Explain admin account creation.

TASK B.3  Marketplace listing page (/marketplace): Bloomberg-terminal
          layout — left filters, center listings, right detail panel.
          Real data from DB. Clean empty state if no projects. Responsive.

TASK B.4  Project detail page (/marketplace/[slug]): full info, documents,
          [Buy Credits], SEO meta tags from project data.

TASK B.5  Escrow buy flow (see PRD.md section 6 — the exact 14 steps):
          buy form → order creation → Razorpay pay-in → server-side
          signature verification → status updates → emails. TEST WITH A
          RAZORPAY TEST PAYMENT.

TASK B.6  Admin order management (/admin/orders): view orders, update
          status, upload seller transfer proof, verify, trigger
          certificate. Due-diligence checklist enforced before a project
          goes ACTIVE.

TASK B.7  Retirement certificate PDF (@react-pdf/renderer): factual
          wording only, QR code, cert number. Public verification page at
          /verify/[orderId]. NEVER "carbon neutral."

★ END OF STAGE B: A buyer can purchase via escrow and receive a certificate.
```

---

## STAGE C — CALCULATOR + PROCUREMENT (Week 3)

```
TASK C.1  Emission factors file (lib/emission-factors.ts) with cited
          sources (DEFRA, GHG Protocol, CEA grid factor). Founder confirms
          the actual factor values.

TASK C.2  Calculator page (/calculator) with Personal/Business toggle.
          Personal: consumer-friendly questionnaire. Business: GHG
          Protocol scopes 1/2/3. Live estimate. Pure testable calc
          functions. Result + breakdown chart (recharts). Mandatory
          disclaimer on every result.

TASK C.3  Offset flow after the calculator: recommend matching credit
          quantity from real marketplace projects, reuse the escrow buy
          flow (small volume). Issue the legally-safe certificate.

TASK C.4  "Why we don't say carbon neutral" explainer page/section —
          turns the legal caution into a trust signal.

★ END OF STAGE C: FULL PHASE 1 PLATFORM LIVE — website + marketplace +
  calculator + procurement + certificates. Investor-demoable.
```

---

## WHAT COMES AFTER PHASE 1 (Do NOT build now)

```
PHASE 2 (Weeks 4+):   Marketplace automation, seller self-registration
PHASE 3:              Real-time credit transfer as registry access opens
PHASE 4 (Weeks 4-10): Legal protection layer → Procurement Decision
                      Intelligence → AI ESG/BRSR/CBAM reporting
                      (all with human review checkpoint)

These are documented in the separate "PRAN Complete Build Playbook."
Do not pull them into Phase 1.
```

---

## PROGRESS TRACKER (update as you go)

```
Stage 0:  [x] 0.1  [x] 0.2  [x] 0.3  [x] 0.4
Stage A:  [—] A.1  [x] A.2  [x] A.3  [x] A.4  [x] A.5
          [x] A.6  [x] A.7  [—] A.8  [x] A.9  [~] A.10
Stage B:  [ ] B.1  [ ] B.2  [x] B.3  [x] B.4  [ ] B.5  [ ] B.6  [ ] B.7
Stage C:  [x] C.1  [x] C.2  [ ] C.3  [ ] C.4

  [x] done   [~] partial   [—] cancelled/superseded   [ ] not started

  A.1  CANCELLED — the 3D globe was banned by Design v2.0 (2026-07-24) and
       globe.tsx deleted. three/@react-three remain installed but unused.
  A.8  Superseded — the standalone dashboard page was folded into other pages.
  A.10 PARTIAL — the contact form and its API route exist and validate, but
       no keys are set, so nothing is delivered. Stage 2.2 finishes it.
  B.3/B.4 Built against STATIC TypeScript data, not the DB. Stage 3.7 cuts over.
  C.1/C.2 Calculator built; factor values still need founder/source
       verification — that is Stage 2.5, and it is flagged in §7 of Memory.md.
```

### Revised order tracker (2026-08-09 — the live one)

```
Stage 1 (content):     [ ] founder-driven, ongoing
Stage 2 (connection):  [ ] 2.1  [ ] 2.2  [ ] 2.3  [ ] 2.4  [ ] 2.5
Stage 3 (admin):       [ ] 3.1  [ ] 3.2  [ ] 3.3  [ ] 3.4
                       [ ] 3.5  [ ] 3.6  [ ] 3.7
```

---

*Phases.md — PRAN Phase 1 | One task per session. Test. Commit. Next.*
