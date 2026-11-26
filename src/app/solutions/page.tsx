import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Building2,
  Trees,
  Landmark,
  Users2,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Scale,
  Lock,
  FileCheck2,
  Coins,
} from "lucide-react";
import { pageImages } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Institutional Climate Solutions · PRAN",
  description:
    "Institutional settlement rails, regulatory compliance architecture, and verified carbon asset custody for enterprises, project developers, sovereign entities, and institutional buyers.",
};

const AUDIENCES = [
  {
    slug: "enterprise",
    title: "For Enterprise & Corporates",
    badge: "SEBI BRSR CORE & EU CBAM COMPLIANCE",
    icon: Building2,
    lead: "Statutory ESG assurance, Scope 1-3 audit defense, and seamless DvP bilateral escrow settlement for enterprise balance sheets.",
    stats: [
      { label: "BRSR Scope", value: "Top 1,000" },
      { label: "Settlement Risk", value: "0% (Escrowed)" },
      { label: "Audit Assurance", value: "Reasonable" },
    ],
    features: [
      "Serialised registry cancellation certificates tailored for SEBI BRSR Core Principle 6 audits",
      "Direct EU CBAM embedded emissions offset clearing with authenticated registry records",
      "Bilateral delivery-versus-payment (DvP) escrow protecting corporate procurement capital",
      "Tailored forward off-take contracts and spot procurement across 7 global registries",
    ],
    cta: "Explore Enterprise Solutions",
  },
  {
    slug: "developers",
    title: "For Project Developers",
    badge: "DIRECT INSTITUTIONAL SOURCING & ESCROW CLEARING",
    icon: Trees,
    lead: "Monetize verified nature-based and technological carbon credits with zero upfront listing fees and guaranteed buyer liquidity.",
    stats: [
      { label: "Listing Fee", value: "$0 Upfront" },
      { label: "Payment Security", value: "100% Pre-funded" },
      { label: "Buyer Direct", value: "No Middlemen" },
    ],
    features: [
      "Direct access to enterprise balance sheets with pre-funded escrow accounts",
      "Tranche-based listing across multiple vintage years (Issued Spot and Forward delivery)",
      "Zero advisory or broker retainers; success-based settlement fee only upon completion",
      "Automated registry transfer verification and rapid clearance within 2-5 business days",
    ],
    cta: "Explore Developer Solutions",
  },
  {
    slug: "government",
    title: "For Governments & Regulators",
    badge: "SOVEREIGN REGISTRY ARCHITECTURE & ARTICLE 6",
    icon: Landmark,
    lead: "Sovereign carbon accounting infrastructure, Article 6 corresponding adjustments, and double-counting prevention systems.",
    stats: [
      { label: "Article 6", value: "Compliant" },
      { label: "Double Counting", value: "Zero Tolerance" },
      { label: "Data Telemetry", value: "Real-Time" },
    ],
    features: [
      "National registry telemetry synchronization across compliance and voluntary registries",
      "Article 6.2 and 6.4 ITMO validation rails with immutable serial tracking",
      "Rigorous adherence to BEE Carbon Credit Trading Scheme (CCTS) methodologies",
      "Transparent national emission factor integration adhering to CEA & IPCC frameworks",
    ],
    cta: "Explore Sovereign Solutions",
  },
  {
    slug: "public",
    title: "For General Public & Retail",
    badge: "EMPIRICAL FOOTPRINT & RETIREMENT CERTIFICATES",
    icon: Users2,
    lead: "Transparent personal carbon footprint accounting using published CEA grid factors and permanent registry retirements.",
    stats: [
      { label: "Factor Science", value: "IPCC / CEA" },
      { label: "Retirement Proof", value: "Public Serial" },
      { label: "Transparency", value: "100% Public" },
    ],
    features: [
      "Accredited emissions calculation based on Indian regional grid emission coefficients",
      "Direct credit retirements recorded publicly on Verra, Gold Standard, or ICR",
      "Personalized digital retirement certificates with permanent cryptographic serial numbers",
      "Educational breakdowns comparing empirical dietary, travel, and household levers",
    ],
    cta: "Explore Public Solutions",
  },
];

