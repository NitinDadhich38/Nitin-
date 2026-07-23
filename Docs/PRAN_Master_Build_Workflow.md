# PRAN — Master Build Workflow
### The Complete, Step-by-Step Guide From Zero to Live Platform
### Written for: Claude Code + a two-person founding team
### Version 3.0 | Classification: Internal

---

> ## HOW TO READ THIS DOCUMENT
> This is written so that nothing is left to guessing. Every instruction is explicit.
> When you hand a section to Claude Code, it should be able to build it without inventing anything.
> If Claude Code ever has to guess, that is a bug in THIS document — come back and make it more specific.
>
> Read Part 0 and Part 2 fully before you build anything. They will save you weeks.

---

## ═══════════════════════════════════════════════════
## PART 0 — READ THIS FIRST
## ═══════════════════════════════════════════════════

### 0.1 What PRAN Is Now (Locked Positioning)

PRAN is the financial infrastructure layer for the carbon market — the Bloomberg / NASDAQ / Zerodha of environmental assets. Not a "green" brand. Numbers over adjectives. The marketplace is the product.

New domain: **pranglobal.com** (global positioning, not India-only). India is the home market and the regulatory wedge, but the brand speaks to the world.

The platform has four things:
```
1. VOLUNTARY MARKETPLACE   → buy/sell verified carbon credits (escrow-based)
2. CARBON CALCULATORS       → personal + business footprint (two flows, one page)
3. PROCUREMENT INTELLIGENCE → AI decides the best carbon strategy for a buyer
4. AI REPORTING             → BRSR, ESG, CBAM reports auto-generated
```

### 0.2 The Honest Timeline Reality (Please Read Carefully)

You said 3 weeks for everything. As your CTO, I have to be straight with you, because a wrong expectation now causes pain later.

```
WHAT IS REALISTIC IN 3 WEEKS (with 2 people + Claude Code):
✅ The complete website — every page, designed, responsive, live at pranglobal.com
✅ All pages that are "static" (marketing, resources, about, solutions)
✅ Working contact forms and request-demo forms (real emails to you)
✅ The marketplace VISUALLY complete + browsing + a working "buy request" flow
✅ Both calculators FULLY WORKING (they are self-contained, no backend dependency)
✅ The AI reporting page working as a request-and-deliver flow

WHAT IS NOT REALISTIC IN 3 WEEKS:
❌ Fully automated escrow with real money moving programmatically + credit settlement
❌ A production-grade AI procurement model that you trust with real client decisions
❌ Fully automated BRSR/ESG/CBAM generation you'd stake the company on
❌ All of the above tested, secure, and legally hardened

WHY: These involve real money, real legal liability, and real regulatory exposure.
Rushing them is how an early-stage company gets sued or loses a customer's funds.
```

**The honest plan:** In 3 weeks, ship a website that looks and feels like a 100% real tech platform, with the calculators genuinely working and every other feature working as a "capture the request → your team fulfils → deliver result" flow. Then automate each piece over the following months. This is exactly how real fintechs launch. Nobody sees the manual part behind the curtain — the user experience feels complete.

This document is structured so you build the *real, safe* version in 3 weeks and upgrade to *full automation* after.

### 0.3 The Two Modes of Every Feature

For the next few months, every feature runs in one of two modes:

```
MODE A — FULLY WORKING NOW (no human in loop):
- Both carbon calculators
- All website pages, forms, contact
- Marketplace browsing and filtering
- Request submission and status tracking

MODE B — WORKS FOR THE USER, HUMAN FULFILS BEHIND SCENES:
- Marketplace purchase (escrow payment is real; credit transfer is you coordinating)
- Procurement intelligence report (AI drafts; you review; you send)
- BRSR/ESG/CBAM reports (AI drafts; you review; you send)

The user NEVER sees Mode B as "manual." To them it's:
"Submit → We're preparing your report → Here's your result."
```

---

## ═══════════════════════════════════════════════════
## PART 1 — THE TECH STACK (Claude Code Optimised)
## ═══════════════════════════════════════════════════

Chosen specifically because Claude Code builds these fast and well, and because a two-person non-developer team can operate them.

```
LAYER          CHOICE                     WHY (for your situation)
─────────────  ─────────────────────────  ──────────────────────────────────────
Framework      Next.js 14 (App Router)    One tool does frontend + backend.
                                          Claude Code is excellent at it.
Language       TypeScript                 Catches mistakes before they ship.
Styling        Tailwind CSS               Claude Code's native styling language.
Components      shadcn/ui                  Copy-paste, fully customisable, free.
Animation      Framer Motion              For scroll reveals and micro-motion.
3D globe        React Three Fiber (R3F)    See 3.4 for the light approach.
Database       PostgreSQL (Supabase)      Supabase = database + auth + file storage
                                          + APIs in one dashboard. Perfect for 2 people.
Auth           Supabase Auth              Built in. No separate auth to build.
File storage   Supabase Storage           For document uploads (KYC, reports).
Email          Resend                     Dead-simple email API. Claude Code knows it.
Payments       Razorpay (India)           Escrow via manual account first (see Part 4).
Hosting        Vercel                     Push to GitHub → auto-deploys. Free to start.
Forms→Email    Resend + a form handler    Contact/demo forms email you directly.
AI (reports)   Claude API (Anthropic)     For the AI reporting + procurement engine.
Analytics      Vercel Analytics + Plausible  Privacy-friendly, simple.
```

**Why Supabase instead of building your own backend:** With two non-developer founders, you cannot maintain a custom database server, auth system, and file storage. Supabase gives you all three in one dashboard you can click through. Claude Code writes the code that talks to it. This is the single most important stack decision for your situation.

**Total starting cost:** ~$0–25/month until you have real traffic. Everything above has a free tier.

