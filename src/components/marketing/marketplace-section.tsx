"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { ProjectTeaser } from "@/components/marketing/project-teaser";
import { buttonVariants } from "@/components/ui/button";
import { getProjects } from "@/lib/marketplace-data";
import { photoForSector } from "@/lib/images";
import { cn } from "@/lib/utils";

const TABS = ["All Projects", "Forestry", "Solar", "Wind", "Biogas", "Community"];

export function MarketplaceSection() {
  const projects = getProjects();
  const framed = projects.slice(0, 3);
  const row = projects.slice(0, 6);

  return (
    <section className="bg-pran-forest py-24 text-white sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Header */}
          <div>
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-lime">
                The marketplace
              </p>
              <h2 className="mt-4 max-w-[16ch] font-display text-display-l font-semibold text-white">
                A real, running marketplace — not a promise.
              </h2>
              <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-white/70">
                Browse verified, registry-backed carbon projects with
                transparent pricing and escrow-based settlement. Every credit is
                traceable from project to retirement.
              </p>
              <Link
                href="/marketplace"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group mt-8")}
              >
                Browse all projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          {/* Product browser frame (the Cloverly move) */}
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
                <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
                  {TABS.map((t, i) => (
                    <span
                      key={t}
                      className={cn(
                        "whitespace-nowrap rounded-[14px] px-3 py-1.5 text-xs font-medium",
                        i === 0
                          ? "bg-pran-ink text-white"
                          : "border border-pran-hairline bg-pran-surface text-pran-ink",
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {framed.map((p) => (
                    <div key={p.id} className="overflow-hidden rounded-card bg-pran-surface shadow-card">
                      <div className="relative aspect-[16/11]">
                        <Image
                          src={photoForSector(p.sector)}
                          alt=""
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2.5">
                        <p className="line-clamp-1 text-[11px] font-medium text-pran-ink">
                          {p.name}
                        </p>
                        <p className="mt-1 text-[11px] font-medium tabular-nums text-pran-emerald">
                          {p.priceUsd != null ? `$${p.priceUsd.toFixed(2)}` : "On request"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Live project card row (horizontal scroll) */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex snap-x gap-5 overflow-x-auto scrollbar-hide pb-2">
            {row.map((p) => (
              <div key={p.id} className="w-[280px] shrink-0 snap-start sm:w-[300px]">
                <ProjectTeaser project={p} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
