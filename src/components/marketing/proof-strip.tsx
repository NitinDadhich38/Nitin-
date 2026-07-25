"use client";

import { Reveal } from "@/components/marketing/reveal";
import { Counter } from "@/components/marketing/counter";
import { StackedBar } from "@/components/marketing/charts";
import { proofStats } from "@/lib/config";
import { volumeBySector } from "@/lib/marketplace-data";

/**
 * Proof strip (§4.1 S2 + proposal H3) — warm band, four hairline-separated
 * stat blocks with a composition bar beneath. NO icons: the number is the
 * visual. Same height as the plain version, far more information.
 */
export function ProofStrip() {
  const mix = volumeBySector().slice(0, 5);

  return (
    <section className="border-y border-pran-hairline bg-pran-paper-warm py-14 sm:py-16">
      <div className="mx-auto max-w-content px-6">
        <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-pran-hairline">
          {proofStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="sm:px-8 sm:first:pl-0">
              <dt className="font-display text-display-l font-semibold tabular-nums text-pran-ink">
                {s.display ? (
                  <span>{s.display}</span>
                ) : (
                  <Counter to={s.value} suffix={s.suffix ?? ""} />
                )}
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
              Portfolio composition by volume
            </p>
            <StackedBar data={mix} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
