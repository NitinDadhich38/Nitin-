/**
 * Carbon MARKET context — the world PRAN operates in.
 *
 * Deliberately separate from marketplace-data.ts. The homepage should argue
 * about the market, not publish PRAN's order book: exposing exact portfolio
 * figures everywhere reads as a spreadsheet dump and hands competitors the
 * position. Portfolio numbers stay on the marketplace and dashboard, rounded
 * down elsewhere.
 *
 * ⚠️ VERIFY BEFORE LAUNCH. Every figure below is a published third-party
 * statistic with its source and year attached. Re-check each against the
 * current edition before this goes public, and update `asOf`.
 */

export type Sourced<T> = T & { source: string; year: string };

/**
 * The emissions gap — the single clearest picture of why this market exists.
 * Source: UNEP Emissions Gap Report 2024.
 */
export const emissionsGap = {
  asOf: "UNEP Emissions Gap Report 2024",
  unit: "GtCO₂e per year",
  /**
   * The two paths, drawn as the iconic "gap" wedge. Only the endpoints are
   * published UNEP figures (2023 actual, 2030 projections); the segments
   * between them are drawn straight — no fabricated intermediate curve.
   */
  from: { year: 2023, value: 57.1, note: "Global GHG emissions, 2023" },
  paths: [
    {
      id: "policies",
      label: "Current policies",
      to: { year: 2030, value: 57 },
      note: "Where the world lands if nothing changes",
      tone: "high" as const,
    },
    {
      id: "target",
      label: "1.5°C pathway",
      to: { year: 2030, value: 33 },
      note: "The cuts needed to keep 1.5°C alive",
      tone: "target" as const,
    },
  ],
  gap: {
    value: 24,
    label: "The 2030 gap",
    note: "Gigatonnes a year that must be cut or removed by 2030",
  },
  source: "UNEP Emissions Gap Report",
  year: "2024",
};

/**
 * Structural facts used as supporting copy. Each is a widely published,
 * checkable figure — no estimates of PRAN's own making.
 */
export const marketFacts: Sourced<{
  label: string;
  value: string;
  note: string;
}>[] = [
  {
    label: "India's net-zero target",
    value: "2070",
    note: "The national commitment PRAN's home market is building toward.",
    source: "India's Long-Term Low Emission Development Strategy, UNFCCC",
    year: "2022",
  },
  {
    label: "Paris temperature limit",
    value: "1.5°C",
    note: "The threshold every compliance framework is now calibrated against.",
    source: "Paris Agreement, UNFCCC",
    year: "2015",
  },
  {
    label: "Emissions still rising",
    value: "+1.3%",
    note: "Global greenhouse gas emissions grew again in 2023, not fell.",
    source: "UNEP Emissions Gap Report",
    year: "2024",
  },
];

/**
 * Where the friction sits. Qualitative, not fabricated percentages — these are
 * the failure points PRAN was built to remove, stated as claims we can defend.
 */
export const frictionPoints = [
  {
    stage: "Discovery",
    problem: "Supply is scattered across registries that do not talk to each other.",
  },
  {
    stage: "Pricing",
    problem: "Two buyers pay very different prices for the same tonne, and neither knows.",
  },
  {
    stage: "Diligence",
    problem: "Quality signals live in PDFs, not in anything you can screen or compare.",
  },
  {
    stage: "Settlement",
    problem: "Money and credits move on trust, manually, in opposite directions.",
  },
];
