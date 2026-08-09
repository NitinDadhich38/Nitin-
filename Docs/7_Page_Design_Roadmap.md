# 7_Page_Design_Roadmap.md — Interior Page Redesign
### Project: PRAN | Every page as an independent entity
### Started 2026-08-08. Read with [5_Design.md](5_Design.md) §3 (the craft standard).

---

## 0. HOW THE AI MUST USE THIS FILE

```
READ this file plus 5_Design.md §3 before redesigning any page.
UPDATE the status column the moment a page ships.

STATUS 2026-08-08: founder said "implement everything", so Waves 0-4 were
built in one pass rather than one page per session. Every interior page
template now ships. What remains is listed in §7 — mostly work that needs
founder input or a production build, not design work.
```

---

## 1. THE BRIEF (founder, 2026-08-08)

> "Enhance each and every page like we've done the home page, so that everything
> has its own impact. Consider each page as an independent entity. Redesign it
> and deliver the message we want in the clearest and most impactful words with
> a great visual representation — so that it speaks before the words do."

---

## 2. LOCKED DECISIONS (2026-08-08 — do not re-litigate)

```
SEQUENCE     Wave 0 (foundations) → Solutions → Intelligence → credibility →
             product surfaces → legal/system.

IMAGERY      DIAGRAM-FORWARD. Interior pages lead with bespoke SVG, big
             numbers and typography — NOT photography.

             The doctrine: you enter through the world, then you are inside
             the machine. The homepage is the overture and keeps its
             photography — one cinematic moment, the way in. Every page after
             it is the instrument panel. This is 5_Design.md §8's
             "Cinematic → transitions to Data", made literal.

             Consequence: TexturedSection (photo-under-scrim) is retired. It
             added texture but never meaning, and it is not the register of
             financial infrastructure.

INTELLIGENCE The four services are NOT LIVE — they are being built. Pages
             announce honestly with waitlist / early-access framing. No page
             may imply a delivered product. (CLAUDE.md: never invent.)

DEPTH        Full bespoke, one page per session. Every page gets its own
             signature visual, built and verified in the browser.
```

---

## 3. THE RULE FOR EVERY PAGE

```
ONE signature visual · ONE sentence · ONE action.

The signature visual must be specific to that page. If it could be moved to
another page without anyone noticing, it is decoration — cut it and start again.

The sentence is what a visitor repeats to a colleague.

The action is the single thing we want next. Not four.
```

---

## 4. THE PAGES

Status: `TODO` · `WIP` · `DONE` · `BLOCKED`

### Wave 0 — Foundations

| # | Deliverable | Status |
|---|---|---|
| 0.1 | Craft kit — `src/components/craft/*` | **DONE** 2026-08-08 |
| 0.2 | `5_Design.md` → v2.1 (reconciled with code + craft standard) | **DONE** 2026-08-08 |
| 0.3 | Live specimen at `/style-guide/craft` | **DONE** 2026-08-08 |
| 0.4 | Founder locks the standard | **AWAITING FOUNDER** |

### Wave 1 — Revenue pages

| # | Page | Mode | Signature visual | The sentence (draft — founder to approve) | Status |
|---|---|---|---|---|---|
| 1.1 | `/solutions/enterprise` | cinematic → data | **The compliance calendar** — a scroll-driven timeline of BRSR / CBAM / CCTS obligation dates with "you are here" marked | "Your disclosure deadline is already set. The market you have to buy from isn't ready — so we built the part that is." | **DONE** |
| 1.2 | `/solutions/developers` | cinematic → data | **The money path** — credit → registry → escrow → buyer, drawn as a rail with days and what the developer keeps | "You did the hard part. Getting paid for it shouldn't take another year." | **DONE** |
| 1.3 | `/solutions/government` | forest → data | **Sovereign scale** — registry/standard/jurisdiction view at portfolio scale | "Policy sets the target. Infrastructure decides whether it's reachable." | **DONE** |
| 1.4 | `/solutions/public` | warm (consumer-fintech register) | **Your footprint as an object** — one shape, sized against a real benchmark | "You can't manage what you've never been shown." | **DONE** |
| 1.5 | `/intelligence` (hub) | cinematic | **Four doors, each showing its artifact** | "Reporting is a research problem before it's a writing problem." | **DONE** |
| 1.6 | `/intelligence/[service]` ×4 | data | **The deliverable itself** — a real rendered page of the BRSR report / CBAM declaration / procurement brief, not a card describing it | per service — all framed as *in development*, waitlist CTA | **DONE** |
| 1.7 | `/contact` | data | **A routed desk** — which door do you need; each routes to a short, distinct form | "Tell us which side of the market you're on." | **DONE** |

### Wave 2 — Credibility pages

