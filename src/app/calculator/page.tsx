import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { DrawnHero, Em, FieldPath } from "@/components/craft/drawn-hero";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { Reveal } from "@/components/marketing/reveal";
import { TermsNote } from "@/components/shared/terms-note";
import { CalculatorClient } from "@/components/calculator/calculator-client";
import { METHODOLOGY_NOTE } from "@/lib/emission-factors";
import { pageImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Carbon Footprint Calculator",
  description:
    "Estimate your personal or business carbon footprint on cited factors — DEFRA, GHG Protocol, and the CEA grid factor for Indian electricity. No sign-up.",
};

/**
 * /calculator — the one genuinely interactive surface on the site.
 *
 * The opener moved out of CalculatorClient so this page can carry a
 * diagram-forward hero like every other interior page, and so the client
 * component owns only the tool. The calculation logic is untouched.
 *
 * HARD RULE (CLAUDE.md): this page estimates FOOTPRINTS. It never generates
 * credits, and no copy anywhere on it may say carbon neutral, net zero, or
 * climate positive.
 */

/** Hero field — a stacked bar resolving into one column: many inputs, one number. */
function StackField() {
  const bars = [
    { x: 300, h: 120 },
    { x: 400, h: 200 },
    { x: 500, h: 90 },
    { x: 600, h: 160 },
    { x: 700, h: 240 },
    { x: 800, h: 130 },
  ];
  const BASE = 560;
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="st-glow" cx="66%" cy="50%" r="54%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#st-glow)" />
      <FieldPath d={`M 240 ${BASE} L 1300 ${BASE}`} stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.5" delay={0.3} />

      {bars.map((b, i) => (
        <rect
          key={b.x}
          x={b.x}
          y={BASE - b.h}
          width="46"
          height={b.h}
          rx="5"
          fill="#ffffff"
          className="field-in"
          style={{ "--field-opacity": "0.12", animationDelay: `${0.5 + i * 0.09}s` } as CSSProperties}
        />
      ))}

      {/* the one number they add up to */}
      <rect
        x="1010"
        y={BASE - 340}
        width="70"
        height="340"
        rx="6"
        fill="#d9f99d"
        className="field-in"
        style={{ "--field-opacity": "0.55", animationDelay: "1.5s" } as CSSProperties}
      />
      {bars.map((b, i) => (
        <FieldPath
          key={`c${b.x}`}
          d={`M ${b.x + 23} ${BASE - b.h - 12} C ${b.x + 23} ${BASE - 420}, 1045 ${BASE - 420}, 1045 ${BASE - 352}`}
          stroke="#d9f99d"
          strokeOpacity="0.22"
          strokeWidth="1.5"
          delay={0.9 + i * 0.08}
        />
      ))}
    </svg>
  );
}

export default function CalculatorPage() {
  return (
    <>
      <DrawnHero
        eyebrow="Carbon footprint calculator"
        lines={[
          "Know your number",
          <>
            before you <Em>offset it</Em>.
          </>,
        ]}
        sub="A few inputs, cited factors, one figure. Built on DEFRA conversion factors, the GHG Protocol scope structure, and the CEA grid factor for Indian electricity. No sign-up."
        image={pageImages.calculatorHero}
        field={<StackField />}
      />

      <CalculatorClient />

      {/* ── What this is, and firmly what it is not ─────────────────────── */}
      <ModeBand mode="data" size="lg">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <BandHeader
              eyebrow="Method"
              title="Where every factor comes from."
              sub="An estimate is only as good as what sits behind it, so the sources are named rather than summarised as “industry standard”."
            />
            <Reveal delay={0.06}>
              <div className="mt-8">
                <TermsNote>{METHODOLOGY_NOTE}</TermsNote>
              </div>
            </Reveal>
          </div>
        </div>
      </ModeBand>
    </>
  );
}
