"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Lock, Clock, CheckCircle2 } from "lucide-react";

export function EscrowCalculator({
  projectName,
  pranCode,
  priceUsd,
  maxAvailable,
}: {
  projectName: string;
  pranCode: string;
  priceUsd: number | null;
  maxAvailable: number | null;
}) {
  const defaultVolume = maxAvailable ? Math.min(1000, maxAvailable) : 500;
  const [volume, setVolume] = useState<number>(defaultVolume);

  const unitPrice = priceUsd ?? 0;
  const grossAmount = volume * unitPrice;

  const buyHref = `/contact?interest=purchase&project=${encodeURIComponent(
    `${pranCode} — ${projectName} (${volume.toLocaleString()} tCO₂e)`,
  )}`;

  return (
    <div className="rounded-2xl border border-pran-hairline bg-pran-surface p-6 sm:p-7 shadow-card">
      <div className="flex items-center justify-between border-b border-pran-hairline pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pran-emerald">
            <ShieldCheck className="h-4 w-4" />
            Escrow Settlement Calculator
          </span>
          <h3 className="mt-1 font-display text-xl font-semibold text-pran-ink">
            Estimate Landed Procurement
          </h3>
        </div>
        <div className="rounded-lg bg-pran-paper-warm px-2.5 py-1 text-xs font-mono font-medium text-pran-muted">
          {pranCode}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <div className="flex justify-between text-xs font-medium text-pran-ink mb-1.5">
            <span>Procurement Volume</span>
            <span className="tabular-nums font-semibold text-pran-emerald">
              {volume.toLocaleString()} tCO₂e
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={maxAvailable ? Math.min(maxAvailable, 50000) : 10000}
            step={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-pran-emerald cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-pran-muted mt-1">
            <span>100 tCO₂e</span>
            <span>
              {maxAvailable
                ? `${Math.min(maxAvailable, 50000).toLocaleString()} tCO₂e`
                : "10,000 tCO₂e"}
            </span>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="rounded-xl bg-pran-paper p-4 text-xs space-y-2.5">
          <div className="flex justify-between text-pran-muted">
            <span>Indicative Spot Rate</span>
            <span className="font-semibold text-pran-ink tabular-nums">
              {priceUsd ? `$${priceUsd.toFixed(2)} / tCO₂e` : "Quoted on request"}
            </span>
          </div>
          <div className="flex justify-between text-pran-muted">
            <span>Escrow Holding &amp; Verification</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              Included (0% fee)
            </span>
          </div>
          <div className="flex justify-between text-pran-muted">
            <span>Settlement Protocol</span>
            <span className="font-medium text-pran-ink">
              DvP (Delivery vs Payment)
            </span>
          </div>
          <div className="border-t border-pran-hairline pt-2.5 flex justify-between items-baseline">
            <span className="font-semibold text-pran-ink">Estimated Total</span>
            <span className="text-lg font-bold tabular-nums text-pran-ink">
              {priceUsd ? `$${grossAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Bespoke Quote"}
            </span>
          </div>
        </div>

        {/* Escrow Mechanism Assurance */}
        <div className="space-y-2 pt-1 text-[11px] text-pran-muted">
          <div className="flex items-start gap-2">
            <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0 text-pran-emerald" />
            <span>Buyer funds held safely in escrow before seller initiates registry transfer.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-pran-emerald" />
            <span>Credits verified on registry serial ledger before funds are released.</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0 text-pran-emerald" />
            <span>Settlement typically completes within 2 to 5 business days.</span>
          </div>
        </div>

        <Link
          href={buyHref}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-btn bg-pran-emerald px-4 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-pran-emerald-hover"
        >
          <span>Initiate Escrow Allocation</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
