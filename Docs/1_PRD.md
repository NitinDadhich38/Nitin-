# PRD.md — Product Requirements Document
### Project: PRAN | Phase 1 Build
### Read this FIRST. Defines WHAT we build and WHY.

---

## 0. HOW THE AI MUST USE THIS FILE

```
This document defines WHAT to build. Not HOW (see Architecture.md),
not the rules (see Rules.md).

Before building any feature, confirm it exists in this document.
If a feature is NOT described here, do NOT build it — ask first.
If it IS described but details are missing, ASK — never invent.
```

---

## 1. WHAT PRAN IS (One Paragraph)

PRAN is a carbon market platform for India and the world. In Phase 1 it does three things: (1) a **marketplace** where verified carbon credit projects are listed and buyers purchase credits through an escrow flow; (2) a **carbon footprint calculator** for individuals and businesses, with an option to purchase credits matching that footprint; and (3) a professional **cinematic website** positioning PRAN as carbon market infrastructure — the "Bloomberg/Zerodha of carbon," not a generic green brand.

---

## 2. WHAT PRAN IS NOT (Critical Boundaries)

```
❌ A carbon credit issuer — PRAN never creates credits
❌ A calculator that generates sellable credits
❌ A project verifier or auditor — not an accredited VVB
❌ A power exchange like IEX — no order-matching engine
❌ A crypto/token platform — no blockchain, tokens, wallets in Phase 1
❌ A registry like Verra — PRAN does not hold or issue serial numbers

PRAN facilitates, records, and presents. It never creates carbon value.
```

---

## 3. TARGET USERS

```
USER TYPE          WHAT THEY WANT                  WHAT PRAN GIVES
────────────────   ─────────────────────────────   ──────────────────────────
Corporate Buyer    Buy verified credits simply     Marketplace + escrow purchase
Individual         Understand + offset footprint   Calculator + small procurement
Project Developer   List & sell credits             Listing (admin-entered Phase 1)
PRAN Admin (you)   Run platform, fulfill orders    Admin panel
Investor/Visitor   See a credible real platform    Cinematic website
```

---

## 4. PHASE 1 SCOPE — FEATURES WE BUILD NOW

Complete list. Nothing outside it gets built in Phase 1.

### 4.1 The Website

```
Cinematic homepage        3D globe opening + 8-section narrative scroll
Global header + footer     Full navigation matching the sitemap
Marketplace page          (see 4.2 — real product, not static)
Carbon Intelligence hub   Landing + 4 sub-pages (informational Phase 1)
Solutions pages           Enterprise, Government, Developers, Public
Carbon Market Dashboard   Live-feeling data page (static data Phase 1)
Why Carbon Markets Matter Mission page
Team page                 Structure ready, content added when available
Resources                 Blog, Compliance Library, explainers, glossary
Contact / Request Demo    MUST WORK — saves to DB + sends emails
Legal pages               Terms, Privacy, Compliance (lawyer reviews later)
```

### 4.2 The Marketplace (functional product)

```
Project listings          Bloomberg-terminal layout, real data from DB
Filters                   Registry, methodology, vintage, country, price,
                          SDG tags, verification status
Project detail page       Full info, documents, [Buy Credits]
Escrow buy flow           Buyer pays → PRAN account → seller transfers →
                          admin verifies → certificate issued
Retirement certificate    Auto-generated PDF, factual claims only
Public verification page  Anyone with QR code can verify a certificate
Admin project entry       You add/edit/pause/delete projects
Admin order management    You process orders through the status flow
```

### 4.3 The Carbon Footprint Calculator

```
Personal calculator       Consumer-friendly, DEFRA emission factors
Business calculator       GHG Protocol scopes 1/2/3, CEA grid factor
Live estimate             Updates as user answers
Result + breakdown        Total tCO2e + category/scope chart
Offset option             Buy credits to match footprint (same escrow flow)
Legal certificate         "Credits purchased and retired" — never "neutral"
```

### 4.4 The Admin Panel

```
Admin login               Supabase Auth, admin-only access
Project management        Add, edit, pause, delete
Order management          View, update status, upload transfer proof,
                          verify, trigger certificate
Contact submissions       View all form submissions
Due diligence checklist   Forced checks before a project goes live
```

**REVISION 2026-08-09 — the admin panel is now the CENTREPIECE of this
phase, and order management is deferred with the escrow flow.** The founder
onboards projects on behalf of developers, who send details directly. Three
ingest paths, in order of expected use:

