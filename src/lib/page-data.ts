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

/* ── Why carbon markets: the state of the problem ─────────────────────────
   Every figure below was VERIFIED against its primary source on 2026-08-09
   (see `source` + `href` on each). These are the only numbers /why-carbon-
   markets is allowed to state. Do not add a figure here without fetching its
   source first, and re-check them annually — both reports publish yearly. */

export type ClimateFact = {
  value: string;
  label: string;
  detail: string;
  source: string;
  href: string;
};

export const climateFacts: ClimateFact[] = [
  {
    value: "38.1 Gt",
    label: "Fossil CO₂ released in 2025",
    detail:
      "A record high, up 1.1% on the year before. Coal, oil and gas all rose.",
    source: "Global Carbon Budget 2025",
    href: "https://globalcarbonbudget.org/fossil-fuel-co2-emissions-hit-record-high-in-2025/",
  },
  {
    value: "42.2 Gt",
    label: "Total CO₂, including land use",
    detail:
      "Fossil emissions plus 4.1 Gt from deforestation and other land-use change.",
    source: "Global Carbon Budget 2025",
    href: "https://globalcarbonbudget.org/gcb-2025/the-global-carbon-budget-faqs-2025/",
  },
  {
    value: "425.7 ppm",
    label: "CO₂ in the atmosphere",
    detail:
      "52% above the pre-industrial level. This is the stock that drives warming — annual emissions add to it.",
    source: "Global Carbon Budget 2025",
    href: "https://essd.copernicus.org/articles/18/3211/2026/",
  },
];

/* ── How the global market is actually structured ─────────────────────────
   World Bank, State and Trends of Carbon Pricing 2025, verified 2026-08-09. */

export const globalPricing = {
  coverageShare: "28%",
  instruments: 80,
  carbonTaxes: 43,
  emissionsTradingSystems: 37,
  instrumentsIn2005: 5,
  revenueUsd: "over USD 100 billion",
  gdpShare: "almost two-thirds",
  source: "World Bank — State and Trends of Carbon Pricing 2025",
  href: "https://www.worldbank.org/en/publication/state-and-trends-of-carbon-pricing",
};

/**
 * The mitigation hierarchy, in the order every serious framework states it
 * (ISO 14068, VCMI, SBTi all order it this way). Credits are LAST on purpose —
 * CLAUDE.md forbids implying that retiring credits substitutes for reducing.
 */
export const actionOrder = [
  {
    title: "Measure what you actually emit.",
    body: "Not an estimate of the industry, yours. Scope 1 is what you burn, Scope 2 is the electricity you buy, Scope 3 is your supply chain — and Scope 3 is usually the majority and the part everyone skips.",
  },
  {
    title: "Cut what can be cut.",
    body: "Efficiency, process change, switching fuel, cutting waste. This is the only step that reduces the physical total, and it is almost always cheaper than paying for the same tonne twice.",
  },
  {
    title: "Switch the energy underneath it.",
    body: "Contracted renewable supply, on-site generation, electrified process heat where the technology exists. This shrinks the baseline permanently rather than offsetting it annually.",
  },
  {
    title: "Retire verified credits against the residual.",
    body: "What is genuinely left after the first three — the emissions no current technology lets you remove. Credits fund somebody else's reduction and record that it happened. They do not cancel your obligation to keep working down the list.",
  },
];

/** Primary sources a reader can go and check for themselves. */
export const whySources = [
  {
    org: "Global Carbon Project",
    title: "Global Carbon Budget 2025",
    note: "The annual accounting of where every tonne came from and where it went.",
    href: "https://globalcarbonbudget.org/",
  },
  {
    org: "World Bank",
    title: "State and Trends of Carbon Pricing 2025",
    note: "Which jurisdictions price carbon, how, and at what level.",
    href: "https://www.worldbank.org/en/publication/state-and-trends-of-carbon-pricing",
  },
  {
    org: "IPCC",
    title: "Sixth Assessment Report (AR6)",
    note: "The scientific baseline on causes, impacts and mitigation pathways.",
    href: "https://www.ipcc.ch/assessment-report/ar6/",
  },
  {
    org: "UNFCCC",
    title: "The Paris Agreement",
    note: "The treaty text, including Article 6 on international carbon markets.",
    href: "https://unfccc.int/process-and-meetings/the-paris-agreement",
  },
  {
    org: "ICVCM",
    title: "Core Carbon Principles",
    note: "The integrity threshold a voluntary credit is judged against.",
    href: "https://icvcm.org/core-carbon-principles/",
  },
  {
    org: "Bureau of Energy Efficiency",
    title: "Carbon Credit Trading Scheme (India)",
    note: "India's own compliance and offset mechanism.",
    href: "https://beeindia.gov.in/",
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
