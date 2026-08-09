"use client";

import { useReducedMotion } from "framer-motion";
import { useInViewOnce } from "@/lib/use-in-view-once";

/**
 * The is/isn't contrast, made visual — the signature visual for /about
 * (7_Page_Design_Roadmap.md §4, 2.2).
 *
 * This copy was already the sharpest on the site; it was just sitting in a 2×2
 * card grid where the contrast — the entire point — did no work. Here each
 * claim is struck through as it scrolls in, and what PRAN actually is lands
 * beside it. The negation is the design, not a heading above one.
 */

export type Contrast = { not: string; is: string };

export function IsIsNot({ items }: { items: Contrast[] }) {
  const reduce = !!useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ disabled: reduce });
  const on = reduce || inView;

  return (
    <div ref={ref} className="border-t border-pran-hairline">
      {items.map((x, i) => (
        <div
          key={x.not}
          className="grid gap-4 border-b border-pran-hairline py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-12 md:py-10"
        >
          {/* The negation, struck through */}
          <p className="relative inline-block self-start font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight tracking-[-0.02em] text-pran-muted">
            <span className="relative">
              {x.not}
              <span
                aria-hidden
                className="absolute left-0 top-1/2 h-[3px] w-full origin-left rounded-full bg-pran-clay"
                style={{
                  transform: on ? "scaleX(1)" : "scaleX(0)",
                  transition: reduce
                    ? "none"
                    : `transform 620ms cubic-bezier(.22,.9,.3,1) ${180 + i * 160}ms`,
                }}
              />
            </span>
          </p>

          {/* What is true instead */}
          <p
            className="text-[17px] leading-relaxed text-pran-ink"
            style={{
              opacity: on ? 1 : 0,
              transform: on ? "none" : "translateY(10px)",
              transition: reduce
                ? "none"
                : `opacity 520ms ease-out ${420 + i * 160}ms, transform 520ms cubic-bezier(.22,.9,.3,1) ${420 + i * 160}ms`,
            }}
          >
            {x.is}
          </p>
        </div>
      ))}
    </div>
  );
}
