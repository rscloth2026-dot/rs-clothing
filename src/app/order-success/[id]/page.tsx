import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Truck, ArrowRight, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { id: string };
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  let shippingAddress: any = {};
  try {
    shippingAddress = JSON.parse(order.shippingAddress);
  } catch {
    shippingAddress = { fullName: order.customerName, addressLine1: order.shippingAddress };
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] py-12 sm:py-16 lg:py-24 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-6 sm:p-10 space-y-8 shadow-sm rounded-none">
          {/* Success Banner */}
          <div className="text-center space-y-3 pb-6 border-b border-[#E5E5E5]">
            <div className="w-14 h-14 bg-[#FAFAFA] border border-[#E5E5E5] text-[#0A0A0A] flex items-center justify-center mx-auto mb-2 rounded-full">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#71717A]">
                ORDER CONFIRMED // DISPATCH QUEUED
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold uppercase text-[#0A0A0A] tracking-tight">
              Thank You, {order.customerName.split(" ")[0]}
            </h1>
            <p className="text-xs sm:text-sm text-[#71717A] max-w-md mx-auto leading-relaxed">
              Your royal garments are being prepared for dispatch. A formal tax invoice and air waybill confirmation has been sent to{" "}
              <strong className="text-[#0A0A0A]">{order.customerEmail}</strong>.
            </p>
          </div>

          {/* Tracking & Logistics Card */}
          <div className="p-5 bg-[#F4F4F5] border border-[#E5E5E5] space-y-3 rounded-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
              <div>
                <span className="text-[#71717A] uppercase text-[11px] font-semibold">Order Number:</span>
                <span className="ml-2 font-mono font-bold text-[#0A0A0A]">{order.orderNumber}</span>
              </div>
              <div>
                <span className="text-[#71717A] uppercase text-[11px] font-semibold">Air Waybill / Tracking:</span>
                <span className="ml-2 font-mono font-bold text-[#0A0A0A]">{order.trackingNumber || "BD-AIR-554433"}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E5E5] flex items-center space-x-3 text-xs text-[#525252]">
              <Truck className="w-5 h-5 text-[#0A0A0A] flex-shrink-0" />
              <span>
                Dispatched via <strong className="text-[#0A0A0A]">BlueDart Express Air</strong> from Jodhpur Hub (Marwar). Estimated arrival in <strong className="text-[#0A0A0A]">2-4 business days</strong>.
              </span>
            </div>
          </div>

          {/* Items Purchased Snapshot */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0A0A0A]">
              Selected Garments ({order.items.length})
            </h3>
            <div className="divide-y divide-[#F4F4F5] border border-[#E5E5E5] bg-[#FFFFFF] rounded-none">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold uppercase text-[#0A0A0A]">{item.productTitle}</p>
                    <p className="text-[10px] text-[#71717A] mt-0.5 uppercase tracking-wider font-sans">
                      Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-serif font-bold text-[#0A0A0A] tabular-nums text-sm">
                    {formatPrice(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Delivery Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E5E5E5] text-xs">
            <div className="space-y-1.5">
              <span className="text-[#0A0A0A] uppercase text-[10px] tracking-wider block mb-1 font-bold">
                Delivery Destination
              </span>
              <p className="text-[#0A0A0A] font-semibold">{shippingAddress.fullName || order.customerName}</p>
              <p className="text-[#525252]">{shippingAddress.addressLine1}</p>
              {shippingAddress.landmark && <p className="text-[#71717A]">Near: {shippingAddress.landmark}</p>}
              <p className="text-[#525252]">
                {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
              </p>
              <p className="text-[#0A0A0A] font-medium pt-1">Phone: +91 {shippingAddress.phone || order.customerPhone}</p>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <span className="text-[#0A0A0A] uppercase text-[10px] tracking-wider block mb-1 font-bold">
                Payment & Fulfillment
              </span>
              <div className="flex justify-between text-[#71717A]">
                <span>Method</span>
                <span className="font-semibold text-[#0A0A0A] uppercase">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[#71717A]">
                <span>Payment Status</span>
                <span className="font-semibold text-emerald-700 uppercase">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between text-[#71717A]">
                <span>Fulfillment Status</span>
                <span className="font-semibold text-[#0A0A0A] uppercase">{order.fulfillmentStatus}</span>
              </div>
              <div className="flex justify-between text-[#71717A]">
                <span>Shipping Fee</span>
                <span className="text-[#0A0A0A]">{order.shippingFee === 0 ? "Complimentary" : formatPrice(order.shippingFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#0A0A0A] font-bold text-sm pt-2 border-t border-[#E5E5E5]">
                <span>Total Settlement</span>
                <span className="text-[#0A0A0A] text-base font-serif tabular-nums">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Continue Action */}
          <div className="pt-6 border-t border-[#E5E5E5] flex flex-col sm:flex-row gap-4">
            <Link href="/collections/all" className="flex-1">
              <Button className="w-full bg-[#0A0A0A] hover:bg-[#262626] text-white font-bold text-xs h-12 rounded-none tracking-widest uppercase shadow-sm transition-all">
                <span>Continue Shopping Drops</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/account" className="flex-1">
              <Button variant="outline" className="w-full font-bold text-xs h-12 rounded-none tracking-widest uppercase border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#FAFAFA] bg-white transition-all">
                <span>Access Member Suite</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
