"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck } from "lucide-react";
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
    setCouponLoading("Checking code...");

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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-onyx-900 border-l border-border flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-volt" />
              <h2 className="text-base font-bold uppercase tracking-wider">
                Your Bag ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-muted-foreground hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-onyx-800/80 p-3.5 border-b border-border">
            <div className="flex items-center space-x-2 text-xs font-medium mb-2">
              <Truck className="w-4 h-4 text-volt flex-shrink-0" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-volt">{formatPrice(remainingForFreeShipping)}</strong> more to get{" "}
                  <strong>FREE Express Shipping</strong>!
                </span>
              ) : (
                <span className="text-volt font-bold">
                  🎉 You qualify for FREE Express Shipping across India!
                </span>
              )}
            </div>
            <div className="w-full bg-onyx-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-volt h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4 stroke-1" />
                <h3 className="text-lg font-bold uppercase tracking-wide">Your Bag is Empty</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Discover the newest drops, oversized heavyweight tees, and baggy streetwear denim.
                </p>
                <Button
                  onClick={closeCart}
                  className="mt-6"
                >
                  Explore Drops
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex space-x-3.5 p-3 bg-onyx-800/50 border border-border/60 hover:border-border transition-colors rounded-sm"
                >
                  <div className="relative w-20 h-24 bg-onyx-700 flex-shrink-0 overflow-hidden">
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
                          className="text-xs font-bold uppercase tracking-wide text-white hover:text-volt line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 mt-1 text-[11px] text-muted-foreground">
                        <span className="px-1.5 py-0.5 bg-onyx-700 font-mono text-[10px] text-white">
                          SIZE: {item.size}
                        </span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-border bg-onyx-900">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 text-muted-foreground hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 text-muted-foreground hover:text-white disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-volt tabular-nums">
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
            <div className="p-5 border-t border-border bg-onyx-950 space-y-4">
              {/* Coupon Row */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-volt/10 border border-volt/30 text-xs">
                  <div className="flex items-center space-x-2 text-volt font-bold">
                    <Check className="w-4 h-4" />
                    <span>CODE: {appliedCoupon.code}</span>
                    <span className="text-white font-normal">(-{formatPrice(discount)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-muted-foreground hover:text-white underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="w-full bg-onyx-800 border border-border px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-volt"
                    />
                  </div>
                  <Button type="submit" variant="secondary" size="sm" disabled={!couponCode.trim()}>
                    {couponLoading ? "..." : "Apply"}
                  </Button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-destructive">{couponError}</p>}

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Bag Subtotal</span>
                  <span className="tabular-nums text-foreground">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-volt">
                    <span>Discount</span>
                    <span className="tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Shipping</span>
                  <span className="tabular-nums text-foreground">
                    {shipping === 0 ? <span className="text-volt font-bold uppercase">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-border text-white">
                  <span>Payable Total</span>
                  <span className="text-volt text-base tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Direct Checkout CTA */}
              <div className="space-y-2 pt-1">
                <Link href="/checkout" onClick={closeCart} className="block w-full">
                  <Button className="w-full group text-xs tracking-wider font-extrabold flex items-center justify-center space-x-2">
                    <span>Proceed to Indian Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="flex items-center justify-center space-x-3 text-[10px] text-muted-foreground">
                  <span>🔒 100% Encrypted</span>
                  <span>•</span>
                  <span>⚡ Fast BlueDart Delivery</span>
                  <span>•</span>
                  <span>💵 COD Available</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
