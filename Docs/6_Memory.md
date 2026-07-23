# Memory.md — Living Progress Log
### Project: PRAN | Phase 1 Build
### DO NOT create this at the start. Start using it once building begins.
### It keeps the AI updated on progress so it never loses context or makes things up.

---

## 0. HOW THE AI MUST USE THIS FILE

```
READ this file at the START of every session, before building anything.
UPDATE this file at the END of every task, before the session ends.

This file is the AI's memory across chats. Without it, a new session would
re-read the whole codebase or invent things. With it, the AI knows exactly
what exists, what's done, what's in progress, and what NOT to touch.

Keep entries short and factual. This is a log, not an essay.
```

---

## 1. PROJECT SNAPSHOT (update when it changes)

```
Domain:            pranglobal.com   (CONFIRM — earlier docs said pranapp.in)
Stack:             Next.js 14 + TypeScript + Tailwind + shadcn/ui +
                   Supabase + Razorpay + Resend + Vercel
Current phase:     Phase 1
Current stage:     FULL-SITE BUILD (founder: "build whole website, deployable to
                   replace pranglobal.com"). Building all pages w/ static seed
                   data + honest placeholders; wiring forms for keys. Not strict
                   one-task order. Done: Stage 0, Marketplace (listing+detail).
Repo:              github.com/NitinDadhich38/Nitin- (PRIVATE) — code + docs
Live URL:          [Vercel not connected yet]  (old HTML site: pranglobal.com, repo techzedd/codepran — context only)
Supabase project:  [add project ref once created]
Local runtime:     Node 24.18.0 + npm 11.16.0 (installed 2026-07-23)
```

---

## 2. WHAT IS DONE (append after each completed task)

```
FORMAT: [DATE] TASK-ID — one line on what was built + key files touched

FORMAT: [DATE] TASK-ID — one line on what was built + key files touched

--- Log begins below ---

[2026-07-23] TASK 0.1 — Scaffolded Next.js 14.2.35 (TS strict, Tailwind 3.4,
  App Router, src/ dir) in Desktop\PRAN alongside docs. Created folder skeleton
  per Architecture.md §2 (app route groups, components/*, lib, types). Installed
  locked libs: framer-motion 12, @react-three/fiber 8 + drei 9, three, recharts 3,
  @supabase/supabase-js + ssr, razorpay, resend, @react-pdf/renderer 4,
  react-hook-form + zod 4 + @hookform/resolvers, shadcn peers (cva, clsx,
  tailwind-merge, tailwindcss-animate, lucide-react), qrcode. Added lib/utils.ts
  (cn) + components.json (shadcn ready, not themed yet). Blank PRAN homepage +
  metadata. `npm run build` passes. shadcn NOT yet initialized/themed — deferred
  to Task 0.3 (design system).

[2026-07-23] TASK 0.2 — Supabase clients via @supabase/ssr, split into
  src/lib/supabase/{client,server,admin}.ts (browser anon / server+cookies /
  service-role server-only). NOTE: doc said single lib/supabase.ts; used the
  official @supabase/ssr folder split (next/headers can't live in a client
  bundle). Added .env.example with all Architecture §6 vars (server-only ones
  labelled). Build passes. Keys NOT set — founder must create the Supabase
  project and fill .env.local.

[2026-07-23] TASK 0.3 — Design system per Design.md. globals.css tokens (CSS
  vars) + tailwind.config.ts (pran + status palette, fontFamily display/sans/
  mono, type scale, radius btn 8/card 12, container 1280). Fonts: Fraunces
  (next/font/google, --font-display) + Geist local renamed to --font-sans/mono.
  Base UI: components/ui/{button,badge,card,input}.tsx (cva). Logo component
  src/components/shared/logo.tsx built from founder's SVG (emblem #12A33A fixed,
  wordmark currentColor). Style guide at /style-guide (noindex) shows all tokens
  + logo on light/dark. Build passes; /style-guide serves 200, content verified.
  OPEN FOR FOUNDER REVIEW: lock the look; decide logo-green (#12A33A) vs UI
  teal (#0F5F5C). shadcn CLI not initialized (hand-built ui/ instead, cva-based).
  → FOUNDER LOCKED design as-is (teal UI + green logo) 2026-07-23.

[2026-07-23] TASK 0.4 — Global header + footer. src/lib/nav.ts (shared nav
  config, all sitemap routes). site-header.tsx (client): sticky, blur-on-scroll,
  click dropdowns (Carbon Intelligence/Solutions/Resources/About) w/ Esc +
  outside-click close, mobile slide-out drawer, gold Request Demo CTA. Links use
  buttonVariants (no asChild — Radix Slot not installed). site-footer.tsx (navy
  Trust mode): 5 columns + legal row + "not an auditor" disclaimer (lawyer review
  pending). site-chrome.tsx wraps root layout, hides chrome on /admin +
  /style-guide, offsets content pt-16. Homepage upgraded to styled placeholder
  hero. tsc clean; production build passes (/ = 96.1kB). STAGE 0 DONE.
```

