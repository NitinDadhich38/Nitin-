"use client";

import { Reveal } from "@/components/marketing/reveal";
import { StackedBar } from "@/components/marketing/charts";
import { roundedStats } from "@/lib/config";
import { volumeBySector } from "@/lib/marketplace-data";

/**
 * Scale band.
 *
 * Rounded figures only — the homepage states the size of the book, it does not
 * publish it. The composition bar shows the shape of supply (a diversified
 * book is the actual argument) without naming a single tonnage.
 */
export function ProofStrip() {
  const mix = volumeBySector().slice(0, 5);

  return (
    <section className="border-y border-pran-hairline bg-pran-paper-warm py-14 sm:py-16">
      <div className="mx-auto max-w-content px-6">
        <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-pran-hairline">
          {roundedStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="sm:px-8 sm:first:pl-0">
              <dt className="font-display text-display-l font-semibold tabular-nums text-pran-ink">
                {s.value}
              </dt>
              <dd className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
                {s.label}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.25}>
          <div className="mt-12 border-t border-pran-hairline pt-8">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
              Supply mix
            </p>
            <StackedBar data={mix} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
