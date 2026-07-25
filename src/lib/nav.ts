/**
 * Single source of truth for site navigation (header + footer).
 * Routes follow Architecture.md §2. Pages are built through Stage A/B/C;
 * links may 404 until their page exists.
 */

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; href?: string; children?: NavLink[] };

export const mainNav: NavGroup[] = [
  { label: "Marketplace", href: "/marketplace" },
  {
    label: "Carbon Intelligence",
    children: [
      { label: "Procurement & Decision Intelligence", href: "/intelligence/procurement" },
      { label: "AI ESG Reporting", href: "/intelligence/esg" },
      { label: "AI BRSR Reporting", href: "/intelligence/brsr" },
      { label: "AI CBAM Alignment", href: "/intelligence/cbam" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "Enterprise", href: "/solutions/enterprise" },
      { label: "Government", href: "/solutions/government" },
      { label: "Project Developers", href: "/solutions/developers" },
      { label: "General Public", href: "/solutions/public" },
    ],
  },
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Resources",
    children: [
      { label: "All Resources", href: "/resources" },
      { label: "Blog & Insights", href: "/resources/blog" },
      { label: "Compliance Library", href: "/resources/compliance-library" },
      { label: "India CCTS Explainer", href: "/resources/ccts" },
      { label: "Voluntary Market Explainer", href: "/resources/voluntary-market" },
      { label: "Glossary", href: "/resources/glossary" },
    ],
  },
  {
    label: "About",
    children: [
      { label: "Why We Exist", href: "/about" },
      { label: "Team", href: "/about/team" },
      { label: "Press", href: "/about/press" },
    ],
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Marketplace", href: "/marketplace" },
      { label: "Carbon Calculator", href: "/calculator" },
      { label: "Market Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Carbon Intelligence",
    links: mainNav.find((i) => i.label === "Carbon Intelligence")!.children!,
  },
  {
    title: "Solutions",
    links: mainNav.find((i) => i.label === "Solutions")!.children!,
  },
  {
    title: "Resources",
    links: mainNav.find((i) => i.label === "Resources")!.children!,
  },
  {
    title: "Company",
    links: [
      { label: "Why We Exist", href: "/about" },
      { label: "Team", href: "/about/team" },
      { label: "Why Carbon Markets Matter", href: "/why-carbon-markets" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Compliance Framework", href: "/legal/compliance" },
];
