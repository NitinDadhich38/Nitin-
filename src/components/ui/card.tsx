import * as React from "react";
import { cn } from "@/lib/utils";

/** Card — Design.md §4: white, subtle border, 12px radius, shadow on hover only. */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-pran-border bg-white transition-shadow hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-2", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-h3 font-semibold text-pran-text", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-2", className)} {...props} />;
}

/**
 * Bloomberg-style stat card — NO icons. Large number (display font) + label.
 * Gold is reserved for key numbers; pass tone="gold" for hero metrics.
 */
export function StatCard({
  value,
  label,
  tone = "navy",
  className,
}: {
  value: string;
  label: string;
  tone?: "navy" | "gold";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-pran-border bg-white p-6",
        className,
      )}
    >
      <div
        className={cn(
          "font-display text-4xl font-semibold tabular-nums",
          tone === "gold" ? "text-pran-gold" : "text-pran-navy",
        )}
      >
        {value}
      </div>
      <div className="mt-1 font-mono text-xs uppercase tracking-wider text-pran-muted">
        {label}
      </div>
    </div>
  );
}
