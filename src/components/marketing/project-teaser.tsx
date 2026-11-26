import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import type { Project } from "@/lib/marketplace-data";
import { projectHref } from "@/lib/marketplace-data";
import { getProjectDetails } from "@/lib/project-details";
import { sdgIconUrl } from "@/lib/sdg";

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
 * Project card (AlliedOffsets & institutional benchmark edition).
 * High visual finish: crisp mechanism badge (Removal vs Avoidance),
 * verified status, location pill, SDG badges, and transparent pricing.
 */
export function ProjectTeaser({ project }: { project: Project }) {
  const volume = volumeLabel(project.totalVolume);
  const delivery = deliveryLabel(project);
  const details = getProjectDetails(project);

  return (
    <Link
      href={projectHref(project)}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-pran-ink/[0.07] bg-pran-surface shadow-apple-card transition-all duration-300 ease-apple hover:-translate-y-1 hover:border-pran-emerald/40 hover:shadow-apple-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/40"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={details.image}
          alt={project.name}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
        />

        {delivery && (
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-pran-ink shadow-sm backdrop-blur-md border border-black/[0.05]">
            {delivery}
          </span>
        )}

        {/* Location pill */}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md border border-white/10">
          <MapPin className="h-3 w-3 text-emerald-400" />
          {project.country}
        </span>

        {/* PRAN code chip */}
        <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-mono uppercase text-white/90 backdrop-blur-md border border-white/10">
          {project.pranCode}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-5.5">
        {/* Registry standard & sector chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-pran-emerald/8 px-2.5 py-0.5 text-[11px] font-medium text-pran-emerald">
            <CheckCircle2 className="h-3 w-3 text-pran-emerald" />
            {project.registry}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.04em] text-pran-muted">
            {shortType(project.sector)}
          </span>
          <span className="ml-auto text-[11px] font-mono text-pran-muted">
            {project.standardCode}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-pran-ink group-hover:text-pran-emerald transition-colors duration-200">
          {project.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm tracking-[-0.01em] text-pran-muted">
          {project.developer ?? project.country}
          {project.developer && ` · ${project.country}`}
        </p>

        {/* Volume & Vintage availability */}
        {volume && (
          <div className="mt-3 flex items-center justify-between rounded-xl bg-pran-paper px-3 py-2 text-xs text-pran-muted border border-pran-ink/[0.03]">
            <span>
              <strong className="font-semibold text-pran-ink">{volume}</strong>{" "}
              tCO₂e available
            </span>
            <span className="font-medium text-pran-ink">
              Vintage {project.vintageLabel}
            </span>
          </div>
        )}

        {/* Sustainable Development Goals */}
        {details.sdgGoals.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-pran-muted">
              SDGs:
            </span>
            <div className="flex gap-1 overflow-x-auto py-0.5">
              {details.sdgGoals.slice(0, 5).map((goal) => (
                <div
                  key={goal}
                  title={`SDG ${goal}`}
                  className="relative h-5 w-5 shrink-0 overflow-hidden rounded shadow-sm"
                >
                  <Image
                    src={sdgIconUrl(goal)}
                    alt={`SDG ${goal}`}
                    fill
                    loading="lazy"
                    sizes="20px"
                    className="object-cover"
                  />
                </div>
              ))}
              {details.sdgGoals.length > 5 && (
                <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-semibold text-pran-muted">
                  +{details.sdgGoals.length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer: pricing & CTA */}
        <div className="mt-auto pt-4">
          <div className="mb-3.5 h-px w-full bg-pran-hairline/80" />
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-pran-muted">
                Indicative Spot Price
              </p>
              <span className="text-[16px] font-semibold tabular-nums tracking-tight text-pran-ink">
                {priceLabel(project)}
                {project.priceUsd != null && (
                  <span className="text-xs font-normal text-pran-muted">
                    {" "}
                    / tCO₂e
                  </span>
                )}
              </span>
            </div>
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pran-emerald text-white shadow-sm transition-all duration-200 ease-apple group-hover:scale-105 group-hover:bg-pran-emerald-hover group-hover:shadow-md"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
