# Design.md — Visual Design System (v2.1)
### Project: PRAN | Phase 1 Build
### The visual contract. Match it exactly.

> **v2.1 — 2026-08-08.** Reconciles this doc with what the code has actually
> shipped since 2026-07-24 (this file still described the abandoned v1.0
> teal/navy/gold system), and adds **§3, the craft standard** — the techniques
> that make the homepage work, written down so every interior page inherits them
> instead of re-inventing them. Palette and type are unchanged from v2.0.

---

## 0. HOW THE AI MUST USE THIS FILE

```
This is the single source of truth for how PRAN looks. All of it lives as
Tailwind tokens (tailwind.config.ts) and CSS variables (src/app/globals.css).
Never introduce a color, font, radius or shadow not defined here.

Before redesigning any page, read §3 (the craft standard) and §4 (the kit),
then the page's row in 7_Page_Design_Roadmap.md.
```

---

## 1. THE POSITIONING (why the design is what it is)

```
PRAN is financial infrastructure for carbon, not a "green" brand.
Numbers over adjectives. Market depth over leaf icons. Bloomberg/Zerodha
seriousness, not eco-startup cliche.

THE DOCTRINE (v2.1):
  You enter through the world, then you are inside the machine.

  The HOMEPAGE is the overture. It is the one cinematic moment and the one
  place photography carries the argument: full-bleed forest, filmic push-in,
  grain, kinetic type.

  EVERY INTERIOR PAGE is the instrument panel. Diagram-forward — bespoke SVG,
  statement numbers, ledgers, typography. Not photography.

  This is not a contradiction; it is the §8 mode map made literal. A trading
  terminal does not run forest photography, and neither does PRAN past the
  front door.
```

---

## 2. TOKENS

### 2.1 Color (`tailwind.config.ts` → `colors.pran`)

```
CORE
  paper         #FAF8F4   page background — warm, never pure white
  paper-warm    #F5F1EA   alternating section background
  surface       #FFFFFF   cards floating on paper
  ink           #0E1211   primary text; ALSO the cinematic ground
  muted         #5F6B66   secondary text
  hairline      #E6E1D8   borders and rules (alias: border)
  forest        #0F3D2E   dark sections, footer, institutional moments
  forest-deep   #0A2A20   darker layer / hover
  emerald       #16A34A   primary action
  emerald-hover #15803D
  lime          #D9F99D   rare highlight — the signal color
  clay          #C97A4A   warm data accent (second series in charts)
  green         #12A33A   brand logo emblem — FIXED, never restyled

STATUS
  success #15803D   pending #B45309   danger #B42318   info #1D4ED8

LIME RULE (inherits v1.0's gold rule)
  Lime is a SIGNAL, never decoration. Statement numbers, the drawn
  underline, active states. If it appears three times on a screen it has
  stopped signalling anything.

LEGACY ALIASES
  teal/teal-dark/navy/gold are REPOINTED to the v2.0 palette so any
  un-migrated page inherits the right look. Never use them in new work.
```

### 2.2 Type

```
DISPLAY   Space Grotesk   via next/font  (--font-display)
BODY      Inter           via next/font  (--font-sans)
Never load fonts via <link> or CDN.

SCALE (tailwind fontSize)
  display-xl  clamp(2.5rem, 7vw, 5.5rem)     homepage beats
  display-l   clamp(2.25rem, 5vw, 3.75rem)
  h2          clamp(1.75rem, 3vw, 2.5rem)
  h3          1.375rem
  body        1rem minimum — never smaller for body copy

  Interior hero: clamp(2.4rem, 5.6vw, 4.6rem). Deliberately below the
  homepage — an interior headline shares the screen with its own diagram.

  Statement numbers: display font, tabular-nums, tracking -0.045em.
```

### 2.3 Radius / shadow / layout

```
RADIUS   btn 12  ·  card 16  ·  panel 24  ·  hero 32.  Never mix others.
SHADOW   card / float / lift — all brand-tinted with forest (10,42,32),
         never flat gray. Ledgers and rules carry NO shadow.
WIDTH    max-w-content = 1200px, centered, 1.5rem gutters.
RHYTHM   ModeBand sizes: sm 14/16 · md 20/24 · lg 24/32 · xl 32/40.
         Never arbitrary vertical padding.
```

---

## 3. THE CRAFT STANDARD  ← the heart of v2.1

These seven techniques are why the homepage works. They are the definition of
"impact" on this site. Every interior page uses them.

