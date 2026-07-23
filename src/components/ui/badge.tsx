import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Status badge — Design.md §4. One component used everywhere for order/project
 * states. Status color at ~10% opacity background with the status color text.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        success: "bg-status-success/10 text-status-success",
        pending: "bg-status-pending/10 text-status-pending",
        danger: "bg-status-danger/10 text-status-danger",
        info: "bg-status-info/10 text-status-info",
        neutral: "bg-pran-muted/10 text-pran-muted",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
