"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { HoverExpandSilhouettes, ProgressiveBlur, TextRoll, CssArrowLink } from "@/components/ui/skiper-ui";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export function CategoryGrid({ categories }: { categories: CategoryItem[] }) {
  if (!categories || categories.length === 0) return null;

  const silhouettes = categories.map((cat, idx) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    imageUrl: cat.imageUrl,
    code: `0${idx + 1} // ${cat.name.split(" ")[0].toUpperCase()}`,
  }));

  return (
    <section className="relative py-12 sm:py-16 bg-[#FDFCF7] border-b border-[#E7E2D9] overflow-hidden select-none">
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

          <CssArrowLink
            href="/collections/all"
            className="text-xs font-sans font-bold uppercase tracking-widest text-[#8B1E1E] hover:text-[#6B1414]"
          >
            <TextRoll>All Silhouettes</TextRoll>
          </CssArrowLink>
        </div>
      </div>

      {/* Skiper-UI 52: Dynamic HoverExpand Silhouettes Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <HoverExpandSilhouettes items={silhouettes} />
      </div>
    </section>
  );
}
