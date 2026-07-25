"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/marketing/reveal";

/** Nodes in the 400×340 coordinate space (SVG stretches to fill via % chips). */
const NODES = [
  { label: "Developers", x: 64, y: 54 },
  { label: "Registries", x: 336, y: 54 },
  { label: "Buyers", x: 362, y: 192 },
  { label: "Government", x: 200, y: 302 },
  { label: "Consultants", x: 38, y: 192 },
] as const;
const CENTER = { x: 200, y: 172 };

/**
 * S3 — The Problem (5_Design.md v2.0 §4.1). Two-column split. Left: section
 * header. Right: five disconnected participants drawn connecting into a central
 * PRAN mark on scroll. Restrained SVG line work — NOT a 3D visualization.
 */
export function ProblemSection() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-content items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left — section header */}
        <div>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
              The problem
            </p>
            <h2 className="mt-4 max-w-[16ch] font-display text-display-l font-semibold text-pran-ink">
              The carbon market is fragmented.
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-pran-muted">
              Developers, registries, buyers, governments, and consultants each
              work in isolation — across incompatible systems, opaque pricing,
              and manual settlement. Value leaks at every handoff.
            </p>
            <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-pran-muted">
              PRAN connects every participant through one intelligent, verifiable
              marketplace — so a credit moves cleanly from project to retirement.
            </p>
          </Reveal>
        </div>

        {/* Right — connect diagram */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto aspect-[4/3.4] w-full max-w-[460px]">
            <svg
              viewBox="0 0 400 340"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              {NODES.map((n, i) => (
                <motion.line
                  key={n.label}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="var(--pran-emerald)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
                  whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                />
              ))}
            </svg>

            {/* Participant chips */}
            {NODES.map((n, i) => (
              <motion.span
                key={n.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-pran-hairline bg-pran-surface px-3.5 py-1.5 text-xs font-medium text-pran-ink shadow-card"
                style={{ left: `${(n.x / 400) * 100}%`, top: `${(n.y / 340) * 100}%` }}
                initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              >
                {n.label}
              </motion.span>
            ))}

            {/* Central PRAN mark */}
            <motion.span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-pran-forest px-5 py-2.5 font-display text-sm font-semibold tracking-tight text-white shadow-float"
              style={{ left: "50%", top: `${(CENTER.y / 340) * 100}%` }}
              initial={reduce ? undefined : { opacity: 0, scale: 0.8 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              PRAN
            </motion.span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
