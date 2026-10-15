"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { Sparkles, Eye, ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export interface FloatingGarmentItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  comparePrice?: number | null;
  category?: string;
  productId: string;
  productSlug?: string;
  productData?: any;
  // Positioning and animation parameters
  initialX: number; // percentage (0 to 100)
  initialY: number; // percentage (0 to 100)
  mobileX?: number; // percentage for mobile
  mobileY?: number; // percentage for mobile
  sizeDesktop: number; // in pixels (e.g. 140 - 220)
  sizeMobile: number; // in pixels (e.g. 70 - 110)
  speedSeconds: number; // float cycle duration (e.g. 6 - 10)
  maxRotationDeg: number; // max tilt degrees (e.g. 3 - 8)
  driftX: number; // horizontal drift px (e.g. 15 - 30)
  driftY: number; // vertical drift px (e.g. 18 - 35)
  delaySeconds?: number;
  zIndex?: number;
  isEnabled?: boolean;
}

interface FloatingGarmentProps {
  garment: FloatingGarmentItem;
  onSelect: (product: any) => void;
  isMobile?: boolean;
}

export function FloatingGarment({ garment, onSelect, isMobile = false }: FloatingGarmentProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Position coordinates depending on device breakpoint
  const posX = isMobile && garment.mobileX !== undefined ? garment.mobileX : garment.initialX;
  const posY = isMobile && garment.mobileY !== undefined ? garment.mobileY : garment.initialY;
  const size = isMobile ? garment.sizeMobile : garment.sizeDesktop;

  // Multi-axis independent non-circular floating drift keyframes
  // Using asymmetric keyframe sequences to strictly avoid circular or orbital patterns
  const floatAnimation: TargetAndTransition | undefined = shouldReduceMotion
    ? undefined
    : {
        x: [0, garment.driftX, -garment.driftX * 0.75, garment.driftX * 0.35, 0],
        y: [0, -garment.driftY, garment.driftY * 0.85, -garment.driftY * 0.45, 0],
        rotate: [0, garment.maxRotationDeg, -garment.maxRotationDeg * 0.8, garment.maxRotationDeg * 0.4, 0],
        transition: {
          duration: garment.speedSeconds || 7.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: garment.delaySeconds || 0,
        },
      };


  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${posX}%`,
        top: `${posY}%`,
        width: `${size}px`,
        height: `${size}px`,
        zIndex: isHovered ? 40 : garment.zIndex || 10,
      }}
      animate={floatAnimation}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.08,
              transition: { duration: 0.3, ease: "easeOut" },
            }
      }
      whileTap={{ scale: 0.96 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(garment.productData || garment)}
      className="cursor-pointer select-none group touch-manipulation focus:outline-none"
      role="button"
      tabIndex={0}
      aria-label={`View ${garment.name} - ${formatPrice(garment.price)}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(garment.productData || garment);
        }
      }}
    >
      {/* Garment Image with High-Fashion Depth Shadow */}
      <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-2">
        <Image
          src={garment.imageUrl}
          alt={garment.name}
          fill
          sizes={`${size}px`}
          priority
          className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.14)] group-hover:drop-shadow-[0_18px_32px_rgba(30,64,175,0.28)] transition-all duration-300"
        />

        {/* Ambient Subtle Radial Aura on Hover */}
        <div className="absolute inset-0 bg-[#1E40AF]/0 group-hover:bg-[#1E40AF]/10 rounded-full blur-xl transition-all duration-300 pointer-events-none" />
      </div>

      {/* Floating Interactive Atelier Pill (Reveals on Hover / Focus / Mobile Tap) */}
      <div
        className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none transition-all duration-200 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        <div className="bg-[#0A0A0A]/95 backdrop-blur-md text-white border border-[#1E40AF]/40 px-3 py-1 shadow-lg rounded-none flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] animate-pulse" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white">
            {garment.name}
          </span>
          <span className="text-[10px] font-mono font-bold text-[#FBBF24]">
            {formatPrice(garment.price)}
          </span>
          <ArrowUpRight className="w-3 h-3 text-[#1E40AF] ml-0.5" />
        </div>
      </div>

      {/* Mobile Subtle Micro Price Badge (Always subtle on touchscreens) */}
      <div className="sm:hidden absolute top-0 right-0 bg-white/90 backdrop-blur-xs border border-[#E5E5E5] px-1.5 py-0.5 shadow-xs pointer-events-none">
        <span className="text-[8px] font-mono font-bold text-[#0A0A0A]">
          {formatPrice(garment.price)}
        </span>
      </div>
    </motion.div>
  );
}
