"use client";

import { Reveal } from "@/components/marketing/reveal";
import { Counter } from "@/components/marketing/counter";
import { proofStats } from "@/lib/config";

/**
 * Proof strip (5_Design.md v2.0 §4.1 S2) — warm band, four hairline-separated
 * stat blocks, numbers counting up. NO icons: the number is the visual.
 */
export function ProofStrip() {
  return (
    <section className="border-y border-pran-hairline bg-pran-paper-warm py-14 sm:py-16">
      <div className="mx-auto max-w-content px-6">
        <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-pran-hairline">
          {proofStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="sm:px-8 sm:first:pl-0">
              <dt className="font-display text-display-l font-semibold tabular-nums text-pran-ink">
                <Counter to={s.value} suffix={s.suffix ?? ""} />
              </dt>
              <dd className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
                {s.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
