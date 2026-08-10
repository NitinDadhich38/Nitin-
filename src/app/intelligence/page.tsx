import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { DrawnHero, Em } from "@/components/craft/drawn-hero";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { Ledger } from "@/components/craft/ledger";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBand } from "@/components/marketing/page-kit";
import { DocumentMock, artifacts } from "@/components/intelligence/artifact";
import { services } from "@/lib/content";
import { serviceStatus, STAGE_LABEL } from "@/lib/page-data";
import { pageImages } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Carbon Intelligence",
  description:
    "Procurement intelligence and reporting for ESG, BRSR and CBAM — in development. See exactly what each will produce, and join the early-access list.",
};

/**
 * /intelligence — the hub.
 *
 * Founder decision, 2026-08-08: none of these four services is live. So this
 * page announces rather than sells. The persuasive move is still "show the
 * deliverable" — but as a document STRUCTURE with its build stage on it, never
 * as a finished report we do not yet produce.
 */
export default function IntelligenceHub() {
  return (
    <>
      <DrawnHero
        eyebrow="Carbon Intelligence"
        lines={[
          "Reporting is a research",
          <>
            problem <Em>before</Em> it&rsquo;s
          </>,
          "a writing problem.",
        ]}
        sub="Four services in development, built on the same registry data behind the marketplace. Below is exactly what each one will produce — structure, sections and standard — and where it currently stands."
        image={pageImages.intelligenceHero}
        actions={
          <>
            <Link
              href="/contact?interest=intelligence"
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              Join the early-access list
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/marketplace"
              className="text-[15px] font-medium text-white underline-offset-4 hover:underline"
            >
              What&rsquo;s live today
            </Link>
          </>
        }
      />

      {/* Honest status band — the first thing after the hero, deliberately. */}
      <ModeBand mode="warm" size="sm">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <h2 className="max-w-[20ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              None of this is live yet.
            </h2>
            <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-pran-muted">
              We would rather show you the plan than a demo of something that
              does not exist. The marketplace is live and transacting; Carbon
              Intelligence is being built on top of it.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Ledger
              head={["Service", "Stage"]}
              rows={services.map((s) => ({
                label: s.nav,
                value: STAGE_LABEL[serviceStatus[s.slug].stage],
                note: serviceStatus[s.slug].line,
              }))}
            />
          </Reveal>
        </div>
      </ModeBand>

      {/* Four doors, each showing its artifact. */}
      <ModeBand mode="data" size="lg">
        <BandHeader
          eyebrow="The deliverables"
          title="What each one will actually hand you."
          sub="Section names below are the real framework structures — SEBI's nine BRSR principles, the CBAM embedded-emissions breakdown, the GRI and SDG mapping index. The bodies are empty because your data fills them."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {services.map((s, i) => {
            const status = serviceStatus[s.slug];
            return (
              <Reveal key={s.slug} delay={i * 0.06}>
                <div className="flex h-full flex-col">
                  <DocumentMock
                    spec={artifacts[s.slug]}
                    stageLabel={STAGE_LABEL[status.stage]}
                  />
                  <div className="mt-6 flex-1">
                    <h3 className="font-display text-h3 font-semibold text-pran-ink">
                      {s.nav}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-pran-muted">
                      {s.subtitle}
                    </p>
                  </div>
                  {/* The per-service pages were deleted 2026-08-09 — a page
                      describing a product we cannot deliver is a promise. The
                      card routes to the desk instead, with the service
                      preselected on the form. */}
                  <Link
                    href={`/contact?interest=${s.slug}`}
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-pran-emerald"
                  >
                    <Lock className="h-3.5 w-3.5" strokeWidth={2} />
                    Request early access
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </ModeBand>

      {/* The one thing that will not change. */}
      <ModeBand mode="cinematic" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-h2 font-semibold tracking-[-0.02em] text-white">
              A person signs off on every output.
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-white/70">
              Automation drafts; it does not file. Every report will pass a
              human review step before it reaches you, because a disclosure your
              board signs is not a place for an unreviewed machine output.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Ledger
              tone="dark"
              head={["PRAN is", "PRAN is not"]}
              rows={[
                { label: "A preparer", value: "Not an auditor" },
                { label: "A mapper of your data", value: "Not an assurance provider" },
                { label: "A procurement adviser", value: "Not a price forecaster" },
                { label: "Reviewed by people", value: "Not fully automated", emphasis: true },
              ]}
              caption="Framework requirements change. Figures must be confirmed against official SEBI, EU or ministry guidance before filing."
            />
          </Reveal>
        </div>
      </ModeBand>

      <CtaBand
        title="Tell us which framework you're working to."
        subtitle="We'll put you on the early-access list for the one that matters to you, and tell you honestly when it's ready."
        primary={{ label: "Join early access", href: "/contact?interest=intelligence" }}
        secondary={{ label: "Explore Marketplace", href: "/marketplace" }}
      />
    </>
  );
}
