"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export function CategoryGrid({ categories }: { categories: CategoryItem[] }) {
  if (categories.length === 0) return null;

  // Quadruple categories for infinite seamless runway glide
  const infiniteCategories = [...categories, ...categories, ...categories, ...categories];

  return (
    <section className="py-12 sm:py-16 bg-[#FDFCF7] border-b border-[#E7E2D9] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        {/* Section Header with Royal Aesthetics */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E7E2D9]">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E]">
                RAJPUTANA SILHOUETTES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
              Shop by Silhouette
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] font-sans mt-0.5">
              Architectural cuts structured by drape, cotton density, and heritage dyeing.
            </p>
          </div>

          <Link
            href="/collections/all"
            className="inline-flex items-center space-x-1.5 text-xs font-sans font-bold uppercase tracking-widest text-[#8B1E1E] hover:text-[#6B1414] transition-colors group"
          >
            <span>All Silhouettes</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Runway Track with Small Compact Category Widgets */}
      <div className="relative w-full overflow-hidden pause-on-hover py-2">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#FDFCF7] via-[#FDFCF7]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#FDFCF7] via-[#FDFCF7]/80 to-transparent z-10" />

        <div className="flex gap-3.5 sm:gap-5 w-max gpu-smooth animate-marquee-slow">
          {infiniteCategories.map((cat, idx) => (
            <Link
              key={`${cat.id}-${idx}`}
              href={`/collections/${cat.slug}`}
              className="group relative flex-none w-[170px] sm:w-[195px] md:w-[215px] aspect-[3/4] overflow-hidden rajasthan-wedge rounded-[2px]"
            >
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 170px, 215px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/95 via-[#1C1917]/35 to-transparent" />
              <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="font-sans text-[8px] sm:text-[9px] font-bold text-white bg-[#1C1917]/80 px-2 py-0.5 border border-white/20 rounded-[1px] uppercase tracking-wider backdrop-blur-xs">
                    0{((idx % categories.length) + 1)} // ATELIER
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white text-[#1C1917] group-hover:bg-[#8B1E1E] group-hover:text-white group-hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-xs">
                    <ArrowUpRight className="w-3 h-3 stroke-[2]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-white group-hover:text-[#F4EFE6] transition-colors font-serif">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-white/80 mt-0.5 line-clamp-1 font-sans">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
