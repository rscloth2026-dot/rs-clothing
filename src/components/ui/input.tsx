import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-[2px] bg-white border border-[#E7E2D9] px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus-visible:outline-none focus-visible:border-[#C5A059] focus-visible:ring-1 focus-visible:ring-[#C5A059] disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
