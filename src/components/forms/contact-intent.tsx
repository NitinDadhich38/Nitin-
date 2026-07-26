"use client";

import { useEffect, useState } from "react";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-kit";
import { ContactForm } from "@/components/forms/contact-form";

/**
 * STATIC BRANCH — intent-aware contact, resolved in the browser.
 *
 * On the Next.js branch this read `searchParams` on the server. A static export
 * has no server, so the same `?interest=` / `?project=` contract is read from
 * `location.search` after mount instead. Markup and copy are unchanged; a
 * visitor with no params sees exactly what they saw before.
 */
const interestMap: Record<string, string> = {
  purchase: "purchase",
  demo: "demo",
  list: "list",
  esg: "reporting",
  brsr: "reporting",
  cbam: "reporting",
  procurement: "reporting",
};

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

const points = [
  { icon: MessageSquare, text: "A real person reads every message." },
  { icon: ShieldCheck, text: "Your details are never shared or sold." },
  { icon: Mail, text: "We usually reply within one business day." },
];

export function ContactIntent() {
  const [interest, setInterest] = useState("demo");
  const [project, setProject] = useState("");
  // `key` remounts the form once params are known, so react-hook-form picks up
  // the new defaultValues (it only reads them on first render).
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setInterest(interestMap[q.get("interest") ?? ""] ?? "demo");
    setProject(q.get("project") ?? "");
    setReady(true);
  }, []);

  const copy = intents[interest] ?? intents.demo;
  const defaultMessage = project
    ? `I'm interested in purchasing credits from: ${project}.\n\nQuantity needed: \nIntended use: `
    : "";

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
              key={ready ? `${interest}-${project}` : "initial"}
              defaultInterest={interest}
              defaultMessage={defaultMessage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
