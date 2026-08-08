import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The ledger (5_Design.md v2.1 §3, technique 7).
 *
 * PRAN's whole positioning is "financial infrastructure, not a green brand",
 * and nothing on the site said that visually — every fact was set in a rounded
 * card with a soft shadow, which is the register of a SaaS landing page.
 *
 * A ledger is the opposite: hairlines, tabular figures, right-aligned values,
 * no shadow, no radius on the rows. It looks like a settlement statement
 * because that is what PRAN actually produces. Use it wherever a page has
 * facts that a buyer would otherwise want in a spreadsheet.
 */

export type LedgerRow = {
  label: ReactNode;
  value: ReactNode;
  /** Secondary line under the label — provenance, caveat, unit. */
  note?: ReactNode;
  /** Pull the row out as the total / conclusion line. */
  emphasis?: boolean;
};

export function Ledger({
  rows,
  head,
  caption,
  source,
  tone = "light",
  className,
}: {
  rows: LedgerRow[];
  /** Column headings, e.g. ["Stage", "Days"]. */
  head?: [ReactNode, ReactNode];
  caption?: ReactNode;
  source?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";
  const rule = dark ? "border-white/12" : "border-pran-hairline";

  return (
    <div className={cn("w-full", className)}>
      {head && (
        <div
          className={cn(
            "flex items-baseline justify-between border-b pb-2.5 text-[11px] font-medium uppercase tracking-[0.14em]",
            rule,
            dark ? "text-white/45" : "text-pran-muted",
          )}
        >
          <span>{head[0]}</span>
          <span>{head[1]}</span>
        </div>
      )}

      <dl className="m-0">
        {rows.map((r, i) => (
          <div
            key={i}
            className={cn(
              "flex items-baseline justify-between gap-6 border-b py-3.5",
              rule,
              r.emphasis && (dark ? "border-t border-t-white/25" : "border-t border-t-pran-ink/20"),
            )}
          >
            <dt className="min-w-0">
              <span
                className={cn(
                  "block text-[15px] leading-snug",
                  r.emphasis
                    ? cn("font-semibold", dark ? "text-white" : "text-pran-ink")
                    : dark
                      ? "text-white/80"
                      : "text-pran-ink",
                )}
              >
                {r.label}
              </span>
              {r.note && (
                <span
                  className={cn(
                    "mt-1 block text-[13px] leading-relaxed",
                    dark ? "text-white/45" : "text-pran-muted",
                  )}
                >
                  {r.note}
                </span>
              )}
            </dt>
            <dd
              className={cn(
                "m-0 shrink-0 text-right font-display tabular-nums",
                r.emphasis
                  ? cn(
                      "text-[22px] font-semibold",
                      dark ? "text-pran-lime" : "text-pran-forest",
                    )
                  : cn(
                      "text-[17px] font-medium",
                      dark ? "text-white" : "text-pran-ink",
                    ),
              )}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>

      {(caption || source) && (
        <div className="mt-4">
          {caption && (
            <p
              className={cn(
                "text-[13px] leading-relaxed",
                dark ? "text-white/60" : "text-pran-muted",
              )}
            >
              {caption}
            </p>
          )}
          {source && (
            <p
              className={cn(
                "mt-1.5 text-[11px]",
                dark ? "text-white/40" : "text-pran-muted/70",
              )}
            >
              Source: {source}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
