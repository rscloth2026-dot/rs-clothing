"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Check, Plus } from "lucide-react";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ProductCardProps } from "@/components/product/ProductCard";

export function CompactProductCard({
  id,
  title,
  slug,
  basePrice,
  comparePrice,
  fit,
  categoryName,
  isNewDrop,
  isBestseller,
  images,
  variants,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const primaryImage =
    images.find((img) => img.isPrimary)?.url || images[0]?.url || "/placeholder.jpg";
  const hoverImage = images.length > 1 ? images[1].url : primaryImage;

  const discountPercent = calculateDiscount(basePrice, comparePrice);
  const wishlisted = isInWishlist(id);

  // Filter unique available sizes
  const availableSizes = Array.from(new Set(variants.map((v) => v.size)));

  const handleQuickAdd = (size: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const matchedVariant = variants.find((v) => v.size === size && v.stockQuantity > 0);
    if (!matchedVariant) return;

    setSelectedVariantId(matchedVariant.id);
    addItem({
      variantId: matchedVariant.id,
      productId: id,
      title,
      slug,
      size: matchedVariant.size,
      color: matchedVariant.color,
      price: basePrice,
      imageUrl: primaryImage,
      maxStock: matchedVariant.stockQuantity,
    });

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setSelectedVariantId(null);
      setShowSizes(false);
      openCart();
    }, 350);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      productId: id,
      title,
      slug,
      price: basePrice,
      comparePrice,
      imageUrl: primaryImage,
      category: categoryName || fit,
    });
  };

  return (
    <div
      className="group relative flex-none w-[185px] sm:w-[210px] md:w-[225px] flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:shadow-xl transition-all rounded-none overflow-hidden select-none shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* Visual Image Container (Compact 3:4 portrait luxury ratio) */}
      <div className="relative aspect-[3/4] w-full bg-zinc-950 overflow-hidden">
        <Link href={`/products/${slug}`} className="block w-full h-full">
          <Image
            src={isHovered ? hoverImage : primaryImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 185px, (max-width: 1024px) 210px, 225px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Discreet Heritage Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {isNewDrop && (
            <span className="px-1.5 py-0.5 bg-white text-black text-[8px] font-sans font-black uppercase tracking-wider rounded-none shadow-xs">
              DROP
            </span>
          )}
          {isBestseller && (
            <span className="px-1.5 py-0.5 bg-[#FBBF24] text-black text-[8px] font-sans font-black uppercase tracking-wider rounded-none shadow-xs">
              BESTSELLER
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-1.5 py-0.5 bg-zinc-950/90 text-zinc-300 border border-zinc-700 text-[8px] font-sans font-bold uppercase tracking-wider rounded-none shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button with Tactile Pop */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 ${
            wishlisted
              ? "bg-white text-black shadow-xs"
              : "bg-zinc-900/90 text-zinc-400 hover:text-white hover:border-zinc-600 border border-zinc-800 backdrop-blur-xs shadow-xs"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-black" : ""}`} />
        </button>

        {/* 1-Click Quick Add Size Pill Overlay on Hover (Desktop) or Toggle (Mobile) */}
        <div
          className={`absolute inset-x-0 bottom-0 max-h-full overflow-y-auto p-2 bg-[#09090B]/95 backdrop-blur-md border-t border-zinc-800 transition-transform duration-250 flex flex-col gap-1.5 z-20 ${
            showSizes ? "translate-y-0" : isHovered ? "translate-y-full sm:translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between shrink-0">
            <span className="text-[9px] font-sans uppercase font-bold text-zinc-300 tracking-wider">
              {justAdded ? "Added to Bag" : "Quick Add Size"}
            </span>
            <div className="flex items-center gap-1.5">
              {justAdded && <Check className="w-3 h-3 text-white" />}
              {showSizes && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSizes(false);
                  }}
                  className="sm:hidden text-[10px] text-zinc-400 font-bold uppercase hover:text-white min-h-[44px] px-2.5 flex items-center justify-center"
                >
                  Close
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 sm:flex sm:items-center gap-1.5 overflow-y-auto">
            {availableSizes.map((size) => {
              const variant = variants.find((v) => v.size === size);
              const inStock = variant && variant.stockQuantity > 0;
              const isSelected = selectedVariantId === variant?.id;

              return (
                <button
                  key={size}
                  type="button"
                  disabled={!inStock}
                  onClick={(e) => handleQuickAdd(size, e)}
                  className={`w-full min-h-[44px] sm:min-h-0 sm:h-6 sm:flex-1 text-[11px] sm:text-[10px] font-sans font-bold rounded-none flex items-center justify-center transition-colors ${
                    !inStock
                      ? "opacity-30 cursor-not-allowed bg-zinc-950 text-zinc-600 line-through"
                      : isSelected
                      ? "bg-white text-black shadow-xs font-black"
                      : "bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 hover:text-white hover:bg-zinc-750"
                  }`}
                  aria-label={`Quick add size ${size}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile quick add toggle button with ergonomic 44x44px touch target */}
        <div className="sm:hidden absolute bottom-1 right-1 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowSizes(!showSizes);
            }}
            className="w-11 h-11 rounded-full bg-zinc-900/95 border border-zinc-800 text-zinc-300 hover:border-zinc-600 flex items-center justify-center shadow-md transition-colors"
            aria-label="Toggle size options"
          >
            <Plus className="w-4 h-4 text-zinc-300" />
          </button>
        </div>
      </div>

      {/* Product Details (Compact luxury microcopy) */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1 space-y-1 bg-zinc-900">
        <div>
          <div className="flex items-center justify-between text-[9px] font-sans text-zinc-400 uppercase tracking-wider mb-0.5">
            <span className="truncate max-w-[110px]">{categoryName || "Atelier"}</span>
            <span className="font-semibold text-zinc-300">{fit}</span>
          </div>

          <Link href={`/products/${slug}`} className="block group-hover:text-zinc-300 transition-colors">
            <h3 className="font-serif font-bold text-xs sm:text-sm text-white line-clamp-1 leading-snug">
              {title}
            </h3>
          </Link>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline space-x-1.5 pt-1 border-t border-zinc-800">
          <span className="text-xs sm:text-sm font-bold text-white font-sans tabular-nums">
            {formatPrice(basePrice)}
          </span>
          {comparePrice && (
            <span className="text-[10px] text-zinc-500 line-through font-sans tabular-nums">
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
