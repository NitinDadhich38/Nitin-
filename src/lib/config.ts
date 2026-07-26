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
