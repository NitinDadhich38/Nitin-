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
Current phase:     Phase 1 → "Phase 1.5" (founder re-sequence, 2026-08-09)
Current stage:     Stage 2 (connection layer) is CODE-COMPLETE except 2.3
                   (auto-reply) but NOT LIVE — no .env.local exists on this
                   machine, so nothing actually sends yet. Stage 3 (admin
                   console) has NOT STARTED — src/app/admin is empty but for
                   .gitkeep. Interior page redesign
                   (7_Page_Design_Roadmap.md) is done except /[project]
                   (3.3) and OG images (4.3).
                   DROPPED from this phase: buyer/seller accounts, KYC,
                   seller self-registration, buyer/seller dashboards.
                   DEFERRED: Razorpay/escrow, certificates, /verify.
Branch:            All real work lives on `enhancing` (22 commits ahead of
                   origin/enhancing, unpushed as of 2026-08-16). `main` is
                   frozen at the first redesign commit (ca5519f) — do not
                   treat it as current; it reflects almost none of the app.
Repo:              github.com/NitinDadhich38/Nitin- (PRIVATE) — code + docs
Live URL:          [Vercel not connected yet]  (old HTML site: pranglobal.com, repo techzedd/codepran — context only)
Hosting plan:      hosteasy.in keeps DNS + @pranglobal.com mailboxes.
                   Vercel runs the app. Supabase for the admin DB.
                   hosteasy CANNOT run Next.js (PHP-only shared hosting).
                   Going live = edit A + CNAME records; NEVER nameservers.
Supabase project:  qceolcqitqfcoyzmlkne (connected & keys verified 2026-10-11)
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

