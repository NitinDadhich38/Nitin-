/**
 * Single source of truth for site navigation (header + footer).
 * Routes follow Architecture.md §2. Pages are built through Stage A/B/C;
 * links may 404 until their page exists.
 */

/**
 * `locked` marks a service that is NOT live yet. The nav renders a lock beside
 * it and the href goes straight to /contact with that interest preselected,
 * rather than to a page describing a product we cannot deliver today
 * (founder direction, 2026-08-09). The four Carbon Intelligence detail pages
 * were deleted in the same pass — do not recreate them until the services ship.
 */
export type NavLink = { label: string; href: string; locked?: boolean };
export type NavGroup = { label: string; href?: string; children?: NavLink[] };

export const mainNav: NavGroup[] = [
  { label: "Membership", href: "/membership" },
  { label: "Marketplace", href: "/marketplace" },
  {
    label: "Carbon Intelligence",
    children: [
      {
        label: "Procurement & Decision Intelligence",
        href: "/contact?interest=procurement",
        locked: true,
      },
      { label: "AI ESG Reporting", href: "/contact?interest=esg", locked: true },
      { label: "AI BRSR Reporting", href: "/contact?interest=brsr", locked: true },
      { label: "AI CBAM Alignment", href: "/contact?interest=cbam", locked: true },
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
  {
    label: "Resources",
    children: [
      { label: "Compliance Markets", href: "/resources/compliance-library" },
      { label: "Voluntary Markets", href: "/resources/voluntary-market" },
      { label: "Blogs", href: "/resources/blog" },
    ],
  },
  {
    label: "About",
    children: [
      { label: "Why We Exist", href: "/about" },
      { label: "Leadership", href: "/about/team" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Marketplace", href: "/marketplace" },
      { label: "Carbon Calculator", href: "/calculator" },
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
      { label: "Leadership", href: "/about/team" },
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
