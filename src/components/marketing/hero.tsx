"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Globe = dynamic(() => import("@/components/marketing/globe"), {
  ssr: false,
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative -mt-16 flex min-h-[100svh] items-center justify-center overflow-hidden bg-pran-ink text-white">
      {/* Aurora glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[85vmin] w-[85vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,160,133,0.22),transparent_62%)] blur-2xl" />
        <div className="absolute bottom-0 left-0 h-[40vmin] w-[40vmin] rounded-full bg-[radial-gradient(circle,rgba(15,42,67,0.5),transparent_60%)] blur-3xl" />
      </div>

      {/* 3D globe */}
      {!reduce && (
        <div className="absolute inset-0 opacity-90">
          <Globe />
        </div>
      )}

      {/* Vignette so text stays legible over the globe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,10,10,0.85))]"
      />

      {/* Content */}
      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <motion.p
          variants={reduce ? undefined : item}
          className="font-mono text-xs uppercase tracking-[0.3em] text-pran-teal-lit"
        >
          Carbon Intelligence Infrastructure
        </motion.p>
        <motion.h1
          variants={reduce ? undefined : item}
          className="mt-6 font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.03] tracking-tight"
        >
          The financial infrastructure
          <br className="hidden sm:block" /> for the carbon market.
        </motion.h1>
        <motion.p
          variants={reduce ? undefined : item}
          className="mx-auto mt-6 max-w-xl text-lg text-white/70"
        >
          A verified marketplace, footprint intelligence, and transparent
          markets — trusted infrastructure for the world&rsquo;s carbon economy.
        </motion.p>
        <motion.div
          variants={reduce ? undefined : item}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/marketplace"
            className={cn(buttonVariants({ size: "lg" }), "group")}
          >
            Explore Marketplace
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-btn border border-white/25 px-7 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            Request Demo
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/40">
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
}
