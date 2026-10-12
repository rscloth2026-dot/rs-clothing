"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { openCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-onyx-950 p-6 text-center">
        <Heart className="w-20 h-20 text-muted-foreground/30 mb-4 stroke-1" />
        <h1 className="text-3xl font-black uppercase text-white font-editorial tracking-tight">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs text-muted-foreground max-w-sm mt-2">
          Save your favorite streetwear silhouettes, oversized tees, and denim drops to buy later.
        </p>
        <Link href="/collections/all" className="mt-6">
          <Button>Explore Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-onyx-950 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-border">
          <span className="text-[11px] font-mono text-volt uppercase tracking-widest font-bold">
            SAVED VAULT
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-editorial">
            YOUR WISHLIST ({items.length} ITEMS)
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="group bg-onyx-900 border border-border flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] bg-onyx-800 overflow-hidden">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="25vw" />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="absolute top-2.5 right-2.5 p-2 bg-black/70 text-muted-foreground hover:text-destructive rounded-full backdrop-blur-md"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-volt block mb-1">
                    {item.category}
                  </span>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-xs font-bold uppercase text-white hover:text-volt line-clamp-1">
                      {item.title}
                    </h3>
                  </Link>
                  <span className="text-sm font-black text-volt tabular-nums mt-1 block">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <Link href={`/products/${item.slug}`} className="block w-full">
                  <Button variant="secondary" size="sm" className="w-full text-[11px]">
                    Select Size & Order
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
