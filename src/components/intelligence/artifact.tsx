import type { CSSProperties } from "react";
import { FieldPath } from "@/components/craft/drawn-hero";
import { cn } from "@/lib/utils";

/**
 * The deliverable, shown as a structure (7_Page_Design_Roadmap.md §4, 1.6).
 *
 * The most persuasive thing a services page can do is show what you actually
 * receive. But none of the four Carbon Intelligence services is live (founder
 * decision, 2026-08-08), so rendering a finished, populated report would be a
 * fabrication — exactly what CLAUDE.md forbids.
 *
 * The honest version: show the SHAPE. Real section names, real framework
 * structure, and skeleton rules where the content will go, with the build
 * stage stated on the sheet itself. A visitor learns precisely what is being
 * built and cannot mistake it for something we already ship.
 */

export type ArtifactSpec = {
  /** What the document is called. */
  docTitle: string;
  /** The framework or standard it maps to. */
  standard: string;
  /** Real section names — these are the substance of the preview. */
  sections: string[];
  /** How many skeleton rules sit under each section. */
  density?: number;
};

export function DocumentMock({
  spec,
  stageLabel,
  className,
}: {
  spec: ArtifactSpec;
  stageLabel: string;
  className?: string;
}) {
  const density = spec.density ?? 3;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card bg-pran-surface shadow-float",
        className,
      )}
    >
      {/* Sheet header */}
      <div className="flex items-start justify-between gap-6 border-b border-pran-hairline px-7 py-5">
        <div className="min-w-0">
          <p className="font-display text-[15px] font-semibold leading-snug text-pran-ink">
            {spec.docTitle}
          </p>
          <p className="mt-1 text-[12px] text-pran-muted">{spec.standard}</p>
        </div>
        <span className="shrink-0 rounded-full bg-pran-clay/12 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-pran-clay">
          {stageLabel}
        </span>
      </div>

      {/* Section skeleton — real names, empty bodies */}
      <div className="px-7 py-6">
        {spec.sections.map((s, i) => (
          <div key={s} className={cn(i > 0 && "mt-6")}>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[12px] font-semibold tabular-nums text-pran-emerald">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[14px] font-semibold text-pran-ink">
                {s}
              </span>
            </div>
            <div className="mt-2.5 space-y-1.5 pl-7">
              {Array.from({ length: density }, (_, r) => (
                <div
                  key={r}
                  className="h-[6px] rounded-full bg-pran-hairline"
                  style={{ width: `${94 - r * 17 - (i % 2) * 8}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-pran-hairline bg-pran-paper-warm px-7 py-3.5">
        <p className="text-[11px] leading-relaxed text-pran-muted">
          Section structure only. Content is generated from your data once the
          service is live.
        </p>
      </div>
    </div>
  );
}

/** Real document structures per service. Framework section names are factual. */
export const artifacts: Record<string, ArtifactSpec> = {
  procurement: {
    docTitle: "Procurement recommendation",
    standard: "Reduce-first, then residual",
    sections: [
      "Emission profile summary",
      "Ranked reduction levers",
      "Residual emissions after reductions",
      "Matched project types and registries",
      "Indicative budget and procurement route",
    ],
  },
  esg: {
    docTitle: "ESG disclosure",
    standard: "Mapped to BRSR · GRI · SDG",
    sections: [
      "Organisational profile",
      "Governance and policy",
      "Environmental performance",
      "Social and workforce",
      "Framework mapping index",
    ],
  },
  brsr: {
    docTitle: "Business Responsibility & Sustainability Report",
    standard: "SEBI BRSR — nine principles",
    sections: [
      "Section A — General disclosures",
      "Section B — Management and process",
      "Section C — Principle-wise performance",
      "BRSR Core attributes",
    ],
    density: 4,
  },
  cbam: {
    docTitle: "Embedded emissions report",
    standard: "EU CBAM structure",
    sections: [
      "Installation and production data",
      "Direct embedded emissions",
      "Indirect embedded emissions",
      "Product-level intensity",
      "Methodology and data trail",
    ],
  },
};

/** Hero field for the Intelligence pages — four sheets, stacked and squared. */
export function SheetField() {
  const sheets = [
    { x: 700, y: 150, w: 300, h: 400 },
    { x: 780, y: 190, w: 300, h: 400 },
    { x: 860, y: 230, w: 300, h: 400 },
    { x: 940, y: 270, w: 300, h: 400 },
  ];
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="sf-glow" cx="66%" cy="48%" r="56%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#sf-glow)" />

      {sheets.map((s, i) => (
        <g key={i}>
          <FieldPath
            d={`M ${s.x} ${s.y} L ${s.x + s.w} ${s.y} L ${s.x + s.w} ${s.y + s.h} L ${s.x} ${s.y + s.h} Z`}
            stroke="#d9f99d"
            strokeOpacity={0.2 + i * 0.12}
            strokeWidth="1.5"
            delay={0.4 + i * 0.18}
          />
          {Array.from({ length: 7 }, (_, r) => (
            <line
              key={r}
              x1={s.x + 28}
              y1={s.y + 60 + r * 42}
              x2={s.x + s.w - 28 - (r % 3) * 40}
              y2={s.y + 60 + r * 42}
              stroke="#ffffff"
              strokeWidth="2"
              className="field-in"
              style={
                {
                  "--field-opacity": `${0.05 + i * 0.03}`,
                  animationDelay: `${1 + i * 0.16 + r * 0.04}s`,
                } as CSSProperties
              }
            />
          ))}
        </g>
      ))}

      {Array.from({ length: 9 }, (_, i) => 60 + i * 74).map((x, i) => (
        <line
          key={x} x1={x} y1="120" x2={x} y2="660"
          stroke="#ffffff" strokeWidth="1"
          className="field-in"
          style={{ "--field-opacity": "0.04", animationDelay: `${0.2 + i * 0.04}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}
