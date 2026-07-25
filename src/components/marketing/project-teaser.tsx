import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/marketplace-data";
import { photoForSector } from "@/lib/images";

/** Long sector names → short "type" chip. */
function shortType(sector: string): string {
  const s = sector.toLowerCase();
  if (s.includes("afforest") || s.includes("reforest") || s.includes("afolu"))
    return "Forestry";
  if (s.includes("solar")) return "Solar";
  if (s.includes("wind")) return "Wind";
  if (s.includes("renewable") || s.includes("rec")) return "Renewable";
  if (s.includes("blue") || s.includes("marine")) return "Blue Carbon";
  if (s.includes("agri")) return "Agriculture";
  if (s.includes("waste")) return "Waste";
  if (s.includes("biogas") || s.includes("manure")) return "Biogas";
  if (s.includes("industrial") || s.includes("energy")) return "Energy";
  return "Carbon";
}

function priceLabel(priceUsd: number | null): string {
  return priceUsd != null ? `$${priceUsd.toFixed(2)} / tCO₂e` : "On request";
}

/**
 * Project card (5_Design.md v2.0 §3.4). Photo → chips → name → developer →
 * divider → price + circular emerald action button. Shadow, no border.
 */
export function ProjectTeaser({ project }: { project: Project }) {
  return (
    <Link
      href={`/marketplace/${project.slug}`}
      className="group flex w-full flex-col overflow-hidden rounded-panel bg-pran-surface shadow-card transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-float"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-pran-paper-warm">
        <Image
          src={photoForSector(project.sector)}
          alt=""
          fill
          sizes="(max-width: 768px) 80vw, 340px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
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
        <p className="mt-1 text-sm text-pran-muted">
          {project.developer ?? project.country}
        </p>
        <div className="mt-auto pt-4">
          <div className="mb-4 h-px w-full bg-pran-hairline" />
          <div className="flex items-center justify-between gap-3">
            <span className="text-[15px] font-medium tabular-nums text-pran-ink">
              {priceLabel(project.priceUsd)}
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
