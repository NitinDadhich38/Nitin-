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

/**
 * I7 — intent-aware contact. The page already accepted `?interest=`, but showed
 * the same heading to a buyer, a developer and a journalist. Each intent now
 * gets its own framing so the form reads as a continuation of what the visitor
 * was already doing.
 */
const intents: Record<
  string,
  { eyebrow: string; title: string; subtitle: string }
> = {
  purchase: {
    eyebrow: "Purchase request",
    title: "Tell us what you're sourcing.",
    subtitle:
      "Volume, vintage, registry preference and intended use — we'll come back with what's available and firm pricing.",
  },
  list: {
    eyebrow: "List a project",
    title: "Put your project in front of real buyers.",
    subtitle:
      "Send us the registry ID and issuance details. We verify against the registry before anything is listed.",
  },
  reporting: {
    eyebrow: "Carbon intelligence",
    title: "Reporting that survives an audit.",
    subtitle:
      "BRSR, CBAM, ESG or procurement intelligence — tell us which framework you're working to and where you're stuck.",
  },
  demo: {
    eyebrow: "Contact",
    title: "Let's talk carbon.",
    subtitle:
      "Whether you're buying, listing, or reporting — tell us what you need and we'll take it from there.",
  },
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: { interest?: string; project?: string };
}) {
  const defaultInterest = interestMap[searchParams.interest ?? ""] ?? "demo";
  const copy = intents[defaultInterest] ?? intents.demo;

  const defaultMessage = searchParams.project
    ? `I'm interested in purchasing credits from: ${searchParams.project}.\n\nQuantity needed: \nIntended use: `
    : "";

  const points = [
    { icon: MessageSquare, text: "A real person reads every message." },
    { icon: ShieldCheck, text: "Your details are never shared or sold." },
    { icon: Mail, text: "We usually reply within one business day." },
  ];

  return (
    <div className="bg-pran-paper">
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <section className="mx-auto max-w-content px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-h3 font-semibold text-pran-ink">
              What happens next
            </h2>
            <ul className="mt-6 space-y-4">
              {points.map((p) => (
                <li key={p.text} className="flex items-start gap-3">
                  <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-pran-emerald" />
                  <span className="text-[15px] leading-relaxed text-pran-ink">
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-card bg-pran-paper-warm p-5 text-sm text-pran-muted">
              Prefer email? Reach us at{" "}
              <span className="font-medium text-pran-ink">
                hello@pranglobal.com
              </span>
              .
            </p>
          </div>

          <div className="rounded-panel bg-pran-surface p-7 shadow-card sm:p-9">
            <ContactForm
              defaultInterest={defaultInterest}
              defaultMessage={defaultMessage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