---

## ═══════════════════════════════════════════════════
## PART 2 — HOW TO WORK WITH CLAUDE CODE
## ═══════════════════════════════════════════════════

This is the most important section. Your main developer is Claude Code. Here is how two non-developers get production results from it.

### 2.1 The Golden Rules

```
RULE 1 — ONE THING AT A TIME
Never say "build the whole website." Say "build the homepage hero section."
Small tasks = fewer mistakes = you can actually check the result.

RULE 2 — ALWAYS GIVE IT THIS DOCUMENT
At the start of every session, tell Claude Code:
"Read PRAN_Master_Build_Workflow.md. We are building [specific section].
Follow it exactly. Do not invent features not in the document."

RULE 3 — MAKE IT SHOW YOU
After each task: "Run it locally and show me a screenshot" (Claude Code can do this).
If it looks wrong, say what's wrong. Don't accept "it should work."

RULE 4 — COMMIT AFTER EVERY WORKING PIECE
Tell it: "This works. Commit it to git with a clear message."
This means you can always go back if the next change breaks something.

RULE 5 — NEVER LET IT GUESS ON MONEY, LEGAL, OR DATA
If a task touches payments, contracts, personal data, or carbon claims,
stop and check this document's Part 7 (legal) first.
```

### 2.2 The Session Starter Template

Copy-paste this at the start of each Claude Code session, filling the blank:

```
Read /docs/PRAN_Master_Build_Workflow.md fully.

Today we are building: ___________________________

Rules:
- Follow the document exactly. Build only what this section specifies.
- Do not add features, pages, or fields not listed.
- Match the design system in Part 3.2 precisely.
- If anything is ambiguous, ask me before writing code — do not guess.
- When done, run it and show me a screenshot, then wait for my approval.
```

### 2.3 The Build Order (Never Skip Ahead)

```
WEEK 1: Website foundation + design system + homepage + core pages
WEEK 2: Marketplace (visual + browse + buy request) + both calculators
WEEK 3: AI reporting flow + procurement flow + contact/forms + polish + launch

Each week's detail is in Parts 3–6.
```

---

## ═══════════════════════════════════════════════════
## PART 3 — STEP 1: THE WEBSITE
## ═══════════════════════════════════════════════════

This is your 3-week core deliverable. Every page, in full detail.

### 3.1 Handling the "No Real Photos Yet" Problem

You don't have real photos, but we must not leave grey boxes. Here's the rule for Claude Code:

```
IMAGE POLICY (until real photos arrive):
- NEVER use a plain grey placeholder box.
- For hero/atmosphere areas: use CSS gradients, the 3D globe, or generated
  abstract visuals (subtle mesh gradients, particle fields).
- For "project photos": use tasteful gradient cards with the project name,
  type icon, and location as typographic content — designed to look intentional.
- For team photos: use elegant monogram avatars (initials on a colored circle
  using the brand palette) until real photos are uploaded.
- For "real project site" sections (Homepage Section 5): use a designed
  placeholder that says the structure is ready, styled to look deliberate,
  with a code comment: {/* REPLACE: real project photography */}
- Every placeholder must look like a design choice, never like missing content.
```

When you upload real images later, you'll tell Claude Code "replace all placeholders marked REPLACE with these images."

### 3.2 The Design System (Give This to Claude Code Verbatim)

Based on your blueprint's three-mode palette. This is deliberately not the generic AI-design look.

```
COLOR TOKENS (define these in tailwind.config + globals.css):

--pran-ink:        #0A0E0D   (near-black — cinematic backgrounds)
--pran-teal:       #0E6B5C   (primary data/product color — the "Bloomberg" green)
--pran-teal-lit:   #14A085   (brighter teal for highlights, live data)
--pran-navy:       #0F2A43   (institutional/trust sections)
--pran-gold:       #C9A24B   (accent — PRIMARY BUTTONS and KEY NUMBERS ONLY)
--pran-paper:      #F7F5F0   (warm off-white — light section backgrounds)
--pran-mist:       #E8ECEA   (subtle borders, dividers, card edges)
--pran-slate:      #5A6B66   (secondary text)

USAGE DISCIPLINE:
- Gold is a SIGNAL, not decoration. Only primary CTAs and important numbers.
- Cinematic beats (hero, mission): --pran-ink background.
- Product/data (marketplace, dashboard): --pran-teal on white/paper.
- Trust (team, why-we-exist): --pran-navy with --pran-gold accents.

TYPOGRAPHY:
- Display face (hero statements): a high-contrast editorial serif.
  Recommended: "Fraunces" (free, Google Fonts) — characterful, serious.
- Body + data face: a clean grotesk.
  Recommended: "Inter Tight" or "Geist" for body, "Geist Mono" for numbers/data.
- Type scale (desktop): 
  hero 64px / h1 48px / h2 36px / h3 24px / body 17px / small 14px / mono-data 15px
- Numbers in data contexts always use the mono face — makes them feel like a terminal.

MOTION:
- Homepage opening: the one authored animation (globe → wordmark).
- Everywhere else: restrained. Scroll-reveal (fade + 20px rise), 
  ticking counters, subtle chart draw-in. Nothing decorative.
- ALWAYS respect prefers-reduced-motion (accessibility + legal).

SPACING & SHAPE:
- Generous whitespace. Sections breathe.
- Border radius: 8px on cards, 6px on buttons. Consistent everywhere.
- Max content width: 1280px, centered.
```

### 3.3 The Full Sitemap (Build Every Page)

