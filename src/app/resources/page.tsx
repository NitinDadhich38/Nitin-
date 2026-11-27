import type { Metadata } from "next";
import Link from "next/link";
import { BeliefBand } from "@/components/marketing/belief-band";
import Image from "next/image";
import {
  BookOpen,
  Scale,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import { posts } from "@/lib/posts";
import { pageImages } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Regulatory Intelligence & Climate Research Desk · PRAN",
  description:
    "Statutory explainers, regulatory frameworks, compliance timelines, and empirical market structure research covering SEBI BRSR Core, India CCTS, EU CBAM, and global voluntary carbon markets.",
};

const PILLARS = [
  {
    slug: "compliance-library",
    title: "Compliance Markets Compendium",
    subtitle: "India CCTS, SEBI BRSR Core, and EU CBAM",
    badge: "STATUTORY MANDATES & AUDIT DEFENSE",
    icon: Scale,
    description:
      "A complete operational guide for corporate compliance officers, risk managers, and auditors. Covers statutory requirements, verification benchmarks, and official gazette citations.",
    stats: "3 Active Frameworks · 8 Min Read",
    topics: [
      "Bureau of Energy Efficiency (BEE) Carbon Credit Trading Scheme (CCTS)",
      "SEBI BRSR Core reasonable assurance milestones for top 1,000 listed entities",
      "EU Carbon Border Adjustment Mechanism (CBAM) embedded emissions rules",
      "Statutory verification criteria and acceptable registry offsets",
    ],
    linkText: "Enter Compliance Library",
  },
  {
    slug: "voluntary-market",
    title: "Voluntary Carbon Markets Architecture",
    subtitle: "Integrity, Verification & Article 6 Alignment",
    badge: "ICVCM CCP & REGISTRY INTEGRITY",
    icon: ShieldCheck,
    description:
      "Detailed analysis of how voluntary carbon credits are issued, monitored, serialized, and retired across Verra, Gold Standard, ICR, and CDM. Demystifies removal versus avoidance mechanics.",
    stats: "End-to-End Lifecycle · 7 Min Read",
    topics: [
      "Core Carbon Principles (CCP) assessment by ICVCM",
      "7-stage credit lifecycle from Project Design Document (PDD) to retirement",
      "Carbon Removal (CDR) vs. Avoidance scientific demarcation",
      "Double-counting mitigation and Article 6.2/6.4 Corresponding Adjustments",
    ],
    linkText: "Explore Voluntary Architecture",
  },
  {
    slug: "blog",
    title: "Climate Economics & Research Desk",
    subtitle: "Market Structure, Pricing, and Integrity Notes",
    badge: "PRAN ANALYST BRIEFINGS",
    icon: TrendingUp,
    description:
      "Empirical essays and macroeconomic analysis on price dispersion, additionality dilemmas, and structural liquidity in global environmental commodity markets.",
    stats: `${posts.length} Research Essays · Quarterly Briefings`,
    topics: [
      "Price dispersion in voluntary markets as an indicator of asset risk",
      "Critical legal differences between voluntary offsets and compliance units",
      "Additionality frameworks: financial benchmark vs. regulatory surplus",
      "Forward settlement and escrow custody in carbon commodity markets",
    ],
    linkText: "Read Research Briefings",
  },
];

const REGULATORY_UPDATES = [
  {
    title: "SEBI BRSR Core Reasonable Assurance Directive",
    date: "Current Mandate",
    framework: "SEBI / India",
    status: "Active Enforcement",
    summary:
      "Top 250 listed entities must secure reasonable assurance on BRSR Core KPIs, expanding to top 1,000. Scope 3 disclosures required for top 250.",
  },
  {
    title: "India Carbon Credit Trading Scheme (CCTS) Gazette",
    date: "2025–2026 Phase",
    framework: "Ministry of Power / BEE",
    status: "Compliance Phase-in",
    summary:
      "Energy Conservation Act amendments formalize compliance trajectory for energy-intensive obligated entities under Bureau of Energy Efficiency oversight.",
  },
  {
    title: "EU CBAM Transitional to Definitive Phase",
    date: "Mandatory Jan 2026",
    framework: "European Commission",
    status: "Definitive Payment Phase",
    summary:
      "Transition from reporting-only to financial liability for embedded emissions in steel, aluminium, cement, fertilizer, and electricity imports.",
  },
];

