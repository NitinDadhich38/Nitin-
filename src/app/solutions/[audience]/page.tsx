import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DrawnHero, Em } from "@/components/craft/drawn-hero";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { BigFigure } from "@/components/craft/big-figure";
import { Ledger } from "@/components/craft/ledger";
import { FlowRail } from "@/components/craft/flow-rail";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBand } from "@/components/marketing/page-kit";
import {
  audienceField,
  ComplianceCalendar,
  MarketShape,
  DietScale,
} from "@/components/solutions/audience-visuals";
import { audiences, getAudience } from "@/lib/content";
import { settlementPath } from "@/lib/page-data";
import { portfolioStats } from "@/lib/marketplace-data";
import { compact } from "@/lib/config";
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

/**
 * /solutions/[audience] — four audiences, four arguments.
 *
 * One route, but deliberately NOT one layout with a colour swapped. Each
 * audience gets its own headline, its own hero field, its own signature
 * figure and its own middle section, because what an enterprise fears
 * (a fixed filing date) and what a developer wants (to get paid) are not the
 * same page with different words.
 */

/** The headline, split for the masked line-by-line reveal. */
const HEADLINE: Record<string, React.ReactNode[]> = {
  enterprise: [
    "Your disclosure deadline",
    <>
      is <Em>already set</Em>.
    </>,
  ],
  developers: [
    "You did the hard part.",
    <>
      Now <Em>get paid</Em> for it.
    </>,
  ],
  government: [
    "Policy sets the target.",
    <>
      <Em>Infrastructure</Em> decides
    </>,
    "whether it's reachable.",
  ],
  public: [
    "You can't manage",
    <>
      what you've <Em>never seen</Em>.
    </>,
  ],
};

const SUB: Record<string, string> = {
  enterprise:
    "The dates are fixed and most of them have already passed. The market you have to buy from is fragmented, opaque and slow — so we built the part that isn't.",
  developers:
    "Registry-issued credits, real corporate buyers, and escrow that pays you on verification rather than on trust.",
  government:
    "Transparent, registry-linked rails with records structured for oversight — so voluntary market activity can actually be seen.",
  public:
    "Estimate your footprint on cited factors in a few minutes. Then, if you choose, retire verified credits against what you can't yet cut.",
};

