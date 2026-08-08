import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight, ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";
import { TexturedSection } from "@/components/marketing/textured-section";
import { audiences, getAudience, services } from "@/lib/content";
import { photos } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return audiences.map((a) => ({ audience: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { audience: string };
}): Metadata {
  const a = getAudience(params.audience);
  if (!a) return { title: "Not found" };
  return { title: a.nav, description: a.subtitle };
}

/** Photography per audience — kept consistent with the homepage switcher. */
const heroPhoto: Record<string, string> = {
  enterprise: photos.solar,
  government: photos.greenHills,
  developers: photos.mountainForest,
  public: photos.seedling,
};

/** A second, distinct photo for the "challenge → answer" band further down. */
const secondaryPhoto: Record<string, string> = {
  enterprise: photos.forestCanopy,
  government: photos.forestRiver,
  developers: photos.farmland,
  public: photos.leaves,
};

export default function AudiencePage({
  params,
}: {
  params: { audience: string };
}) {
  const a = getAudience(params.audience);
  if (!a) notFound();

  const photo = heroPhoto[a.slug] ?? photos.forestCanopy;
  const photo2 = secondaryPhoto[a.slug] ?? photos.forestMist;

  return (
    <>
      {/* Hero — photography carries the register */}
      <section className="relative overflow-hidden bg-pran-forest text-white">
        <Image
          src={photo}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(65%_55%_at_82%_20%,rgba(217,249,157,.12),transparent_60%),linear-gradient(180deg,rgba(5,14,9,.72),rgba(4,12,8,.93))]"
        />
        <div className="relative z-10 mx-auto max-w-content px-6 py-20 sm:py-28">
          <Reveal>
            <p className="font-display text-[13px] font-semibold tracking-[0.02em] text-pran-lime">
              {a.nav}
            </p>
            <h1 className="mt-4 max-w-[20ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
              {a.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-white/70">
              {a.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={a.primary.href}
                className={cn(buttonVariants({ size: "lg" }), "group")}
              >
                {a.primary.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/marketplace"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/40 text-white hover:border-white/70",
                )}
              >
                Browse projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Challenge → answer, paired row by row, over real photography */}
      <TexturedSection photo={photo2} tone="light" className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="max-w-[24ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              What&rsquo;s in the way, and what we do about it.
            </h2>
          </Reveal>

          <div className="mt-12 space-y-px overflow-hidden rounded-panel bg-pran-hairline">
            {a.pains.map((pain, i) => (
              <Reveal key={pain} delay={i * 0.05}>
                <div className="grid gap-6 bg-pran-surface p-7 sm:grid-cols-2 sm:gap-10 sm:p-8">
                  <div className="flex gap-4">
                    <span className="font-display text-sm font-semibold tabular-nums text-pran-muted">
                      0{i + 1}
                    </span>
                    <p className="text-[17px] font-medium leading-snug text-pran-ink">
                      {pain}
                    </p>
                  </div>
                  {a.helps[i] && (
                    <div className="flex gap-3 border-t border-pran-hairline pt-5 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-pran-emerald" />
                      <p className="leading-relaxed text-pran-muted">
                        {a.helps[i]}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Any answers beyond the paired pains */}
          {a.helps.length > a.pains.length && (
            <Reveal delay={0.1}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {a.helps.slice(a.pains.length).map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 rounded-card bg-pran-surface p-5 shadow-card"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-pran-emerald" />
                    <span className="text-[15px] leading-relaxed text-pran-ink">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </TexturedSection>

      {/* Carbon Intelligence cross-links — not shown to consumers */}
      {!a.consumer && (
        <section className="border-t border-pran-hairline bg-pran-paper-warm py-20">
          <div className="mx-auto max-w-content px-6">
            <Reveal>
              <h2 className="max-w-[24ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
                The reporting side of the same account.
              </h2>
              <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-pran-muted">
                Procurement and disclosure run off the same data. These are the
                services that sit alongside sourcing.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {services.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.05}>
                  <Link
                    href={`/intelligence/${s.slug}`}
                    className="group flex h-full flex-col rounded-panel bg-pran-surface p-7 shadow-card transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-float"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-h3 font-semibold text-pran-ink">
                        {s.nav}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-pran-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pran-emerald" />
                    </div>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-pran-muted">
                      {s.subtitle}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={
          a.consumer
            ? "Calculate your footprint"
            : "See PRAN for your organisation"
        }
        subtitle={
          a.consumer
            ? "It takes a few minutes. Reduce first, then offset what you can't yet cut."
            : "Book a walkthrough tailored to your goals."
        }
        primary={a.primary}
        secondary={
          a.consumer
            ? { label: "Explore Marketplace", href: "/marketplace" }
            : { label: "Open the Calculator", href: "/calculator" }
        }
      />
    </>
  );
}
