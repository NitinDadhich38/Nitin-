/**
 * Data behind the interior pages' signature diagrams
 * (7_Page_Design_Roadmap.md §4; 5_Design.md §3 technique 4).
 *
 * Kept apart from content.ts, which holds prose. Anything a diagram PLOTS
 * lives here with its source attached, because CLAUDE.md forbids invented
 * figures and a drawing is the easiest place for one to sneak in.
 *
 * ⚠️ VERIFY BEFORE LAUNCH — the regulatory dates below are real published
 * milestones, but thresholds and phase-in schedules are amended often. Confirm
 * each against official SEBI / EU / MoP guidance before this goes public.
 * (Tracked in 6_Memory.md §7.)
 */

/* ── Enterprise: the compliance calendar ──────────────────────────────────
   The signature visual for /solutions/enterprise. A buyer's urgency is not
   "carbon is important", it is "my filing date is fixed and already passed
   or nearly here". The diagram plots that, with today marked on it. */

export type ComplianceEvent = {
  /** Sort key and axis position. Year the obligation bites. */
  year: number;
  /** Short axis label. */
  period: string;
  regime: "BRSR" | "CBAM" | "CCTS";
  title: string;
  detail: string;
  /** True once the date has passed — drawn as already behind you. */
  past: boolean;
};

export const complianceTimeline: ComplianceEvent[] = [
  {
    year: 2023,
    period: "Oct 2023",
    regime: "CBAM",
    title: "CBAM transitional period opens",
    detail:
      "EU importers begin quarterly reporting of embedded emissions. Reporting only — no certificates yet.",
    past: true,
  },
  {
    year: 2024,
    period: "FY 2023–24",
    regime: "BRSR",
    title: "BRSR Core assurance begins",
    detail:
      "Reasonable assurance on BRSR Core starts with the top 150 listed companies by market capitalisation.",
    past: true,
  },
  {
    year: 2025,
    period: "FY 2024–25",
    regime: "BRSR",
    title: "Top 250 listed companies",
    detail: "The assurance requirement widens down the market-cap table.",
    past: true,
  },
  {
    year: 2026,
    period: "Jan 2026",
    regime: "CBAM",
    title: "CBAM definitive regime",
    detail:
      "The transitional period ends. Importers must buy and surrender CBAM certificates against embedded emissions.",
    past: true,
  },
  {
    year: 2026,
    period: "FY 2025–26",
    regime: "BRSR",
    title: "Top 500 listed companies",
    detail: "Assurance scope widens again.",
    past: true,
  },
  {
    year: 2026,
    period: "2025–26",
    regime: "CCTS",
    title: "India's compliance market opens",
    detail:
      "GHG emission-intensity targets bind obligated entities under the Carbon Credit Trading Scheme.",
    past: true,
  },
  {
    year: 2027,
    period: "FY 2026–27",
    regime: "BRSR",
    title: "Top 1,000 listed companies",
    detail:
      "The widest phase of the announced BRSR Core assurance schedule.",
    past: false,
  },
];

export const complianceSources = [
  "SEBI circular on BRSR Core, July 2023",
  "EU Regulation 2023/956 (CBAM)",
  "Carbon Credit Trading Scheme, Ministry of Power, 2023 (as amended)",
];

/* ── Developers: the money path ───────────────────────────────────────────
   The signature visual for /solutions/developers. A developer asks two
   questions and only two: how fast am I paid, and how much do I keep.

   NOTE: there are no PRAN fee figures here on purpose. The commission is not
   set in lib/config.ts and must not be guessed — the page describes the
   SHAPE of settlement and says plainly that terms are quoted per listing. */

export const settlementPath = [
  {
    label: "You list",
    detail: "Registry-issued credits, with the standard, vintage and volume shown up front.",
    meta: "Day 0",
  },
  {
    label: "Buyer commits",
    detail: "An order is placed against your listing at the agreed price.",
    meta: "—",
  },
  {
    label: "Funds held",
    detail: "The buyer's payment sits in escrow, verified server-side, before you move anything.",
    meta: "Same day",
  },
  {
    label: "You transfer",
    detail: "You move the credits on the registry. This step stays with you — PRAN never holds or moves credits.",
    meta: "Your move",
    manual: true,
  },
  {
    label: "PRAN verifies",
    detail: "We check the transfer against the registry record before releasing anything.",
    meta: "On receipt",
    manual: true,
  },
  {
    label: "You are paid",
    detail: "Escrow releases to you. The buyer receives a factual retirement certificate.",
    meta: "On verification",
  },
];

/* ── Why carbon markets: one tonne, at human scale ────────────────────────
   The signature visual for /why-carbon-markets. Nobody has an intuition for
   "a tonne of CO2", which is precisely why the number never lands.

   The 10 m figure is CALCULATED, not sourced from a claim: CO2 at 1 atm and
   15 C has a density of about 1.87 kg/m3, so one tonne occupies roughly
   535 m3, which is a sphere about 10 m across. The assumption is stated on
   the page so the figure can be checked rather than believed. */

export const tonneScale = {
  diameterMetres: 10,
  volumeCubicMetres: 535,
  assumption:
    "CO₂ as a gas at 1 atm and 15 °C (density ≈ 1.87 kg/m³). One tonne fills roughly 535 m³ — a sphere about 10 metres across.",
  /** Reference heights in metres, for the scale drawing. All commonplace. */
  references: [
    { label: "An adult", metres: 1.7 },
    { label: "A double-decker bus", metres: 4.4 },
    { label: "A three-storey building", metres: 10 },
  ],
};

/* ── Intelligence: build status ───────────────────────────────────────────
   Founder decision, 2026-08-08: none of the four services is live. Every
   Intelligence page must read as in-development with a waitlist. Nothing may
   imply a delivered product. */

export type BuildStage = "designing" | "building" | "piloting";

export const serviceStatus: Record<
  string,
  { stage: BuildStage; line: string }
> = {
  procurement: {
    stage: "building",
    line: "In build. The screening logic runs on the same registry data behind the marketplace.",
  },
  esg: {
    stage: "designing",
    line: "In design. Framework mapping is being specified against GRI and BRSR section structures.",
  },
  brsr: {
    stage: "building",
    line: "In build. Mapping to the nine BRSR principles is the active piece of work.",
  },
  cbam: {
    stage: "designing",
    line: "In design. Method work is tracking the EU's definitive-regime guidance.",
  },
};

export const STAGE_LABEL: Record<BuildStage, string> = {
  designing: "In design",
  building: "In build",
  piloting: "In pilot",
};
