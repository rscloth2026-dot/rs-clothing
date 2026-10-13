import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Truck, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-[#FDFCF7] text-[#1C1917] py-12 sm:py-16 lg:py-24 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E7E2D9] p-6 sm:p-10 space-y-8 shadow-sm rounded-sm">
          {/* Success Banner */}
          <div className="text-center space-y-3 pb-6 border-b border-[#F0ECE1]">
            <div className="w-14 h-14 bg-[#FAF6EE] border border-[#C5A059]/40 text-[#8B1E1E] flex items-center justify-center mx-auto mb-2 rounded-full">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#8B1E1E]">
                ORDER CONFIRMED // DISPATCH QUEUED
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
              Thank You, {order.customerName.split(" ")[0]}
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
              Your royal garments are being prepared for dispatch. A formal tax invoice and air waybill confirmation has been sent to{" "}
              <strong className="text-[#1C1917]">{order.customerEmail}</strong>.
            </p>
          </div>

          {/* Tracking & Logistics Card */}
          <div className="p-5 bg-[#FAF6EE] border border-[#E7E2D9] space-y-3 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
              <div>
                <span className="text-[#78716C] uppercase text-[11px] font-semibold">Order Number:</span>
                <span className="ml-2 font-mono font-bold text-[#8B1E1E]">{order.orderNumber}</span>
              </div>
              <div>
                <span className="text-[#78716C] uppercase text-[11px] font-semibold">Air Waybill / Tracking:</span>
                <span className="ml-2 font-mono font-bold text-[#1C1917]">{order.trackingNumber || "BD-AIR-554433"}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E7E2D9] flex items-center space-x-3 text-xs text-[#57534E]">
              <Truck className="w-5 h-5 text-[#8B1E1E] flex-shrink-0" />
              <span>
                Dispatched via <strong className="text-[#1C1917]">BlueDart Express Air</strong> from Jodhpur Hub (Marwar). Estimated arrival in <strong className="text-[#1C1917]">2-4 business days</strong>.
              </span>
            </div>
          </div>

          {/* Items Purchased Snapshot */}
          <div className="space-y-4">
            <h3 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E]">
              Selected Garments ({order.items.length})
            </h3>
            <div className="divide-y divide-[#F0ECE1] border border-[#E7E2D9] bg-[#FFFFFF] rounded-sm">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold uppercase text-[#1C1917]">{item.productTitle}</p>
                    <p className="text-[10px] text-[#78716C] mt-0.5 uppercase tracking-wider font-sans">
                      Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-serif font-bold text-[#8B1E1E] tabular-nums text-sm">
                    {formatPrice(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Delivery Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#F0ECE1] text-xs">
            <div className="space-y-1.5">
              <span className="text-[#8B1E1E] uppercase text-[10px] tracking-wider block mb-1 font-bold">
                Delivery Destination
              </span>
              <p className="text-[#1C1917] font-semibold">{shippingAddress.fullName || order.customerName}</p>
              <p className="text-[#57534E]">{shippingAddress.addressLine1}</p>
              {shippingAddress.landmark && <p className="text-[#78716C]">Near: {shippingAddress.landmark}</p>}
              <p className="text-[#57534E]">
                {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
              </p>
              <p className="text-[#8B1E1E] font-medium pt-1">Phone: +91 {shippingAddress.phone || order.customerPhone}</p>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <span className="text-[#8B1E1E] uppercase text-[10px] tracking-wider block mb-1 font-bold">
                Payment & Fulfillment
              </span>
              <div className="flex justify-between text-[#78716C]">
                <span>Method</span>
                <span className="font-semibold text-[#1C1917] uppercase">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Payment Status</span>
                <span className="font-semibold text-emerald-700 uppercase">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Fulfillment Status</span>
                <span className="font-semibold text-[#1C1917] uppercase">{order.fulfillmentStatus}</span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Shipping Fee</span>
                <span className="text-[#1C1917]">{order.shippingFee === 0 ? "Complimentary" : formatPrice(order.shippingFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#1C1917] font-bold text-sm pt-2 border-t border-[#F0ECE1]">
                <span>Total Settlement</span>
                <span className="text-[#8B1E1E] text-base font-serif tabular-nums">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Continue Action */}
          <div className="pt-6 border-t border-[#F0ECE1] flex flex-col sm:flex-row gap-4">
            <Link href="/collections/all" className="flex-1">
              <Button className="w-full bg-[#8B1E1E] hover:bg-[#6B1414] text-white font-bold text-xs h-12 rounded-sm tracking-wider uppercase shadow-sm">
                <span>Continue Shopping Drops</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/account" className="flex-1">
              <Button variant="outline" className="w-full font-bold text-xs h-12 rounded-sm tracking-wider uppercase border-[#E7E2D9] text-[#1C1917] hover:border-[#8B1E1E] bg-white">
                <span>Access Member Suite</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
