"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FlowStep = {
  label: string;
  detail?: ReactNode;
  /** Timing or custody note — surfaced above the node. e.g. "T+2" */
  meta?: string;
  /** Marks the step PRAN performs manually, so the diagram never overclaims. */
  manual?: boolean;
};

export function FlowRail({
  steps,
  tone = "light",
  caption,
  className,
}: {
  steps: FlowStep[];
  tone?: "dark" | "light";
  caption?: ReactNode;
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div className={cn("w-full space-y-8", className)}>
      {/* Visual Dual-Track Escrow Diagram */}
      <div className="rounded-2xl border border-pran-border bg-pran-paper p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pran-border pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-pran-ink">
              Bilateral DvP Escrow Rails · Zero Counterparty Default Risk
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-pran-muted">
            <span className="rounded bg-pran-surface px-2.5 py-1 border border-pran-border font-mono text-[11px]">
              DvP Protocol: T+0 to T+3
            </span>
            <span className="rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-1 font-semibold text-[11px]">
              Segregated Custody
            </span>
          </div>
        </div>

        {/* 6 Step Institutional Visual Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, index) => {
            const isManual = step.manual;
            return (
              <div
                key={step.label}
                className={cn(
                  "relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 hover:shadow-card",
                  index === 2 || index === 5
                    ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800"
                    : "bg-pran-surface border-pran-border",
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-pran-emerald">
                      STAGE 0{index + 1}
                    </span>
                    {step.meta && (
                      <span className="rounded bg-pran-paper px-2 py-0.5 font-mono text-[10px] font-semibold text-pran-muted border border-pran-border">
                        {step.meta}
                      </span>
                    )}
                  </div>

                  <h4 className="mt-3 font-display text-base font-bold text-pran-ink">
                    {step.label}
                  </h4>

                  <p className="mt-2 text-xs text-pran-muted leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-pran-border flex items-center justify-between text-[10px] text-pran-muted font-medium">
                  <span>
                    {index < 2
                      ? "Capital Commitment"
                      : index < 4
                        ? "Custody & Transfer"
                        : "Verification & Release"}
                  </span>
                  <span className="font-semibold text-pran-emerald">
                    {isManual ? "Verified Protocol" : "Automated DvP"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Audit Guarantees Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-pran-border text-xs">
          <div className="rounded-lg bg-pran-surface p-3 border border-pran-border">
            <span className="font-bold text-pran-ink text-xs block">
              1. 100% Pre-Funded Escrow
            </span>
            <p className="text-[11px] text-pran-muted mt-0.5">
              Buyers lock procurement capital before credits are moved, eliminating non-payment risk.
            </p>
          </div>
          <div className="rounded-lg bg-pran-surface p-3 border border-pran-border">
            <span className="font-bold text-pran-ink text-xs block">
              2. Independent Verification
            </span>
            <p className="text-[11px] text-pran-muted mt-0.5">
              PRAN cross-references registry ledger serials before releasing payment or generating certificates.
            </p>
          </div>
          <div className="rounded-lg bg-pran-surface p-3 border border-pran-border">
            <span className="font-bold text-pran-ink text-xs block">
              3. Serialised Retirement Proof
            </span>
            <p className="text-[11px] text-pran-muted mt-0.5">
              Direct issuance of auditor-grade retirement certificates matching SEBI BRSR and EU CBAM criteria.
            </p>
          </div>
        </div>
      </div>

      {caption && (
        <p
          className={cn(
            "text-xs leading-relaxed text-center",
            isDark ? "text-white/60" : "text-pran-muted",
          )}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
