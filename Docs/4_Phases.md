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
Stage 0:  [ ] 0.1  [ ] 0.2  [ ] 0.3  [ ] 0.4
Stage A:  [ ] A.1  [ ] A.2  [ ] A.3  [ ] A.4  [ ] A.5
          [ ] A.6  [ ] A.7  [ ] A.8  [ ] A.9  [ ] A.10
Stage B:  [ ] B.1  [ ] B.2  [ ] B.3  [ ] B.4  [ ] B.5  [ ] B.6  [ ] B.7
Stage C:  [ ] C.1  [ ] C.2  [ ] C.3  [ ] C.4
```

---

*Phases.md — PRAN Phase 1 | One task per session. Test. Commit. Next.*
