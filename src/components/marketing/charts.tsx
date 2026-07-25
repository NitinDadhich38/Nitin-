"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Chart primitives for the portfolio data room (proposals T1–T5).
 *
 * All of them animate on scroll entry via a shared `useDrawOnView` hook that
 * uses a plain IntersectionObserver plus an already-in-view check and a
 * guaranteed end state — the same resilient pattern as Counter, so a chart can
 * never be left empty if the observer misses.
 */

function useDrawOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setShown(true);
      return;
    }
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setShown(true);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) show();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9 && r.bottom > 0) show();
    const t = window.setTimeout(show, 1500); // never leave a chart blank
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [reduce]);

  return { ref, shown, reduce };
}

export type Datum = { label: string; value: number };

function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

/** Horizontal bar chart — the clearest read on a diversified book (T1). */
export function BarChart({
  data,
  max,
  unit = "",
  dark = false,
}: {
  data: Datum[];
  max?: number;
  unit?: string;
  dark?: boolean;
}) {
  const { ref, shown, reduce } = useDrawOnView<HTMLDivElement>();
  const top = max ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {data.map((d, i) => {
        const pct = (d.value / top) * 100;
        return (
          <div
            key={d.label}
            className="grid grid-cols-[minmax(96px,34%)_1fr_auto] items-center gap-3 sm:grid-cols-[minmax(140px,26%)_1fr_auto] sm:gap-4"
          >
            <span
              className={`truncate text-[13px] sm:text-sm ${dark ? "text-white/80" : "text-pran-ink"}`}
              title={d.label}
            >
              {d.label}
            </span>
            <span
              className={`h-2.5 overflow-hidden rounded-full ${dark ? "bg-white/12" : "bg-pran-hairline"}`}
            >
              <span
                className={`block h-full rounded-full ${dark ? "bg-pran-lime" : "bg-pran-emerald"}`}
                style={{
                  width: shown ? `${pct}%` : "0%",
                  transition: reduce
                    ? "none"
                    : `width 900ms cubic-bezier(.22,.9,.3,1) ${i * 55}ms`,
                }}
              />
            </span>
            <span
              className={`min-w-[72px] text-right font-mono text-xs tabular-nums sm:min-w-[86px] sm:text-[13px] ${
                dark ? "text-white/55" : "text-pran-muted"
              }`}
            >
              {fmt(d.value)}
              {unit}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Donut — registry standard spread (T5). */
export function DonutChart({
  data,
  dark = false,
}: {
  data: Datum[];
  dark?: boolean;
}) {
  const { ref, shown, reduce } = useDrawOnView<HTMLDivElement>();
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const palette = dark
    ? ["#D9F99D", "#86EFAC", "#4ADE80", "#22C55E", "#16A34A", "#15803D", "#166534"]
    : ["#16A34A", "#0F3D2E", "#C97A4A", "#5F6B66", "#86C99B", "#3E7A64", "#D9C48A"];

  const R = 56;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-6">
      <svg
        viewBox="0 0 160 160"
        className="h-[150px] w-[150px] shrink-0"
        role="img"
        aria-label="Projects by registry standard"
      >
        {data.map((d, i) => {
          const len = (d.value / total) * C;
          const el = (
            <circle
              key={d.label}
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke={palette[i % palette.length]}
              strokeWidth="22"
              strokeDasharray={`${shown ? len : 0} ${C - (shown ? len : 0)}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 80 80)"
              style={{
                transition: reduce
                  ? "none"
                  : `stroke-dasharray 800ms cubic-bezier(.22,.9,.3,1) ${i * 70}ms`,
              }}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <ul className="flex flex-col gap-2">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2.5 text-sm">
            <span
              aria-hidden
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ background: palette[i % palette.length] }}
            />
            <span className={dark ? "text-white/80" : "text-pran-ink"}>
              {d.label}
            </span>
            <span
              className={`font-mono text-xs tabular-nums ${dark ? "text-white/50" : "text-pran-muted"}`}
            >
              {d.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Stacked proportion bar — one line, whole-book composition (H3).
 * Segments carry an accessible label; hover reveals the share.
 */
export function StackedBar({
  data,
  dark = false,
}: {
  data: Datum[];
  dark?: boolean;
}) {
  const { ref, shown, reduce } = useDrawOnView<HTMLDivElement>();
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const palette = dark
    ? ["#D9F99D", "#86EFAC", "#4ADE80", "#22C55E", "#16A34A", "#15803D"]
    : ["#0F3D2E", "#16A34A", "#5FA97F", "#C97A4A", "#9AB3A8", "#D9C48A"];

  return (
    <div ref={ref}>
      <div
        className={`flex h-3 w-full overflow-hidden rounded-full ${dark ? "bg-white/12" : "bg-pran-hairline"}`}
      >
        {data.map((d, i) => (
          <span
            key={d.label}
            title={`${d.label} — ${((d.value / total) * 100).toFixed(1)}%`}
            className="h-full"
            style={{
              width: shown ? `${(d.value / total) * 100}%` : "0%",
              background: palette[i % palette.length],
              transition: reduce
                ? "none"
                : `width 900ms cubic-bezier(.22,.9,.3,1) ${i * 60}ms`,
            }}
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2 text-xs">
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-sm"
              style={{ background: palette[i % palette.length] }}
            />
            <span className={dark ? "text-white/75" : "text-pran-ink"}>
              {d.label}
            </span>
            <span
              className={`font-mono tabular-nums ${dark ? "text-white/45" : "text-pran-muted"}`}
            >
              {((d.value / total) * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
