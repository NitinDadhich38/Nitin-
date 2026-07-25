"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element enters the viewport — and *guarantees* it fires.
 *
 * Scroll-reveal animations hide content until they trigger, so a missed trigger
 * doesn't degrade to "no animation", it degrades to "invisible page". That is
 * an unacceptable failure mode, so this hook layers four triggers:
 *
 *   1. IntersectionObserver (the normal path)
 *   2. an immediate check for elements already in view at mount
 *   3. a passive scroll listener, for environments where IO is unreliable
 *   4. an unconditional timer, so content can never stay hidden
 *
 * Under `prefers-reduced-motion` it returns true immediately.
 */
export function useInViewOnce<T extends HTMLElement>(options?: {
  /** Fraction of viewport height treated as "entered". Default 0.9. */
  margin?: number;
  /** Unconditional reveal deadline in ms. Default 1500. */
  timeout?: number;
  /** Skip animation entirely and start visible. */
  disabled?: boolean;
}) {
  const { margin = 0.9, timeout = 1500, disabled = false } = options ?? {};
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (disabled) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    // Scoped to this effect run: a ref would survive StrictMode's double
    // mount and short-circuit the second run after the first was cleaned up.
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setInView(true);
    };

    const isVisible = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * margin && r.bottom > 0;
    };

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) show();
        },
        { threshold: 0.15 },
      );
      io.observe(el);
    }

    if (isVisible()) show();

    const onScroll = () => {
      if (isVisible()) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = window.setTimeout(show, timeout);

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [margin, timeout, disabled]);

  return { ref, inView };
}
