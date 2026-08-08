import type { ReactNode } from "react";
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
