# Design.md — Visual Design System
### Project: PRAN | Phase 1 Build
### Colors, theme, fonts, typography, motion. The AI follows this exactly.

---

## 0. HOW THE AI MUST USE THIS FILE

```
This is the single source of truth for how PRAN looks. Set all of this up
as CSS variables and Tailwind config tokens. Never introduce a color,
font, or component style not defined here. When unsure, match the closest
existing element.
```

---

## 1. THE POSITIONING (Why the Design Is What It Is)

```
PRAN is financial infrastructure for carbon, not a "green" brand.
Design language: numbers over adjectives, market depth over leaf icons,
Bloomberg/Zerodha seriousness — not eco-startup cliché.

The site shifts mood by section, intentionally:
- Cinematic moments  → dark, filmic (the "Apple keynote" register)
- Data moments       → cool, dense, teal (the "Bloomberg" register)
- Trust moments      → navy + gold, institutional (the "Reliance" register)
```

---

## 2. COLOR SYSTEM

```
CINEMATIC MODE (homepage opening, mission statements)
  --bg-cinematic:      #0A0A0A   near-black
  --text-cinematic:    #FFFFFF   white
  Used for: 3D globe hero, large mission statements

DATA MODE (marketplace, dashboard, calculator, intelligence)
  --bg-data:           #FFFFFF   white
  --primary-teal:      #0F5F5C   deep teal-green (primary working color)
  --primary-teal-dark: #0A403E   hover/active
  --text-data:         #0F1A1A   near-black text on white
  --muted:             #5B6B6A   secondary text
  --border:            #E2E8E7   subtle borders
  Used for: all product surfaces, tables, filters, charts

TRUST MODE (team, why we exist, primary CTAs)
  --navy:              #0A1F44   deep navy
  --gold:              #C9A227   gold accent
  --text-on-navy:      #FFFFFF
  GOLD RULE: gold is ONLY for primary buttons and key numbers.
  Never decorative. It must always signal "this matters."

STATUS COLORS (badges, order/project states)
  --success:  #1E7A46   green   (ACTIVE, COMPLETED, VERIFIED)
  --pending:  #B7791F   amber   (PENDING, AWAITING, PAYMENT_PENDING)
  --danger:   #B42318   red     (REJECTED, FAILED, CANCELLED)
  --info:     #1F6FB2   blue    (INITIATED, PROCESSING)
```

---

## 3. TYPOGRAPHY

```
HERO / STATEMENT TYPE (the "Growth is Life" register)
  Font: an editorial serif or high-contrast display sans.
  Recommended: "Fraunces" (serif) or "Clash Display" (display sans).
  Use for: homepage beats, section headlines, mission statements.
  Weight: 500-700. Large sizes. Generous line-height.

DATA / BODY TYPE (the Bloomberg register)
  Font: a clean grotesk.
  Recommended: "Inter" or "Geist".
  Use for: all body text, tables, filters, forms, data, buttons.
  Weight: 400 body, 500-600 emphasis.

SETUP: load both via next/font. Never load fonts via <link> or CDN.

TYPE SCALE (suggested, adjust in the style guide)
  Display:  clamp(2.5rem, 6vw, 5rem)     hero statements
  H1:       clamp(2rem, 4vw, 3.25rem)
  H2:       clamp(1.5rem, 3vw, 2.25rem)
  H3:       1.25rem
  Body:     1rem  (16px min — never smaller for body)
  Small:    0.875rem
  Numbers (stat cards): use the display/serif for large figures to feel
  "financial," with a monospace-tabular feel for aligned data tables.
```

---

## 4. COMPONENTS

```
BUTTONS
  Primary:    gold background (#C9A227), navy or black text, subtle
              hover darken. Used for the ONE main action per screen.
  Secondary:  teal outline or teal fill depending on context, white text.
  Ghost:      transparent, teal text, for tertiary actions.
  Radius:     8px consistently. Never mix radii.

CARDS
  White background, --border, 12px radius, soft shadow on hover only.
  Stat cards (Bloomberg-style): NO icons. Large number + label. The
  number uses the display font; the label uses the grotesk, muted.

BADGES / STATUS CHIPS
  Small, rounded-full, status color background at ~12% opacity with the
  status color text. One badge component used everywhere.

INPUTS / FORMS
  Clean, --border, teal focus ring, 8px radius. Clear labels above.
  Error text in --danger below the field. One form-field component reused.

TABLES (marketplace, admin)
  Dense but readable. Zebra rows optional and subtle. Tabular-aligned
  numbers. Sticky header on scroll.
```

---

## 5. LAYOUT

```
  Max content width: 1280px, centered, with responsive gutters.
  Marketplace uses a wider working area (three-panel).
  Consistent vertical rhythm — use a spacing scale (4, 8, 12, 16, 24,
  32, 48, 64, 96). Never arbitrary pixel values.
  Generous whitespace at trust/mission moments; denser at data moments.
```

---

## 6. MOTION

```
  The homepage opening (3D globe) is the ONE place for full authored
  animation. Everywhere else, motion is restrained:
  - Scroll-reveals: subtle fade + 12px rise, ~400ms, ease-out.
  - Counters: numbers tick up when they scroll into view.
  - Charts: gentle draw-in, once.
  - Hover: subtle, fast (150ms). No bouncing, no spinning, no parallax
    overload.
  Use Framer Motion. Respect prefers-reduced-motion (disable animations
  for users who request it).
```

---

## 7. IMAGERY

```
  Real project sites and real people (farmers, developers, project areas)
  — NOT stock leaf/globe icon sets.
  Until real photos are provided: styled dark-gradient placeholder blocks
  with a small label (e.g., "Project site — [Location]"). NEVER blank grey.
  Optimize all images through next/image.
```

---

## 8. MODE-BY-PAGE MAP

```
PAGE                          MODE
────────────────────────────  ──────────────────────────────
Homepage opening              Cinematic
Homepage mission sections     Cinematic → transitions to Data
Marketplace                   Data (teal)
Carbon Market Dashboard       Data (teal)
Calculator                    Data (teal), Personal side warmer/friendlier
Carbon Intelligence pages     Data (teal)
Solutions - General Public    Consumer-fintech (lighter, friendlier)
Team / Why We Exist / CTAs    Trust (navy + gold)
Admin panel                   Data (teal), utilitarian
```

---

## 9. THE STYLE GUIDE PAGE

```
Build a /style-guide page (internal) showing EVERY token: all colors,
all text styles, all button variants, badges, cards, inputs, a sample
stat card, a sample table row. The founder reviews this ONCE to lock the
look before real pages are built. This is the visual contract.
```

---

*Design.md — PRAN Phase 1 | The visual contract. Match it exactly.*
