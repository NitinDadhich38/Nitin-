import type { Metadata } from "next";
import { PageHeader, Prose, Callout } from "@/components/marketing/page-kit";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal data PRAN collects, why it is collected, how it is stored, and the rights you have over it.",
};

/** ⚠️ LAWYER REVIEW NEEDED — draft for counsel to mark up. Not launch-ready. */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="What we collect, why we collect it, and what you can ask us to do with it."
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

        <h2>Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          data, subject to records we are required to retain for completed
          transactions. Contact us to make a request.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions or requests: <a href="/contact">contact PRAN</a>.
        </p>
      </Prose>
    </>
  );
}
