import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DrawnHero, Em, FieldPath } from "@/components/craft/drawn-hero";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * 404 — the site had no not-found page at all before this, so a bad URL fell
 * through to Next's unstyled default and looked like the site was broken.
 *
 * Kept in the same register as everything else rather than made cute: a
 * missing page is a small failure, and the useful response is a fast route
 * back to the four things anyone actually came for.
 */

/** Hero field — a rail that stops short. */
function BrokenRailField() {
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="nf-glow" cx="60%" cy="50%" r="54%">
          <stop offset="0%" stopColor="#c97a4a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c97a4a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#nf-glow)" />

      {/* the rail runs, then stops */}
      <FieldPath d="M 40 400 L 820 400" stroke="#d9f99d" strokeOpacity="0.55" strokeWidth="2.5" delay={0.3} />
      {[860, 924, 988, 1052, 1116].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1="400"
          x2={x + 30}
          y2="400"
          stroke="#f4c9a0"
          strokeWidth="2.5"
          className="field-in"
          style={{ "--field-opacity": `${0.5 - i * 0.09}`, animationDelay: `${1.1 + i * 0.12}s` } as CSSProperties}
        />
      ))}
      <circle
        cx="820" cy="400" r="8" fill="#d9f99d"
        className="field-in"
        style={{ "--field-opacity": "0.9", animationDelay: "1s" } as CSSProperties}
      />
      {[240, 320, 480, 560].map((y, i) => (
        <line
          key={y} x1="40" y1={y} x2="1400" y2={y}
          stroke="#ffffff" strokeWidth="1"
          className="field-in"
          style={{ "--field-opacity": "0.045", animationDelay: `${0.15 + i * 0.06}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

const destinations = [
  { href: "/marketplace", title: "Marketplace", body: "Verified, registry-issued projects you can screen and price." },
  { href: "/calculator", title: "Calculator", body: "Estimate a footprint on cited factors. No sign-up." },
  { href: "/why-carbon-markets", title: "Why carbon markets", body: "What a tonne actually is, and what a price on it does." },
  { href: "/contact", title: "Contact", body: "Buying, listing, reporting — tell us which." },
];

export default function NotFound() {
  return (
    <>
      <DrawnHero
        eyebrow="404"
        lines={[
          "This one goes",
          <>
            <Em>nowhere</Em>.
          </>,
        ]}
        sub="The page you asked for doesn't exist — it may have moved, or the link may have been wrong when it was written."
        field={<BrokenRailField />}
        actions={
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "group")}>
            Back to the homepage
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        }
      />

      <ModeBand mode="data" size="lg">
        <BandHeader eyebrow="Try these" title="Where most people were heading." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex h-full flex-col bg-pran-surface p-7 transition-colors hover:bg-pran-paper-warm"
            >
              <h2 className="font-display text-h3 font-semibold text-pran-ink group-hover:text-pran-emerald">
                {d.title}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-pran-muted">
                {d.body}
              </p>
            </Link>
          ))}
        </div>
      </ModeBand>
    </>
  );
}
