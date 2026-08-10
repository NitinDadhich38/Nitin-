"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { ProjectTeaser } from "@/components/marketing/project-teaser";
import { buttonVariants } from "@/components/ui/button";
import { getProjects, projectHref } from "@/lib/marketplace-data";
import { getProjectDetails } from "@/lib/project-details";
import { photos } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Marketplace section — a working browser, not a screenshot.
 *
 * The framed panel is a real mini-marketplace: the category tabs filter live
 * against the portfolio, cards respond to hover, and clicking one opens that
 * project at its /PRAN-## page. Sector groupings are declared here so the tab
 * labels stay marketing-readable while matching real sector values.
 */
const CATEGORIES: { label: string; sectors: string[] | null }[] = [
  { label: "All Projects", sectors: null },
  {
    label: "Forestry",
    sectors: ["Afforestation & Reforestation", "REDD+ Forest Conservation"],
  },
  { label: "Solar", sectors: ["Solar"] },
  { label: "Wind", sectors: ["Wind"] },
  { label: "Biogas", sectors: ["Waste & Biogas", "Biochar"] },
  { label: "Community", sectors: ["Clean Cookstoves", "Safe Water"] },
];

export function MarketplaceSection() {
  const projects = useMemo(() => getProjects(), []);
  const [active, setActive] = useState(0);

  const framed = useMemo(() => {
    const { sectors } = CATEGORIES[active];
    const pool = sectors
      ? projects.filter((p) => sectors.includes(p.sector))
      : projects;
    return pool.slice(0, 6);
  }, [active, projects]);

  const row = projects.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-pran-forest py-24 text-white sm:py-32">
      {/* Renewable infrastructure — the assets actually being traded */}
      <Image
        src={photos.solar}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.18]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_78%_18%,rgba(217,249,157,.10),transparent_58%),linear-gradient(180deg,rgba(5,18,12,.86),rgba(4,14,9,.94))]"
      />

      <div className="relative z-10 mx-auto max-w-content px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Header */}
          <div>
            <Reveal>
              <h2 className="max-w-[16ch] font-display text-display-l font-semibold text-white">
                A real, running marketplace — not a promise.
              </h2>
              <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-white/70">
                Browse verified, registry-backed carbon projects with
                transparent pricing and escrow-based settlement. Every credit is
                traceable from project to retirement.
              </p>
              <Link
                href="/marketplace"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "group mt-8",
                )}
              >
                Browse all projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          {/* Working browser frame */}
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-panel bg-pran-surface shadow-float">
              <div className="flex items-center gap-2 border-b border-pran-hairline px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 flex-1 truncate rounded-md bg-pran-paper-warm px-3 py-1 text-xs text-pran-muted">
                  pranglobal.com/marketplace
                </span>
              </div>

              <div className="bg-pran-paper p-4 sm:p-5">
                {/* Live category filter */}
                <div
                  role="tablist"
                  aria-label="Filter projects by category"
                  className="mb-4 flex gap-2 overflow-x-auto scrollbar-hide"
                >
                  {CATEGORIES.map((c, i) => (
                    <button
                      key={c.label}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => setActive(i)}
                      className={cn(
                        "whitespace-nowrap rounded-[14px] px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/50",
                        i === active
                          ? "bg-pran-ink text-white"
                          : "border border-pran-hairline bg-pran-surface text-pran-ink hover:border-pran-emerald/50 hover:text-pran-emerald-hover",
                      )}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                {framed.length === 0 ? (
                  <p className="py-10 text-center text-sm text-pran-muted">
                    No projects in this category yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {framed.map((p) => {
                      const details = getProjectDetails(p);
                      return (
                      <Link
                        key={p.id}
                        href={projectHref(p)}
                        className="group/card block overflow-hidden rounded-card bg-pran-surface shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/50"
                      >
                        <div className="relative aspect-[16/11] overflow-hidden">
                          <Image
                            src={details.image}
                            alt=""
                            fill
                            sizes="180px"
                            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                          />
                          <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity duration-150 group-hover/card:opacity-100">
                            <ArrowUpRight className="h-3.5 w-3.5 text-pran-ink" />
                          </span>
                        </div>
                        <div className="p-2.5">
                          <p className="line-clamp-1 text-[11px] font-medium text-pran-ink">
                            {p.name}
                          </p>
                          <div className="mt-1 flex items-center justify-between gap-2">
                            <p className="text-[11px] font-medium tabular-nums text-pran-emerald">
                              {p.priceUsd != null
                                ? `$${p.priceUsd.toFixed(2)}`
                                : "On request"}
                            </p>
                            <p className="truncate text-[10px] text-pran-muted">
                              {p.country}
                            </p>
                          </div>
                        </div>
                      </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Live project card row */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex snap-x gap-5 overflow-x-auto scrollbar-hide pb-2">
            {row.map((p) => (
              <div
                key={p.id}
                className="w-[280px] shrink-0 snap-start sm:w-[300px]"
              >
                <ProjectTeaser project={p} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
