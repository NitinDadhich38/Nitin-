import type { CSSProperties } from "react";
import { FieldPath } from "@/components/craft/drawn-hero";
import { DrawnFigure, DrawnPath, DrawnIn, DrawnBar } from "@/components/craft/drawn-figure";
import { complianceTimeline, complianceSources } from "@/lib/page-data";
import { volumeBySector, portfolioStats } from "@/lib/marketplace-data";
import { DIET, DIET_SOURCE } from "@/lib/emission-factors";
import { compact } from "@/lib/config";

/**
 * Per-audience signature visuals for /solutions/[audience]
 * (7_Page_Design_Roadmap.md §4 Wave 1).
 *
 * Four audiences, four genuinely different arguments — so four different
 * drawings, not one component with a colour prop. The roadmap's test is that a
 * signature visual could not be moved to another page unnoticed; a shared
 * template would fail it by construction.
 */

/* ══ Hero fields ═══════════════════════════════════════════════════════════
   Background geometry behind the headline. Deliberately quiet — they set a
   register, they do not compete with the type. */

/** Enterprise — a calendar grid with one column already behind you. */
export function DeadlineField() {
  const cols = Array.from({ length: 13 }, (_, i) => 110 + i * 102);
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="df-glow" cx="68%" cy="46%" r="55%">
          <stop offset="0%" stopColor="#c97a4a" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#c97a4a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#df-glow)" />
      {cols.map((x, i) => (
        <g key={x}>
          <line
            x1={x} y1="180" x2={x} y2="600"
            stroke="#ffffff" strokeWidth="1"
            className="field-in"
            style={{ "--field-opacity": i < 8 ? "0.05" : "0.10", animationDelay: `${0.1 + i * 0.04}s` } as CSSProperties}
          />
          <rect
            x={x - 3} y={i < 8 ? 300 : 260} width="6" height={i < 8 ? 40 : 120}
            fill={i < 8 ? "#ffffff" : "#d9f99d"}
            className="field-in"
            style={{ "--field-opacity": i < 8 ? "0.08" : "0.5", animationDelay: `${0.5 + i * 0.05}s` } as CSSProperties}
          />
        </g>
      ))}
      <FieldPath d="M 110 620 L 1334 620" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.5" delay={0.3} />
      <FieldPath d="M 824 150 L 824 660" stroke="#d9f99d" strokeOpacity="0.55" strokeWidth="2" delay={1.1} />
    </svg>
  );
}

