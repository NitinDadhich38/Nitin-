/**
 * Curated outbound resources.
 *
 * Every entry links to the issuing body's own page. Summaries are written in
 * PRAN's words — official regulatory text is never copied verbatim
 * (3_Rules.md). Each URL below was checked to resolve at time of writing;
 * re-check before launch.
 *
 * MoEFCC is deliberately absent: moef.gov.in currently serves over plain HTTP
 * only, and we don't ship insecure outbound links. Add it once HTTPS is live.
 */

export type ExternalResource = {
  name: string;
  issuer: string;
  href: string;
  summary: string;
};

export type ResourceGroup = {
  id: string;
  title: string;
  intro: string;
  items: ExternalResource[];
};

export const resourceGroups: ResourceGroup[] = [
  {
    id: "global",
    title: "Global standards & frameworks",
    intro:
      "The bodies that define what a credible carbon credit is, and what you may claim once you hold one.",
    items: [
      {
        name: "UNFCCC",
        issuer: "United Nations",
        href: "https://unfccc.int",
        summary:
          "The treaty framework behind global climate policy, including the Paris Agreement and the Article 6 rules that govern how countries trade mitigation outcomes.",
      },
      {
        name: "Sustainable Development Goals",
        issuer: "United Nations",
        href: "https://sdgs.un.org",
        summary:
          "The 17 goals most carbon projects map their co-benefits against. Useful when you need to show impact beyond the tonne.",
      },
      {
        name: "Core Carbon Principles",
        issuer: "ICVCM",
        href: "https://icvcm.org",
        summary:
          "The supply-side quality bar. Defines what makes a credit high-integrity and assesses whether methodologies meet it.",
      },
      {
        name: "Claims Code of Practice",
        issuer: "VCMI",
        href: "https://vcmintegrity.org",
        summary:
          "The demand-side counterpart: what a company may legitimately say publicly after buying and retiring credits.",
      },
      {
        name: "Clean Development Mechanism",
        issuer: "UNFCCC",
        href: "https://cdm.unfccc.int",
        summary:
          "The original UN offset mechanism. Still the reference point for methodology design and for older vintages in circulation.",
      },
      {
        name: "Verra registry",
        issuer: "Verra",
        href: "https://verra.org",
        summary:
          "Administers the VCS programme — the largest source of voluntary credits, and the registry behind most projects on PRAN.",
      },
      {
        name: "Gold Standard",
        issuer: "Gold Standard",
        href: "https://www.goldstandard.org",
        summary:
          "Certification body known for requiring demonstrated sustainable-development benefits alongside emission reductions.",
      },
    ],
  },
  {
    id: "india",
    title: "India compliance",
    intro:
      "What applies if you operate in India — the compliance market, the agencies that run it, and the data behind it.",
    items: [
      {
        name: "Indian Carbon Market",
        issuer: "Bureau of Energy Efficiency",
        href: "https://www.beeindia.gov.in/en/programmesindian-carbon-market",
        summary:
          "The programme page for India's Carbon Credit Trading Scheme — the compliance mechanism replacing PAT, with obligated entities and intensity targets.",
      },
      {
        name: "Bureau of Energy Efficiency",
        issuer: "Government of India",
        href: "https://beeindia.gov.in",
        summary:
          "The administrator of the CCTS. Publishes the schemes, notifications and efficiency programmes that set compliance obligations.",
      },
      {
        name: "Ministry of Power",
        issuer: "Government of India",
        href: "https://powermin.gov.in",
        summary:
          "The parent ministry for the carbon market framework. Notifications here are what actually bring scheme changes into force.",
      },
      {
        name: "Central Electricity Authority",
        issuer: "Government of India",
        href: "https://cea.nic.in",
        summary:
          "Publishes the grid emission factor and generation data that most Indian Scope 2 calculations depend on.",
      },
      {
        name: "Ministry of New & Renewable Energy",
        issuer: "Government of India",
        href: "https://mnre.gov.in",
        summary:
          "Renewable capacity targets, schemes and policy — the supply-side context for most Indian renewable credits.",
      },
    ],
  },
];

/** Flat list, for counting and for any future search index. */
export const allExternalResources = resourceGroups.flatMap((g) => g.items);
