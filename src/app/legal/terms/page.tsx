import type { Metadata } from "next";
import { Prose, Callout } from "@/components/marketing/page-kit";
import { DocHeader } from "@/components/craft/mode-band";
import { pageImages } from "@/lib/images";
import { ReadingProgress } from "@/components/resources/reading-progress";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of the PRAN platform, marketplace listings, and escrow-facilitated carbon credit transactions.",
};

/** ⚠️ LAWYER REVIEW NEEDED — draft for counsel to mark up. Not launch-ready. */
export default function TermsPage() {
  return (
    <>
      <ReadingProgress />
      <DocHeader
        image={pageImages.legalHero}
        eyebrow="Legal"
        title="Terms of Service"
        sub="The terms governing your use of PRAN's platform, marketplace, and escrow-facilitated transactions."
      />
      <Prose>
        <Callout>
          <strong>Plain-English summary.</strong> This page explains, in
          accessible terms, how PRAN&rsquo;s platform, marketplace, and
          escrow-facilitated transactions work. Terms and conditions applied
          — by using PRAN, you agree to the terms set out below.
        </Callout>

        <h2>1. What PRAN is</h2>
        <p>
          PRAN operates a technology platform that lists carbon credit projects,
          facilitates transactions between buyers and sellers, and records those
          transactions. PRAN is a facilitator and infrastructure provider.
        </p>

        <h2>2. What PRAN is not</h2>
        <p>
          PRAN is <strong>not</strong> an accredited verifier, validator,
          auditor, registry, broker-dealer, investment adviser, or financial
          advisor. PRAN does not issue, create, or generate carbon credits.
          Credits exist solely through the registries that issue them, and
          verification is performed by those registries and independent
          third-party bodies.
        </p>

        <h2>3. Listings and information</h2>
        <p>
          Project information, volumes, vintages, and indicative prices are
          provided by sellers and registry records. Indicative prices are not
          firm quotes; final pricing and availability are confirmed at the time
          of a purchase request. PRAN does not warrant the completeness or
          accuracy of seller-supplied information.
        </p>

        <h2>4. How a purchase settles</h2>
        <ol>
          <li>
            You submit a purchase request including your registry account
            details.
          </li>
          <li>PRAN confirms availability and issues a payment instruction.</li>
          <li>
            You pay into PRAN&rsquo;s escrow. Funds are held and are not
            released to the seller at this stage.
          </li>
          <li>
            The seller transfers the credits into your registry account. Credit
            transfer is performed by the seller — PRAN does not move credits.
          </li>
          <li>
            PRAN verifies the transfer, releases funds to the seller, and issues
            your certificate.
          </li>
        </ol>

        <h2>5. Certificates and claims</h2>
        <p>
          Certificates issued by PRAN record a factual event: that a stated
          quantity of verified carbon credits was{" "}
          <strong>purchased and retired</strong> on your behalf for a stated
          period. Certificates do not state, and must not be represented as
          stating, that any organisation, product, or activity is
          &ldquo;carbon neutral&rdquo;, &ldquo;net zero&rdquo;, or
          &ldquo;climate positive&rdquo;. You are responsible for the accuracy
          of any environmental claim you make using a PRAN certificate.
        </p>

        <h2>6. Payments</h2>
        <p>
          Payments are processed by third-party payment providers. All payment
          verification occurs server-side. Fees applicable to a transaction are
          disclosed before you commit to it.
        </p>

        <h2>7. Limitation of liability</h2>
        <p>
          To the extent permitted by law, PRAN&rsquo;s liability arising from
          use of the platform is limited to the fees PRAN received in respect of
          the transaction giving rise to the claim.
        </p>

        <h2>8. Governing law</h2>
        <p>
          These terms are governed by the laws of India. Jurisdiction and
          dispute-resolution provisions are to be settled by counsel.
        </p>

        <h2>9. Contact</h2>
        <p>
          Questions about these terms: <a href="/contact">contact PRAN</a>.
        </p>
      </Prose>
    </>
  );
}
