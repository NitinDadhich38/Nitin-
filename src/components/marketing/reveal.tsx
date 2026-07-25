"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

/** Scroll-into-view reveal (fade + rise). Respects prefers-reduced-motion. */
export function Reveal({ children, delay = 0, className, style, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style as CSSProperties | undefined}>
        {children as ReactNode}
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
