import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  PageHeader,
  Prose,
  Callout,
  CtaBand,
} from "@/components/marketing/page-kit";
import { articles, getArticle, glossary } from "@/lib/resources";

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
  return { title: a.title, description: a.summary };
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${article.tag} · ${article.readingMinutes} min read`}
        title={article.title}
        subtitle={article.summary}
      />

      <Prose>
        <p>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 !text-pran-muted !no-underline hover:!text-pran-emerald"
          >
            <ArrowLeft className="h-4 w-4" /> All resources
          </Link>
        </p>

        {params.slug === "glossary" && <GlossaryBody />}
        {params.slug === "voluntary-market" && <VoluntaryBody />}
        {params.slug === "ccts" && <CctsBody />}
        {params.slug === "compliance-library" && <ComplianceBody />}
        {params.slug === "blog" && <BlogBody />}

        <p className="!mt-12 text-sm !text-pran-muted">
          Last updated {article.updated}.
        </p>
      </Prose>

      <CtaBand
        title="Ready to look at real supply?"
        subtitle="Browse verified projects across six registry standards and twenty countries."
        primary={{ label: "Explore Marketplace", href: "/marketplace" }}
        secondary={{ label: "Talk to our team", href: "/contact" }}
      />
    </>
  );
}

function GlossaryBody() {
  return (
    <>
      <p>
        The vocabulary of carbon markets is doing real work — each of these
        terms changes what a credit is worth and what you can say about it.
      </p>
      <dl className="mt-10 space-y-6">
        {glossary.map((g) => (
          <div
            key={g.term}
            className="border-t border-pran-hairline pt-5 first:border-t-0 first:pt-0"
          >
            <dt className="font-display text-h3 font-semibold text-pran-ink">
              {g.term}
            </dt>
            <dd className="mt-1.5 leading-[1.75] text-pran-muted">
              {g.definition}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function VoluntaryBody() {
  return (
    <>
      <h2>What a carbon credit actually is</h2>
      <p>
        One credit represents one tonne of carbon dioxide equivalent
        (tCO₂e) either kept out of the atmosphere or removed from it. It only
        becomes a credit when an approved methodology has been followed, an
        independent body has verified the result, and a registry has issued
        serialised units.
      </p>

      <h2>The life of a credit</h2>
      <ol>
        <li>
          <strong>Design.</strong> A developer selects a methodology and models
          a baseline — what emissions would have been without the project.
        </li>
        <li>
          <strong>Validation.</strong> An independent auditor checks the design
          before the project starts.
        </li>
        <li>
          <strong>Monitoring.</strong> The project runs and measures actual
          performance over a defined period.
        </li>
        <li>
          <strong>Verification.</strong> A third-party auditor confirms the
          measured reductions.
        </li>
        <li>
          <strong>Issuance.</strong> The registry creates serialised credits for
          that vintage.
        </li>
        <li>
          <strong>Transfer and retirement.</strong> A buyer acquires the credits
          and retires them, permanently cancelling them so they can never be
          resold or claimed again.
        </li>
      </ol>

      <h2>Avoidance versus removal</h2>
      <p>
        Avoidance credits represent emissions that were prevented — a wind farm
        displacing coal generation. Removal credits represent carbon physically
        taken out of the atmosphere and stored — afforestation, biochar,
        engineered capture. They are not interchangeable, and the market prices
        them very differently.
      </p>

      <h2>Why prices vary so widely</h2>
      <p>
        Across PRAN&rsquo;s own book, credits range from well under a dollar to
        several hundred dollars per tonne. That spread is not arbitrary. It
        reflects permanence, additionality, co-benefits, registry standard,
        vintage, and scarcity. A bundled renewable-energy credit from an older
        vintage and a verified community forestry removal are different
        products that happen to share a unit.
      </p>

      <h2>Where the market breaks</h2>
      <p>
        The failure points are consistent: opaque pricing, manual settlement,
        credits transferred on trust before payment clears, and claims that
        outrun what the underlying credit supports. Infrastructure — escrow,
        verifiable records, honest price disclosure — is what closes those gaps.
      </p>

      <Callout>
        <strong>On claims.</strong> Retiring credits lets you state a fact:
        that a quantity of verified credits was purchased and retired for a
        period. It does not by itself support a &ldquo;carbon neutral&rdquo; or
        &ldquo;net zero&rdquo; claim about an organisation, and regulators
        increasingly treat those claims as misleading when unsubstantiated.
      </Callout>
    </>
  );
}

function CctsBody() {
  return (
    <>
      <Callout>
        <strong>Plain-English summary — verify before relying on it.</strong>{" "}
        This is a general orientation to India&rsquo;s scheme, not legal advice,
        and the rules continue to develop. Confirm specifics against official
        sources before acting.{" "}
        <em>Terms and conditions applied.</em>
      </Callout>

      <h2>What the CCTS is</h2>
      <p>
        India&rsquo;s Carbon Credit Trading Scheme establishes a domestic carbon
        market with a tradable credit. It builds on the country&rsquo;s earlier
        energy-efficiency and renewable-certificate schemes, moving from
        sector-specific instruments toward a single carbon unit.
      </p>

      <h2>The two mechanisms</h2>
      <p>
        The scheme is generally structured around a{" "}
        <strong>compliance mechanism</strong>, under which notified entities in
        energy-intensive sectors are given emission-intensity targets and must
        surrender credits if they exceed them, and an{" "}
        <strong>offset mechanism</strong>, which allows entities outside the
        compliance perimeter to register projects and generate credits
        voluntarily.
      </p>

      <h2>Why it matters commercially</h2>
      <p>
        A domestic compliance market changes demand structurally. Obligated
        entities become buyers because they must be, not because they choose to
        be — which tends to firm up pricing and raise the value of credible
        domestic supply.
      </p>

      <h2>What it means for buyers today</h2>
      <ul>
        <li>
          Understand whether your organisation falls inside the compliance
          perimeter.
        </li>
        <li>
          Keep compliance units and voluntary credits accounted for separately.
        </li>
        <li>
          Track how credits are treated for international claims, particularly
          where corresponding adjustments apply.
        </li>
      </ul>
    </>
  );
}

function ComplianceBody() {
  return (
    <>
      <Callout>
        <strong>Plain-English summaries.</strong> Each framework is described in
        our own words. None of this reproduces official text and none of it is
        legal advice. <em>Terms and conditions applied.</em>
      </Callout>

      <h2>BRSR — Business Responsibility and Sustainability Report</h2>
      <p>
        India&rsquo;s listed-company disclosure format, administered by SEBI. It
        asks for structured reporting across environmental, social and
        governance principles, including energy and emissions data. The
        practical burden is data collection across business units rather than
        the narrative itself.
      </p>

      <h2>CBAM — Carbon Border Adjustment Mechanism</h2>
      <p>
        An EU measure that prices the emissions embedded in certain imported
        goods, so that imports face a carbon cost comparable to EU production.
        For exporters the immediate requirement is credible product-level
        embedded-emissions data — which most supply chains cannot yet produce.
      </p>

      <h2>CCTS — Carbon Credit Trading Scheme</h2>
      <p>
        India&rsquo;s domestic carbon market, covering both a compliance
        mechanism for notified sectors and an offset mechanism for voluntary
        projects. See the <Link href="/resources/ccts">CCTS explainer</Link>.
      </p>

      <h2>ISO 14068</h2>
      <p>
        The international standard governing carbon-neutrality claims. It sets a
        hierarchy: measure, reduce, and only then offset residual emissions —
        and it constrains what an organisation may claim as a result.
      </p>

      <h2>VCMI Claims Code of Practice</h2>
      <p>
        Guidance on what a company may credibly say when it uses carbon credits,
        including prerequisites such as having a science-aligned reduction
        target and disclosing progress against it before making any claim.
      </p>

      <h2>ICVCM Core Carbon Principles</h2>
      <p>
        A quality threshold applied on the supply side, assessing methodologies
        against criteria including additionality, permanence, robust
        quantification, and sound governance.
      </p>
    </>
  );
}

function BlogBody() {
  return (
    <>
      <div className="!mt-4 rounded-panel border border-dashed border-pran-hairline bg-pran-paper-warm p-10 text-center">
        <span className="inline-block rounded-[14px] bg-pran-ink px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-white">
          Coming soon
        </span>
        <h2 className="!mt-5 font-display text-h2 font-semibold text-pran-ink">
          Notes from the desk
        </h2>
        <p className="mx-auto !mt-3 max-w-[52ch]">
          Short pieces on market structure, pricing behaviour, and integrity as
          we observe them across the book — written for people transacting, not
          for search engines. The first pieces are being written now.
        </p>
      </div>
      <Callout>
        <strong>Want something specific covered?</strong> A methodology, a price
        movement, a compliance deadline —{" "}
        <Link href="/contact">tell us</Link> and we will write it.
      </Callout>
    </>
  );
}
