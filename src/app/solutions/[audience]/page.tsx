import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";
import {
  ComplianceCalendar,
  MarketShape,
  DietScale,
} from "@/components/solutions/audience-visuals";
import { FlowRail } from "@/components/craft/flow-rail";
import { ProjectTeaser } from "@/components/marketing/project-teaser";
import { audiences, getAudience } from "@/lib/content";
import { settlementPath } from "@/lib/page-data";
import { getProjects, portfolioStats } from "@/lib/marketplace-data";
import { compact } from "@/lib/config";
import { solutionImages } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  return {
    title: `${a.nav} Solutions · Institutional Climate Infrastructure`,
    description: a.subtitle,
  };
}

const SOLUTION_TABS = [
  { slug: "enterprise", label: "For Enterprise & Corporates" },
  { slug: "developers", label: "For Project Developers" },
  { slug: "government", label: "For Governments & Regulators" },
  { slug: "public", label: "For General Public" },
];

const AUDIENCE_BADGES: Record<string, string> = {
  enterprise: "SEBI BRSR CORE & EU CBAM COMPLIANCE",
  developers: "INSTITUTIONAL DEVELOPER LIQUIDITY & ESCROW CLEARING",
  government: "SOVEREIGN REGISTRY INFRASTRUCTURE & ARTICLE 6",
  public: "TRANSPARENT PERSONAL FOOTPRINT & RETIREMENT",
};

const HEADLINES: Record<string, string> = {
  enterprise: "Corporate Decarbonization & Compliance Settlement Rails",
  developers: "Direct Institutional Sourcing & Immediate Escrow Settlement",
  government: "Sovereign Carbon Architecture & Transparent Oversight",
  public: "Transparent Footprint Accounting & Verified Retirement",
};

const SUBTITLES: Record<string, string> = {
  enterprise:
    "Filing deadlines under SEBI BRSR Core and EU CBAM are fixed and active. PRAN replaces opaque broker chains with institutional DvP escrow, verified registry records, and auditor-ready traceability.",
  developers:
    "Monetize registry-issued carbon credits with direct access to institutional buyers. Buyer funds are held in escrow before credits move, to reduce default risk.",
  government:
    "Verifiable market infrastructure with double-counting prevention, Article 6 alignment, and real-time registry synchronization designed for regulatory auditability.",
  public:
    "Calculate your personal footprint using published IPCC and CEA emission factors, and retire verified registry credits with public cancellation certificates.",
};

const COMPARISON_ROWS: Record<
  string,
  { metric: string; legacy: string; pran: string }[]
> = {
  enterprise: [
    {
      metric: "Settlement Risk",
      legacy: "Unsecured wire transfer or unverified broker promise",
      pran: "Bilateral escrow: funds released after registry verification",
    },
    {
      metric: "Pricing Transparency",
      legacy: "Multi-layered broker markups",
      pran: "Direct transparent spot and forward quoting",
    },
    {
      metric: "Auditor Assurance",
      legacy: "Manual PDFs often rejected during statutory ESG audits",
      pran: "Serialised registry cancellation records matching SEBI/BEE standards",
    },
    {
      metric: "Execution Speed",
      legacy: "Weeks of back-and-forth paper agreements",
      pran: "Standardised institutional onboarding and DvP settlement",
    },
  ],
  developers: [
    {
      metric: "Buyer Payment Risk",
      legacy: "Credits transferred on trust before invoices clear",
      pran: "Buyer funds held in escrow before transfer begins",
    },
    {
      metric: "Market Access",
      legacy: "Dependent on local intermediaries taking heavy discounts",
      pran: "Direct access to multinational enterprise balance sheets",
    },
    {
      metric: "Listing Costs",
      legacy: "High upfront broker retainer or advisory fees",
      pran: "Fee terms agreed with each developer before listing",
    },
    {
      metric: "Issuance Flexibility",
      legacy: "Strict requirements to sell entire vintage bundles",
      pran: "Tranche-based listing across multiple vintages and delivery terms",
    },
  ],
  government: [
    {
      metric: "Registry Visibility",
      legacy: "Fragmented private bilateral deals hidden from oversight",
      pran: "Unified telemetry synced to national and international registries",
    },
    {
      metric: "Double-Counting",
      legacy: "High risk of credits claimed in multiple jurisdictions",
      pran: "Serial-level tracking with Article 6 authorization validation",
    },
    {
      metric: "Capital Inflows",
      legacy: "Opaque foreign financial flows with unmonitored leakages",
      pran: "Structured institutional rails enabling domestic climate investment",
    },
    {
      metric: "Standards Compliance",
      legacy: "Mixed quality criteria with subjective verification",
      pran: "Aligned with ICM guidelines and ICVCM Core Carbon Principles",
    },
  ],
  public: [
    {
      metric: "Calculation Grounding",
      legacy: "Generic web estimates without cited scientific factors",
      pran: "Based on IPCC and CEA official grid factor models",
    },
    {
      metric: "Credit Authenticity",
      legacy: "Vague tree-planting promises without serial numbers",
      pran: "Credits issued by recognised global registries",
    },
    {
      metric: "Proof of Impact",
      legacy: "Generic thank-you email without retirement proof",
      pran: "Registry cancellation record in your name",
    },
    {
      metric: "Pricing Honesty",
      legacy: "High marketing markups with pennies reaching the ground",
      pran: "Credit cost shown openly",
    },
  ],
};

