"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
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
      <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#FAFAFA] p-6 text-center font-sans">
        <div className="w-20 h-20 rounded-full bg-[#FFFFFF] border border-[#E5E5E5] flex items-center justify-center mb-5 shadow-sm">
          <ShoppingBag className="w-9 h-9 text-[#A1A1AA] stroke-1" />
        </div>
        <h1 className="text-3xl font-serif font-bold uppercase text-[#0A0A0A] tracking-tight">
          Your Bag is Empty
        </h1>
        <p className="text-xs text-[#71717A] max-w-sm mt-2 leading-relaxed">
          Looks like you haven&apos;t added any 380 GSM oversized silhouettes or puddle denim yet.
        </p>
        <Link href="/collections/all" className="mt-8">
          <Button className="bg-[#0A0A0A] hover:bg-[#262626] text-white font-bold h-12 px-8 text-xs uppercase tracking-widest rounded-none shadow-sm transition-all">
            Explore All Collections
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 lg:py-20 pb-28 md:pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 lg:mb-10 pb-5 border-b border-[#E5E5E5]">
          <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-[0.2em] font-semibold flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
            <span>CHECKOUT READY // ROYAL BAG</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold uppercase text-[#0A0A0A] mt-1.5">
            Shopping Bag ({itemCount} {itemCount === 1 ? "Item" : "Items"})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none shadow-xs gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-24 bg-[#F5F5F7] rounded-none overflow-hidden shrink-0 border border-[#E5E5E5]">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-sm font-bold uppercase text-[#0A0A0A] hover:text-[#262626] transition-colors"
                    >
                      {item.title}
                    </Link>
                    <div className="text-xs text-[#71717A] mt-1 space-x-2">
                      <span className="bg-[#FAFAFA] px-2 py-0.5 border border-[#E5E5E5] rounded-none font-semibold text-[#0A0A0A]">
                        SIZE: {item.size}
                      </span>
                      <span>{item.color}</span>
                    </div>
                    <div className="text-xs font-bold text-[#0A0A0A] mt-2 sm:hidden tabular-nums font-serif">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F4F4F5]">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E5E5E5] bg-[#FFFFFF] rounded-none">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="p-2 text-[#71717A] hover:text-[#0A0A0A]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#0A0A0A]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                      className="p-2 text-[#71717A] hover:text-[#0A0A0A] disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-base font-serif font-bold text-[#0A0A0A] tabular-nums hidden sm:block">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="p-2 text-[#A1A1AA] hover:text-[#0A0A0A] transition-colors"
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
            <div className="p-6 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none space-y-5 shadow-xs sticky top-24">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0A0A0A] border-b border-[#E5E5E5] pb-3">
                Order Summary
              </h2>

              {/* Coupon Row */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-[#F4F4F5] border border-[#E5E5E5] rounded-none text-xs">
                  <div>
                    <span className="font-semibold text-[#0A0A0A]">Code: {appliedCoupon.code}</span>
                    <span className="text-[#0A0A0A] font-bold block">-{formatPrice(discount)} savings</span>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-[#71717A] hover:text-[#0A0A0A] underline">
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
                      className="flex-1 bg-[#FAFAFA] border border-[#E5E5E5] px-3 py-2 text-xs uppercase text-[#0A0A0A] rounded-none focus:outline-none focus:border-[#0A0A0A]"
                    />
                    <Button type="submit" size="sm" variant="secondary" className="bg-[#FFFFFF] border border-[#E5E5E5] text-[#0A0A0A] rounded-none hover:bg-[#FAFAFA]">
                      {couponLoading ? "..." : "Apply"}
                    </Button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                </form>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#71717A]">
                  <span>Subtotal</span>
                  <span className="text-[#0A0A0A] font-semibold tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#0A0A0A]">
                    <span>Discount</span>
                    <span className="font-bold tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#71717A]">
                  <span>Express Shipping</span>
                  <span className="text-[#0A0A0A] font-semibold">
                    {shipping === 0 ? <span className="text-[#0A0A0A] font-bold uppercase">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-3 border-t border-[#E5E5E5] text-[#0A0A0A]">
                  <span>Total</span>
                  <span className="text-2xl font-serif text-[#0A0A0A] tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button className="w-full bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-widest h-12 shadow-sm rounded-none flex items-center justify-center space-x-2 transition-all">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <div className="text-center pt-2 border-t border-[#E5E5E5] space-y-1">
                <p className="text-[11px] text-[#71717A] flex items-center justify-center space-x-1">
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
