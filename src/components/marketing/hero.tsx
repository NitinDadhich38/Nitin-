"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { photos } from "@/lib/images";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

/**
 * Signature hero (5_Design.md v2.0 §3.2): full-bleed aerial photograph with a
 * white card floating on top, ~80–120px of photo revealed around the edges.
 * No 3D globe (banned). Gentle fade-in only.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative -mt-16 flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-28 sm:px-8">
      {/* Full-bleed photography */}
      <Image
        src={photos.heroAerial}
        alt="Aerial view of dense forest canopy"
        fill
        priority
        sizes="100vw"
        className={cn("object-cover", !reduce && "hero-drift")}
      />
      <div aria-hidden className="photo-overlay absolute inset-0" />

      {/* Floating card */}
      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
        className="relative z-10 w-full max-w-[1080px] rounded-hero bg-pran-surface px-7 py-12 shadow-float sm:px-14 sm:py-16 lg:px-16 lg:py-20"
      >
        <motion.p
          variants={reduce ? undefined : item}
          className="text-xs font-medium uppercase tracking-[0.18em] text-pran-emerald"
        >
          Carbon Market Infrastructure
        </motion.p>
        <motion.h1
          variants={reduce ? undefined : item}
          className="mt-5 max-w-[15ch] font-display text-display-xl font-semibold text-pran-ink"
        >
          India&rsquo;s carbon market, finally connected.
        </motion.h1>
        <motion.p
          variants={reduce ? undefined : item}
          className="mt-6 max-w-[58ch] text-lg leading-relaxed text-pran-muted"
        >
          PRAN is the financial infrastructure layer for the carbon economy —
          a verified marketplace, footprint intelligence, and transparent
          settlement, connecting developers, buyers, and registries in one place.
        </motion.p>
        <motion.div
          variants={reduce ? undefined : item}
          className="mt-9 flex flex-wrap items-center gap-6"
        >
          <Link
            href="/marketplace"
            className={cn(buttonVariants({ size: "lg" }), "group")}
          >
            Explore Marketplace
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/why-carbon-markets"
            className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-pran-ink underline-offset-4 hover:underline"
          >
            Why carbon markets
            <ArrowRight className="h-4 w-4 text-pran-emerald transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
