"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { useInViewOnce } from "@/lib/use-in-view-once";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /**
   * Which edge the content enters from. Default "bottom" is the site-wide
   * rise. "left"/"right" exist for alternating-side sequences (see /about's
   * operating steps) — use them for a deliberate rhythm, not for variety.
   */
  from?: "bottom" | "left" | "right";
};

const OFFSET: Record<NonNullable<RevealProps["from"]>, string> = {
  bottom: "translateY(16px)",
  left: "translateX(-28px)",
  right: "translateX(28px)",
};

/**
 * Scroll-into-view reveal (fade + rise), per 5_Design.md v2.0 §2.5.
 *
 * Two deliberate choices, both about never hiding content by accident:
 *
 * 1. Not framer's `whileInView` — that waits on an IntersectionObserver, so
 *    anywhere IO is unreliable the page stays permanently blank.
 *    `useInViewOnce` guarantees the trigger fires.
 * 2. A plain CSS transition rather than a JS-driven animation. CSS transitions
 *    are handled by the compositor and still complete when requestAnimationFrame
 *    is throttled — background tabs, headless capture, low-power mode. A
 *    JS-animated opacity can strand at 0 in exactly those cases.
 *
 * Respects prefers-reduced-motion: content is shown at once, with no movement.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  style,
  from = "bottom",
}: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ disabled: !!reduce });
  // The server cannot know the visitor's motion preference, so it always
  // renders the hidden state. The first client render must match it exactly
  // (React does not patch attribute differences during hydration), so
  // reduced-motion visitors are revealed in an effect, with no transition.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shown = reduce ? mounted : inView;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : OFFSET[from],
        transition: reduce
          ? "none"
          : `opacity 500ms ease-out ${delay}s, transform 500ms ease-out ${delay}s`,
        willChange: shown ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
