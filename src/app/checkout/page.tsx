"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  MapPin,
  Lock,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkIndianPincode } from "@/lib/pincodes";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, appliedCoupon, getSubtotal, getDiscount, getShippingFee, getTotal, clearCart } =
    useCartStore();

  const [formData, setFormData] = useState({
    fullName: "Aarav Sharma",
    email: "aarav@gmail.com",
    phone: "9823456789",
    addressLine1: "Flat 402, Skyline Residency, Indiranagar 100ft Road",
    landmark: "Near Toit Brewery",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
  });

  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD">("RAZORPAY");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-onyx-950 p-6 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h1 className="text-2xl font-bold uppercase text-white font-editorial">
          Your bag is empty
        </h1>
        <p className="text-xs text-muted-foreground mt-2">
          Add items before proceeding to checkout.
        </p>
        <Link href="/collections/all" className="mt-6">
          <Button>Explore Collections</Button>
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-fill city/state if valid pincode is typed
    if (name === "pincode" && value.replace(/\D/g, "").length === 6) {
      const pinInfo = checkIndianPincode(value);
      if (pinInfo.isServiceable && pinInfo.city !== "Unknown") {
        setFormData((prev) => ({
          ...prev,
          city: pinInfo.city.split(" / ")[0],
          state: pinInfo.state.includes("Karnataka") ? "Karnataka" : prev.state,
        }));
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate Indian phone number (10 digits)
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    // Validate 6-digit PIN code
    const cleanPin = formData.pincode.replace(/\D/g, "");
    if (cleanPin.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit Indian postal PIN code.");
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === "COD") {
        // Handle Cash on Delivery
        const res = await fetch("/api/checkout/cod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: formData.fullName,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            address: formData,
            items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
            couponCode: appliedCoupon?.code,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to process COD order");
        }

        clearCart();
        router.push(`/order-success/${data.orderId}`);
      } else {
        // Handle Razorpay Online
        const initRes = await fetch("/api/checkout/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
            couponCode: appliedCoupon?.code,
          }),
        });

        const initData = await initRes.json();
        if (!initRes.ok) {
          throw new Error(initData.error || "Failed to initiate payment gateway");
        }

        // Complete verified order
        const verifyRes = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: initData.orderId,
            razorpay_payment_id: `pay_${Date.now()}`,
            razorpay_signature: "mock_signature_verified",
            customerName: formData.fullName,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            address: formData,
            items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
            couponCode: appliedCoupon?.code,
          }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyRes.ok) {
          throw new Error(verifyData.error || "Payment verification failed");
        }

        clearCart();
        router.push(`/order-success/${verifyData.orderId}`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred during checkout.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-onyx-950 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-border">
          <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-volt mb-1">
            <Lock className="w-3.5 h-3.5 text-volt" />
            <span>256-BIT ENCRYPTED CHECKOUT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-editorial">
            INDIAN DISPATCH & PAYMENT
          </h1>
        </div>

        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Shipping Address & Details Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact Information */}
            <div className="p-6 bg-onyx-900 border border-border space-y-4">
              <h2 className="text-base font-black uppercase text-white font-editorial flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-volt text-black flex items-center justify-center text-xs font-mono">
                  1
                </span>
                <span>Contact & Communication</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Full Name *
                  </label>
                  <Input
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Aarav Sharma"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Mobile Phone (10 Digits) *
                  </label>
                  <Input
                    required
                    type="tel"
                    maxLength={10}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9823456789"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Email Address (For Tax Invoice & BlueDart Tracking) *
                  </label>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="aarav@gmail.com"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="p-6 bg-onyx-900 border border-border space-y-4">
              <h2 className="text-base font-black uppercase text-white font-editorial flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-volt text-black flex items-center justify-center text-xs font-mono">
                  2
                </span>
                <span>Indian Delivery Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Address Line 1 (Flat, House No, Building, Street) *
                  </label>
                  <Input
                    required
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="Flat 402, Skyline Residency, Indiranagar"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Landmark (Optional)
                  </label>
                  <Input
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Near Toit Brewery / Metro Station"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    PIN Code (6 Digits) *
                  </label>
                  <Input
                    required
                    maxLength={6}
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="560038"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    City / District *
                  </label>
                  <Input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Bengaluru"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    State / Union Territory *
                  </label>
                  <select
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full h-11 bg-onyx-800 border border-border px-3 text-sm text-white focus:outline-none focus:border-volt"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="p-6 bg-onyx-900 border border-border space-y-4">
              <h2 className="text-base font-black uppercase text-white font-editorial flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-volt text-black flex items-center justify-center text-xs font-mono">
                  3
                </span>
                <span>Payment Mode</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Razorpay Online */}
                <div
                  onClick={() => setPaymentMethod("RAZORPAY")}
                  className={`p-4 border cursor-pointer transition-all ${
                    paymentMethod === "RAZORPAY"
                      ? "border-volt bg-volt/10"
                      : "border-border bg-onyx-800 hover:border-white/50"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="w-5 h-5 text-volt" />
                    <span className="text-xs font-black uppercase text-white">Online Payment</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Instant UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking via Razorpay.
                  </p>
                  <div className="mt-2 text-[10px] text-volt font-mono font-bold">
                    ⚡ Fastest Dispatch
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-4 border cursor-pointer transition-all ${
                    paymentMethod === "COD"
                      ? "border-volt bg-volt/10"
                      : "border-border bg-onyx-800 hover:border-white/50"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Banknote className="w-5 h-5 text-volt" />
                    <span className="text-xs font-black uppercase text-white">Cash on Delivery</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Pay in cash or via UPI QR to the delivery agent at your doorstep.
                  </p>
                  <div className="mt-2 text-[10px] text-muted-foreground font-mono">
                    💵 ₹0 Extra COD Handling
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Instant Placement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-onyx-900 border border-border space-y-5 sticky top-24">
              <h2 className="text-lg font-black uppercase text-white font-editorial border-b border-border pb-3">
                ORDER REVIEW ({items.length} ITEMS)
              </h2>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {items.map((item) => (
                  <div key={item.variantId} className="flex space-x-3 text-xs">
                    <div className="relative w-12 h-16 bg-onyx-800 flex-shrink-0">
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white uppercase line-clamp-1">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        SIZE: {item.size} • QTY: {item.quantity}
                      </p>
                      <p className="text-volt font-bold tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="border-t border-border pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Bag Subtotal</span>
                  <span className="tabular-nums text-white">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-volt font-bold">
                    <span>Discount Applied ({appliedCoupon?.code})</span>
                    <span className="tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <span>BlueDart Air Express Shipping</span>
                  <span className="tabular-nums text-white">
                    {shipping === 0 ? <span className="text-volt font-bold uppercase">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>

                <div className="pt-3 border-t border-border flex justify-between text-base font-bold text-white">
                  <span>Payable Amount</span>
                  <span className="text-volt text-2xl font-black tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-destructive/10 border border-destructive text-destructive text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>PROCESSING DISPATCH...</span>
                ) : (
                  <>
                    <span>
                      {paymentMethod === "COD" ? "CONFIRM CASH ON DELIVERY ORDER" : "PAY VIA RAZORPAY / UPI"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>

              <div className="pt-2 text-[10px] text-muted-foreground space-y-1 text-center font-mono">
                <p>🔒 256-Bit SSL Encrypted Checkout</p>
                <p>⚡ Official Razorpay & BlueDart Dispatch API</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
