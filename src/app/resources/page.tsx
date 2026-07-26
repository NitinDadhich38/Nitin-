import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHeader, Section } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";
import { articles } from "@/lib/resources";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Plain-English explainers on carbon markets — India's CCTS, the voluntary market, compliance frameworks, and a working glossary.",
};

const art = [photos.forestMist, photos.greenHills, photos.leaves, photos.solar, photos.farmland];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Carbon markets, explained plainly."
        subtitle="No jargon for its own sake. These are the explainers we wish existed when we started — written for people who have to make a decision, not pass an exam."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
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
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                    <span>{a.tag}</span>
                    <span aria-hidden>·</span>
                    <span>{a.readingMinutes} min read</span>
                  </div>
                  <h2 className="mt-3 font-display text-h3 font-semibold leading-snug text-pran-ink">
                    {a.title}
                  </h2>
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
        </div>
      </Section>
    </>
  );
}