const FAQS: Record<string, { q: string; a: string }[]> = {
  enterprise: [
    {
      q: "How does PRAN escrow protect our corporate treasury?",
      a: "Funds deposited for credit procurement are held in a ring-fenced escrow account. PRAN verifies the serialised credit transfer on the issuing registry (Verra, Gold Standard, ICM) into your registry account before releasing funds to the seller. This is designed to avoid paying for unverified credits.",
    },
    {
      q: "Will PRAN documentation satisfy our statutory ESG assurance auditors?",
      a: "Yes, in general. Transactions are supported by an audit package that can include: the original Project Design Document (PDD), independent VVB validation/verification certificates, and registry issuance and retirement serial documentation intended to be compatible with SEBI BRSR Core and EU CBAM standards. Final acceptance rests with your auditors.",
    },
    {
      q: "Can we contract for forward vintages to hedge our compliance targets?",
      a: "Yes. PRAN supports forward allocation agreements where corporate buyers secure future vintages under clear milestone-based delivery terms, to give price certainty ahead of regulatory compliance dates.",
    },
  ],
  developers: [
    {
      q: "What project documentation is required to list on PRAN?",
      a: "We require your registry issuance identifier (e.g. VCS ID, GS ID), standard methodology reference, most recent verification report, and ownership authorization. Once verified, your listings can go live.",
    },
    {
      q: "When and how are project developers paid?",
      a: "Upon confirmation of the registry credit transfer to the buyer's account, escrow funds are disbursed via bank wire according to agreed transaction parameters.",
    },
    {
      q: "Can we list both spot credits and forward issuance tranches?",
      a: "Yes. PRAN’s book supports spot, issued, and forward delivery contracts, enabling you to monetize existing reserves and pre-sell upcoming pipeline vintages.",
    },
  ],
  government: [
    {
      q: "How does PRAN prevent double-counting across domestic and international markets?",
      a: "PRAN maintains serial-level synchronization with issuing registries. When units are surrendered for domestic compliance (such as India CCTS), their international registry serials are retired, to help prevent dual claims under CORSIA or voluntary frameworks.",
    },
    {
      q: "Can PRAN data integrate with sovereign carbon registries?",
      a: "Yes. PRAN's data architecture is structured for API and batch export compliance with national registries (including India’s ICM Portal) and UNFCCC Article 6.2/6.4 reporting formats.",
    },
  ],
  public: [
    {
      q: "What actually happens when I retire carbon credits through PRAN?",
      a: "Your selected credits are cancelled on the issuing registry ledger, which takes the serial numbers out of circulation so they cannot be resold. A retirement certificate is generated with your name and the serial numbers.",
    },
    {
      q: "Why do credit prices vary so significantly on PRAN?",
      a: "Prices reflect real project fundamentals: technology type (permanent carbon removals vs. renewable energy avoidance), location, vintage year, registry standard, and verified United Nations SDG co-benefits.",
    },
  ],
};

