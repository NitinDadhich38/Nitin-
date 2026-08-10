import type { Metadata } from "next";
import { Prose, Callout } from "@/components/marketing/page-kit";
import { DocHeader } from "@/components/craft/mode-band";
import { pageImages } from "@/lib/images";
import { ReadingProgress } from "@/components/resources/reading-progress";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal data PRAN collects, why it is collected, how it is stored, and the rights you have over it.",
};

/**
 * ⚠️⚠️ LAWYER REVIEW NEEDED BEFORE LAUNCH — and before ANY personal data is
 * collected in production, which includes the first live contact-form
 * submission. Expanded 2026-08-09 against a review checklist.
 *
 * India's DPDP Act 2023 requires several things the previous version simply
 * did not have, each now added: a named GRIEVANCE OFFICER (the Act makes this
 * mandatory and it is currently a placeholder), stated RETENTION PERIODS,
 * disclosure of CROSS-BORDER PROCESSING (this app runs on Vercel/Supabase/
 * Resend — all outside India), the right to WITHDRAW CONSENT and to NOMINATE,
 * a BREACH-NOTIFICATION commitment, and a children's-data position.
 *
 * FOUNDER MUST SUPPLY: grievance officer name + email; and confirm the three
 * retention periods, which are placeholders chosen as common practice, not
 * derived from PRAN's actual obligations.
 *
 * NOT YET DISCLOSED, deliberately: the processors are described by function
 * rather than named. Counsel should decide whether to name Vercel, Supabase,
 * Razorpay and Resend explicitly — naming is friendlier and increasingly
 * expected, but it commits us to updating this page on every vendor change.
 *
 * ⚠️ IF ON-PLATFORM KYC IS EVER BUILT, this policy is not sufficient. ID
 * documents are a different sensitivity class and need their own basis,
 * retention rule, and access control. See PRD section 5.
 */
const LAST_UPDATED = "9 August 2026";

export default function PrivacyPage() {
  return (
    <>
      <ReadingProgress />
      <DocHeader
        image={pageImages.legalHero}
        eyebrow="Legal"
        title="Privacy Policy"
        sub="What we collect, why we collect it, and what you can ask us to do with it."
        meta={`Last updated ${LAST_UPDATED}`}
      />
      <Prose>
        <Callout>
          <strong>Plain-English summary.</strong> Prepared in line with
          India&rsquo;s DPDP Act and, where relevant, GDPR. Terms and
          conditions applied.
        </Callout>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Contact details</strong> you submit — name, email,
            organisation, and the message you send us.
          </li>
          <li>
            <strong>Transaction details</strong> — purchase requests, registry
            account identifiers, and records of credits purchased and retired.
          </li>
          <li>
            <strong>Technical data</strong> — basic request logs needed to
            operate and secure the service.
          </li>
        </ul>

        <h2>Why we collect it</h2>
        <p>
          To respond to enquiries, to execute and verify transactions, to issue
          certificates, and to meet record-keeping obligations that apply to
          carbon market transactions.
        </p>

        <h2>What we do not do</h2>
        <p>
          We do not sell personal data. We do not use your data to build
          advertising profiles.
        </p>

        <h2>Storage and processors</h2>
        <p>
          Data is stored with infrastructure providers used to operate the
          platform, including our database, email, and payment processors. Each
          processor receives only the data required to perform its function.
        </p>

        <h2>Where your data is processed</h2>
        <p>
          The platform runs on infrastructure hosted outside India, and some of
          our processors store or process data outside India. Where that
          happens we rely on contractual protections with each processor. If
          you need to know the specific location for a given category of data,
          ask us and we will tell you.
        </p>

        <h2>How long we keep it</h2>
        <ul>
          <li>
            <strong>Enquiries that do not become transactions</strong> —
            [<em>24 months</em>] from last contact, then deleted.
          </li>
          <li>
            <strong>Transaction and certificate records</strong> — retained for
            the period required by applicable tax, accounting, and carbon-market
            record-keeping rules. These cannot be deleted on request while that
            obligation runs.
          </li>
          <li>
            <strong>Technical logs</strong> — [<em>90 days</em>], unless
            retained longer for a specific security investigation.
          </li>
        </ul>

        <h2>Cookies and analytics</h2>
        <p>
          We use only what is needed to operate and secure the site. We do not
          use advertising or cross-site tracking cookies. If we add analytics we
          will update this page before doing so.
        </p>

        <h2>Your rights</h2>
        <p>Subject to the retention rules above, you may ask us to:</p>
        <ul>
          <li>give you access to the personal data we hold about you;</li>
          <li>correct or complete data that is wrong or out of date;</li>
          <li>delete data we no longer have a lawful reason to keep;</li>
          <li>
            withdraw a consent you previously gave — this does not affect
            processing already carried out;
          </li>
          <li>
            nominate someone to exercise these rights on your behalf if you are
            unable to.
          </li>
        </ul>
        <p>
          We will respond within [<em>30 days</em>]. If you are not satisfied
          with our response, you may complain to the Data Protection Board of
          India.
        </p>

        <h2>If something goes wrong</h2>
        <p>
          If a personal data breach occurs, we will notify the Data Protection
          Board and affected individuals as required, without undue delay, and
          tell you what happened and what we are doing about it.
        </p>

        <h2>Children</h2>
        <p>
          The platform is not directed at children and we do not knowingly
          collect their data. If you believe a child has given us personal data,
          contact us and we will delete it.
        </p>

        <h2>Grievance contact</h2>
        <p>
          Questions, requests, or complaints about how we handle personal data
          go to our grievance officer:{" "}
          [<em>name and email to be inserted</em>]. General privacy questions:{" "}
          <a href="/contact">contact PRAN</a>.
        </p>
      </Prose>
    </>
  );
}
