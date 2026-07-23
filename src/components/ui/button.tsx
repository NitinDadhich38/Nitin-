import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — Design.md §4.
 * primary = gold (the ONE main action per screen); secondary = teal fill;
 * outline/ghost = teal, for lower-priority actions. Radius fixed at 8px.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-pran-gold text-pran-navy hover:bg-pran-gold/90",
        secondary: "bg-pran-teal text-white hover:bg-pran-teal-dark",
        outline: "border border-pran-teal text-pran-teal hover:bg-pran-teal/5",
        ghost: "text-pran-teal hover:bg-pran-teal/5",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
