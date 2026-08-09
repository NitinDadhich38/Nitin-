import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DrawnHero, Em } from "@/components/craft/drawn-hero";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { Ledger } from "@/components/craft/ledger";
import { FlowRail } from "@/components/craft/flow-rail";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBand } from "@/components/marketing/page-kit";
import { DocumentMock, artifacts, SheetField } from "@/components/intelligence/artifact";
import { services, getService } from "@/lib/content";
import { serviceStatus, STAGE_LABEL } from "@/lib/page-data";
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
  return {
    title: s.nav,
    description: `${s.subtitle} Currently in development — see the structure and join early access.`,
  };
}

/** Headlines split for the masked reveal. Each names the pain, not the product. */
const HEADLINE: Record<string, React.ReactNode[]> = {
  procurement: [
    "Underwrite a tonne",
    <>
      like you&rsquo;d underwrite <Em>any asset</Em>.
    </>,
  ],
  esg: [
    "Your data already",
    <>
      says this. It just <Em>isn&rsquo;t mapped</Em>.
    </>,
  ],
  brsr: [
    "Nine principles.",
    <>
      One <Em>defensible</Em> filing.
    </>,
  ],
  cbam: [
    "Your buyer in the EU",
    <>
      needs a <Em>number</Em>, not an estimate.
    </>,
  ],
};

export default function ServicePage({
  params,
}: {
  params: { service: string };
}) {
  const s = getService(params.service);
  if (!s) notFound();

  const status = serviceStatus[s.slug];
  const stage = STAGE_LABEL[status.stage];
  const spec = artifacts[s.slug];

  return (
    <>
      <DrawnHero
        eyebrow={`Carbon Intelligence · ${stage}`}
        lines={HEADLINE[s.slug] ?? [s.title]}
        sub={s.subtitle}
        field={<SheetField />}
        actions={
          <>
            <Link
              href={`/contact?interest=${s.slug}`}
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              Join early access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/intelligence"
              className="text-[15px] font-medium text-white underline-offset-4 hover:underline"
            >
              All four services
            </Link>
          </>
        }
      />

      {/* Status first — never let a visitor assume this ships today. */}
      <ModeBand mode="warm" size="sm">
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="rounded-full bg-pran-clay/12 px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.1em] text-pran-clay">
              {stage}
            </span>
            <p className="max-w-[68ch] text-lg leading-relaxed text-pran-ink">
              {status.line}
            </p>
          </div>
        </Reveal>
      </ModeBand>

      {/* The signature visual — the deliverable, as a structure. */}
      <ModeBand mode="data" size="lg">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-24">
            <BandHeader
              eyebrow="What you'll receive"
              title="The document, before the content."
              sub="These are the real section names. Showing you a populated report would mean inventing one, so this is the structure — and it is the part that determines whether the output is defensible."
            />
          </div>
          <Reveal delay={0.06}>
            <DocumentMock spec={spec} stageLabel={stage} />
          </Reveal>
        </div>
      </ModeBand>

      {/* How it will work. */}
      <ModeBand mode="cinematic" size="lg">
        <BandHeader
          tone="dark"
          eyebrow="The process"
          title="Three steps, one of them a person."
          sub="Automation drafts. A reviewer signs off. Nothing reaches your compliance team without that second step."
        />
        <div className="mt-14">
          <FlowRail
            tone="dark"
            steps={[
              { label: "You submit", detail: s.steps[0], meta: "Step 1" },
              { label: "We draft", detail: s.steps[1], meta: "Step 2" },
              { label: "A person reviews", detail: s.steps[2], meta: "Step 3", manual: true },
            ]}
            caption="The hollow node is the human review step. It is not optional and it is not automated away."
          />
        </div>
      </ModeBand>

      {/* What's in it, and what it is not. */}
      <ModeBand mode="data" size="lg">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <BandHeader eyebrow="Scope" title="What's in it." />
            <div className="mt-8">
              <Ledger
                rows={s.youGet.map((g, i) => ({
                  label: g,
                  value: `0${i + 1}`,
                }))}
              />
            </div>
          </div>
          <div>
            <BandHeader eyebrow="Limits" title="What it isn't." />
            <Reveal delay={0.06}>
              <p className="mt-8 rounded-card bg-pran-paper-warm p-7 text-[15px] leading-relaxed text-pran-muted">
                {s.note}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-pran-muted">
                PRAN prepares and advises. It does not certify, audit, or
                provide assurance, and it does not give investment advice on
                carbon prices.
              </p>
            </Reveal>
          </div>
        </div>
      </ModeBand>

      <CtaBand
        title="Want this one first?"
        subtitle="Join the early-access list and we'll tell you honestly when it's ready — not before."
        primary={{ label: "Join early access", href: `/contact?interest=${s.slug}` }}
        secondary={{ label: "See all four", href: "/intelligence" }}
      />
    </>
  );
}
