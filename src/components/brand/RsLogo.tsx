import React from "react";

interface OnlyCollectionLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "crest" | "monogram" | "full";
  showWordmark?: boolean;
}

export function OnlyCollectionLogo({
  className = "",
  size = "md",
  variant = "full",
  showWordmark = true,
}: OnlyCollectionLogoProps) {
  // Dimensions map
  const sizeMap = {
    sm: { icon: 28, text: "text-base sm:text-lg", sub: "text-[7.5px]" },
    md: { icon: 38, text: "text-xl sm:text-2xl", sub: "text-[8.5px]" },
    lg: { icon: 52, text: "text-2xl sm:text-3xl", sub: "text-[10px]" },
    xl: { icon: 68, text: "text-3xl sm:text-4xl", sub: "text-[11.5px]" },
  };

  const currentSize = sizeMap[size];

  // Minimalist Luxury Streetwear 'OC' Monogram SVG (OnlyCollection)
  const LogoMark = (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="OnlyCollection Luxury Monogram"
    >
      {/* Outer Obsidian Beveled Crest */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="14"
        fill="#09090B"
        stroke="#27272A"
        strokeWidth="2.5"
      />
      {/* Platinum Hairline Inner Border */}
      <rect
        x="12"
        y="12"
        width="76"
        height="76"
        rx="10"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeOpacity="0.15"
      />

      {/* Architectural 'O' - Precision Minimalist Ellipse */}
      <ellipse
        cx="44"
        cy="50"
        rx="22"
        ry="25"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Intersecting 'C' - Nested Precision Arc with Platinum Accent */}
      <path
        d="M68 32 C58 26 48 30 46 50 C44 70 58 74 68 68"
        stroke="#E4E4E7"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Atelier Precision Diamond Accent at Top Right */}
      <polygon
        points="74,18 78,22 74,26 70,22"
        fill="#FFFFFF"
      />
      {/* Atelier Precision Micro Dot */}
      <circle
        cx="74"
        cy="50"
        r="2"
        fill="#A1A1AA"
      />
    </svg>
  );

  if (variant === "crest" || variant === "monogram") {
    return <div className={`inline-flex items-center ${className}`}>{LogoMark}</div>;
  }

  return (
    <div className={`inline-flex items-center space-x-3 group ${className}`}>
      {LogoMark}
      {showWordmark && (
        <div className="flex flex-col tracking-tight text-left">
          <div className="flex items-center space-x-1.5">
            <span
              className={`font-serif font-bold text-white ${currentSize.text} tracking-[0.08em] uppercase leading-none group-hover:text-zinc-200 transition-colors`}
            >
              ONLYCOLLECTION
            </span>
          </div>
          <span
            className={`font-sans font-medium uppercase tracking-[0.25em] text-zinc-400 ${currentSize.sub} mt-1`}
          >
            HAUTE STREETWEAR • EST. 2026
          </span>
        </div>
      )}
    </div>
  );
}

// Export alias for seamless backward compatibility across all imports
export const RsLogo = OnlyCollectionLogo;
