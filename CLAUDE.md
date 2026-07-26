# PRAN — Claude Code Working Agreement

> **Read this first, every session.** PRAN is the financial-infrastructure layer for
> the carbon market ("the Bloomberg/Zerodha of carbon"), not a "green" brand.
> Domain: `pranglobal.com`. India is the home market; the brand speaks globally.

## The source-of-truth docs (read the relevant one before building)

| File | Defines |
|------|---------|
| [Docs/1_PRD.md](Docs/1_PRD.md) | **WHAT** we build and why. Phase-1 scope. Escrow spec. |
| [Docs/2_Architecture.md](Docs/2_Architecture.md) | **HOW** — locked stack, folder structure, data model, flows. |
| [Docs/3_Rules.md](Docs/3_Rules.md) | Guardrails. The banned list. Paste-at-start rules. |
| [Docs/4_Phases.md](Docs/4_Phases.md) | Build order. One task per session. Progress tracker. |
| [Docs/5_Design.md](Docs/5_Design.md) | Visual contract — colors, fonts, motion, components. |
| [Docs/6_Memory.md](Docs/6_Memory.md) | **Living progress log. READ at start, UPDATE at end of every task.** |
| [Docs/PRAN_Master_Build_Workflow.md](Docs/PRAN_Master_Build_Workflow.md) | The full narrative build playbook (v3.0). |

If any two docs conflict, **ask** — do not pick one silently.

## Prime directive

Build **one task at a time** (see Phases.md). Complete only what's asked; never build
ahead. When ambiguous, **ask before assuming**. Never invent data, numbers, prices,
projects, or regulatory facts. End each task with: what you built, how to test it in the
browser, and what env vars / manual steps the founder must set.

## Hard rules — never violate

- **Never say "carbon neutral", "net zero", or "climate positive"** on any certificate,
  claim, or purchase copy. Use only: *"purchased and retired X tCO2e of verified carbon
  credits for [period]."* (ISO 14068 / VCMI / greenwashing law.)
- **PRAN never creates carbon credits.** Credits exist only via a seller's registry
  certificate. The calculator estimates *footprints*, never generates credits.
- **Never skip escrow steps.** Seller credit transfer stays manual; PRAN facilitates and
  verifies — it does not move credits.
- **Verify payments server-side.** Never mark an order paid from the browser. Verify the
  Razorpay signature on the server.
- **PRAN is not an auditor/verifier.** It lists, facilitates, records — nothing more.
- **No secrets in code.** Read from env; keep `.env.example` current; never commit
  `.env.local`. All money uses precise decimal handling.
- **Everything under `/admin` requires server-checked admin auth.**
- **No fabricated projects/prices** (empty DB → clean empty state) and **no verbatim
  copying** of official regulatory text (write plain-English summaries).
- **Stack is locked** (Architecture.md §1). No new framework/library/service without asking.

## Locked stack

Next.js 14 (App Router) · TypeScript (strict) · Tailwind · shadcn/ui · Framer Motion ·
react-three-fiber + drei · recharts · Supabase (DB + Auth + Storage) · Razorpay · Resend ·
@react-pdf/renderer · react-hook-form + zod · Vercel. **No AI SDK in Phase 1** (Claude API
is Phase 4).

## Where numbers live

- Placeholder stats / fees / constants → `src/lib/config.ts`
- Emission factors (with cited source + year) → `src/lib/emission-factors.ts`
- Never scatter magic numbers.

## Design system (see Design.md for full tokens)

Mode by section — **Cinematic** (near-black `#0A0A0A`, filmic), **Data** (white + deep
teal `#0F5F5C`, Bloomberg register), **Trust** (navy `#0A1F44` + gold `#C9A227`).
**Gold is a signal only** — primary buttons and key numbers, never decoration. Mobile-first
(works at 375px). Restrained motion; respect `prefers-reduced-motion`. Load fonts via
`next/font`, never CDN.

## Workflow each session

1. Read [Docs/6_Memory.md](Docs/6_Memory.md) to see what exists and what's in progress.
2. Build the single next task from [Docs/4_Phases.md](Docs/4_Phases.md).
3. Test in the browser; give the founder exact test steps.
4. Commit with a clear message.
5. **Update [Docs/6_Memory.md](Docs/6_Memory.md)** before ending.

Flag anything touching certificates, disclaimers, neutrality claims, or regulatory
statements with **"lawyer review needed."**

---
*Working agreement for Claude Code on PRAN Phase 1. Update when scope or stack changes.*
