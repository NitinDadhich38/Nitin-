import * as React from "react";
import { cn } from "@/lib/utils";

/** Input — Design.md §4: clean, subtle border, teal focus ring, 8px radius. */
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ className, type, error, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    aria-invalid={error || undefined}
    className={cn(
      "flex h-11 w-full rounded-btn border bg-white px-3 py-2 text-sm text-pran-text placeholder:text-pran-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
      error
        ? "border-status-danger focus-visible:ring-status-danger/50"
        : "border-pran-border focus-visible:ring-pran-teal/60",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
