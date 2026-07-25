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

[2026-07-24] REDESIGN v2.0 (design system + homepage) — Founder supplied
  5_Design.md v2.0 (replaces all prior design guidance): warm paper base,
  forest+emerald palette, Space Grotesk display / Inter body, full-bleed
  photography with floating cards, banned 3D globe. Rebuilt tailwind.config +
  globals.css tokens (paper #FAF8F4 / forest #0F3D2E / emerald #16A34A; radii
  12/16/24/32; shadow card+float; legacy teal/navy REPOINTED so un-migrated
  pages inherit the palette). Fonts -> Space Grotesk + Inter via next/font.
  button.tsx variants (emerald primary / outline / dark). New lib/config.ts
  (proofStats, derived counts) + lib/images.ts (curated Unsplash photos,
  next.config remotePatterns). Homepage rebuilt to blueprint 4.1 S1-S10: hero
  (floating card, NO globe), proof strip, problem (SVG connect diagram), forest
  marketplace + browser-frame mock + live card row (project-teaser.tsx),
  what-we-do 2x2, for-whom alternating rows, trust mosaic, leadership,
  resources, forest closing CTA. Header/footer restyled to paper/forest.
  DELETED banned globe.tsx + unused mission/intelligence/solutions sections
  (solutions had a "carbon neutral" violation). Fixed Counter bug (framer
  useInView left one stat stuck at 0 -> IntersectionObserver + guaranteed final
  value). Verified in browser: all 10 sections render, real data in cards, no
  console errors, no horizontal overflow, registries stat = 5. NOTE: this
  sandbox has no outbound internet, so next/font/google + Unsplash time out HERE
  (fall back to system font / alt text); both render fine on any machine/Vercel
  with internet. Marketplace/calculator/interior pages NOT yet migrated to v2.0
  layouts (inherit the new palette via repointed tokens, keep old layouts).

[2026-07-25] MARKETPLACE v2.0 + STITCH — Migrated marketplace LISTING (§4.2)
  and DETAIL (§4.3) to v2.0. Listing (marketplace/page.tsx +
  marketplace-browser.tsx): forest header band, overlapping pill type-tabs
  (All/Forestry/Renewable/Blue Carbon/Agriculture/Waste & Biogas/Industrial),
  sticky filter rail (Registry/Country/Max-price slider), card grid using
  ProjectTeaser, live right-hand DataPanel (§3.6) that updates on card hover,
  bottom-sheet mobile filters. Detail ([slug]/page.tsx): full-bleed sector photo
  → overlapping surface card (chips + name + price + "Request to Buy"), two-col
  body (About + escrow steps + compliance note "purchased and retired / does not
  issue credits") with sticky Project-details + Documents("On request") panels,
  related-projects row. Verified in browser: both render, filtering works
  (Forestry -> 5), no console errors, no horizontal overflow. project-card.tsx
  now unused (kept). Kept escrow-compliant "Request to Buy" over the doc's "Buy
  Credits" (PRAN rules win). STITCH: installed google-labs-code/stitch-skills
  (3 plugins: stitch-build/design/utilities) at user level
  (~/.claude/plugins) via `npx plugins add ... --target claude-code`. Skills
  (generate-design, manage-design-system, code-to-design, shadcn-ui, ...) load
  after an agent RESTART and need a Stitch MCP server; not invocable this
  session. BROKEN NAV LINKS still to resolve (nav.ts): /dashboard, /calculator,
  /resources/* (5), /legal/* (3) have no routes yet -> 404.
```

---

## 3. WHAT IS IN PROGRESS (only one thing at a time)

```
Currently building: [none — REDESIGN v2.0 homepage + design system DONE
                    (2026-07-24). 3D globe BANNED/removed. Next: migrate
                    marketplace, calculator, and interior pages to the v2.0
                    layouts in 5_Design.md §4.2–4.5]
Blocked on:         [nothing to write]
Waiting on founder: [create Supabase project + fill .env.local; confirm domain;
                    real project data (Stage B); leadership names/photos for
                    homepage Section 6 + Team; real marketplace stat numbers]
Design:             5_Design.md v2.0 (warm paper / forest / emerald, Space
                    Grotesk display + Inter). Homepage built to it 2026-07-24.
                    (Supersedes the 2026-07-23 teal-UI lock.)
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
