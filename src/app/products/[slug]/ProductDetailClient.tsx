"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  Star,
  Check,
  MapPin,
  Clock,
  Zap,
  ChevronDown,
  X,
} from "lucide-react";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { checkIndianPincode, type PincodeInfo } from "@/lib/pincodes";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductProps {
  product: {
    id: string;
    title: string;
    slug: string;
    description: string;
    fabricDetails?: string | null;
    fit: string;
    careInstructions?: string | null;
    basePrice: number;
    comparePrice?: number | null;
    isNewDrop?: boolean;
    isBestseller?: boolean;
    category: { name: string; slug: string };
    images: Array<{ id: string; url: string; altText?: string | null; isPrimary: boolean }>;
    variants: Array<{
      id: string;
      sku: string;
      size: string;
      color: string;
      colorHex: string;
      stockQuantity: number;
    }>;
    reviews: Array<{
      id: string;
      customerName: string;
      rating: number;
      title?: string | null;
      comment: string;
      verifiedBuyer: boolean;
      createdAt: Date;
    }>;
  };
  relatedProducts: any[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductProps) {
  const router = useRouter();
  const { addItem, openCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.variants[0]?.size || "M");
  const [selectedColor, setSelectedColor] = useState<string>(product.variants[0]?.color || "");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeUnit, setSizeUnit] = useState<"in" | "cm">("in");

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>("fabric");

  // Pincode Checker State
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeResult, setPincodeResult] = useState<PincodeInfo | null>(null);
  const [pincodeError, setPincodeError] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  const primaryImage = product.images[activeImageIndex]?.url || product.images[0]?.url || "/placeholder.jpg";
  const discountPercent = calculateDiscount(product.basePrice, product.comparePrice);
  const wishlisted = isInWishlist(product.id);

  // Group unique sizes and colors
  const availableSizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const uniqueColors = Array.from(
    new Map(product.variants.map((v) => [v.color, { name: v.color, hex: v.colorHex }])).values()
  );

  // Currently selected variant
  const activeVariant =
    product.variants.find((v) => v.size === selectedSize && v.color === selectedColor) ||
    product.variants.find((v) => v.size === selectedSize) ||
    product.variants[0];

  const isOutOfStock = !activeVariant || activeVariant.stockQuantity <= 0;
  const isLowStock = activeVariant && activeVariant.stockQuantity > 0 && activeVariant.stockQuantity <= 5;

  const handlePincodeCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPincodeError("");
    if (pincodeInput.length !== 6) {
      setPincodeError("Please enter a valid 6-digit Indian PIN code");
      setPincodeResult(null);
      return;
    }
    const info = checkIndianPincode(pincodeInput);
    if (!info.isServiceable) {
      setPincodeError("Sorry, we cannot deliver to this PIN code right now.");
      setPincodeResult(null);
    } else {
      setPincodeResult(info);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock || !activeVariant) return;
    setIsAdding(true);
    addItem({
      variantId: activeVariant.id,
      productId: product.id,
      title: product.title,
      slug: product.slug,
      size: activeVariant.size,
      color: activeVariant.color,
      price: product.basePrice,
      imageUrl: primaryImage,
      maxStock: activeVariant.stockQuantity,
    });

    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 400);
  };

  const handleBuyNow = () => {
    if (isOutOfStock || !activeVariant) return;
    addItem({
      variantId: activeVariant.id,
      productId: product.id,
      title: product.title,
      slug: product.slug,
      size: activeVariant.size,
      color: activeVariant.color,
      price: product.basePrice,
      imageUrl: primaryImage,
      maxStock: activeVariant.stockQuantity,
    });
    router.push("/checkout");
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-6 sm:py-8 lg:py-16 pb-28 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-[11px] font-sans uppercase font-medium text-[#71717A] mb-6 sm:mb-8">
          <Link href="/" className="hover:text-[#0A0A0A] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/collections/${product.category.slug}`} className="hover:text-[#0A0A0A] transition-colors">
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-[#0A0A0A] font-bold">{product.title}</span>
        </nav>

        {/* Product Grid: Left Photography Gallery & Right Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: High-Fashion Photography Stack */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sticky top-24">
            {/* Vertical Thumbnail List */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-y-auto max-h-[640px] pb-2 sm:pb-0 shrink-0 select-none no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-[#FFFFFF] rounded-none overflow-hidden border transition-all ${
                      activeImageIndex === idx
                        ? "border-[#0A0A0A] ring-1 ring-[#0A0A0A] scale-105 shadow-sm"
                        : "border-[#E5E5E5] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.url} alt={img.altText || product.title} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Visual Display */}
            <div className="relative aspect-[4/5] w-full bg-[#F5F5F7] border border-[#E5E5E5] overflow-hidden rounded-none shadow-sm">
              <Image
                src={primaryImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              {/* Badges Overlay */}
              <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
                {product.isNewDrop && <Badge variant="crimson">NEW DROP</Badge>}
                {product.isBestseller && <Badge variant="gold">BESTSELLER</Badge>}
                {discountPercent > 0 && <Badge variant="default">-{discountPercent}% OFF</Badge>}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() =>
                  toggleWishlist({
                    productId: product.id,
                    title: product.title,
                    slug: product.slug,
                    price: product.basePrice,
                    comparePrice: product.comparePrice,
                    imageUrl: primaryImage,
                    category: product.category.name,
                  })
                }
                className={`absolute top-3.5 right-3.5 p-3 rounded-full backdrop-blur-md transition-all z-10 shadow-xs ${
                  wishlisted
                    ? "bg-[#0A0A0A] text-white shadow-sm border border-[#0A0A0A]"
                    : "bg-[#FFFFFF]/90 text-[#71717A] hover:text-[#0A0A0A] hover:bg-[#FFFFFF] border border-[#E5E5E5]"
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-white" : ""}`} />
              </button>

              {/* Mobile Photo Dots Indicator */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 sm:hidden bg-[#0A0A0A]/70 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeImageIndex === idx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                      }`}
                      aria-label={`View look ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Purchasing Console */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Fit Badges */}
              <div className="flex items-center space-x-2 text-xs font-sans uppercase font-semibold text-[#71717A] mb-2.5">
                <span className="text-[#0A0A0A]">{product.category.name}</span>
                <span>•</span>
                <span className="bg-[#FFFFFF] border border-[#E5E5E5] px-2.5 py-0.5 text-[#0A0A0A] rounded-none">
                  {product.fit} FIT
                </span>
                <span>•</span>
                <span className="text-[#71717A]">380 GSM</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A0A0A] leading-[1.08] tracking-tight">
                {product.title}
              </h1>

              {/* Reviews Rating summary */}
              <div className="flex items-center space-x-2 mt-3">
                <div className="flex items-center text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#0A0A0A] font-sans">5.0</span>
                <span className="text-xs text-[#71717A] font-sans">({product.reviews.length || 18} verified patron ratings)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 sm:p-5 bg-[#FFFFFF] border border-[#E5E5E5] space-y-1.5 rounded-none shadow-xs">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0A0A0A] tabular-nums">
                  {formatPrice(product.basePrice)}
                </span>
                {product.comparePrice && product.comparePrice > product.basePrice && (
                  <span className="text-base text-[#A1A1AA] line-through tabular-nums font-sans">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-mono font-bold text-white bg-[#0A0A0A] px-2.5 py-0.5 rounded-none tracking-wider">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#71717A] font-sans">
                Inclusive of all Indian taxes. Free express air shipping on orders above ₹999.
              </p>
            </div>

            {/* Color Swatches */}
            {uniqueColors.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-sans uppercase">
                  <span className="text-[#71717A] font-semibold">Color Shade:</span>
                  <span className="text-[#0A0A0A] font-bold">{selectedColor || uniqueColors[0]?.name}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  {uniqueColors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        selectedColor === c.name
                          ? "border-[#0A0A0A] ring-2 ring-[#0A0A0A]/20 scale-110 shadow-xs"
                          : "border-[#E5E5E5] hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector & Size Guide Trigger */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-sans uppercase">
                <span className="text-[#71717A] font-semibold">Select Size:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center space-x-1.5 text-[#0A0A0A] hover:underline underline-offset-4 font-bold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Indian Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2.5">
                {availableSizes.map((size) => {
                  const variant = product.variants.find((v) => v.size === size);
                  const isStockOut = !variant || variant.stockQuantity <= 0;
                  return (
                    <button
                      key={size}
                      disabled={isStockOut}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 flex flex-col items-center justify-center border font-sans font-bold rounded-none active:scale-95 transition-all ${
                        isStockOut
                          ? "border-[#E5E5E5] text-[#A1A1AA] line-through cursor-not-allowed bg-[#F4F4F5]"
                          : selectedSize === size
                          ? "bg-[#0A0A0A] border-[#0A0A0A] text-white shadow-xs scale-[1.02]"
                          : "border-[#E5E5E5] bg-[#FFFFFF] text-[#0A0A0A] hover:border-[#0A0A0A]"
                      }`}
                    >
                      <span className="text-sm">{size}</span>
                    </button>
                  );
                })}
              </div>

              {/* Stock Warning Banner */}
              {isLowStock && (
                <div className="flex items-center space-x-2 text-xs text-[#991B1B] font-sans font-semibold pt-1">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#C5A059]" />
                  <span>Only {activeVariant.stockQuantity} pieces left in size {selectedSize}!</span>
                </div>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                className="w-full h-14 bg-[#0A0A0A] hover:bg-[#262626] text-white text-sm font-sans font-bold uppercase tracking-widest flex items-center justify-center space-x-2.5 shadow-sm rounded-none transition-all duration-200"
              >
                {isAdding ? (
                  <>
                    <Check className="w-5 h-5 text-white stroke-[3]" />
                    <span>ADDING TO BAG...</span>
                  </>
                ) : isOutOfStock ? (
                  <span>OUT OF STOCK</span>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-white stroke-[2.5]" />
                    <span>ADD TO BAG • {formatPrice(product.basePrice)}</span>
                  </>
                )}
              </Button>

              <Button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                variant="outline"
                className="w-full h-12 text-xs font-sans font-bold uppercase tracking-widest flex items-center justify-center space-x-2 border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#FAFAFA] rounded-none bg-white transition-all duration-200"
              >
                <Zap className="w-4 h-4 text-[#C5A059]" />
                <span>INSTANT 1-CLICK CHECKOUT (COD / UPI)</span>
              </Button>
            </div>

            {/* Indian PIN Code Delivery Checker */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E5E5E5] space-y-3 rounded-none shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-wider text-[#0A0A0A]">
                <MapPin className="w-4 h-4 text-[#0A0A0A]" />
                <span>BlueDart Delivery Estimator</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN (e.g. 302001)"
                  value={pincodeInput}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPincodeInput(val);
                    if (val.length === 6) {
                      setPincodeResult(checkIndianPincode(val));
                    }
                  }}
                  className="flex-1 bg-[#FAFAFA] border border-[#E5E5E5] px-3.5 py-2 text-xs font-sans text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] rounded-none"
                />
                <Button type="submit" size="sm" className="bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-sans font-bold rounded-none">
                  Check
                </Button>
              </form>

              {pincodeError && <p className="text-[11px] text-red-600 font-sans">{pincodeError}</p>}

              {pincodeResult && (
                <div className="text-xs space-y-1.5 bg-[#F4F4F5] p-3.5 border border-[#E5E5E5] rounded-none font-sans">
                  <p className="text-[#0A0A0A] font-semibold flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-[#0A0A0A]" />
                    <span>Expected arrival by: <strong className="text-[#0A0A0A]">{pincodeResult.deliveryDateStr}</strong></span>
                  </p>
                  <p className="text-[#71717A] text-[11px]">
                    Shipping to <strong>{pincodeResult.city}, {pincodeResult.state}</strong>
                  </p>
                  <div className="flex items-center space-x-3 text-[10px] text-[#0A0A0A] pt-1 font-semibold">
                    <span>✓ BlueDart Air Transit</span>
                    <span>•</span>
                    <span>✓ COD Available</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion Specifications Section */}
            <div className="border-t border-[#E5E5E5] pt-4 space-y-3 font-sans">
              {/* Accordion 1: Fabric & Craft */}
              <div className="border border-[#E5E5E5] bg-[#FFFFFF] rounded-none overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("fabric")}
                  className="w-full p-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0A0A0A] text-left"
                >
                  <span>Fabric & Craft Architecture</span>
                  <ChevronDown className={`w-4 h-4 text-[#0A0A0A] transition-transform ${openAccordion === "fabric" ? "rotate-180" : ""}`} />
                </button>
                {openAccordion === "fabric" && (
                  <div className="p-3.5 pt-0 text-xs text-[#525252] leading-relaxed border-t border-[#F4F4F5] space-y-2">
                    <p>{product.description}</p>
                    {product.fabricDetails && (
                      <p className="text-[#0A0A0A] font-semibold text-[11px] pt-1">
                        Composition: {product.fabricDetails}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Care & Maintenance */}
              <div className="border border-[#E5E5E5] bg-[#FFFFFF] rounded-none overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("care")}
                  className="w-full p-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0A0A0A] text-left"
                >
                  <span>Wash & Longevity Instructions</span>
                  <ChevronDown className={`w-4 h-4 text-[#0A0A0A] transition-transform ${openAccordion === "care" ? "rotate-180" : ""}`} />
                </button>
                {openAccordion === "care" && (
                  <div className="p-3.5 pt-0 text-xs text-[#525252] leading-relaxed border-t border-[#F4F4F5]">
                    <p>{product.careInstructions || "Machine wash cold inside out with like colors. Do not bleach or tumble dry. Dry flat in shade. Iron low on reverse; avoid direct heat on silicone graphics."}</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="border border-[#E5E5E5] bg-[#FFFFFF] rounded-none overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full p-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0A0A0A] text-left"
                >
                  <span>Express Logistics & 7-Day Exchange</span>
                  <ChevronDown className={`w-4 h-4 text-[#0A0A0A] transition-transform ${openAccordion === "shipping" ? "rotate-180" : ""}`} />
                </button>
                {openAccordion === "shipping" && (
                  <div className="p-3.5 pt-0 text-xs text-[#525252] leading-relaxed border-t border-[#F4F4F5] space-y-1">
                    <p>• Free Express Air Shipping on prepaid and COD orders above ₹999 across all Indian PIN codes.</p>
                    <p>• 7-Day hassle-free doorstep size exchange. Instant courier reverse-pickup scheduled at your doorstep.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Brand Perks Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#71717A] font-sans">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-[#0A0A0A]" />
                <span>Free Express Air &gt; ₹999</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-[#0A0A0A]" />
                <span>7-Day Doorstep Exchange</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#0A0A0A]" />
                <span>100% Pre-Shrunk Cotton</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Reinforced Anti-Sag Collar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Reviews Section */}
        <div className="mt-20 pt-16 border-t border-[#E5E5E5]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#71717A] font-semibold">
                COMMUNITY FEEDBACK
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0A0A0A] tracking-tight">
                Verified Fit Reviews
              </h2>
            </div>
            <span className="text-xs text-[#71717A] mt-2 sm:mt-0 font-sans">
              Overall Fit Rating: 5.0 / 5 (True To Heavyweight Drape)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-[#FFFFFF] border border-[#E5E5E5] space-y-2 rounded-none shadow-xs hover:border-[#0A0A0A] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C5A059]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#A1A1AA]">
                    {new Date(rev.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <h4 className="text-sm font-semibold uppercase text-[#0A0A0A] font-sans tracking-wide">{rev.title}</h4>
                <p className="text-xs text-[#525252] leading-relaxed font-sans">{rev.comment}</p>
                <div className="pt-2 text-[11px] text-[#0A0A0A] font-sans font-semibold">
                  {rev.customerName} <span className="text-[#71717A] font-normal">• Verified Purchase</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#E5E5E5]">
            <div className="mb-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#71717A] font-semibold">
                COMPLETE THE COLLECTION
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0A0A0A] tracking-tight">
                You Might Also Like
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  slug={p.slug}
                  basePrice={p.basePrice}
                  comparePrice={p.comparePrice}
                  fit={p.fit}
                  categoryName={p.category.name}
                  isNewDrop={p.isNewDrop}
                  isBestseller={p.isBestseller}
                  images={p.images}
                  variants={p.variants}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Dedicated Purchasing Action Dock */}
      <div className="fixed bottom-0 inset-x-0 bg-[#FAFAFA]/95 backdrop-blur-2xl border-t border-[#E5E5E5] px-4 pt-2.5 pb-[max(env(safe-area-inset-bottom,12px),12px)] z-40 lg:hidden shadow-lg">
        <div className="flex items-center gap-2.5">
          {/* Wishlist Button */}
          <button
            onClick={() =>
              toggleWishlist({
                productId: product.id,
                title: product.title,
                slug: product.slug,
                price: product.basePrice,
                comparePrice: product.comparePrice,
                imageUrl: primaryImage,
                category: product.category.name,
              })
            }
            className={`w-12 h-12 rounded-none border flex items-center justify-center shrink-0 active:scale-95 transition-all ${
              wishlisted
                ? "bg-[#0A0A0A] border-[#0A0A0A] text-white shadow-xs"
                : "bg-[#FFFFFF] border-[#E5E5E5] text-[#71717A] hover:text-[#0A0A0A]"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlisted ? "fill-white" : ""}`} />
          </button>

          {/* Quick Size Pill */}
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="h-12 px-3 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none flex flex-col justify-center items-start shrink-0 active:scale-95 transition-transform"
            aria-label="Select size or view size guide"
          >
            <span className="text-[9px] font-sans font-bold text-[#71717A] uppercase leading-none">SIZE</span>
            <span className="text-xs font-sans font-bold text-[#0A0A0A] flex items-center gap-1 mt-0.5">
              {selectedSize} <ChevronDown className="w-3 h-3 text-[#0A0A0A]" />
            </span>
          </button>

          {/* Full-width High-Impact ADD TO BAG Button */}
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding}
            className="flex-1 h-12 bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-none flex items-center justify-center space-x-2 transition-all duration-200"
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4 text-white stroke-[3]" />
                <span>ADDING...</span>
              </>
            ) : isOutOfStock ? (
              <span>OUT OF STOCK</span>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-white stroke-[2.5]" />
                <span>ADD TO BAG • {formatPrice(product.basePrice)}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Indian Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] border-t sm:border border-[#E5E5E5] max-w-lg w-full p-6 space-y-4 shadow-2xl rounded-t-2xl sm:rounded-none max-h-[85vh] overflow-y-auto">
            {/* Mobile drag handle */}
            <div className="w-12 h-1 bg-[#E5E5E5] rounded-full mx-auto sm:hidden mb-2" />

            <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-3">
              <div className="flex items-center space-x-2">
                <Ruler className="w-4 h-4 text-[#0A0A0A]" />
                <h3 className="text-base font-serif font-bold uppercase text-[#0A0A0A]">
                  Indian Streetwear Size Guide
                </h3>
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-[#71717A] hover:text-[#0A0A0A] p-1.5 rounded-none hover:bg-[#F4F4F5] transition-colors"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Unit Switcher */}
            <div className="flex justify-between items-center text-xs font-sans">
              <p className="text-[#71717A]">
                Intentionally engineered for <strong>dropped-shoulder boxy drape</strong>.
              </p>
              <div className="flex border border-[#E5E5E5] bg-[#F4F4F5] p-0.5 rounded-none text-[10px]">
                <button
                  onClick={() => setSizeUnit("in")}
                  className={`px-2.5 py-0.5 rounded-none font-bold transition-colors ${
                    sizeUnit === "in" ? "bg-[#0A0A0A] text-white" : "text-[#71717A]"
                  }`}
                >
                  IN
                </button>
                <button
                  onClick={() => setSizeUnit("cm")}
                  className={`px-2.5 py-0.5 rounded-none font-bold transition-colors ${
                    sizeUnit === "cm" ? "bg-[#0A0A0A] text-white" : "text-[#71717A]"
                  }`}
                >
                  CM
                </button>
              </div>
            </div>

            {/* Quick Pick Size Direct In Sheet */}
            <div className="space-y-1.5 font-sans">
              <span className="text-[10px] uppercase font-semibold text-[#71717A]">Pick your size:</span>
              <div className="grid grid-cols-5 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                    }}
                    className={`py-2 text-xs font-bold rounded-none border transition-all ${
                      selectedSize === size
                        ? "bg-[#0A0A0A] border-[#0A0A0A] text-white shadow-xs"
                        : "bg-[#FFFFFF] border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-[#E5E5E5] rounded-none font-sans">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] text-[#0A0A0A] border-b border-[#E5E5E5] font-bold">
                    <th className="p-2.5">SIZE</th>
                    <th className="p-2.5">CHEST ({sizeUnit.toUpperCase()})</th>
                    <th className="p-2.5">LENGTH ({sizeUnit.toUpperCase()})</th>
                    <th className="p-2.5">SHOULDER ({sizeUnit.toUpperCase()})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F4F5] text-[#0A0A0A]">
                  {sizeUnit === "in" ? (
                    <>
                      <tr className={selectedSize === "S" ? "bg-[#F4F4F5]" : ""}><td className="p-2.5 font-bold text-[#0A0A0A]">S</td><td className="p-2.5">42</td><td className="p-2.5">28.5</td><td className="p-2.5">21</td></tr>
                      <tr className={selectedSize === "M" ? "bg-[#F4F4F5]" : ""}><td className="p-2.5 font-bold text-[#0A0A0A]">M</td><td className="p-2.5">44</td><td className="p-2.5">29.5</td><td className="p-2.5">22</td></tr>
                      <tr className={selectedSize === "L" ? "bg-[#F4F4F5]" : ""}><td className="p-2.5 font-bold text-[#0A0A0A]">L</td><td className="p-2.5">46</td><td className="p-2.5">30.5</td><td className="p-2.5">23</td></tr>
                      <tr className={selectedSize === "XL" ? "bg-[#F4F4F5]" : ""}><td className="p-2.5 font-bold text-[#0A0A0A]">XL</td><td className="p-2.5">48</td><td className="p-2.5">31.5</td><td className="p-2.5">24</td></tr>
                      <tr className={selectedSize === "XXL" ? "bg-[#F4F4F5]" : ""}><td className="p-2.5 font-bold text-[#0A0A0A]">XXL</td><td className="p-2.5">50</td><td className="p-2.5">32.5</td><td className="p-2.5">25</td></tr>
                    </>
                  ) : (
                    <>
                      <tr className={selectedSize === "S" ? "bg-[#F4F4F5]" : ""}><td className="p-2.5 font-bold text-[#0A0A0A]">S</td><td className="p-2.5">107</td><td className="p-2.5">72</td><td className="p-2.5">53</td></tr>
                      <tr className={selectedSize === "M" ? "bg-[#F4F4F5]" : ""}><td className="p-2.5 font-bold text-[#0A0A0A]">M</td><td className="p-2.5">112</td><td className="p-2.5">75</td><td className="p-2.5">56</td></tr>
                      <tr className={selectedSize === "L" ? "bg-[#F4F4F5]" : ""}><td className="p-2.5 font-bold text-[#0A0A0A]">L</td><td className="p-2.5">117</td><td className="p-2.5">77</td><td className="p-2.5">58</td></tr>
                      <tr className={selectedSize === "XL" ? "bg-[#F4F4F5]" : ""}><td className="p-2.5 font-bold text-[#0A0A0A]">XL</td><td className="p-2.5">122</td><td className="p-2.5">80</td><td className="p-2.5">61</td></tr>
                      <tr className={selectedSize === "XXL" ? "bg-[#F4F4F5]" : ""}><td className="p-2.5 font-bold text-[#0A0A0A]">XXL</td><td className="p-2.5">127</td><td className="p-2.5">83</td><td className="p-2.5">63.5</td></tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <Button onClick={() => setIsSizeGuideOpen(false)} className="w-full font-bold h-12 bg-[#0A0A0A] text-white hover:bg-[#262626] font-sans text-xs uppercase tracking-wider rounded-none">
              CONFIRM SIZE {selectedSize} • RETURN TO PIECE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
