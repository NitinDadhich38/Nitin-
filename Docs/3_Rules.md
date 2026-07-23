# Rules.md — Boundaries and Guardrails for the AI
### Project: PRAN | Phase 1 Build
### Paste this at the START of every Claude Code session.

---

## 0. THE PRIME DIRECTIVE

```
Build ONE task at a time. Complete only what is asked. Do not build ahead.
When a task is ambiguous, ASK before assuming. Never guess and build wrong.
Never invent data, numbers, prices, projects, or regulatory facts.
At the end of each task, state: what you built, how to test it, and what
manual steps or environment variables I must set myself.
```

---

## 1. BUSINESS LOGIC RULES (Never Violate)

```
RULE 1 — PRAN NEVER CREATES CARBON CREDITS.
Credits come only from a seller's registry certificate. No feature,
function, or field may calculate, estimate, or generate sellable credits.

RULE 2 — THE CARBON CALCULATOR ESTIMATES FOOTPRINTS, NOT CREDITS.
It tells a user their emissions. It never "generates" credits from that.
Credits to offset come from the marketplace (real, certificate-backed).

RULE 3 — NEVER SAY "CARBON NEUTRAL."
The words "carbon neutral," "net zero," and "climate positive" are BANNED
from all certificates, claims, and user-facing copy about a purchase.
Use only factual statements: "purchased and retired X tCO2e of verified
carbon credits for [period]." This is a legal requirement (ISO 14068,
VCMI Claims Code, greenwashing law).

RULE 4 — ESCROW STEPS ARE NEVER SKIPPED.
The manual seller-transfer step stays. Do not "automate" credit transfer
to make it faster. PRAN facilitates and verifies; it does not move credits.

RULE 5 — PAYMENTS ARE VERIFIED SERVER-SIDE.
Never mark an order paid based on the browser. Always verify the Razorpay
signature on the server before trusting any payment.

RULE 6 — PRAN IS NOT AN AUDITOR.
Never imply PRAN verifies, audits, or assures projects or reports. PRAN
lists, facilitates, and records. Verification is done by registries/VVBs.
```

---

## 2. TECHNICAL RULES

```
RULE 7 — STACK IS LOCKED.
Use only the stack in Architecture.md. No new frameworks, databases, or
services without asking. If you think something is better, ASK first.

RULE 8 — NO SECRETS IN CODE.
Never hard-code emails, bank details, API keys, or passwords. Read from
environment variables. Keep .env.example current. Never commit .env.local.

RULE 9 — NO BROWSER STORAGE FOR SENSITIVE DATA.
No localStorage/sessionStorage for anything sensitive. Use the database.

RULE 10 — ONE SOURCE OF TRUTH FOR NUMBERS.
Placeholder stats, fees, and constants live in lib/config.ts. Emission
factors live in lib/emission-factors.ts. Never scatter magic numbers.

RULE 11 — MONEY IS HANDLED CAREFULLY.
Use precise decimal handling for all money. Store amounts clearly. Never
use floating-point math that could produce ₹99.99999.

RULE 12 — ADMIN AREAS ARE PROTECTED.
Everything under /admin requires an authenticated admin. Never expose
admin APIs publicly. Check auth on the server, not just by hiding UI.
```

---

## 3. DATA + CONTENT RULES

```
RULE 13 — NEVER FABRICATE PROJECTS OR PRICES.
Real project data comes from the founder or the database. If the database
is empty, show a clean empty state — do NOT invent projects to fill it.

RULE 14 — NEVER INVENT REGULATORY FACTS.
BRSR, CBAM, CCTS, and registry rules change. Do not state deadlines,
thresholds, or requirements from memory. Ask the founder to confirm
against official sources, and flag any uncertainty clearly.

RULE 15 — NEVER COPY OFFICIAL TEXT.
In the Compliance Library and explainers, write plain-English summaries
in PRAN's own words. Never paste text from official documents (copyright
and accuracy risk).

RULE 16 — NO BLANK GREY BOXES.
Where real content (photos, bios) isn't ready, use styled placeholders
(dark gradient blocks with a label), never empty grey rectangles.
```

---

## 4. UI + DESIGN RULES

```
RULE 17 — FOLLOW THE DESIGN SYSTEM EXACTLY (see Design.md).
Match colors, fonts, spacing, and component styles. Never introduce a new
button style, card style, or color not in the design system.

RULE 18 — REUSE BEFORE CREATING.
Before making a new component, find the closest existing one and extend it.
Consistency over novelty.

RULE 19 — MOBILE-FIRST, ALWAYS.
Every page must work at 375px. Test mobile before desktop.

RULE 20 — MOTION IS RESTRAINED.
The homepage opening is the only full animation. Elsewhere: subtle
scroll-reveals and counters only. Never decorative motion.
```

---

## 5. ERROR HANDLING RULES

```
RULE 21 — EVERY EXTERNAL CALL IS WRAPPED.
Payments, emails, database calls, file uploads — all wrapped in try/catch
with a clear user-facing message on failure and a logged error.

RULE 22 — FAIL SAFELY ON MONEY.
If anything is uncertain in a payment or order flow, do NOT complete the
order. Leave it in a pending state for admin review. Never guess.

RULE 23 — WEBHOOKS VERIFY SIGNATURES.
Any webhook (Razorpay) verifies its signature before doing anything.

RULE 24 — LOADING + EMPTY + ERROR STATES.
Every data view has three states: loading (skeleton), empty (clean
message), and error (retry option). One consistent style for each.
```

---

## 6. WORKFLOW RULES (How We Work Together)

```
RULE 25 — READ THE DOCS FIRST.
Before building, the relevant sections of PRD.md, Architecture.md, and
Design.md apply. Follow them. If they conflict, ASK.

RULE 26 — RESPECT PHASES.
Only build Phase 1 features (see PRD.md section 4). If a request touches
a Phase 2-4 feature, flag it and confirm before building.

RULE 27 — UPDATE MEMORY.MD.
After completing a task, note what changed in Memory.md so context carries
across sessions (see Memory.md).

RULE 28 — TEST INSTRUCTIONS EVERY TIME.
End every task with exact steps for the founder to test it in the browser.

RULE 29 — LEGAL-SENSITIVE = FLAG IT.
Anything touching certificates, disclaimers, neutrality claims, or
regulatory statements: flag it clearly and note "lawyer review needed."
```

---

## 7. THE BANNED LIST (Quick Reference)

```
❌ "carbon neutral" / "net zero" / "climate positive" (on claims/certs)
❌ Inventing projects, prices, or regulatory facts
❌ Skipping escrow/transfer steps
❌ Trusting browser-side payment confirmation
❌ Hard-coded secrets or emails
❌ New frameworks/libraries without asking
❌ Blank grey placeholder boxes
❌ Building multiple tasks at once
❌ Building Phase 2-4 features during Phase 1
❌ Copying official regulatory text verbatim
```

---

*Rules.md — PRAN Phase 1 | Paste at the start of every build session.*
