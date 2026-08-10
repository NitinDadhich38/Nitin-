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

/**
 * ⚠️⚠️ LAWYER REVIEW NEEDED BEFORE LAUNCH. This is a structured draft for
 * counsel to mark up, NOT a reviewed instrument. It was expanded 2026-08-09
 * against a contract-review checklist to close the gaps below — but a
 * checklist is not a lawyer, and PRAN holds client money in escrow.
 *
 * THE FOUNDER MUST SUPPLY (placeholders are marked [ ] in the copy):
 *   · the registered entity name as it appears on the CoI, its CIN, and the
 *     registered address — a contract with no identified party is unenforceable
 *   · the seat of arbitration and the forum (s.9 currently says only "India")
 *   · the settlement-failure refund window (s.6 states 10 business days as a
 *     placeholder — confirm it against what the payment provider allows)
 *   · GST treatment of the platform fee, and who bears TDS (s.8)
 *
 * WHAT WAS ADDED 2026-08-09, and why each matters:
 *   s.5 acceptable use · s.6 FAILED SETTLEMENT AND REFUNDS (the single largest
 *   gap — the old terms described the happy path only and said nothing about
 *   what happens when a seller does not transfer) · s.8 taxes · s.10 platform
 *   IP · s.11 warranty disclaimer (there was a liability cap but nothing
 *   disclaiming warranties, which is half a shield) · s.12 user indemnity,
 *   specifically for environmental claims made using a PRAN certificate ·
 *   s.13 force majeure · s.14 sanctions and financial crime · s.15 amendment
 *   and notice · s.16 general (assignment, severability, entire agreement).
 *
 * The visible "lawyer review needed" banner was removed on founder direction
 * (2026-08-01). That decision governs the PAGE COPY only — this comment stays.
 */
const LAST_UPDATED = "9 August 2026";

