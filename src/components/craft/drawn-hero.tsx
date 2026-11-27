import type { CSSProperties, ReactNode, SVGProps } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The interior-page hero (5_Design.md v2.1 §3, techniques 1 + 2).
 *
 * Replaces PageHeader, which was a flat forest rectangle with a heading in it —
 * the same rectangle on fourteen pages, so no page had an opening of its own.
 *
 * The homepage earns its photograph: it is the one cinematic moment, the way
 * in. Everything past it is the instrument panel, so an interior page opens on
 * a *drawing* instead — a field of geometry specific to that page's argument,
 * behind the same masked line-by-line headline the homepage uses. Shared
 * kinetics, different substance.
 *
 * Timing is deliberately brisker than the homepage (which paces against a 30s
 * push-in). Someone landing on an interior page came for the content.
 */

/** Emphasis word — reuses the homepage's self-drawing underline. */
export function Em({ children }: { children: ReactNode }) {
  return <span className="hero-em text-pran-cream">{children}</span>;
}

/**
 * A stroke inside a hero field that draws itself on load.
 *
 * ALWAYS use this rather than a bare `<path className="field-draw">`. The CSS
 * sets `stroke-dasharray: 1`, which only means "one dash spanning the whole
 * path" once `pathLength` normalises the geometry — without it, 1 is one
 * user unit and the line renders as a 1px dotted rule that never appears to
 * draw. An attribute can't be set from a class, so it lives here.
 */
export function FieldPath({
  delay = 0,
  className,
  style,
  ...rest
}: {
  /** seconds */
  delay?: number;
} & SVGProps<SVGPathElement>) {
  return (
    <path
      {...rest}
      pathLength={1}
      fill="none"
      className={cn("field-draw", className)}
      style={{ ...style, animationDelay: `${delay}s` }}
    />
  );
}

