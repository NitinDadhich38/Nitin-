import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, AlertCircle } from "lucide-react";
import { PageHeader, Section, CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";
import { audiences, getAudience } from "@/lib/content";

export function generateStaticParams() {
  return audiences.map((a) => ({ audience: a.slug }));
}

export function generateMetadata({ params }: { params: { audience: string } }): Metadata {
  const a = getAudience(params.audience);
  if (!a) return { title: "Not found" };
  return { title: a.nav, description: a.subtitle };
}

export default function AudiencePage({ params }: { params: { audience: string } }) {
  const a = getAudience(params.audience);
  if (!a) notFound();

  return (
    <>
      <PageHeader
        eyebrow={a.eyebrow}
        title={a.title}
        subtitle={a.subtitle}
        tone={a.consumer ? "light" : "dark"}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-muted">The challenge</p>
            <ul className="mt-5 space-y-3">
              {a.pains.map((p, i) => (
                <Reveal key={p} delay={i * 0.05}>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-pran-muted" />
                    <span className="text-pran-text">{p}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-teal">How PRAN helps</p>
            <ul className="mt-5 space-y-3">
              {a.helps.map((h, i) => (
                <Reveal key={h} delay={i * 0.05}>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-pran-teal" />
                    <span className="text-pran-text">{h}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand
        title={a.consumer ? "Calculate your footprint" : "See PRAN for your organisation"}
        subtitle={
          a.consumer
            ? "It takes a few minutes. Reduce first, then offset what you can't yet cut."
            : "Book a walkthrough tailored to your goals."
        }
        primary={a.primary}
        secondary={a.consumer ? { label: "Explore Marketplace", href: "/marketplace" } : { label: "Open the Calculator", href: "/calculator" }}
      />
    </>
  );
}
