import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold uppercase tracking-wider text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] select-none rounded-[2px]",
  {
    variants: {
      variant: {
        default:
          "bg-[#8B1E1E] text-white hover:bg-[#721818] font-bold rajasthan-btn-shimmer shadow-sm",
        gold:
          "bg-[#C5A059] text-white hover:bg-[#B38F46] font-bold rajasthan-btn-gold shadow-[0_2px_12px_rgba(197,160,89,0.25)]",
        dark:
          "bg-[#1C1917] text-white hover:bg-[#2C2825] font-bold shadow-sm rajasthan-btn-shimmer",
        secondary:
          "bg-[#F4EFE6] text-[#1C1917] hover:bg-[#EAE4D8] border border-[#E7E2D9] hover:border-[#C5A059]/60 font-bold hover:-translate-y-0.5 transition-all duration-200",
        outline:
          "border border-[#E7E2D9] bg-white text-[#1C1917] hover:border-[#C5A059] hover:text-[#8B1E1E] hover:bg-[#FDFCF7] hover:-translate-y-0.5 transition-all duration-200 shadow-2xs hover:shadow-xs",
        accent:
          "bg-[#8B1E1E] text-white hover:bg-[#721818] font-bold rajasthan-btn-shimmer shadow-sm",
        drop:
          "bg-[#8B1E1E] text-white hover:bg-[#721818] font-bold rajasthan-btn-shimmer shadow-sm",
        destructive:
          "bg-rose-700 text-white hover:bg-rose-800 active:scale-[0.98]",
        ghost:
          "text-[#78716C] hover:bg-[#F4EFE6] hover:text-[#1C1917] active:scale-[0.98]",
        link:
          "text-[#8B1E1E] underline-offset-4 hover:underline lowercase tracking-normal text-sm font-normal",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-[11px]",
        lg: "h-13 px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
