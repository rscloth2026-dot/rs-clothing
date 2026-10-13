import React from "react";

type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom";
  height?: string;
  blurAmount?: string;
};

/**
 * Skiper-UI 41: Progressive Blur
 * Inspired by and adapted from Rauno Freiberg / devouringdetails.com
 * Source: https://skiper-ui.com/registry/skiper41.json
 */
export const ProgressiveBlur = ({
  className = "",
  backgroundColor = "#FAFAFA",
  position = "top",
  height = "120px",
  blurAmount = "8px",
}: ProgressiveBlurProps) => {
  const isTop = position === "top";

  return (
    <div
      className={`pointer-events-none absolute left-0 w-full select-none ${className}`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: isTop
          ? `linear-gradient(to top, transparent, ${backgroundColor})`
          : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
        maskImage: isTop
          ? `linear-gradient(to bottom, ${backgroundColor} 40%, transparent)`
          : `linear-gradient(to top, ${backgroundColor} 40%, transparent)`,
        WebkitMaskImage: isTop
          ? `linear-gradient(to bottom, ${backgroundColor} 40%, transparent)`
          : `linear-gradient(to top, ${backgroundColor} 40%, transparent)`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    />
  );
};