```
Home
├─ Marketplace                    (flagship product page)
├─ Carbon Intelligence            (services hub)
│  ├─ Procurement & Decision Intelligence
│  ├─ AI ESG Reporting
│  ├─ AI BRSR Reporting
│  └─ AI CBAM Alignment Reporting
├─ Solutions
│  ├─ Enterprise
│  ├─ Government
│  ├─ Project Developers (List Your Project)
│  └─ General Public → Become Carbon Neutral (calculator)
├─ Carbon Market Dashboard        (live-data feature — static data first)
├─ Why Carbon Markets Matter      (mission page)
├─ Resources
│  ├─ Blog / Insights
│  ├─ Compliance & Standards Library
│  ├─ India Carbon Market (CCTS) explainer
│  ├─ Global Voluntary Market explainer
│  └─ Glossary
├─ About
│  ├─ Why We Exist
│  ├─ Team
│  └─ Press / Newsroom
├─ Contact / Request Demo
└─ Legal (Terms · Privacy · Compliance Framework)
```

### 3.4 The Homepage — Section by Section (Exact Build Spec)

The homepage is one continuous cinematic story. Build in this order.

**SECTION 0 — Opening sequence (the signature moment)**
```
WHAT: Near-black (#0A0E0D) full-screen. A slowly rotating data-globe
      (not photoreal — glowing wireframe/dot Earth). Faint glowing points
      pulse (factories, forests, cities). Particles flow between points.

HOW TO BUILD (the light approach — don't over-engineer):
- Use React Three Fiber (R3F) with a low-poly sphere + points material.
- The globe is a sphere with a dot-matrix texture OR points distributed
  on the sphere surface. Particles = a simple animated points system.
- DO NOT build a photoreal Earth. It's heavy and off-brief.
- Total 3D scene should stay under ~200KB and run at 60fps on mid mobile.

THE TEXT BEATS (fade in/out in sequence over ~15s):
  Beat 1: "Every decision we make today shapes tomorrow's climate."
  Beat 2 (globe pushes in, particles flow): 
          "But climate action needs trusted markets, transparent data, 
           and intelligent decisions."
  Beat 3 (particles converge into the PRAN wordmark):
          "Introducing the world's Carbon Intelligence Infrastructure."
  Then buttons fade in: [Explore Marketplace]  [Request Demo]
          (Marketplace button first — it's the primary action)

CRITICAL BUILD REQUIREMENTS:
- Skippable after ~2 seconds (a subtle "Skip intro" appears).
- On repeat visits (detect via localStorage), skip straight to the resolved
  state (wordmark + buttons) — don't replay the full intro every time.
- On slow connection / low-end mobile: detect and show a STATIC hero
  (a beautiful gradient + wordmark + tagline + buttons). The cinematic
  open must never make the site feel slow.
- respect prefers-reduced-motion: show the static version.
```

**SECTION 1 — Why We Exist (the fragmentation story)**
```
Large serif type on near-black or deep navy:
  "Carbon markets are fragmented."

Animation (scroll-triggered): five labeled nodes appear separated —
  Developers · Registries · Buyers · Governments · Consultants — 
  each isolated. As the user scrolls, they draw together into one point:
  the PRAN mark.

Closing line:
  "PRAN connects every participant of the carbon economy 
   through one intelligent marketplace."
```

**SECTION 2 — The Marketplace (hero position, right after mission)**
```
Full-width heading:
  "The Marketplace"
  "Powering verified carbon transactions."

Bloomberg-style stat cards (mono font for numbers, gold for the number):
  [130+ Projects] [$600M+ Available Assets] [16+ Countries] [8+ Registries]
  (These are static numbers for now — see note below on honesty.)

Below the cards:
  - A scrolling ticker strip: methodology · vintage · registry · price movement
  - A filter bar PREVIEW (not functional here, just visual):
    Availability · Vintage · Registry · Developer · Country
  - Category chips: ARR · Biochar · Cookstove · Renewable · Nature-Based · 
    Community · Industrial

  [Explore the Marketplace →] button links to the full Marketplace page.

HONESTY NOTE (important, legal): 
  The stat numbers must reflect reality or be clearly framed as illustrative.
  If you don't yet have 130 projects, either (a) use your real number, or
  (b) frame as "Building toward" / "Launching with". Do NOT display fake
  live metrics as if real — that's a misrepresentation risk. See Part 7.
```

**SECTION 3 — Carbon Intelligence (services)**
```
Heading: "Carbon Intelligence"
One line: "Every procurement decision, every ESG disclosure, every BRSR 
          report, every CBAM filing — powered through one intelligence engine."

Four cards linking to the four sub-pages:
  [Procurement & Decision Intelligence]
  [AI ESG Reporting]
  [AI BRSR Reporting]
  [AI CBAM Alignment Reporting]
```

**SECTION 4 — Solutions (audience split)**
```
Four animated cards, EQUAL visual weight:
  [Enterprise]  [Government]  [Project Developers]  [General Public]

General Public card: headline "Become Carbon Neutral" with a compact
  animated preview of the calculator flow:
  calculate → recommend → retire credit → certificate issued
  (This animation is a 4-step sequence, simple icons + labels.)
```

**SECTION 5 — Trust / Numbers**
```
This is the "real project photography" mosaic section.
FOR NOW: designed placeholder mosaic (per image policy 3.1) with the
  stat counters running alongside (ticking up on scroll into view):
  Projects Listed · Marketplace Value · Countries · Global Registries
Code comment: {/* REPLACE: real project + community photography */}
```

**SECTION 6 — Leadership preview**
```
2–3 leadership entries (monogram avatars until photos arrive):
  photo/avatar + name + one-line role.
Links to the full Team page.
(Ask Nitin for the names when building this — he has them ready.)
```

**SECTION 7 — Resources preview**
```
Three latest blog/insight cards (can be placeholder articles at first) +
  a callout linking to the Compliance Library.
```

