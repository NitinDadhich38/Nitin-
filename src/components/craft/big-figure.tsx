import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The statement number (5_Design.md v2.1 §3, technique 3).
 *
 * Extracted from the homepage's glowing "24 Gt" — the move that makes an
 * argument physical before it is read. One per page, at most. The moment a
 * second one appears on a screen they stop being statements and become a
 * stat row, which is a different (and much weaker) component.
 *
 * The glow only exists in dark modes; on paper it reads as a smudge, so the
 * light variant carries its weight through size and an emerald unit instead.
 */
export function BigFigure({
  value,
  unit,
  caption,
  source,
  tone = "dark",
  size = "lg",
  className,
}: {
  /** The number itself. Pre-formatted — this component never does maths. */
  value: ReactNode;
  /** Units, set small beside the figure. e.g. "Gt CO₂e / year" */
  unit?: ReactNode;
  /** What the number means, in a few words. */
  caption?: ReactNode;
  /** Publisher + year, required whenever the figure is a real-world statistic. */
  source?: string;
  tone?: "dark" | "light";
  size?: "md" | "lg";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-end gap-5">
        <span
          className={cn(
            "font-display font-semibold leading-[0.85] tracking-[-0.045em] tabular-nums",
            size === "lg"
              ? "text-[clamp(5rem,13vw,9.5rem)]"
              : "text-[clamp(3.5rem,8vw,6rem)]",
            dark ? "text-pran-lime" : "text-pran-forest",
          )}
          style={
            dark ? { textShadow: "0 0 60px rgba(217,249,157,.4)" } : undefined
          }
        >
          {value}
        </span>
        {(unit || caption) && (
          <div className="pb-3.5">
            {unit && (
              <div
                className={cn(
                  "text-[15px]",
                  dark ? "text-white/60" : "text-pran-emerald",
                )}
              >
                {unit}
              </div>
            )}
            {caption && (
              <div
                className={cn(
                  "mt-0.5 max-w-[22ch] font-display text-[15px] font-semibold",
                  dark ? "text-white" : "text-pran-ink",
                )}
              >
                {caption}
              </div>
            )}
          </div>
        )}
      </div>
      {source && (
        <p
          className={cn(
            "mt-4 text-[11px]",
            dark ? "text-white/40" : "text-pran-muted/70",
          )}
        >
          Source: {source}
        </p>
      )}
    </div>
  );
}
