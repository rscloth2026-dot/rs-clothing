"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
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
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const primaryImage = images.find((img) => img.isPrimary)?.url || images[0]?.url || "/placeholder.jpg";
  const hoverImage = images.length > 1 ? images[1].url : primaryImage;

  const discountPercent = calculateDiscount(basePrice, comparePrice);
  const wishlisted = isInWishlist(id);

  // Group unique sizes and colors
  const availableSizes = Array.from(new Set(variants.map((v) => v.size)));
  const uniqueColors = Array.from(
    new Map(variants.map((v) => [v.colorHex, { name: v.color, hex: v.colorHex }])).values()
  );

  const handleQuickAdd = (size: string) => {
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
    }, 1200);
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
      className="group relative flex flex-col bg-onyx-900 border border-border/70 hover:border-volt/60 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Badge & Wishlist Container */}
      <div className="relative aspect-[3/4] w-full bg-onyx-800 overflow-hidden">
        <Link href={`/products/${slug}`} className="block w-full h-full">
          <Image
            src={isHovered ? hoverImage : primaryImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {isNewDrop && <Badge variant="drop">NEW DROP</Badge>}
          {isBestseller && <Badge variant="default">BESTSELLER</Badge>}
          {discountPercent > 0 && <Badge variant="dark">-{discountPercent}%</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            wishlisted
              ? "bg-volt text-black"
              : "bg-black/60 text-white hover:text-volt hover:bg-black/80"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-black" : ""}`} />
        </button>

        {/* Fit Pill */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="text-[10px] font-mono uppercase tracking-widest bg-black/80 text-white px-2 py-0.5 border border-white/10">
            {fit} FIT
          </span>
        </div>

        {/* Quick Add Size Bar (Revealed on hover or mobile tap) */}
        <div className="absolute inset-x-0 bottom-0 bg-onyx-950/95 backdrop-blur-md p-2.5 border-t border-border translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-20 flex flex-col space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase">
            <span>Quick Add Size:</span>
            {justAdded && (
              <span className="text-volt font-bold flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>ADDED!</span>
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {availableSizes.map((size) => {
              const variant = variants.find((v) => v.size === size);
              const isOutOfStock = !variant || variant.stockQuantity <= 0;
              return (
                <button
                  key={size}
                  disabled={isOutOfStock}
                  onClick={() => handleQuickAdd(size)}
                  className={`flex-1 min-w-[32px] py-1 text-[11px] font-mono font-bold uppercase border transition-colors ${
                    isOutOfStock
                      ? "border-border/40 text-muted-foreground/30 line-through cursor-not-allowed"
                      : selectedVariantId === variant?.id
                      ? "bg-volt border-volt text-black"
                      : "border-border bg-onyx-800 text-white hover:border-volt hover:text-volt"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
        <div>
          {/* Swatches */}
          {uniqueColors.length > 0 && (
            <div className="flex items-center space-x-1.5 mb-1.5">
              {uniqueColors.map((c) => (
                <span
                  key={c.hex}
                  title={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-border"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}

          <Link href={`/products/${slug}`} className="block">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white hover:text-volt line-clamp-1 transition-colors">
              {title}
            </h3>
          </Link>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline space-x-2 pt-1 border-t border-border/40">
          <span className="text-sm font-extrabold text-volt tabular-nums">
            {formatPrice(basePrice)}
          </span>
          {comparePrice && comparePrice > basePrice && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              {formatPrice(comparePrice)}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[10px] font-mono text-green-400 font-bold ml-auto">
              Save {discountPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
