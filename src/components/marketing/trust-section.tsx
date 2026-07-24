"use client";

import { Reveal } from "@/components/marketing/reveal";
import { Counter } from "@/components/marketing/counter";
import { getProjects, facets } from "@/lib/marketplace-data";

export function TrustSection() {
  const projects = getProjects();
  const stats = [
    { to: projects.length, label: "Projects listed", suffix: "" },
    { to: facets.countries.length, label: "Countries", suffix: "" },
    { to: facets.registries.length, label: "Global registries", suffix: "" },
    { to: 100, label: "Escrow-verified", suffix: "%" },
  ];

  return (
    <section className="relative overflow-hidden bg-pran-ink py-24 text-white sm:py-32">
      {/* REPLACE: real project + community photography */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,160,133,0.18),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(201,162,39,0.12),transparent_40%)]"
      />
      <div className="relative mx-auto max-w-content px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-teal-lit">
            Trust &amp; scale
          </p>
          <h2 className="mt-3 max-w-xl font-display text-h1 font-semibold">
            Launching with real, verifiable listings.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="font-display text-4xl font-semibold tabular-nums text-pran-gold sm:text-5xl">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-2 font-mono text-xs uppercase tracking-wider text-white/60">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
