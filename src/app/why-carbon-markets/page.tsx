import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DrawnHero, Em, FieldPath } from "@/components/craft/drawn-hero";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { BigFigure } from "@/components/craft/big-figure";
import { Ledger } from "@/components/craft/ledger";
import { FlowRail } from "@/components/craft/flow-rail";
import { TonneScale } from "@/components/marketing/tonne-scale";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBand } from "@/components/marketing/page-kit";
import {
  tonneScale,
  climateFacts,
  globalPricing,
  actionOrder,
  whySources,
} from "@/lib/page-data";
import { marketFacts } from "@/lib/market-data";
import { pageImages } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Why Carbon Markets Matter",
  description:
    "A tonne of CO₂ is a sphere ten metres across. Once you can see it, a price on it stops being abstract, and that price is what moves capital to projects that remove it.",
};

/**
 * /why-carbon-markets — the manifesto, and the most cinematic interior page.
 *
 * The argument is built in one order and it only works in that order:
 * you cannot picture a tonne → so a price on it means nothing → so the market
 * reads as an accounting trick → so nobody trusts it. Make the tonne visible
 * first and every later step lands.
 */

const beliefs = [
  {
    h: "Price signals move capital",
    p: "When emissions carry a real cost, capital flows to the projects that cut them. A functioning market turns intent into funded work.",
  },
  {
    h: "Verification is everything",
    p: "A credit is worth exactly what stands behind it. We list registry-issued projects and facilitate transfers you can check.",
  },
  {
    h: "Reduce first, then offset",
    p: "Offsetting is for what you cannot yet eliminate. Every recommendation leads with real reductions, because that is what actually helps.",
  },
  {
    h: "Honest claims protect everyone",
    p: "We never say “carbon neutral”. We state a fact: credits were purchased and retired, for a stated period. Careful language protects the buyer and the market.",
  },
];

/** Hero field — a measuring rule, because the page is about scale. */
function ScaleField() {
  const ticks = Array.from({ length: 29 }, (_, i) => 60 + i * 48);
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="sc-glow" cx="62%" cy="46%" r="56%">
          <stop offset="0%" stopColor="#d9f99d" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#d9f99d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#sc-glow)" />
      <FieldPath d="M 40 470 L 1400 470" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.5" delay={0.3} />
      {ticks.map((x, i) => (
        <line
          key={x}
          x1={x}
          y1={470}
          x2={x}
          y2={i % 5 === 0 ? 424 : 448}
          stroke={i % 5 === 0 ? "#d9f99d" : "#ffffff"}
          strokeWidth={i % 5 === 0 ? 2 : 1}
          className="field-in"
          style={
            { "--field-opacity": i % 5 === 0 ? "0.5" : "0.16", animationDelay: `${0.5 + i * 0.025}s` } as CSSProperties
          }
        />
      ))}
      <circle
        cx="1010" cy="330" r="140" fill="none" stroke="#d9f99d" strokeOpacity="0.3" strokeWidth="2"
        className="field-in"
        style={{ "--field-opacity": "1", animationDelay: "1.4s" } as CSSProperties}
      />
    </svg>
  );
}

