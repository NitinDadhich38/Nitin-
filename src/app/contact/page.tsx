import type { Metadata } from "next";
import { Mail, MessageSquare, ShieldCheck, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { DrawnHero, Em } from "@/components/craft/drawn-hero";
import { ModeBand } from "@/components/craft/mode-band";
import { Reveal } from "@/components/marketing/reveal";
import { LinkedInIcon, WhatsAppIcon } from "@/components/shared/icons";
import { pranSocial, whatsappLink } from "@/lib/config";
import { pageImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the PRAN team about buying credits, listing a project, or reporting. Tell us which side of the market you're on.",
};

const interestMap: Record<string, string> = {
  purchase: "purchase",
  demo: "demo",
  list: "list",
  esg: "reporting",
  brsr: "reporting",
  cbam: "reporting",
  procurement: "reporting",
  intelligence: "reporting",
};

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
      "Carbon Intelligence is still in build. Tell us which framework you're working to and we'll put you on the early-access list for it.",
  },
  demo: {
    title: "Tell us which side of the market you're on.",
    subtitle:
      "Buying, listing, or reporting — the answer changes who reads this and how fast we can be useful.",
  },
};

const assurances = [
  { icon: MessageSquare, text: "A real person reads every message." },
  { icon: Clock, text: "We usually reply within one business day." },
  { icon: ShieldCheck, text: "Your details are never shared or sold." },
];

export default function ContactPage({
  searchParams,
}: {
  searchParams: { interest?: string; project?: string; irec?: string };
}) {
  const defaultInterest = interestMap[searchParams.interest ?? ""] ?? "demo";
  const copy = intents[defaultInterest] ?? intents.demo;

  /* I-RECs are quoted in MWh and are not carbon credits, so a request that
     starts from an I-REC card never uses the credit wording. */
  const defaultMessage = searchParams.irec
    ? `I'm interested in purchasing I-RECs from: ${searchParams.irec}.\n\nVolume needed (MWh): \nDelivery period: `
    : searchParams.project
      ? `I'm interested in purchasing credits from: ${searchParams.project}.\n\nQuantity needed: \nIntended use: `
      : "";

  return (
    <>
      <DrawnHero
        eyebrow="Contact"
        lines={[
          "Tell us which side",
          <>
            of the market <Em>you&rsquo;re on</Em>.
          </>,
        ]}
        sub={copy.subtitle}
        image={pageImages.contactHero}
        actions={
          <>
            <a
              href={`mailto:${pranSocial.email}`}
              className="inline-flex items-center gap-2.5 rounded-btn border border-white/25 px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-pran-lime hover:text-pran-lime"
            >
              <Mail className="h-4 w-4" />
              {pranSocial.email}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-btn border border-white/25 px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-pran-lime hover:text-pran-lime"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={pranSocial.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PRAN on LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors hover:border-pran-lime hover:text-pran-lime"
            >
              <LinkedInIcon className="h-[17px] w-[17px]" />
            </a>
          </>
        }
      />

      {/* ── The form ───────────────────────────────────────────────────── */}
      <ModeBand mode="warm" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="max-w-[16ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
                {copy.title}
              </h2>
              <ul className="mt-8 space-y-5">
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
              <div className="mt-10 rounded-card bg-pran-surface p-6 shadow-card">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-pran-muted">
                  Reach us directly
                </p>
                <div className="mt-4 space-y-3">
                  <a
                    href={`mailto:${pranSocial.email}`}
                    className="group flex items-center gap-3 text-[15px] text-pran-ink hover:text-pran-emerald"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pran-emerald/10">
                      <Mail className="h-4 w-4 text-pran-emerald" />
                    </span>
                    {pranSocial.email}
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-[15px] text-pran-ink hover:text-pran-emerald"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pran-emerald/10">
                      <WhatsAppIcon className="h-4 w-4 text-pran-emerald" />
                    </span>
                    {pranSocial.whatsappDisplay}
                  </a>
                  <a
                    href={pranSocial.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-[15px] text-pran-ink hover:text-pran-emerald"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pran-emerald/10">
                      <LinkedInIcon className="h-4 w-4 text-pran-emerald" />
                    </span>
                    PRAN on LinkedIn
                  </a>
                </div>
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
      </ModeBand>
    </>
  );
}