/** Developers — rails converging, money one way, credits the other. */
export function RailField() {
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="rf-glow" cx="60%" cy="50%" r="58%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#rf-glow)" />
      {[300, 340, 420, 460].map((y, i) => (
        <FieldPath
          key={y}
          d={`M ${i % 2 ? 1400 : 40} ${y} L ${i % 2 ? 40 : 1400} ${y}`}
          stroke={i % 2 ? "#f4c9a0" : "#d9f99d"}
          strokeOpacity="0.42"
          strokeWidth="1.5"
          delay={0.4 + i * 0.16}
        />
      ))}
      {Array.from({ length: 18 }, (_, i) => 60 + i * 78).map((x, i) => (
        <line
          key={x} x1={x} y1="240" x2={x} y2="520"
          stroke="#ffffff" strokeWidth="1"
          className="field-in"
          style={{ "--field-opacity": "0.045", animationDelay: `${0.15 + i * 0.03}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/** Government — a wide jurisdiction lattice. */
export function LatticeField() {
  const rows = [180, 268, 356, 444, 532, 620];
  const cols = Array.from({ length: 17 }, (_, i) => 60 + i * 82);
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="lf-glow" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#d9f99d" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#d9f99d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#lf-glow)" />
      {rows.map((y, i) => (
        <FieldPath key={y} d={`M 40 ${y} L 1400 ${y}`} stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1" delay={0.15 + i * 0.09} />
      ))}
      {cols.map((x, i) => (
        <line
          key={x} x1={x} y1="160" x2={x} y2="640"
          stroke="#ffffff" strokeWidth="1"
          className="field-in"
          style={{ "--field-opacity": "0.05", animationDelay: `${0.3 + i * 0.03}s` } as CSSProperties}
        />
      ))}
      {[[224, 268], [552, 444], [880, 356], [1208, 532]].map(([x, y], i) => (
        <circle
          key={i} cx={x} cy={y} r="6" fill="#d9f99d"
          className="field-in"
          style={{ "--field-opacity": "0.8", animationDelay: `${1.2 + i * 0.15}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/** Public — softer, warmer, consumer register. Concentric arcs. */
export function OrbitField() {
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="of-glow" cx="72%" cy="52%" r="52%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#of-glow)" />
      {[110, 190, 270, 350, 430].map((r, i) => (
        <FieldPath
          key={r}
          d={`M ${1010 - r} 400 A ${r} ${r} 0 1 1 ${1010 + r} 400 A ${r} ${r} 0 1 1 ${1010 - r} 400`}
          stroke="#d9f99d"
          strokeOpacity={0.34 - i * 0.05}
          strokeWidth="1.5"
          delay={0.35 + i * 0.18}
        />
      ))}
      <circle
        cx="1010" cy="400" r="26" fill="#d9f99d"
        className="field-in"
        style={{ "--field-opacity": "0.9", animationDelay: "1.5s" } as CSSProperties}
      />
    </svg>
  );
}

export const audienceField: Record<string, () => JSX.Element> = {
  enterprise: DeadlineField,
  developers: RailField,
  government: LatticeField,
  public: OrbitField,
};

/* ══ Signature figures ═════════════════════════════════════════════════════ */

const REGIME_COLOR: Record<string, string> = {
  BRSR: "#16a34a",
  CBAM: "#c97a4a",
  CCTS: "#0f3d2e",
};

/**
 * ENTERPRISE — the compliance calendar.
 *
 * The urgency is not "carbon matters"; it is "the dates are fixed, and most of
 * them are already behind you". So the drawing plots the schedule with today
 * on it, and everything to the left of today is drawn as solid and done.
 */
export function ComplianceCalendar() {
  const X0 = 70;
  const X1 = 900;
  const n = complianceTimeline.length;
  const xOf = (i: number) => X0 + (i * (X1 - X0)) / (n - 1);
  const lastPast = complianceTimeline.reduce((acc, e, i) => (e.past ? i : acc), 0);
  const todayX = (xOf(lastPast) + xOf(lastPast + 1)) / 2;

  return (
    <DrawnFigure
      tone="light"
      caption="Announced milestones across SEBI BRSR Core assurance, the EU CBAM, and India's Carbon Credit Trading Scheme. Everything left of the marker has already taken effect."
      source={complianceSources.join(" · ")}
    >
      <svg viewBox="0 0 960 240" className="w-full" role="img" aria-label="Compliance timeline: most announced obligation dates have already passed.">
        <line x1={X0} y1="150" x2={X1} y2="150" stroke="#e6e1d8" strokeWidth="1.5" />

        {/* The stretch already behind you, drawn as a solid run. */}
        <DrawnPath
          d={`M ${X0} 150 L ${xOf(lastPast)} 150`}
          stroke="#0f3d2e"
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          duration={1200}
        />

        {complianceTimeline.map((e, i) => (
          <DrawnIn key={`${e.regime}-${e.period}-${i}`} delay={500 + i * 90} rise={6}>
            <circle
              cx={xOf(i)}
              cy={150}
              r={e.past ? 7 : 6}
              fill={e.past ? REGIME_COLOR[e.regime] : "#faf8f4"}
              stroke={REGIME_COLOR[e.regime]}
              strokeWidth={2}
            />
            <text
              x={xOf(i)}
              y={i % 2 === 0 ? 124 : 190}
              textAnchor="middle"
              className="fill-pran-ink text-[13px] font-semibold"
            >
              {e.regime}
            </text>
            <text
              x={xOf(i)}
              y={i % 2 === 0 ? 108 : 206}
              textAnchor="middle"
              className="fill-pran-muted text-[11px]"
            >
              {e.period}
            </text>
          </DrawnIn>
        ))}

        <DrawnIn delay={1400}>
          <line x1={todayX} y1="40" x2={todayX} y2="215" stroke="#c97a4a" strokeWidth="2" strokeDasharray="5 4" />
          <text x={todayX} y="30" textAnchor="middle" className="fill-[#c97a4a] text-[12px] font-semibold tracking-[0.14em]">
            TODAY
          </text>
        </DrawnIn>
      </svg>
    </DrawnFigure>
  );
}

/**
 * GOVERNMENT — the shape of the market actually on the rails.
 *
 * Every figure is derived from the live portfolio, so this is the one page
 * where publishing the distribution is the argument: oversight needs to see
 * composition, not a headline total.
 */
export function MarketShape() {
  const sectors = volumeBySector().slice(0, 6);
  const max = Math.max(...sectors.map((s) => s.value));
  const BAR_H = 26;
  const GAP = 16;
  const X0 = 210;
  const X1 = 900;

  return (
    <DrawnFigure
      tone="light"
      caption={`Volume by sector across the ${portfolioStats.projects} projects currently listed, spanning ${portfolioStats.countries} countries and ${portfolioStats.registries} registry standards.`}
      source="PRAN portfolio, derived"
    >
      <svg
        viewBox={`0 0 960 ${sectors.length * (BAR_H + GAP) + 20}`}
        className="w-full"
        role="img"
        aria-label={`Volume by sector: ${sectors.map((s) => `${s.label} ${compact(s.value)} tonnes`).join("; ")}`}
      >
        {sectors.map((s, i) => {
          const y = i * (BAR_H + GAP) + 10;
          const w = Math.max(4, (s.value / max) * (X1 - X0));
          return (
            <g key={s.label}>
              <text x={X0 - 16} y={y + BAR_H / 2 + 5} textAnchor="end" className="fill-pran-ink text-[14px]">
                {s.label}
              </text>
              <rect x={X0} y={y} width={X1 - X0} height={BAR_H} fill="#f5f1ea" rx="4" />
              <DrawnBar
                x={X0}
                y={y}
                height={BAR_H}
                width={w}
                rx="4"
                fill={i === 0 ? "#0f3d2e" : "#16a34a"}
                delay={150 + i * 100}
              />
              <DrawnIn delay={900 + i * 100}>
                <text x={X0 + w + 12} y={y + BAR_H / 2 + 5} className="fill-pran-muted text-[13px] tabular-nums">
                  {compact(s.value)} t
                </text>
              </DrawnIn>
            </g>
          );
        })}
      </svg>
    </DrawnFigure>
  );
}

/**
 * PUBLIC — one decision, drawn to scale.
 *
 * The consumer page needs a number that is personal, real and sourced. Diet is
 * the one lever in the calculator where published averages let us show the
 * spread honestly, so it stands in for "your choices have a measurable size".
 */
export function DietScale() {
  const rows = Object.values(DIET);
  const max = Math.max(...rows.map((r) => r.tCo2ePerYear));
  const X0 = 180;
  const X1 = 780;
  const BAR_H = 34;
  const GAP = 20;

  return (
    <DrawnFigure
      tone="light"
      caption={`One choice, four sizes — tonnes of CO₂e a year. ${DIET_SOURCE.note}`}
      source={`${DIET_SOURCE.source}, ${DIET_SOURCE.year}`}
    >
      <svg
        viewBox={`0 0 860 ${rows.length * (BAR_H + GAP) + 16}`}
        className="w-full"
        role="img"
        aria-label={rows.map((r) => `${r.label}: ${r.tCo2ePerYear} tonnes CO2e per year`).join("; ")}
      >
        {rows.map((r, i) => {
          const y = i * (BAR_H + GAP) + 8;
          const w = (r.tCo2ePerYear / max) * (X1 - X0);
          return (
            <g key={r.label}>
              <text x={X0 - 18} y={y + BAR_H / 2 + 6} textAnchor="end" className="fill-pran-ink text-[15px]">
                {r.label}
              </text>
              <DrawnBar
                x={X0}
                y={y}
                height={BAR_H}
                width={w}
                rx="6"
                fill={i === rows.length - 1 ? "#c97a4a" : "#16a34a"}
                delay={200 + i * 120}
              />
              <DrawnIn delay={950 + i * 120}>
                <text x={X0 + w + 14} y={y + BAR_H / 2 + 6} className="fill-pran-ink text-[15px] font-semibold tabular-nums">
                  {r.tCo2ePerYear}
                </text>
              </DrawnIn>
            </g>
          );
        })}
      </svg>
    </DrawnFigure>
  );
}