export default function WhyCarbonMarketsPage() {
  return (
    <>
      <DrawnHero
        eyebrow="Why carbon markets matter"
        lines={[
          "Nobody has an intuition",
          <>
            for <Em>a tonne</Em>.
          </>,
        ]}
        sub="Which is exactly the problem. Every climate number is denominated in a unit almost no one can picture, so the price attached to it reads as an accounting trick rather than the cost of a real, physical thing."
        image={pageImages.whyClimate}
        field={<ScaleField />}
        actions={
          <>
            <Link href="/marketplace" className={cn(buttonVariants({ size: "lg" }), "group")}>
              See what a tonne costs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/calculator"
              className="text-[15px] font-medium text-white underline-offset-4 hover:underline"
            >
              Measure your own
            </Link>
          </>
        }
      />

      {/* ── What is actually happening ──────────────────────────────────────
          Every figure here is sourced and linked. No claim appears on this
          page that a reader cannot go and check — see lib/page-data.ts. */}
      <ModeBand mode="data" size="lg">
        <BandHeader
          eyebrow="Where we are"
          title="The atmosphere keeps a running total."
          sub="Carbon dioxide is not flushed out each year. It accumulates, and what accumulates is what warms. So the number that matters is not this year's emissions: it is the stock they add to."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-panel bg-pran-hairline md:grid-cols-3">
          {climateFacts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.06}>
              <div className="flex h-full flex-col bg-pran-surface p-8">
                <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-pran-ink">
                  {f.value}
                </p>
                <p className="mt-3 font-display text-[15px] font-semibold text-pran-ink">
                  {f.label}
                </p>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-pran-muted">
                  {f.detail}
                </p>
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 border-t border-pran-hairline pt-4 text-[12px] leading-relaxed text-pran-emerald underline-offset-4 hover:underline"
                >
                  {f.source} ↗
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-pran-muted">
            The consequences are physical, not political: warmer oceans, longer
            and hotter heatwaves, heavier rainfall where it rains and deeper
            drought where it does not, and a sea level that keeps rising for
            centuries after emissions stop. India sits at the sharp end of most
            of them: monsoon variability, coastal exposure, and heat that is
            already crossing the limit of what outdoor work allows.
          </p>
        </Reveal>
      </ModeBand>

      {/* ── The signature visual: make the unit visible ─────────────────── */}
      <ModeBand mode="cinematic" size="lg">
        <BandHeader
          tone="dark"
          eyebrow="Scale"
          title="This is one tonne."
          sub="Not a metaphor: the actual volume. As a gas at ordinary temperature and pressure, one tonne of CO₂ fills a sphere about ten metres across. You emit several of these a year."
        />
        <div className="mt-14 overflow-x-auto">
          <div className="min-w-[680px]">
            <TonneScale />
          </div>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <BigFigure
            value={tonneScale.diameterMetres}
            unit="metres across"
            caption="one tonne of CO₂, as a gas"
            tone="dark"
          />
          <Reveal delay={0.06}>
            <p className="text-lg leading-relaxed text-white/75">
              Once the unit is physical, the rest of the argument stops being
              abstract. A price on a tonne is a price on{" "}
              <span className="font-medium text-white">that</span>, and paying
              it is how the money reaches somebody who can keep it out of the
              air or take it back out.
            </p>
          </Reveal>
        </div>
      </ModeBand>

      {/* ── Where the price actually goes ───────────────────────────────── */}
      <ModeBand mode="data" size="lg">
        <BandHeader
          eyebrow="The mechanism"
          title="What a price on a tonne actually does."
          sub="A carbon market is not a way to avoid cutting emissions. It is the mechanism that funds removals somebody else can do more cheaply than you can, and records that it happened."
        />
        <div className="mt-14">
          <FlowRail
            steps={[
              { label: "An emitter pays", detail: "For the emissions they cannot yet cut.", meta: "Cost" },
              { label: "A project is funded", detail: "Forestry, renewables, methane capture, work that would not otherwise be paid for.", meta: "Capital" },
              { label: "A registry verifies", detail: "An accredited third party checks the tonnes were real.", meta: "Proof", manual: true },
              { label: "The credit is retired", detail: "Taken permanently out of circulation, against a stated period.", meta: "Final" },
            ]}
            caption="PRAN sits at the settlement step only. It does not issue credits, verify them, or decide that a project is good: registries and accredited verifiers do that."
          />
        </div>
      </ModeBand>

      {/* ── The global picture: two markets, not one ────────────────────── */}
      <ModeBand mode="warm" size="lg">
        <BandHeader
          eyebrow="How it works globally"
          title="Two markets, doing different jobs."
          sub="Almost every confusion about carbon credits comes from treating these as one thing. They have different buyers, different rules, and different consequences for getting it wrong."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-panel bg-pran-hairline lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col bg-pran-surface p-8 sm:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-pran-emerald">
                Compliance
              </p>
              <h3 className="mt-3 font-display text-h3 font-semibold text-pran-ink">
                A government caps you.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-pran-muted">
                A regulator sets a limit on what you may emit and issues or
                auctions allowances up to that limit. Emit less and you sell the
                surplus; emit more and you buy. The cap falls over time, so the
                price is a policy instrument, not a market opinion. The EU ETS,
                China&rsquo;s national ETS and India&rsquo;s CCTS all work this
                way. Participation is not optional.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex h-full flex-col bg-pran-surface p-8 sm:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-pran-emerald">
                Voluntary
              </p>
              <h3 className="mt-3 font-display text-h3 font-semibold text-pran-ink">
                You choose to act.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-pran-muted">
                No regulator compels you. A developer runs a project, an
                independent auditor verifies the result, and a registry issues
                serialised credits you can buy and retire. Nothing forces
                quality here except the standard the credit was issued under —
                which is exactly why the standard, the vintage and the registry
                record matter more than the price.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-panel border border-pran-hairline bg-pran-paper-warm p-8 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12">
              <p className="font-display text-[clamp(2.75rem,7vw,4.5rem)] font-semibold leading-none tracking-[-0.03em] text-pran-emerald">
                {globalPricing.coverageShare}
              </p>
              <div>
                <p className="text-lg leading-relaxed text-pran-ink">
                  of global greenhouse gas emissions now sit under a direct
                  carbon price — across{" "}
                  <strong className="font-semibold">
                    {globalPricing.carbonTaxes} carbon taxes
                  </strong>{" "}
                  and{" "}
                  <strong className="font-semibold">
                    {globalPricing.emissionsTradingSystems} emissions trading
                    systems
                  </strong>
                  . There were {globalPricing.instrumentsIn2005} such
                  instruments in 2005; there are {globalPricing.instruments}{" "}
                  today, raising {globalPricing.revenueUsd} a year.
                </p>
                <a
                  href={globalPricing.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[13px] text-pran-emerald underline-offset-4 hover:underline"
                >
                  {globalPricing.source} ↗
                </a>
              </div>
            </div>
            <p className="mt-8 border-t border-pran-hairline pt-6 text-[15px] leading-relaxed text-pran-muted">
              Which also says the quiet part: roughly seven tonnes in ten still
              carry no price at all. The mechanism works — it is simply not yet
              pointed at most of the problem.
            </p>
          </div>
        </Reveal>
      </ModeBand>

      {/* ── What we believe ─────────────────────────────────────────────── */}
      <ModeBand mode="warm" size="lg">
        <BandHeader
          eyebrow="What we believe"
          title="Four positions we'll defend."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2">
          {beliefs.map((b, i) => (
            <Reveal key={b.h} delay={i * 0.05}>
              <div className="h-full bg-pran-surface p-8">
                <span className="font-display text-sm font-semibold tabular-nums text-pran-emerald">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-h3 font-semibold text-pran-ink">
                  {b.h}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-pran-muted">
                  {b.p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </ModeBand>

      {/* ── The market context ──────────────────────────────────────────── */}
      <ModeBand mode="cinematic" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-h2 font-semibold tracking-[-0.02em] text-white">
              The targets are set. The arithmetic is not optional.
            </h2>
            <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-white/70">
              These are the published commitments every compliance framework is
              now calibrated against. Nothing here is our estimate.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Ledger
              tone="dark"
              head={["Commitment", "Figure"]}
              rows={marketFacts.map((f) => ({
                label: f.label,
                value: f.value,
                note: `${f.note} — ${f.source}, ${f.year}`,
              }))}
            />
          </Reveal>
        </div>
      </ModeBand>

      {/* ── What actually reduces the total ─────────────────────────────── */}
      <ModeBand mode="data" size="lg">
        <BandHeader
          eyebrow="What can be done"
          title="In this order. It is not interchangeable."
          sub="Credits sit at the end of this list, not the start. Anyone who sells them to you as a substitute for the first three steps is selling you a liability."
        />
        <ol className="mx-auto mt-14 max-w-4xl">
          {actionOrder.map((step, i) => (
            <li key={step.title}>
              <Reveal from={i % 2 === 0 ? "left" : "right"}>
                <div
                  className={cn(
                    "flex items-start gap-6 py-8 sm:gap-10",
                    i % 2 === 1 && "sm:flex-row-reverse sm:text-right",
                  )}
                >
                  <span
                    aria-hidden
                    className="font-display text-[clamp(3.25rem,9vw,5.5rem)] font-semibold leading-[0.8] tabular-nums text-pran-emerald/25"
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 pt-1">
                    <h3 className="font-display text-h3 font-semibold text-pran-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-pran-muted sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
              {i < actionOrder.length - 1 && (
                <div className="h-px bg-pran-hairline" />
              )}
            </li>
          ))}
        </ol>
      </ModeBand>

      {/* ── Go and check it ─────────────────────────────────────────────── */}
      <ModeBand mode="warm" size="md">
        <BandHeader
          eyebrow="Sources"
          title="Don't take our word for any of it."
          sub="Every figure on this page comes from one of these. They are the primary documents, not summaries of them."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2 lg:grid-cols-3">
          {whySources.map((s, i) => (
            <li key={s.href}>
              <Reveal delay={i * 0.04}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col bg-pran-surface p-7 transition-colors hover:bg-pran-paper-warm"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-pran-muted">
                    {s.org}
                  </p>
                  <p className="mt-2.5 font-display text-[17px] font-semibold leading-snug text-pran-ink group-hover:text-pran-emerald">
                    {s.title}
                  </p>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-pran-muted">
                    {s.note}
                  </p>
                  <span className="mt-4 text-[13px] font-medium text-pran-emerald">
                    Read it ↗
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </ModeBand>

      <CtaBand
        title="Now put a number on your own."
        subtitle="The calculator estimates a footprint on cited factors. It never issues credits, and it never calls anything neutral."
        primary={{ label: "Open the Calculator", href: "/calculator" }}
        secondary={{ label: "Explore Marketplace", href: "/marketplace" }}
      />
    </>
  );
}
