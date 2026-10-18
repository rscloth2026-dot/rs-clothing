import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-semibold tracking-wider uppercase text-[10px] px-2 py-0.5 rounded-[2px] transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-[#16213E] text-[#F8FAFC] border border-[#1F294D] font-bold shadow-sm",
        neonMint: "bg-[#00FF87] text-[#0A0A1A] font-extrabold tracking-widest shadow-sm",
        neonCyan: "bg-[#60EFFF] text-[#0A0A1A] font-extrabold tracking-widest shadow-sm",
        aurora: "bg-gradient-to-r from-[#00FF87] to-[#60EFFF] text-[#0A0A1A] font-black tracking-widest shadow-sm",
        mintSubtle: "bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/40 font-bold shadow-xs",
        cyanSubtle: "bg-[#60EFFF]/15 text-[#60EFFF] border border-[#60EFFF]/40 font-bold shadow-xs",
        volt: "bg-[#00FF87] text-[#0A0A1A] font-extrabold tracking-widest shadow-sm",
        voltSubtle: "bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/40 font-bold shadow-xs",
        carbon: "bg-[#16213E] text-[#F8FAFC] border border-[#1F294D] font-bold",
        crimson: "bg-[#EF4444] text-white font-bold shadow-sm",
        crimsonSubtle: "bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/40 font-bold shadow-xs",
        drop: "bg-[#00FF87] text-[#0A0A1A] font-extrabold tracking-widest shadow-sm",
        gold: "bg-[#FBBF24] text-black font-bold shadow-sm",
        goldFoil: "bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/40 font-bold shadow-xs",
        indigo: "bg-[#1E40AF] text-white font-bold shadow-sm",
        jodhpur: "bg-[#1E40AF] text-white font-bold shadow-sm",
        jodhpurSubtle: "bg-[#60EFFF]/15 text-[#60EFFF] border border-[#60EFFF]/30 font-bold shadow-xs",
        secondary: "bg-[#16213E] text-[#94A3B8] border border-[#1F294D]",
        outline: "border border-[#1F294D] text-[#94A3B8] bg-[#0A0A1A] font-medium",
        destructive: "bg-rose-700 text-white font-bold",
        dark: "bg-[#0A0A1A] text-[#F8FAFC] border border-[#1F294D] font-bold",
        accent: "bg-gradient-to-r from-[#00FF87] to-[#60EFFF] text-[#0A0A1A] font-extrabold",
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
