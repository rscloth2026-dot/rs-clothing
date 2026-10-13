import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-semibold tracking-wider uppercase text-[10px] px-2 py-0.5 rounded-[2px] transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-[#F4EFE6] text-[#1C1917] border border-[#E7E2D9] font-bold shadow-sm",
        crimson: "bg-[#8B1E1E] text-white font-bold shadow-sm",
        drop: "bg-[#8B1E1E] text-white font-bold tracking-widest shadow-sm",
        gold: "bg-[#C5A059] text-white font-bold shadow-sm",
        indigo: "bg-[#1D3557] text-white font-bold",
        secondary: "bg-[#F9F7F2] text-[#78716C] border border-[#E7E2D9]",
        outline: "border border-[#E7E2D9] text-[#78716C] bg-white font-medium",
        destructive: "bg-rose-700 text-white font-bold",
        dark: "bg-[#1C1917] text-white font-bold",
        accent: "bg-[#C5A059]/15 text-[#8B1E1E] border border-[#C5A059]/40 font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
