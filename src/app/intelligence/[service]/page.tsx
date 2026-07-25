import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHeader, Section, Steps, CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";
import { services, getService } from "@/lib/content";

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export function generateMetadata({ params }: { params: { service: string } }): Metadata {
  const s = getService(params.service);
  if (!s) return { title: "Not found" };
  return { title: s.nav, description: s.subtitle };
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const s = getService(params.service);
  if (!s) notFound();

  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      <Section>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-teal">How it works</p>
        <div className="mt-6">
          <Steps steps={s.steps} />
        </div>
      </Section>

      <section className="bg-pran-paper">
        <div className="mx-auto max-w-content px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-teal">What you get</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {s.youGet.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <li className="flex items-start gap-3 rounded-card border border-pran-border bg-white p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-pran-teal" />
                  <span className="text-sm text-pran-text">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl rounded-card border border-pran-border bg-white p-4 text-xs leading-relaxed text-pran-muted">
            {s.note}
          </p>
        </div>
      </section>

      <CtaBand
        title="Request this service"
        subtitle="Tell us your goal — we'll show you exactly how it works for your organisation."
        primary={{ label: "Request Demo", href: `/contact?interest=${s.slug}` }}
        secondary={{ label: "Explore Marketplace", href: "/marketplace" }}
      />
    </>
  );
}
