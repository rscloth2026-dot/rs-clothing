"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SilhouetteItem {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  imageUrl: string;
  code?: string;
}

interface HoverExpandSilhouettesProps {
  items: SilhouetteItem[];
  className?: string;
}

/**
 * Skiper-UI 52: HoverExpand Silhouettes
 * Source: https://skiper-ui.com/registry/skiper52.json
 * High-fashion expanding accordion cards with clean horizontal typography and zero overlap.
 */
export const HoverExpandSilhouettes: React.FC<HoverExpandSilhouettesProps> = ({
  items,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className={cn("w-full overflow-hidden py-2 select-none", className)}>
      {/* Desktop & Tablet: Smooth Expanding Accordion with Clean Typography */}
      <div className="hidden md:flex w-full items-stretch justify-center gap-3 min-h-[420px] lg:min-h-[480px]">
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={item.id || index}
              layout
              className="relative cursor-pointer overflow-hidden rounded-xl border border-[#E5E5E5] hover:border-[#1E40AF]/50 bg-[#FFFFFF] shadow-sm transition-all hover:shadow-[0_8px_25px_rgba(30,64,175,0.15)]"
              animate={{
                flex: isActive ? 3.5 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.33, 1, 0.68, 1],
              }}
              onClick={() => setActiveIndex(index)}
              onHoverStart={() => setActiveIndex(index)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    isActive ? "scale-105" : "scale-100 grayscale-[0.2]"
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isActive
                      ? "bg-gradient-to-t from-black/90 via-black/35 to-transparent"
                      : "bg-black/50 hover:bg-black/40"
                  )}
                />
              </div>

              {/* Collapsed State: Crisp Bottom Index Label (Horizontal, Never Rotated) */}
              {!isActive && (
                <div className="absolute inset-x-0 bottom-0 p-3.5 z-10 flex flex-col items-center justify-end text-center pointer-events-none">
                  <div className="w-full bg-[#0A0A0A]/90 backdrop-blur-md border border-[#E5E5E5]/20 py-2 px-1 rounded-[4px] shadow-sm">
                    <span className="block text-[10px] font-sans font-bold tracking-widest text-[#FBBF24] uppercase">
                      0{index + 1}
                    </span>
                    <span className="block text-[11px] font-serif font-bold text-white uppercase tracking-wider truncate mt-0.5 px-1">
                      {item.name.split(" ")[0]}
                    </span>
                  </div>
                </div>
              )}

              {/* Expanded State: Full Rich Lookbook Details */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white z-10"
                >
                  <div className="space-y-2.5 max-w-md">
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#1E40AF] text-white text-[9px] font-sans font-bold uppercase tracking-widest rounded-full shadow-sm backdrop-blur-md">
                      <Sparkles className="w-2.5 h-2.5 text-[#FDE047]" />
                      <span>{item.code || `SILHOUETTE 0${index + 1}`}</span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-serif font-bold tracking-wide text-white leading-tight">
                      {item.name}
                    </h3>

                    {item.description && (
                      <p className="text-xs text-white/85 line-clamp-2 font-sans font-light leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    <div className="pt-2">
                      <Link
                        href={`/collections/${item.slug}`}
                        className="inline-flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-[#FBBF24] hover:text-[#FDE047] transition-colors group"
                      >
                        <span>Explore Silhouette</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Touch Carousel: Horizontal card carousel with swipe gestures */}
      <div className="flex md:hidden overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory scrollbar-none">
        {items.map((item, index) => (
          <Link
            key={item.id || index}
            href={`/collections/${item.slug}`}
            className="flex-shrink-0 w-[78vw] max-w-[320px] snap-center relative aspect-[3/4] rounded-xl overflow-hidden border border-[#E5E5E5] shadow-md group"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="80vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
              <span className="inline-block px-2.5 py-0.5 bg-[#1E40AF] text-white text-[9px] font-sans font-bold uppercase tracking-widest rounded-full shadow-xs">
                {item.code || `0${index + 1} // JODHPUR`}
              </span>
              <h3 className="text-xl font-serif font-bold text-white tracking-wide leading-tight">
                {item.name}
              </h3>
              {item.description && (
                <p className="text-xs text-white/80 line-clamp-2 font-sans font-light">
                  {item.description}
                </p>
              )}
              <div className="pt-1 flex items-center space-x-1.5 text-[#FBBF24] text-[11px] font-sans font-bold uppercase tracking-wider">
                <span>View Collection</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
