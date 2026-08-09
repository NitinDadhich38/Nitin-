"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Read-depth bar for long explainers.
 *
 * Distinct from shared/ScrollProgress, which is absolutely positioned inside
 * the header. This one is fixed to the viewport just under the header, because
 * on a 60-term glossary the useful question is "how much is left" at any point,
 * not only while the header happens to be in view.
 */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setPct(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-16 z-40 h-0.5"
    >
      <div
        className="h-full bg-pran-emerald transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
