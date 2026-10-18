"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  ShoppingBag,
  Zap,
  Check,
  Truck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ClothBuyProduct {
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

interface ClothBuyDrawerProps {
  product: ClothBuyProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ClothBuyDrawer({ product, isOpen, onClose }: ClothBuyDrawerProps) {
  const router = useRouter();
  const { addItem, openCart } = useCartStore();

  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [pinStatus, setPinStatus] = useState<string | null>(null);

  // Synchronize first variant when product changes
  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
      setSelectedImageIndex(0);
      setQuantity(1);
      setAdded(false);
      setPinStatus(null);
    }
  }, [product]);

  // Keyboard shortcut: ESC to dismiss
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

  const activeImage =
    product.images[selectedImageIndex]?.url || product.images[0]?.url || "/placeholder.jpg";

  // Action 1: Add to bag and reveal cart drawer
  const handleAddToCart = () => {
    if (!currentVariant) return;

    addItem(
      {
        variantId: currentVariant.id,
        productId: product.id,
        title: product.title,
        slug: product.slug,
        size: currentVariant.size,
        color: currentVariant.color,
        price: product.basePrice,
        imageUrl: activeImage,
        maxStock: currentVariant.stockQuantity || 20,
      },
      quantity
    );

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      openCart();
    }, 450);
  };

  // Action 2: Instant Buy Now — direct 1-click checkout
  const handleBuyNow = () => {
    if (!currentVariant) return;

    addItem(
      {
        variantId: currentVariant.id,
        productId: product.id,
        title: product.title,
        slug: product.slug,
        size: currentVariant.size,
        color: currentVariant.color,
        price: product.basePrice,
        imageUrl: activeImage,
        maxStock: currentVariant.stockQuantity || 20,
      },
      quantity
    );

    onClose();
    router.push("/checkout");
  };

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pinCode.trim())) {
      setPinStatus(`Express Delivery to ${pinCode} in 2-3 Days via BlueDart Express (Free Delivery)`);
    } else {
      setPinStatus("Please enter a valid 6-digit Indian PIN code");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cloth-buy-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-xl bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 text-zinc-100">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/95 backdrop-blur-md">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase text-zinc-300">
                  ATELIER ARCHIVE // QUICK BUY
                </span>
              </div>
              <h2
                id="cloth-buy-title"
                className="text-lg font-black tracking-tight text-white mt-0.5 line-clamp-1"
              >
                {product.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors rounded-none"
              aria-label="Close buy section"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Visual Garment Display */}
            <div className="relative w-full aspect-4/3 bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden flex items-center justify-center p-4">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                className="object-contain p-2 drop-shadow-2xl transition-all duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />

              {/* Status pill in corner */}
              <div className="absolute top-3 left-3 flex flex-col space-y-1">
                {discountPercent && (
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-white text-black font-black border-transparent">
                    {discountPercent}% OFF
                  </Badge>
                )}
                {product.fit && (
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-300 border-zinc-700">
                    {product.fit}
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-14 border bg-zinc-950 rounded-none shrink-0 overflow-hidden transition-all ${
                      selectedImageIndex === idx
                        ? "border-white ring-1 ring-white"
                        : "border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600"
                    }`}
                  >
                    <Image src={img.url} alt="" fill className="object-contain p-1" sizes="56px" />
                  </button>
                ))}
              </div>
            )}

            {/* Pricing Section */}
            <div className="flex items-baseline space-x-3 border-b border-zinc-800 pb-4">
              <span className="text-3xl font-black tracking-tight text-white tabular-nums">
                {formatPrice(product.basePrice)}
              </span>
              {product.comparePrice && product.comparePrice > product.basePrice && (
                <span className="text-base text-zinc-500 line-through tabular-nums">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              <span className="text-xs text-zinc-400 font-medium ml-auto">
                Inclusive of all taxes
              </span>
            </div>

            {/* Variant Sizing Section */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Select Size
                </span>
                <span className="text-[11px] text-zinc-400 font-bold">
                  {currentVariant?.stockQuantity && currentVariant.stockQuantity < 5
                    ? `⚡ Low Stock: Only ${currentVariant.stockQuantity} left`
                    : "✓ In Stock — Ready to Ship"}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.variants.map((v) => {
                  const isSelected = v.id === selectedVariantId;
                  const isOutOfStock = v.stockQuantity <= 0;

                  return (
                    <button
                      key={v.id}
                      onClick={() => !isOutOfStock && setSelectedVariantId(v.id)}
                      disabled={isOutOfStock}
                      className={`min-h-[44px] py-2.5 px-2 border text-center text-xs font-black tracking-wider transition-all relative flex items-center justify-center active:scale-95 ${
                        isSelected
                          ? "border-white bg-white text-black shadow-md font-black"
                          : isOutOfStock
                          ? "border-zinc-800 text-zinc-600 bg-zinc-950 line-through cursor-not-allowed opacity-40"
                          : "border-zinc-800 bg-zinc-950 text-zinc-200 hover:border-zinc-600 hover:text-white"
                      }`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between border-y border-zinc-800 py-3.5">
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Quantity
              </span>
              <div className="flex items-center border border-zinc-800 bg-zinc-950">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-11 h-11 text-base text-zinc-400 hover:text-white transition-colors flex items-center justify-center active:scale-90"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-bold text-white tabular-nums border-x border-zinc-800 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(currentVariant?.stockQuantity || 10, prev + 1)
                    )
                  }
                  className="w-11 h-11 text-base text-zinc-400 hover:text-white transition-colors flex items-center justify-center active:scale-90"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* PIN Code Delivery Estimator */}
            <div className="bg-zinc-950 border border-zinc-800 p-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-white mb-2">
                <MapPin className="w-4 h-4 text-zinc-300" />
                <span>Estimate Indian Delivery</span>
              </div>
              <form onSubmit={handleCheckPin} className="flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
                  className="bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none flex-1 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-zinc-800 border border-zinc-700 text-xs font-bold text-white hover:bg-zinc-750 transition-colors"
                >
                  Check
                </button>
              </form>
              {pinStatus && (
                <p className="mt-2 text-[11px] text-zinc-300 font-medium leading-relaxed">
                  {pinStatus}
                </p>
              )}
            </div>

            {/* Fabric & Architecture Highlights */}
            {product.fabricDetails && (
              <div className="space-y-1.5 text-xs text-zinc-400 leading-relaxed">
                <span className="font-bold text-white uppercase text-[11px] tracking-wider block">
                  Material & Craft:
                </span>
                <p>{product.fabricDetails}</p>
              </div>
            )}
          </div>

          {/* Action CTAs Footer with iOS Home Bar Safe Area Insets */}
          <div className="p-4 sm:p-6 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-md space-y-2.5 pb-[max(env(safe-area-inset-bottom,16px),16px)] sm:pb-[max(env(safe-area-inset-bottom,24px),24px)]">
            {/* Primary Action 1: Instant BUY NOW */}
            <Button
              onClick={handleBuyNow}
              className="w-full min-h-[48px] bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider py-4 rounded-none text-xs sm:text-sm shadow-lg flex items-center justify-center space-x-2 group transition-all border-none active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 fill-black text-black" />
              <span>Buy Now — Instant Checkout</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Primary Action 2: Add to Bag */}
            <Button
              onClick={handleAddToCart}
              variant="outline"
              disabled={added}
              className="w-full min-h-[44px] bg-zinc-950 hover:bg-zinc-800 text-white border-zinc-750 hover:border-zinc-500 font-bold uppercase tracking-wider py-3.5 rounded-none text-xs flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span className="text-white">Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-zinc-300" />
                  <span>Add to Bag ({formatPrice(product.basePrice * quantity)})</span>
                </>
              )}
            </Button>

            {/* View Full Product Specifications */}
            <div className="text-center pt-0.5">
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors inline-flex items-center space-x-1"
              >
                <span>View Full Specifications & Size Guide</span>
                <ArrowRight className="w-3 h-3 text-zinc-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