```
1. EXCEL IMPORT (primary)   Upload a developer's sheet → map columns →
                            preview every row → commit. Nothing is written
                            until the founder confirms the preview.
2. MANUAL FORM              Single project, for one-offs.
3. GOLD STANDARD PRE-FILL   Auto-fill from GS's open public API.
                            ⚠ GOLD STANDARD ONLY. Verra / ICR / UCR / CDM
                            have NO reachable public API (probed
                            2026-08-01). Do not offer auto-fetch for them.
```

A published project must render what the live site already renders: the
satellite map hero with its location, the registry ID, the details, and
imagery. **Imagery cannot come from a registry — none publish project
photos.** It comes from developer-supplied uploads, else the sector stock
fallback, which stays honestly labelled and uncaptioned.

---

## 5. EXPLICITLY OUT OF SCOPE FOR PHASE 1

Do NOT build these now, even if easy.

```
⏳ AI ESG / BRSR / CBAM reporting              → Phase 4
⏳ Procurement Decision Intelligence engine    → Phase 4
⏳ Full marketplace automation                 → Phase 2/3
⏳ Compliance market (IEX/PXIL entity trading) → later track
⏳ Blockchain / tokenization                   → not in roadmap
⏳ Real-time registry API integration          → later (no access yet)
⏳ Seller self-registration + self-listing     → Phase 2 (admin enters now)
```

**ADDED TO OUT-OF-SCOPE 2026-08-09** — the founder raised these, then
withdrew them the same day ("it may make it quite complex, and I may not
handle it widely"). Recorded so they are not silently rebuilt:

```
⏳ Buyer / seller self-registration + login    → founder manages off-platform
⏳ On-platform KYC collection + review         → deferred (also: DPDP Act
                                                 obligations + lawyer review
                                                 needed before it is built)
⏳ Buyer dashboard / purchase history          → deferred with escrow
⏳ Seller dashboard / self-upload to market    → admin uploads on their behalf
⏳ Razorpay escrow pay-in + live payments      → next phase, after this works
⏳ Retirement certificates + /verify pages     → deferred with escrow
```

---

## 6. THE ESCROW FLOW (Most Important Feature — Exact Spec)

```
No registry access → credits move manually, money moves automatically.
Exact sequence — never simplify:

1. Buyer clicks [Buy Credits] on a project
2. Buyer enters: quantity, name, company, email, phone, and their own
   registry account ID (where the seller sends credits)
3. Show price breakdown: subtotal + platform fee + GST = total
4. Buyer pays total into PRAN's account via Razorpay
5. Server verifies Razorpay payment signature (never trust browser)
6. Status → PAYMENT_RECEIVED → AWAITING_SELLER_TRANSFER
7. Email PRAN team "[ACTION NEEDED]" with order + buyer registry ID
8. Email buyer: payment confirmed, credits arriving in X days
9. (OFFLINE) PRAN asks seller to transfer to buyer's registry account
10. (OFFLINE) Seller transfers, sends PRAN the proof
11. Admin uploads proof, marks TRANSFER_PROOF_UPLOADED
12. Admin verifies, marks TRANSFER_VERIFIED
13. System generates certificate, status → COMPLETED, emails buyer
14. (OFFLINE) PRAN pays seller via bank transfer, minus commission
```

---

## 7. SUCCESS CRITERIA FOR PHASE 1

```
□ Website live at pranglobal.com, all pages, fully responsive
□ Cinematic homepage works, degrades gracefully on slow phones
□ A real buyer browses the marketplace and sees real projects
□ A buyer completes an escrow purchase end-to-end, gets a certificate
□ Calculator works for personal + business with correct numbers
□ Someone can calculate a footprint and buy matching credits
□ Every certificate uses factual, legally safe wording only
□ Contact + demo forms send emails and save to the database
□ Admin can add projects and process orders
□ No feature says "carbon neutral," "net zero," or "climate positive"
```

---

## 8. OPEN ITEMS THE FOUNDER MUST PROVIDE

```
□ Canonical domain (pranglobal.com assumed — confirm)
□ Real project data (name, developer, registry, price, credits, docs)
□ Real project images
□ PRAN logo files (SVG)
□ Team names, photos, bios, LinkedIn links
□ PRAN bank account details (env config, never in code)
□ Razorpay account activated + Route approved
□ Emission factor values (sources in Architecture.md)
□ Lawyer to review Terms, disclaimers, certificate wording before launch
```

---

*PRD.md — PRAN Phase 1 | Update when scope changes.*
