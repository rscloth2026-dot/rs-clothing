"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, Check, Tag } from "lucide-react";
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
      <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#FDFCF7] p-6 text-center font-sans">
        <div className="w-20 h-20 rounded-full bg-[#FFFFFF] border border-[#E7E2D9] flex items-center justify-center mb-5 shadow-sm">
          <ShoppingBag className="w-9 h-9 text-[#A8A29E] stroke-1" />
        </div>
        <h1 className="text-3xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
          Your Bag is Empty
        </h1>
        <p className="text-xs text-[#78716C] max-w-sm mt-2 leading-relaxed">
          Looks like you haven&apos;t added any 380 GSM oversized tees or puddle denim yet.
        </p>
        <Link href="/collections/all" className="mt-8">
          <Button className="bg-[#8B1E1E] hover:bg-[#6B1414] text-white font-bold h-12 px-8 text-xs uppercase tracking-wider rounded-sm">
            Explore All Collections
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF7] py-8 lg:py-20 pb-28 md:pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 lg:mb-10 pb-5 border-b border-[#E7E2D9]">
          <span className="text-[10px] font-sans text-[#8B1E1E] uppercase tracking-[0.2em] font-bold flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E]" />
            <span>CHECKOUT READY // ROYAL BAG</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold uppercase text-[#1C1917] mt-1.5">
            Shopping Bag ({itemCount} {itemCount === 1 ? "Item" : "Items"})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-[#FFFFFF] border border-[#E7E2D9] rounded-sm shadow-xs gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-24 bg-[#FAF6EE] rounded-sm overflow-hidden shrink-0 border border-[#E7E2D9]">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-sm font-bold uppercase text-[#1C1917] hover:text-[#8B1E1E] transition-colors"
                    >
                      {item.title}
                    </Link>
                    <div className="text-xs text-[#78716C] mt-1 space-x-2">
                      <span className="bg-[#FAF6EE] px-2 py-0.5 border border-[#E7E2D9] rounded-xs font-semibold text-[#1C1917]">
                        SIZE: {item.size}
                      </span>
                      <span>{item.color}</span>
                    </div>
                    <div className="text-xs font-bold text-[#8B1E1E] mt-2 sm:hidden">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F0ECE1]">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E7E2D9] bg-[#FFFFFF] rounded-sm">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="p-2 text-[#78716C] hover:text-[#1C1917]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#1C1917]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                      className="p-2 text-[#78716C] hover:text-[#1C1917] disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-base font-serif font-bold text-[#8B1E1E] tabular-nums hidden sm:block">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="p-2 text-[#A8A29E] hover:text-[#8B1E1E] transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cost Summary Column */}
          <div className="lg:col-span-4">
            <div className="p-6 bg-[#FFFFFF] border border-[#E7E2D9] rounded-sm space-y-5 shadow-xs sticky top-24">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1917] border-b border-[#F0ECE1] pb-3">
                Order Summary
              </h2>

              {/* Coupon Row */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-[#FAF6EE] border border-[#C5A059]/40 rounded-sm text-xs">
                  <div>
                    <span className="font-semibold text-[#1C1917]">Code: {appliedCoupon.code}</span>
                    <span className="text-[#8B1E1E] font-bold block">-{formatPrice(discount)} savings</span>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-[#78716C] hover:text-[#8B1E1E] underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#FDFCF7] border border-[#E7E2D9] px-3 py-2 text-xs uppercase text-[#1C1917] rounded-sm focus:outline-none focus:border-[#C5A059]"
                    />
                    <Button type="submit" size="sm" variant="secondary" className="bg-[#FAF6EE] border border-[#E7E2D9] text-[#1C1917]">
                      {couponLoading ? "..." : "Apply"}
                    </Button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                </form>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#78716C]">
                  <span>Subtotal</span>
                  <span className="text-[#1C1917] font-semibold tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#8B1E1E]">
                    <span>Discount</span>
                    <span className="font-bold tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#78716C]">
                  <span>Express Shipping</span>
                  <span className="text-[#1C1917] font-semibold">
                    {shipping === 0 ? <span className="text-[#8B1E1E] font-bold uppercase">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-3 border-t border-[#F0ECE1] text-[#1C1917]">
                  <span>Total</span>
                  <span className="text-2xl font-serif text-[#8B1E1E] tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button className="w-full bg-[#8B1E1E] hover:bg-[#6B1414] text-white text-xs font-bold uppercase tracking-wider h-12 shadow-sm rounded-sm flex items-center justify-center space-x-2">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <div className="text-center pt-2 border-t border-[#F0ECE1] space-y-1">
                <p className="text-[11px] text-[#78716C] flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Doorstep 7-Day Size Exchanges Guaranteed</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
