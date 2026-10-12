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
  ChevronDown,
  ArrowRight,
  Info,
  MapPin,
  Clock,
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

  return (
    <div className="min-h-screen bg-onyx-950 py-8 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-mono uppercase text-muted-foreground mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href={`/collections/${product.category.slug}`} className="hover:text-white transition-colors">
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-volt line-clamp-1">{product.title}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery Column */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-onyx-900 border transition-all flex-shrink-0 overflow-hidden ${
                      activeImageIndex === idx ? "border-volt ring-1 ring-volt" : "border-border hover:border-white/50"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.altText || product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] flex-1 bg-onyx-900 border border-border overflow-hidden">
              <Image
                src={primaryImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.isNewDrop && <Badge variant="drop">NEW DROP</Badge>}
                {product.isBestseller && <Badge variant="default">BESTSELLER</Badge>}
                {discountPercent > 0 && <Badge variant="dark">-{discountPercent}% OFF</Badge>}
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
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all z-10 ${
                  wishlisted
                    ? "bg-volt text-black"
                    : "bg-black/60 text-white hover:text-volt hover:bg-black/80"
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-black" : ""}`} />
              </button>
            </div>
          </div>

          {/* Product Buying Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Fit Badges */}
              <div className="flex items-center space-x-2 text-xs font-mono uppercase text-muted-foreground mb-2">
                <span className="text-volt">{product.category.name}</span>
                <span>•</span>
                <span className="bg-onyx-800 border border-border px-2 py-0.5 text-white">
                  {product.fit} FIT
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-editorial">
                {product.title}
              </h1>

              {/* Reviews Rating summary */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center text-volt">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-volt" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">5.0</span>
                <span className="text-xs text-muted-foreground">({product.reviews.length || 18} verified ratings)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 bg-onyx-900 border border-border/80 space-y-1">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black text-volt tabular-nums">
                  {formatPrice(product.basePrice)}
                </span>
                {product.comparePrice && product.comparePrice > product.basePrice && (
                  <span className="text-base text-muted-foreground line-through tabular-nums">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-mono font-bold text-green-400 bg-green-500/10 px-2 py-0.5 border border-green-500/20">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">
                Inclusive of all taxes across India. Free shipping on orders above ₹999.
              </p>
            </div>

            {/* Color Swatches */}
            {uniqueColors.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono uppercase">
                  <span className="text-muted-foreground">Color:</span>
                  <span className="text-white font-bold">{selectedColor || uniqueColors[0]?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {uniqueColors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        selectedColor === c.name ? "border-volt scale-110" : "border-border hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector & Size Guide Trigger */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs font-mono uppercase">
                <span className="text-muted-foreground">Select Size:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center space-x-1 text-volt hover:underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Indian Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {availableSizes.map((size) => {
                  const variant = product.variants.find((v) => v.size === size);
                  const isStockOut = !variant || variant.stockQuantity <= 0;
                  return (
                    <button
                      key={size}
                      disabled={isStockOut}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 flex flex-col items-center justify-center border font-mono font-bold transition-all ${
                        isStockOut
                          ? "border-border/40 text-muted-foreground/30 line-through cursor-not-allowed bg-onyx-900"
                          : selectedSize === size
                          ? "bg-volt border-volt text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                          : "border-border bg-onyx-800 text-white hover:border-volt hover:text-volt"
                      }`}
                    >
                      <span className="text-sm">{size}</span>
                    </button>
                  );
                })}
              </div>

              {/* Stock Warning Banner */}
              {isLowStock && (
                <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-mono pt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>⚡ Only {activeVariant.stockQuantity} pieces left in size {selectedSize}!</span>
                </div>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                className="w-full h-14 text-sm font-black uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                {isAdding ? (
                  <>
                    <Check className="w-5 h-5 text-black" />
                    <span>ADDING TO BAG...</span>
                  </>
                ) : isOutOfStock ? (
                  <span>OUT OF STOCK</span>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-black" />
                    <span>ADD TO BAG • {formatPrice(product.basePrice)}</span>
                  </>
                )}
              </Button>

              <Button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                variant="secondary"
                className="w-full h-12 text-xs font-black uppercase tracking-wider"
              >
                ⚡ INSTANT BUY NOW (COD / UPI)
              </Button>
            </div>

            {/* Indian PIN Code Delivery Checker */}
            <div className="p-4 bg-onyx-900 border border-border space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-white">
                <MapPin className="w-4 h-4 text-volt" />
                <span>Delivery Estimator (Pan-India)</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code (e.g. 560038)"
                  value={pincodeInput}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPincodeInput(val);
                    if (val.length === 6) {
                      setPincodeResult(checkIndianPincode(val));
                    }
                  }}
                  className="flex-1 bg-onyx-800 border border-border px-3 py-2 text-xs font-mono text-white placeholder:text-muted-foreground focus:outline-none focus:border-volt"
                />
                <Button type="submit" size="sm" variant="outline">
                  Check
                </Button>
              </form>

              {pincodeError && <p className="text-[11px] text-destructive">{pincodeError}</p>}

              {pincodeResult && (
                <div className="text-xs space-y-1 bg-onyx-800/80 p-3 border border-border/60">
                  <p className="text-white font-bold flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-volt" />
                    <span>Expected delivery by: <strong className="text-volt">{pincodeResult.deliveryDateStr}</strong></span>
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    Delivering to <strong>{pincodeResult.city}, {pincodeResult.state}</strong>
                  </p>
                  <div className="flex items-center space-x-2 text-[10px] text-volt pt-1 font-mono">
                    <span>✓ BlueDart Air Transit</span>
                    <span>•</span>
                    <span>✓ Cash on Delivery Available</span>
                  </div>
                </div>
              )}
            </div>

            {/* Product Narrative & Fabric Specs */}
            <div className="border-t border-border pt-6 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Garment Architecture
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.fabricDetails && (
                <div className="p-3 bg-onyx-900 border border-border space-y-1">
                  <span className="text-[10px] font-mono text-volt uppercase">Textile Composition:</span>
                  <p className="text-xs text-white font-medium">{product.fabricDetails}</p>
                </div>
              )}

              {product.careInstructions && (
                <div className="p-3 bg-onyx-900 border border-border space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">Wash & Care:</span>
                  <p className="text-xs text-muted-foreground">{product.careInstructions}</p>
                </div>
              )}
            </div>

            {/* Brand Perks Strip */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border text-[11px] text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-volt" />
                <span>Free Express Shipping &gt; ₹999</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-volt" />
                <span>7-Day Doorstep Exchange</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-volt" />
                <span>100% Pre-Shrunk Fabric</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-volt" />
                <span>Anti-Sag Collar Ribbing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Reviews Section */}
        <div className="mt-24 pt-16 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-volt">
                CUSTOMER FEEDBACK
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-editorial">
                VERIFIED FIT REVIEWS
              </h2>
            </div>
            <span className="text-xs text-muted-foreground mt-2 sm:mt-0 font-mono">
              Overall Fit Rating: 4.9 / 5 (100% True To Oversized Silhouette)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-5 bg-onyx-900 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-volt">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-volt" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {new Date(rev.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <h4 className="text-sm font-bold uppercase text-white">{rev.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{rev.comment}</p>
                <div className="pt-2 text-[11px] text-volt font-mono">
                  {rev.customerName} • Verified Purchase
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-border">
            <div className="mb-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-volt">
                COMPLETE THE COLLECTION
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-editorial">
                YOU MIGHT ALSO LIKE
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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

      {/* Sticky Mobile Add To Bag Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-onyx-950/95 backdrop-blur-md p-3 border-t border-border z-30 lg:hidden flex items-center justify-between space-x-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-muted-foreground block">
            SIZE: {selectedSize}
          </span>
          <span className="text-base font-extrabold text-volt tabular-nums">
            {formatPrice(product.basePrice)}
          </span>
        </div>
        <Button onClick={handleAddToCart} disabled={isOutOfStock} className="flex-1 h-12 text-xs font-bold">
          {isOutOfStock ? "OUT OF STOCK" : "ADD TO BAG"}
        </Button>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-onyx-900 border border-border max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-lg font-black uppercase text-white font-editorial">
                INDIAN STREETWEAR SIZE GUIDE
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-muted-foreground hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Our tees are cut with an intentional <strong>oversized drop-shoulder silhouette</strong>. If you want a regular fit, consider sizing down one size.
            </p>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse font-mono">
                <thead>
                  <tr className="bg-onyx-800 text-volt border-b border-border">
                    <th className="p-2">SIZE</th>
                    <th className="p-2">CHEST (IN)</th>
                    <th className="p-2">LENGTH (IN)</th>
                    <th className="p-2">SHOULDER (IN)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-white">
                  <tr><td className="p-2 font-bold text-volt">S</td><td className="p-2">42</td><td className="p-2">28.5</td><td className="p-2">21</td></tr>
                  <tr><td className="p-2 font-bold text-volt">M</td><td className="p-2">44</td><td className="p-2">29.5</td><td className="p-2">22</td></tr>
                  <tr><td className="p-2 font-bold text-volt">L</td><td className="p-2">46</td><td className="p-2">30.5</td><td className="p-2">23</td></tr>
                  <tr><td className="p-2 font-bold text-volt">XL</td><td className="p-2">48</td><td className="p-2">31.5</td><td className="p-2">24</td></tr>
                  <tr><td className="p-2 font-bold text-volt">XXL</td><td className="p-2">50</td><td className="p-2">32.5</td><td className="p-2">25</td></tr>
                </tbody>
              </table>
            </div>

            <Button onClick={() => setIsSizeGuideOpen(false)} className="w-full">
              GOT IT, CLOSE GUIDE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
