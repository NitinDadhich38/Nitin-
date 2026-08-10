import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Mode-shift section wrapper (5_Design.md v2.1 §3, technique 5).
 *
 * The homepage works partly because scrolling it feels like walking from room
 * to room — cinematic dark, then paper, then forest. Interior pages lost that
 * because every section was the same paper card grid, so a whole page read as
 * one long room.
 *
 * ModeBand makes the register an explicit choice per section instead of an
 * accident. Alternate deliberately; never run three of the same mode in a row.
 */

export type Mode = "cinematic" | "forest" | "data" | "warm";

const MODE: Record<Mode, string> = {
  /** Near-black with a green cast. Statements, opening arguments, big figures. */
  cinematic: "bg-pran-ink text-white",
  /** Deep forest. Conclusions, CTAs, anything that should feel institutional. */
  forest: "bg-pran-forest text-white",
  /** Warm paper. The default working surface — data, prose, tables. */
  data: "bg-pran-paper text-pran-ink",
  /** Warmer paper. For alternating two light sections without a hard edge. */
  warm: "bg-pran-paper-warm text-pran-ink",
};

const SIZE = {
  sm: "py-14 sm:py-16",
  md: "py-20 sm:py-24",
  lg: "py-24 sm:py-32",
  xl: "py-32 sm:py-40",
} as const;

export function ModeBand({
  mode = "data",
  size = "lg",
  bleed = false,
  id,
  className,
  children,
}: {
  mode?: Mode;
  size?: keyof typeof SIZE;
  /** Skip the centred container — the section manages its own full-bleed layout. */
  bleed?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden", MODE[mode], SIZE[size], className)}
    >
      {bleed ? children : (
        <div className="relative mx-auto w-full max-w-content px-6">{children}</div>
      )}
    </section>
  );
}

/**
 * The quiet page opener — DrawnHero's counterpart for documents.
 *
 * Legal pages, policies and anything a reader may need to cite get this
 * instead of a drawn hero. A cinematic opening on a Terms of Service page
 * reads as marketing over a contract, which is the one register those pages
 * must never have. Typography and a hairline; nothing else.
 */
export function DocHeader({
  eyebrow,
  title,
  sub,
  meta,
  image,
}: {
  eyebrow?: string;
  title: string;
  sub?: ReactNode;
  /** e.g. "Last updated July 2026" */
  meta?: string;
  /**
   * Optional photograph behind the headline (founder direction 2026-08-09,
   * "background images on all the pages").
   *
   * The original DocHeader was deliberately quiet — a cinematic opener on a
   * Terms page reads as marketing printed over a contract. The photo version
   * keeps that restraint: it is SHORTER than a page hero and carries a heavier
   * scrim than the marketing heroes do, so it reads as a letterhead rather
   * than a campaign. The legal WORDING below it is untouched either way.
   */
  image?: string;
}) {
  if (image) {
    return (
      <header className="relative -mx-6 mb-10 overflow-hidden bg-pran-forest sm:-mx-8">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,15,10,.62),rgba(6,15,10,.80))]"
        />
        <div className="relative z-10 px-6 pb-12 pt-16 sm:px-8">
          {eyebrow && (
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-pran-lime">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
            {title}
          </h1>
          {sub && (
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-white/75">
              {sub}
            </p>
          )}
          {meta && <p className="mt-6 text-[13px] text-white/60">{meta}</p>}
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-pran-hairline pb-10 pt-16">
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-pran-emerald">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-pran-ink">
        {title}
      </h1>
      {sub && (
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-pran-muted">
          {sub}
        </p>
      )}
      {meta && (
        <p className="mt-6 text-[13px] text-pran-muted">{meta}</p>
      )}
    </header>
  );
}

/**
 * Section opener sized for interior pages.
 *
 * Deliberately narrower than the homepage display type: an interior headline
 * competes with its own diagram, so it states and gets out of the way.
 */
export function BandHeader({
  eyebrow,
  title,
  sub,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const dark = tone === "dark";
  const centered = align === "center";
  return (
    <div className={cn(centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-medium uppercase tracking-[0.14em]",
            dark ? "text-pran-lime" : "text-pran-emerald",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-4 font-display text-h2 font-semibold tracking-[-0.02em]",
          centered ? "mx-auto max-w-[24ch]" : "max-w-[22ch]",
          dark ? "text-white" : "text-pran-ink",
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            centered ? "mx-auto max-w-[58ch]" : "max-w-[58ch]",
            dark ? "text-white/70" : "text-pran-muted",
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
