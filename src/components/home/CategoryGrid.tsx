"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { HoverExpandSilhouettes } from "@/components/ui/skiper-ui";

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
    <section className="relative py-14 sm:py-20 bg-[#FAFAFA] border-b border-[#E5E5E5] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        {/* Section Header with Royal Aesthetics & Generous Spacing */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E5E5E5]">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-[#1E40AF]/25 rounded-full shadow-xs">
              <Sparkles className="w-3 h-3 text-[#1E40AF]" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#1E40AF]">
                COLLECTION DIRECTORY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A0A0A] tracking-tight leading-snug">
              Shop by Silhouette
            </h2>
            <p className="text-xs sm:text-sm text-[#71717A] font-sans leading-relaxed">
              Architectural boxy cuts structured by cotton density, drape, and heritage dyes.
            </p>
          </div>

          <Link
            href="/collections/all"
            className="inline-flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-[#0A0A0A] hover:text-[#1E40AF] transition-colors group py-1"
          >
            <span>All Silhouettes</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1E40AF] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Skiper-UI 52: Dynamic HoverExpand Silhouettes Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <HoverExpandSilhouettes items={silhouettes} />
      </div>
    </section>
  );
}