**SECTION 8 — Closing CTA**
```
Return to the brand philosophy line:
  "At PRAN, we believe that living sustainably today sustains humanity 
   tomorrow. We're building the infrastructure powering the world's 
   carbon markets."
Then: [Explore Marketplace]  [Request Demo]
```

### 3.5 The Other Pages (Build Spec Summary)

For each page, Claude Code should follow the design system and the blueprint. Key specs:

```
MARKETPLACE PAGE (see Part 4 — it's the biggest page)

CARBON INTELLIGENCE HUB + 4 SUB-PAGES:
  Each sub-page: hero statement + "how it works" 3-step + what you get +
  sample output preview + [Request This] CTA (goes to a form).
  - Procurement: "Buy carbon credits the way you'd underwrite any asset."
  - AI ESG: board-ready disclosures mapped to BRSR/GRI/SDGs + human review layer.
  - AI BRSR: "SEBI BRSR, without the compliance fire drill."
  - AI CBAM: "Translate supplier data into the embedded-emissions figures 
    your EU customer demands."

SOLUTIONS PAGES (4):
  - Enterprise, Government, Project Developers, General Public (calculator).
  - Each: audience-specific hero + pain points + how PRAN helps + CTA.
  - General Public page tone = clean consumer-fintech (Zerodha-like), 
    different register from the institutional rest of the site.

CARBON MARKET DASHBOARD:
  Static/manually-updated data first. Sections: carbon prices by registry, 
  running counters, country/registry stats, top methodologies, India CCTS 
  updates, market news feed, recently added projects.
  Build the layout to accept live data later (structure the components so 
  data comes from a single data file you can swap for an API).

WHY CARBON MARKETS MATTER: mission page, cause-focused, per blueprint copy.

RESOURCES:
  - Blog (start with 3–5 real explainer posts you write).
  - Compliance Library: each entry = title, issuing body, date, and a 
    plain-English summary IN PRAN'S OWN WORDS (never reproduce source text — 
    copyright). Link to the official source.
  - CCTS explainer, Voluntary market explainer, Glossary.

ABOUT:
  - Why We Exist, Team (structure ready, content from Nitin), Press.

CONTACT / REQUEST DEMO:
  - Real working form → emails you via Resend. Fields: name, company, 
    email, phone, interest (dropdown), message. Confirmation screen + 
    auto-reply email to the submitter.

LEGAL: Terms, Privacy, Compliance Framework (see Part 7 — these are 
  not optional and not boilerplate; they protect you).
```

### 3.6 Non-Negotiable Quality Floor (Every Page)

```
□ Fully responsive down to 360px width (small phones)
□ Keyboard navigable, visible focus states
□ prefers-reduced-motion respected everywhere
□ All images have alt text
□ Page loads under 3 seconds on 4G
□ Real, specific copy — never "lorem ipsum", never vague filler
□ Every link goes somewhere (no dead buttons)
□ Consistent header + footer on every page
```

---

## ═══════════════════════════════════════════════════
## PART 4 — STEP 2: THE MARKETPLACE + ESCROW
## ═══════════════════════════════════════════════════

### 4.1 The Marketplace Page (Bloomberg-Terminal Layout)

```
LEFT RAIL — Filters:
  registry · methodology · vintage · country · price range · SDG tags · 
  verification status

CENTER — Listings (each row):
  developer · registry · methodology · country · vintage · 
  available credits · price · status badge

RIGHT PANEL — Selected project detail:
  verification reports · SDG alignment · satellite imagery (where available) ·
  risk rating · expected price · full documents · [Request to Buy] button

LIVE-FEELING ELEMENTS:
  price ticker, "recently listed" feed, geography heat map.
  (Static/seeded data first; structured to accept live data later.)
```

### 4.2 Where the Project Data Comes From

You have projects sourced from developers, brokers, and registry public data (not direct registry listings). So:

```
- Create a projects data file / Supabase table.
- YOU enter the project data (from your developer/broker relationships).
- Each project record: name, developer, registry, methodology, vintage, 
  country, available volume, indicative price, description, documents, images.
- The marketplace reads from this table. No automated registry feed needed now.
- IMPORTANT: only list projects you can actually source. Listing credits you
  can't deliver is a misrepresentation and a legal risk. See Part 7.
```

### 4.3 The Escrow Purchase Flow (Manual Bank Account Model)

This is the safe, legal way to run escrow before you have automated settlement. Read carefully — this is money, so precision matters.

```
THE FLOW (what the user experiences + what you do behind the scenes):

STEP 1 — Buyer finds a project, clicks [Request to Buy]
STEP 2 — Buyer fills purchase request:
         - volume wanted
         - intended use (BRSR / voluntary / CSR / other)
         - company + contact + KYC details
         - their registry account details (Verra/Gold Standard account ID)
           ← CRITICAL: you need this so the seller can transfer credits to them
STEP 3 — System shows an order summary + total (credits × price + your fee + GST)
STEP 4 — System creates a PENDING order + emails you (the PRAN team)
STEP 5 — YOU verify: buyer KYC, project availability, seller can deliver
STEP 6 — YOU (or the system) send the buyer a Payment Instruction:
         - PRAN's escrow bank account details
         - the exact amount
         - the order reference
         - a Purchase Agreement to sign (see 4.4)
STEP 7 — Buyer signs agreement + transfers money to PRAN's escrow account
STEP 8 — YOU confirm receipt of funds (mark order PAID in admin)
STEP 9 — YOU instruct the seller: "Transfer X credits (serials) to buyer's 
         registry account [ID]"
STEP 10 — Seller transfers credits in the registry, sends confirmation
STEP 11 — YOU verify the transfer landed in buyer's account (ask buyer to confirm)
STEP 12 — YOU release funds from escrow to seller (minus PRAN fee + GST)
STEP 13 — System generates: retirement/ownership certificate + GST invoice
STEP 14 — Order marked COMPLETE. Buyer + seller both notified.

WHY THIS ORDER MATTERS:
- Money is received BEFORE credits move (protects the seller).
- Credits are confirmed in buyer's account BEFORE seller is paid (protects the buyer).
- PRAN sits in the middle as the trusted escrow — this is your whole value.
```