export default function AudiencePage({
  params,
}: {
  params: { audience: string };
}) {
  const a = getAudience(params.audience);
  if (!a) notFound();

  const Field = audienceField[a.slug];
  const consumer = a.consumer === true;

  return (
    <>
      <DrawnHero
        eyebrow={a.eyebrow}
        lines={HEADLINE[a.slug] ?? [a.title]}
        sub={SUB[a.slug] ?? a.subtitle}
        mode={a.slug === "government" ? "forest" : "cinematic"}
        field={Field ? <Field /> : undefined}
        actions={
          <>
            <Link href={a.primary.href} className={cn(buttonVariants({ size: "lg" }), "group")}>
              {a.primary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/marketplace"
              className="text-[15px] font-medium text-white underline-offset-4 hover:underline"
            >
              See what&rsquo;s listed
            </Link>
          </>
        }
      />

      {/* ── The signature visual — the page's whole argument, drawn ────── */}
      {a.slug === "enterprise" && (
        <ModeBand mode="data" size="lg">
          <BandHeader
            eyebrow="The calendar"
            title="Almost every date has already passed."
            sub="BRSR Core assurance has been widening down the market-cap table since FY 2023–24. CBAM stopped being a reporting exercise in January 2026. India's compliance market is open. None of this is upcoming."
          />
          <div className="mt-14 overflow-x-auto">
            <div className="min-w-[720px]">
              <ComplianceCalendar />
            </div>
          </div>
        </ModeBand>
      )}

      {a.slug === "developers" && (
        <ModeBand mode="data" size="lg">
          <BandHeader
            eyebrow="Settlement"
            title="Where the money is, at every step."
            sub="The buyer's funds are held before you move anything, and released once the registry transfer is verified. Neither side has to trust the other — that is the entire point of escrow."
          />
          <div className="mt-14">
            <FlowRail
              steps={settlementPath}
              caption="Hollow nodes are performed by a person, not a system. PRAN facilitates and verifies the transfer — it never holds or moves credits itself. Commercial terms are quoted per listing."
            />
          </div>
        </ModeBand>
      )}

      {a.slug === "government" && (
        <ModeBand mode="data" size="lg">
          <BandHeader
            eyebrow="What's actually on the rails"
            title="Oversight needs composition, not a headline."
            sub="A total tells you nothing about concentration. This is the live shape of what is listed — by sector, from the same records that back every listing on the marketplace."
          />
          <div className="mt-14 overflow-x-auto">
            <div className="min-w-[680px]">
              <MarketShape />
            </div>
          </div>
        </ModeBand>
      )}

      {a.slug === "public" && (
        <ModeBand mode="warm" size="lg">
          <BandHeader
            eyebrow="Scale"
            title="One ordinary choice, measured."
            sub="Most footprint advice is adjectives. These are published averages for a single lever — diet — to show that the things you actually decide have a size you can compare."
          />
          <div className="mt-14 overflow-x-auto">
            <div className="min-w-[600px]">
              <DietScale />
            </div>
          </div>
        </ModeBand>
      )}

      {/* ── The statement number ───────────────────────────────────────── */}
      <ModeBand mode={consumer ? "data" : "cinematic"} size="lg">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            {a.slug === "enterprise" && (
              <BigFigure
                value="1,000"
                unit="listed companies"
                caption="inside the announced BRSR Core assurance scope by FY 2026–27"
                tone="dark"
                source="SEBI circular on BRSR Core, July 2023"
              />
            )}
            {a.slug === "developers" && (
              <BigFigure
                value={compact(portfolioStats.totalVolume)}
                unit="tCO₂e already listed"
                caption="the book your project would sit alongside"
                tone="dark"
                source="PRAN portfolio, derived"
              />
            )}
            {a.slug === "government" && (
              <BigFigure
                value={portfolioStats.countries}
                unit="countries"
                caption={`across ${portfolioStats.registries} registry standards, on one set of records`}
                tone="dark"
                source="PRAN portfolio, derived"
              />
            )}
            {a.slug === "public" && (
              <BigFigure
                value={portfolioStats.projects}
                unit="verified projects"
                caption="every one issued by a registry, not by us"
                tone="light"
                source="PRAN portfolio, derived"
              />
            )}
          </div>

          <Ledger
            tone={consumer ? "light" : "dark"}
            head={["What's in the way", "Where it hurts"]}
            rows={a.pains.map((p, i) => ({
              label: p,
              value: `0${i + 1}`,
            }))}
            caption="Stated as problems we can defend, not percentages we made up."
          />
        </div>
      </ModeBand>

      {/* ── What PRAN does about it ────────────────────────────────────── */}
      <ModeBand mode={consumer ? "warm" : "data"} size="lg">
        <BandHeader
          eyebrow="The answer"
          title={
            consumer
              ? "Clear numbers, then an honest choice."
              : "What PRAN puts against each one."
          }
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-3">
          {a.helps.map((h, i) => (
            <Reveal key={h} delay={i * 0.06}>
              <li className="flex h-full flex-col bg-pran-surface p-8">
                <span className="font-display text-sm font-semibold tabular-nums text-pran-emerald">
                  0{i + 1}
                </span>
                <p className="mt-4 font-display text-h3 font-semibold leading-snug text-pran-ink">
                  {h}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[84ch] text-[15px] leading-relaxed text-pran-muted">
            PRAN lists registry-issued credits, settles through escrow, and
            records what was purchased and retired. It does not issue credits,
            audit, verify, or advise on carbon price direction.
          </p>
        </Reveal>
      </ModeBand>

      <CtaBand
        title={
          consumer
            ? "Start with your number."
            : a.slug === "developers"
              ? "Bring us your project."
              : "Tell us where you are in the cycle."
        }
        subtitle={
          consumer
            ? "The calculator is free and takes a few minutes."
            : "We'll show you exactly how it works for your organisation."
        }
        primary={a.primary}
        secondary={{ label: "Explore Marketplace", href: "/marketplace" }}
      />
    </>
  );
}
