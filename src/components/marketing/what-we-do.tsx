import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";

/**
 * What we do — a bento grid, not a card list.
 *
 * Four cells of different sizes and weights, each conveying its capability
 * with a visual rather than an icon: the marketplace as a live product tile,
 * intelligence as a chart, the calculator as a gauge, compliance as record
 * rows. Cells lift on hover. (Illustrative figures — real data on Vercel.)
 */
export function WhatWeDo() {
  return (
    <section className="bg-pran-paper-warm py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-display-l font-semibold tracking-[-0.03em] text-pran-ink">
            One platform, the whole carbon lifecycle.
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-pran-muted">
            From discovering a credit to retiring it and reporting on it — every
            step runs on one connected system.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Marketplace — feature cell */}
            <BentoCell
              className="bg-pran-forest text-white lg:col-span-7"
              label="Marketplace"
              line="Verified, registry-backed credits with transparent pricing — filter by registry, technology, geography and delivery."
              cta="Browse projects"
              href="/marketplace"
              ctaClass="text-pran-lime"
            >
              <div className="mt-6 overflow-hidden rounded-[14px] border border-white/15 bg-white/5">
                <div className="relative h-32">
                  <Image
                    src={photos.forestCanopy}
                    alt="Forest canopy"
                    fill
                    sizes="(max-width:1024px) 100vw, 640px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 left-3 rounded-[10px] bg-white px-2.5 py-1.5 text-xs font-semibold text-pran-ink shadow-card">
                    Western Ghats · <span className="text-pran-emerald">$18.50</span>
                  </span>
                </div>
              </div>
            </BentoCell>

            {/* Carbon Intelligence — chart */}
            <BentoCell
              className="bg-pran-surface text-pran-ink lg:col-span-5"
              label="Carbon Intelligence"
              line="Procurement, ESG, BRSR and CBAM analysis — underwrite carbon like any other asset."
              cta="See the intelligence layer"
              href="/why-carbon-markets"
              ctaClass="text-pran-emerald"
            >
              <div className="mt-7 flex h-[84px] items-end gap-2">
                {[40, 62, 50, 78, 66, 92].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-b from-pran-emerald to-pran-forest"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </BentoCell>

            {/* Footprint Calculator — gauge */}
            <BentoCell
              className="bg-pran-surface text-pran-ink lg:col-span-5"
              label="Footprint Calculator"
              line="Estimate personal and business emissions on cited factors, then act on the number."
              cta="Estimate your footprint"
              href="/calculator"
              ctaClass="text-pran-emerald"
            >
              <div className="mt-7 flex items-center gap-4">
                <svg width="72" height="72" viewBox="0 0 42 42" aria-hidden>
                  <circle cx="21" cy="21" r="15.915" fill="none" stroke="#e6e1d8" strokeWidth="5" />
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="5"
                    strokeDasharray="64 36"
                    strokeDashoffset="25"
                    strokeLinecap="round"
                  />
                </svg>
                <div>
                  <div className="font-display text-4xl font-semibold tabular-nums tracking-[-0.03em] text-pran-ink">
                    6.4
                  </div>
                  <div className="text-[13px] text-pran-muted">tCO₂e / yr est.</div>
                </div>
              </div>
            </BentoCell>

            {/* Compliance — record rows */}
            <BentoCell
              className="bg-pran-ink text-white lg:col-span-7"
              label="Compliance Infrastructure"
              line="The rails beneath it all — verifiable records, retirement certificates and audit-ready documentation."
              cta="How it works"
              href="/why-carbon-markets"
              ctaClass="text-pran-lime"
            >
              <div className="mt-6 flex flex-col gap-2.5">
                {[
                  { t: "Retirement certificate issued", s: "PDF" },
                  { t: "Registry serial recorded", s: "verifiable" },
                ].map((r) => (
                  <div
                    key={r.t}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-pran-lime/15 text-pran-lime">
                      ✓
                    </span>
                    <span className="text-[13px] text-white">{r.t}</span>
                    <span className="ml-auto text-[11px] text-white/45">{r.s}</span>
                  </div>
                ))}
              </div>
            </BentoCell>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BentoCell({
  className,
  label,
  line,
  cta,
  href,
  ctaClass,
  children,
}: {
  className: string;
  label: string;
  line: string;
  cta: string;
  href: string;
  ctaClass: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`group flex min-h-[280px] flex-col overflow-hidden rounded-panel p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float ${className}`}
    >
      <div className="font-display text-2xl font-semibold tracking-[-0.02em]">
        {label}
      </div>
      <p className="mt-2.5 max-w-[38ch] text-[15px] leading-relaxed opacity-80">
        {line}
      </p>
      {children}
      <Link
        href={href}
        className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium ${ctaClass}`}
      >
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
