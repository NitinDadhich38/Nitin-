/**
 * Homepage stats & brand constants — single source of truth for numbers shown
 * on the marketing site (CLAUDE.md: "Where numbers live").
 *
 * These stats are DERIVED from the real marketplace seed data, not invented.
 * When the marketplace moves to Supabase (Phase 2), point these at the DB.
 */

import { getProjects, facets } from "@/lib/marketplace-data";

const projects = getProjects();

export const siteStats = {
  projects: projects.length,
  countries: facets.countries.length,
  registries: facets.registries.length,
  sectors: facets.sectors.length,
} as const;

/** Proof-strip figures (5_Design.md §4.1 S2). Honest, derived counts only. */
export const proofStats: { value: number; suffix?: string; label: string }[] = [
  { value: siteStats.projects, suffix: "+", label: "Verified projects" },
  { value: siteStats.countries, suffix: "+", label: "Countries" },
  { value: siteStats.registries, label: "Global registries" },
  { value: 100, suffix: "%", label: "Escrow-settled" },
];

export const brand = {
  name: "PRAN",
  tagline: "Carbon market infrastructure",
  domain: "pranglobal.com",
} as const;
