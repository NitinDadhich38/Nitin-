import type { Metadata } from "next";
import { PageHeader, Prose, Callout } from "@/components/marketing/page-kit";

export const metadata: Metadata = {
  title: "Compliance Framework",
  description:
    "How PRAN handles claims, certificates, and greenwashing risk — and the limits of what PRAN does in the carbon market.",
};

/** ⚠️ LAWYER REVIEW NEEDED — draft for counsel to mark up. Not launch-ready. */
export default function CompliancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Compliance Framework"
        subtitle="The rules we hold ourselves to on claims, certificates, and the limits of our role."
      />
      <Prose>
        <Callout>
          <strong>Draft pending legal review.</strong> This describes
          PRAN&rsquo;s intended operating standard. Regulatory summaries here
          are written in plain English and are not a substitute for the official
          texts or for legal advice.
        </Callout>

        <h2>Language we do not use</h2>
        <p>
          PRAN does not describe any purchase, certificate, or customer as
          &ldquo;carbon neutral&rdquo;, &ldquo;net zero&rdquo;, or
          &ldquo;climate positive&rdquo;. Those are claims about an
          organisation&rsquo;s total footprint, which a credit purchase alone
          cannot substantiate. Regulators in several markets now treat such
          unsubstantiated claims as misleading advertising.
        </p>
        <p>
          What we state instead is the fact of the transaction:{" "}
          <strong>
            &ldquo;purchased and retired X tCO₂e of verified carbon credits for
            [period].&rdquo;
          </strong>
        </p>

        <h2>The limits of our role</h2>
        <ul>
          <li>PRAN lists, facilitates, verifies transfers, and records.</li>
          <li>
            PRAN does not issue, create, or generate credits. Credits exist only
            through a registry.
          </li>
          <li>
            PRAN is not an accredited verifier, validator, auditor, or registry.
          </li>
          <li>
            PRAN is not a broker-dealer, investment adviser, or financial
            advisor, and nothing on this site is investment advice.
          </li>
        </ul>

        <h2>Escrow and settlement integrity</h2>
        <p>
          Funds are held in escrow until the seller has transferred credits into
          the buyer&rsquo;s registry account and PRAN has verified that
          transfer. Payment verification is performed server-side. Credit
          transfer itself is always performed by the seller.
        </p>

        <h2>Frameworks we track</h2>
        <p>
          Our approach is informed by ISO 14068, the VCMI Claims Code of
          Practice, the Integrity Council for the Voluntary Carbon Market&rsquo;s
          Core Carbon Principles, India&rsquo;s Carbon Credit Trading Scheme
          (CCTS), SEBI&rsquo;s BRSR disclosure requirements, and the EU Carbon
          Border Adjustment Mechanism (CBAM). We summarise these in plain
          English rather than reproducing official text.
        </p>

        <h2>Raising a concern</h2>
        <p>
          If you believe a listing, certificate, or claim on this platform is
          inaccurate, <a href="/contact">tell us</a> and we will investigate.
        </p>
      </Prose>
    </>
  );
}
