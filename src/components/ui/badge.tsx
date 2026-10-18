import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-semibold tracking-wider uppercase text-[10px] px-2 py-0.5 rounded-[2px] transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium shadow-xs",
        neonMint: "bg-white text-black font-extrabold tracking-widest shadow-xs",
        neonCyan: "bg-zinc-200 text-black font-bold tracking-widest shadow-xs",
        aurora: "bg-white text-black font-extrabold tracking-widest shadow-xs",
        mintSubtle: "bg-zinc-800/80 text-zinc-200 border border-zinc-700 font-semibold shadow-xs",
        cyanSubtle: "bg-zinc-800/80 text-zinc-200 border border-zinc-700 font-semibold shadow-xs",
        volt: "bg-white text-black font-extrabold tracking-widest shadow-xs",
        voltSubtle: "bg-zinc-800/80 text-zinc-200 border border-zinc-700 font-semibold shadow-xs",
        carbon: "bg-zinc-900 text-zinc-200 border border-zinc-800 font-bold",
        crimson: "bg-rose-700 text-white font-bold shadow-xs",
        crimsonSubtle: "bg-rose-950/60 text-rose-300 border border-rose-800/50 font-semibold shadow-xs",
        drop: "bg-white text-black font-extrabold tracking-widest shadow-xs",
        gold: "bg-amber-400 text-black font-bold shadow-xs",
        goldFoil: "bg-amber-950/40 text-amber-300 border border-amber-800/50 font-semibold shadow-xs",
        indigo: "bg-zinc-800 text-zinc-100 font-bold shadow-xs",
        jodhpur: "bg-zinc-800 text-zinc-100 font-bold shadow-xs",
        jodhpurSubtle: "bg-zinc-800/80 text-zinc-300 border border-zinc-700 font-medium shadow-xs",
        secondary: "bg-zinc-900 text-zinc-400 border border-zinc-800",
        outline: "border border-zinc-800 text-zinc-400 bg-transparent font-medium",
        destructive: "bg-rose-700 text-white font-bold",
        dark: "bg-zinc-950 text-zinc-200 border border-zinc-800 font-bold",
        accent: "bg-white text-black font-extrabold",
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
