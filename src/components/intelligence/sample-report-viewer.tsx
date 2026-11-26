"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ReportTab = "brsr" | "cbam" | "procurement" | "esg";

export function SampleReportViewer() {
  const [activeTab, setActiveTab] = useState<ReportTab>("brsr");

  return (
    <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-6 sm:p-8 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-pran-hairline pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-pran-emerald">
            Sanitized Deliverable Previews
          </span>
          <h3 className="mt-1 font-display text-xl font-bold text-pran-ink">
            Interactive Framework Outputs
          </h3>
          <p className="mt-1 text-xs text-pran-muted">
            Inspect real structural schemas designed to pass external assurance and regulatory scrutiny.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-1 rounded-xl bg-pran-paper p-1">
          {(
            [
              { id: "brsr", label: "SEBI BRSR Core" },
              { id: "cbam", label: "EU CBAM Annex" },
              { id: "procurement", label: "Procurement Diligence" },
              { id: "esg", label: "GRI 305 ESG" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-pran-ink text-white shadow-sm"
                  : "text-pran-muted hover:text-pran-ink",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "brsr" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-pran-emerald">
                SCHEDULE 6.1 · SEBI BRSR CORE ASSURANCE
              </span>
              <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300">
                Reasonable Assurance Ready
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-pran-hairline">
              <table className="w-full text-left text-xs">
                <thead className="bg-pran-paper border-b border-pran-hairline text-pran-muted">
                  <tr>
                    <th className="p-3">Parameter (Principle 6)</th>
                    <th className="p-3">FY 2024-25</th>
                    <th className="p-3">FY 2025-26 (Projected)</th>
                    <th className="p-3">Audit Source &amp; Methodology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pran-hairline">
                  <tr>
                    <td className="p-3 font-medium text-pran-ink">Scope 1 Direct GHG (tCO₂e)</td>
                    <td className="p-3 tabular-nums text-pran-ink">42,850.40</td>
                    <td className="p-3 tabular-nums text-pran-ink">38,120.00</td>
                    <td className="p-3 text-pran-muted">CEA CO₂ Baseline Database v20</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-pran-ink">Scope 2 Market-Based Electricity (tCO₂e)</td>
                    <td className="p-3 tabular-nums text-pran-ink">18,340.15</td>
                    <td className="p-3 tabular-nums text-pran-ink">12,400.00</td>
                    <td className="p-3 text-pran-muted">Grid Emission Factor 0.716 kg/kWh</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-pran-ink">Turnover GHG Intensity (tCO₂e / Cr INR)</td>
                    <td className="p-3 tabular-nums text-pran-ink">14.28</td>
                    <td className="p-3 tabular-nums text-pran-ink">11.65</td>
                    <td className="p-3 text-pran-muted">Audited Balance Sheet Segment Revenue</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-pran-ink">Registered Offsets Retired</td>
                    <td className="p-3 tabular-nums text-emerald-600 dark:text-emerald-400 font-semibold">15,000.00</td>
                    <td className="p-3 tabular-nums text-emerald-600 dark:text-emerald-400 font-semibold">20,000.00</td>
                    <td className="p-3 text-pran-muted">PRAN Escrow Registry Certificate #VCS-5833</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "cbam" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-pran-emerald">
                ANNEX IV · EMBEDDED EMISSIONS (SECTOR: STEEL &amp; ALUMINIUM)
              </span>
              <span className="rounded bg-teal-100 dark:bg-teal-950 px-2 py-0.5 text-[10px] font-semibold text-teal-800 dark:text-teal-300">
                EU Regulation 2023/956 Aligned
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-pran-hairline bg-pran-paper p-4">
                <span className="text-[11px] text-pran-muted">Direct Embedded Specific (SE_direct)</span>
                <p className="mt-1 text-lg font-bold tabular-nums text-pran-ink">1.84 tCO₂e / t</p>
                <span className="text-[10px] text-emerald-600">Within EU benchmark threshold</span>
              </div>
              <div className="rounded-xl border border-pran-hairline bg-pran-paper p-4">
                <span className="text-[11px] text-pran-muted">Indirect Specific (SE_indirect)</span>
                <p className="mt-1 text-lg font-bold tabular-nums text-pran-ink">0.42 tCO₂e / t</p>
                <span className="text-[10px] text-pran-muted">Attributed to supplier PPA</span>
              </div>
              <div className="rounded-xl border border-pran-hairline bg-pran-paper p-4">
                <span className="text-[11px] text-pran-muted">Precursor Carbon Price Paid</span>
                <p className="mt-1 text-lg font-bold tabular-nums text-pran-ink">$0.00 / t</p>
                <span className="text-[10px] text-amber-600 dark:text-amber-400">Subject to CBAM surrender</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "procurement" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-pran-emerald">
                PORTFOLIO ALLOCATION MATRIX · REMOVAL VS AVOIDANCE BLEND
              </span>
              <span className="rounded bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 text-[10px] font-semibold text-indigo-800 dark:text-indigo-300">
                Oxford Offsetting Principles Aligned
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-pran-hairline bg-pran-paper p-4">
                <h5 className="font-semibold text-sm text-pran-ink">Recommended 2026 Allocation</h5>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Short-term Emissions Avoidance (Renewable/Biogas)</span>
                    <span className="font-bold text-pran-ink">60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nature-based Removals (Afforestation/Blue Carbon)</span>
                    <span className="font-bold text-pran-ink">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engineered Permanent Removals (Biochar/CDR)</span>
                    <span className="font-bold text-pran-ink">10%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-pran-hairline bg-pran-paper p-4">
                <h5 className="font-semibold text-sm text-pran-ink">Due Diligence Safeguards</h5>
                <ul className="mt-3 space-y-1.5 text-xs text-pran-muted">
                  <li className="flex items-center gap-1.5 text-pran-ink">
                    <CheckCircle className="h-3.5 w-3.5 text-pran-emerald" />
                    ICVCM Core Carbon Principles (CCP) eligibility test
                  </li>
                  <li className="flex items-center gap-1.5 text-pran-ink">
                    <CheckCircle className="h-3.5 w-3.5 text-pran-emerald" />
                    Buffer pool non-permanence risk scoring
                  </li>
                  <li className="flex items-center gap-1.5 text-pran-ink">
                    <CheckCircle className="h-3.5 w-3.5 text-pran-emerald" />
                    Bilateral DvP Escrow settlement clearing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "esg" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-pran-emerald">
                GRI 305 DISCLOSURE &amp; SDG CO-BENEFIT TELEMETRY
              </span>
              <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300">
                GRI Standards 2024
              </span>
            </div>

            <p className="text-xs text-pran-muted leading-relaxed">
              Automated compilation of Scope 1, Scope 2, and upstream Scope 3 emissions with cross-indexing against United Nations Sustainable Development Goals (SDG 13 Climate Action, SDG 7 Clean Energy, SDG 15 Life on Land).
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-pran-hairline pt-4">
          <p className="text-xs text-pran-muted">
            All outputs undergo mandatory expert review prior to board submission.
          </p>
          <Link
            href="/contact?interest=intelligence"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-pran-emerald hover:underline"
          >
            Request Pilot Data Intake &amp; Sample Report
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
