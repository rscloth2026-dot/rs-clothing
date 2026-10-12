"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

interface LookProduct {
  id: string;
  title: string;
  slug: string;
  basePrice: number;
  imageUrl: string;
  category: string;
  fit: string;
  variants: Array<{ id: string; size: string; color: string; stockQuantity: number }>;
}

export function ShopTheLook({ products }: { products: LookProduct[] }) {
  const { addItem, openCart } = useCartStore();

  const tee = products.find((p) => p.fit === "Oversized") || products[0];
  const jeans = products.find((p) => p.fit === "Baggy") || products[1] || products[0];

  const [teeSize, setTeeSize] = useState<string>(tee?.variants[0]?.size || "L");
  const [jeansSize, setJeansSize] = useState<string>(jeans?.variants[0]?.size || "32");
  const [added, setAdded] = useState(false);

  if (!tee || !jeans) return null;

  const combinedPrice = tee.basePrice + jeans.basePrice;
  const bundleDiscount = 300; // Bundle bonus
  const bundlePayable = combinedPrice - bundleDiscount;

  const handleAddBundle = () => {
    const teeVariant = tee.variants.find((v) => v.size === teeSize) || tee.variants[0];
    const jeansVariant = jeans.variants.find((v) => v.size === jeansSize) || jeans.variants[0];

    if (teeVariant) {
      addItem({
        variantId: teeVariant.id,
        productId: tee.id,
        title: tee.title,
        slug: tee.slug,
        size: teeVariant.size,
        color: teeVariant.color,
        price: tee.basePrice,
        imageUrl: tee.imageUrl,
        maxStock: teeVariant.stockQuantity,
      });
    }

    if (jeansVariant) {
      addItem({
        variantId: jeansVariant.id,
        productId: jeans.id,
        title: jeans.title,
        slug: jeans.slug,
        size: jeansVariant.size,
        color: jeansVariant.color,
        price: jeans.basePrice,
        imageUrl: jeans.imageUrl,
        maxStock: jeansVariant.stockQuantity,
      });
    }

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 1000);
  };

  return (
    <section id="shop-the-look" className="py-24 bg-onyx-950 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-onyx-800 border border-border text-[10px] font-mono font-bold uppercase tracking-widest text-volt">
            <Sparkles className="w-3.5 h-3.5 text-volt" />
            <span>CURATED STREETWEAR ENSEMBLE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-editorial">
            SHOP THE LOOK // FIT 01
          </h2>
          <p className="text-xs text-muted-foreground">
            Complete high-fashion styling made effortless. Boxy oversized top paired with puddle-drape baggy denim.
          </p>
        </div>

        {/* Look Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Editorial Hero Look Image */}
          <div className="lg:col-span-7 relative aspect-[4/5] bg-onyx-900 border border-border overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
              alt="Complete Curated Look on Streetwear Model"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 z-10">
              <span className="text-xs font-mono font-bold text-volt uppercase tracking-wider bg-black/80 px-2.5 py-1 border border-white/10">
                LOOKBOOK ARCHIVE #01
              </span>
              <p className="text-lg font-bold uppercase text-white mt-2">
                ACID GRAPHITE + VINTAGE SKATE WASH
              </p>
            </div>
          </div>

          {/* Bundle Selector & Details */}
          <div className="lg:col-span-5 space-y-6 bg-onyx-900 border border-border p-6 sm:p-8">
            <div className="border-b border-border pb-4">
              <h3 className="text-xl font-black uppercase text-white font-editorial">
                CURATED 2-PIECE COMBO
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Save ₹300 automatically when you get the complete fit together.
              </p>
            </div>

            {/* Piece 1: Tee */}
            <div className="flex space-x-4 p-3 bg-onyx-800/60 border border-border rounded-sm">
              <div className="relative w-16 h-20 bg-onyx-700 flex-shrink-0 overflow-hidden">
                <Image src={tee.imageUrl} alt={tee.title} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-volt">PIECE 01 // TOP</span>
                  <Link href={`/products/${tee.slug}`} className="block text-xs font-bold uppercase text-white hover:text-volt line-clamp-1">
                    {tee.title}
                  </Link>
                  <span className="text-xs font-bold text-white tabular-nums">{formatPrice(tee.basePrice)}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-[10px] font-mono text-muted-foreground">SIZE:</span>
                  <div className="flex gap-1">
                    {tee.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setTeeSize(v.size)}
                        className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                          teeSize === v.size
                            ? "bg-volt border-volt text-black"
                            : "border-border bg-onyx-900 text-muted-foreground hover:text-white"
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Piece 2: Jeans */}
            <div className="flex space-x-4 p-3 bg-onyx-800/60 border border-border rounded-sm">
              <div className="relative w-16 h-20 bg-onyx-700 flex-shrink-0 overflow-hidden">
                <Image src={jeans.imageUrl} alt={jeans.title} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-volt">PIECE 02 // BOTTOM</span>
                  <Link href={`/products/${jeans.slug}`} className="block text-xs font-bold uppercase text-white hover:text-volt line-clamp-1">
                    {jeans.title}
                  </Link>
                  <span className="text-xs font-bold text-white tabular-nums">{formatPrice(jeans.basePrice)}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-[10px] font-mono text-muted-foreground">WAIST:</span>
                  <div className="flex gap-1">
                    {jeans.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setJeansSize(v.size)}
                        className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                          jeansSize === v.size
                            ? "bg-volt border-volt text-black"
                            : "border-border bg-onyx-900 text-muted-foreground hover:text-white"
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Add to Bag CTA */}
            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-muted-foreground line-through tabular-nums mr-2">
                    {formatPrice(combinedPrice)}
                  </span>
                  <span className="text-xl font-black text-volt tabular-nums">
                    {formatPrice(bundlePayable)}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-green-400 bg-green-500/10 px-2 py-0.5 border border-green-500/20">
                  Save ₹300
                </span>
              </div>

              <Button
                onClick={handleAddBundle}
                disabled={added}
                className="w-full h-12 text-xs font-extrabold flex items-center justify-center space-x-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>OUTFIT ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>ADD COMPLETE FIT TO BAG</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
