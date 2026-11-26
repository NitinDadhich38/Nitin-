"use client";

import { useState } from "react";
import { Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Framework = {
  id: string;
  name: string;
  scope: string;
  regulator: string;
  status: string;
  instruments: string;
  keyBurden: string;
  auditLevel: string;
};

const frameworks: Framework[] = [
  {
    id: "ccts",
    name: "India CCTS",
    scope: "Domestic compliance (energy-intensive industries) + voluntary offset route",
    regulator: "Bureau of Energy Efficiency (BEE) / Ministry of Power",
    status: "Live (ICM Portal operational 2026)",
    instruments: "Carbon Credit Certificates (CCC) traded on power exchanges",
    keyBurden: "Plant-level GHG intensity quantification against baseline targets",
    auditLevel: "Accredited Carbon Verification Agencies (ACV)",
  },
  {
    id: "brsr",
    name: "SEBI BRSR Core",
    scope: "Top 1,000 listed Indian entities by market capitalisation",
    regulator: "Securities and Exchange Board of India (SEBI)",
    status: "Mandatory assurance phased in through FY 2026–27",
    instruments: "Disclosures of Scope 1, 2, 3 footprint & registered offsets",
    keyBurden: "Cross-business unit operational data collection & supply chain footprint",
    auditLevel: "Reasonable assurance by independent environmental auditors",
  },
  {
    id: "cbam",
    name: "EU CBAM",
    scope: "Exporters to EU (Steel, Cement, Aluminium, Fertilizers, Hydrogen, Electricity)",
    regulator: "European Commission",
    status: "Definitive regime active (financial surcharges apply 2026)",
    instruments: "CBAM certificates purchased by EU importers; no generic offsets accepted",
    keyBurden: "Product-level embedded emissions (direct & specific precursor indirect)",
    auditLevel: "EU-accredited independent verification bodies",
  },
  {
    id: "vcmi",
    name: "VCMI Claims Code",
    scope: "Voluntary corporate claims on carbon credit utilisation",
    regulator: "Voluntary Carbon Markets Integrity Initiative",
    status: "Active global standard",
    instruments: "High-integrity voluntary credits (ICVCM CCP-aligned preferred)",
    keyBurden: "Public science-aligned reduction target before making any claim",
    auditLevel: "Public disclosure registry with third-party claims validation",
  },
  {
    id: "iso14068",
    name: "ISO 14068-1",
    scope: "International standard for carbon neutrality and net zero transition",
    regulator: "International Organization for Standardization",
    status: "Published (replaces PAS 2060)",
    instruments: "Permanent carbon removals prioritized for residual emissions",
    keyBurden: "Hierarchy enforcement: measure → decarbonize internal operations → offset only residuals",
    auditLevel: "Independent accredited ISO management system certification",
  },
];

export function ComplianceMatrix() {
  const [selectedId, setSelectedId] = useState<string>("ccts");
  const active = frameworks.find((f) => f.id === selectedId) ?? frameworks[0];

  return (
    <div className="not-prose my-10 rounded-2xl border border-pran-hairline bg-pran-surface p-6 sm:p-8 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-pran-hairline pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pran-emerald">
            <Globe2 className="h-4 w-4" />
            Regulatory Comparison Matrix
          </span>
          <h3 className="mt-1 font-display text-xl font-semibold text-pran-ink">
            Compliance &amp; Reporting Benchmarks
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {frameworks.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedId(f.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                selectedId === f.id
                  ? "bg-pran-ink text-white"
                  : "bg-pran-paper-warm text-pran-muted hover:text-pran-ink",
              )}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Framework Profile */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-2xl font-bold text-pran-ink">
            {active.name}
          </h4>
          <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            {active.status}
          </span>
        </div>
        <p className="mt-2 text-sm text-pran-muted leading-relaxed">
          {active.scope}
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-pran-hairline bg-pran-paper p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
              Administering Body / Regulator
            </span>
            <p className="mt-1 text-sm font-medium text-pran-ink">
              {active.regulator}
            </p>
          </div>

          <div className="rounded-xl border border-pran-hairline bg-pran-paper p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
              Verification &amp; Assurance Standard
            </span>
            <p className="mt-1 text-sm font-medium text-pran-ink">
              {active.auditLevel}
            </p>
          </div>

          <div className="rounded-xl border border-pran-hairline bg-pran-paper p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
              Accepted Instruments / Units
            </span>
            <p className="mt-1 text-sm font-medium text-pran-ink">
              {active.instruments}
            </p>
          </div>

          <div className="rounded-xl border border-pran-hairline bg-pran-paper p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
              Primary Compliance Burden
            </span>
            <p className="mt-1 text-sm font-medium text-pran-ink">
              {active.keyBurden}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
