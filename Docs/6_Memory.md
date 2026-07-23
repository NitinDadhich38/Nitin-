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
Current stage:     [Stage 0 / A / B / C]  ← update this
Repo:              [add GitHub URL once created]
Live URL:          [add Vercel/production URL once deployed]
Supabase project:  [add project ref once created]
```

---

## 2. WHAT IS DONE (append after each completed task)

```
FORMAT: [DATE] TASK-ID — one line on what was built + key files touched

Example entries (replace with real ones as you go):
[ ] Not started yet.

--- Log begins below ---


```

---

## 3. WHAT IS IN PROGRESS (only one thing at a time)

```
Currently building: [none yet]
Blocked on:         [nothing yet]
Waiting on founder: [confirm domain; provide logo; provide project data]
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
