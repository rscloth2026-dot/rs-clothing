import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-bold tracking-widest uppercase text-[10px] px-2 py-0.5 transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-volt text-black",
        secondary: "bg-white/10 text-white backdrop-blur-md",
        outline: "border border-border text-muted-foreground",
        destructive: "bg-destructive text-white",
        drop: "bg-[#FF4D00] text-white shadow-[0_0_12px_rgba(255,77,0,0.5)]",
        dark: "bg-black/80 text-white border border-white/10",
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