```
1. THE OPENING IS AN IMAGE, NOT A RECTANGLE
   A page never opens on a colored band with a heading in it. The homepage
   opens on a photograph; interior pages open on a DRAWN FIELD — geometry
   specific to that page's argument, behind the headline.

2. KINETIC TYPOGRAPHY
   The headline reveals line-by-line from behind a mask. One phrase gets the
   emphasis treatment: lime, with an underline that draws itself.
   (.hero-line / .hero-line-in / .hero-em in globals.css)

3. ONE STATEMENT NUMBER PER PAGE
   One enormous figure, set as a physical object, that makes the argument
   before it is read (the homepage's glowing 24 Gt). AT MOST ONE per page —
   a second turns both into a stat row, which is a weaker component.
   Glow only in dark modes; on paper it reads as a smudge.

4. BESPOKE GEOMETRY, NEVER A CHART LIBRARY
   Diagrams are hand-built SVG that draw themselves on scroll. PRAN plots
   only endpoints somebody published; a chart library will happily
   interpolate a curve nobody did. Anything carrying real numbers carries
   its source line.

5. ALTERNATE THE REGISTER
   Scrolling should feel like walking room to room: cinematic → paper →
   forest. Never run three sections of the same mode in a row.

6. SEQUENCES MOVE
   Escrow is the product and escrow is movement. A process is a rail that
   draws itself, not numbered boxes. Hollow nodes mark manual steps, so the
   diagram never overclaims what PRAN automates.

7. FACTS BELONG IN A LEDGER
   Rounded cards with soft shadows are the register of a SaaS landing page.
   Hairlines and right-aligned tabular figures are the register of a
   settlement statement — which is what PRAN actually produces.
```

**The test for any page:** one signature visual, one sentence, one action. If
the signature visual could move to another page unnoticed, it is decoration —
cut it and start again.

---

## 4. THE INTERIOR KIT (`src/components/craft/`)

```
DrawnHero      Full-bleed drawn opening + kinetic headline. Replaces
               PageHeader. `field` takes the page's bespoke SVG.
               `underChrome={false}` on chrome-free pages.
Em             The emphasis word with the self-drawing underline.
FieldPath      A stroke inside a hero field. ALWAYS use this over a bare
               <path className="field-draw"> — it sets pathLength={1},
               without which the dasharray renders a 1px dotted rule.

DrawnFigure    Scroll-drawn figure: in-view trigger, reduced motion, source
               line. Draw state travels by CONTEXT — interior pages are
               server components and a render-prop child cannot cross the
               server/client boundary.
DrawnPath      A stroke that draws itself.
DrawnIn        A group that lands after its line has drawn.

ModeBand       Section wrapper: cinematic | forest | data | warm.
BandHeader     Section opener sized for interior pages.
BigFigure      The statement number (technique 3).
Ledger         Hairline data block (technique 7).
FlowRail       Self-drawing process rail (technique 6).
```

Live specimen: **`/style-guide/craft`**. Tokens and base components:
`/style-guide`.

---

## 5. COMPONENTS

```
BUTTONS   Primary emerald fill · outline · dark. Radius 12. One primary
          action per screen.
CARDS     surface on paper, radius 16, shadow-card; float on hover only.
          Use a Ledger instead wherever the content is really facts.
BADGES    rounded-full, status color at ~12% with status color text.
INPUTS    hairline border, emerald focus ring, radius 12, labels above,
          danger text below.
TABLES    Dense, tabular-aligned numbers, sticky header, subtle zebra.
```

---

## 6. MOTION

```
Homepage opening is the ONE place for full authored animation.
Everywhere else motion is restrained:
  - Scroll reveals: fade + 12-16px rise, ~400-500ms, ease-out, once.
  - Diagrams: draw in once, on entry.
  - Hover: 150ms, subtle. No bounce, no spin, no parallax.

TWO HARD RULES
  1. Respect prefers-reduced-motion — snap to the final visible state.
  2. Content must NEVER strand hidden. Above-the-fold entrances are CSS
     load animations (no IntersectionObserver). Scroll-triggered reveals go
     through useInViewOnce, which layers four triggers including an
     unconditional timer, because a missed trigger degrades to an invisible
     page, not to "no animation".
```

---

## 7. IMAGERY

```
DIAGRAM-FORWARD (v2.1). Interior pages lead with drawn geometry, statement
numbers and typography — not photography.

Photography is reserved for:
  - the homepage (the overture),
  - real project sites on marketplace and project pages.

Never stock leaf/globe icon sets. Stock photography is ILLUSTRATIVE and must
never be captioned as a project site (`hasRealPhoto` stays false).
All images through next/image.
```

---

## 8. MODE-BY-PAGE MAP

```
PAGE                        OPENING      BODY
─────────────────────────  ───────────  ──────────────────────────
/ (homepage)                Cinematic    photography → data → forest
/why-carbon-markets         Cinematic    the most cinematic interior page
/about                      Cinematic    → data
/solutions/enterprise       Cinematic    → data
/solutions/developers       Cinematic    → data
/solutions/government       Forest       → data
/solutions/public           Warm         consumer-fintech, lighter
/intelligence + /[service]  Cinematic    → data
/calculator                 Data         personal side warmer
/marketplace, /[project]    Data         dense, working surfaces
/resources/*                Data         editorial reading
/contact                    Data         routed desk
/legal/*                    Data         editorial legal, plain-English
/admin                      Data         utilitarian
```

---

## 9. THE STYLE GUIDE PAGES

```
/style-guide        tokens, buttons, badges, cards, inputs (internal, noindex)
/style-guide/craft  the craft standard, live (internal, noindex)

The founder reviews /style-guide/craft ONCE to lock the interior standard
before the remaining page templates are built from it.
```

---

*Design.md v2.1 — PRAN Phase 1. Supersedes v2.0 and the abandoned v1.0.*
