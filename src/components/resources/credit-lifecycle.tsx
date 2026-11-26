"use client";

import { useState } from "react";
import {
  FileText,
  Search,
  Activity,
  CheckCircle,
  Coins,
  ShieldCheck,
  Ban,
} from "lucide-react";
import { cn } from "@/lib/utils";

const lifecycleSteps = [
  {
    step: "01",
    title: "Design & Baseline",
    icon: FileText,
    actor: "Project Developer",
    summary: "Select an approved registry methodology and calculate the counterfactual emissions baseline.",
    details: "The developer details the project activity, environmental impact, stakeholder consultations, and additionality justification in the Project Design Document (PDD).",
  },
  {
    step: "02",
    title: "Validation",
    icon: Search,
    actor: "Independent Auditor (VVB)",
    summary: "An accredited validation body audits the project plan before implementation.",
    details: "The third-party auditor inspects assumptions, boundary definitions, monitoring plans, and baseline calculations to ensure compliance with the registry standard.",
  },
  {
    step: "03",
    title: "Monitoring",
    icon: Activity,
    actor: "Project Operations",
    summary: "The project runs on the ground and gathers measurable empirical data over a monitoring period.",
    details: "Continuous data collection: meters, satellite radar for biomass growth, grid export invoices, or soil lab samples. All logged with tamper-evident records.",
  },
  {
    step: "04",
    title: "Verification Audit",
    icon: CheckCircle,
    actor: "Accredited Auditor (VVB)",
    summary: "The auditor visits and confirms that reported emission reductions actually occurred.",
    details: "The verification report certifies the exact number of tonnes mitigated during the specific crediting period. Buffer pool deductions are calculated for permanence.",
  },
  {
    step: "05",
    title: "Registry Issuance",
    icon: Coins,
    actor: "Standard Registry (Verra / Gold Standard / ICM)",
    summary: "The registry creates unique serialised credits in the developer's registry account.",
    details: "Every credit is given a unique alphanumeric serial number on the public ledger. It is now a real financial and environmental instrument.",
  },
  {
    step: "06",
    title: "PRAN Escrow Clearing",
    icon: ShieldCheck,
    actor: "PRAN Escrow & Settlement Rails",
    summary: "Buyer funds are placed in escrow; registry serials are verified before settlement.",
    details: "DvP (Delivery vs Payment) prevents double-selling and settlement default. The buyer's money is safe until credits arrive in their registry account.",
  },
  {
    step: "07",
    title: "Final Retirement",
    icon: Ban,
    actor: "Buyer / Registry",
    summary: "Credits are permanently retired on the registry ledger and cannot be resold.",
    details: "The registry marks the serial numbers as retired for a specific corporate beneficiary and period. A public retirement certificate is issued for ESG/BRSR disclosure.",
  },
];

export function CreditLifecycle() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = lifecycleSteps[activeStep];
  const Icon = current.icon;

  return (
    <div className="not-prose my-10 rounded-2xl border border-pran-hairline bg-pran-surface p-6 sm:p-8 shadow-card">
      <div className="border-b border-pran-hairline pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-pran-emerald">
          Interactive Integrity Pipeline
        </span>
        <h3 className="mt-1 font-display text-xl font-semibold text-pran-ink">
          The 7 Stages of a Verified Carbon Credit
        </h3>
        <p className="mt-1 text-xs text-pran-muted">
          Click any stage to inspect the governing actor, methodology checks, and verification milestones.
        </p>
      </div>

      {/* Steps Rail */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {lifecycleSteps.map((item, idx) => {
          const ItemIcon = item.icon;
          const isSelected = activeStep === idx;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(idx)}
              className={cn(
                "flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200",
                isSelected
                  ? "border-pran-emerald bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm"
                  : "border-pran-hairline bg-pran-paper hover:border-pran-emerald/40",
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className={cn("text-[10px] font-mono font-bold", isSelected ? "text-pran-emerald" : "text-pran-muted")}>
                  {item.step}
                </span>
                <ItemIcon className={cn("h-3.5 w-3.5", isSelected ? "text-pran-emerald" : "text-pran-muted")} />
              </div>
              <span className="mt-2 text-xs font-semibold leading-tight text-pran-ink">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Step Spotlight */}
      <div className="mt-6 rounded-xl border border-pran-hairline bg-pran-paper p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pran-emerald text-white shadow-sm">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-pran-emerald">STAGE {current.step}</span>
              <span className="rounded bg-pran-paper-warm px-2 py-0.5 text-[10px] font-semibold text-pran-muted">
                Actor: {current.actor}
              </span>
            </div>
            <h4 className="font-display text-lg font-bold text-pran-ink">
              {current.title}
            </h4>
          </div>
        </div>

        <p className="mt-4 text-sm font-medium text-pran-ink">
          {current.summary}
        </p>
        <p className="mt-2 text-xs text-pran-muted leading-relaxed">
          {current.details}
        </p>

        <div className="mt-4 flex justify-between items-center pt-3 border-t border-pran-hairline text-xs">
          <button
            disabled={activeStep === 0}
            onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
            className="text-pran-muted hover:text-pran-ink disabled:opacity-30 cursor-pointer font-medium"
          >
            ← Previous Stage
          </button>
          <button
            disabled={activeStep === lifecycleSteps.length - 1}
            onClick={() => setActiveStep((p) => Math.min(lifecycleSteps.length - 1, p + 1))}
            className="text-pran-emerald hover:underline disabled:opacity-30 cursor-pointer font-medium inline-flex items-center gap-1"
          >
            Next Stage →
          </button>
        </div>
      </div>
    </div>
  );
}
