import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { DrawnHero, Em, FieldPath } from "@/components/craft/drawn-hero";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { Reveal } from "@/components/marketing/reveal";
import { articles } from "@/lib/resources";
import { resourceGroups } from "@/lib/external-resources";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Plain-English explainers on carbon markets, plus a curated index of primary sources from the UN, ICVCM, VCMI, BEE and India's compliance bodies.",
};

/**
 * /resources — an index, not a blog.
 *
 * Was a grid of photo cards, which made five explainers look like lifestyle
 * content. Interior pages are diagram-forward now, so this is set as a
 * reference index: numbered, dense, scannable. The glossary and the CCTS
 * explainer are meant to be the best free versions in the Indian market —
 * that is a distribution asset, and it should look like a reference work.
 */

/** Hero field — a shelf of indexed spines. */
function IndexField() {
  const spines = Array.from({ length: 22 }, (_, i) => ({
    x: 460 + i * 44,
    h: 120 + ((i * 37) % 190),
  }));
  const BASE = 540;
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="ix-glow" cx="64%" cy="46%" r="56%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#ix-glow)" />
      <FieldPath d={`M 400 ${BASE} L 1400 ${BASE}`} stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.5" delay={0.3} />
      {spines.map((s, i) => (
        <rect
          key={s.x}
          x={s.x}
          y={BASE - s.h}
          width="26"
          height={s.h}
          rx="3"
          fill={i % 7 === 3 ? "#d9f99d" : "#ffffff"}
          className="field-in"
          style={
            {
              "--field-opacity": i % 7 === 3 ? "0.45" : "0.1",
              animationDelay: `${0.4 + i * 0.045}s`,
            } as CSSProperties
          }
        />
      ))}
    </svg>
  );
}

export default function ResourcesPage() {
  /* Insights gets a "coming soon" row rather than a live link. */
  const explainers = articles.filter((a) => a.slug !== "blog");

  return (
    <>
      <DrawnHero
        eyebrow="Resources"
        lines={[
          "Carbon markets,",
          <>
            explained <Em>plainly</Em>.
          </>,
        ]}
        sub="Our own explainers, plus a curated index of the primary sources — so you can check anything we say against the body that actually issued it."
        field={<IndexField />}
        actions={
          <Link
            href="/resources/glossary"
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-white underline-offset-4 hover:underline"
          >
            Start with the glossary
            <ArrowRight className="h-4 w-4 text-pran-lime" />
          </Link>
        }
      />

      {/* ── Written by PRAN — an index, numbered ────────────────────────── */}
      <ModeBand mode="data" size="lg">
        <BandHeader
          eyebrow="Written by PRAN"
          title="Four explainers and a glossary."
          sub="Written from public, well-established facts. Regulatory specifics are summarised in plain English — official texts are never reproduced here."
        />

        <ol className="mt-12 border-t border-pran-hairline">
          {explainers.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.05}>
              <li className="border-b border-pran-hairline">
                <Link
                  href={`/resources/${a.slug}`}
                  className="group grid items-baseline gap-x-8 gap-y-2 py-7 md:grid-cols-[auto_minmax(0,1fr)_auto]"
                >
                  <span className="font-display text-sm font-semibold tabular-nums text-pran-emerald">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.7rem)] font-semibold leading-snug tracking-[-0.02em] text-pran-ink transition-colors group-hover:text-pran-emerald">
                      {a.title}
                    </h3>
                    <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-pran-muted">
                      {a.summary}
                    </p>
                  </div>
                  <span className="flex items-center gap-3 text-[13px] text-pran-muted md:justify-self-end">
                    <span className="whitespace-nowrap">
                      {a.tag} · {a.readingMinutes} min
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-pran-emerald" />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}

          {/* Insights — deliberately not a link until it exists. */}
          <Reveal delay={explainers.length * 0.05}>
            <li className="border-b border-pran-hairline">
              <div className="grid items-baseline gap-x-8 gap-y-2 py-7 md:grid-cols-[auto_minmax(0,1fr)_auto]">
                <span className="font-display text-sm font-semibold tabular-nums text-pran-muted">
                  {String(explainers.length + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.7rem)] font-semibold leading-snug tracking-[-0.02em] text-pran-muted">
                    PRAN Insights
                  </h3>
                  <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-pran-muted">
                    Notes on market structure, pricing and integrity from the
                    PRAN desk.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pran-paper-warm px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-pran-muted md:justify-self-end">
                  <Clock className="h-3.5 w-3.5" />
                  Coming soon
                </span>
              </div>
            </li>
          </Reveal>
        </ol>
      </ModeBand>

      {/* ── Curated primary sources, grouped by issuing body ────────────── */}
      {resourceGroups.map((group, gi) => (
        <ModeBand key={group.id} mode={gi % 2 === 0 ? "warm" : "data"} size="lg">
          <BandHeader eyebrow="Primary sources" title={group.title} sub={group.intro} />

          <div className="mt-10 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((r, i) => (
              <Reveal key={r.href} delay={i * 0.05}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex h-full flex-col bg-pran-surface p-7 transition-colors",
                    gi % 2 === 0 ? "hover:bg-pran-paper" : "hover:bg-pran-paper-warm",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-pran-emerald">
                      {r.issuer}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-pran-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pran-emerald" />
                  </div>
                  <h3 className="mt-3 font-display text-h3 font-semibold leading-snug text-pran-ink">
                    {r.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-pran-muted">
                    {r.summary}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </ModeBand>
      ))}

      {/* ── Honest framing ─────────────────────────────────────────────── */}
      <ModeBand mode="cinematic" size="md">
        <Reveal>
          <p className="max-w-[80ch] text-[15px] leading-relaxed text-white/70">
            Links above go to each organisation&rsquo;s own site. PRAN is not
            affiliated with these bodies and does not speak for them — the
            summaries are ours, written in plain English, and official texts are
            never reproduced here. Where a regulation applies to you, read it at
            the source.
          </p>
        </Reveal>
      </ModeBand>
    </>
  );
}