**Automated version (later):** Razorpay collects payment into a PRAN nodal/escrow-style account, and the release step is triggered in-app once you confirm transfer. But you still can't automate the actual registry credit transfer until you have registry API access — that stays manual for now, and that's fine.

### 4.4 Documentation, Due Diligence & Formalities (You Asked — Here's the Full List)

This is what makes your trades legally clean. Do not skip any of it.

**A. Buyer onboarding (KYC) — collect and store:**
```
□ Company PAN
□ GST registration certificate
□ Certificate of incorporation
□ Authorised signatory ID (Aadhaar/passport)
□ Board resolution / authorisation letter (who can transact for the company)
□ Buyer's registry account ID (Verra/Gold Standard) — for credit delivery
□ Purpose declaration (why they're buying — BRSR/voluntary/CSR)
```

**B. Seller onboarding (KYC) — collect and store:**
```
□ Company PAN, GST, incorporation certificate
□ Authorised signatory ID
□ Bank account details (for payout)
□ PROOF THE CREDITS EXIST AND THEY OWN THEM:
  → Registry issuance certificate (shows serial numbers + volume)
  → Screenshot/proof of the credits in the seller's registry account
  → This is the single most important document — without it, do not list or trade.
```

**C. Per-transaction documents:**
```
□ Purchase Agreement (buyer ↔ PRAN or buyer ↔ seller via PRAN) — 
  states volume, serials, price, delivery mechanism, timelines, what 
  happens if transfer fails, governing law (India), dispute resolution.
□ PRAN Platform Terms acceptance (buyer + seller both accept).
□ Escrow terms (how PRAN holds and releases funds).
□ Transfer confirmation (from seller, after registry transfer).
□ Buyer confirmation of receipt (buyer confirms credits landed).
□ GST invoice (PRAN → buyer for platform fee; guidance to seller on their invoice).
□ Retirement/ownership certificate (PRAN-issued, after completion).
```

**D. Due diligence checklist (you run this before every trade):**
```
□ Is the buyer a real, KYC-verified company?
□ Is the seller a real, KYC-verified company?
□ Does the registry issuance certificate match the volume + serials being sold?
□ Are these credits already sold/retired elsewhere? (Check the serials aren't 
  double-listed — ask seller to confirm they're live and unretired.)
□ Is the vintage what the buyer needs?
□ Does the methodology match what's claimed?
□ Is the price within a sane market range?
□ Can the seller actually transfer to the buyer's specific registry account?
  (Some transfers need both parties on the same registry — verify first.)
```

**E. Records you must keep (for every trade, for years):**
```
□ All KYC documents
□ Signed agreements
□ Proof of funds received + released (bank records)
□ Registry transfer confirmations
□ All email correspondence
Store these in Supabase Storage, organised per-order. This record is your 
defence if anything is ever disputed.
```

> **A lawyer must draft your Purchase Agreement, Platform Terms, and Escrow Terms.**
> Claude Code can build the flow and the document templates, but a real Indian
> commercial lawyer must review the legal text before you move real money.
> This is non-negotiable. Budget ₹30,000–₹1,00,000 for this. It is the cheapest
> insurance you will ever buy.

---

## ═══════════════════════════════════════════════════
## PART 5 — STEP 3: THE CARBON CALCULATORS
## ═══════════════════════════════════════════════════

Two separate calculators, same page, with a toggle: **Personal** and **Business**.

### 5.1 Why Getting the Methodology Right Matters

You said you want it "real and trustable over the globe." That means you cannot invent your own numbers. You must use recognised, published emission factors and standard methodologies. If your calculator gives numbers a real expert would disagree with, you lose credibility instantly. Here's how to make it genuinely trustworthy.

### 5.2 Business Calculator — GHG Protocol Based

```
STANDARD TO FOLLOW: The GHG Protocol Corporate Standard (the global standard).
It splits emissions into three "scopes":

SCOPE 1 — Direct emissions (fuel burned on-site, company vehicles)
SCOPE 2 — Purchased electricity
SCOPE 3 — Everything else (supply chain, travel, waste) — hardest, do a 
          simplified version first

WHAT THE CALCULATOR ASKS (Scope 1 + 2 first, Scope 3 basic):
- Electricity consumed (kWh/year) → × grid emission factor for their country
- Fuel used (diesel, petrol, natural gas, LPG — litres or kg/year) → × fuel factor
- Company vehicles (km/year by fuel type)
- Business travel (flights: short/medium/long haul counts; car; rail)
- Basic Scope 3 (optional): employees, waste, water

EMISSION FACTORS — USE THESE PUBLISHED SOURCES (do not invent):
- Electricity grid factors: 
  → India: CEA (Central Electricity Authority) CO2 Baseline Database
  → Other countries: IEA emission factors, or IPCC defaults
- Fuel combustion factors: IPCC 2006 Guidelines / DEFRA (UK Gov) conversion factors
  (DEFRA publishes a free, globally-respected annual emission factors dataset — 
   this is the most practical, credible source to build on.)
- Flights: DEFRA flight factors (by haul length + cabin class)

HOW TO BUILD IT SO IT'S TRUSTWORTHY:
- Store the factors in a versioned data file (e.g. factors_2025.ts) with the 
  SOURCE and YEAR noted for each factor.
- Show the user the source: "Emission factors: DEFRA 2025, CEA 2024."
- State the standard: "Calculated per the GHG Protocol Corporate Standard."
- Show a confidence note: "This is an estimate for guidance. A full inventory 
  requires verified activity data."
```

