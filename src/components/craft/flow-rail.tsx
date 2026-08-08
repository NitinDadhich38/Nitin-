"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { useInViewOnce } from "@/lib/use-in-view-once";
import { cn } from "@/lib/utils";

/**
 * The flow rail (5_Design.md v2.1 §3, technique 6).
 *
 * PRAN's product *is* a sequence — credit leaves a registry, money enters
 * escrow, both settle, a retirement certificate is issued. Every page that
 * touched this used numbered cards, which show the steps but not the movement,
 * and movement is the entire point of escrow.
 *
 * The rail draws itself once, left to right, and the nodes land on it in
 * order. `meta` carries the thing a counterparty actually asks about — how
 * many days, who holds the asset — set above the node where it reads first.
 *
 * Escrow copy is load-bearing: PRAN facilitates and verifies, it never moves
 * credits itself (CLAUDE.md). Keep step wording factual.
 */

export type FlowStep = {
  label: string;
  detail?: ReactNode;
  /** Timing or custody note — surfaced above the node. e.g. "T+2" */
  meta?: string;
  /** Marks the step PRAN performs manually, so the diagram never overclaims. */
  manual?: boolean;
};

export function FlowRail({
  steps,
  tone = "light",
  caption,
  className,
}: {
  steps: FlowStep[];
  tone?: "dark" | "light";
  caption?: ReactNode;
  className?: string;
}) {
  const reduce = !!useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ disabled: reduce });
  const on = reduce || inView;
  const dark = tone === "dark";

  const railBg = dark ? "bg-white/15" : "bg-pran-hairline";
  const railFill = dark ? "bg-pran-lime/70" : "bg-pran-emerald";

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* ── Desktop: horizontal rail ─────────────────────────────────── */}
      <ol
        className="relative hidden gap-8 sm:grid"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}
      >
        {/* The rail sits behind the nodes, inset by half a column each side so
            it starts and ends at a node rather than at the container edge. */}
        <div
          aria-hidden
          className={cn("absolute top-[34px] h-px", railBg)}
          style={{
            left: `calc(${50 / steps.length}%)`,
            right: `calc(${50 / steps.length}%)`,
          }}
        >
          <div
            className={cn("h-full origin-left", railFill)}
            style={{
              transform: on ? "scaleX(1)" : "scaleX(0)",
              transition: reduce
                ? "none"
                : "transform 1100ms cubic-bezier(.22,.9,.3,1) 80ms",
            }}
          />
        </div>

        {steps.map((s, i) => (
          <li key={s.label} className="relative flex flex-col items-center text-center">
            <MetaChip meta={s.meta} dark={dark} on={on} reduce={reduce} delay={i} />
            <Node dark={dark} on={on} reduce={reduce} delay={i} manual={s.manual} />
            <StepText step={s} index={i} dark={dark} on={on} reduce={reduce} centered />
          </li>
        ))}
      </ol>

      {/* ── Mobile: vertical rail ────────────────────────────────────── */}
      <ol className="relative grid gap-7 sm:hidden">
        <div
          aria-hidden
          className={cn("absolute left-[7px] w-px", railBg)}
          style={{ top: 14, bottom: 14 }}
        >
          <div
            className={cn("w-full origin-top", railFill)}
            style={{
              height: "100%",
              transform: on ? "scaleY(1)" : "scaleY(0)",
              transition: reduce
                ? "none"
                : "transform 1100ms cubic-bezier(.22,.9,.3,1) 80ms",
            }}
          />
        </div>

        {steps.map((s, i) => (
          <li key={s.label} className="relative flex gap-4">
            <div className="pt-[6px]">
              <Node dark={dark} on={on} reduce={reduce} delay={i} manual={s.manual} inline />
            </div>
            <div className="min-w-0 flex-1">
              {s.meta && (
                <span
                  className={cn(
                    "font-display text-[11px] font-semibold uppercase tracking-[0.14em]",
                    dark ? "text-pran-lime" : "text-pran-emerald",
                  )}
                >
                  {s.meta}
                </span>
              )}
              <StepText step={s} index={i} dark={dark} on={on} reduce={reduce} />
            </div>
          </li>
        ))}
      </ol>

      {caption && (
        <p
          className={cn(
            "mt-8 text-[13px] leading-relaxed",
            dark ? "text-white/50" : "text-pran-muted",
          )}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

function Node({
  dark,
  on,
  reduce,
  delay,
  manual,
  inline,
}: {
  dark: boolean;
  on: boolean;
  reduce: boolean;
  delay: number;
  manual?: boolean;
  inline?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative z-10 block h-[15px] w-[15px] rounded-full border-2",
        inline ? "" : "mt-[27px]",
        manual
          ? dark
            ? "border-pran-lime bg-pran-ink"
            : "border-pran-emerald bg-pran-paper"
          : dark
            ? "border-pran-lime bg-pran-lime"
            : "border-pran-emerald bg-pran-emerald",
      )}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "scale(1)" : "scale(0.4)",
        transition: reduce
          ? "none"
          : `opacity 320ms ease-out ${240 + delay * 170}ms, transform 320ms cubic-bezier(.22,.9,.3,1) ${240 + delay * 170}ms`,
      }}
    />
  );
}

function MetaChip({
  meta,
  dark,
  on,
  reduce,
  delay,
}: {
  meta?: string;
  dark: boolean;
  on: boolean;
  reduce: boolean;
  delay: number;
}) {
  return (
    <span
      className={cn(
        "block h-[18px] font-display text-[11px] font-semibold uppercase tracking-[0.14em]",
        dark ? "text-pran-lime" : "text-pran-emerald",
      )}
      style={{
        opacity: on && meta ? 1 : 0,
        transition: reduce ? "none" : `opacity 320ms ease-out ${300 + delay * 170}ms`,
      }}
    >
      {meta ?? " "}
    </span>
  );
}

function StepText({
  step,
  index,
  dark,
  on,
  reduce,
  centered,
}: {
  step: FlowStep;
  index: number;
  dark: boolean;
  on: boolean;
  reduce: boolean;
  centered?: boolean;
}) {
  return (
    <div
      className={cn("mt-4", centered && "px-1")}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(8px)",
        transition: reduce
          ? "none"
          : `opacity 420ms ease-out ${330 + index * 170}ms, transform 420ms cubic-bezier(.22,.9,.3,1) ${330 + index * 170}ms`,
      }}
    >
      <p
        className={cn(
          "font-display text-[15px] font-semibold leading-snug",
          dark ? "text-white" : "text-pran-ink",
        )}
      >
        {step.label}
      </p>
      {step.detail && (
        <p
          className={cn(
            "mt-1.5 text-[13px] leading-relaxed",
            dark ? "text-white/55" : "text-pran-muted",
          )}
        >
          {step.detail}
        </p>
      )}
    </div>
  );
}
