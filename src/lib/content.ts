/** Editorial content for the Carbon Intelligence and Solutions pages. */

export type Service = {
  slug: string;
  nav: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: string[];
  youGet: string[];
  note: string;
};

export const services: Service[] = [
  {
    slug: "procurement",
    nav: "Procurement & Decision Intelligence",
    eyebrow: "Carbon Intelligence",
    title: "Buy carbon credits the way you'd underwrite any asset.",
    subtitle:
      "We analyse your emission profile, recommend real reductions first, then design a least-cost offset plan matched to your sector — reviewed by our team before it reaches you.",
    steps: [
      "Share your emissions data and goal (BRSR, voluntary, CSR, or net-zero pathway).",
      "Our engine drafts a reduce-first strategy and a matched procurement plan.",
      "An expert reviews and approves it; you receive a clear, sourced recommendation.",
    ],
    youGet: [
      "A ranked list of real reduction levers before any offsetting",
      "Residual emissions calculated honestly",
      "Specific project types and registries suited to your sector",
      "An indicative budget and procurement route",
    ],
    note: "PRAN facilitates and advises on procurement — it does not issue credits or provide investment advice on carbon prices.",
  },
  {
    slug: "esg",
    nav: "AI ESG Reporting",
    eyebrow: "Carbon Intelligence",
    title: "Board-ready ESG disclosures, mapped to the frameworks that matter.",
    subtitle:
      "Turn your operational data into a structured ESG disclosure aligned to BRSR, GRI, and the SDGs — drafted fast, reviewed by a human before delivery.",
    steps: [
      "Submit your data via a guided form and document upload.",
      "We draft the disclosure mapped to your target frameworks.",
      "Our team reviews and finalises; you receive a board-ready report.",
    ],
    youGet: [
      "Disclosure mapped to BRSR / GRI / SDG sections",
      "A clear narrative backed by your data",
      "A human-review layer on every report",
      "Export-ready formatting",
    ],
    note: "Reports are prepared by PRAN using AI-assisted analysis. They are not accredited verification or assurance. Terms and conditions applied.",
  },
  {
    slug: "brsr",
    nav: "AI BRSR Reporting",
    eyebrow: "Carbon Intelligence",
    title: "SEBI BRSR, without the compliance fire drill.",
    subtitle:
      "Map your business responsibility and sustainability data into the SEBI BRSR format — drafted from your inputs and reviewed before it reaches your compliance team.",
    steps: [
      "Provide your operational, energy, and social data.",
      "We map it into the BRSR format sections.",
      "Expert review, then delivery to your team.",
    ],
    youGet: [
      "Data mapped to the nine BRSR principles",
      "Consistent, defensible figures",
      "A review checkpoint before filing",
      "A structured, submission-ready draft",
    ],
    note: "BRSR requirements change; figures must be confirmed against official SEBI guidance. PRAN is not an auditor. Terms and conditions applied.",
  },
  {
    slug: "cbam",
    nav: "AI CBAM Alignment",
    eyebrow: "Carbon Intelligence",
    title: "Translate supplier data into the embedded-emissions figures the EU demands.",
    subtitle:
      "For exporters facing the EU Carbon Border Adjustment Mechanism — turn production and supplier data into CBAM-format embedded-emissions figures.",
    steps: [
      "Share production and supplier emissions data.",
      "We calculate embedded emissions in the CBAM structure.",
      "Expert review, then a report you can share with EU customers.",
    ],
    youGet: [
      "Embedded-emissions figures in CBAM format",
      "Product-level intensity where data allows",
      "A clear methodology trail",
      "A human-reviewed final report",
    ],
    note: "CBAM thresholds and methods change; confirm against official EU guidance. PRAN prepares, it does not certify. Terms and conditions applied.",
  },
];

export type Audience = {
  slug: string;
  nav: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  pains: string[];
  helps: string[];
  primary: { label: string; href: string };
  consumer?: boolean;
};

export const audiences: Audience[] = [
  {
    slug: "enterprise",
    nav: "Enterprise",
    eyebrow: "Solutions · Enterprise",
    title: "Procure and report at institutional scale.",
    subtitle:
      "One platform to source verified credits, run your offset strategy, and generate the disclosures your board and regulators expect.",
    pains: [
      "Fragmented sourcing across brokers and registries",
      "Greenwashing risk from unsupported claims",
      "Disconnected procurement and reporting workflows",
    ],
    helps: [
      "Verified marketplace with escrow settlement",
      "Reduce-first procurement intelligence",
      "BRSR / ESG / CBAM reporting with human review",
    ],
    primary: { label: "Request Demo", href: "/contact" },
  },
  {
    slug: "government",
    nav: "Government",
    eyebrow: "Solutions · Government",
    title: "Market infrastructure for public climate goals.",
    subtitle:
      "Transparent, auditable rails for carbon transactions that support national and state-level climate programmes.",
    pains: [
      "Limited transparency into voluntary market activity",
      "Difficulty tracking real, verifiable outcomes",
      "Need for credible, standards-aligned infrastructure",
    ],
    helps: [
      "A transparent registry-linked marketplace",
      "Standards-aligned records and certificates",
      "Data structured for oversight and reporting",
    ],
    primary: { label: "Talk to our team", href: "/contact" },
  },
  {
    slug: "developers",
    nav: "Project Developers",
    eyebrow: "Solutions · Project Developers",
    title: "List your project in front of real buyers.",
    subtitle:
      "Bring your registry-issued credits to a serious marketplace with escrow settlement and a growing base of corporate buyers.",
    pains: [
      "Hard to reach credible, paying buyers",
      "Opaque pricing and slow settlement",
      "Trust gaps between buyer and seller",
    ],
    helps: [
      "Exposure to vetted corporate demand",
      "Escrow protects both sides of the trade",
      "PRAN facilitates the transfer and verification",
    ],
    primary: { label: "List your project", href: "/contact" },
  },
  {
    slug: "public",
    nav: "General Public",
    eyebrow: "Solutions · General Public",
    title: "Understand your footprint. Offset what you can't yet cut.",
    subtitle:
      "Calculate your carbon footprint in minutes, then — if you choose — procure and retire verified credits for the balance.",
    pains: [
      "Unclear how big your footprint really is",
      "Hard to know which offsets are credible",
      "Confusing, jargon-heavy tools",
    ],
    helps: [
      "A clear, friendly footprint calculator",
      "Reduce-first guidance before offsetting",
      "Verified credits with a factual certificate",
    ],
    primary: { label: "Open the Calculator", href: "/calculator" },
    consumer: true,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
export function getAudience(slug: string) {
  return audiences.find((a) => a.slug === slug);
}
