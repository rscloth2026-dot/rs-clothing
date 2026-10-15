"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight, Check, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export interface QuickViewProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  fabricDetails?: string | null;
  fit: string;
  basePrice: number;
  comparePrice?: number | null;
  categoryName?: string;
  images: Array<{ url: string; altText?: string | null }>;
  variants: Array<{
    id: string;
    sku: string;
    size: string;
    color: string;
    colorHex: string;
    stockQuantity: number;
  }>;
}

interface QuickViewModalProps {
  product: QuickViewProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem, openCart } = useCartStore();

  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Initialize selected variant when product changes
  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
      setSelectedImageIndex(0);
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const currentVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const discountPercent =
    product.comparePrice && product.comparePrice > product.basePrice
      ? Math.round(((product.comparePrice - product.basePrice) / product.comparePrice) * 100)
      : null;

  const handleAddToCart = () => {
    if (!currentVariant) return;

    addItem({
      variantId: currentVariant.id,
      productId: product.id,
      title: product.title,
      slug: product.slug,
      size: currentVariant.size,
      color: currentVariant.color,
      price: product.basePrice,
      imageUrl: product.images[selectedImageIndex]?.url || product.images[0]?.url || "/placeholder.jpg",
      maxStock: currentVariant.stockQuantity || 20,
    }, quantity);


    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      openCart();
    }, 600);
  };

  const activeImage =
    product.images[selectedImageIndex]?.url || product.images[0]?.url || "/placeholder.jpg";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white border border-[#E5E5E5] shadow-2xl rounded-none z-10 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 border border-[#E5E5E5] text-[#71717A] hover:text-[#0A0A0A] hover:border-[#1E40AF] transition-colors rounded-none shadow-xs"
          aria-label="Close product preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Media Gallery */}
        <div className="w-full md:w-1/2 bg-[#FAFAFA] border-b md:border-b-0 md:border-r border-[#E5E5E5] p-6 sm:p-8 flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[420px]">
          <div className="relative w-full h-64 sm:h-80 max-w-sm flex items-center justify-center">
            <Image
              src={activeImage}
              alt={product.title}
              fill
              className="object-contain drop-shadow-xl p-4 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>

          {/* Thumbnails if multiple images exist */}
          {product.images.length > 1 && (
            <div className="flex items-center space-x-2 mt-4 overflow-x-auto max-w-full pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-12 h-12 border bg-white rounded-none shrink-0 overflow-hidden transition-all ${
                    selectedImageIndex === idx
                      ? "border-[#1E40AF] ring-1 ring-[#1E40AF]"
                      : "border-[#E5E5E5] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    className="object-contain p-1"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Atelier Origin Watermark */}
          <div className="absolute bottom-3 left-4 text-[9px] font-sans uppercase tracking-[0.2em] text-[#A1A1AA] flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3 text-[#FBBF24]" />
            <span>Jodhpur Royal Atelier Sample</span>
          </div>
        </div>

        {/* Right: Garment Specifications & Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Category & Drop Badge */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#1E40AF] bg-[#1E40AF]/10 px-2.5 py-0.5 border border-[#1E40AF]/25">
                {product.categoryName || "ROYAL ATELIER"}
              </span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#71717A] bg-[#FAFAFA] px-2.5 py-0.5 border border-[#E5E5E5]">
                {product.fit}
              </span>
            </div>

            {/* Title */}
            <h2
              id="quick-view-title"
              className="text-2xl sm:text-3xl font-serif font-bold text-[#0A0A0A] tracking-tight leading-snug"
            >
              {product.title}
            </h2>

            {/* Price & Discount */}
            <div className="flex items-baseline space-x-3 pt-1">
              <span className="text-2xl font-serif font-bold text-[#0A0A0A] tracking-tight">
                {formatPrice(product.basePrice)}
              </span>
              {product.comparePrice && product.comparePrice > product.basePrice && (
                <span className="text-sm font-sans text-[#71717A] line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              {discountPercent && (
                <span className="text-[11px] font-sans font-bold uppercase text-[#991B1B] bg-[#FEF2F2] border border-[#FCA5A5] px-2 py-0.5">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Fabric & Longevity Details */}
            {product.fabricDetails && (
              <p className="text-xs font-sans text-[#525252] leading-relaxed border-l-2 border-[#1E40AF] pl-3 py-0.5">
                {product.fabricDetails}
              </p>
            )}

            {/* Sizes Selection */}
            {product.variants.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-bold text-[#0A0A0A] uppercase tracking-wider">
                    Select Size:
                  </span>
                  <span className="text-[#1E40AF] font-medium text-[11px]">
                    Size in stock: {currentVariant?.size}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = v.id === selectedVariantId;
                    const isAvailable = v.stockQuantity > 0;
                    return (
                      <button
                        key={v.id}
                        disabled={!isAvailable}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`h-10 min-w-[44px] px-3.5 text-xs font-mono font-bold transition-all border rounded-none ${
                          isSelected
                            ? "bg-[#1E40AF] text-white border-[#1E40AF] shadow-xs"
                            : isAvailable
                            ? "bg-white text-[#0A0A0A] border-[#E5E5E5] hover:border-[#1E40AF]"
                            : "bg-[#FAFAFA] text-[#A1A1AA] border-[#E5E5E5] line-through opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock & Delivery Guarantees */}
            <div className="space-y-1.5 pt-2 text-[11px] font-sans text-[#71717A]">
              <div className="flex items-center space-x-2 text-[#1E40AF] font-bold">
                <Check className="w-3.5 h-3.5 text-[#1E40AF]" />
                <span>Express 48H Nationwide Dispatch from Jodhpur</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#71717A]" />
                <span>Authentic 380+ GSM Combed Fabric Guarantee</span>
              </div>
            </div>
          </div>

          {/* Action Dock */}
          <div className="space-y-2.5 pt-6 mt-6 border-t border-[#E5E5E5]">
            <Button
              onClick={handleAddToCart}
              size="lg"
              disabled={!currentVariant || currentVariant.stockQuantity <= 0}
              className="w-full h-12 bg-[#0A0A0A] hover:bg-[#1E3A8A] text-white font-bold uppercase tracking-wider text-xs rounded-none transition-all flex items-center justify-center space-x-2 active:scale-[0.98] border border-transparent hover:border-[#1E40AF]"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-[#FBBF24]" />
                  <span>Added to Royal Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag — {formatPrice(product.basePrice)}</span>
                </>
              )}
            </Button>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="w-full block"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full h-11 border-[#E5E5E5] bg-white text-[#0A0A0A] hover:border-[#1E40AF] hover:text-[#1E40AF] font-bold uppercase tracking-wider text-xs rounded-none transition-all flex items-center justify-center space-x-2"
              >
                <span>View Full Garment Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
