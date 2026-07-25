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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // `started` is scoped to this effect run, not a ref. Under StrictMode the
    // effect mounts twice; a ref would stay true from the first run while its
    // timers were already cleaned up, leaving the counter stranded at 0.
    let started = false;
    let raf = 0;
    let settle = 0;
    const start = () => {
      if (started) return;
      started = true;
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
      // rAF is throttled in background tabs and paused when the page isn't
      // compositing, which would strand the number mid-count. Guarantee the
      // final value once the animation window has elapsed.
      settle = window.setTimeout(() => setVal(to), duration * 1000 + 120);
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

    // Belt and braces: an IntersectionObserver that never fires must not be
    // able to leave a stat reading 0. Check on mount, on scroll, and once on
    // a timer — whichever lands first wins, and `start()` is idempotent.
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.95 && r.bottom > 0;
    };
    const onScroll = () => {
      if (inView()) {
        start();
        window.removeEventListener("scroll", onScroll);
      }
    };
    if (inView()) start();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Last resort, unconditional: a number that never arrives is a bug, a
    // number that animated off-screen is not. Correctness beats choreography.
    const fallback = window.setTimeout(start, 2000);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(fallback);
      window.clearTimeout(settle);
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
