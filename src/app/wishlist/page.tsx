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
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAFAFA] p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#E5E5E5] flex items-center justify-center mb-5 shadow-xs">
          <Bookmark className="w-7 h-7 text-[#0A0A0A] stroke-1" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold uppercase text-[#0A0A0A] tracking-tight">
          Your Saved Vault is Empty
        </h1>
        <p className="text-xs text-[#71717A] max-w-sm mt-2 leading-relaxed font-sans">
          Curate your personal collection of heavyweight Rajasthani streetwear drops, puddle denim, and signature cuts.
        </p>
        <Link href="/collections/all" className="mt-6">
          <Button className="bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-widest rounded-none px-6 py-2.5 shadow-sm">
            <span>Explore Collections</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] py-8 sm:py-12 lg:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 pb-6 border-b border-[#E5E5E5]">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#71717A]">
              ARCHIVAL SELECTION // SAVED VAULT
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold uppercase text-[#0A0A0A] tracking-tight mt-1">
            Curated Pieces ({items.length})
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="group bg-[#FFFFFF] border border-[#E5E5E5] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#0A0A0A] rounded-none shadow-xs"
            >
              <div className="relative aspect-[3/4] bg-[#F5F5F7] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="absolute top-3 right-3 p-2 bg-[#FFFFFF]/90 text-[#71717A] hover:text-[#0A0A0A] border border-[#E5E5E5] backdrop-blur-md transition-colors rounded-none"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3.5 sm:p-4 space-y-3">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#71717A] font-semibold block mb-1">
                    {item.category}
                  </span>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-xs font-bold uppercase text-[#0A0A0A] hover:text-[#262626] line-clamp-1 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <span className="text-sm font-serif font-bold text-[#0A0A0A] tabular-nums mt-1 block">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <Link href={`/products/${item.slug}`} className="block w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-[11px] font-bold tracking-wider uppercase rounded-none border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#FAFAFA]"
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
