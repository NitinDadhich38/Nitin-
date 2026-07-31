"use client";

import Image from "next/image";
import { Reveal } from "@/components/marketing/reveal";
import { useInViewOnce } from "@/lib/use-in-view-once";
import { useReducedMotion } from "framer-motion";
import { emissionsGap, frictionPoints } from "@/lib/market-data";
import { photos } from "@/lib/images";

/**
 * The problem — the emotional first scroll, told as an argument.
 *
 * Full-bleed cinematic photograph, the argument in large type, a glowing 24 Gt,
 * and the emissions gap drawn on a frosted card: two paths leaving today and
 * diverging to 2030, with the wedge between them shaded. Only published UNEP
 * endpoints are real; the segments are straight (no invented curve). The chart
 * draws itself when scrolled into view.
 */

// ── plot geometry (viewBox 0 0 600 300) ────────────────────────────────────
const X0 = 64;
const X1 = 560;
const Y_TOP = 26;
const Y_BOT = 250;
const V_MAX = 60;
const yOf = (v: number) => Y_BOT - (v / V_MAX) * (Y_BOT - Y_TOP);

const origin = { x: X0, y: yOf(emissionsGap.from.value) };
const [policies, target] = emissionsGap.paths;
const pEnd = { x: X1, y: yOf(policies.to.value) };
const tEnd = { x: X1, y: yOf(target.to.value) };

export function ProblemSection() {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ disabled: !!reduce });
  const on = reduce || inView;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-28 text-white sm:py-36">
      {/* Cinematic photography */}
      <Image
        src={photos.forestMist}
        alt=""
        fill
        sizes="100vw"
        className="hero-pushin object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(85%_75%_at_82%_42%,rgba(217,249,157,.12),transparent_55%),linear-gradient(180deg,rgba(4,12,8,.62),rgba(3,9,6,.92))]"
      />

      <div className="relative mx-auto w-full max-w-content px-6">
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* The argument */}
          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2.6rem,5.6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
                The world already agreed on the number.
                <span className="block text-white/50">
                  It just has no way to reach it.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[50ch] text-lg leading-relaxed text-white/75">
                Everything that can&rsquo;t be cut in time has to be paid to be
                removed somewhere else — and that payment{" "}
                <span className="font-medium text-white">is</span> the carbon
                market. The money exists. The projects exist. What&rsquo;s
                missing is the connection between them.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex items-end gap-5">
                <span
                  className="font-display text-[clamp(6rem,13vw,9.5rem)] font-semibold leading-[0.85] tracking-[-0.045em] tabular-nums text-pran-lime"
                  style={{ textShadow: "0 0 60px rgba(217,249,157,.4)" }}
                >
                  {emissionsGap.gap.value}
                </span>
                <div className="pb-3.5">
                  <div className="text-[15px] text-white/60">
                    Gt CO₂e / year
                  </div>
                  <div className="mt-0.5 font-display text-[15px] font-semibold text-white">
                    the 2030 gap
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* The gap, drawn — frosted card */}
          <Reveal delay={0.1}>
            <div className="rounded-panel border border-white/10 bg-[rgba(8,22,15,.5)] p-8 shadow-float backdrop-blur-md sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-pran-lime">
                Global emissions · {emissionsGap.unit}
              </p>

              <svg
                viewBox="0 0 600 300"
                className="mt-5 w-full"
                role="img"
                aria-label={`Emissions gap: from ${emissionsGap.from.value} gigatonnes today, current policies stay near ${policies.to.value} by 2030 while the 1.5°C pathway falls to ${target.to.value} — a ${emissionsGap.gap.value} gigatonne gap.`}
              >
                <line x1={X0} y1={Y_BOT} x2={X1} y2={Y_BOT} stroke="rgba(255,255,255,0.16)" />
                <text x={X0} y={Y_BOT + 22} textAnchor="start" className="fill-white/45 text-[13px]">
                  {emissionsGap.from.year}
                </text>
                <text x={X1} y={Y_BOT + 22} textAnchor="end" className="fill-white/45 text-[13px]">
                  {policies.to.year}
                </text>

                <defs>
                  <linearGradient id="gapFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d9f99d" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#d9f99d" stopOpacity="0.04" />
                  </linearGradient>
                </defs>

                <path
                  d={`M ${origin.x} ${origin.y} L ${pEnd.x} ${pEnd.y} L ${tEnd.x} ${tEnd.y} Z`}
                  fill="url(#gapFill)"
                  style={{
                    opacity: on ? 1 : 0,
                    transition: reduce ? "none" : "opacity 700ms ease-out 500ms",
                  }}
                />
                <path
                  d={`M ${origin.x} ${origin.y} L ${pEnd.x} ${pEnd.y}`}
                  fill="none"
                  stroke="#f4c9a0"
                  strokeWidth={3}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  style={{
                    strokeDashoffset: on ? 0 : 1,
                    transition: reduce ? "none" : "stroke-dashoffset 1000ms cubic-bezier(.22,.9,.3,1) 100ms",
                  }}
                />
                <path
                  d={`M ${origin.x} ${origin.y} L ${tEnd.x} ${tEnd.y}`}
                  fill="none"
                  stroke="#d9f99d"
                  strokeWidth={3}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  style={{
                    strokeDashoffset: on ? 0 : 1,
                    transition: reduce ? "none" : "stroke-dashoffset 1000ms cubic-bezier(.22,.9,.3,1) 100ms",
                  }}
                />

                {[
                  { pt: pEnd, v: policies.to.value, c: "#f4c9a0", label: policies.label },
                  { pt: tEnd, v: target.to.value, c: "#d9f99d", label: target.label },
                ].map((e) => (
                  <g
                    key={e.label}
                    style={{
                      opacity: on ? 1 : 0,
                      transition: reduce ? "none" : "opacity 500ms ease-out 900ms",
                    }}
                  >
                    <circle cx={e.pt.x} cy={e.pt.y} r={4.5} fill={e.c} />
                    <text x={e.pt.x - 12} y={e.pt.y + 5} textAnchor="end" className="fill-white text-[15px] font-semibold">
                      {e.v}
                    </text>
                  </g>
                ))}

                <circle cx={origin.x} cy={origin.y} r={4.5} fill="#ffffff" />
                <text x={origin.x} y={origin.y - 12} className="fill-white/80 text-[13px]">
                  {emissionsGap.from.value}
                </text>
              </svg>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <Legend color="#f4c9a0" label={policies.label} />
                <Legend color="#d9f99d" label={target.label} />
              </div>
              <p className="mt-4 text-[11px] text-white/40">
                Source: {emissionsGap.source}, {emissionsGap.year}
              </p>
            </div>
          </Reveal>
        </div>

        {/* where it breaks */}
        <Reveal delay={0.1}>
          <div className="mt-16">
            <ol className="grid gap-px overflow-hidden rounded-panel bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {frictionPoints.map((f, i) => (
                <li
                  key={f.stage}
                  className="bg-[rgba(5,14,9,.66)] p-6 transition-colors hover:bg-[rgba(15,61,46,.66)]"
                >
                  <span className="font-display text-sm font-semibold tabular-nums text-pran-lime">
                    0{i + 1}
                  </span>
                  <p className="mt-3 font-display text-h3 font-semibold text-white">
                    {f.stage}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">
                    {f.problem}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] text-white/70">
      <span className="h-0.5 w-5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
