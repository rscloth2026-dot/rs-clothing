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
      className="group relative flex-none w-[185px] sm:w-[210px] md:w-[225px] flex flex-col bg-[#12141D] border border-[#1E2230] hover:border-[#D4FF00]/60 hover:shadow-[0_8px_24px_rgba(212,255,0,0.08)] transition-all rounded-none overflow-hidden select-none shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* Visual Image Container (Compact 3:4 portrait luxury ratio) */}
      <div className="relative aspect-[3/4] w-full bg-[#0D0F16] overflow-hidden">
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
            <span className="px-1.5 py-0.5 bg-[#D4FF00] text-[#090A0F] text-[8px] font-sans font-black uppercase tracking-wider rounded-none shadow-xs">
              DROP
            </span>
          )}
          {isBestseller && (
            <span className="px-1.5 py-0.5 bg-[#FBBF24] text-[#090A0F] text-[8px] font-sans font-black uppercase tracking-wider rounded-none shadow-xs">
              BESTSELLER
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-1.5 py-0.5 bg-[#181B26] text-[#D4FF00] border border-[#D4FF00]/30 text-[8px] font-sans font-bold uppercase tracking-wider rounded-none shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button with Tactile Pop */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 ${
            wishlisted
              ? "bg-[#D4FF00] text-[#090A0F] shadow-xs"
              : "bg-[#0E1017]/90 text-[#94A3B8] hover:text-[#D4FF00] hover:border-[#D4FF00]/40 border border-[#1E2230] backdrop-blur-xs shadow-xs"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-[#090A0F]" : ""}`} />
        </button>

        {/* 1-Click Quick Add Size Pill Overlay on Hover */}
        <div
          className={`absolute inset-x-0 bottom-0 p-2 bg-[#0E1017]/95 backdrop-blur-xs border-t border-[#1E2230] transition-transform duration-250 flex flex-col gap-1 z-20 ${
            showSizes || isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-sans uppercase font-bold text-[#D4FF00] tracking-wider">
              {justAdded ? "Added to Bag" : "Quick Add Size"}
            </span>
            {justAdded && <Check className="w-3 h-3 text-[#D4FF00]" />}
          </div>
          <div className="flex items-center gap-1">
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
                  className={`flex-1 h-6 text-[10px] font-sans font-bold rounded-none flex items-center justify-center transition-colors ${
                    !inStock
                      ? "opacity-30 cursor-not-allowed bg-[#0B0D13] text-[#475569] line-through"
                      : isSelected
                      ? "bg-[#D4FF00] text-[#090A0F] shadow-xs"
                      : "bg-[#141722] border border-[#222738] text-[#F8FAFC] hover:border-[#D4FF00] hover:text-[#D4FF00] hover:bg-[#1A1E2D]"
                  }`}
                  aria-label={`Quick add size ${size}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile quick add toggle button */}
        <div className="sm:hidden absolute bottom-1.5 right-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowSizes(!showSizes);
            }}
            className="w-6 h-6 rounded-full bg-[#12141D] border border-[#1E2230] text-[#F8FAFC] hover:border-[#D4FF00] hover:text-[#D4FF00] flex items-center justify-center shadow-xs"
            aria-label="Toggle size options"
          >
            <Plus className="w-3 h-3 text-[#D4FF00]" />
          </button>
        </div>
      </div>

      {/* Product Details (Compact luxury microcopy) */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1 space-y-1 bg-[#12141D]">
        <div>
          <div className="flex items-center justify-between text-[9px] font-sans text-[#94A3B8] uppercase tracking-wider mb-0.5">
            <span className="truncate max-w-[110px]">{categoryName || "Atelier"}</span>
            <span className="font-semibold text-[#D4FF00]">{fit}</span>
          </div>

          <Link href={`/products/${slug}`} className="block group-hover:text-[#D4FF00] transition-colors">
            <h3 className="font-serif font-bold text-xs sm:text-sm text-[#F8FAFC] line-clamp-1 leading-snug">
              {title}
            </h3>
          </Link>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline space-x-1.5 pt-1 border-t border-[#1E2230]">
          <span className="text-xs sm:text-sm font-bold text-[#F8FAFC] font-sans tabular-nums">
            {formatPrice(basePrice)}
          </span>
          {comparePrice && (
            <span className="text-[10px] text-[#64748B] line-through font-sans tabular-nums">
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
