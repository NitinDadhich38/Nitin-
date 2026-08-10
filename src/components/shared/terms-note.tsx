"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The site-wide disclosure pattern (founder decision, 2026-08-09).
 *
 * PRAN does not lecture. Qualifications, methodology notes and legal
 * boundaries are NOT printed as paragraphs beside the thing they qualify —
 * they sit behind "Terms and conditions applied", and open as a small card
 * only if the reader asks for them.
 *
 * The wording still has to exist and still has to be accurate; it just is not
 * the loudest thing on the page. Use this anywhere a disclaimer would
 * otherwise be set as body copy.
 */
export function TermsNote({
  children,
  label = "Terms and conditions applied",
  className,
  align = "left",
}: {
  /** The qualification itself. Kept accurate — it is only relocated, never dropped. */
  children: React.ReactNode;
  label?: string;
  className?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-xs text-pran-muted underline decoration-pran-hairline underline-offset-4 transition-colors hover:text-pran-ink hover:decoration-pran-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/50 rounded-sm"
      >
        {label}
      </button>

      {open && (
        <>
          {/* Click-away layer, matching the header dropdown pattern. */}
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            className={cn(
              "absolute bottom-full z-50 mb-2 w-[min(22rem,calc(100vw-2rem))] rounded-card border border-pran-hairline bg-pran-surface p-4 shadow-float",
              align === "right" ? "right-0" : "left-0",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 text-pran-muted transition-colors hover:text-pran-ink"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
            <div className="pr-5 text-xs leading-relaxed text-pran-muted [&_strong]:font-medium [&_strong]:text-pran-ink">
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
