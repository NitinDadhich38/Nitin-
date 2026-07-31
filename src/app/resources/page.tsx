import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { articles } from "@/lib/resources";
import { resourceGroups } from "@/lib/external-resources";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Plain-English explainers on carbon markets, plus a curated index of primary sources from the UN, ICVCM, VCMI, BEE and India's compliance bodies.",
};

const art = [
  photos.forestMist,
  photos.greenHills,
  photos.leaves,
  photos.solar,
  photos.farmland,
];

export default function ResourcesPage() {
  /* Insights gets a "coming soon" card rather than a live link. */
  const explainers = articles.filter((a) => a.slug !== "blog");

  return (
    <>
      {/* Header band */}
      <section className="relative overflow-hidden bg-pran-forest text-white">
        <Image
          src={photos.forestCanopy}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,14,9,.74),rgba(5,14,9,.92))]"
        />
        <div className="relative z-10 mx-auto max-w-content px-6 py-20 sm:py-24">
          <Reveal>
            <h1 className="max-w-[18ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
              Carbon markets, explained plainly.
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-white/70">
              No jargon for its own sake. Our own explainers, plus a curated
              index of the primary sources — so you can check anything we say
              against the body that actually issued it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRAN explainers */}
      <section className="mx-auto max-w-content px-6 py-20">
        <Reveal>
          <h2 className="max-w-[22ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
            Written by PRAN
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {explainers.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}>
              <Link
                href={`/resources/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-panel bg-pran-surface shadow-card transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-float"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-pran-paper-warm">
                  <Image
                    src={art[i % art.length]}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                    <span>{a.tag}</span>
                    <span aria-hidden>·</span>
                    <span>{a.readingMinutes} min read</span>
                  </div>
                  <h3 className="mt-3 font-display text-h3 font-semibold leading-snug text-pran-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-pran-muted">
                    {a.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-pran-emerald">
                    Read
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* PRAN blog — coming soon, deliberately not a link */}
          <Reveal delay={explainers.length * 0.06}>
            <div className="flex h-full flex-col justify-center rounded-panel border border-dashed border-pran-hairline bg-pran-paper-warm p-8 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-pran-emerald/10">
                <Clock className="h-5 w-5 text-pran-emerald" />
              </span>
              <h3 className="mt-4 font-display text-h3 font-semibold text-pran-ink">
                PRAN Insights
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-pran-muted">
                Notes on market structure, pricing and integrity from the PRAN
                desk.
              </p>
              <span className="mx-auto mt-5 rounded-[14px] bg-pran-ink px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-white">
                Coming soon
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Curated primary sources, grouped by issuing body */}
      {resourceGroups.map((group, gi) => (
        <section
          key={group.id}
          className={
            gi % 2 === 0
              ? "border-t border-pran-hairline bg-pran-paper-warm py-20"
              : "py-20"
          }
        >
          <div className="mx-auto max-w-content px-6">
            <Reveal>
              <h2 className="max-w-[24ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
                {group.title}
              </h2>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-pran-muted">
                {group.intro}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((r, i) => (
                <Reveal key={r.href} delay={i * 0.05}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col bg-pran-surface p-7 transition-colors hover:bg-pran-paper"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-pran-emerald">
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
          </div>
        </section>
      ))}

      {/* Honest framing */}
      <section className="border-t border-pran-hairline bg-pran-paper py-16">
        <div className="mx-auto max-w-content px-6">
          <p className="max-w-[80ch] text-[15px] leading-relaxed text-pran-muted">
            Links above go to each organisation&rsquo;s own site. PRAN is not
            affiliated with these bodies and does not speak for them — summaries
            are ours, written in plain English, and official texts are never
            reproduced here. Where a regulation applies to you, read it at the
            source.
          </p>
        </div>
      </section>
    </>
  );
}
