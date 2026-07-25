"use client";

import Image from "next/image";
import { Reveal } from "@/components/marketing/reveal";
import { Counter } from "@/components/marketing/counter";
import { BarChart, DonutChart } from "@/components/marketing/charts";
import {
  portfolioStats,
  volumeBySector,
  volumeByCountry,
  countByRegistry,
} from "@/lib/marketplace-data";
import { photos } from "@/lib/images";
import { compact } from "@/lib/config";

/**
 * Trust & Scale — the data room (proposals T1, T2, T5, H8).
 * Numbers alone don't carry a portfolio this size; charts do. Everything here
 * is derived from marketplace-data.ts, so it can never drift from the book.
 */
export function TrustSection() {
  const sectors = volumeBySector().slice(0, 8);
  const countries = volumeByCountry().slice(0, 8);
  const registries = countByRegistry();

  return (
    <section className="relative overflow-hidden bg-pran-forest py-24 text-white sm:py-32">
      {/* Full-bleed aerial, heavily dimmed — texture, not decoration */}
      <Image
        src={photos.forestRiver}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-pran-forest/95 via-pran-forest/90 to-pran-forest"
      />

      <div className="relative mx-auto max-w-content px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-lime">
            Trust &amp; scale
          </p>
          <h2 className="mt-4 max-w-[20ch] font-display text-display-l font-semibold text-white">
            Verifiable at every step. Auditable after every trade.
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-white/70">
            The PRAN book today — {portfolioStats.projects} projects and{" "}
            {portfolioStats.listings} listings across{" "}
            {portfolioStats.registries} registry standards and{" "}
            {portfolioStats.countries} countries. Every figure below is read
            directly from the portfolio, not written by hand.
          </p>
        </Reveal>

        {/* Headline figures */}
        <Reveal delay={0.1}>
          <dl className="mt-14 grid grid-cols-2 gap-y-10 border-y border-white/12 py-10 sm:grid-cols-4 sm:divide-x sm:divide-white/12">
            {[
              { v: portfolioStats.projects, label: "Projects", raw: true },
              {
                v: portfolioStats.totalVolume,
                label: "tCO₂e available",
                display: compact(portfolioStats.totalVolume),
              },
              { v: portfolioStats.countries, label: "Countries", raw: true },
              {
                v: portfolioStats.irecVolumeMwh,
                label: "I-REC MWh",
                display: compact(portfolioStats.irecVolumeMwh),
              },
            ].map((s) => (
              <div key={s.label} className="sm:px-8 sm:first:pl-0">
                <dt className="font-display text-4xl font-semibold tabular-nums text-white sm:text-5xl">
                  {s.display ?? <Counter to={s.v} />}
                </dt>
                <dd className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-white/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Charts */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h3 className="font-display text-h3 font-semibold text-white">
              Volume by technology
            </h3>
            <p className="mt-2 text-sm text-white/55">
              tCO₂e across the book — a diversified supply base, not a single
              bet.
            </p>
            <div className="mt-6">
              <BarChart data={sectors} dark />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-display text-h3 font-semibold text-white">
              Volume by geography
            </h3>
            <p className="mt-2 text-sm text-white/55">
              Anchored in India, sourced across {portfolioStats.countries}{" "}
              countries.
            </p>
            <div className="mt-6">
              <BarChart data={countries} dark />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-10 border-t border-white/12 pt-12 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div>
              <h3 className="font-display text-h3 font-semibold text-white">
                Registry standards
              </h3>
              <p className="mt-2 max-w-[38ch] text-sm text-white/55">
                Projects by the standard that issued them. PRAN lists — the
                registries verify and issue.
              </p>
              <div className="mt-6">
                <DonutChart data={registries} dark />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 lg:pl-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/45">
                  Price range across the book
                </p>
                <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-white">
                  ${portfolioStats.priceMin.toFixed(2)} – $
                  {portfolioStats.priceMax.toFixed(0)}
                  <span className="ml-2 text-base font-normal text-white/50">
                    / tCO₂e
                  </span>
                </p>
                <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-white/60">
                  Not all tonnes are equal. Renewable-energy credits price near
                  the floor; engineered removals and community forestry sit at
                  the top. We show the whole range rather than a flattering
                  average.
                </p>
              </div>
              <p className="text-xs text-white/40">
                Portfolio as of July 2026 · figures derived from the PRAN book
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
