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
        <div className="w-screen max-w-xl bg-[#0F1118] border-l border-[#1F2433] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 text-[#F8FAFC]">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#1F2433] flex items-center justify-between bg-[#12141D]/90 backdrop-blur-md">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase text-[#D4FF00]">
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
              className="p-2 bg-[#1A1D2A] border border-[#252A3C] text-[#94A3B8] hover:text-[#D4FF00] hover:border-[#D4FF00] transition-colors rounded-none"
              aria-label="Close buy section"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Visual Garment Display */}
            <div className="relative w-full aspect-4/3 bg-[#090A0F] border border-[#1E2230] rounded-none overflow-hidden flex items-center justify-center p-4">
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
                  <Badge variant="volt" className="text-[10px] px-2 py-0.5">
                    {discountPercent}% OFF
                  </Badge>
                )}
                {product.fit && (
                  <Badge variant="carbon" className="text-[10px] px-2 py-0.5">
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
                    className={`relative w-14 h-14 border bg-[#090A0F] rounded-none shrink-0 overflow-hidden transition-all ${
                      selectedImageIndex === idx
                        ? "border-[#D4FF00] ring-1 ring-[#D4FF00]"
                        : "border-[#1E2230] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.url} alt="" fill className="object-contain p-1" sizes="56px" />
                  </button>
                ))}
              </div>
            )}

            {/* Pricing Section */}
            <div className="flex items-baseline space-x-3 border-b border-[#1F2433] pb-4">
              <span className="text-3xl font-black tracking-tight text-[#D4FF00] tabular-nums">
                {formatPrice(product.basePrice)}
              </span>
              {product.comparePrice && product.comparePrice > product.basePrice && (
                <span className="text-base text-[#64748B] line-through tabular-nums">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              <span className="text-xs text-[#94A3B8] font-medium ml-auto">
                Inclusive of all taxes
              </span>
            </div>

            {/* Variant Sizing Section */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Select Size
                </span>
                <span className="text-[11px] text-[#D4FF00] font-bold">
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
                      className={`py-3 px-2 border text-center text-xs font-black tracking-wider transition-all relative ${
                        isSelected
                          ? "border-[#D4FF00] bg-[#D4FF00] text-black shadow-md shadow-[#D4FF00]/10"
                          : isOutOfStock
                          ? "border-[#1F2433] text-[#475569] bg-[#0A0B10] line-through cursor-not-allowed opacity-50"
                          : "border-[#1E2230] bg-[#13151F] text-[#F8FAFC] hover:border-[#D4FF00]/60 hover:text-white"
                      }`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between border-y border-[#1F2433] py-4">
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Quantity
              </span>
              <div className="flex items-center border border-[#1E2230] bg-[#12141D]">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 text-sm text-[#94A3B8] hover:text-[#D4FF00] transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-white tabular-nums border-x border-[#1E2230]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(currentVariant?.stockQuantity || 10, prev + 1)
                    )
                  }
                  className="px-3 py-1.5 text-sm text-[#94A3B8] hover:text-[#D4FF00] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* PIN Code Delivery Estimator */}
            <div className="bg-[#12141D] border border-[#1E2230] p-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-white mb-2">
                <MapPin className="w-4 h-4 text-[#D4FF00]" />
                <span>Estimate Indian Delivery</span>
              </div>
              <form onSubmit={handleCheckPin} className="flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
                  className="bg-[#090A0F] border border-[#1E2230] px-3 py-2 text-xs text-white placeholder-[#64748B] focus:border-[#D4FF00] focus:outline-none flex-1 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#1C1F2E] border border-[#2B3044] text-xs font-bold text-white hover:text-[#D4FF00] hover:border-[#D4FF00] transition-colors"
                >
                  Check
                </button>
              </form>
              {pinStatus && (
                <p className="mt-2 text-[11px] text-[#D4FF00] font-medium leading-relaxed">
                  {pinStatus}
                </p>
              )}
            </div>

            {/* Fabric & Architecture Highlights */}
            {product.fabricDetails && (
              <div className="space-y-1.5 text-xs text-[#94A3B8] leading-relaxed">
                <span className="font-bold text-white uppercase text-[11px] tracking-wider block">
                  Material & Craft:
                </span>
                <p>{product.fabricDetails}</p>
              </div>
            )}
          </div>

          {/* Action CTAs Footer */}
          <div className="p-5 sm:p-6 border-t border-[#1F2433] bg-[#12141D]/95 backdrop-blur-md space-y-3">
            {/* Primary Action 1: Instant BUY NOW */}
            <Button
              onClick={handleBuyNow}
              className="w-full bg-[#D4FF00] hover:bg-[#BCE600] text-black font-black uppercase tracking-wider py-6 rounded-none text-sm shadow-lg shadow-[#D4FF00]/15 flex items-center justify-center space-x-2 group transition-all"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Buy Now — Instant Checkout</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Primary Action 2: Add to Bag */}
            <Button
              onClick={handleAddToCart}
              variant="outline"
              disabled={added}
              className="w-full bg-[#181B26] hover:bg-[#1E2230] text-white border-[#2A2F42] hover:border-[#D4FF00] font-bold uppercase tracking-wider py-5 rounded-none text-xs flex items-center justify-center space-x-2 transition-all"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-[#D4FF00]" />
                  <span className="text-[#D4FF00]">Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag ({formatPrice(product.basePrice * quantity)})</span>
                </>
              )}
            </Button>

            {/* View Full Product Specifications */}
            <div className="text-center pt-1">
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] hover:text-[#D4FF00] transition-colors inline-flex items-center space-x-1"
              >
                <span>View Full Specifications & Size Guide</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
