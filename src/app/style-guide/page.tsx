import type { Metadata } from "next";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, StatCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
};

const swatches: { group: string; items: { name: string; className: string; hex: string; dark?: boolean }[] }[] = [
  {
    group: "Cinematic",
    items: [{ name: "ink", className: "bg-pran-ink", hex: "#0A0A0A", dark: true }],
  },
  {
    group: "Data (primary working colors)",
    items: [
      { name: "teal", className: "bg-pran-teal", hex: "#0F5F5C", dark: true },
      { name: "teal-dark", className: "bg-pran-teal-dark", hex: "#0A403E", dark: true },
      { name: "text", className: "bg-pran-text", hex: "#0F1A1A", dark: true },
      { name: "muted", className: "bg-pran-muted", hex: "#5B6B6A", dark: true },
      { name: "border", className: "bg-pran-border", hex: "#E2E8E7" },
      { name: "paper", className: "bg-pran-paper border border-pran-border", hex: "#FFFFFF" },
    ],
  },
  {
    group: "Trust",
    items: [
      { name: "navy", className: "bg-pran-navy", hex: "#0A1F44", dark: true },
      { name: "gold", className: "bg-pran-gold", hex: "#C9A227" },
    ],
  },
  {
    group: "Status",
    items: [
      { name: "success", className: "bg-status-success", hex: "#1E7A46", dark: true },
      { name: "pending", className: "bg-status-pending", hex: "#B7791F", dark: true },
      { name: "danger", className: "bg-status-danger", hex: "#B42318", dark: true },
      { name: "info", className: "bg-status-info", hex: "#1F6FB2", dark: true },
    ],
  },
  {
    group: "Brand logo (under review vs teal)",
    items: [{ name: "green", className: "bg-pran-green", hex: "#12A33A", dark: true }],
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-pran-border py-12">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-pran-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function StyleGuidePage() {
  return (
    <main className="mx-auto max-w-content px-6 py-16">
      <header className="mb-4">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-pran-muted">
          Internal · visual contract
        </p>
        <h1 className="mt-2 font-display text-h1 font-semibold text-pran-text">
          PRAN Style Guide
        </h1>
        <p className="mt-3 max-w-2xl text-pran-muted">
          Every token, type style, and base component. Review once to lock the
          look before real pages are built. Source: Docs/5_Design.md.
        </p>
      </header>

      <Section title="Logo">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center justify-center rounded-card border border-pran-border bg-white p-10 text-pran-text">
            <Logo className="h-20" />
          </div>
          <div className="flex items-center justify-center rounded-card bg-pran-ink p-10 text-white">
            <Logo className="h-20" />
          </div>
          <div className="flex items-center justify-center rounded-card border border-pran-border bg-white p-10">
            <Logo variant="emblem" className="h-20" />
          </div>
        </div>
        <p className="mt-3 text-sm text-pran-muted">
          Emblem is fixed brand green; wordmark uses currentColor (ink on light,
          white on cinematic dark). Third tile: emblem only.
        </p>
      </Section>

      <Section title="Color">
        <div className="space-y-8">
          {swatches.map((g) => (
            <div key={g.group}>
              <p className="mb-3 text-sm font-medium text-pran-text">{g.group}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {g.items.map((s) => (
                  <div key={s.name} className="overflow-hidden rounded-card border border-pran-border">
                    <div className={`h-16 ${s.className}`} />
                    <div className="bg-white px-3 py-2">
                      <div className="text-sm font-medium text-pran-text">{s.name}</div>
                      <div className="font-mono text-xs text-pran-muted">{s.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-4">
          <p className="font-display text-display font-semibold text-pran-text">
            Growth is life. Numbers over adjectives.
          </p>
          <p className="font-display text-h1 font-semibold text-pran-text">Display serif — Fraunces (H1)</p>
          <p className="font-display text-h2 font-semibold text-pran-text">Section headline (H2)</p>
          <p className="text-h3 font-semibold text-pran-text">Subsection (H3) — Geist</p>
          <p className="text-base text-pran-text">
            Body copy is Geist at 16px minimum. Clean grotesk for all product
            text, tables, filters, and forms.
          </p>
          <p className="text-sm text-pran-muted">Small text — 14px, muted.</p>
          <p className="font-mono text-sm text-pran-text">
            1,240,500 tCO2e · $12.40 · PRAN-ORD-20260723-0001 (mono / tabular)
          </p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary (gold)</Button>
          <Button variant="secondary">Secondary (teal)</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Badges (status)">
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">COMPLETED</Badge>
          <Badge variant="pending">AWAITING_SELLER_TRANSFER</Badge>
          <Badge variant="danger">CANCELLED</Badge>
          <Badge variant="info">INITIATED</Badge>
          <Badge variant="neutral">DRAFT</Badge>
        </div>
      </Section>

      <Section title="Cards & stat cards">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Project card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-pran-muted">
                White surface, subtle border, 12px radius, shadow on hover only.
              </p>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <StatCard value="130+" label="Projects" tone="gold" />
            <StatCard value="16" label="Countries" />
          </div>
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid max-w-md gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-pran-text">
              Company name
            </label>
            <Input placeholder="Acme Pvt. Ltd." />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-pran-text">
              Registry account ID
            </label>
            <Input error placeholder="Required" defaultValue="" />
            <p className="mt-1 text-sm text-status-danger">This field is required.</p>
          </div>
        </div>
      </Section>

      <Section title="Table row (marketplace)">
        <div className="overflow-hidden rounded-card border border-pran-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-pran-paper text-pran-muted">
              <tr className="border-b border-pran-border">
                <th className="px-4 py-3 font-medium">Developer</th>
                <th className="px-4 py-3 font-medium">Registry</th>
                <th className="px-4 py-3 font-medium">Vintage</th>
                <th className="px-4 py-3 text-right font-medium">Available</th>
                <th className="px-4 py-3 text-right font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-pran-border">
                <td className="px-4 py-3 text-pran-text">Aravalli Biochar Co.</td>
                <td className="px-4 py-3 text-pran-text">Verra</td>
                <td className="px-4 py-3 font-mono text-pran-text">2024</td>
                <td className="px-4 py-3 text-right font-mono text-pran-text">12,500</td>
                <td className="px-4 py-3 text-right font-mono text-pran-text">$14.20</td>
                <td className="px-4 py-3"><Badge variant="success">VERIFIED</Badge></td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-pran-text">Sundarbans Mangrove ARR</td>
                <td className="px-4 py-3 text-pran-text">Gold Standard</td>
                <td className="px-4 py-3 font-mono text-pran-text">2023</td>
                <td className="px-4 py-3 text-right font-mono text-pran-text">8,000</td>
                <td className="px-4 py-3 text-right font-mono text-pran-text">$21.00</td>
                <td className="px-4 py-3"><Badge variant="pending">PENDING</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </main>
  );
}
