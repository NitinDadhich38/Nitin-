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

/**
 * Proof-strip figures (5_Design.md §4.1 S2). Honest, derived counts only.
 * `value` drives the count-up; `display` overrides the rendered string where
 * a raw number would be unreadable.
 */
export const proofStats: {
  value: number;
  display?: string;
  suffix?: string;
  label: string;
}[] = [
  { value: portfolioStats.projects, label: "Verified projects" },
  {
    value: portfolioStats.totalVolume,
    display: compact(portfolioStats.totalVolume),
    label: "tCO₂e available",
  },
  { value: portfolioStats.countries, label: "Countries" },
  { value: portfolioStats.registries, label: "Registry standards" },
];

export const brand = {
  name: "PRAN",
  tagline: "Carbon market infrastructure",
  domain: "pranglobal.com",
} as const;