---

## 3. WHAT IS IN PROGRESS (only one thing at a time)

```
Currently building: [none — STAGE 0 COMPLETE (0.1–0.4). Next: Stage A, Task A.1
                    (homepage cinematic 3D globe opening)]
Blocked on:         [nothing to write]
Waiting on founder: [create Supabase project + fill .env.local; confirm domain;
                    real project data (Stage B); leadership names/photos for
                    homepage Section 6 + Team; real marketplace stat numbers]
Design:             LOCKED as-is (teal UI + green logo) 2026-07-23
Logo:               received from techzedd/codepran, built as Logo component
```

---

## 4. KEY DECISIONS MADE (so they're never re-litigated or forgotten)

```
- Stack chosen: Next.js + Supabase (simpler for a 2-person AI team than
  the earlier AWS/FastAPI plan).
- Marketplace is escrow-based: money automated via Razorpay, credit
  transfer is manual (seller transfers, admin verifies).
- Certificates say "purchased and retired," never "carbon neutral."
- Calculator uses DEFRA (personal) + GHG Protocol (business) + CEA grid
  factor (India electricity). All factors in lib/emission-factors.ts.
- Phase 1 = website + marketplace + calculator only. AI reporting is
  Phase 4, not now.
- Projects are admin-entered in Phase 1 (no seller self-registration yet).
```

---

## 5. IMPORTANT FILE LOCATIONS (fill in as created)

```
Supabase client:      src/lib/supabase.ts
Config / constants:   src/lib/config.ts
Emission factors:     src/lib/emission-factors.ts
Design tokens:        tailwind.config.ts + src/app/globals.css
Style guide page:     src/app/style-guide/page.tsx
Header/footer:        src/components/shared/
Escrow buy flow:      src/app/api/orders/  +  src/components/marketplace/
Certificate gen:      src/app/api/certificate/
Env template:         .env.example
```

---

## 6. ENVIRONMENT VARIABLES STATUS (which are set)

```
NEXT_PUBLIC_SUPABASE_URL          [ ] set
NEXT_PUBLIC_SUPABASE_ANON_KEY     [ ] set
SUPABASE_SERVICE_ROLE_KEY         [ ] set
RAZORPAY_KEY_ID                   [ ] set
RAZORPAY_KEY_SECRET               [ ] set
RAZORPAY_WEBHOOK_SECRET           [ ] set
RESEND_API_KEY                    [ ] set
PRAN_TEAM_EMAIL                   [ ] set
PRAN_FROM_EMAIL                   [ ] set
NEXT_PUBLIC_SITE_URL              [ ] set
```

---

## 7. KNOWN ISSUES / TODOs (running list)

```
- [ ] Lawyer must review: Terms, Privacy, certificate wording, disclaimers
- [ ] Replace placeholder homepage numbers with real data (lib/config.ts)
- [ ] Add real project photos when provided
- [ ] Add real team photos/bios when provided
- [ ] Confirm emission factor values against latest DEFRA / CEA
- [ ] Verify BRSR/CBAM/CCTS facts against official sources before publishing
- [ ] npm: 5 vulns (1 mod, 4 high) in transitive deps — careful audit pass (do NOT --force)
- [ ] three-mesh-bvh 0.7.8 vs 0.8.0 warning — resolve before building the 3D globe (A.1)
- [x] Design tokens themed in Task 0.3 (hand-built cva components, not shadcn CLI)
- [ ] OPS: never run `npm run build` while `next dev` is live — shared .next dir
      corrupts (Cannot find module './948.js'). Stop dev or use a separate build.
```

---

## 8. THINGS THE AI MUST NOT TOUCH (once built and confirmed)

```
- Once the design system in /style-guide is approved: do not change tokens
  without explicit instruction.
- Once the escrow flow is tested and working: do not refactor its logic
  without explicit instruction.
- Never modify the "purchased and retired" certificate wording.
```

---

## 9. SESSION HANDOFF NOTES (last thing written each session)

```
Last session date:   [date]
Last task completed: [task id]
Next task to start:  [task id]
Anything the next session must know:
  [e.g., "Razorpay is in test mode, switch to live before launch"]
```

---

*Memory.md — PRAN Phase 1 | Read at start, update at end, every session.*
