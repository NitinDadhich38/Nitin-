import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, UserCheck } from "lucide-react";
import { CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";
import { services } from "@/lib/content";
import { photos } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Carbon Intelligence",
  description:
    "Procurement intelligence and AI-assisted ESG, BRSR, and CBAM reporting — every draft reviewed by our team before it reaches you.",
};

export default function IntelligenceHub() {
  return (
    <>
      {/* Hero */}
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
          className="absolute inset-0 bg-[radial-gradient(60%_55%_at_80%_20%,rgba(217,249,157,.12),transparent_60%),linear-gradient(180deg,rgba(5,14,9,.74),rgba(4,12,8,.94))]"
        />
        <div className="relative z-10 mx-auto max-w-content px-6 py-20 sm:py-28">
          <Reveal>
            <h1 className="max-w-[22ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
              Every procurement decision and disclosure, powered by one engine.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-white/70">
              AI-assisted analysis with a human-review checkpoint on every
              output — the speed of automation, the safety of expert sign-off.
            </p>
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-btn border border-white/20 px-4 py-2.5 text-sm text-white/80">
              <UserCheck className="h-4 w-4 text-pran-lime" />
              Nothing reaches you without a human reviewing it first
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <Reveal>
          <h2 className="max-w-[22ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
            Four services, one data spine.
          </h2>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-pran-muted">
            Procurement and disclosure run off the same operational data, so the
            numbers in your report and the credits in your account agree.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                href={`/intelligence/${s.slug}`}
                className="group flex h-full flex-col bg-pran-surface p-8 transition-colors hover:bg-pran-paper-warm sm:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-sm font-semibold tabular-nums text-pran-emerald">
                    0{i + 1}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-pran-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pran-emerald" />
                </div>
                <h3 className="mt-4 font-display text-h3 font-semibold leading-snug text-pran-ink">
                  {s.nav}
                </h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-pran-muted">
                  {s.subtitle}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-pran-emerald">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Scope note — these pages carry real caveats */}
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[86ch] rounded-card bg-pran-paper-warm p-6 text-[15px] leading-relaxed text-pran-muted">
            PRAN prepares and advises — it does not certify, audit, or provide
            assurance, and it does not give investment advice on carbon prices.
            Framework requirements change; figures must be confirmed against
            official guidance before filing.
          </p>
        </Reveal>
      </section>

      <CtaBand
        title="Tell us which framework you're working to."
        subtitle="We'll show you exactly how it works for your organisation."
        primary={{ label: "Request Demo", href: "/contact?interest=demo" }}
        secondary={{ label: "Explore Marketplace", href: "/marketplace" }}
      />
    </>
  );
}