export default function AudiencePage({
  params,
}: {
  params: { audience: string };
}) {
  const a = getAudience(params.audience);
  if (!a) notFound();

  const allProjects = getProjects();
  const sampleProjects = allProjects.slice(0, 3);
  const comparisonList =
    COMPARISON_ROWS[a.slug] ?? COMPARISON_ROWS["enterprise"];
  const faqList = FAQS[a.slug] ?? FAQS["enterprise"];

  return (
    <div className="bg-pran-paper">
      {/* Top Navigation Switcher */}
      <div className="border-b border-pran-hairline bg-pran-surface sticky top-16 z-20 shadow-sm">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-2.5 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1.5 min-w-max">
            {SOLUTION_TABS.map((tab) => (
              <Link
                key={tab.slug}
                href={`/solutions/${tab.slug}`}
                className={cn(
                  "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                  a.slug === tab.slug
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
            Browse Marketplace <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-pran-forest text-white py-20 sm:py-28">
        <Image
          src={solutionImages[a.slug]}
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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-300 backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            {AUDIENCE_BADGES[a.slug] ?? "INSTITUTIONAL CLIMATE INFRASTRUCTURE"}
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-display-m sm:text-display-l font-bold tracking-tight text-white">
            {HEADLINES[a.slug] ?? a.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/80">
            {SUBTITLES[a.slug] ?? a.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={a.primary.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-950/50",
              )}
            >
              {a.primary.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-btn border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Explore Live Listings
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="border-b border-pran-hairline bg-pran-surface py-8">
        <div className="mx-auto max-w-content px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
                Scope &amp; Coverage
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-pran-ink">
                {a.slug === "enterprise"
                  ? "1,000+"
                  : a.slug === "developers"
                    ? `${compact(portfolioStats.totalVolume)}`
                    : a.slug === "government"
                      ? `${portfolioStats.countries} Nations`
                      : "Public"}
              </p>
              <p className="text-xs text-pran-muted mt-0.5">
                {a.slug === "enterprise"
                  ? "Listed entities in SEBI scope"
                  : a.slug === "developers"
                    ? "tCO₂e currently on book"
                    : a.slug === "government"
                      ? "Cross-border jurisdiction rails"
                      : "Verified registry serials"}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
                Settlement Rail
              </p>
              <p className="mt-2 text-2xl font-bold tabular-nums text-pran-ink">
                DvP
              </p>
              <p className="text-xs text-pran-muted mt-0.5">
                Bilateral escrow clearing
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
                Standards Connected
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-pran-ink">
                7 Registries
              </p>
              <p className="text-xs text-pran-muted mt-0.5">
                Verra, GS, CDM, ICR, UCR, ICM
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
                Settlement
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-pran-ink">
                Escrow-based
              </p>
              <p className="text-xs text-pran-muted mt-0.5">
                Funds held in escrow
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Argument Visual */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-24">
        <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-6 sm:p-10 shadow-card">
          <div className="border-b border-pran-hairline pb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-pran-emerald">
              Analytical Visual Model
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-pran-ink">
              {a.slug === "enterprise" &&
                "The Compliance Deadline Matrix (BRSR & CBAM)"}
              {a.slug === "developers" &&
                "The Escrow Settlement Architecture"}
              {a.slug === "government" &&
                "Sovereign Registry Composition & Liquidity"}
              {a.slug === "public" && "Empirical Dietary Footprint Scaler"}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-pran-muted">
              {a.slug === "enterprise" &&
                "Mandatory reporting and assurance requirements are already in motion across SEBI, the Bureau of Energy Efficiency, and the European Commission."}
              {a.slug === "developers" &&
                "Funds are secured in escrow prior to credit movement. Payout follows verified registry receipt."}
              {a.slug === "government" &&
                "Composition and concentration analysis of verified carbon mitigation projects by technology and country."}
              {a.slug === "public" &&
                "Compare carbon footprints across empirical peer-reviewed factor models to identify actionable reduction levers."}
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            {a.slug === "enterprise" && <ComplianceCalendar />}
            {a.slug === "developers" && (
              <FlowRail
                steps={settlementPath}
                caption="PRAN facilitates and verifies the transfer through regulated bilateral escrow rails."
              />
            )}
            {a.slug === "government" && <MarketShape />}
            {a.slug === "public" && <DietScale />}
          </div>
        </div>
      </section>

      {/* Strategic Capabilities Grid */}
      <section className="bg-pran-paper-warm py-16 sm:py-24 border-y border-pran-hairline">
        <div className="mx-auto max-w-content px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-pran-emerald">
              Core Capabilities
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-pran-ink">
              Engineered for Auditability &amp; Institutional Governance
            </h2>
            <p className="mt-2 text-sm text-pran-muted">
              Every process is designed to reduce speculative friction,
              manual compliance risks, and opaque price discovery.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {a.helps.map((help, idx) => (
              <div
                key={help}
                className="flex flex-col rounded-2xl border border-pran-hairline bg-pran-surface p-7 shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-pran-ink">
                  {help}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-pran-muted">
                  Fully supported by PRAN&rsquo;s institutional legal and
                  technical diligence protocols, backed by serial registry
                  audit trails.
                </p>

                <div className="mt-6 pt-4 border-t border-pran-hairline space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-pran-ink">
                    <CheckCircle2 className="h-3.5 w-3.5 text-pran-emerald" />
                    <span>Statutory Audit Ready</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-pran-ink">
                    <CheckCircle2 className="h-3.5 w-3.5 text-pran-emerald" />
                    <span>Registry Serialised Records</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison: Legacy Market vs PRAN Institutional Settlement */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-pran-emerald">
            Structural Comparison
          </span>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-pran-ink">
            Legacy Market Friction vs. PRAN Institutional Rails
          </h2>
          <p className="mt-2 text-sm text-pran-muted">
            Why leading enterprises and project developers move their
            transactions to PRAN&rsquo;s escrow clearing.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-pran-hairline bg-pran-surface shadow-card">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-pran-hairline bg-pran-paper">
              <tr>
                <th className="p-4 sm:p-5 font-semibold text-pran-muted uppercase tracking-wider text-xs">
                  Operational Dimension
                </th>
                <th className="p-4 sm:p-5 font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider text-xs">
                  Legacy / Unregulated Broker Channel
                </th>
                <th className="p-4 sm:p-5 font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-xs bg-emerald-50/50 dark:bg-emerald-950/20">
                  PRAN Institutional Rails
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pran-hairline">
              {comparisonList.map((row) => (
                <tr key={row.metric} className="hover:bg-pran-paper/50">
                  <td className="p-4 sm:p-5 font-semibold text-pran-ink">
                    {row.metric}
                  </td>
                  <td className="p-4 sm:p-5 text-pran-muted">{row.legacy}</td>
                  <td className="p-4 sm:p-5 font-medium text-pran-ink bg-emerald-50/30 dark:bg-emerald-950/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pran-emerald shrink-0" />
                      <span>{row.pran}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Featured Projects Relevant to this Audience */}
      <section className="bg-pran-paper-warm py-16 sm:py-24 border-t border-pran-hairline">
        <div className="mx-auto max-w-content px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-pran-emerald">
                Direct Supply Book
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-pran-ink">
                Verified Projects Ready for Settlement
              </h2>
              <p className="mt-2 text-sm text-pran-muted">
                Every project is registered with accredited registries and
                settled via bilateral escrow.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-pran-emerald hover:underline"
            >
              Explore all {portfolioStats.projects} listings{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {sampleProjects.map((p) => (
              <ProjectTeaser key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Institutional FAQ Section */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-pran-emerald">
            Institutional Diligence
          </span>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-pran-ink">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-pran-muted">
            Direct answers to legal, custody, and regulatory compliance
            questions.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {faqList.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-pran-hairline bg-pran-surface p-6 sm:p-7 shadow-card"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-pran-emerald shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-pran-ink">
                    {faq.q}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-pran-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-pran-hairline bg-pran-surface py-16 sm:py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-pran-ink">
            {a.slug === "enterprise"
              ? "Align Your Balance Sheet with Fixed Regulatory Deadlines"
              : a.slug === "developers"
                ? "List Your Registry Credits with Pre-Funded Escrow Liquidity"
                : a.slug === "government"
                  ? "Partner on National Carbon Infrastructure & Article 6 Rails"
                  : "Measure and Neutralize Your Footprint with Registry Units"}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-pran-muted leading-relaxed">
            Our institutional team will walk you through exact pricing, escrow
            settlement mechanics, and auditor documentation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={a.primary.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-pran-emerald hover:bg-pran-emerald-hover text-white font-semibold shadow-md",
              )}
            >
              {a.primary.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/marketplace"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              Explore Live Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
