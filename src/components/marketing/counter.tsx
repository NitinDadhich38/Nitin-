"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Counts up to `to` when scrolled into view (5_Design.md v2.0 §2.5).
 * Uses a plain IntersectionObserver with a start-on-mount-if-visible fallback
 * and a guaranteed final value, so it never sticks at the initial 0.
 */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.2,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const start = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setVal(to);
        return;
      }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / (duration * 1000), 1);
        setVal(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setVal(to);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            start();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    // Already in the viewport at mount? Start immediately.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) start();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, reduce, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}
