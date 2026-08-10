import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Prose, Callout, CtaBand } from "@/components/marketing/page-kit";
import { DrawnHero } from "@/components/craft/drawn-hero";
import { ReadingProgress } from "@/components/resources/reading-progress";
import { articles, getArticle } from "@/lib/resources";
import { complianceLinks, voluntaryLinks } from "@/lib/resource-links";
import { posts } from "@/lib/posts";
import { pageImages } from "@/lib/images";
import { CreditedImage, ResourceList } from "@/components/resources/resource-list";
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
  return { title: a.title, description: a.summary };
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== article.slug);

  return (
    <>
      <ReadingProgress />

      <DrawnHero
        eyebrow={`${article.tag} · ${article.readingMinutes} min read`}
        lines={[article.title]}
        sub={article.summary}
        image={pageImages.resourcesHero}
      />

      {/* Editorial two-column: the read, with everything else parked beside it. */}
      <div className="bg-pran-paper">
        <div className="mx-auto grid max-w-content gap-12 px-6 py-16 lg:grid-cols-[1fr_260px] lg:gap-16 lg:py-20">
          <div className="min-w-0">
            <Prose>
              {params.slug === "voluntary-market" && <VoluntaryBody />}
              {params.slug === "compliance-library" && <ComplianceBody />}
              {params.slug === "blog" && <BlogBody />}
            </Prose>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border-t border-pran-hairline pt-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-pran-muted">
                This piece
              </p>
              <dl className="mt-3.5 space-y-2.5 text-[13px]">
                {[
                  ["Type", article.tag],
                  ["Reading time", `${article.readingMinutes} min`],
                  ["Last updated", article.updated],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-pran-muted">{k}</dt>
                    <dd className="m-0 font-medium text-pran-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-9 border-t border-pran-hairline pt-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-pran-muted">
                Keep reading
              </p>
              <ul className="mt-3.5 space-y-3.5">
                {others.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/resources/${a.slug}`}
                      className={cn(
                        "group flex items-start justify-between gap-3 text-[14px] leading-snug",
                        "text-pran-ink hover:text-pran-emerald",
                      )}
                    >
                      <span>{a.title}</span>
                      <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pran-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pran-emerald" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <CtaBand
        title="Ready to look at real supply?"
        subtitle="Browse verified projects across every registry standard on the platform."
        primary={{ label: "Explore Marketplace", href: "/marketplace" }}
        secondary={{ label: "Talk to our team", href: "/contact" }}
      />
    </>
  );
}

function VoluntaryBody() {
  return (
    <>
      <CreditedImage
        src={pageImages.resourcesVoluntary}
        alt="Dense forest canopy seen from above"
      />

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

function ComplianceBody() {
  return (
    <>
      <Callout>
        <strong>Plain-English summaries.</strong> Each framework is described in
        our own words. None of this reproduces official text and none of it is
        legal advice. <em>Terms and conditions applied.</em>
      </Callout>

      <CreditedImage
        src={pageImages.resourcesCompliance}
        alt="Rows of solar panels under an open sky"
      />

      <h2>Where to read the rules yourself</h2>
      <p>
        Compliance markets are created by instruments, not by opinion. Below are
        the primary documents and portals — the scheme notification, the
        administrator, the registry, and the regulators — followed by our
        plain-English summary of what each framework asks of you.
      </p>

      <ResourceList links={complianceLinks} />

      <h2>India&rsquo;s CCTS — the short version</h2>
      <p>
        The Carbon Credit Trading Scheme was notified in June 2023 and is
        administered by the Bureau of Energy Efficiency under the Ministry of
        Power. It has two halves: a <strong>compliance mechanism</strong>, where
        notified energy-intensive sectors are given greenhouse-gas emission
        intensity targets and must surrender certificates if they miss them; and
        an <strong>offset mechanism</strong>, through which non-obligated
        projects can register and earn certificates. Certificates are issued on
        the Indian Carbon Market registry and traded on power exchanges.
      </p>
      <p>
        The Indian Carbon Market Portal went live at Prakriti 2026, the
        Government&rsquo;s international conference on carbon markets. Obligated
        entities register there; the offset side is where most project
        developers will enter.
      </p>

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
        projects.
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

      <h2>The registries and standard-setters</h2>
      <p>
        These are the bodies that actually decide whether a tonne counts. The
        registries hold the serialised record of every issuance and retirement;
        the standard-setters define what may be issued in the first place and
        what a buyer may afterwards claim. If a seller cannot point you to a
        record on one of these, there is nothing to buy.
      </p>

      <ResourceList links={voluntaryLinks} />
    </>
  );
}

function BlogBody() {
  return (
    <>
      <CreditedImage
        src={pageImages.resourcesBlog}
        alt="Open landscape under a wide sky"
      />

      <p>
        Short pieces on market structure, pricing behaviour and integrity as we
        see them across the book — written for people transacting, not for
        search engines.
      </p>

      {/* Full text inline: six posts do not justify a routing layer, and a
          reader on this page came to read, not to pick. */}
      <div className="not-prose mt-12 space-y-px overflow-hidden rounded-panel bg-pran-hairline">
        {posts.map((post, i) => (
          <article key={post.slug} id={post.slug} className="bg-pran-surface p-8 sm:p-10">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-[13px] font-semibold tabular-nums text-pran-emerald">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-pran-muted">
                {post.published} · {post.readingMinutes} min
              </span>
            </div>

            <h2 className="mt-3 max-w-[30ch] font-display text-[clamp(1.35rem,2.6vw,1.85rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-pran-ink">
              {post.title}
            </h2>
            <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-pran-emerald">
              {post.standfirst}
            </p>

            <div className="mt-5 max-w-[64ch] space-y-4">
              {post.paragraphs.map((para, n) => (
                <p key={n} className="text-[15px] leading-relaxed text-pran-muted">
                  {para}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <Callout>
        <strong>Want something specific covered?</strong> A methodology, a price
        movement, a compliance deadline —{" "}
        <Link href="/contact">tell us</Link> and we will write it.
      </Callout>
    </>
  );
}
