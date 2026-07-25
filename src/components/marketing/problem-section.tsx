"use client";

import { Reveal } from "@/components/marketing/reveal";
import { useInViewOnce } from "@/lib/use-in-view-once";
import { useReducedMotion } from "framer-motion";
import { emissionsGap, frictionPoints } from "@/lib/market-data";

/**
 * The problem — told as an argument, not a statement.
 *
 * The visual is the emissions gap itself (UNEP), which is the actual reason
 * this market exists, rather than an abstract node diagram about org charts.
 * Two columns of the same bar, one where the world is heading and one where it
 * has to be, with the gap between them called out.
 */
export function ProblemSection() {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ disabled: !!reduce });

  const max = Math.max(...emissionsGap.points.map((p) => p.value));

  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        {/* The argument, in lines */}
        <div className="max-w-[62ch]">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
              The problem
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.08] text-pran-ink">
              The world already agreed on the number.
              <span className="block text-pran-muted">
                It just has no way to reach it.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-pran-muted">
              <p>
                Cutting emissions is the first job, and it will not be enough on
                its own. Everything that cannot be cut in time has to be paid to
                be avoided or removed somewhere else — and that payment is what a
                carbon market is.
              </p>
              <p>
                <span className="font-medium text-pran-ink">
                  So the money exists and the projects exist.
                </span>{" "}
                What is missing is the connection between them: no shared prices,
                no comparable quality, no settlement anyone trusts.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The gap, drawn */}
        <div ref={ref} className="mt-16">
          <div className="grid gap-10 rounded-panel bg-pran-surface p-8 shadow-card sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            {/* bars */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
                Global emissions · {emissionsGap.unit}
              </p>

              <div className="mt-8 flex h-[240px] items-end gap-5 sm:gap-8">
                {emissionsGap.points.map((p, i) => {
                  const h = (p.value / max) * 100;
                  const target = p.tone === "target";
                  return (
                    <div
                      key={p.label}
                      className="flex h-full flex-1 flex-col justify-end"
                    >
                      <span
                        className={`mb-2 font-display text-xl font-semibold tabular-nums sm:text-2xl ${
                          target ? "text-pran-emerald" : "text-pran-ink"
                        }`}
                      >
                        {p.value}
                      </span>
                      <span
                        className={`w-full rounded-t-lg ${
                          target ? "bg-pran-emerald" : "bg-pran-forest"
                        }`}
                        style={{
                          height: inView ? `${h}%` : "0%",
                          transition: reduce
                            ? "none"
                            : `height 900ms cubic-bezier(.22,.9,.3,1) ${i * 120}ms`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex gap-5 sm:gap-8">
                {emissionsGap.points.map((p) => (
                  <p
                    key={p.label}
                    className="flex-1 text-[13px] leading-snug text-pran-muted"
                  >
                    {p.label}
                  </p>
                ))}
              </div>
            </div>

            {/* the gap callout */}
            <div className="flex flex-col justify-center border-t border-pran-hairline pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
                {emissionsGap.gap.label}
              </p>
              <p className="mt-3 font-display text-display-l font-semibold leading-none tabular-nums text-pran-ink">
                {emissionsGap.gap.value}
                <span className="ml-2 align-top text-xl font-normal text-pran-muted">
                  Gt / yr
                </span>
              </p>
              <p className="mt-4 max-w-[34ch] leading-relaxed text-pran-muted">
                {emissionsGap.gap.note}. That gap is the entire reason this
                market has to work — and the reason it cannot stay a spreadsheet
                business.
              </p>
              <p className="mt-6 text-xs text-pran-muted/80">
                Source: {emissionsGap.source}, {emissionsGap.year}
              </p>
            </div>
          </div>
        </div>

        {/* where it breaks */}
        <Reveal delay={0.1}>
          <div className="mt-12">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
              Where it breaks today
            </p>
            <ol className="mt-6 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2 lg:grid-cols-4">
              {frictionPoints.map((f) => (
                <li key={f.stage} className="bg-pran-paper p-6">
                  <p className="font-display text-h3 font-semibold text-pran-ink">
                    {f.stage}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-pran-muted">
                    {f.problem}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
