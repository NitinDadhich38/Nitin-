"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Scroll-linked motion for key statements. Calm and slow: words come into
 * focus as the reader scrolls, never snap, never disappear completely
 * (lowest opacity is 0.18, so text is legible even if scripts stall).
 * prefers-reduced-motion: everything renders static and fully visible.
 */

const FLOOR = 0.18;

/**
 * Scroll progress (0 to 1) read straight from the element's position on every
 * scroll frame. `calc(top, height, vh)` returns the raw progress. Reading the
 * live position means it stays right when images load or sections change
 * height, which cached scroll offsets do not.
 */
function useProgress<T extends HTMLElement>(
  ref: React.RefObject<T>,
  calc: (top: number, height: number, vh: number) => number,
) {
  const progress = useMotionValue(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = calc(r.top, r.height, window.innerHeight);
      progress.set(Math.min(1, Math.max(0, Number.isFinite(p) ? p : 0)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return progress;
}

function useCalm() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Before mount we render the static version so SSR and first paint match.
  return { still: !!reduce, mounted };
}

function Word({
  word,
  progress,
  from,
  to,
}: {
  word: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
}) {
  const opacity = useTransform(progress, [from, to], [FLOOR, 1]);
  const y = useTransform(progress, [from, to], ["0.22em", "0em"]);
  const blur = useTransform(progress, [from, to], [5, 0]);
  const filter = useTransform(blur, (b) => (b <= 0.05 ? "none" : `blur(${b}px)`));
  return (
    <motion.span
      className="inline-block will-change-transform"
      style={{ opacity, y, filter }}
    >
      {word}
    </motion.span>
  );
}

function Words({
  text,
  progress,
  span = 0.75,
  start = 0.08,
}: {
  text: string;
  progress: MotionValue<number>;
  span?: number;
  start?: number;
}) {
  const words = text.split(" ");
  const n = words.length;
  const each = span / n;
  return (
    <>
      {words.map((w, i) => {
        const from = start + (span * i) / n;
        const to = Math.min(1, from + each * 2.2);
        return (
          <span key={`${w}-${i}`}>
            <Word word={w} progress={progress} from={from} to={to} />
            {i < n - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

/**
 * Full-screen statement. The section is taller than the screen; the text
 * stays centred while the words come into focus one after another.
 */
export function ScrollStatement(props: { text: string; className?: string }) {
  const { still, mounted } = useCalm();
  if (still || !mounted) {
    return (
      <div className="flex min-h-[70svh] items-center justify-center px-6 py-20">
        <h2 className={props.className}>{props.text}</h2>
      </div>
    );
  }
  return <StatementInner {...props} />;
}

function StatementInner({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useProgress(ref, (top, h, vh) => -top / (h - vh));

  return (
    <div ref={ref} className="relative h-[190svh] md:h-[210svh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className={className} aria-label={text}>
            <span aria-hidden>
              <Words text={text} progress={scrollYProgress} span={0.55} start={0.05} />
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

/** Lighter: words come into focus as the heading itself crosses the screen. */
export function ScrollWords(props: { text: string; className?: string }) {
  const { still, mounted } = useCalm();
  if (still || !mounted) return <h2 className={props.className}>{props.text}</h2>;
  return <WordsInner {...props} />;
}

function WordsInner({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const scrollYProgress = useProgress(ref, (top, h, vh) => (0.9 * vh - top) / (0.4 * vh + h));
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        <Words text={text} progress={scrollYProgress} span={0.6} start={0} />
      </span>
    </h2>
  );
}

/** A block that eases into focus as it reaches the middle of the screen. */
export function ScrollFocus(props: { children: ReactNode; className?: string }) {
  const { still, mounted } = useCalm();
  if (still || !mounted) return <div className={props.className}>{props.children}</div>;
  return <FocusInner {...props} />;
}

function FocusInner({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useProgress(ref, (top, _h, vh) => (0.92 * vh - top) / (0.42 * vh));
  const opacity = useTransform(scrollYProgress, [0, 1], [0.22, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);
  return (
    <motion.div ref={ref} className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

/** Opening text drifts up and softens as the reader leaves the hero. */
export function ScrollFade(props: { children: ReactNode; className?: string }) {
  const { still, mounted } = useCalm();
  if (still || !mounted) return <div className={props.className}>{props.children}</div>;
  return <FadeInner {...props} />;
}

function FadeInner({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useProgress(ref, (top, h, vh) => (0.5 * vh - top) / (0.45 * vh + h));
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -48]);
  return (
    <motion.div ref={ref} className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