export default function TermsPage() {
  return (
    <>
      <ReadingProgress />
      <DocHeader
        image={pageImages.legalHero}
        eyebrow="Legal"
        title="Terms of Service"
        sub="The terms governing your use of PRAN's platform, marketplace, and escrow-facilitated transactions."
        meta={`Last updated ${LAST_UPDATED}`}
      />
      <Prose>
        <Callout>
          <strong>Plain-English summary.</strong> PRAN lists carbon credit
          projects and holds your payment in escrow until the seller has
          transferred credits into your own registry account. PRAN never issues
          credits and never holds them. Sections 8 and 15 are the ones to read
          properly: what happens if a settlement fails, and what you are
          responsible for if you make a public claim using a PRAN certificate.
          Terms and conditions applied — by using PRAN, you agree to the terms
          below.
        </Callout>

        <h2>1. Who you are contracting with</h2>
        <p>
          The PRAN platform is operated by [<em>registered entity name</em>], a
          company incorporated in India (CIN [<em>to be inserted</em>]),
          registered office [<em>to be inserted</em>] (&ldquo;PRAN&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). These terms form an agreement
          between you and that entity.
        </p>

        <h2>2. Who may use the platform</h2>
        <p>
          You must be at least 18 years old. If you use the platform on behalf
          of an organisation, you confirm you are authorised to bind that
          organisation, and &ldquo;you&rdquo; means both you and it. The
          platform is offered to businesses and informed individuals — it is
          not a consumer investment product.
        </p>

        <h2>3. What PRAN is</h2>
        <p>
          PRAN operates a technology platform that lists carbon credit projects,
          facilitates transactions between buyers and sellers, and records those
          transactions. PRAN is a facilitator and infrastructure provider.
        </p>

        <h2>4. What PRAN is not</h2>
        <p>
          PRAN is <strong>not</strong> an accredited verifier, validator,
          auditor, registry, broker-dealer, investment adviser, or financial
          advisor. PRAN does not issue, create, or generate carbon credits.
          Credits exist solely through the registries that issue them, and
          verification is performed by those registries and independent
          third-party bodies.
        </p>

        <h2>5. Acceptable use</h2>
        <p>You may not, and may not permit anyone else to:</p>
        <ul>
          <li>
            scrape, harvest, or systematically extract listings, pricing, or
            project data from the platform;
          </li>
          <li>
            copy, resell, or redistribute platform data as your own product;
          </li>
          <li>
            attempt to gain unauthorised access to any account, system, or data,
            or probe or test the platform&rsquo;s security;
          </li>
          <li>
            submit false information, impersonate another person or
            organisation, or misrepresent your authority to transact;
          </li>
          <li>
            use the platform for any unlawful purpose, or in breach of any
            sanctions, anti-money-laundering, or export control law.
          </li>
        </ul>
        <p>
          We may suspend or terminate access for breach of this section, and may
          decline or reverse any transaction we reasonably believe is connected
          to it.
        </p>

        <h2>6. Listings and information</h2>
        <p>
          Project information, volumes, vintages, and indicative prices are
          provided by sellers and registry records. Indicative prices are not
          firm quotes; final pricing and availability are confirmed at the time
          of a purchase request. PRAN does not warrant the completeness or
          accuracy of seller-supplied information.
        </p>

        <h2>7. How a purchase settles</h2>
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

        <h2>8. If a settlement does not complete</h2>
        <p>
          Escrow exists precisely because transfers sometimes fail. Your funds
          are held and are not released to the seller until PRAN has verified
          the credit transfer into your registry account.
        </p>
        <ul>
          <li>
            <strong>Seller does not transfer.</strong> If the seller has not
            completed the transfer within the period stated in your payment
            instruction, you may cancel and we will refund the amount held in
            escrow in full, to the account it came from, within
            [<em>10 business days</em>] of cancellation.
          </li>
          <li>
            <strong>Partial transfer.</strong> If fewer credits are transferred
            than ordered, you may accept the shortfall at a pro-rated price, or
            reject and be refunded in full.
          </li>
          <li>
            <strong>Wrong or unusable credits.</strong> If what arrives does not
            match the listing in project, vintage, standard, or serial range,
            treat it as a failed transfer and tell us before retirement.
          </li>
          <li>
            <strong>After retirement.</strong> Retirement is irreversible by
            design — a retired credit cannot be returned, resold, or reissued.
            Once credits are retired at your instruction the transaction is
            final, so raise any discrepancy before that step.
          </li>
        </ul>
        <p>
          Bank charges, payment-gateway fees, and currency conversion losses on
          a refund are borne by the party whose failure caused the cancellation.
          Where a refund arises from seller default, PRAN will pursue the seller
          for those costs but does not underwrite them.
        </p>

        <h2>9. Certificates and claims</h2>
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

        <h2>10. Payments</h2>
        <p>
          Payments are processed by third-party payment providers. All payment
          verification occurs server-side. Fees applicable to a transaction are
          disclosed before you commit to it.
        </p>

        <h2>11. Taxes</h2>
        <p>
          Prices and fees are exclusive of taxes unless stated otherwise. You
          are responsible for any tax applicable to your purchase, including
          GST and any withholding required in your jurisdiction. Where you are
          required to withhold tax from a payment to PRAN, the amount payable is
          grossed up so that PRAN receives the sum it would have received
          without the withholding. [<em>GST treatment of the platform fee and
          the TDS position to be confirmed by counsel.</em>]
        </p>

        <h2>12. Platform intellectual property</h2>
        <p>
          The platform, its software, design, and compiled datasets are owned by
          PRAN or its licensors. You get a limited, non-exclusive,
          non-transferable right to use the platform for your own carbon
          procurement or listing activity, and nothing more. Registry data
          remains subject to the terms of the registry that publishes it.
        </p>

        <h2>13. No warranties</h2>
        <p>
          The platform is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;. To the extent permitted by law we disclaim all
          implied warranties, including merchantability, fitness for a
          particular purpose, and non-infringement. We do not warrant that the
          platform will be uninterrupted or error-free, that any listing will
          remain available, or that any project will perform as its registry
          documentation projects.
        </p>

        <h2>14. Limitation of liability</h2>
        <p>
          To the extent permitted by law, PRAN&rsquo;s liability arising from
          use of the platform is limited to the fees PRAN received in respect of
          the transaction giving rise to the claim. We are not liable for
          indirect or consequential loss, loss of profit, loss of goodwill, or
          for any regulatory penalty or reputational harm arising from a claim
          you chose to make. Nothing here excludes liability that cannot be
          excluded under Indian law, including for fraud.
        </p>

        <h2>15. Your indemnity</h2>
        <p>
          You will indemnify PRAN against claims, losses, and costs arising from
          your breach of these terms, from information you supplied being false
          or misleading, and — specifically — from any environmental,
          sustainability, or neutrality claim you made using a PRAN certificate
          that goes beyond the factual statement that certificate records. This
          survives termination.
        </p>

        <h2>16. Events outside our control</h2>
        <p>
          We are not liable for failure or delay caused by events beyond our
          reasonable control, including registry outages or suspensions,
          payment-system failure, changes in law, acts of government, natural
          events, or armed conflict. Where such an event prevents a settlement
          completing, section 8 applies.
        </p>

        <h2>17. Sanctions and financial crime</h2>
        <p>
          You confirm that you are not subject to sanctions, and that funds used
          on the platform are not the proceeds of crime. We may request
          verification of identity, source of funds, and beneficial ownership,
          and may refuse, suspend, or unwind a transaction where we are unable
          to satisfy ourselves on those points or where we are required to do
          so by law.
        </p>

        <h2>18. Changes to these terms</h2>
        <p>
          We may update these terms. The version in force is the one published
          here, with its last-updated date at the top of this page. Where a
          change materially affects your rights we will give notice by email to
          the address you last used with us, or by a notice on the platform,
          before it takes effect. Transactions already in escrow are governed by
          the terms in force when the payment instruction was issued.
        </p>

        <h2>19. Suspension and termination</h2>
        <p>
          You may stop using the platform at any time. We may suspend or
          withdraw access where these terms are breached, where we are required
          to by law, or where continued access presents a legal or security
          risk. Sections 9, 13, 14, 15, and 20 survive termination, as do any
          obligations already accrued.
        </p>

        <h2>20. Governing law and disputes</h2>
        <p>
          These terms are governed by the laws of India. Before formal
          proceedings, each party will attempt in good faith to resolve the
          dispute by discussion for 30 days from written notice. Disputes not
          resolved that way will be referred to arbitration under the
          Arbitration and Conciliation Act, 1996, seated at
          [<em>city to be inserted</em>], before a sole arbitrator, in English.
          [<em>Seat, forum, and whether arbitration should be mandatory are for
          counsel to settle.</em>]
        </p>

        <h2>21. General</h2>
        <p>
          You may not assign these terms without our consent; we may assign them
          to a successor of our business. If any provision is held
          unenforceable, the rest stands. These terms, together with the privacy
          policy and any payment instruction issued to you, are the entire
          agreement between us on their subject matter. A failure to enforce a
          provision is not a waiver of it.
        </p>

        <h2>22. Contact</h2>
        <p>
          Questions about these terms: <a href="/contact">contact PRAN</a>.
        </p>
      </Prose>
    </>
  );
}
