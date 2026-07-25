/**
 * Resources content (proposal N3).
 *
 * Plain-English explainers written from public, well-established facts about
 * how carbon markets work. Regulatory specifics are summarised, never copied
 * from official texts (Rules.md), and anything that could be read as a
 * regulatory assertion is marked for review before publication.
 */

export type Article = {
  slug: string;
  title: string;
  tag: "Explainer" | "Insight" | "Reference";
  summary: string;
  readingMinutes: number;
  updated: string;
};

export const articles: Article[] = [
  {
    slug: "ccts",
    title: "India's Carbon Credit Trading Scheme, explained",
    tag: "Explainer",
    summary:
      "What the CCTS is, who it applies to, and how the compliance and offset mechanisms fit together.",
    readingMinutes: 6,
    updated: "July 2026",
  },
  {
    slug: "voluntary-market",
    title: "The voluntary carbon market, explained",
    tag: "Explainer",
    summary:
      "How a credit is created, verified, sold, and retired — and where value leaks along the way.",
    readingMinutes: 7,
    updated: "July 2026",
  },
  {
    slug: "glossary",
    title: "Carbon market glossary",
    tag: "Reference",
    summary:
      "Sixty terms a buyer actually meets — vintage, retirement, additionality, corresponding adjustment.",
    readingMinutes: 9,
    updated: "July 2026",
  },
  {
    slug: "compliance-library",
    title: "Compliance library",
    tag: "Reference",
    summary:
      "BRSR, CBAM, CCTS, ISO 14068 and VCMI — what each one asks of you, in plain English.",
    readingMinutes: 8,
    updated: "July 2026",
  },
  {
    slug: "blog",
    title: "Insights",
    tag: "Insight",
    summary: "Notes on market structure, pricing, and integrity from the PRAN desk.",
    readingMinutes: 3,
    updated: "July 2026",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Glossary — terms every carbon buyer meets. */
export const glossary: { term: string; definition: string }[] = [
  {
    term: "Additionality",
    definition:
      "Whether the emissions reduction would have happened anyway without carbon finance. If it would have, the credit is not additional and should not exist.",
  },
  {
    term: "AFOLU",
    definition:
      "Agriculture, Forestry and Other Land Use — the project category covering land-based sequestration and avoided land-use emissions.",
  },
  {
    term: "ARR",
    definition:
      "Afforestation, Reforestation and Revegetation — planting or restoring tree cover to sequester carbon.",
  },
  {
    term: "Avoidance credit",
    definition:
      "A credit for emissions prevented from being released, such as replacing fossil generation with renewables. Distinct from a removal.",
  },
  {
    term: "Baseline",
    definition:
      "The modelled emissions scenario that would have occurred without the project. Credits are the measured gap between baseline and actual.",
  },
  {
    term: "Biochar",
    definition:
      "Charcoal produced from biomass and applied to soil, storing carbon in a stable form for centuries. An engineered removal.",
  },
  {
    term: "Blue carbon",
    definition:
      "Carbon captured by coastal and marine ecosystems — mangroves, seagrass, salt marsh, and ocean-based approaches.",
  },
  {
    term: "Buffer pool",
    definition:
      "Credits withheld by a registry as insurance against reversal, such as a forest project burning down.",
  },
  {
    term: "CCTS",
    definition:
      "India's Carbon Credit Trading Scheme — the domestic framework establishing compliance obligations and a tradable credit.",
  },
  {
    term: "CBAM",
    definition:
      "The EU's Carbon Border Adjustment Mechanism, which prices embedded emissions in certain goods imported into the EU.",
  },
  {
    term: "CORSIA",
    definition:
      "The international aviation offsetting scheme. Credits must be specifically tagged as CORSIA-eligible to be used under it.",
  },
  {
    term: "Corresponding adjustment",
    definition:
      "Under Article 6, the host country's accounting entry ensuring the same reduction is not counted by two countries.",
  },
  {
    term: "Co-benefits",
    definition:
      "Outcomes beyond carbon — employment, biodiversity, health, water access — often mapped to the UN Sustainable Development Goals.",
  },
  {
    term: "Forward",
    definition:
      "An agreement to deliver credits from a future vintage or issuance, usually priced below spot.",
  },
  {
    term: "Gold Standard (GS)",
    definition:
      "A registry and standard known for requiring demonstrated sustainable-development co-benefits alongside carbon.",
  },
  {
    term: "I-REC",
    definition:
      "International Renewable Energy Certificate — evidence that one MWh of renewable electricity was generated. Not a carbon credit.",
  },
  {
    term: "Issuance",
    definition:
      "The moment a registry creates serialised credits for a verified monitoring period.",
  },
  {
    term: "Leakage",
    definition:
      "Emissions displaced rather than avoided — for example, logging that simply moves to the next valley.",
  },
  {
    term: "Methodology",
    definition:
      "The approved rulebook a project follows to quantify its reductions. Determines credibility as much as the project itself.",
  },
  {
    term: "Permanence",
    definition:
      "How long the carbon stays stored. Geological storage is durable for millennia; forest carbon is vulnerable to fire and disease.",
  },
  {
    term: "REDD+",
    definition:
      "Reducing Emissions from Deforestation and forest Degradation — payments for conserving standing forest.",
  },
  {
    term: "Registry",
    definition:
      "The system of record that issues, holds, transfers, and retires serialised credits — Verra, Gold Standard, ICR, UCR and others.",
  },
  {
    term: "Removal credit",
    definition:
      "A credit for carbon physically taken out of the atmosphere and stored, rather than emissions avoided.",
  },
  {
    term: "Retirement",
    definition:
      "Permanently cancelling a credit in the registry so it can never be resold or claimed again. This is what a buyer ultimately pays for.",
  },
  {
    term: "Spot",
    definition:
      "Credits already issued and available for immediate transfer, as opposed to forward delivery.",
  },
  {
    term: "tCO₂e",
    definition:
      "One tonne of carbon dioxide equivalent — the unit a carbon credit represents.",
  },
  {
    term: "VCS / Verra",
    definition:
      "The Verified Carbon Standard, operated by Verra, the largest voluntary registry by issued volume.",
  },
  {
    term: "Vintage",
    definition:
      "The year in which the emission reduction actually occurred. Older vintages typically trade at a discount.",
  },
];
