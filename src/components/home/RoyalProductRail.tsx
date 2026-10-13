"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCardProps } from "@/components/product/ProductCard";
import { CompactProductCard } from "@/components/home/CompactProductCard";

interface RoyalProductRailProps {
  badgeTitle?: string;
  title: string;
  subtitle?: string;
  viewAllLink: string;
  viewAllText?: string;
  products: ProductCardProps[];
  direction?: "normal" | "reverse";
  speedClass?: string;
}

export function RoyalProductRail({
  badgeTitle,
  title,
  subtitle,
  viewAllLink,
  viewAllText = "Explore Collection",
  products,
  direction = "normal",
  speedClass = "animate-marquee",
}: RoyalProductRailProps) {
  if (!products || products.length === 0) return null;

  // Quadruple items to ensure a 100% gapless, seamless infinite gliding loop across 4K displays
  const infiniteProducts = [...products, ...products, ...products, ...products];
  const activeAnimation = direction === "reverse" ? "animate-marquee-reverse" : speedClass;

  return (
    <section className="py-12 sm:py-16 bg-[#FAFAFA] border-b border-[#E5E5E5] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <div>
            {badgeTitle && (
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 bg-white border border-[#1E40AF]/25 rounded-full mb-2 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#1E40AF]" />
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#1E40AF]">
                  {badgeTitle}
                </span>
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A0A0A] tracking-tight leading-snug">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#71717A] font-sans mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <Link
            href={viewAllLink}
            className="inline-flex items-center space-x-1.5 text-xs font-sans font-bold uppercase tracking-widest text-[#0A0A0A] hover:text-[#1E40AF] transition-colors group"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1E40AF] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Runway Track with Small Compact Widgets */}
      <div className="relative w-full overflow-hidden pause-on-hover py-2">
        {/* Left & Right Subtle Fade Overlays for Elegant Editorial Runway Edge */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-10" />

        {/* Gliding Infinite Row */}
        <div
          className={`flex gap-3.5 sm:gap-5 w-max gpu-smooth ${activeAnimation}`}
          style={{ willChange: "transform" }}
        >
          {infiniteProducts.map((product, idx) => (
            <CompactProductCard
              key={`${product.id}-${idx}`}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
