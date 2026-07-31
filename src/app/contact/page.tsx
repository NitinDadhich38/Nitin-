import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  ShieldCheck,
  Clock,
  ShoppingCart,
  Building2,
  FileBarChart,
} from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/marketing/reveal";
import { LinkedInIcon } from "@/components/shared/icons";
import { photos } from "@/lib/images";
import { founder } from "@/lib/leadership";

export const metadata: Metadata = {
  title: "Contact",
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
 * Intent-aware contact. The page accepts `?interest=` so a buyer, a developer
 * and a reporting lead each land on framing that continues what they were
 * already doing rather than a generic form.
 */
const intents: Record<string, { title: string; subtitle: string }> = {
  purchase: {
    title: "Tell us what you're sourcing.",
    subtitle:
      "Volume, vintage, registry preference and intended use — we'll come back with what's available and firm pricing.",
  },
  list: {
    title: "Put your project in front of real buyers.",
    subtitle:
      "Send us the registry ID and issuance details. We verify against the registry before anything is listed.",
  },
  reporting: {
    title: "Reporting that survives an audit.",
    subtitle:
      "BRSR, CBAM, ESG or procurement intelligence — tell us which framework you're working to and where you're stuck.",
  },
  demo: {
    title: "Let's talk carbon.",
    subtitle:
      "Whether you're buying, listing, or reporting — tell us what you need and we'll take it from there.",
  },
};

const routes = [
  {
    icon: ShoppingCart,
    title: "Buying credits",
    body: "Sourcing for a target, a client, or a compliance obligation. We'll match against live inventory and quote firm.",
    href: "/contact?interest=purchase",
  },
  {
    icon: Building2,
    title: "Listing a project",
    body: "Registry-backed projects only. Send the registry ID — we verify against the registry before listing.",
    href: "/contact?interest=list",
  },
  {
    icon: FileBarChart,
    title: "Reporting & intelligence",
    body: "BRSR, CBAM, ESG disclosure, or procurement decision support for a portfolio you already hold.",
    href: "/contact?interest=esg",
  },
];

const assurances = [
  { icon: MessageSquare, text: "A real person reads every message." },
  { icon: Clock, text: "We usually reply within one business day." },
  { icon: ShieldCheck, text: "Your details are never shared or sold." },
];

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

  return (
    <div className="bg-pran-paper">
      {/* Header band with photography */}
      <section className="relative overflow-hidden bg-pran-forest text-white">
        <Image
          src={photos.forestMist}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,14,9,.72) 0%, rgba(5,14,9,.86) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-content px-6 py-20 sm:py-28">
          <Reveal>
            <h1 className="max-w-[18ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-white/70">
              {copy.subtitle}
            </p>

            {/* Direct channels — icon vectors */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="mailto:hello@pranglobal.com"
                className="inline-flex items-center gap-2.5 rounded-btn border border-white/20 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-pran-lime hover:text-pran-lime"
              >
                <Mail className="h-4 w-4" />
                hello@pranglobal.com
              </a>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PRAN on LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-pran-lime hover:text-pran-lime"
              >
                <LinkedInIcon className="h-[17px] w-[17px]" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form + assurances */}
      <section className="mx-auto max-w-content px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
                What happens next
              </h2>
              <ul className="mt-7 space-y-5">
                {assurances.map((p) => (
                  <li key={p.text} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pran-emerald/10">
                      <p.icon className="h-4 w-4 text-pran-emerald" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-pran-ink">
                      {p.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 rounded-card bg-pran-paper-warm p-6">
                <p className="text-sm leading-relaxed text-pran-muted">
                  Founder enquiries, partnerships and press can reach{" "}
                  {founder.name} directly at{" "}
                  <a
                    href={`mailto:${founder.email}`}
                    className="font-medium text-pran-emerald underline underline-offset-4"
                  >
                    {founder.email}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="rounded-panel bg-pran-surface p-7 shadow-float sm:p-9">
              <ContactForm
                defaultInterest={defaultInterest}
                defaultMessage={defaultMessage}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enquiry routes */}
      <section className="border-t border-pran-hairline bg-pran-paper-warm py-20">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="max-w-[22ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              Not sure where you fit?
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {routes.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <Link
                  href={r.href}
                  className="flex h-full flex-col rounded-panel bg-pran-surface p-7 shadow-card transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-float"
                >
                  <r.icon className="h-5 w-5 text-pran-emerald" />
                  <h3 className="mt-4 font-display text-h3 font-semibold text-pran-ink">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-pran-muted">
                    {r.body}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
