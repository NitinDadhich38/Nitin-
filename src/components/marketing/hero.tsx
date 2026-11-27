"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { photos } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Hero (5_Design.md v2.0 §3.2) — pure cinematic + kinetic type.
 *
 * No card, no widget: a full-bleed forest photograph with a slow filmic
 * push-in and subtle grain, and a headline that reveals line-by-line from
 * behind a mask, "connected" underlined by a line that draws itself. The
 * opening is carried by photography, typography and restraint. Every entrance
 * is a load animation (see globals.css) — no IntersectionObserver — so nothing
 * can be stranded at opacity:0. 3D globe banned. Respects reduced motion.
 */
export function Hero() {
  return (
    <section className="relative -mt-16 flex min-h-[100svh] items-end overflow-hidden">
      {/* Full-bleed photography, slow push-in */}
      <Image
        src={photos.heroAerial}
        alt="Aerial view of dense forest canopy"
        fill
        priority
        sizes="100vw"
        className="hero-pushin object-cover"
      />
      {/* Cinematic grade + grain */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,14,.55)_0%,rgba(7,23,16,.04)_24%,rgba(5,15,10,.48)_60%,rgba(3,9,6,.94)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(58%_46%_at_14%_96%,rgba(22,163,74,.22),transparent_60%)]"
      />
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-content px-6 pb-24 sm:pb-28">
        <h1 className="max-w-[15ch] font-display text-[clamp(3rem,8vw,6.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
          <span className="hero-line">
            <span className="hero-line-in" style={{ animationDelay: "1.3s" }}>
              Responsibility,
            </span>
          </span>
          <span className="hero-line">
            <span className="hero-line-in" style={{ animationDelay: "1.75s" }}>
              <span className="hero-em text-pran-cream">made plain.</span>
            </span>
          </span>
        </h1>

        <p
          className="hero-rise mt-7 max-w-[52ch] text-[clamp(1.05rem,1.5vw,1.35rem)] leading-relaxed text-white/85"
          style={{ animationDelay: "3.5s" }}
        >
          The financial infrastructure layer for the carbon economy: a verified
          marketplace, footprint intelligence, and transparent settlement,
          connecting every side of the market in one place.
        </p>

        <div
          className="hero-rise mt-10 flex flex-wrap items-center gap-6"
          style={{ animationDelay: "4s" }}
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
            className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-white underline-offset-4 hover:underline"
          >
            Why carbon markets
            <ArrowRight className="h-4 w-4 text-pran-lime transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <span
        aria-hidden
        className="hero-cue absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-2xl text-white/50"
      >
        ↓
      </span>
    </section>
  );
}
