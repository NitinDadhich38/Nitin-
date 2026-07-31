import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, Newspaper, Download } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { buttonVariants } from "@/components/ui/button";
import { photos } from "@/lib/images";
import { founder } from "@/lib/leadership";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Press & Newsroom",
  description: "PRAN press resources and media enquiries.",
};

/** Facts a journalist needs, all verifiable from the site itself. */
const factSheet = [
  { label: "Legal entity", value: "Pran Sustainability Pvt. Ltd." },
  { label: "What PRAN is", value: "Financial infrastructure for the carbon market" },
  { label: "Home market", value: "India" },
  { label: "Founder & MD", value: founder.name },
];

export default function PressPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-pran-forest text-white">
        <Image
          src={photos.leaves}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,14,9,.76),rgba(4,12,8,.94))]"
        />
        <div className="relative z-10 mx-auto max-w-content px-6 py-20 sm:py-24">
          <Reveal>
            <h1 className="max-w-[16ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
              Media &amp; press.
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-white/70">
              Coverage, announcements, and brand resources will appear here. In
              the meantime, the facts below are accurate and quotable.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Fact sheet */}
          <div>
            <Reveal>
              <h2 className="font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
                Fact sheet
              </h2>
            </Reveal>
            <dl className="mt-8 space-y-px overflow-hidden rounded-panel bg-pran-hairline">
              {factSheet.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.05}>
                  <div className="flex flex-wrap items-baseline justify-between gap-4 bg-pran-surface px-7 py-5">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                      {f.label}
                    </dt>
                    <dd className="font-medium text-pran-ink">{f.value}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.15}>
              <div className="mt-8 rounded-card bg-pran-paper-warm p-6">
                <p className="text-[15px] leading-relaxed text-pran-muted">
                  <span className="font-medium text-pran-ink">
                    A note on language.
                  </span>{" "}
                  PRAN does not describe itself, or any client, as
                  &ldquo;carbon neutral&rdquo;, &ldquo;net zero&rdquo;, or
                  &ldquo;climate positive&rdquo;. Our certificates state only
                  that credits were purchased and retired for a stated period.
                  Please quote us that way.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Enquiries + assets */}
          <div className="space-y-6">
            <Reveal delay={0.05}>
              <div className="rounded-panel bg-pran-surface p-7 shadow-card">
                <Newspaper className="h-5 w-5 text-pran-emerald" />
                <h3 className="mt-4 font-display text-h3 font-semibold text-pran-ink">
                  Media enquiries
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-pran-muted">
                  Interviews, comment on market structure or Indian carbon
                  policy, and background briefings.
                </p>
                <Link
                  href="/contact?interest=demo"
                  className={cn(buttonVariants(), "mt-5 w-full")}
                >
                  Make an enquiry
                </Link>
                <a
                  href={`mailto:${founder.email}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-pran-emerald"
                >
                  <Mail className="h-4 w-4" />
                  {founder.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-panel border border-dashed border-pran-hairline bg-pran-paper-warm p-7">
                <Download className="h-5 w-5 text-pran-muted" />
                <h3 className="mt-4 font-display text-h3 font-semibold text-pran-ink">
                  Brand assets
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-pran-muted">
                  Logo files, wordmark and usage guidance are being prepared.
                  Request them directly in the meantime.
                </p>
                <span className="mt-4 inline-block rounded-[14px] bg-pran-ink px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-white">
                  Coming soon
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Announcements */}
        <Reveal delay={0.1}>
          <div className="mt-16 rounded-panel border border-dashed border-pran-hairline bg-pran-surface p-12 text-center">
            <h2 className="font-display text-h3 font-semibold text-pran-ink">
              No announcements yet
            </h2>
            <p className="mx-auto mt-2 max-w-[46ch] text-pran-muted">
              We&rsquo;re just getting started. Releases and coverage will be
              listed here as they happen.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