| # | Page | Mode | Signature visual | The sentence (draft) | Status |
|---|---|---|---|---|---|
| 2.1 | `/why-carbon-markets` | cinematic (highest ceiling on the site) | **One tonne of CO₂ at human scale** — a tonne is roughly a 10 m sphere; render it beside a person, a car, a house. Then put a price on it, then show where the price sends the money. | "Nobody has an intuition for a tonne. That's exactly the problem." | **DONE** |
| 2.2 | `/about` | cinematic → data | **The is/isn't contrast made visual** — struck-through claims resolving into what PRAN actually is (copy already exists, currently trapped in a 2×2 card grid) | "We are not a green brand. We are the plumbing." | **DONE** |
| 2.3 | `/about/team` | data | One large editorial portrait, founder-led | — | **DONE** (photo still missing — monogram fallback) |
| 2.4 | `/about/press` | data | A press **kit**: logo pack, boilerplate, founder bio, contact | — | **DONE** (vector pack on request) |

### Wave 3 — Product surfaces

| # | Page | Mode | Signature visual | Notes | Status |
|---|---|---|---|---|---|
| 3.1 | `/calculator` | data (warmer on the personal side) | **The result as a visual object**, benchmarked, with an honest bridge to the marketplace | HARD RULE: only "purchased and retired X tCO₂e". Never neutral / net zero / climate positive. | **DONE** |
| 3.2 | `/marketplace` | data | Craft pass, not a rebuild — redesigned 2026-08-01 and already strong | Apply mode-shift + signature-visual test to the filter rail | **DONE** |
| 3.3 | `/[project]` | data | Craft pass — the map hero already works | NOT STARTED. Left deliberately untouched: the satellite-map hero is the strongest page on the site and it is the highest-risk file to disturb (590 lines, merges three data sources). Do this one on its own. | **TODO** |
| 3.4 | `/resources` + `/resources/[slug]` ×5 | data | Editorial reading experience: real hierarchy, sticky outline, plain-English margin notes | The glossary + CCTS explainer should be the best free explainers in the Indian market — a distribution asset, not a nav item | **DONE** |

### Wave 4 — System & finish

| # | Deliverable | Status |
|---|---|---|
| 4.1 | `/legal/*` — quiet DocHeader + reading progress. Wording untouched; **lawyer review still needed**. | **DONE** |
| 4.2 | `not-found.tsx` | **DONE** |
| 4.3 | OG images per page | TODO |
| 4.4 | 375px pass — **DONE**, 14 pages, zero overflow. Reduced-motion honoured in code; unverifiable in this sandbox | **PARTIAL** |
| 4.5 | Performance check (needs a production build) | TODO |
| 4.6 | Retire `TexturedSection` + the unused `PageHeader`/`FeatureGrid` path once every page is migrated | **DONE** |

---

## 5. CONTENT DEPENDENCIES (only the founder can unblock)

```
[ ] Leadership — name, role, bio, portrait.  Blocks 2.3.
[ ] Press assets — logo pack, boilerplate, coverage.  Blocks 2.4.
[ ] Real proof numbers — customers, transacted volume, closed deals, partners.
    Everything marketing-facing today is DERIVED from the portfolio sheet.
    CLAUDE.md forbids inventing the rest, so a page without a real number gets
    a mechanism diagram instead. That is a real ceiling on Wave 1 and 2.
[ ] Intelligence service detail — what each will actually deliver, and roughly
    when. Needed to write honest "in development" copy that still sells.
[ ] Project photography — 86 of 112 listings still on stock. Does NOT block
    this roadmap (interior pages are diagram-forward now) but still caps the
    marketplace and project pages.
```

---

## 6. NON-NEGOTIABLES ON EVERY PAGE

```
- Never "carbon neutral" / "net zero" / "climate positive". Only
  "purchased and retired X tCO2e of verified carbon credits for [period]".
- PRAN never creates credits, never audits, never verifies.
- No invented projects, prices, volumes or regulatory facts.
- Any drawing plotting real numbers carries its source line.
- Works at 375px. Respects prefers-reduced-motion. No content may strand hidden.
- Flag certificates / disclaimers / neutrality / regulatory claims for
  "lawyer review needed".
```

---

## 7. WHAT REMAINS AFTER THE 2026-08-08 BUILD

```
DESIGN WORK STILL OPEN
  3.3  /[project] craft pass — not started, deliberately. See its row.
  4.3  OG images per page.
  4.5  Performance check — needs a production build, which cannot run while
       a dev server holds .next (6_Memory.md §7).

VERIFIED THIS BUILD
  · 27 routes return 200; /not-a-page correctly 404s with the new page.
  · tsc clean. No server errors in the dev log.
  · 14 pages measured at 375px — zero horizontal overflow on every one.
  · Banned-claims audit across all of src/: every hit for "carbon neutral" /
    "net zero" / "climate positive" is a prohibition, legal text, an
    educational warning, or a sourced third-party target. No violations.

NOT VERIFIABLE HERE (judge on Vercel)
  · CSS load animations. The Browser pane runs with visibilityState
    "hidden", so the page never composites and every animation sits at
    currentTime 0. The proven homepage hero shows the same symptom. Only
    React-applied state can be checked in this sandbox.
  · Real fonts and any remote imagery (Google Fonts times out here).

STILL BLOCKED ON THE FOUNDER
  · Founder photo for /about/team (monogram fallback is live).
  · Real proof numbers — see §5.
  · What each Intelligence service will deliver, and roughly when.
  · Lawyer review of /legal/* — wording was NOT touched in this build.
```

---

*7_Page_Design_Roadmap.md — update status on ship.*
