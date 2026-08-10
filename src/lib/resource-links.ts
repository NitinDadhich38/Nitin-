/**
 * Curated external resources for /resources/compliance-library and
 * /resources/voluntary-market.
 *
 * ⚠ EVERY URL HERE WAS STATUS-CHECKED (HTTP 200) ON 2026-08-09. Do not add an
 * entry from memory — fetch it first. CLAUDE.md forbids inventing facts, and a
 * dead or wrong link on a page whose whole promise is "go and check it
 * yourself" is worse than no link.
 *
 * Notes from that check, so the next session does not redo the work:
 *   · indiancarbonmarket.gov.in — use WITHOUT `www.` (the www host 400s).
 *   · cercind.gov.in — use WITHOUT a trailing slash (`www.` host fails).
 *   · verra.org — the root resolves; deep program paths return 403 to
 *     non-browser agents (Cloudflare), so link the root, not /programs/*.
 *   · moef.gov.in (MoEFCC) was unreachable and is deliberately NOT listed.
 */

export type ResourceLink = {
  org: string;
  title: string;
  note: string;
  href: string;
  /** Marks a primary legal/regulatory instrument rather than commentary. */
  primary?: boolean;
};

/* ── Compliance markets ─────────────────────────────────────────────────── */

export const complianceLinks: ResourceLink[] = [
  {
    org: "Government of India",
    title: "Indian Carbon Market Portal",
    note: "The official registry and administration portal for the CCTS. Launched at Prakriti 2026; it is where obligated entities register and certificates are issued.",
    href: "https://indiancarbonmarket.gov.in",
    primary: true,
  },
  {
    org: "Bureau of Energy Efficiency",
    title: "Carbon Market — scheme documents",
    note: "BEE administers the CCTS under the Ministry of Power. This page carries the scheme notification S.O. 2825(E), amendment S.O. 5369(E), and the Detailed Procedure for the Compliance Mechanism.",
    href: "https://www.beeindia.gov.in/carbon-market.php",
    primary: true,
  },
  {
    org: "Press Information Bureau",
    title: "Prakriti 2026 — portal launch",
    note: "The Government's own record of the launch, the sectors covered, and the intended trading timeline.",
    href: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2243377",
    primary: true,
  },
  {
    org: "ICAP",
    title: "Indian Carbon Credit Trading Scheme — factsheet",
    note: "The International Carbon Action Partnership's structured profile of the CCTS: scope, caps, timeline, and how it compares with other systems worldwide.",
    href: "https://icapcarbonaction.com/en/ets/indian-carbon-credit-trading-scheme",
  },
  {
    org: "CERC",
    title: "Central Electricity Regulatory Commission",
    note: "Regulates the power market the carbon certificates will trade alongside, including the exchanges and their trading regulations.",
    href: "https://cercind.gov.in",
    primary: true,
  },
  {
    org: "European Commission",
    title: "Carbon Border Adjustment Mechanism (CBAM)",
    note: "The EU's carbon border levy. If you export steel, aluminium, cement, fertiliser, hydrogen or electricity into the EU, this is the instrument that prices your embedded emissions.",
    href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
    primary: true,
  },
  {
    org: "UNFCCC",
    title: "The Paris Agreement",
    note: "The treaty text, including Article 6 — the basis for international transfer of mitigation outcomes between countries.",
    href: "https://unfccc.int/process-and-meetings/the-paris-agreement",
    primary: true,
  },
];

/* ── Voluntary markets ──────────────────────────────────────────────────── */

export const voluntaryLinks: ResourceLink[] = [
  {
    org: "Verra",
    title: "Verified Carbon Standard",
    note: "The largest voluntary standard by issued volume. Its registry is the system of record for VCS projects and the retirement of their credits.",
    href: "https://verra.org",
    primary: true,
  },
  {
    org: "Gold Standard",
    title: "Gold Standard for the Global Goals",
    note: "A standard that requires demonstrated sustainable-development benefit alongside the emission reduction, not just the tonne.",
    href: "https://www.goldstandard.org/",
    primary: true,
  },
  {
    org: "Verra Registry",
    title: "Public project and issuance records",
    note: "Where a specific project's issuances, retirements and serial numbers can be looked up directly rather than taken on trust.",
    href: "https://registry.verra.org",
  },
  {
    org: "ICVCM",
    title: "Core Carbon Principles",
    note: "The integrity threshold for the supply side. The CCPs define what makes a credit credible — additionality, permanence, robust quantification, no double counting.",
    href: "https://icvcm.org/core-carbon-principles/",
    primary: true,
  },
  {
    org: "VCMI",
    title: "Claims Code of Practice",
    note: "The demand-side counterpart to the CCPs: what a company may legitimately say once it has bought and retired credits. Read this before writing any climate claim.",
    href: "https://vcmintegrity.org/",
    primary: true,
  },
  {
    org: "Science Based Targets initiative",
    title: "Corporate Net-Zero Standard",
    note: "The reference framework for setting reduction targets. It is explicit that credits do not substitute for cutting your own emissions.",
    href: "https://sciencebasedtargets.org/",
    primary: true,
  },
  {
    org: "CDP",
    title: "Environmental disclosure system",
    note: "The disclosure platform most large buyers already report through, and the dataset many procurement teams are measured against.",
    href: "https://www.cdp.net/",
  },
  {
    org: "IETA",
    title: "International Emissions Trading Association",
    note: "Industry body covering market structure, contract standards and policy developments across both compliance and voluntary markets.",
    href: "https://www.ieta.org/",
  },
  {
    org: "IPCC",
    title: "Sixth Assessment Report (AR6)",
    note: "The underlying science: what the mitigation pathways require, and the role carbon pricing plays within them.",
    href: "https://www.ipcc.ch/assessment-report/ar6/",
    primary: true,
  },
  {
    org: "UNFCCC",
    title: "Article 6 mechanisms",
    note: "How credits move between countries, and where corresponding adjustments apply — the part that determines whether a tonne can be counted twice.",
    href: "https://unfccc.int/process-and-meetings/the-paris-agreement",
  },
];
