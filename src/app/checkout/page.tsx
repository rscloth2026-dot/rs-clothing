"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Banknote,
  ArrowRight,
  Lock,
  ShoppingBag,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Truck,
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
    addressLine1: "Villa 12, Rajputana Residency, Circuit House Road",
    landmark: "Near Ratanada Circle",
    city: "Jodhpur",
    state: "Rajasthan",
    pincode: "342001",
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FDFCF7] p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#E7E2D9] flex items-center justify-center mb-5 shadow-sm">
          <ShoppingBag className="w-7 h-7 text-[#8B1E1E] stroke-1" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
          Your Bag is Empty
        </h1>
        <p className="text-xs text-[#78716C] mt-2 max-w-sm">
          Add heavy-cotton silhouettes or signature drops before initiating checkout dispatch.
        </p>
        <Link href="/collections/all" className="mt-6">
          <Button className="bg-[#8B1E1E] hover:bg-[#6B1414] text-white text-xs font-bold uppercase tracking-wider rounded-sm px-6 py-2.5">
            Explore Collections
          </Button>
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
          state: pinInfo.state.includes("Rajasthan") ? "Rajasthan" : prev.state,
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
            customer: formData,
            items: items.map((i) => ({
              variantId: i.variantId,
              quantity: i.quantity,
              price: i.price,
            })),
            couponCode: appliedCoupon?.code,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to place Cash on Delivery order");
        }

        clearCart();
        router.push(`/order-success/${data.orderId}`);
      } else {
        // Handle Razorpay Online Order Creation
        const orderRes = await fetch("/api/checkout/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              variantId: i.variantId,
              quantity: i.quantity,
            })),
            couponCode: appliedCoupon?.code,
          }),
        });

        const orderData = await orderRes.json();
        if (!orderRes.ok) {
          throw new Error(orderData.error || "Could not initialize Razorpay checkout");
        }

        // Razorpay modal integration
        const loadScript = (src: string) =>
          new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
          });

        const isLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!isLoaded && !orderData.isMock) {
          throw new Error("Unable to load secure Razorpay checkout gateway. Please check your internet connection or select Cash on Delivery.");
        }

        if (orderData.isMock) {
          // Fallback to simulated sandbox payment verification only in local mock mode
          const verifyRes = await fetch("/api/checkout/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: orderData.orderId,
              razorpayOrderId: orderData.orderId,
              razorpayPaymentId: "pay_simulated_" + Math.random().toString(36).substring(7),
              razorpaySignature: "sig_simulated_success",
              customer: formData,
              items: items.map((i) => ({
                variantId: i.variantId,
                quantity: i.quantity,
              })),
              couponCode: appliedCoupon?.code,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            clearCart();
            router.push(`/order-success/${verifyData.orderId}`);
            return;
          }
          throw new Error("Razorpay sandbox verification failed. Please try Cash on Delivery or contact concierge.");
        }

        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: "INR",
          name: "RS CLOTHING JODHPUR",
          description: "Royal Streetwear Order Dispatch",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=200",
          order_id: orderData.orderId,
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#8B1E1E",
          },
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch("/api/checkout/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: orderData.orderId,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  customer: formData,
                  items: items.map((i) => ({
                    variantId: i.variantId,
                    quantity: i.quantity,
                  })),
                  couponCode: appliedCoupon?.code,
                }),
              });
              const verifyData = await verifyRes.json();
              if (verifyRes.ok) {
                clearCart();
                router.push(`/order-success/${verifyData.orderId}`);
              } else {
                setErrorMessage(verifyData.error || "Payment verification failed.");
                setLoading(false);
              }
            } catch {
              setErrorMessage("Verification error. If money was debited, our concierge team will confirm your order within 30 minutes.");
              setLoading(false);
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred during checkout.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#1C1917] py-8 sm:py-12 lg:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Status */}
        <div className="mb-8 sm:mb-10 pb-6 border-b border-[#E7E2D9]">
          <div className="flex items-center space-x-2 text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#8B1E1E] mb-2">
            <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>256-BIT ENCRYPTED RAJASTHANI DISPATCH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
            Checkout & Dispatch
          </h1>
        </div>

        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Shipping Address & Details Form */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Step 1: Contact Information */}
            <div className="p-6 sm:p-7 bg-[#FFFFFF] border border-[#E7E2D9] space-y-5 rounded-sm shadow-xs">
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E] flex items-center space-x-2.5">
                <span className="w-5 h-5 bg-[#8B1E1E] text-white flex items-center justify-center text-[10px] font-bold rounded-full">
                  1
                </span>
                <span>Patron Identification & Alerts</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <Input
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Aarav Sharma"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059] rounded-sm h-11 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">
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
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059] rounded-sm h-11 text-xs font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">
                    Email Address (For Tax Invoice & Air Waybill Tracking) *
                  </label>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="aarav@gmail.com"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059] rounded-sm h-11 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="p-6 sm:p-7 bg-[#FFFFFF] border border-[#E7E2D9] space-y-5 rounded-sm shadow-xs">
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E] flex items-center space-x-2.5">
                <span className="w-5 h-5 bg-[#8B1E1E] text-white flex items-center justify-center text-[10px] font-bold rounded-full">
                  2
                </span>
                <span>Delivery Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">
                    Address Line 1 (Flat, House No, Haveli, Street) *
                  </label>
                  <Input
                    required
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="Flat 402, Skyline Residency, C-Scheme"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059] rounded-sm h-11 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">
                    Landmark (Optional)
                  </label>
                  <Input
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Near Central Park / City Palace"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059] rounded-sm h-11 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">
                    Postal PIN Code (6 Digits) *
                  </label>
                  <Input
                    required
                    maxLength={6}
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="302001"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059] rounded-sm h-11 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">
                    City / District *
                  </label>
                  <Input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Jodhpur"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059] rounded-sm h-11 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">
                    State / Union Territory *
                  </label>
                  <select
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full h-11 bg-[#FFFFFF] border border-[#E7E2D9] rounded-sm px-3 text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059] transition-colors"
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
            <div className="p-6 sm:p-7 bg-[#FFFFFF] border border-[#E7E2D9] space-y-5 rounded-sm shadow-xs">
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E] flex items-center space-x-2.5">
                <span className="w-5 h-5 bg-[#8B1E1E] text-white flex items-center justify-center text-[10px] font-bold rounded-full">
                  3
                </span>
                <span>Payment Settlement</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Razorpay Online */}
                <div
                  onClick={() => setPaymentMethod("RAZORPAY")}
                  className={`p-5 border cursor-pointer transition-all rounded-sm ${
                    paymentMethod === "RAZORPAY"
                      ? "border-[#8B1E1E] bg-[#FAF6EE] shadow-xs"
                      : "border-[#E7E2D9] bg-[#FFFFFF] hover:border-[#8B1E1E]/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                      <CreditCard className="w-4 h-4 text-[#8B1E1E]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Online Settlement</span>
                    </div>
                    {paymentMethod === "RAZORPAY" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E1E]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    Instant UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking via Razorpay.
                  </p>
                  <div className="mt-3 flex items-center space-x-1.5 text-[10px] text-[#8B1E1E] font-semibold">
                    <Zap className="w-3 h-3 text-[#C5A059]" />
                    <span>Priority Express Air Dispatch</span>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-5 border cursor-pointer transition-all rounded-sm ${
                    paymentMethod === "COD"
                      ? "border-[#8B1E1E] bg-[#FAF6EE] shadow-xs"
                      : "border-[#E7E2D9] bg-[#FFFFFF] hover:border-[#8B1E1E]/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                      <Banknote className="w-4 h-4 text-[#8B1E1E]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Cash on Delivery</span>
                    </div>
                    {paymentMethod === "COD" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E1E]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    Pay in cash or via courier UPI QR scan directly upon doorstep handover.
                  </p>
                  <div className="mt-3 flex items-center space-x-1.5 text-[10px] text-[#8B1E1E] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#8B1E1E]" />
                    <span>Zero Surcharge Convenience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 bg-[#FFFFFF] border border-[#E7E2D9] space-y-5 lg:sticky lg:top-24 rounded-sm shadow-xs">
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E] border-b border-[#F0ECE1] pb-3">
                Order Review ({items.length} {items.length === 1 ? "Item" : "Items"})
              </h2>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3.5 pr-1 divide-y divide-[#F0ECE1]">
                {items.map((item) => (
                  <div key={item.variantId} className="pt-3 first:pt-0 flex space-x-3.5 text-xs">
                    <div className="relative w-12 h-16 bg-[#FAF6EE] flex-shrink-0 overflow-hidden border border-[#E7E2D9] rounded-xs">
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1C1917] uppercase line-clamp-1 text-xs">{item.title}</p>
                      <p className="text-[10px] text-[#78716C] font-sans uppercase tracking-wider mt-0.5">
                        Size: {item.size} • Qty: {item.quantity}
                      </p>
                      <p className="text-[#8B1E1E] font-bold tabular-nums font-serif mt-1 text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="border-t border-[#F0ECE1] pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#78716C]">
                  <span className="uppercase text-[11px]">Bag Subtotal</span>
                  <span className="tabular-nums text-[#1C1917] font-semibold">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#8B1E1E]">
                    <span className="uppercase text-[11px]">Privilege Code ({appliedCoupon?.code})</span>
                    <span className="tabular-nums font-bold">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#78716C]">
                  <span className="uppercase text-[11px]">Express Air Courier</span>
                  <span className="tabular-nums text-[#1C1917]">
                    {shipping === 0 ? (
                      <span className="text-[#8B1E1E] font-bold uppercase tracking-wider">Complimentary</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#F0ECE1] flex justify-between items-baseline text-[#1C1917]">
                  <span className="uppercase text-sm font-bold tracking-wider">Settlement Total</span>
                  <span className="text-[#8B1E1E] text-2xl font-serif font-bold tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-[#8B1E1E] text-xs rounded-sm">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 rounded-sm bg-[#8B1E1E] text-white hover:bg-[#6B1414] shadow-sm transition-all"
              >
                {loading ? (
                  <span>DISPATCHING ORDER PROTOCOL...</span>
                ) : (
                  <>
                    <span>
                      {paymentMethod === "COD"
                        ? "CONFIRM CASH ON DELIVERY DISPATCH"
                        : "SETTLE VIA RAZORPAY / UPI"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>

              <div className="pt-3 border-t border-[#F0ECE1] text-[10px] text-[#78716C] space-y-1.5 text-center font-medium">
                <div className="flex items-center justify-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>256-Bit SSL Encrypted Indian Gateway</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Official Razorpay & BlueDart Logistics</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
