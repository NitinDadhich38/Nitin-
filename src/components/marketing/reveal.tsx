"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { useInViewOnce } from "@/lib/use-in-view-once";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
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
 * Respects prefers-reduced-motion by rendering the content plainly.
 */
export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ disabled: !!reduce });

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: `opacity 500ms ease-out ${delay}s, transform 500ms ease-out ${delay}s`,
        willChange: inView ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
