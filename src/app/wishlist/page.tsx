"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FDFCF7] p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#E7E2D9] flex items-center justify-center mb-5 shadow-xs">
          <Bookmark className="w-7 h-7 text-[#8B1E1E] stroke-1" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
          Your Saved Vault is Empty
        </h1>
        <p className="text-xs text-[#78716C] max-w-sm mt-2 leading-relaxed font-sans">
          Curate your personal collection of heavyweight Rajasthani streetwear drops, puddle denim, and signature cuts.
        </p>
        <Link href="/collections/all" className="mt-6">
          <Button className="bg-[#8B1E1E] hover:bg-[#6B1414] text-white text-xs font-bold uppercase tracking-wider rounded-sm px-6 py-2.5 shadow-sm">
            <span>Explore Collections</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#1C1917] py-8 sm:py-12 lg:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 pb-6 border-b border-[#E7E2D9]">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#8B1E1E]">
              ARCHIVAL SELECTION // SAVED VAULT
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold uppercase text-[#1C1917] tracking-tight mt-1">
            Curated Pieces ({items.length})
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="group bg-[#FFFFFF] border border-[#E7E2D9] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#8B1E1E] rounded-sm shadow-xs"
            >
              <div className="relative aspect-[3/4] bg-[#FAF6EE] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="absolute top-3 right-3 p-2 bg-[#FFFFFF]/90 text-[#78716C] hover:text-[#8B1E1E] border border-[#E7E2D9] backdrop-blur-md transition-colors rounded-sm"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3.5 sm:p-4 space-y-3">
                <div>
                  <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#8B1E1E] font-bold block mb-1">
                    {item.category}
                  </span>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-xs font-bold uppercase text-[#1C1917] hover:text-[#8B1E1E] line-clamp-1 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <span className="text-sm font-serif font-bold text-[#8B1E1E] tabular-nums mt-1 block">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <Link href={`/products/${item.slug}`} className="block w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-[11px] font-bold tracking-wider uppercase rounded-sm border-[#E7E2D9] text-[#1C1917] hover:border-[#8B1E1E] hover:text-[#8B1E1E]"
                  >
                    Select Silhouette & Size
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
