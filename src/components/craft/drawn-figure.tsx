"use client";

import { createContext, useContext } from "react";
import type { ReactNode, SVGProps } from "react";
import { useReducedMotion } from "framer-motion";
import { useInViewOnce } from "@/lib/use-in-view-once";
import { cn } from "@/lib/utils";

/**
 * Scroll-drawn figure scaffolding — the workhorse of PRAN's diagram-forward
 * interior pages (5_Design.md v2.1 §3, technique 4).
 *
 * Every interior page carries one bespoke drawing that states its argument
 * before the prose does. Those drawings are hand-built SVG, not chart-library
 * output, because PRAN only ever plots real endpoints and a library will
 * happily interpolate a curve nobody published.
 *
 * This file supplies the three things every one of them needs, so a page
 * author writes geometry and nothing else:
 *
 *   DrawnFigure  in-view trigger + reduced-motion + the source line
 *   DrawnPath    a stroke that draws itself
 *   DrawnIn      a group that fades in on cue
 *
 * Draw state travels by CONTEXT, not a render prop. Interior pages are server
 * components (they export `metadata`), and a function child cannot cross the
 * server/client boundary — React rejects it outright. Context means the page
 * passes ordinary JSX, which serialises fine, and no page has to thread
 * `on`/`reduce` through every element by hand.
 *
 * The source line is not optional decoration. CLAUDE.md forbids invented
 * figures, so a drawing that plots numbers must say where they came from.
 */

/** Shared easing — matches the homepage emissions-gap draw. */
const EASE = "cubic-bezier(.22,.9,.3,1)";

export type DrawState = {
  /** True once the figure should be in its final, drawn state. */
  on: boolean;
  /** True when the visitor asked for reduced motion — skip transitions. */
  reduce: boolean;
};

/**
 * Defaults to fully drawn. A DrawnPath rendered outside a DrawnFigure shows
 * its line rather than vanishing — same discipline as `useInViewOnce`, where
 * a missed trigger must never degrade to an invisible page.
 */
const DrawContext = createContext<DrawState>({ on: true, reduce: true });

export function useDraw(): DrawState {
  return useContext(DrawContext);
}

export function DrawnFigure({
  children,
  caption,
  source,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  caption?: ReactNode;
  /** Publisher + year. Required whenever the drawing plots real numbers. */
  source?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const reduce = !!useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLElement>({ disabled: reduce });
  const on = reduce || inView;
  const dark = tone === "dark";

  return (
    <figure ref={ref} className={cn("relative m-0", className)}>
      <DrawContext.Provider value={{ on, reduce }}>
        {children}
      </DrawContext.Provider>
      {(caption || source) && (
        <figcaption className="mt-4">
          {caption && (
            <div
              className={cn(
                "text-[13px] leading-relaxed",
                dark ? "text-white/70" : "text-pran-muted",
              )}
            >
              {caption}
            </div>
          )}
          {source && (
            <div
              className={cn(
                "mt-1.5 text-[11px]",
                dark ? "text-white/40" : "text-pran-muted/70",
              )}
            >
              Source: {source}
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * A path that draws itself when the surrounding figure comes into view.
 *
 * `pathLength={1}` normalises the geometry so one dash covers the whole line
 * regardless of its real length — the same trick the homepage chart uses, which
 * means timings stay identical whether the path is 40px or 4000px.
 */
export function DrawnPath({
  delay = 0,
  duration = 1000,
  style,
  ...rest
}: {
  /** ms */
  delay?: number;
  /** ms */
  duration?: number;
} & SVGProps<SVGPathElement>) {
  const { on, reduce } = useDraw();
  return (
    <path
      {...rest}
      pathLength={1}
      strokeDasharray={1}
      style={{
        ...style,
        strokeDashoffset: on ? 0 : 1,
        transition: reduce
          ? "none"
          : `stroke-dashoffset ${duration}ms ${EASE} ${delay}ms`,
      }}
    />
  );
}

/**
 * A bar that grows from its left edge.
 *
 * Deliberately a CSS transform rather than SMIL `<animate>`: SMIL has no
 * concept of `prefers-reduced-motion`, so an animated bar would keep moving
 * for a visitor who asked everything to stop. Scaling also stays on the
 * compositor, where animating `width` would not.
 *
 * `x` is passed separately from the transform origin so the bar grows out of
 * its own baseline rather than the viewBox origin.
 */
export function DrawnBar({
  x,
  y,
  width,
  height,
  delay = 0,
  duration = 900,
  style,
  ...rest
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  /** ms */
  delay?: number;
  /** ms */
  duration?: number;
} & Omit<SVGProps<SVGRectElement>, "x" | "y" | "width" | "height">) {
  const { on, reduce } = useDraw();
  return (
    <rect
      {...rest}
      x={x}
      y={y}
      width={width}
      height={height}
      style={{
        ...style,
        transformOrigin: `${x}px ${y + height / 2}px`,
        transform: on ? "scaleX(1)" : "scaleX(0)",
        transition: reduce ? "none" : `transform ${duration}ms ${EASE} ${delay}ms`,
      }}
    />
  );
}

/**
 * A group that fades in on cue — for the labels, dots and fills that should
 * land *after* their line has finished drawing.
 */
export function DrawnIn({
  delay = 0,
  duration = 500,
  rise = 0,
  style,
  children,
  ...rest
}: {
  /** ms */
  delay?: number;
  /** ms */
  duration?: number;
  /** Optional upward drift in user units, for labels that should settle. */
  rise?: number;
  children: ReactNode;
} & SVGProps<SVGGElement>) {
  const { on, reduce } = useDraw();
  return (
    <g
      {...rest}
      style={{
        ...style,
        opacity: on ? 1 : 0,
        transform: on || !rise ? undefined : `translateY(${rise}px)`,
        transition: reduce
          ? "none"
          : `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
      }}
    >
      {children}
    </g>
  );
}