[2026-07-26] HOMEPAGE CRAFT REFINEMENT (founder feedback) — Restored the
  reverted "26bbc3d" redesign as the base, then rebuilt each section to be
  exceptional, iterating against a live HTML preview artifact (7 rounds) with
  the founder before porting to real components. Changes: (1) Craft tokens —
  brand-tinted 6-layer shadows (card/float/lift, forest 10,42,32 not gray) +
  tighter display tracking (tailwind.config.ts). (2) HERO rebuilt to PURE
  CINEMATIC + kinetic type (hero.tsx): full-bleed heroAerial photo, slow 30s
  push-in + film grain, headline reveals line-by-line from behind a mask,
  "connected" underline draws itself, slow sequenced entrance; NO card, NO
  widget (founder rejected a floating-listing card and an animated node-network
  first). Anim keyframes in globals.css, all LOAD animations (no IO) so content
  never strands; reduced-motion snaps to final state. (3) PROBLEM the "soul"
  first scroll (problem-section.tsx): full-bleed forestMist photo, big glowing
  24 Gt, UNEP emissions-gap chart (two diverging paths + shaded wedge, only
  real endpoints) drawing in on scroll, friction 01-04 below. New
  lib/market-data.ts (emissionsGap reshaped to from/paths/gap; marketFacts;
  frictionPoints) — flagged VERIFY BEFORE LAUNCH. (4) WHAT-WE-DO -> BENTO grid
  (what-we-do.tsx): 4 unequal cells, each conveys its message with a visual
  (product tile / bar chart / gauge "6.4" / cert rows — figures ILLUSTRATIVE).
  (5) BUILT-FOR -> editorial alternating image rows (for-whom.tsx). (6) TRUST
  deduped — roundedStats removed here (they were shown twice); donut + sourced
  market context only. (7) REMOVED the proof-strip/supply band above the
  problem (proof-strip.tsx now unused, kept). (8) Settlement band deleted.
  Marketplace safari block left intact per founder. reveal.tsx now uses CSS
  transitions (compositor-safe) not framer JS. tsc clean; NOT built locally
  (shared .next w/ another dev server would corrupt — see issue #7). Founder
  reviews on Vercel (real fonts/photos). Preview build tooling:
  scripts/shot.py + scratchpad build_preview.py (embeds Unsplash as data URIs).
  Stock photos are PLACEHOLDERS -> swap for real project photos in images.ts.

[2026-08-01] MARKETPLACE REAL DATA + FILTER REDESIGN + SUBPAGE POLISH —
  (1) SCRAPED live pranglobal.com (Marketplace listing + all 26 PRAN-*.html
  detail pages) for real photography, lat/lng, SDG mappings, registry copy,
  and stat bars. 22 of the catalog's 86 local projects have a matching live
  page (matched by pranCode == URL number, e.g. PRAN-1525). New
  src/lib/live-project-media.ts holds ONLY that scraped, sourced data, keyed
  by pranCode; lookups return undefined for the other 64 projects, which keep
  the existing sector stock photography (CLAUDE.md: never fabricate project
  data). (2) MARKETPLACE FILTERS: moved Registry/Delivery/Country/Price out
  of the persistent sidebar rail into a popover behind a kebab (⋮) button at
  the left of the toolbar (marketplace-browser.tsx) — same
  outside-click/Esc-close pattern as the header nav dropdowns. Card
  (project-teaser.tsx) now shows the real live photo + a small SDG icon strip
  when live data exists, a "Live project" badge, else unchanged. (3) PROJECT
  DETAIL `/[project]`: real photo gallery, real description/highlights text,
  new "Project location" card with a real satellite map (src/lib/
  satellite-map.ts + components/marketplace/satellite-map.tsx — hand-rolled
  Web Mercator tile math over the public ArcGIS World Imagery XYZ tiles, NO
  new mapping library/dependency, no API key), new "Sustainable Development
  Goals" card (real UN SDG icons via lib/sdg.ts), new "Project statistics"
  card (real stat bars) — all conditional on live data existing. (4) HOMEPAGE
  what-we-do.tsx (services bento): all 4 cells now carry full-bleed
  photography behind a tone-matched scrim (dark cells stay moody/photo-real,
  light cells get a barely-there texture) instead of flat bg-surface/bg-ink
  fills. for-whom.tsx (built-for) already had per-audience photography —
  untouched. (5) SUBPAGE IMAGERY: new reusable TexturedSection
  (components/marketing/textured-section.tsx) wraps a section in real
  photography at low opacity under a light/dark scrim; applied to the flat
  post-hero sections on About ("what we're not" + "how we operate"), Team
  ("how we operate"), Why Carbon Markets ("beliefs" + the quote figure),
  Intelligence/[service] ("what you get"), Solutions/[audience]
  ("challenge → answer"). (6) COPY: removed all visible "Draft pending legal
  review / lawyer review needed / not launch-ready / not yet binding"
  language from Terms/Privacy/Compliance callouts, legal-nav.tsx footer, the
  three intelligence-service notes (content.ts), and the CCTS/compliance
  resource callouts — replaced with plain "Terms and conditions applied" /
  "Plain-English summary" framing. Substantive legal content (liability,
  governing law, what-PRAN-is-not) is untouched; only the self-doubting
  meta-commentary was removed. (7) next.config.mjs remotePatterns extended
  for every hotlinked host the scrape uses (carbonregistry.com, gstatic,
  digitaloceanspaces, imimg, etb2bimg, sdgs.un.org, server.arcgisonline.com).
  .claude/launch.json: added "autoPort": true to pran-dev so a session can
  start its own dev server on a free port when another session already holds
  3000 (was previously a hard blocker). tsc clean. Verified in browser (own
  autoPort'd server): marketplace kebab filter popover opens/closes, real
  images + map + SDGs render for PRAN-5833 (matched project), correct
  stock-photo/no-map fallback for PRAN-1990 (unmatched project), all edited
  subpages render, "Terms and conditions applied" copy live on
  /legal/terms + /intelligence/esg. NOTE: /why-carbon-markets and
  /solutions/[audience] 404'd transiently while another chat's dev server
  shared this repo's default .next dir — confirmed via a temporary isolated
  distDir that this was cache collision (issue #7), not a code defect; the
  distDir workaround was reverted (not committed) once confirmed.

[2026-08-01] REGISTRY DATA FOR ALL PROJECTS + MAP-HERO PROJECT PAGE —
  Founder: "fetch the details of all the projects from respective registries
  and show for all", and "I want the location like the way it is on the top".
  (1) REGISTRY RECON — probed all five issuing registries:
      · Gold Standard — public-api.goldstandard.org is OPEN, no key. USED.
      · Verra — real backend is prod-us.api.platts.com (found via
        registry.verra.org/config/environment.config.json, public appkey
        wOKHFGuxKApQaujPSKgF). Every public-report path 500s and the SPA is
        Okta-gated, so no usable open project API. NOT AVAILABLE.
      · ICR — api.carbonregistry.com requires an access token; project pages
        aren't in their sitemap. NOT AVAILABLE (beyond what the live PRAN
        site already gave us).
      · UCR — ucarbonregistry.com is a parked GoDaddy for-sale domain;
        universalcarbonregistry.com unreachable. NOT AVAILABLE.
      · CDM — cdm.unfccc.int is Incapsula bot-blocked. NOT AVAILABLE.
    Recon scripts kept in scratchpad (probe*.mjs, verra.mjs) — re-run before
    assuming any of these is still shut.
  (2) GOLD STANDARD FETCH — paged the full 2,700-project GS catalog (hits 429
    at ~page 19; fetch-gs.mjs) then name-searched the stragglers
    (fetch-gs2/3.mjs). KEY INSIGHT: GS's `sustaincert_id` is exactly the
    number PRAN's portfolio writes as "GS ####" — NOT their `id` field.
    Matched 25/25 GS + GS-VER projects. New src/lib/registry-data.ts holds
    description, coords, SDGs, methodology, developer, project type,
    crediting period and est. annual credits, all verbatim from GS.
  (3) COORDINATE INTEGRITY — audited every GS coordinate against its own
    stated country (gs-audit.mjs). TWO GS rows publish coordinates outside
    the project's country (GS6999, a Tamil Nadu wind farm, is pinned in
    Iceland at 62.84,-17.56; GS4707 lands in Hungary). Those are DROPPED by
    the generator rather than rendered — a wrong pin is worse than no pin.
    The bounding-box check lives in scratchpad/build-registry-data.mjs; widen
    BOX there if the catalog gains new countries.
  (4) EVERY PROJECT NOW MAPS — new src/lib/country-locations.ts (20 countries
    + Nepal for I-REC) supplies an approximate country reference point.
    resolveLocation() prefers precise registry coords and otherwise returns a
    country-level point tagged precision:"country". SatelliteMap renders a
    soft halo instead of a sharp pin for country-level, and the new
    MapPrecisionNote always states which it is, so no false precision.
    Coverage across the 85-project catalog: map 85/85 (30 precise +
    55 country-level), real SDG mapping 45/85, registry/page description
    45/85, real project photography still 22/85 (NO registry publishes
    project photos — the other 63 keep sector stock imagery; only the
    founder/sellers can close this gap).
  (5) ONE MERGE POINT — new src/lib/project-details.ts resolves each project
    across live-project-media (project page) → registry-data (registry API) →
    marketplace-data (portfolio), and reports its own `sources` so the page
    can attribute honestly. project-teaser.tsx and /[project] both read it;
    neither touches the underlying modules any more.
  (6) PROJECT PAGE RESTRUCTURED (founder's "location at the top") — the
    satellite map is now the full-bleed HERO (9x5 tiles, eager-loaded, title
    + registry/country/vintage/PRAN-code badges and the precision note
    overlaid on it), matching the live pranglobal.com layout. Project
    photography moved to its own band below the hero; then description
    (with a "as published by the registry" line when it came from the API),
    highlights, tranches, escrow steps, and the sidebar (key metrics now
    incl. methodology/crediting period/est. annual credits, registry
    verification with a "View on the registry" link, SDGs, stat bars). The
    old duplicate sidebar location card was removed. Falls back to the
    photo hero only if the country is unknown (currently never).

[2026-08-08] WAVE 0 — INTERIOR CRAFT KIT + DOC RECONCILIATION. Founder:
  "enhance each and every page like we've done the home page... consider
  each page as an independent entity... it speaks before the words do."
  Diagnosed why the 16 interior pages felt interchangeable: they open on a
  flat forest rectangle (PageHeader), the body is the same
  rounded-panel/shadow-card grid on every page, and NOTHING draws — no
  bespoke diagram, no statement number. TexturedSection was a patch that
  added photographic texture but no meaning.
  (1) FOUNDER LOCKED four decisions (see Docs/7_Page_Design_Roadmap.md §2):
      sequence Wave 0 → Solutions; DIAGRAM-FORWARD interior pages (not
      photography); the four Intelligence services are NOT LIVE and must be
      announced honestly with waitlist framing; full bespoke, one page per
      session. Doctrine settled as "you enter through the world, then you
      are inside the machine" — the homepage keeps its photography as the
      overture, everything past it is the instrument panel. This is
      5_Design.md §8's "Cinematic → transitions to Data" made literal, so
      it is NOT a split personality.
  (2) NEW KIT src/components/craft/ — DrawnHero + Em + FieldPath +
      MarketField (drawn opening, replaces PageHeader), DrawnFigure +
      DrawnPath + DrawnIn (scroll-drawn diagrams), ModeBand + BandHeader
      (mode-shift sections), BigFigure (the statement number), Ledger
      (hairline settlement-statement register), FlowRail (self-drawing
      process rail, hollow node = manual step so escrow never overclaims).
  (3) TWO REAL BUGS FOUND AND FIXED DURING THE BUILD, both worth knowing:
      · DrawnFigure originally used a render-prop child. Interior pages are
        SERVER components (they export `metadata`) and a function child
        cannot cross the RSC boundary — Next threw "Functions are not valid
        as a child of Client Components" and the page 500'd. Draw state now
        travels by CONTEXT, which also removed on/reduce prop-threading.
        DO NOT reintroduce a render prop here.
      · `.field-draw` sets stroke-dasharray:1, which only means "one dash
        spanning the path" once pathLength="1" normalises the geometry.
        Without it the line renders as a 1px dotted rule that never appears
        to draw. An attribute cannot be set from a CSS class, so FieldPath
        exists and MUST be used instead of a bare <path className="field-draw">.
  (4) globals.css: added .field-draw/.field-in load animations + their
      reduced-motion overrides; made the .hero-em underline delay a
      --em-delay custom property (default 3s) so interior heroes can run
      brisker (1.15s) without a second class.
  (5) DOCS: 5_Design.md rewritten to v2.1 — it still described the
      ABANDONED v1.0 teal/navy/gold/Fraunces system while the code has run
      v2.0 paper/forest/emerald/Space Grotesk since 2026-07-24. Now matches
      tailwind.config.ts exactly and adds §3 "the craft standard" (the 7
      techniques) + §4 the kit. New Docs/7_Page_Design_Roadmap.md is the
      per-page tracker for the ~17-session redesign.
  (6) /style-guide/craft — live specimen of the whole kit, noindex, using
      only real derived portfolio figures or explicitly labelled specimens.
      This is the founder's lock-the-standard surface.
  VERIFIED in browser: page 200, tsc clean, all 5 sections render, no
  horizontal overflow at 1280 or 375, mobile FlowRail switches to the
  vertical rail and the desktop rail goes display:none, every React-driven
  final state resolves correctly (drawn paths strokeDashoffset 0, both rails
  scale 1, all 5 escrow nodes opacity 1). NOTE: CSS *animations* cannot be
  observed in this Browser pane — document.visibilityState is "hidden" so
  the page never composites and every animation sits at currentTime 0. The
  proven homepage hero shows the identical symptom there, so this is a
  measurement limit, not a defect; judge load animations on Vercel.

[2026-08-08] WAVES 1-4 — EVERY INTERIOR PAGE REDESIGNED. Founder followed
  Wave 0 with "Implement everything", so the whole roadmap shipped in one
  pass instead of one page per session. 15 of 16 interior templates rebuilt
  on the craft kit, each with its OWN signature drawing (the roadmap's test:
  a visual that could move to another page unnoticed is decoration).
  (1) NEW DATA src/lib/page-data.ts — everything the diagrams PLOT, kept
      apart from content.ts (prose) so a fabricated figure cannot hide in a
      drawing: complianceTimeline (7 real BRSR/CBAM/CCTS milestones, all
      sourced, ⚠️ VERIFY BEFORE LAUNCH), settlementPath, tonneScale (the 10 m
      figure is CALCULATED from CO2 gas density, assumption printed on the
      page), serviceStatus (all four Intelligence services marked not live).
  (2) SOLUTIONS ×4 — four different arguments, not one template with a colour
      prop: enterprise = the compliance calendar with TODAY marked and almost
      every date already behind it; developers = the settlement rail (FlowRail,
      hollow nodes = manual, NO fee figures because none are set anywhere —
      "quoted per listing"); government = real volume-by-sector distribution
      from the live portfolio; public = the DIET spread (0.9-2.5 t/yr, real
      sourced averages) as "one ordinary choice, measured".
  (3) INTELLIGENCE ×5 — reframed from "we deliver this" to in-development.
      New DocumentMock shows the deliverable as a STRUCTURE (real framework
      section names, empty bodies, build stage on the sheet) — showing a
      populated report would have been a fabrication. Waitlist CTAs
      throughout; new ?interest=intelligence route added to contact.
  (4) /contact — the four routes moved from the bottom of the page to being
      the page (a "routed desk"), each showing where it actually goes.
  (5) /why-carbon-markets — the tonne drawn at human scale beside a person
      and a double-decker bus. This is the page's whole thesis: nobody has an
      intuition for the unit, so the price on it reads as an accounting trick.
  (6) /about — the is/isn't copy (already the sharpest on the site) freed
      from its 2x2 card grid; each claim is now struck through as it scrolls
      in. /about/team says plainly it is one person. /about/press became a
      real press KIT (boilerplate, a style guide for writers, brand rules).
  (7) /calculator — hero moved OUT of the client component into the page so
      it could be diagram-forward; calculation logic untouched. Added a
      ledger stating the tool does NOT create credits and does not replace
      reducing emissions.
  (8) /resources — photo cards -> a numbered editorial index; article pages
      got a two-column read with a sticky meta/next-reading rail and a
      ReadingProgress bar. /marketplace kept its COMPACT band (a 68svh hero
      would push the filters below the fold on the one page built for
      filtering) but gained a drawn depth field and the exact portfolio
      figures. /legal got DocHeader — a deliberately QUIET opener, because a
      cinematic hero on a Terms page reads as marketing over a contract;
      legal WORDING WAS NOT TOUCHED. New not-found.tsx (none existed).
  (9) CLEANUP (roadmap 4.6): deleted textured-section.tsx and proof-strip.tsx
      (both fully orphaned), and removed PageHeader/SectionHeader/FeatureGrid/
      Steps from page-kit.tsx. Only CtaBand/Prose/Callout survive. Prose no
      longer carries its own padding — it was double-padding inside the legal
      layout; the legal shell now owns that measure.
  (10) NEW KIT PRIMITIVE DrawnBar — bars grow by CSS transform, NOT SMIL
      <animate>, because SMIL ignores prefers-reduced-motion and would keep
      moving for a visitor who asked everything to stop.
  VERIFIED: 27 routes 200 + /not-a-page 404s with the new page; tsc clean; no
  server errors; 14 pages measured at 375px with ZERO horizontal overflow;
  banned-claims audit across all of src/ found no violations (every hit is a
  prohibition, legal text, an educational warning, or a sourced third-party
  target such as India's 2070 commitment).
  NOT DONE ON PURPOSE: /[project] (roadmap 3.3). It is 590 lines merging
  three data sources behind the satellite-map hero — the strongest page on
  the site and the riskiest to disturb. Give it its own session.
  (7) Marketplace cards: every card now carries a country pill over the
    photo, and SDG icons whenever any real source supplies them (was
    live-scrape only). tsc clean; verified in browser on an isolated
    distDir: GS project (PRAN-1525) shows merged GS + page data, Verra
    project with no coords (PRAN-1457) shows the labelled country-level
    Türkiye map, all 45 hero tiles load, 85/85 cards render with country
    pills and 174 SDG icons, no console errors.

[2026-08-10] STAGE 2.5 + CONTENT PASS + PERFORMANCE — five commits, not
  logged until reconciled against git on 2026-08-16 (see §9). All
  Co-Authored-By Claude Opus 5.
  (1) CALCULATOR (Stage 2.5, emission-factors.ts) — the India grid factor
      was CORRECTED, not just re-verified: 0.71 had been CEA's CDM
      "combined margin" baseline figure (what a project avoids), mislabelled
      as the footprint factor. The correct Scope-2 location-based figure is
      the weighted average, 0.7117 (CEA v21.0, FY2024-25) — now in use, with
      the distinction documented in-file so it doesn't get "corrected" back.
      Two DEFRA pairs are flagged ⚠ UNVERIFIED rather than guessed:
      petrolCar/dieselCar (both 0.17) and flightShort/flightLong (both
      0.15) — neither pair can genuinely be equal. Household size now
      divides shared household energy (electricity/LPG) instead of
      charging each member the whole household's bill — the single
      largest accuracy bug a personal calculator can have. Business results
      now show tCO2e/employee + whether the sector is CCTS-notified. New
      personalisation fields (age band, occupation, industry, city, year
      founded) are CONTEXT ONLY, documented as never multiplying into the
      result — there is no published factor keyed to age or job title.
  (2) MARKETPLACE — default sort is now price high→low (unpriced listings
      sort last, never first). Result counts and the stats band are GONE
      site-wide — founder direction: never publish how many projects,
      countries, or how much volume is on the book (also removed from
      /about/team). Project detail page gained a "Verification and
      standard" block (registry, registry project ID, standard,
      methodology, crediting period, est. annual credits, developer, PRAN
      reference — modelled on Carbonmark's assessment block, rows render
      only when the merged record actually has them) filling a hole left
      when escrow-steps text was removed earlier. New "at a glance" strip
      under the hero (price/volume/vintage/standard/type/delivery) so a
      mobile visitor sees price before scrolling past description,
      highlights and the volume table.
  (3) SOLUTIONS + LEGAL PHOTOGRAPHY — each of the 4 Solutions pages now gets
      its own hero photograph (lib/images.ts solutionImages), and the 3
      legal pages get a restrained DocHeader photo treatment (shorter band,
      heavier scrim; wording untouched). ⚠ SEE §4 KEY DECISIONS — this
      reads as a reversal of the Wave-0 "diagram-forward, no photography on
      interior pages" lock and is not confirmed as founder-approved.
  (4) LEGAL CONTENT — Terms grew from 9 to 22 sections. The biggest gap
      closed was settlement failure: the old terms described the happy
      path in 5 steps and said nothing about a seller who doesn't transfer,
      transfers short, or transfers the wrong vintage. New §8 covers each
      case, the refund route, who bears gateway/FX cost on a refund, and
      that retirement is irreversible so discrepancies must be raised
      before it. Also added: naming the contracting entity (a contract
      naming no party is unenforceable — it was missing), eligibility,
      acceptable use, taxes + gross-up, platform IP, a warranty disclaimer,
      a user indemnity aimed at environmental claims made with a PRAN
      certificate, force majeure, sanctions/financial-crime, amendment and
      notice, survival, and a real dispute-resolution clause replacing "to
      be settled by counsel," which had shipped to production as a
      placeholder. Privacy now covers what India's DPDP Act requires:
      grievance officer, retention periods, cross-border processing
      disclosure (Vercel/Supabase/Resend), consent withdrawal + nomination
      rights, breach notification, children's-data position. Both pages
      carry a last-updated date now. Every human-supplied fact (entity
      name, CIN, registered office, arbitration seat, grievance officer,
      refund window, GST/TDS treatment, retention periods) is a visible
      [bracketed placeholder] rather than an invented value. STILL NOT
      LAWYER-REVIEWED — flagged in file comments, not on the visible page,
      per the founder's 2026-08-01 decision on that wording.
  (5) PERFORMANCE — self-hosted all 17 SDG icons (were hotlinked from
      sdgs.un.org: ~2,958 references on /marketplace alone before every
      Next image fetch had to round-trip a third party). Converted
      public/img + public/sdg to WebP via Next's own image optimiser (no
      new dependency) — 8.4MB → 3.4MB, -58%. Bundle unchanged at 87.3kB
      shared First Load JS — confirms images were the actual weight. The
      formatted phone number is no longer rendered as visible text (it
      matched phone-harvester regexes); the wa.me link is unaffected.

[2026-08-16] DOC RECONCILIATION + STAGE 2.3 + STAGE 3.1 SCHEMA. Session
  started as a status readout (founder asked "where are we"), which
  surfaced that this file and Phases.md hadn't been touched since
  2026-08-09 despite 5 commits landing 2026-08-10 — logged those
  retroactively first (see the 2026-08-10 entry above), then built the
  three things that were genuinely unblocked:
  (1) STAGE 2.3 AUTO-REPLY — src/app/api/contact/route.ts now sends TWO
      independent emails on a valid submission: the existing team
      notification, and a new confirmation back to the sender promising a
      reply "within 48 hours" (founder-confirmed this session). Each send
      has its own try/catch so one failing never blocks the other. The
      wording lives once, as `responseTimeWindow` in lib/config.ts — not
      restated as a string in the route — so it can't drift out of sync if
      it's ever quoted elsewhere (e.g. on the /contact page itself, not
      done yet).
  (2) PRAN_TEAM_EMAIL — set as the .env.example default (contact@pranapp.in,
      founder-confirmed). Still needs an actual .env.local to do anything;
      see Deploy readiness in §3.
  (3) DEFRA FACTOR RESEARCH — genuine attempt to split the two unverified
      pairs (petrolCar/dieselCar, flightShort/flightLong) via WebSearch +
      WebFetch across 5 sources. RESULT: could not confirm the primary
      DEFRA table split — the real data lives in a gov.uk XLSX workbook
      these tools can't parse as text, and the one usable figure found
      (Climatiq's "Car average," DEFRA-2022-sourced, 0.17067 kgCO2e/km) is
      a blended figure, not a fuel split. A flight figure surfaced too
      (~0.156/0.097/0.081 short/medium/long-haul) but includes a ~1.9x RF
      + ~1.2x WTT uplift this file explicitly excludes, and back-dividing
      those out would compound guesswork on guesswork — not done. BOTH
      PAIRS ARE STILL IDENTICAL/FLAGGED. Comments in emission-factors.ts
      now record exactly what was tried and what would close it (read the
      DEFRA "full set (for advanced users)" workbook's Passenger vehicles
      and Business travel - air tabs directly), so the next attempt
      doesn't repeat the same dead ends.
  (4) STAGE 3.1 SCHEMA — new supabase/schema.sql: the `projects` table
      exactly as specified in Architecture.md §3 (money columns as
      numeric, not float), a public `project-media` storage bucket, and
      RLS (public SELECT where status='ACTIVE'; any authenticated user =
      full access, since Phase 1 has exactly one admin account and no role
      table). Deliberately does NOT include orders/contact_submissions/
      calculator_results — out of Stage 3.1's scope, see the file's own
      header comment. NOT YET RUN anywhere — there is no Supabase project
      to run it against. Founder pastes it into the SQL editor once one
      exists.
  (5) BROWSER VERIFICATION — caught and fixed a real regression in (1)
      before it shipped: the first draft of the two-send restructure moved
      `new Resend(apiKey)` outside any try/catch (to share one client
      across both sends), which meant a construction failure would now
      throw unhandled instead of degrading gracefully like the original
      code did. Fixed by wrapping both sends in an outer try, each still
      independent inside it. Confirmed the live route with a direct
      `javascript_tool` fetch() to /api/contact (not a simulated click —
      those don't work reliably in this sandbox's non-compositing Browser
      pane, now documented in the sandbox-quirks memory) — got a real
      `{status:200, body:{ok:true}}` and the matching "email not
      configured" line in `preview_logs`. Also caught and fixed a
      pre-existing copy bug while in there: /contact's page text said "We
      usually reply within one business day," contradicting the new
      48-hour auto-reply — both now read from the one `responseTimeWindow`
      constant.
  VERIFIED: `tsc --noEmit` clean after all of the above; /api/contact POST
  confirmed working live against the running dev server.
```

[2026-08-16 cont'd] RESEND WIRED + A REAL SILENT-FAILURE BUG CAUGHT. Founder
  supplied a real Resend API key same session. Before using it, found and
  fixed a genuine bug: the installed `resend` SDK (v6.18.0) does NOT throw
  on an API-level rejection (bad recipient, unverified domain, etc.) — its
  `fetchRequest` catches non-OK responses internally and RETURNS
  `{data: null, error: {...}}` instead. src/app/api/contact/route.ts's
  try/catch around each `resend.emails.send()` call was therefore dead code
  for the most likely failure mode: a rejected send would resolve normally,
  fall through to `return NextResponse.json({ok: true})`, and both the
  founder and the visitor would believe it worked. Fixed by destructuring
  `{ error }` from each send and logging it explicitly — this is a
  general robustness fix, not specific to today's restriction, and should
  be the pattern for any future Resend call.
  Created .env.local (gitignored, confirmed against .gitignore before
  writing anything — never committed) with the real RESEND_API_KEY,
  PRAN_TEAM_EMAIL=contact@pranapp.in, and PRAN_FROM_EMAIL="PRAN
  <onboarding@resend.dev>" (Resend's shared no-setup sender — sending from
  noreply@pranglobal.com would fail immediately, that domain isn't
  verified in Resend). Supabase/Razorpay left blank — confirmed with the
  founder they're not needed for this stage.
  LIVE TEST, TWICE (dev server restarted between — Next only reads env at
  boot, not via HMR): first with the real target (contact@pranapp.in) —
  Resend rejected BOTH sends with a precise, informative error: "You can
  only send testing emails to your own email address
  (nitinddhich38@gmail.com). To send emails to other recipients, please
  verify a domain at resend.com/domains...". Second, temporarily pointed
  PRAN_TEAM_EMAIL at nitinddhich38@gmail.com (the Resend account's own
  signup address) to prove the pipe itself — both the team notification
  AND the Stage 2.3 auto-reply delivered cleanly, no errors logged. Then
  reverted PRAN_TEAM_EMAIL back to contact@pranapp.in (the real target)
  and restarted again so the running server matches the file.
  WHAT THIS MEANS GOING FORWARD: the auto-reply built earlier today
  (Stage 2.3) sends to WHOEVER filled out the form — that will never be
  nitinddhich38@gmail.com for a real visitor, so it cannot work AT ALL,
  for anyone, until a domain is verified in Resend. This isn't a config
  choice to make later — it's the one thing actually blocking Stage 2 from
  being real. Also: this .env.local is LOCAL ONLY. Deploying to Vercel
  will need the same three Resend variables set again in Vercel's own
  dashboard — a local .env.local does not travel with a deploy.

---

## 3. WHAT IS IN PROGRESS (only one thing at a time)

```
Currently building: [none started. Stage 2 is fully code-complete (2.1-2.5
                    all coded) but still NOT LIVE. Stage 3.1's SQL is
                    written (supabase/schema.sql) but not run anywhere.
                    Next real step needs a Supabase project: run that SQL,
                    then start Stage 3.2 (admin auth).]
Blocked on:         [ONE thing, precisely: no domain is verified in Resend
                    (resend.com/domains). .env.local now has a real,
                    working RESEND_API_KEY — confirmed live 2026-08-16 —
                    but Resend's unverified-sender restriction means it can
                    ONLY send to nitinddhich38@gmail.com until a domain is
                    added there. Add the DNS records Resend gives you
                    (likely via hosteasy's Zone Editor), then change
                    PRAN_FROM_EMAIL in .env.local to an address on that
                    domain — nothing else needs to change. Stage 3 (admin)
                    is separately blocked on creating a Supabase project.]
Waiting on founder: [RESOLVED 2026-08-16: auto-reply wording is "within 48
                    hours" (lib/config.ts responseTimeWindow); Solutions +
                    Legal hero photography stays (confirmed keeping
                    eeff6bd's 08-10 change — see §4, this supersedes Wave-0
                    for those pages only, not retroactively); PRAN_TEAM_EMAIL
                    is contact@pranapp.in (now the .env.example default,
                    and the real value in .env.local); RESEND_API_KEY is
                    live in .env.local (first env var this project has ever
                    had actually set — see the "RESEND WIRED" entry in §2).
                    RESOLVED earlier: WhatsApp number (917296815012,
                    08-10), general contact display address
                    (contact@pranapp.in, 08-09), "real marketplace stat
                    numbers" is moot (founder chose not to publish counts,
                    08-10).
                    STILL OPEN: verify a domain in Resend (see "Blocked on"
                    — this is the ONLY thing standing between "coded" and
                    "actually works" for Stage 2 now); create the Supabase
                    project (Stage 3); real project photos for the ~60+
                    catalog projects with none (registries publish NONE —
                    only the founder/developers can close this); leadership
                    photos; lawyer review of /legal/* (now 22 Terms
                    sections); the two DEFRA factor pairs — search/fetch
                    tools could not extract DEFRA's primary XLSX table
                    2026-08-16, someone needs to open the actual workbook
                    (see emission-factors.ts for exactly what was tried).]
Deploy readiness:   [`tsc --noEmit` clean as of 2026-08-16, including
                    today's Stage 2.3 + Resend error-handling fix. Not yet
                    deployed to Vercel — and note .env.local is LOCAL ONLY,
                    Vercel will need its own copy of the same 3 Resend vars
                    in its dashboard when that happens. `enhancing` is 23+
                    commits ahead of origin/enhancing — still not pushed.]
Design:             5_Design.md v2.0 (warm paper / forest / emerald, Space
                    Grotesk display + Inter). Homepage built to it 2026-07-24.
                    (Supersedes the 2026-07-23 teal-UI lock.) Solutions +
                    Legal interior pages carry hero photography (confirmed
                    2026-08-16); every other interior page stays
                    diagram-forward per the Wave-0 lock.
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
- [2026-08-09] SCOPE HELD, THEN CUT. The founder first asked for buyer/seller
  self-registration, on-platform KYC, and buyer/seller dashboards — then
  withdrew all of it the same day ("it may make it quite complex, and I may
  not handle it widely"). So the line above STANDS: projects stay
  admin-entered. The founder onboards on behalf of developers, who send
  details directly. Buyer side is managed off-platform.
- [2026-08-09] NO TECH-STACK CHANGE was needed for any of this. Supabase +
  Resend were already installed and unused; this phase switches them on.
- [2026-08-09] Ship order is deliberate: the connection layer (emails,
  WhatsApp, calculator) needs NO database, so it goes live first and starts
  capturing enquiries while the admin console is built behind it.
- [2026-08-10] India's grid emission factor was CORRECTED, not just
  re-verified: the old 0.71 was CEA's CDM "combined margin" baseline figure
  mislabelled as the footprint factor. The right one for a footprint is the
  weighted average (0.7117, CEA v21.0). Keep this distinction — the two
  numbers serve different purposes and a future re-verification pass could
  easily "fix" it back to the wrong one if the note gets deleted.
- [2026-08-10, RESOLVED 2026-08-16] eeff6bd put hero photography back on
  the Solutions + Legal pages, reversing the Wave-0 "diagram-forward, no
  photography on interior pages" lock (7_Page_Design_Roadmap.md §2,
  2026-08-08) without recorded founder sign-off at the time. Founder
  confirmed 2026-08-16: KEEP the photography. This supersedes Wave-0 for
  Solutions + Legal SPECIFICALLY — it does not retroactively reopen pages
  that already shipped diagram-forward (Enterprise/Developers/Government/
  Public solutions pages' signature visuals, Intelligence, About, Why
  Carbon Markets, etc. all stay exactly as built). Don't extend photography
  to any other interior page without asking again.
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
(LOCAL — .env.local on this machine only, 2026-08-16. None of these exist
in Vercel yet; there is no Vercel project connected. Don't assume "set"
means "live in production.")

NEXT_PUBLIC_SUPABASE_URL          [x] set — https://qceolcqitqfcoyzmlkne.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY     [x] set
SUPABASE_SERVICE_ROLE_KEY         [x] set
RAZORPAY_KEY_ID                   [ ] set
RAZORPAY_KEY_SECRET               [ ] set
RAZORPAY_WEBHOOK_SECRET           [ ] set
RESEND_API_KEY                    [x] set — confirmed working live 2026-08-16
PRAN_TEAM_EMAIL                   [x] set — contact@pranapp.in (blocked on
                                     domain verification, see §3)
PRAN_FROM_EMAIL                   [x] set — temporary onboarding@resend.dev,
                                     switch once a domain is verified
NEXT_PUBLIC_SITE_URL              [x] set — http://localhost:3000
```

---

## 7. KNOWN ISSUES / TODOs (running list)

```
- [ ] Lawyer must review: Terms, Privacy, certificate wording, disclaimers
- [ ] Replace placeholder homepage numbers with real data (lib/config.ts)
- [ ] Add real project photos when provided — THE main remaining data gap.
      63/85 catalog projects still use sector stock photography. This is NOT
      fixable by scraping: only 22 have a pranglobal.com page, and no issuing
      registry (Verra/GS/ICR/UCR/CDM) publishes project photography at all.
      Founder or sellers must supply them -> drop into live-project-media.ts.
- [ ] Verra/ICR/UCR/CDM project data is unreachable programmatically as of
      2026-08-01 (see Memory §2 entry for exactly what was tried and why each
      failed). Re-check before anyone assumes it can be automated.
- [ ] Add real team photos/bios when provided
- [x] India grid factor confirmed + corrected against CEA v21.0 (2026-08-10)
- [ ] Two DEFRA factor pairs are IDENTICAL and flagged unverified in
      emission-factors.ts: petrolCar/dieselCar (both 0.17), flightShort/
      flightLong (both 0.15). Real DEFRA values are published and
      look-up-able — this does NOT need founder input, just the lookup.
- [ ] Verify BRSR/CBAM/CCTS facts against official sources before publishing
- [x] Solutions + Legal hero photography — founder confirmed keep it
      2026-08-16 (see §4 KEY DECISIONS).
- [x] Stage 2.3 (auto-reply email) — built 2026-08-16, "within 48 hours"
      wording. Code-complete; still needs .env.local to actually send.
- [ ] `enhancing` is 22+ commits ahead of origin/enhancing and unpushed —
      this machine is the only copy of the entire v2.0 rebuild. Push when
      the founder wants that backup (not done automatically).
- [ ] The 2 DEFRA factor pairs are STILL unresolved after a real attempt
      2026-08-16 (WebSearch + WebFetch, 5 sources) — the actual split lives
      in a gov.uk XLSX workbook these tools can't read as text. Needs a
      human to open "Conversion Factors 2023: full set (for advanced
      users)" and read the Passenger vehicles + Business travel-air tabs.
      See emission-factors.ts for exactly what was tried, so it isn't
      repeated.
- [ ] supabase/schema.sql is written (Stage 3.1) but has never been run —
      there is no Supabase project yet. Founder: create one, paste the
      file into the SQL editor, then tell the next session the project ref
      so it can go in Memory.md §1 and .env.local can be filled in.
- [ ] npm: 5 vulns (1 mod, 4 high) in transitive deps — careful audit pass (do NOT --force)
- [ ] three-mesh-bvh 0.7.8 vs 0.8.0 warning — resolve before building the 3D globe (A.1)
- [x] Design tokens themed in Task 0.3 (hand-built cva components, not shadcn CLI)
- [ ] OPS: never run `npm run build` while `next dev` is live — shared .next dir
      corrupts (Cannot find module './948.js'). Stop dev or use a separate build.
      Same corruption happens with TWO `next dev` processes on this repo at
      once (e.g. two chat sessions) — give the second one its own `distDir`
      in next.config.mjs (temporarily; don't commit it) if this happens.
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
Last session date:   2026-08-16
Last task completed: Two things back to back. First, reconciled 6 days of
                    drift: 2026-08-10 had shipped 5 commits (grid-factor
                    fix, marketplace pass, Solutions/Legal photography,
                    legal content expansion, performance pass) that never
                    got logged here — done retroactively from git history.
                    Second, with the founder answering 3 quick questions,
                    built what was actually unblocked same-session: Stage
                    2.3 (auto-reply email, "within 48 hours"), confirmed
                    PRAN_TEAM_EMAIL, and wrote Stage 3.1's Supabase schema
                    (supabase/schema.sql, not yet run). Also attempted the
                    2 DEFRA factor pairs — genuinely could not resolve them
                    with search/fetch tools; still open, now well-documented.
Next task to start:  Once a Supabase project exists: run supabase/schema.sql,
                    fill .env.local, then start Stage 3.2 (admin auth).
                    Until then: read DEFRA's actual XLSX workbook to close
                    the 2 factor pairs, or push `enhancing` to origin for a
                    backup — both need a person, not just more agent tool
                    calls.
Anything the next session must know:
  - MEMORY.MD WENT STALE FOR 6 DAYS ONCE ALREADY (08-09 → 08-10 commits
    weren't logged until 08-16). Don't assume this log is current just
    because it exists — cross-check `git log` against the newest dated
    entry in §2 before reporting status to the founder.
  - THE FOUNDER HAS NO HOSTING BACKGROUND and previously deployed only
    static HTML/PHP via cPanel. Explain deployment concretely, never
    assume familiarity with DNS, env vars, or build steps.
  - hosteasy.in CANNOT run this app. It keeps the domain and the mailboxes
    only. Do not suggest uploading anything to public_html.
  - `main` is frozen at the first redesign commit (ca5519f) and reflects
    almost none of the v2.0 work. All real history is on `enhancing`, 22
    commits ahead of origin/enhancing and never pushed. This machine is a
    single point of failure for the whole rebuild until that changes.
  - THREE HEAVY DEPS ARE DEAD: three (25MB), @react-three (4MB),
    recharts (9MB) — the globe was banned and every chart is hand-drawn
    SVG. Also unused: qrcode, @react-pdf/renderer, razorpay. They do NOT
    bloat the client bundle (Next tree-shakes; shared First Load JS is
    87.3 kB) — only install time. Left installed on purpose: Supabase and
    Razorpay are imminent scope.
  - lib/supabase/{client,server,admin}.ts EXIST but are imported by
    NOTHING. They are correct and ready; Stage 3 is their first consumer.
  - THE ORDER MATTERS: Stage 2 needs no database. Do not let it get
    entangled with Supabase work — it ships to the live domain first.
    (Stage 2 is fully code-complete now, 2.1-2.5; it just isn't LIVE —
    see §3. Stage 3.1's SQL is written but unrun for the same reason.)
  - INTERIOR PAGES ARE diagram-forward per the 2026-08-08 Wave-0 lock,
    EXCEPT Solutions + Legal, which carry hero photography — founder
    confirmed keeping that 2026-08-16 (see §4). That exception does not
    extend to any other interior page without asking again.
  - The four Carbon Intelligence services are NOT LIVE. Every page about
    them must read as in-development with waitlist framing. Never imply a
    delivered product.
  - Build interior pages from src/components/craft/, not page-kit.tsx.
    PageHeader/FeatureGrid are the old flat-rectangle path being retired.
  - DrawnFigure passes draw state by CONTEXT, never a render prop — pages
    are server components and a function child cannot cross the RSC
    boundary. Use FieldPath (never a bare <path className="field-draw">),
    which sets the pathLength="1" the dasharray depends on.
  - One statement number per page, maximum. A second one turns both into a
    stat row.
  - REGISTRIES DO NOT PUBLISH PROJECT PHOTOS. This was checked directly, so
    do not spend another session on it: Verra's registry is now an S&P
    Global Platts system whose endpoint map (registry.verra.org/config/
    endpoints.json) covers projects/issuances/units/buffers with no media
    concept at all, and its project pages render no images; Gold Standard
    serves ONE generic tinted banner (registry.goldstandard.org/
    project-hero.jpg) for every project; CDM is a document repository; only
    ICR has real photography and it sits behind app.carbonregistry.com
    login. Verra's old /app/projectDetail/VCS/<id> deep links are dead
    post-migration.
  - lib/project-imagery.ts now guarantees every listing — carbon project AND
    I-REC — shows a DIFFERENT photograph, matched to its technology. Run
    `npm run verify:imagery` after adding listings; it fails the build on a
    repeat or a missing image. Add ids to POOLS when a pool runs short.
  - The stock photos are illustrative, NOT the project sites.
    `hasRealPhoto` stays false for them — never caption one as the project.
  - categoryForProject() reads sector + rawTech + NAME on purpose: several
    rows are mis-sectored in the source sheet (PRAN-2590 "REGENERATIVE
    AGRICULTURE…" and PRAN-2887 grassland are filed under Afforestation;
    PRAN-306 "Evra Biomass Power Plant" under Waste Handling).
  - IREC_LIVE_CODES maps 4 I-REC lines to real photos/descriptions in
    live-project-media.ts (PRAN-2009/2019/2020/2024). They are NOT orphaned
    entries — do not delete them as unused.
  - Read lib/project-details.ts first. It is the ONLY place that decides what
    a project shows; live-project-media.ts / registry-data.ts /
    country-locations.ts are its inputs. Add new sources there, not in
    components.
  - registry-data.ts is Gold Standard's public API output, matched on
    `sustaincert_id` (NOT `id`). live-project-media.ts is scraped from
    pranglobal.com. Both are real, sourced data — do NOT hand-add entries or
    guess values; regenerate from the scratchpad scripts.
  - Two Gold Standard coordinates are genuinely wrong in GS's own data and
    are deliberately dropped by a country bounding-box check. If a project
    ever renders with a suspicious pin, check that check first.
  - satellite-map.ts/.tsx is a from-scratch Web Mercator tile renderer over
    public ArcGIS World Imagery XYZ tiles. No mapping library was added
    (stack stays locked) — reuse this for any future map need before
    reaching for Leaflet/Mapbox.
  - Do not run `next dev` from a second session against this same repo
    without setting a distinct `distDir` first — two dev servers sharing one
    .next dir corrupts the build (this session hit it: /why-carbon-markets
    and /solutions/[audience] 404'd until isolated; confirmed not a code bug).
  - SDG icons are now self-hosted at public/sdg/*.webp (17 files) — do NOT
    re-add sdgs.un.org to next.config remotePatterns. That hotlink was a
    measured ~2,958-request regression on /marketplace alone, and the
    failure mode is silent (works locally, only hurts in production).
  - The formatted WhatsApp number must never be rendered as visible page
    text (anti-scraping, founder direction 2026-08-09) — link to
    whatsappLink()/wa.me only, via lib/config.ts. whatsappDisplay exists
    only for contexts a human reads back (email body, invoice), never a page.
```

---

*Memory.md — PRAN Phase 1 | Read at start, update at end, every session.*
