"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { DonutChart } from "@/components/marketing/charts";
import { countByRegistry } from "@/lib/marketplace-data";
import { marketFacts } from "@/lib/market-data";
import { photos } from "@/lib/images";

/**
 * Trust & scale.
 *
 * The registry split stays — it is the one portfolio cut that is genuinely a
 * credibility signal rather than a data dump. Everything else is sourced market
 * context, not PRAN's order book. Scale figures live once, in the proof strip;
 * they are deliberately NOT repeated here (no data twice on one page). The
 * exact book lives on the marketplace and dashboard, where a buyer needs it.
 */
export function TrustSection() {
  const registries = countByRegistry();

  return (
    <section className="relative overflow-hidden bg-pran-forest py-24 text-white sm:py-32">
      <Image
        src={photos.forestRiver}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.12]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-pran-forest/95 via-pran-forest/92 to-pran-forest"
      />

      <div className="relative mx-auto max-w-content px-6">
        <div className="max-w-[62ch]">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-lime">
              Trust &amp; scale
            </p>
            <h2 className="mt-5 max-w-[20ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
              Backed by registries, not by our word.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              PRAN does not issue credits and does not verify them. Every credit
              on the platform was issued by an independent registry and audited
              by a third party — we list, facilitate and record.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 border-t border-white/12 pt-14 lg:grid-cols-[auto_1fr] lg:gap-20">
          {/* The one portfolio cut worth showing */}
          <Reveal>
            <div>
              <h3 className="font-display text-h3 font-semibold text-white">
                Registry standards
              </h3>
              <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-white/55">
                Supply spread across the standards that issue and police it.
              </p>
              <div className="mt-7">
                <DonutChart data={registries} dark />
              </div>
            </div>
          </Reveal>

          {/* Market context, sourced */}
          <Reveal delay={0.08}>
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-h3 font-semibold text-white">
                The market we operate in
              </h3>
              <dl className="mt-7 grid gap-px overflow-hidden rounded-panel bg-white/12 sm:grid-cols-3">
                {marketFacts.map((f) => (
                  <div key={f.label} className="bg-pran-forest p-6">
                    <dt className="font-display text-3xl font-semibold tabular-nums text-pran-lime">
                      {f.value}
                    </dt>
                    <dd className="mt-2 text-sm font-medium text-white">
                      {f.label}
                    </dd>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                      {f.note}
                    </p>
                    <p className="mt-3 text-[11px] text-white/35">
                      {f.source}, {f.year}
                    </p>
                  </div>
                ))}
              </dl>

              <Link
                href="/dashboard"
                className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-pran-lime"
              >
                See the full market dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
