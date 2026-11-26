import type { CSSProperties } from "react";
import { FieldPath } from "@/components/craft/drawn-hero";
import { DrawnFigure, DrawnPath, DrawnIn, DrawnBar } from "@/components/craft/drawn-figure";
import { complianceTimeline, complianceSources } from "@/lib/page-data";
import { volumeBySector, portfolioStats } from "@/lib/marketplace-data";
import { DIET, DIET_SOURCE } from "@/lib/emission-factors";
import { compact } from "@/lib/config";
import { cn } from "@/lib/utils";

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
 * ENTERPRISE — Corporate Statutory Compliance Enforcement Roadmap.
 *
 * Replaces the static SVG line with an authoritative, multi-track regulatory
 * enforcement matrix benchmarked against AlliedOffsets and global legal advisories.
 * Categorized by SEBI BRSR Core, EU CBAM Regulation 2023/956, and India CCTS.
 */
export function ComplianceCalendar() {
  return (
    <div className="w-full space-y-6">
      {/* Telemetry Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-pran-border bg-pran-paper p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <span className="font-bold text-sm">01</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
              SEBI BRSR Core
            </p>
            <p className="text-xs font-bold text-pran-ink">
              Top 250 Active · Expanding to 1,000
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <span className="font-bold text-sm">02</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
              EU CBAM Definitive
            </p>
            <p className="text-xs font-bold text-pran-ink">
              Jan 2026: Financial Liability Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <span className="font-bold text-sm">03</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
              BEE CCTS Framework
            </p>
            <p className="text-xs font-bold text-pran-ink">
              Energy Conservation Caps Binding
            </p>
          </div>
        </div>
      </div>

      {/* Structured Roadmap Matrix */}
      <div className="space-y-3">
        {complianceTimeline.map((item, index) => {
          const isPast = item.past;
          const isCBAM = item.regime === "CBAM";
          const isCCTS = item.regime === "CCTS";

          return (
            <div
              key={`${item.regime}-${item.period}-${index}`}
              className={cn(
                "group relative overflow-hidden rounded-xl border p-4 sm:p-5 transition-all duration-200 hover:shadow-card",
                isPast
                  ? "border-pran-border bg-pran-surface"
                  : "border-amber-300/80 bg-amber-50/40 dark:bg-amber-950/20 shadow-sm",
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider",
                      isCBAM
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : isCCTS
                          ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                    )}
                  >
                    {item.regime}
                  </span>
                  <span className="font-mono text-xs font-semibold text-pran-ink">
                    {item.period}
                  </span>
                  <span className="text-pran-hairline">·</span>
                  <span className="text-xs text-pran-muted font-medium">
                    {item.year}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isPast ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      ENFORCED &amp; ACTIVE AUDIT SCOPE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      MANDATORY STATUTORY EXPANSION
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-display text-base font-bold text-pran-ink">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-pran-muted leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-pran-border flex flex-wrap items-center justify-between gap-2 text-[11px] text-pran-muted">
                <span>
                  <strong>Statutory Action:</strong>{" "}
                  {isCBAM
                    ? "Verify product embedded emissions & surrender CBAM certs"
                    : isCCTS
                      ? "Meet Bureau of Energy Efficiency specific energy consumption caps"
                      : "Obtain independent Reasonable Assurance for Scope 1-2 & offset retirements"}
                </span>
                <span className="font-mono text-[10px] text-pran-muted">
                  {isCBAM
                    ? "EU Reg 2023/956"
                    : isCCTS
                      ? "BEE CCTS Gazette 2023"
                      : "SEBI Circular 2023/122"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg bg-pran-paper-warm p-3 text-[11px] text-pran-muted flex items-center justify-between">
        <span>
          <strong>Source Authorities:</strong> {complianceSources.join(" · ")}
        </span>
        <span className="font-semibold text-pran-emerald">
          Updated for 2025–2026 Fiscal Regimes
        </span>
      </div>
    </div>
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
