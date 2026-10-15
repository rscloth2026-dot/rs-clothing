import React from "react";

interface RsLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "crest" | "monogram" | "full";
  showWordmark?: boolean;
}

export function RsLogo({
  className = "",
  size = "md",
  variant = "full",
  showWordmark = true,
}: RsLogoProps) {
  // Dimensions map
  const sizeMap = {
    sm: { icon: 28, text: "text-lg", sub: "text-[8px]" },
    md: { icon: 38, text: "text-2xl", sub: "text-[9px]" },
    lg: { icon: 54, text: "text-3xl", sub: "text-[11px]" },
    xl: { icon: 72, text: "text-4xl", sub: "text-[13px]" },
  };

  const currentSize = sizeMap[size];

  // Precision Rajputana Haveli + High-Fashion Geometric Monogram SVG
  const LogoMark = (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="RS Clothing Royal Monogram"
    >
      {/* Outer Atelier Shield / Diamond Crest with Jodhpur Royal Blue */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="10"
        fill="#0A0A0A"
        stroke="#1E40AF"
        strokeWidth="3.5"
      />
      {/* Antique Gold Inner Hairline Border */}
      <rect
        x="12"
        y="12"
        width="76"
        height="76"
        rx="6"
        fill="#0D1117"
        stroke="#FBBF24"
        strokeWidth="1.2"
        strokeDasharray="4 2"
        opacity="0.85"
      />

      {/* Decorative Royal Corner Accents */}
      <path d="M16 22 L22 16" stroke="#FBBF24" strokeWidth="2" strokeLinecap="square" />
      <path d="M84 22 L78 16" stroke="#FBBF24" strokeWidth="2" strokeLinecap="square" />
      <path d="M16 78 L22 84" stroke="#FBBF24" strokeWidth="2" strokeLinecap="square" />
      <path d="M84 78 L78 84" stroke="#FBBF24" strokeWidth="2" strokeLinecap="square" />

      {/* Intertwined R & S Architectural Monogram */}
      {/* 'R' Stem and Bowl */}
      <path
        d="M28 26 V74 M28 26 H46 C54 26 58 31 58 38 C58 45 54 50 46 50 H28 M44 50 L60 74"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      
      {/* 'S' Flow Intertwined with Royal Gold Accent */}
      <path
        d="M72 36 C70 30 63 26 53 26 C42 26 36 32 36 40 C36 49 46 52 56 55 C66 58 72 63 72 71 C72 80 64 85 51 85 C39 85 32 79 30 72"
        stroke="#FBBF24"
        strokeWidth="5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />

      {/* Center Crown / Atelier Peak Diamond */}
      <polygon
        points="50,15 54,20 50,25 46,20"
        fill="#FBBF24"
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
              className={`font-serif font-bold text-[#0A0A0A] ${currentSize.text} tracking-tight leading-none group-hover:text-[#1E40AF] transition-colors`}
            >
              RS CLOTHING
            </span>
          </div>
          <span
            className={`font-sans font-semibold uppercase tracking-[0.25em] text-[#71717A] ${currentSize.sub} mt-0.5`}
          >
            JODHPUR ATELIER • EST. 2026
          </span>
        </div>
      )}
    </div>
  );
}
