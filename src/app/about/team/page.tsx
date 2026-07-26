import type { Metadata } from "next";
import { PageHeader, Section, CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "Team",
  description: "The people building PRAN's carbon market infrastructure.",
};

/* REPLACE: real names, roles, photos, and LinkedIn links when provided. */
const team = [
  { initials: "NA", role: "Founder & CEO", bio: "Sets product direction and market strategy." },
  { initials: "CT", role: "Co-Founder & CTO", bio: "Leads engineering and platform architecture." },
  { initials: "AD", role: "Advisor", bio: "Carbon markets and compliance." },
];

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Built by people who take carbon seriously."
        subtitle="Names and photos are being finalised for launch — the structure is ready."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.initials} delay={i * 0.06}>
              <div className="rounded-card border border-pran-border bg-white p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pran-navy font-display text-2xl font-semibold text-pran-gold">
                  {m.initials}
                </div>
                <p className="mt-4 font-medium text-pran-text">Name added at launch</p>
                <p className="text-sm font-medium text-pran-teal">{m.role}</p>
                <p className="mt-2 text-sm text-pran-muted">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Want to work with us?"
        primary={{ label: "Get in touch", href: "/contact" }}
      />
    </>
  );
}
