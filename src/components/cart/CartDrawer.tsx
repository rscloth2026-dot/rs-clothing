"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Check, Truck, ShieldCheck, Tag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getShippingFee,
    getTotal,
    getItemCount,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();
  const itemCount = getItemCount();

  // Free shipping threshold ₹999
  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponError("");
    setCouponLoading("Checking...");

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, subtotal }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error || "Invalid coupon code");
      } else {
        applyCoupon(data.coupon);
        setCouponCode("");
      }
    } catch {
      setCouponError("Could not validate coupon");
    } finally {
      setCouponLoading("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] border-l border-[#E7E2D9] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#E7E2D9] flex items-center justify-between bg-[#FDFCF7]">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-4 h-4 text-[#8B1E1E]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1917]">
                Royal Shopping Bag ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF6EE] rounded-sm transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF6EE] p-4 border-b border-[#E7E2D9]">
            <div className="flex items-center space-x-2 text-xs font-medium mb-2 text-[#57534E]">
              <Truck className="w-4 h-4 text-[#8B1E1E] shrink-0" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-[#1C1917]">{formatPrice(remainingForFreeShipping)}</strong> more for{" "}
                  <strong className="text-[#8B1E1E]">FREE Express BlueDart Shipping</strong>
                </span>
              ) : (
                <span className="text-[#8B1E1E] font-bold flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>You have unlocked FREE Pan-India Express Delivery!</span>
                </span>
              )}
            </div>
            <div className="w-full bg-[#E7E2D9] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#8B1E1E] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#E7E2D9] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-7 h-7 text-[#A8A29E] stroke-1" />
                </div>
                <h3 className="text-base font-serif font-bold uppercase tracking-wide text-[#1C1917]">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-[#78716C] mt-1.5 max-w-xs leading-relaxed">
                  Discover our 380 GSM French Terry tees, puddle skate denim, and limited Rajasthani atelier drops.
                </p>
                <Button
                  onClick={closeCart}
                  className="mt-6 bg-[#8B1E1E] text-white hover:bg-[#6B1414] text-xs font-bold uppercase tracking-wider font-sans"
                >
                  Explore Atelier Drops
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex space-x-3.5 p-3.5 bg-[#FDFCF7] border border-[#E7E2D9] hover:border-[#C5A059] transition-colors rounded-sm shadow-xs"
                >
                  <div className="relative w-20 h-24 bg-[#FFFFFF] shrink-0 overflow-hidden rounded-sm border border-[#E7E2D9]">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="text-xs font-bold uppercase tracking-wide text-[#1C1917] hover:text-[#8B1E1E] line-clamp-1 transition-colors"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-[#A8A29E] hover:text-[#8B1E1E] p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 mt-1 text-[11px] text-[#78716C]">
                        <span className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#E7E2D9] rounded-sm text-[#1C1917] font-semibold">
                          SIZE: {item.size}
                        </span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E7E2D9] bg-[#FFFFFF] rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1.5 text-[#78716C] hover:text-[#1C1917]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#1C1917]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1.5 text-[#78716C] hover:text-[#1C1917] disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-serif font-bold text-[#8B1E1E] tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E7E2D9] bg-[#FFFFFF] space-y-4 pb-[max(env(safe-area-inset-bottom,20px),20px)]">
              {/* Coupon Row */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#FAF6EE] border border-[#C5A059]/40 rounded-sm text-xs">
                  <div className="flex items-center space-x-2 text-[#1C1917] font-semibold">
                    <Check className="w-4 h-4 text-[#8B1E1E]" />
                    <span className="font-mono">PROMO: {appliedCoupon.code}</span>
                    <span className="text-[#8B1E1E] font-bold">(-{formatPrice(discount)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#78716C] hover:text-[#8B1E1E] underline underline-offset-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. WELCOME10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="w-full bg-[#FDFCF7] border border-[#E7E2D9] rounded-sm pl-8 pr-3 py-2 text-xs uppercase placeholder:normal-case text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <Button type="submit" variant="secondary" size="sm" disabled={!couponCode.trim()} className="bg-[#FAF6EE] border border-[#E7E2D9] text-[#1C1917] hover:border-[#8B1E1E]">
                      {couponLoading ? "..." : "Apply"}
                    </Button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                </form>
              )}

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#78716C]">
                  <span>Bag Subtotal</span>
                  <span className="tabular-nums text-[#1C1917] font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#8B1E1E]">
                    <span>Coupon Discount</span>
                    <span className="tabular-nums font-bold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#78716C]">
                  <span>Estimated Shipping</span>
                  <span className="tabular-nums text-[#1C1917] font-semibold">
                    {shipping === 0 ? <span className="text-[#8B1E1E] font-bold uppercase">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#F0ECE1] text-[#1C1917]">
                  <span>Payable Total</span>
                  <span className="text-xl tabular-nums font-serif font-bold text-[#8B1E1E]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Direct Checkout CTA */}
              <div className="space-y-2 pt-1">
                <Link href="/checkout" onClick={closeCart} className="block w-full">
                  <Button className="w-full bg-[#8B1E1E] hover:bg-[#6B1414] text-white text-xs tracking-wider font-bold uppercase flex items-center justify-center space-x-2 h-12 shadow-sm rounded-sm">
                    <span>Proceed to Indian Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <div className="flex items-center justify-center space-x-3 text-[10px] text-[#78716C] pt-1 font-medium">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
                    <span>256-Bit Encrypted</span>
                  </span>
                  <span>•</span>
                  <span>BlueDart Air</span>
                  <span>•</span>
                  <span>COD Available</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
