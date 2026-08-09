import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  ShieldCheck,
  Clock,
  ShoppingCart,
  Building2,
  FileBarChart,
  Sparkles,
} from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { DrawnHero, Em, FieldPath } from "@/components/craft/drawn-hero";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { Reveal } from "@/components/marketing/reveal";
import { LinkedInIcon } from "@/components/shared/icons";
import { founder } from "@/lib/leadership";
import { cn } from "@/lib/utils";

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

/**
 * The four doors. The signature visual for this page: a contact form on a white
 * page tells a visitor nothing, but a routed desk tells them we already know
 * there are different kinds of people arriving.
 */
const routes = [
  {
    key: "purchase",
    icon: ShoppingCart,
    title: "Buying credits",
    body: "Sourcing against a target, a client, or a compliance obligation.",
    goes: "Matched against live inventory, quoted firm.",
    href: "/contact?interest=purchase",
  },
  {
    key: "list",
    icon: Building2,
    title: "Listing a project",
    body: "Registry-issued projects only.",
    goes: "Verified against the registry before anything goes live.",
    href: "/contact?interest=list",
  },
  {
    key: "reporting",
    icon: FileBarChart,
    title: "Reporting & intelligence",
    body: "BRSR, CBAM, ESG or procurement support.",
    goes: "Early-access list — these services are in build.",
    href: "/contact?interest=esg",
  },
  {
    key: "demo",
    icon: Sparkles,
    title: "Something else",
    body: "Partnerships, policy, press, or a question.",
    goes: "Read by the founder.",
    href: "/contact?interest=demo",
  },
];

const assurances = [
  { icon: MessageSquare, text: "A real person reads every message." },
  { icon: Clock, text: "We usually reply within one business day." },
  { icon: ShieldCheck, text: "Your details are never shared or sold." },
];

/** Hero field — inbound lines converging on one desk, then routed onward. */
function DeskField() {
  const inbound = [180, 290, 400, 510, 620];
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="dk-glow" cx="70%" cy="50%" r="54%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#dk-glow)" />

      {inbound.map((y, i) => (
        <FieldPath
          key={y}
          d={`M 40 ${y} L 700 ${y} L 980 400`}
          stroke="#d9f99d"
          strokeOpacity="0.32"
          strokeWidth="1.5"
          delay={0.35 + i * 0.12}
        />
      ))}
      {[300, 400, 500].map((y, i) => (
        <FieldPath
          key={`o${y}`}
          d={`M 980 400 L 1180 ${y} L 1400 ${y}`}
          stroke="#ffffff"
          strokeOpacity="0.22"
          strokeWidth="1.5"
          delay={1.1 + i * 0.14}
        />
      ))}
      <circle
        cx="980" cy="400" r="12" fill="#d9f99d"
        className="field-in"
        style={{ "--field-opacity": "0.95", animationDelay: "1.5s" } as CSSProperties}
      />
      <circle
        cx="980" cy="400" r="28" fill="none" stroke="#d9f99d" strokeWidth="1.5"
        className="field-in"
        style={{ "--field-opacity": "0.35", animationDelay: "1.7s" } as CSSProperties}
      />
    </svg>
  );
}

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
        field={<DeskField />}
        actions={
          <>
            <a
              href="mailto:hello@pranglobal.com"
              className="inline-flex items-center gap-2.5 rounded-btn border border-white/25 px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-pran-lime hover:text-pran-lime"
            >
              <Mail className="h-4 w-4" />
              hello@pranglobal.com
            </a>
            <a
              href={founder.linkedin}
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

      {/* ── The routed desk — four doors, and where each one goes ──────── */}
      <ModeBand mode="data" size="md">
        <BandHeader
          eyebrow="The desk"
          title="Four doors. Pick the one that fits."
          sub="Each routes to a different person and a different first question, so you don't spend a paragraph explaining which kind of enquiry this is."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((r, i) => {
            const active = r.key === defaultInterest;
            return (
              <Reveal key={r.key} delay={i * 0.05}>
                <Link
                  href={r.href}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "group flex h-full flex-col p-7 transition-colors",
                    active
                      ? "bg-pran-forest text-white"
                      : "bg-pran-surface hover:bg-pran-paper-warm",
                  )}
                >
                  <r.icon
                    className={cn(
                      "h-5 w-5",
                      active ? "text-pran-lime" : "text-pran-emerald",
                    )}
                  />
                  <h3
                    className={cn(
                      "mt-4 font-display text-h3 font-semibold leading-snug",
                      active ? "text-white" : "text-pran-ink",
                    )}
                  >
                    {r.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 flex-1 text-[15px] leading-relaxed",
                      active ? "text-white/70" : "text-pran-muted",
                    )}
                  >
                    {r.body}
                  </p>
                  <p
                    className={cn(
                      "mt-5 border-t pt-4 text-[13px] leading-relaxed",
                      active
                        ? "border-white/15 text-pran-lime"
                        : "border-pran-hairline text-pran-emerald",
                    )}
                  >
                    {r.goes}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </ModeBand>

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
      </ModeBand>
    </>
  );
}
