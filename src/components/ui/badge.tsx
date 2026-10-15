import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-semibold tracking-wider uppercase text-[10px] px-2 py-0.5 rounded-[2px] transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-[#1E2230] text-[#F8FAFC] border border-[#2B3044] font-bold shadow-sm",
        volt: "bg-[#D4FF00] text-black font-extrabold tracking-widest shadow-sm",
        voltSubtle: "bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/40 font-bold shadow-xs",
        carbon: "bg-[#12141D] text-[#F8FAFC] border border-[#1E2230] font-bold",
        crimson: "bg-[#EF4444] text-white font-bold shadow-sm",
        crimsonSubtle: "bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/40 font-bold shadow-xs",
        drop: "bg-[#D4FF00] text-black font-extrabold tracking-widest shadow-sm",
        gold: "bg-[#FBBF24] text-black font-bold shadow-sm",
        goldFoil: "bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/40 font-bold shadow-xs",
        indigo: "bg-[#1E40AF] text-white font-bold shadow-sm",
        jodhpur: "bg-[#1E40AF] text-white font-bold shadow-sm",
        jodhpurSubtle: "bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 font-bold shadow-xs",
        secondary: "bg-[#161824] text-[#94A3B8] border border-[#1E2230]",
        outline: "border border-[#1E2230] text-[#94A3B8] bg-[#12141D] font-medium",
        destructive: "bg-rose-700 text-white font-bold",
        dark: "bg-[#090A0F] text-[#F8FAFC] border border-[#1E2230] font-bold",
        accent: "bg-[#D4FF00]/20 text-[#D4FF00] border border-[#D4FF00]/40 font-bold",
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
