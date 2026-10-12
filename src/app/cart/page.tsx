"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const {
    items,
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
  const [couponLoading, setCouponLoading] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();
  const itemCount = getItemCount();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponError("");
    setCouponLoading(true);

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
      setCouponLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-onyx-950 p-6 text-center">
        <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mb-4 stroke-1" />
        <h1 className="text-3xl font-black uppercase text-white font-editorial tracking-tight">
          Your Bag is Empty
        </h1>
        <p className="text-xs text-muted-foreground max-w-sm mt-2">
          Looks like you haven&apos;t added any oversized fits or puddle denim yet.
        </p>
        <Link href="/collections/all" className="mt-8">
          <Button size="lg" className="font-extrabold">
            Explore All Collections
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-onyx-950 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-border">
          <span className="text-[11px] font-mono text-volt uppercase tracking-widest font-bold">
            CHECKOUT READY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-editorial">
            SHOPPING BAG ({itemCount} ITEMS)
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 p-5 bg-onyx-900 border border-border"
              >
                <div className="relative w-24 h-32 bg-onyx-800 flex-shrink-0 overflow-hidden">
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="96px" />
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-sm font-bold uppercase text-white hover:text-volt line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-muted-foreground hover:text-destructive p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-3 mt-1.5 text-xs text-muted-foreground font-mono">
                      <span className="bg-onyx-800 border border-border px-2 py-0.5 text-white">
                        SIZE: {item.size}
                      </span>
                      <span>COLOR: {item.color}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div className="flex items-center border border-border bg-onyx-950">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="p-1.5 text-muted-foreground hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="p-1.5 text-muted-foreground hover:text-white disabled:opacity-30"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-base font-extrabold text-volt tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Coupon Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-onyx-900 border border-border space-y-5">
              <h2 className="text-lg font-black uppercase text-white font-editorial border-b border-border pb-3">
                ORDER BREAKDOWN
              </h2>

              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-volt/10 border border-volt/30 text-xs">
                  <div className="flex items-center space-x-2 text-volt font-bold">
                    <Check className="w-4 h-4" />
                    <span>COUPON: {appliedCoupon.code}</span>
                    <span className="text-white font-normal">(-{formatPrice(discount)})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-muted-foreground hover:text-white underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-onyx-800 border border-border px-3 py-2 text-xs uppercase text-white focus:outline-none focus:border-volt"
                    />
                    <Button type="submit" variant="secondary" size="sm" disabled={!couponCode.trim() || couponLoading}>
                      {couponLoading ? "..." : "Apply"}
                    </Button>
                  </div>
                  {couponError && <p className="text-[11px] text-destructive">{couponError}</p>}
                </form>
              )}

              {/* Price Details */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Bag Subtotal</span>
                  <span className="tabular-nums text-white">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-volt font-bold">
                    <span>Coupon Discount</span>
                    <span className="tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <span>Express BlueDart Shipping</span>
                  <span className="tabular-nums text-white">
                    {shipping === 0 ? <span className="text-volt font-bold uppercase">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>

                <div className="pt-3 border-t border-border flex justify-between text-base font-bold text-white">
                  <span>Payable Total</span>
                  <span className="text-volt text-xl tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link href="/checkout" className="block w-full">
                <Button size="lg" className="w-full flex items-center justify-center space-x-2 font-black text-xs">
                  <span>Proceed to Indian Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Guarantees */}
            <div className="p-4 bg-onyx-900 border border-border/80 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2 text-white font-bold">
                <ShieldCheck className="w-4 h-4 text-volt" />
                <span>100% Authentic Indian Streetwear</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-volt" />
                <span>Free Express Shipping on Orders &gt; ₹999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
