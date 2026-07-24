"use client";

import { Reveal } from "@/components/marketing/reveal";

const nodes = ["Developers", "Registries", "Buyers", "Governments", "Consultants"];

export function MissionSection() {
  return (
    <section className="bg-pran-ink py-28 text-white sm:py-36">
      <div className="mx-auto max-w-content px-6 text-center">
        <Reveal>
          <p className="font-display text-h1 font-semibold leading-tight">
            Carbon markets are fragmented.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          {nodes.map((n, i) => (
            <Reveal key={n} delay={i * 0.08}>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/70">
                {n}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5}>
          <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-pran-teal-lit to-transparent" />
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mx-auto mt-10 max-w-xl text-lg text-white/70">
            PRAN connects every participant of the carbon economy through one
            intelligent marketplace.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