### 5.3 Personal Calculator — Individual Footprint

```
SIMPLER. Based on established personal-footprint methodology (same DEFRA/IPCC 
factors, applied to household activities).

WHAT IT ASKS:
- Home electricity (kWh/month or "I don't know" → estimate from household size + country)
- Home heating/cooking fuel (gas/LPG)
- Car (km/week + fuel type) 
- Flights per year (short/medium/long)
- Diet (meat-heavy → plant-based scale — uses published dietary footprint ranges)
- Public transport use

OUTPUT: estimated annual tonnes CO2e, compared to country average + global target.

Keep this one visually lighter and friendlier (consumer-fintech tone).
```

### 5.4 What Happens After the Calculation (Both)

```
1. Show the result clearly (big number in tonnes CO2e, mono font, with context).
2. Show a breakdown (which activities contribute most).
3. FIRST recommend REDUCTION (honest positioning — see Part 6.4):
   "Here's how to reduce before you offset."
4. THEN offer offsetting:
   "To balance your remaining X tonnes, we can procure X carbon credits 
    on your behalf."
5. For personal: → simple bundle + [Procure on my behalf] (leads to the 
   procurement request + payment).
6. For business: → [Get a full procurement report] (leads to Part 6 intelligence).
```

### 5.5 The Certificate — CRITICAL LEGAL FRAMING

You explicitly want this to be 100% legal. Here is the exact framing. Read Part 7.1 too.

```
❌ NEVER SAY: "You are carbon neutral" / "Your company is carbon neutral"
   (This is a regulated claim under ISO 14068 + VCMI + greenwashing law. 
    Making it without meeting the full standard creates legal liability.)

✅ SAY INSTEAD (the safe, honest framing):
   "PRAN has procured and retired [X] tonnes of verified carbon credits 
    on behalf of [Name] for the period [dates]."

The certificate states a FACT (credits were procured and retired on their 
behalf), not a CLAIM about their neutrality status. This is legally robust 
because it's simply true and verifiable.

CERTIFICATE CONTENTS:
- "Carbon Credit Retirement Certificate"
- On behalf of: [Name / Company]
- Volume: X tCO2e
- Period: [dates]
- Credits sourced from: [project, registry, methodology, serials]
- Retirement confirmation: [registry reference]
- QR code → public verification page on pranglobal.com
- Disclaimer footer (see Part 7).
```

---

## ═══════════════════════════════════════════════════
## PART 6 — STEP 4: PROCUREMENT INTELLIGENCE + AI REPORTING
## ═══════════════════════════════════════════════════

### 6.1 How the AI Layer Actually Works (Human-Verified)

You want proper AI that analyses everything and makes the best recommendation, with an admin verification step before it reaches the client. Here's the architecture that's both powerful and safe.

```
THE PATTERN (same for procurement intelligence AND for reports):

1. CLIENT submits their data (form + document uploads).
2. AI (Claude API) analyses it and DRAFTS the output (report/recommendation).
3. The draft lands in YOUR ADMIN PANEL as "Pending Review" — NOT sent to client.
4. YOU review the draft. Edit anything wrong. Approve.
5. On approval, the client receives the final output.
6. Client sees status: "Analysing → Under expert review → Ready."

This gives you: the speed of AI + the safety of human sign-off.
The client experiences a premium, fast service. You catch AI mistakes 
before they cause harm. This is exactly right for an early-stage team.
```

### 6.2 Data Input — The Recommended Method

You asked the best way for clients to give you their data. Here it is:

```
USE BOTH: a structured form AND document upload.

STRUCTURED FORM (captures the key numbers cleanly):
- Company details, sector, size
- Energy use, fuel use, travel (the GHG Protocol inputs from Part 5.2)
- Current emissions if known
- What they've already done to reduce
- Their goal (BRSR filing / net-zero target / CBAM / voluntary)
- Budget range for offsetting

DOCUMENT UPLOAD (captures the evidence + detail):
- Electricity bills / energy data
- Previous sustainability/ESG report (if any)
- Production data (for CBAM / intensity)
- Any existing emission inventory

WHY BOTH: the form gives clean structured data the AI can reason over 
directly; the documents give depth and let you verify the form's numbers.
Store uploads in Supabase Storage, per client.
```

### 6.3 The Procurement & Decision Intelligence Engine

```
INPUT: client's emissions data + goal + budget (from 6.2).

WHAT THE AI DOES (via Claude API, with a carefully written prompt):
1. Analyse their emission profile — where are the biggest sources?
2. RECOMMEND REDUCTIONS FIRST (see 6.4) — concrete process/operational changes
   that cut real emissions, ranked by impact vs cost.
3. Calculate the RESIDUAL emissions they realistically can't cut yet.
4. For that residual, recommend the BEST credit types + specific project 
   types for their sector, at the least sensible spend.
5. Produce a clear report: current state → reduce → residual → offset plan → 
   projects to buy → estimated cost.

ADMIN STEP: draft → your review → approve → send to client.

BUILD NOTE: The "AI model" here is not something you train from scratch. 
It's the Claude API with an expert-designed prompt + your emission-factor 
data + your project catalogue. That IS the model. Do not try to train a 
custom ML model now — it's unnecessary and beyond a 2-person team. The 
Claude API with good prompting and your data is genuinely powerful and 
is the right tool.
```

### 6.4 The Honest Positioning (Reduce First — This Is a Real Strength)

You were clear: reduce emissions first, real changes, real impact — then offset. This is not just ethical, it's a competitive moat (most players just sell credits). Bake it in everywhere:

