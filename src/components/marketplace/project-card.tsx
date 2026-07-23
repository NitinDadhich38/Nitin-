import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/marketplace-data";
import { sectorGradient, countryFlag } from "@/lib/sectors";
import { formatUsd } from "@/lib/format";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/marketplace/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-pran-border bg-white transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-teal/60"
    >
      {/* Gradient banner stands in for project photography */}
      <div className={`relative h-36 ${sectorGradient(project.sector)}`}>
        <div className="absolute inset-0 flex items-end p-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/80">
            {project.sector}
          </span>
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-xs font-medium text-pran-navy">
          {project.registry}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-sm text-pran-muted">
          <span aria-hidden>{countryFlag(project.country)}</span>
          <span>{project.country}</span>
          <span className="text-pran-border">·</span>
          <span className="font-mono">{project.vintage}</span>
        </div>

        <h3 className="mt-2 line-clamp-2 font-medium text-pran-text group-hover:text-pran-teal">
          {project.name}
        </h3>
        {project.developer && (
          <p className="mt-1 line-clamp-1 text-sm text-pran-muted">
            {project.developer}
          </p>
        )}

        <div className="mt-4 flex items-end justify-between border-t border-pran-border pt-4">
          <div>
            <div className="font-display text-xl font-semibold tabular-nums text-pran-navy">
              {formatUsd(project.priceUsd)}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-pran-muted">
              {project.priceUsd !== null ? "per credit" : "indicative"}
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-pran-teal">
            View
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
