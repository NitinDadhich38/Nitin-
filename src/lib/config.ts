/**
 * Site-wide stats & brand constants (CLAUDE.md: "Where numbers live").
 *
 * Every figure here is DERIVED from the real portfolio in marketplace-data.ts,
 * which is generated from PRΛN_Portfolio.xlsx. Nothing is hand-entered, so the
 * homepage can never drift from the book.
 */

import { portfolioStats } from "@/lib/marketplace-data";

export const siteStats = portfolioStats;

/** Compact display helper: 14133402 -> "14.1M". */
export function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return `${n}`;
}

/** Round DOWN to the nearest 5/10 — never overstate the book. */
function floorTo(n: number, step: number): number {
  return Math.floor(n / step) * step;
}

/**
 * Marketing-facing scale figures.
 *
 * Deliberately rounded so the homepage reads as a claim about scale rather
 * than a dump of the order book. Always rounded DOWN: on a carbon marketplace
 * an overstated count is the fastest way to lose a buyer's trust, so "80+"
 * with 85 in the book is right and "100+" would not be.
 *
 * Exact figures live on the marketplace and dashboard, where a buyer needs them.
 */
export const roundedStats: { value: string; label: string }[] = [
  { value: `${floorTo(portfolioStats.projects, 5)}+`, label: "Verified projects" },
  {
    value: `${Math.floor(portfolioStats.totalVolume / 1_000_000)}M+`,
    label: "tCO₂e available",
  },
  { value: `${floorTo(portfolioStats.countries, 5)}+`, label: "Countries" },
  { value: `${portfolioStats.registries}`, label: "Registry standards" },
];

export const brand = {
  name: "PRAN",
  tagline: "Carbon market infrastructure",
  domain: "pranglobal.com",
} as const;

/**
 * PRAN's own public channels — the COMPANY, never a person.
 *
 * Founder direction 2026-08-09: the company LinkedIn is used everywhere on the
 * site; the founder's personal profile appears ONLY on /about/team (see
 * lib/leadership.ts). Do not swap one for the other.
 *
 * `email` is the general enquiries inbox (founder-confirmed 2026-08-09). The
 * previously hardcoded hello@pranglobal.com did NOT exist and has been purged.
 * The founder's own address stays in lib/leadership.ts and is used only where
 * the founder is speaking as himself.
 *
 * `whatsapp` is stored as digits only — country code, no `+`, no spaces —
 * because that is the exact shape wa.me requires.
 *
 * ⚠ DO NOT PRINT THE NUMBER AS VISIBLE TEXT (founder direction 2026-08-09,
 * anti-scraping). A formatted "+91 72968 15012" matches the phone-number
 * regexes harvesters run over page text; "wa.me/917296815012" inside an href
 * does not. So link to it, label the link, and never render the formatted
 * version. `whatsappDisplay` is kept ONLY for places a human must read the
 * number back — an email body, an invoice — never for a web page.
 */
export const pranSocial = {
  linkedin: "https://www.linkedin.com/company/pranapp",
  email: "contact@pranapp.in",
  whatsapp: "917296815012",
  /** Not for rendering on the site — see the warning above. */
  whatsappDisplay: "+91 72968 15012",
} as const;

/** Click-to-chat URL. Prefilled so we know which page the enquiry came from. */
export function whatsappLink(context?: string): string {
  const text = context
    ? `Hi PRAN — I'm enquiring about ${context}.`
    : "Hi PRAN — I'd like to know more about buying or listing carbon credits.";
  return `https://wa.me/${pranSocial.whatsapp}?text=${encodeURIComponent(text)}`;
}