const PILLARS = [
  {
    icon: Lock,
    title: "Bilateral DvP Escrow Rails",
    desc: "Capital is locked in segregated escrow accounts and released only when registry transfers are verified, eliminating settlement and default risk.",
  },
  {
    icon: Scale,
    title: "Statutory Regulatory Alignment",
    desc: "Built from the ground up for SEBI BRSR Core, EU CBAM, and India's CCTS compliance, ensuring seamless acceptance by Big 4 auditors.",
  },
  {
    icon: FileCheck2,
    title: "Immutable Serial Registry Custody",
    desc: "Direct integration with Verra, Gold Standard, ICR, and CDM ensures every transaction reflects verified ownership and zero double-counting.",
  },
  {
    icon: Coins,
    title: "Transparent Indicative Pricing",
    desc: "Pure market execution without hidden 25–40% broker markups. Direct project developer sourcing guarantees authentic price discovery.",
  },
];

export default function SolutionsIndexPage() {
  return (
    <div className="bg-pran-paper">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-pran-forest text-white py-20 sm:py-28">
        <Image
          src={pageImages.marketplaceHero}
          alt="Institutional Climate Infrastructure"
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
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            INSTITUTIONAL MARKET INFRASTRUCTURE
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-display-l font-bold tracking-tight text-white sm:text-display-xl">
            Regulated carbon settlement rails tailored for every market stakeholder.
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/80">
            PRAN replaces opaque bilateral broker chains with transparent escrow clearing,
            strict regulatory assurance, and direct registry integration across corporate,
            developer, and sovereign entities.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/marketplace"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-950/50",
              )}
            >
              Browse Verified Marketplace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact?interest=enterprise"
              className="inline-flex items-center gap-2 rounded-btn border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Request Institutional Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Infrastructure Value Pillars */}
      <section className="border-b border-pran-hairline bg-pran-surface py-14">
        <div className="mx-auto max-w-content px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-pran-hairline/80 bg-pran-paper/50 p-6 transition-all hover:border-pran-emerald/40 hover:bg-pran-surface hover:shadow-card"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-pran-emerald">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-pran-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-pran-muted">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audience Solution Portals Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-content px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-pran-emerald">
              Specialized Solutions
            </span>
            <h2 className="mt-2 font-display text-display-m font-bold text-pran-ink">
              Tailored architecture for each participant in the carbon value chain.
            </h2>
            <p className="mt-3 text-base text-pran-muted">
              Select your organization type to explore regulatory compliance roadmaps, settlement mechanisms, and operational workflows.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {AUDIENCES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-panel border border-pran-hairline bg-pran-surface p-8 shadow-card transition-all duration-300 hover:border-pran-emerald/50 hover:shadow-float"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pran-paper-warm text-pran-forest group-hover:bg-emerald-50 group-hover:text-pran-emerald transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-md bg-pran-paper-warm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-pran-muted">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-bold text-pran-ink group-hover:text-pran-emerald transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-pran-muted">
                      {item.lead}
                    </p>

                    {/* Stats Strip */}
                    <div className="mt-6 grid grid-cols-3 gap-3 rounded-lg bg-pran-paper p-3 text-center">
                      {item.stats.map((st, i) => (
                        <div key={i}>
                          <p className="text-[10px] font-medium uppercase tracking-wider text-pran-muted">
                            {st.label}
                          </p>
                          <p className="mt-0.5 text-sm font-bold text-pran-ink">
                            {st.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Feature Checklist */}
                    <ul className="mt-6 space-y-2.5">
                      {item.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-pran-muted">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pran-emerald" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-pran-hairline">
                    <Link
                      href={`/solutions/${item.slug}`}
                      className="inline-flex w-full items-center justify-between rounded-btn bg-pran-paper-warm px-5 py-3 text-sm font-semibold text-pran-ink transition-all group-hover:bg-pran-emerald group-hover:text-white"
                    >
                      <span>{item.cta}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Institutional CTA Section */}
      <section className="bg-pran-forest text-white py-16 sm:py-20 border-t border-pran-hairline">
        <div className="mx-auto max-w-content px-6 text-center">
          <h2 className="font-display text-display-m font-bold text-white">
            Need custom carbon procurement or developer onboarding?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
            Connect directly with PRAN&rsquo;s institutional climate desk to structure bilateral escrow agreements, portfolio off-takes, or regulatory compliance filings.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?interest=procurement"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold",
              )}
            >
              Contact Institutional Desk
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/resources/compliance-library"
              className="inline-flex items-center gap-2 rounded-btn border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Review Compliance Library
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