```
- Every report leads with reduction, not offsetting.
- Offsetting is framed as "for what you can't yet eliminate."
- This protects clients from greenwashing accusations too — which protects 
  PRAN's reputation. It's honesty AND risk management AND differentiation.
```

### 6.5 AI Reporting: BRSR / ESG / CBAM

```
Each report type is the same pattern (6.1): client data → AI draft → 
your review → client receives.

- AI BRSR: maps the client's data to the SEBI BRSR format sections.
- AI ESG: board-ready ESG disclosure mapped to BRSR/GRI/SDG frameworks.
- AI CBAM: translates production/supplier data into embedded-emissions 
  figures in the CBAM format.

CRITICAL FOR ALL THREE — the fully-automatic-with-final-review model you want:
- AI builds 100% of the draft.
- You do a final fine review at the end (catch errors, adjust).
- Every report carries the disclaimer from Part 7.3.
- The report says "Prepared by PRAN" — never "audited" or "verified by PRAN" 
  (you are not an accredited auditor; claiming so is illegal).
```

---

## ═══════════════════════════════════════════════════
## PART 7 — LEGAL & COMPLIANCE GUARDRAILS (DO NOT SKIP)
## ═══════════════════════════════════════════════════

You said you want to be 100% legal and legally robust. This part is how. As your CTO I'm flagging these clearly — but where it says "get a lawyer," you genuinely must, because I'm not one and neither is Claude.

### 7.1 Carbon Neutrality Claims (The Biggest Risk)

```
THE RULE: Never let PRAN — or any certificate/report — state that a person 
or company "is carbon neutral" unless they've met the full ISO 14068 standard 
(which requires reduction pathways, not just buying credits).

WHY: "Carbon neutral" is a regulated claim. Regulators (EU, UK, India's ASCI, 
and greenwashing laws globally) are actively penalising unsupported neutrality 
claims. An unsupported claim can create liability for BOTH your client and PRAN.

THE SAFE FRAMING (use everywhere):
- "PRAN procured and retired X tonnes of verified credits on behalf of [name]."
- This states a verifiable fact, not a status claim. It's legally clean.

REFERENCE STANDARDS to align with over time:
- ISO 14068-1 (carbon neutrality)
- VCMI Claims Code of Practice (how to make credible claims)
- ICVCM Core Carbon Principles (credit quality)
Cite that you follow these in your Compliance Framework page — it builds trust 
and shows regulators you're serious.
```

### 7.2 Marketplace / Financial Representation Risk

```
- Only list credits you can actually source and deliver. Listing what you 
  can't deliver = misrepresentation.
- Don't display fake "live" market stats as real data. Frame illustrative 
  numbers honestly ("launching with" / "building toward").
- Don't give investment advice on carbon prices ("prices will rise, buy now"). 
  You facilitate; you don't advise on price speculation.
- Escrow terms must be crystal clear: how PRAN holds funds, when they're 
  released, what happens if a transfer fails, refund conditions.
```

### 7.3 Report & Advice Liability (Protecting You)

You want strong disclaimers so PRAN is legally robust while you're early and learning. Here's what your Terms and every report must contain. Have a lawyer finalise the wording, but these are the required elements:

```
EVERY AI-GENERATED REPORT MUST CARRY (footer/first page):
"This report was prepared by PRAN using AI-assisted analysis based on data 
provided by the client. It is provided for informational and guidance 
purposes. It does not constitute legal, financial, audit, or accredited 
verification services. The client is responsible for verifying the accuracy 
of inputs and for independent verification where required by applicable 
regulations. PRAN makes no warranty of regulatory acceptance."

YOUR PLATFORM TERMS OF SERVICE MUST INCLUDE:
□ Limitation of liability clause (caps PRAN's liability — a lawyer sizes this)
□ "As-is / no warranty" clause for AI-generated outputs
□ Clear statement PRAN is a technology platform + facilitator, NOT an 
  accredited verifier, auditor, broker-dealer, or financial advisor
□ Indemnification (client responsible for how they use outputs)
□ Dispute resolution + governing law (India)
□ Data protection compliance (India DPDP Act 2023)

WHAT YOU CANNOT DISCLAIM AWAY (be aware):
- You can limit liability, but you cannot disclaim FRAUD or GROSS NEGLIGENCE.
- So the human-review step (6.1) isn't just quality — it's your legal shield. 
  It shows you took reasonable care. Never remove it.
```

### 7.4 The Lawyer Checklist (What to Actually Get Drafted)

```
Budget for a commercial lawyer to draft/review these before real money/clients:
□ Platform Terms of Service
□ Privacy Policy (DPDP Act 2023 compliant)
□ Purchase Agreement template (marketplace trades)
□ Escrow Terms
□ Report/Services disclaimer language
□ Compliance Framework page content review

Claude Code builds the flows and drafts starting templates. 
The lawyer makes them enforceable. Do both.
```

### 7.5 Data Protection Basics (Build These In)

```
□ Collect only data you need.
□ Store KYC + documents encrypted (Supabase handles encryption at rest).
□ Privacy policy + cookie consent on the site.
□ A way for users to request their data / deletion (DPDP Act right).
□ Don't email sensitive documents around — keep them in Supabase Storage 
  with access controls.
```

---

## ═══════════════════════════════════════════════════
## PART 8 — THE REALISTIC 3-WEEK PLAN + WHAT COMES AFTER
## ═══════════════════════════════════════════════════

### 8.1 Week-by-Week (What to Actually Build)

