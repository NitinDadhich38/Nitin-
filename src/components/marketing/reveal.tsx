"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useInViewOnce } from "@/lib/use-in-view-once";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

/**
 * Scroll-into-view reveal (fade + rise), per 5_Design.md v2.0 §2.5.
 *
 * Deliberately does NOT use framer's `whileInView`: that hides content until an
 * IntersectionObserver fires, so any environment where IO is unreliable leaves
 * the page permanently blank. `useInViewOnce` guarantees the reveal happens.
 * Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  style,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    disabled: !!reduce,
  });

  if (reduce) {
    return (
      <div className={className} style={style as CSSProperties | undefined}>
        {children as ReactNode}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
