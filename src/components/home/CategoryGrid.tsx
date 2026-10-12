"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export function CategoryGrid({ categories }: { categories: CategoryItem[] }) {
  return (
    <section className="py-20 bg-onyx-950 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt mb-2">
              CATALOG DIVISION
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-editorial">
              SHOP BY SILHOUETTE
            </h2>
          </div>
          <p className="text-xs text-muted-foreground max-w-sm mt-3 md:mt-0 font-medium">
            Engineered silhouettes divided by drape, density, and cut. Selected luxury textiles engineered for Mumbai, Delhi, Bengaluru, and beyond.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group relative aspect-[4/5] overflow-hidden bg-onyx-900 border border-border/80 hover:border-volt transition-all duration-300"
            >
              {/* Background Image */}
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Category Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-volt/90 bg-black/60 px-2 py-0.5 border border-white/10">
                    0{idx + 1} // CUT
                  </span>
                  <div className="w-8 h-8 rounded-full bg-volt text-black flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white group-hover:text-volt transition-colors font-editorial">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground/90 mt-1 line-clamp-2">
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
