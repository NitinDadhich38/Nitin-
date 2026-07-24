"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { getProjects, facets } from "@/lib/marketplace-data";
import { buttonVariants } from "@/components/ui/button";

const chips = ["ARR", "Biochar", "Cookstove", "Renewable", "Nature-Based", "Community", "Industrial"];

export function MarketplaceSection() {
  const projects = getProjects();
  const stats = [
    { value: `${projects.length}`, label: "Projects" },
    { value: `${facets.countries.length}+`, label: "Countries" },
    { value: `${facets.registries.length}`, label: "Registries" },
    { value: "Live", label: "Escrow settlement" },
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-teal">
            The Marketplace
          </p>
          <h2 className="mt-3 max-w-xl font-display text-h1 font-semibold text-pran-text">
            Powering verified carbon transactions.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-pran-border bg-pran-border sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-6">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-pran-muted">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-pran-gold">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-pran-muted">
            Launching with these listings · more projects onboarding
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-pran-border px-3 py-1.5 text-sm text-pran-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <Link
            href="/marketplace"
            className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-10 group" })}
          >
            Explore the Marketplace
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
