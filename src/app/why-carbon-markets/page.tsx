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
import { tonneScale } from "@/lib/page-data";
import { marketFacts } from "@/lib/market-data";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Why Carbon Markets Matter",
  description:
    "A tonne of CO₂ is a sphere ten metres across. Once you can see it, a price on it stops being abstract — and that price is what moves capital to projects that remove it.",
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
        sub="Which is exactly the problem. Every climate number is denominated in a unit almost no one can picture — so the price attached to it reads as an accounting trick rather than the cost of a real, physical thing."
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

      {/* ── The signature visual: make the unit visible ─────────────────── */}
      <ModeBand mode="cinematic" size="lg">
        <BandHeader
          tone="dark"
          eyebrow="Scale"
          title="This is one tonne."
          sub="Not a metaphor — the actual volume. As a gas at ordinary temperature and pressure, one tonne of CO₂ fills a sphere about ten metres across. You emit several of these a year."
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
              <span className="font-medium text-white">that</span> — and paying
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
              { label: "A project is funded", detail: "Forestry, renewables, methane capture — work that would not otherwise be paid for.", meta: "Capital" },
              { label: "A registry verifies", detail: "An accredited third party checks the tonnes were real.", meta: "Proof", manual: true },
              { label: "The credit is retired", detail: "Taken permanently out of circulation, against a stated period.", meta: "Final" },
            ]}
            caption="PRAN sits at the settlement step only. It does not issue credits, verify them, or decide that a project is good — registries and accredited verifiers do that."
          />
        </div>
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

      <CtaBand
        title="Now put a number on your own."
        subtitle="The calculator estimates a footprint on cited factors. It never issues credits, and it never calls anything neutral."
        primary={{ label: "Open the Calculator", href: "/calculator" }}
        secondary={{ label: "Explore Marketplace", href: "/marketplace" }}
      />
    </>
  );
}