```
━━━ WEEK 1 — WEBSITE FOUNDATION ━━━
Day 1:   Set up Next.js + Tailwind + shadcn + Supabase + Vercel + GitHub.
         Deploy an empty site to pranglobal.com. (Get "hello world" live day one.)
Day 2:   Build the design system (Part 3.2) — tokens, fonts, base components.
Day 3-4: Homepage Sections 0–2 (cinematic open, mission, marketplace preview).
Day 5:   Homepage Sections 3–8. Header + footer. Mobile responsive pass.
Weekend: Review, fix, commit. Homepage done and live.

━━━ WEEK 2 — MARKETPLACE + CALCULATORS ━━━
Day 6-7: Marketplace page (layout, filters, listings, detail panel) with 
         your seeded project data.
Day 8:   Buy-request flow (form → order → email to you). No payment automation 
         yet — payment instruction is manual per Part 4.3.
Day 9-10: Business calculator (GHG Protocol, DEFRA/CEA factors) — fully working.
Day 11:  Personal calculator — fully working. Both output + reduce-first + 
         procure CTA.
Weekend: Carbon Intelligence hub + 4 sub-pages + Solutions pages.

━━━ WEEK 3 — SERVICES + FORMS + LAUNCH ━━━
Day 12-13: AI reporting flow (data form + upload → Claude API draft → admin 
           review panel → deliver). Start with ONE report type (BRSR), 
           template the rest.
Day 14:  Procurement intelligence flow (same pattern).
Day 15:  Contact/Request Demo forms (Resend), Dashboard (static data), 
         Resources, About/Team (with content from you), Legal pages.
Day 16-17: Full site polish, mobile QA, load speed, accessibility, fix dead 
           links, real copy everywhere.
Day 18:  Legal disclaimers in place (lawyer-reviewed text), Terms/Privacy live.
Launch:  Full site live. Marketplace + calculators working. Services working 
         as capture→review→deliver.
```

### 8.2 Honest Flag on Week 3

```
The AI reporting and procurement engine in Week 3 will be a WORKING FLOW 
(client submits → AI drafts → you review → deliver) but the AI prompts will 
need refining with real cases over the following weeks to be truly excellent. 
That's normal and fine. Ship the flow; perfect the intelligence over time.

Also: real automated escrow (Razorpay integration) and lawyer-drafted 
contracts realistically land in weeks 4–6, not inside the 3. Run the manual 
escrow (Part 4.3) for your first real trades — it's safer while you're learning.
```

### 8.3 After the 3 Weeks (The Automation Roadmap)

```
MONTH 2:  Razorpay escrow automation · lawyer-drafted contracts live · 
          refine AI report quality with real cases · real project photos in.
MONTH 3:  Team/buyer/seller dashboards · more report types automated · 
          Carbon Market Dashboard wired to first live data feeds.
MONTH 4+: Registry integrations as they become available · scale the AI · 
          blockchain audit layer (only when there's real volume to prove).
```

---

## ═══════════════════════════════════════════════════
## PART 9 — QUESTIONS TO ANSWER DURING THE BUILD
## ═══════════════════════════════════════════════════

Claude Code should ask you these at the relevant moment (and you should have answers ready):

```
WEBSITE:
- Final wordmark/logo files? (SVG preferred)
- Exact leadership names, roles, one-liners for homepage Section 6?
- The real marketplace stat numbers (or confirm "launching with" framing)?
- Brand philosophy line — keep exactly as blueprint, or any edit?

MARKETPLACE:
- Your real starting project list (the data to seed)?
- Your PRAN escrow bank account details (for payment instructions)?
- Your platform fee % (and is it shown to buyer, seller, or both)?

CALCULATORS:
- Confirm DEFRA + CEA + IPCC as the factor sources (my recommendation)?
- Which countries to support at launch (India only, or global)?

SERVICES / AI:
- Your Anthropic API key set up for the Claude API?
- Who does the admin review of AI drafts — you, or both founders?
- Confirm the "reduce-first" positioning as locked?

LEGAL:
- Have you engaged a commercial lawyer yet? (If not, start now — parallel track.)
- Confirm the "procure on behalf of" framing (never "carbon neutral")?
- Company entity for Terms/contracts — Santhol Merchantile Pvt. Ltd.?
```

---

## ═══════════════════════════════════════════════════
## APPENDIX — THE ONE-PAGE SUMMARY (Pin This Up)
## ═══════════════════════════════════════════════════

```
WHAT WE'RE BUILDING:
The financial infrastructure for the carbon market. pranglobal.com.
Marketplace + Calculators + Procurement Intelligence + AI Reporting.

STACK: Next.js + Tailwind + shadcn + Supabase + Vercel + Resend + Claude API.
MAIN DEVELOPER: Claude Code, driven by two founders, guided by this document.

THE 4 FEATURES & THEIR MODE:
1. Marketplace   → browse (auto) + buy (escrow: payment real, transfer manual)
2. Calculators   → 100% working now (personal + business, GHG Protocol/DEFRA)
3. Procurement   → AI drafts → you review → client gets it
4. AI Reporting  → AI drafts → you review → client gets it (BRSR/ESG/CBAM)

THREE THINGS THAT KEEP US LEGAL:
1. Never say "carbon neutral" — say "procured & retired X credits on behalf of."
2. Human review before any AI report/advice reaches a client.
3. Lawyer-drafted Terms, Purchase Agreement, Escrow Terms, disclaimers.

THE 3-WEEK GOAL:
A site that looks and works like a 100% real tech platform. Calculators truly 
live. Everything else working as capture → review → deliver. Automate after.

THE HONEST TRUTH:
Ship the safe version fast. Automate the risky parts (money, AI, legal) 
carefully over the following months. That's how real fintechs launch.
```

---

*PRAN Master Build Workflow v3.0*
*For Claude Code + founding team | Prepared by PRAN CTO office*
*Supersedes prior build prompts. Internal use only.*