export function DrawnHero({
  eyebrow,
  lines,
  sub,
  actions,
  aside,
  field,
  mode = "cinematic",
  image,
  underChrome = true,
  className,
}: {
  eyebrow?: string;
  /** One entry per rendered line — each reveals from behind its own mask. */
  lines: ReactNode[];
  sub?: ReactNode;
  actions?: ReactNode;
  /** Optional right-hand slot — a ledger, a figure, a live count. */
  aside?: ReactNode;
  /** The page's bespoke drawing. Falls back to the market grid. */
  field?: ReactNode;
  mode?: "cinematic" | "forest";
  /**
   * Optional full-bleed photograph behind the drawing (founder direction,
   * 2026-08-09 — this reverses the Wave 0 "no photography on interior pages"
   * rule). The drawn field still renders on top, so the page keeps its
   * signature; the photo supplies depth the flat ink panel never had.
   * Prefer a self-hosted path from lib/images.ts `pageImages`.
   */
  image?: string;
  /**
   * Slide up under the fixed header, so the drawing runs behind it — the
   * homepage hero does the same. Set false on chrome-free pages (SiteChrome
   * skips the pt-16 wrapper there, so the offset would clip the field).
   */
  underChrome?: boolean;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative flex min-h-[68svh] items-end overflow-hidden",
        underChrome && "-mt-16 pt-16",
        mode === "forest" ? "bg-pran-forest" : "bg-pran-ink",
        className,
      )}
    >
      {/* PHOTOGRAPH WINS WHEN THERE IS ONE (founder direction 2026-08-09).
          The drawn field and the photo used to stack: lines over an image at
          45% behind a heavy scrim, which read as a muddy filter with scratches
          on it. Now it is one or the other — a real photograph, or the drawing
          on pages that have no photograph yet. Do not re-stack them. */}
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
      ) : (
        <div aria-hidden className="absolute inset-0">
          {field ?? <MarketField />}
        </div>
      )}

      {/* Grade — the only job is keeping type legible. Over a photograph it is
          a bottom-weighted wash so the image stays readable at the top; over a
          drawing it can be heavier because there is no detail to lose. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          image
            ? "bg-[linear-gradient(180deg,rgba(6,15,10,.34)_0%,rgba(6,15,10,.12)_42%,rgba(6,15,10,.78)_100%)]"
            : "bg-[linear-gradient(180deg,rgba(6,15,10,.72)_0%,rgba(6,15,10,.28)_38%,rgba(6,15,10,.88)_100%)]",
        )}
      />
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-content px-6 py-16 sm:py-20">
        <div
          className={cn(
            "gap-12",
            aside ? "grid lg:grid-cols-[1.35fr_1fr] lg:items-end" : "",
          )}
        >
          <div>
            {eyebrow && (
              <p
                className="hero-rise text-xs font-medium uppercase tracking-[0.14em] text-white/80"
                style={{ animationDelay: "0.1s" }}
              >
                {eyebrow}
              </p>
            )}

            <h1
              className="mt-5 max-w-[17ch] font-display text-[clamp(2.4rem,5.6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white"
              style={{ "--em-delay": "1.15s" } as CSSProperties}
            >
              {lines.map((line, i) => (
                <span key={i} className="hero-line">
                  <span
                    className="hero-line-in"
                    style={{ animationDelay: `${0.22 + i * 0.14}s` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            {sub && (
              <p
                className="hero-rise mt-6 max-w-[54ch] text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed text-white/75"
                style={{ animationDelay: `${0.5 + lines.length * 0.14}s` }}
              >
                {sub}
              </p>
            )}

            {actions && (
              <div
                className="hero-rise mt-9 flex flex-wrap items-center gap-5"
                style={{ animationDelay: `${0.68 + lines.length * 0.14}s` }}
              >
                {actions}
              </div>
            )}
          </div>

          {aside && (
            <div
              className="hero-rise"
              style={{ animationDelay: `${0.8 + lines.length * 0.14}s` }}
            >
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Default field ────────────────────────────────────────────────────────
   A market grid with a participant network drawn over it: five outer nodes
   connecting inward to one point. That *is* PRAN's thesis — the money and the
   projects both exist, what was missing is the connection — so the generic
   field still argues something. Pages with a sharper argument override it. */

const RULES = [96, 200, 304, 408, 512, 616, 720];
const TICKS = Array.from({ length: 15 }, (_, i) => 90 + i * 90);
const HUB = { x: 1044, y: 384 };
const SPOKES = [
  { x: 754, y: 188 },
  { x: 1292, y: 246 },
  { x: 858, y: 566 },
  { x: 1296, y: 548 },
  { x: 612, y: 402 },
];

export function MarketField() {
  return (
    <svg
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="mf-glow" cx="72%" cy="50%" r="52%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="760" fill="url(#mf-glow)" />

      {RULES.map((y, i) => (
        <line
          key={`r${y}`}
          x1="0"
          y1={y}
          x2="1440"
          y2={y}
          stroke="#ffffff"
          strokeWidth="1"
          className="field-in"
          style={
            {
              "--field-opacity": "0.07",
              animationDelay: `${0.1 + i * 0.05}s`,
            } as CSSProperties
          }
        />
      ))}

      {TICKS.map((x, i) => (
        <line
          key={`t${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="760"
          stroke="#ffffff"
          strokeWidth="1"
          className="field-in"
          style={
            {
              "--field-opacity": "0.04",
              animationDelay: `${0.2 + i * 0.03}s`,
            } as CSSProperties
          }
        />
      ))}

      {SPOKES.map((s, i) => (
        <FieldPath
          key={`s${i}`}
          d={`M ${s.x} ${s.y} L ${HUB.x} ${HUB.y}`}
          stroke="#d9f99d"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          delay={0.55 + i * 0.13}
        />
      ))}

      {SPOKES.map((s, i) => (
        <circle
          key={`n${i}`}
          cx={s.x}
          cy={s.y}
          r="4.5"
          fill="#d9f99d"
          className="field-in"
          style={
            {
              "--field-opacity": "0.85",
              animationDelay: `${1.5 + i * 0.13}s`,
            } as CSSProperties
          }
        />
      ))}

      <circle
        cx={HUB.x}
        cy={HUB.y}
        r="9"
        fill="#d9f99d"
        className="field-in"
        style={{ "--field-opacity": "1", animationDelay: "2.1s" } as CSSProperties}
      />
      <circle
        cx={HUB.x}
        cy={HUB.y}
        r="22"
        fill="none"
        stroke="#d9f99d"
        strokeWidth="1.5"
        className="field-in"
        style={{ "--field-opacity": "0.35", animationDelay: "2.3s" } as CSSProperties}
      />
    </svg>
  );
}
