import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DrawnHero, Em, FieldPath } from "@/components/craft/drawn-hero";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { Ledger } from "@/components/craft/ledger";
import { IsIsNot } from "@/components/about/is-is-not";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBand } from "@/components/marketing/page-kit";
import { operatingSteps } from "@/lib/leadership";
import { pageImages } from "@/lib/images";
import { frictionPoints } from "@/lib/market-data";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Why We Exist",
  description:
    "PRAN is not a green brand. It is the financial-infrastructure layer for the carbon market: transparent, verifiable, and honest by design.",
};

/** What PRAN is, stated against what it is not. The contrast is the point. */
const isIsNot = [
  {
    not: "Not an issuer",
    is: "Credits exist only because a registry issued them. PRAN lists what already exists: it has never created a tonne and never will.",
  },
  {
    not: "Not an auditor or verifier",
    is: "Validation and verification are done by accredited third parties, on the registry's terms. We do not grade projects.",
  },
  {
    not: "Not a financial advisor",
    is: "We do not advise on carbon price direction, and we do not treat credits as an investment product.",
  },
  {
    not: "Not a green brand",
    is: "We are market infrastructure. The product is settlement, records and screening, not a message about the planet.",
  },
];

/** Hero field — a settlement spine with branches. Infrastructure, drawn. */
function SpineField() {
  const branches = [
    { y: 220, x: 520 },
    { y: 300, x: 780 },
    { y: 480, x: 660 },
    { y: 560, x: 900 },
  ];
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="sp-glow" cx="58%" cy="50%" r="56%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#sp-glow)" />
      <FieldPath d="M 40 390 L 1400 390" stroke="#d9f99d" strokeOpacity="0.5" strokeWidth="2.5" delay={0.35} />
      {branches.map((b, i) => (
        <FieldPath
          key={i}
          d={`M ${b.x} 390 L ${b.x} ${b.y} L ${b.x + 300} ${b.y}`}
          stroke="#ffffff"
          strokeOpacity="0.2"
          strokeWidth="1.5"
          delay={0.9 + i * 0.15}
        />
      ))}
      {branches.map((b, i) => (
        <circle
          key={`n${i}`} cx={b.x} cy="390" r="5" fill="#d9f99d"
          className="field-in"
          style={{ "--field-opacity": "0.9", animationDelay: `${1.5 + i * 0.12}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <DrawnHero
        eyebrow="Why we exist"
        lines={[
          "We are not a",
          <>
            green brand. We are <Em>the plumbing</Em>.
          </>,
        ]}
        sub="PRAN, operated by Pran Sustainability Pvt. Ltd., exists to make the carbon economy work like real financial infrastructure: transparent, verifiable, and boring in exactly the places that matter."
        image={pageImages.aboutWhy}
        field={<SpineField />}
        actions={
          <>
            <Link href="/about/team" className={cn(buttonVariants({ size: "lg" }), "group")}>
              Meet the founder
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/why-carbon-markets"
              className="text-[15px] font-medium text-white underline-offset-4 hover:underline"
            >
              Why carbon markets matter
            </Link>
          </>
        }
      />

      {/* ── The signature visual: what we are, against what we are not ─── */}
      <ModeBand mode="data" size="lg">
        <BandHeader
          eyebrow="Position"
          title="Stated against what it isn't."
          sub="Most of this industry describes itself in adjectives. The fastest way to say what PRAN is, is to strike out the four things people usually assume it must be."
        />
        <div className="mt-14">
          <IsIsNot items={isIsNot} />
        </div>
      </ModeBand>

      {/* ── The argument ────────────────────────────────────────────────── */}
      <ModeBand mode="cinematic" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-h2 font-semibold tracking-[-0.02em] text-white">
              The gaps between participants are the cost.
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-white/70">
              Developers, registries, buyers, governments and consultants each
              hold one piece of the picture. Every gap between them shows up as
              delay, price dispersion, and distrust, and someone pays for all
              three.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Ledger
              tone="dark"
              head={["Where it breaks", "Stage"]}
              rows={frictionPoints.map((f, i) => ({
                label: f.stage,
                value: `0${i + 1}`,
                note: f.problem,
              }))}
              caption="Stated as claims we can defend, not percentages we invented."
            />
          </Reveal>
        </div>
      </ModeBand>

      {/* ── How we operate ──────────────────────────────────────────────── */}
      <ModeBand mode="warm" size="lg">
        <BandHeader eyebrow="How it works" title="How we operate." />

        {/* A vertical sequence, not a card grid: each step enters from the
            opposite side to the one before it, so the eye zig-zags down the
            order of operations instead of scanning a matrix (founder
            direction, 2026-08-09). The numeral is the anchor, set large. */}
        <ol className="mx-auto mt-14 max-w-4xl">
          {operatingSteps.map((step, i) => (
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
              {i < operatingSteps.length - 1 && (
                <div className="h-px bg-pran-hairline" />
              )}
            </li>
          ))}
        </ol>
      </ModeBand>

      <CtaBand
        title="Meet the person building it."
        primary={{ label: "Leadership", href: "/about/team" }}
        secondary={{ label: "Why carbon markets matter", href: "/why-carbon-markets" }}
      />
    </>
  );
}
