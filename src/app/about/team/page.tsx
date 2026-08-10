import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { DrawnHero, Em, FieldPath } from "@/components/craft/drawn-hero";
import { ModeBand } from "@/components/craft/mode-band";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBand } from "@/components/marketing/page-kit";
import { LinkedInIcon } from "@/components/shared/icons";
import { FounderPortrait } from "@/components/marketing/founder-portrait";
import { founder } from "@/lib/leadership";
import { pageImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Nitin Dadhich, Founder & Managing Director of PRAN — the financial-infrastructure layer for the carbon market.",
};

/**
 * /about/team — founder-led, deliberately singular.
 *
 * PRAN is one person's company today and the page says so plainly rather than
 * padding a "team" grid with placeholders. The operating principles live on
 * /about and are NOT repeated here: the homepage already had a duplicated
 * stat block once, and the fix was to show each thing in exactly one place.
 */

/** Hero field — a single spine, because this page is about one person. */
function SoloField() {
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="so-glow" cx="64%" cy="48%" r="52%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#so-glow)" />
      {[260, 340, 420, 500].map((y, i) => (
        <FieldPath
          key={y}
          d={`M 40 ${y} L ${900 + i * 60} ${y}`}
          stroke="#ffffff"
          strokeOpacity={0.16 - i * 0.02}
          strokeWidth="1.5"
          delay={0.3 + i * 0.14}
        />
      ))}
      <FieldPath d="M 1040 120 L 1040 660" stroke="#d9f99d" strokeOpacity="0.45" strokeWidth="2" delay={1} />
      <circle
        cx="1040" cy="390" r="14" fill="#d9f99d"
        className="field-in"
        style={{ "--field-opacity": "0.9", animationDelay: "1.6s" } as CSSProperties}
      />
    </svg>
  );
}

export default function LeadershipPage() {
  return (
    <>
      <DrawnHero
        eyebrow="Leadership"
        lines={[
          "The people behind",
          <>
            the <Em>infrastructure</Em>.
          </>,
        ]}
        sub="PRAN is built by people who work the carbon market directly — with the developers listing projects, and with the buyers who have to defend every tonne on their books."
        image={pageImages.teamHorizon}
        field={<SoloField />}
      />

      {/* ── The founder ─────────────────────────────────────────────────── */}
      <ModeBand mode="data" size="lg">
        <div className="grid items-start gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          <Reveal>
            <FounderPortrait
              src={founder.photo}
              alt={`${founder.name}, ${founder.role}`}
              initials={founder.initials}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              {founder.name}
            </h2>
            <p className="mt-2.5 font-display text-lg font-medium text-pran-emerald">
              {founder.role}
            </p>

            <div className="mt-8 space-y-5">
              {founder.bio.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="max-w-[62ch] text-[17px] leading-relaxed text-pran-muted"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${founder.email}`}
                className="inline-flex items-center gap-2.5 rounded-btn border border-pran-hairline px-4 py-2.5 text-sm font-medium text-pran-ink transition-colors hover:border-pran-emerald hover:text-pran-emerald"
              >
                <Mail className="h-4 w-4" />
                {founder.email}
              </a>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${founder.name} on LinkedIn`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-pran-hairline text-pran-muted transition-colors hover:border-pran-emerald hover:text-pran-emerald"
              >
                <LinkedInIcon className="h-[17px] w-[17px]" />
              </a>
            </div>
          </Reveal>
        </div>
      </ModeBand>

      {/* ── What exists today — the counterweight to "one person" ───────── */}
      <ModeBand mode="cinematic" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-h2 font-semibold tracking-[-0.02em] text-white">
              Small team. Real book.
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-white/70">
              Early-stage is a reason to check what actually exists, not to take
              anyone&apos;s word for it. Every figure below is derived from the live
              portfolio behind the marketplace — go and look at it.
            </p>
            <Link
              href="/marketplace"
              className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium text-pran-lime underline-offset-4 hover:underline"
            >
              Open the marketplace
            </Link>
          </Reveal>
        </div>
      </ModeBand>

      <CtaBand
        title="Talk to the founder directly."
        subtitle="Partnerships, policy and press reach Nitin without going through anyone else."
        primary={{ label: "Get in touch", href: "/contact?interest=demo" }}
        secondary={{ label: "Why we exist", href: "/about" }}
      />
    </>
  );
}
