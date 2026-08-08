/**
 * One place that answers "what do we actually know about this project?".
 *
 * Merges three real sources, in priority order, and never invents anything:
 *   1. lib/live-project-media.ts — the project's own published page on
 *      pranglobal.com (photography, precise coordinates, SDGs, stat bars).
 *   2. lib/registry-data.ts — the issuing registry's public API
 *      (Gold Standard: description, coordinates, SDGs, methodology, developer).
 *   3. lib/marketplace-data.ts — the portfolio record itself (always present).
 *
 * Location falls back to a clearly-labelled country-level point when no
 * registry publishes precise coordinates, so every project can show a map
 * without any of them implying a precision we don't have.
 */
import type { Project } from "@/lib/marketplace-data";
import { liveProjectMedia } from "@/lib/live-project-media";
import { registryFacts } from "@/lib/registry-data";
import { resolveLocation, type ResolvedLocation } from "@/lib/country-locations";
import { photos } from "@/lib/images";
import { stockImageFor } from "@/lib/project-imagery";

export type ProjectDetails = {
  /**
   * Hero/card image — the project's own photo when we have one, else the
   * unique stock image held for this listing. Never shared with another
   * listing anywhere in the marketplace.
   */
  image: string;
  /** True when `image` (and gallery) are the project's own photography. */
  hasRealPhoto: boolean;
  gallery: string[];
  location: ResolvedLocation | null;
  description: string;
  /** Where `description` came from, for the on-page attribution line. */
  descriptionSource: "project page" | "registry" | "portfolio";
  highlights: string[];
  sdgGoals: number[];
  methodology: string | null;
  projectType: string | null;
  developer: string | null;
  registryUrl: string | null;
  estimatedAnnualCredits: number | null;
  creditingPeriod: string | null;
  stats: { label: string; value: string; pct: number }[];
  /** Human-readable list of the real sources behind this page. */
  sources: string[];
};

export function getProjectDetails(project: Project): ProjectDetails {
  const live = liveProjectMedia[project.pranCode];
  const reg = registryFacts[project.pranCode];

  const sources: string[] = [];
  if (live) sources.push("project page");
  if (reg) sources.push(reg.source);

  const gallery = live?.gallery?.length ? live.gallery : [];
  const hasRealPhoto = gallery.length > 0;

  const description =
    live?.description || reg?.description || project.description;
  const descriptionSource: ProjectDetails["descriptionSource"] = live?.description
    ? "project page"
    : reg?.description
      ? "registry"
      : "portfolio";

  // Precise coordinates: project page first, then registry, then country-level.
  const lat = live?.lat ?? reg?.lat ?? null;
  const lng = live?.lng ?? reg?.lng ?? null;
  const location = resolveLocation(project.country, lat, lng);

  const sdgGoals = live?.sdgGoals?.length
    ? live.sdgGoals
    : (reg?.sdgGoals ?? []);

  /* Highlights: real ones from the project page, else composed strictly from
     fields we hold — no new claims either way. */
  const highlights = live?.highlights?.length
    ? live.highlights
    : [
        `${project.sector} project registered under ${project.registry}`,
        `Located in ${project.country}`,
        project.totalVolume
          ? `${project.totalVolume.toLocaleString("en-US")} tCO₂e available`
          : "Volume confirmed on request",
        `Vintage ${project.vintageLabel}`,
      ];

  return {
    /* Real photography when the project has it, else the one stock image
       reserved for this PRAN code — no two listings share a thumbnail
       (see lib/project-imagery.ts). The last fallback is unreachable while
       every project holds a PRAN code. */
    image: gallery[0] ?? stockImageFor(project.pranCode) ?? photos.forestCanopy,
    hasRealPhoto,
    gallery,
    location,
    description,
    descriptionSource,
    highlights,
    sdgGoals,
    methodology: reg?.methodology ?? live?.methodology ?? null,
    projectType: reg?.projectType ?? live?.projectType ?? null,
    developer: reg?.developer ?? live?.owner ?? project.developer ?? null,
    registryUrl: reg?.registryUrl ?? null,
    estimatedAnnualCredits: reg?.estimatedAnnualCredits ?? null,
    creditingPeriod: reg?.creditingPeriod ?? null,
    stats: live?.stats ?? [],
    sources,
  };
}
