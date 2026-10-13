"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Check, Plus, ShoppingBag } from "lucide-react";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  basePrice: number;
  comparePrice?: number | null;
  fit: string;
  categoryName?: string;
  isNewDrop?: boolean;
  isBestseller?: boolean;
  images: Array<{ url: string; altText?: string | null; isPrimary: boolean }>;
  variants: Array<{
    id: string;
    sku: string;
    size: string;
    color: string;
    colorHex: string;
    stockQuantity: number;
  }>;
}

export function ProductCard({
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
  const [showMobileSizes, setShowMobileSizes] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const primaryImage = images.find((img) => img.isPrimary)?.url || images[0]?.url || "/placeholder.jpg";
  const hoverImage = images.length > 1 ? images[1].url : primaryImage;

  const discountPercent = calculateDiscount(basePrice, comparePrice);
  const wishlisted = isInWishlist(id);

  // Group unique sizes
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
      setShowMobileSizes(false);
      openCart();
    }, 400);
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
      className="group relative flex flex-col rajasthan-wedge rounded-[2px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Badge & Wishlist Container */}
      <div className="relative aspect-[3/4] w-full bg-[#060D1A] overflow-hidden select-none">
        <Link href={`/products/${slug}`} className="block w-full h-full">
          <Image
            src={isHovered ? hoverImage : primaryImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {isNewDrop && (
            <span className="px-2 py-0.5 bg-[#8B1E1E] text-white text-[9px] font-sans font-bold uppercase tracking-wider rounded-[2px] shadow-sm">
              ROYAL DROP
            </span>
          )}
          {isBestseller && (
            <span className="px-2 py-0.5 bg-[#C5A059] text-white text-[9px] font-sans font-bold uppercase tracking-wider rounded-[2px] shadow-sm">
              BESTSELLER
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-[#0A162B] text-[#C5A059] border border-[#C5A059]/40 text-[9px] font-sans font-bold uppercase tracking-wider rounded-[2px]">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button with Tactile Pop */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 ${
            wishlisted
              ? "bg-[#8B1E1E] text-white shadow-sm"
              : "bg-[#0A162B]/90 text-[#94A3B8] hover:text-[#C5A059] border border-[#1E3A5F] backdrop-blur-sm shadow-sm"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
        </button>

        {/* 1-Click Quick Add Size Tray (Desktop Hover Reveal) */}
        <div className="hidden lg:flex absolute bottom-0 left-0 right-0 p-3 bg-[#0A162B]/95 backdrop-blur-md border-t border-[#1E3A5F] translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex-col gap-1.5 z-20">
          <span className="text-[10px] font-sans uppercase font-bold text-[#94A3B8] tracking-wider text-center">
            {justAdded ? "Added to Atelier Bag!" : "Quick Add Size"}
          </span>
          <div className="flex items-center justify-center gap-1.5">
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
                  className={`h-7 px-2.5 text-[11px] font-sans font-bold rounded-[2px] tactile-pill flex items-center justify-center ${
                    !inStock
                      ? "opacity-30 cursor-not-allowed bg-[#070D18] text-[#64748B] line-through"
                      : isSelected
                      ? "bg-[#8B1E1E] text-white shadow-sm"
                      : "bg-[#0F1D36] border border-[#1E3A5F] text-[#F1EFEA] hover:border-[#C5A059] hover:bg-[#162744]"
                  }`}
                  aria-label={`Quick add size ${size}`}
                >
                  {isSelected ? <Check className="w-3 h-3 text-white" /> : size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Quick Add Trigger */}
        <div className="lg:hidden absolute bottom-2 right-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowMobileSizes(!showMobileSizes);
            }}
            className="w-8 h-8 rounded-full bg-[#0A162B] border border-[#1E3A5F] text-[#C5A059] flex items-center justify-center shadow-sm active:scale-95"
            aria-label="Quick add size"
          >
            <Plus className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>

        {/* Mobile Expandable Size Pill Sheet */}
        {showMobileSizes && (
          <div className="lg:hidden absolute inset-x-0 bottom-0 bg-[#0A162B]/95 backdrop-blur-md p-3 border-t border-[#1E3A5F] z-20 animate-accordion-down">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-sans uppercase font-bold text-[#94A3B8]">
                Select Size
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMobileSizes(false);
                }}
                className="text-[10px] text-[#94A3B8] hover:text-white uppercase font-bold"
              >
                Close
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {availableSizes.map((size) => {
                const variant = variants.find((v) => v.size === size);
                const inStock = variant && variant.stockQuantity > 0;
                return (
                  <button
                    key={size}
                    disabled={!inStock}
                    onClick={(e) => handleQuickAdd(size, e)}
                    className="flex-1 min-w-[38px] h-8 bg-[#0F1D36] border border-[#1E3A5F] text-xs font-bold text-[#F1EFEA] hover:bg-[#8B1E1E] hover:text-white rounded-[2px] transition-colors"
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2">
        <div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[#94A3B8] uppercase tracking-wider mb-1">
            <span>{categoryName || "Royal Streetwear"}</span>
            <span className="font-semibold text-[#38BDF8]">{fit} FIT</span>
          </div>

          <Link href={`/products/${slug}`} className="block group-hover:text-[#C5A059] transition-colors">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#F8FAFC] line-clamp-1 leading-snug">
              {title}
            </h3>
          </Link>
        </div>

        {/* Price Tag with High-Contrast Typography */}
        <div className="flex items-baseline space-x-2 pt-1 border-t border-[#1E3A5F]/70">
          <span className="text-base sm:text-lg font-bold text-[#F8FAFC] font-sans tabular-nums">
            {formatPrice(basePrice)}
          </span>
          {comparePrice && (
            <span className="text-xs text-[#64748B] line-through font-sans tabular-nums">
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