export default function ResourcesIndexPage() {
  return (
    <div className="bg-pran-paper">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-pran-forest text-white py-20 sm:py-28">
        <Image
          src={pageImages.marketplaceHero}
          alt="Regulatory Intelligence Desk"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-20 mix-blend-overlay"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,61,46,0.85),rgba(15,61,46,0.98))]"
        />

        <div className="relative z-10 mx-auto max-w-content px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-300 backdrop-blur-md">
            <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
            REGULATORY &amp; CLIMATE INTELLIGENCE DESK
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-display-l font-bold tracking-tight text-white sm:text-display-xl">
            Authoritative knowledge for corporate compliance and climate finance.
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/80">
            Plain-English, rigorously sourced guidance on India&rsquo;s CCTS, SEBI BRSR Core,
            the EU CBAM, and international voluntary carbon market mechanics.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/resources/compliance-library"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-950/50",
              )}
            >
              Open Compliance Library
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/resources/blog"
              className="inline-flex items-center gap-2 rounded-btn border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Explore Research Articles
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <BeliefBand label="Resources" statement="Read first. Decide after." line="Plain explanations of the rules and the market, so that decisions are made with understanding." />

      {/* Regulatory Pulse Live Bar */}
      <section className="border-b border-pran-hairline bg-pran-surface py-10">
        <div className="mx-auto max-w-content px-6">
          <div className="flex items-center justify-between border-b border-pran-hairline pb-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-pran-emerald">
                Statutory Watch
              </span>
              <h3 className="font-display text-lg font-bold text-pran-ink">
                Active Regulatory Directives &amp; Deadlines
              </h3>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-pran-emerald">
              <span className="h-2 w-2 rounded-full bg-pran-emerald animate-pulse" />
              Continuously Monitored
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {REGULATORY_UPDATES.map((update, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-pran-hairline/80 bg-pran-paper/40 p-5 transition-all hover:bg-pran-surface hover:shadow-card hover:border-pran-emerald/40"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-pran-emerald uppercase tracking-wider">
                    {update.framework}
                  </span>
                  <span className="rounded bg-pran-paper-warm px-2 py-0.5 font-medium text-pran-muted">
                    {update.date}
                  </span>
                </div>
                <h4 className="mt-3 font-display text-sm font-bold text-pran-ink leading-snug">
                  {update.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-pran-muted">
                  {update.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Flagship Intelligence Portals */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-content px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-pran-emerald">
              Intelligence Portals
            </span>
            <h2 className="mt-2 font-display text-display-m font-bold text-pran-ink">
              Structured research for every regulatory &amp; operational question.
            </h2>
            <p className="mt-3 text-base text-pran-muted">
              Explore our core reference libraries or deep-dive into sovereign frameworks and empirical essays written by market practitioners.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.slug}
                  className="group relative overflow-hidden rounded-panel border border-pran-hairline bg-pran-surface p-8 sm:p-10 shadow-card transition-all duration-300 hover:border-pran-emerald/50 hover:shadow-float"
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pran-paper-warm text-pran-forest group-hover:bg-emerald-50 group-hover:text-pran-emerald transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="rounded-md bg-pran-paper-warm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-pran-muted">
                            {pillar.badge}
                          </span>
                          <p className="text-xs text-pran-muted mt-0.5">
                            {pillar.stats}
                          </p>
                        </div>
                      </div>

                      <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold text-pran-ink group-hover:text-pran-emerald transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-pran-emerald">
                        {pillar.subtitle}
                      </p>

                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-pran-muted">
                        {pillar.description}
                      </p>

                      <div className="mt-8">
                        <Link
                          href={`/resources/${pillar.slug}`}
                          className={cn(
                            buttonVariants({ size: "default" }),
                            "inline-flex items-center gap-2 bg-pran-ink hover:bg-pran-emerald text-white transition-colors",
                          )}
                        >
                          <span>{pillar.linkText}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center rounded-2xl bg-pran-paper p-6 sm:p-7 border border-pran-hairline">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-pran-ink">
                        Key Coverage &amp; Methodologies
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {pillar.topics.map((t, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-pran-muted"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pran-emerald" />
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Research Briefings */}
      <section className="border-t border-pran-hairline bg-pran-surface py-20">
        <div className="mx-auto max-w-content px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-pran-emerald">
                Thought Leadership
              </span>
              <h2 className="mt-2 font-display text-display-m font-bold text-pran-ink">
                Latest from the PRAN Climate Research Desk
              </h2>
            </div>
            <Link
              href="/resources/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-pran-emerald hover:underline"
            >
              View All {posts.length} Research Essays <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <div
                key={post.slug}
                className="group flex flex-col justify-between rounded-2xl border border-pran-hairline bg-pran-paper/40 p-6 transition-all hover:bg-pran-surface hover:shadow-card hover:border-pran-emerald/40"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-pran-muted">
                    <span className="rounded bg-pran-paper-warm px-2 py-0.5 font-medium text-pran-ink">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingMinutes} min read
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-pran-ink group-hover:text-pran-emerald transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-pran-muted line-clamp-3">
                    {post.standfirst}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-pran-hairline flex items-center justify-between text-xs">
                  <span className="text-pran-muted">{post.published}</span>
                  <Link
                    href={`/resources/blog`}
                    className="inline-flex items-center gap-1 font-semibold text-pran-ink group-hover:text-pran-emerald"
                  >
                    Read Essay <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional CTA */}
      <section className="bg-pran-forest text-white py-16 sm:py-20">
        <div className="mx-auto max-w-content px-6 text-center">
          <h2 className="font-display text-display-m font-bold text-white">
            Have a question on compliance or credit verification?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
            Our regulatory intelligence desk works directly with corporate sustainability executives and auditors to clarify methodology and assurance requirements.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?interest=esg"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold",
              )}
            >
              Ask an Analyst
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-btn border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              View Verified Projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
