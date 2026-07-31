import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/marketplace-data";
import { projectHref } from "@/lib/marketplace-data";
import { photoForSector } from "@/lib/images";

/** Long sector names → short "type" chip. */
function shortType(sector: string): string {
  const s = sector.toLowerCase();
  if (s.includes("afforest") || s.includes("reforest")) return "Forestry";
  if (s.includes("redd")) return "REDD+";
  if (s.includes("solar")) return "Solar";
  if (s.includes("wind")) return "Wind";
  if (s.includes("hydro")) return "Hydro";
  if (s.includes("renewable")) return "Renewable";
  if (s.includes("blue")) return "Blue Carbon";
  if (s.includes("agri")) return "Agriculture";
  if (s.includes("waste") || s.includes("biogas")) return "Waste";
  if (s.includes("cookstove")) return "Cookstoves";
  if (s.includes("industrial")) return "Efficiency";
  return sector;
}

export function priceLabel(project: Project): string {
  if (project.priceUsd == null) return "On request";
  const { priceUsd, priceMaxUsd } = project;
  if (priceMaxUsd != null && priceMaxUsd > priceUsd) {
    return `$${priceUsd.toFixed(2)}–$${priceMaxUsd.toFixed(2)}`;
  }
  return `$${priceUsd.toFixed(2)}`;
}

/** 1211682 -> "1.21M" ; 90250 -> "90,250" */
export function volumeLabel(v: number | null): string | null {
  if (v == null) return null;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
  return v.toLocaleString("en-US");
}

/** Spot beats Forward for display when a project offers both. */
export function deliveryLabel(project: Project): string | null {
  const set = new Set(
    project.listings.map((l) => l.delivery).filter(Boolean) as string[],
  );
  if (set.has("Spot")) return "Spot";
  if (set.has("Issued")) return "Issued";
  if (set.has("Forward")) return "Forward";
  return null;
}

/**
 * Project card (5_Design.md v2.0 §3.4 + proposal M2).
 * Photo → chips → name → developer/country → volume & delivery →
 * divider → price + circular emerald action. Shadow, no border.
 */
export function ProjectTeaser({ project }: { project: Project }) {
  const volume = volumeLabel(project.totalVolume);
  const delivery = deliveryLabel(project);

  return (
    <Link
      href={projectHref(project)}
      className="group flex w-full flex-col overflow-hidden rounded-panel bg-pran-surface shadow-card transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/50"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-pran-paper-warm">
        <Image
          src={photoForSector(project.sector)}
          alt=""
          fill
          sizes="(max-width: 768px) 90vw, 360px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {delivery && (
          <span className="absolute right-3 top-3 rounded-lg bg-pran-surface/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-pran-ink shadow-card">
            {delivery}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg bg-pran-paper-warm px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-pran-muted">
            {project.registry}
          </span>
          <span className="rounded-lg bg-pran-paper-warm px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-pran-muted">
            {shortType(project.sector)}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-pran-ink">
          {project.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-pran-muted">
          {project.developer ?? project.country}
          {project.developer && ` · ${project.country}`}
        </p>

        {/* M2 — buyers filter on availability before price */}
        {volume && (
          <p className="mt-2 text-sm tabular-nums text-pran-muted">
            <span className="font-medium text-pran-ink">{volume}</span> tCO₂e
            <span className="text-pran-hairline"> · </span>
            <span>Vintage {project.vintageLabel}</span>
          </p>
        )}

        <div className="mt-auto pt-4">
          <div className="mb-4 h-px w-full bg-pran-hairline" />
          <div className="flex items-center justify-between gap-3">
            <span className="text-[15px] font-medium tabular-nums text-pran-ink">
              {priceLabel(project)}
              {project.priceUsd != null && (
                <span className="text-sm font-normal text-pran-muted">
                  {" "}
                  / tCO₂e
                </span>
              )}
            </span>
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pran-emerald text-white transition-colors group-hover:bg-pran-emerald-hover"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
