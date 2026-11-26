import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  Calendar,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { ReadingProgress } from "@/components/resources/reading-progress";
import { articles, getArticle } from "@/lib/resources";
import { complianceLinks, voluntaryLinks } from "@/lib/resource-links";
import { posts } from "@/lib/posts";
import { pageImages } from "@/lib/images";
import { ResourceList } from "@/components/resources/resource-list";
import { ComplianceMatrix } from "@/components/resources/compliance-matrix";
import { CreditLifecycle } from "@/components/resources/credit-lifecycle";
import { BlogExplorer } from "@/components/resources/blog-explorer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const a = getArticle(params.slug);
  if (!a) return { title: "Not found" };
  return {
    title: `${a.title} · PRAN Regulatory & Climate Intelligence`,
    description: a.summary,
  };
}

const RESOURCE_TABS = [
  { slug: "compliance-library", label: "Compliance Markets (CCTS, BRSR, CBAM)" },
  { slug: "voluntary-market", label: "Voluntary Markets & Integrity" },
  { slug: "blog", label: "Research & Market Insights" },
];

export default function ResourcePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== article.slug);

  return (
    <div className="bg-pran-paper">
      <ReadingProgress />

      {/* Top Resources Navigation Switcher */}
      <div className="border-b border-pran-hairline bg-pran-surface sticky top-16 z-20 shadow-sm">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-2.5 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1.5 min-w-max">
            {RESOURCE_TABS.map((tab) => (
              <Link
                key={tab.slug}
                href={`/resources/${tab.slug}`}
                className={cn(
                  "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                  article.slug === tab.slug
                    ? "bg-pran-emerald text-white shadow-sm"
                    : "text-pran-muted hover:text-pran-ink hover:bg-pran-paper-warm",
                )}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          <Link
            href="/marketplace"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-pran-emerald hover:underline"
          >
            Explore Marketplace <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-pran-forest text-white py-16 sm:py-24">
        <Image
          src={pageImages.resourcesHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-25 mix-blend-overlay"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,61,46,0.85),rgba(15,61,46,0.96))]"
        />

        <div className="relative z-10 mx-auto max-w-content px-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-300">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3 py-0.5 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              PRAN REGULATORY &amp; CLIMATE INTELLIGENCE
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readingMinutes} min read
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Updated {article.updated}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-display-m sm:text-display-l font-bold tracking-tight text-white">
            {article.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/80">
            {article.summary}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto grid max-w-content gap-12 px-6 py-14 sm:py-20 lg:grid-cols-[1fr_290px] lg:gap-16">
        <div className="min-w-0">
          {params.slug === "voluntary-market" && <VoluntaryBody />}
          {params.slug === "compliance-library" && <ComplianceBody />}
          {params.slug === "blog" && <BlogBody />}
        </div>

        {/* Sticky Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start space-y-6">
          <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-6 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
              Document Briefing
            </p>
            <dl className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <dt className="text-pran-muted">Publication Type</dt>
                <dd className="font-semibold text-pran-ink">{article.tag}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-pran-muted">Estimated Duration</dt>
                <dd className="font-semibold text-pran-ink">
                  {article.readingMinutes} min
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-pran-muted">Verification Source</dt>
                <dd className="font-semibold text-pran-ink">Official Gazettes</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-pran-muted">Last Revision</dt>
                <dd className="font-semibold text-pran-ink">{article.updated}</dd>
              </div>
            </dl>

            <div className="mt-6 pt-5 border-t border-pran-hairline">
              <Link
                href="/contact?interest=reporting"
                className="flex w-full items-center justify-center gap-1.5 rounded-btn bg-pran-emerald px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-pran-emerald-hover transition-colors"
              >
                Request Regulatory Briefing
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-6 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
              Explore Resources
            </p>
            <ul className="mt-4 space-y-3">
              {others.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/resources/${a.slug}`}
                    className="group flex items-start justify-between gap-3 text-xs font-medium text-pran-ink hover:text-pran-emerald transition-colors"
                  >
                    <span>{a.title}</span>
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pran-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pran-emerald" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 text-xs">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              Direct Supply Alignment
            </span>
            <p className="mt-1.5 text-pran-muted leading-relaxed">
              Every methodology and framework discussed here can be fulfilled
              with verified registry credits from PRAN&rsquo;s escrow-cleared
              portfolio.
            </p>
            <Link
              href="/marketplace"
              className="mt-3 inline-flex items-center gap-1 font-semibold text-pran-emerald hover:underline"
            >
              Browse live book <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Closing CTA */}
      <section className="border-t border-pran-hairline bg-pran-surface py-16 sm:py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-pran-ink">
            Need Bespoke Diligence on an Offset Methodology?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-pran-muted">
            Our market research desk analyzes additionality baselines, registry
            revisions, and compliance eligibility for institutional buyers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-pran-emerald hover:bg-pran-emerald-hover text-white font-semibold",
              )}
            >
              Consult Our Research Desk
            </Link>
            <Link
              href="/marketplace"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              Explore Verified Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function VoluntaryBody() {
  return (
    <div className="space-y-12">
      {/* Executive Callout */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/30 p-6 sm:p-7">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-sm">
          <ShieldCheck className="h-4 w-4" />
          Executive Takeaway
        </div>
        <p className="mt-2 text-sm text-pran-ink leading-relaxed">
          A carbon credit is not a charitable donation or a generic marketing
          claim. It is a serialised legal instrument issued by an accredited
          registry confirming that exactly one metric tonne of CO₂ equivalent
          was either avoided or physically removed from the atmosphere under
          audited scientific methodologies.
        </p>
      </div>

      {/* Section 1: Anatomy of a Credit */}
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-pran-ink">
          The Anatomy of 1 Metric Tonne (tCO₂e)
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-pran-muted">
          A credit only comes into legal and market existence when six strict
          conditions are met simultaneously:
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-pran-hairline bg-pran-surface p-5 shadow-card">
            <span className="text-xs font-mono font-bold text-pran-emerald">
              01 · METHODOLOGY
            </span>
            <h4 className="mt-2 font-bold text-sm text-pran-ink">
              Approved Protocol
            </h4>
            <p className="mt-1 text-xs text-pran-muted leading-relaxed">
              Designed according to peer-reviewed public rules (e.g. VM0007 for
              REDD+, ACM0002 for Grid-Connected Renewables, or Gold Standard
              micro-scale biochar).
            </p>
          </div>

          <div className="rounded-xl border border-pran-hairline bg-pran-surface p-5 shadow-card">
            <span className="text-xs font-mono font-bold text-pran-emerald">
              02 · ADDITIONALITY
            </span>
            <h4 className="mt-2 font-bold text-sm text-pran-ink">
              Financial &amp; Regulatory Test
            </h4>
            <p className="mt-1 text-xs text-pran-muted leading-relaxed">
              Proof that the emission reduction would not have occurred without
              the financial revenue from carbon credits.
            </p>
          </div>

          <div className="rounded-xl border border-pran-hairline bg-pran-surface p-5 shadow-card">
            <span className="text-xs font-mono font-bold text-pran-emerald">
              03 · INDEPENDENT AUDIT
            </span>
            <h4 className="mt-2 font-bold text-sm text-pran-ink">
              VVB Validation
            </h4>
            <p className="mt-1 text-xs text-pran-muted leading-relaxed">
              Third-party accredited auditor (TÜV SÜD, Earthood, Epic, S&amp;P)
              visits the site and certifies measured metrics against the
              baseline.
            </p>
          </div>

          <div className="rounded-xl border border-pran-hairline bg-pran-surface p-5 shadow-card">
            <span className="text-xs font-mono font-bold text-pran-emerald">
              04 · SERIAL REGISTRY RECORD
            </span>
            <h4 className="mt-2 font-bold text-sm text-pran-ink">
              Unique Serial Number
            </h4>
            <p className="mt-1 text-xs text-pran-muted leading-relaxed">
              Issued onto a central public ledger (Verra, Gold Standard, CDM)
              with unique serial tracking to eliminate double-issuance.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Interactive Lifecycle */}
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-pran-ink">
          The 7-Stage Credit Lifecycle
        </h2>
        <p className="mt-2 text-sm text-pran-muted">
          From developer conception to permanent corporate registry cancellation.
        </p>
        <CreditLifecycle />
      </div>

      {/* Section 3: Removal vs Avoidance */}
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-pran-ink">
          Carbon Removal (CDR) vs. Emissions Avoidance
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-pran-muted">
          Avoidance and removal are not interchangeable commodities. They serve
          different corporate reporting roles under the Oxford Offsetting
          Principles:
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-lg font-bold text-pran-ink">
                Emissions Avoidance
              </h4>
              <span className="rounded-md bg-teal-100 dark:bg-teal-950 px-2.5 py-0.5 text-xs font-semibold text-teal-800 dark:text-teal-300">
                Near-Term Transition
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-pran-muted leading-relaxed">
              Prevents emissions that would have otherwise entered the
              atmosphere. Examples include grid-connected solar and wind power,
              biogas from industrial waste, and energy efficiency upgrades.
            </p>
            <div className="mt-4 pt-3 border-t border-pran-hairline text-xs space-y-1.5 text-pran-muted">
              <p>
                <strong>Typical Price Range:</strong> $1.50 – $12.00 / tCO₂e
              </p>
              <p>
                <strong>Role:</strong> Immediate Scope 2 &amp; supply chain
                mitigation.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-lg font-bold text-pran-ink">
                Carbon Removal (CDR)
              </h4>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Net Zero Residuals
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-pran-muted leading-relaxed">
              Physically extracts CO₂ from ambient air and sequesters it into
              biological or geological sinks. Examples include afforestation,
              blue carbon (mangroves), biochar, and direct air capture.
            </p>
            <div className="mt-4 pt-3 border-t border-pran-hairline text-xs space-y-1.5 text-pran-muted">
              <p>
                <strong>Typical Price Range:</strong> $18.00 – $250.00+ / tCO₂e
              </p>
              <p>
                <strong>Role:</strong> Neutralizing unavoidable residual
                emissions for Net Zero claims.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Verified Standard Registries */}
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-pran-ink">
          The Primary Standard Registries
        </h2>
        <p className="mt-3 text-sm text-pran-muted">
          PRAN only lists projects registered on verified international and
          sovereign registries:
        </p>
        <div className="mt-6">
          <ResourceList links={voluntaryLinks} />
        </div>
      </div>
    </div>
  );
}

function ComplianceBody() {
  return (
    <div className="space-y-12">
      {/* Executive Callout */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/30 p-6 sm:p-7">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-sm">
          <AlertTriangle className="h-4 w-4" />
          Mandatory Compliance Alert
        </div>
        <p className="mt-2 text-sm text-pran-ink leading-relaxed">
          Compliance markets are legally binding regimes established by
          governments. Surrendering certificates is a statutory requirement with
          financial penalties for non-compliance. Listed companies in India and
          exporters to the European Union are already under active disclosure
          and surrender obligations.
        </p>
      </div>

      {/* Comparative Matrix Component */}
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-pran-ink">
          Global &amp; Domestic Regulatory Comparison
        </h2>
        <p className="mt-2 text-sm text-pran-muted">
          Click across the five major regulatory frameworks to compare scope,
          statutory penalties, and allowed market mechanisms:
        </p>
        <ComplianceMatrix />
      </div>

      {/* Deep-Dive Frameworks */}
      <div className="space-y-8">
        <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-7 shadow-card">
          <div className="flex items-center justify-between border-b border-pran-hairline pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-pran-emerald">
                INDIA CCTS · MINISTRY OF POWER
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-pran-ink">
                Carbon Credit Trading Scheme (CCTS)
              </h3>
            </div>
            <span className="rounded-md bg-pran-paper-warm px-2.5 py-1 text-xs font-medium text-pran-ink">
              BEE Administered
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-pran-muted">
            Notified under the Energy Conservation Act, CCTS introduces both a
            compliance mechanism for obligated energy-intensive industries
            (steel, cement, fertilizers, chlor-alkali) and an offset mechanism
            for non-obligated developers.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-pran-paper p-3">
              <span className="font-semibold text-pran-ink">
                Compliance Mechanism
              </span>
              <p className="text-pran-muted mt-1">
                Entities given specific GHG intensity reduction targets.
                Entities outperforming earn Carbon Credit Certificates (CCC);
                underperforming entities must surrender them.
              </p>
            </div>
            <div className="rounded-lg bg-pran-paper p-3">
              <span className="font-semibold text-pran-ink">Offset Mechanism</span>
              <p className="text-pran-muted mt-1">
                Enables voluntary decarbonization projects across India to register
                under BEE-approved methodologies and trade units on power
                exchanges.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-7 shadow-card">
          <div className="flex items-center justify-between border-b border-pran-hairline pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-pran-emerald">
                SEBI · LISTED ENTERPRISE MANDATE
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-pran-ink">
                BRSR Core Mandatory Assurance
              </h3>
            </div>
            <span className="rounded-md bg-pran-paper-warm px-2.5 py-1 text-xs font-medium text-pran-ink">
              Top 1,000 Companies
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-pran-muted">
            SEBI mandates structured environmental disclosures under Business
            Responsibility and Sustainability Reporting. Under BRSR Core, top
            listed entities must obtain independent reasonable assurance for
            Scope 1, 2, and supply chain emissions, alongside registered offset
            retirements.
          </p>
        </div>

        <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-7 shadow-card">
          <div className="flex items-center justify-between border-b border-pran-hairline pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-pran-emerald">
                EUROPEAN UNION · REGULATION 2023/956
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-pran-ink">
                Carbon Border Adjustment Mechanism (CBAM)
              </h3>
            </div>
            <span className="rounded-md bg-pran-paper-warm px-2.5 py-1 text-xs font-medium text-pran-ink">
              Active Financial Surcharges
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-pran-muted">
            The EU CBAM equalizes the carbon price paid by EU domestic producers
            under the EU ETS with imported goods. Exporters in steel, cement,
            aluminum, and fertilizers must calculate and verify product-level
            embedded emissions to prevent punitive border tariff surcharges.
          </p>
        </div>
      </div>

      {/* Official Links & Gazettes */}
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-pran-ink">
          Official Gazettes &amp; Regulatory Portals
        </h2>
        <p className="mt-2 text-sm text-pran-muted">
          Primary legislation, notifications, and portal links from governing
          authorities:
        </p>
        <div className="mt-6">
          <ResourceList links={complianceLinks} />
        </div>
      </div>
    </div>
  );
}

function BlogBody() {
  return (
    <div className="space-y-10">
      {/* Blog Editorial Header */}
      <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-7 shadow-card">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pran-emerald">
          <BookOpen className="h-4 w-4" />
          Editorial Research Desk
        </div>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-pran-ink">
          Market Intelligence &amp; Integrity Analysis
        </h2>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-pran-muted">
          Rigorous analysis on voluntary carbon market mechanics, price
          discovery, additionality baselines, and regulatory compliance.
          Written by PRAN&rsquo;s institutional trading and research desk.
        </p>
      </div>

      {/* Interactive Blog Explorer */}
      <BlogExplorer posts={posts} />
    </div>
  );
}
