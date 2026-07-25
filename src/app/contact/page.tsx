import type { Metadata } from "next";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-kit";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact / Request Demo",
  description:
    "Talk to the PRAN team about carbon procurement, listing a project, or ESG/BRSR/CBAM reporting.",
};

const interestMap: Record<string, string> = {
  purchase: "purchase",
  demo: "demo",
  list: "list",
  esg: "reporting",
  brsr: "reporting",
  cbam: "reporting",
  procurement: "reporting",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: { interest?: string; project?: string };
}) {
  const defaultInterest = interestMap[searchParams.interest ?? ""] ?? "demo";
  const defaultMessage = searchParams.project
    ? `I'm interested in purchasing credits from: ${searchParams.project}.\n\nQuantity needed: \nIntended use: `
    : "";

  const points = [
    { icon: MessageSquare, text: "A real person reads every message." },
    { icon: ShieldCheck, text: "Your details are never shared or sold." },
    { icon: Mail, text: "We usually reply within one business day." },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk carbon."
        subtitle="Whether you're buying, listing, or reporting — tell us what you need and we'll take it from there."
      />

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-h3 font-semibold text-pran-text">
              What happens next
            </h2>
            <ul className="mt-6 space-y-4">
              {points.map((p) => (
                <li key={p.text} className="flex items-start gap-3">
                  <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-pran-teal" />
                  <span className="text-pran-text">{p.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-card border border-pran-border bg-pran-paper p-4 text-sm text-pran-muted">
              Prefer email? Reach us at{" "}
              <span className="font-medium text-pran-text">hello@pranglobal.com</span>.
            </p>
          </div>

          <div className="rounded-card border border-pran-border bg-white p-6 sm:p-8">
            <ContactForm defaultInterest={defaultInterest} defaultMessage={defaultMessage} />
          </div>
        </div>
      </section>
    </>
  );
}
