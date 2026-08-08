import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";
import { TexturedSection } from "@/components/marketing/textured-section";
import { services, getService } from "@/lib/content";
import { photos } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { service: string };
}): Metadata {
  const s = getService(params.service);
  if (!s) return { title: "Not found" };
  return { title: s.nav, description: s.subtitle };
}

const heroPhoto: Record<string, string> = {
  procurement: photos.forestRiver,
  esg: photos.forestCanopy,
  brsr: photos.mountainForest,
  cbam: photos.farmland,
};

/** A second, distinct photo for the "What you get" band further down. */
const secondaryPhoto: Record<string, string> = {
  procurement: photos.wind,
  esg: photos.greenHills,
  brsr: photos.leaves,
  cbam: photos.solar,
};

export default function ServicePage({
  params,
}: {
  params: { service: string };
}) {
  const s = getService(params.service);
  if (!s) notFound();

  const photo = heroPhoto[s.slug] ?? photos.forestMist;
  const photo2 = secondaryPhoto[s.slug] ?? photos.leaves;
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-pran-forest text-white">
        <Image
          src={photo}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_18%,rgba(217,249,157,.12),transparent_60%),linear-gradient(180deg,rgba(5,14,9,.74),rgba(4,12,8,.94))]"
        />
        <div className="relative z-10 mx-auto max-w-content px-6 py-20 sm:py-28">
          <Reveal>
            <p className="font-display text-[13px] font-semibold tracking-[0.02em] text-pran-lime">
              {s.eyebrow}
            </p>
            <h1 className="mt-4 max-w-[22ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
              {s.title}
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-white/70">
              {s.subtitle}
            </p>
            <Link
              href={`/contact?interest=${s.slug}`}
              className={cn(buttonVariants({ size: "lg" }), "group mt-9")}
            >
              Request this service
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* How it works — a numbered spine */}
      <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <Reveal>
          <h2 className="max-w-[20ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
            How it works
          </h2>
        </Reveal>

        <ol className="mt-12 space-y-px overflow-hidden rounded-panel bg-pran-hairline">
          {s.steps.map((step, i) => (
            <Reveal key={step} delay={i * 0.06}>
              <li className="flex flex-col gap-4 bg-pran-surface p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pran-emerald/10 font-display text-base font-semibold tabular-nums text-pran-emerald-hover">
                  {i + 1}
                </span>
                <p className="text-[17px] leading-relaxed text-pran-ink">
                  {step}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* What you get */}
      <TexturedSection
        photo={photo2}
        tone="light"
        className="border-t border-pran-hairline py-20"
      >
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="max-w-[20ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              What you get
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {s.youGet.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <li className="flex h-full items-start gap-3.5 rounded-panel bg-pran-surface p-7 shadow-card">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pran-emerald/10">
                    <Check className="h-4 w-4 text-pran-emerald" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-pran-ink">
                    {item}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          {/* Scope note — deliberately prominent, not fine print */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex items-start gap-3.5 rounded-panel border border-pran-hairline bg-pran-surface p-7">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-pran-muted" />
              <p className="max-w-[76ch] text-[15px] leading-relaxed text-pran-muted">
                {s.note}
              </p>
            </div>
          </Reveal>
        </div>
      </TexturedSection>

      {/* Other services */}
      <section className="py-20">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="max-w-[24ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              Other intelligence services
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.05}>
                <Link
                  href={`/intelligence/${o.slug}`}
                  className="group flex h-full flex-col bg-pran-surface p-7 transition-colors hover:bg-pran-paper-warm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-h3 font-semibold leading-snug text-pran-ink">
                      {o.nav}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-pran-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pran-emerald" />
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-pran-muted">
                    {o.subtitle}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Request this service"
        subtitle="Tell us your goal — we'll show you exactly how it works for your organisation."
        primary={{ label: "Request Demo", href: `/contact?interest=${s.slug}` }}
        secondary={{ label: "Explore Marketplace", href: "/marketplace" }}
      />
    </>
  );
}
