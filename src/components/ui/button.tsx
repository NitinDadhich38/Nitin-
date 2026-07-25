import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — 5_Design.md v2.0 §3.1.
 * primary = emerald fill (the ONE green button per section); secondary =
 * outline on paper; dark = forest fill for photo backgrounds; ghost/link =
 * emerald text. Flat fills only, no gradients, no scale on hover. Radius 12px.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-pran-emerald text-white hover:bg-pran-emerald-hover",
        secondary:
          "border border-pran-ink/20 bg-transparent text-pran-ink hover:border-pran-ink/40",
        dark: "bg-pran-forest text-white hover:bg-pran-forest-deep",
        outline:
          "border border-pran-ink/20 bg-transparent text-pran-ink hover:border-pran-ink/40",
        ghost: "text-pran-emerald hover:bg-pran-emerald/8",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        default: "h-12 px-7 text-[15px]",
        lg: "h-14 px-8 text-base",
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
