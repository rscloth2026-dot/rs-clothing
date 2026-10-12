import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Truck, Package, Clock, ArrowRight, ShieldCheck } from "lucide-react";
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

  const shippingAddress = JSON.parse(order.shippingAddress);

  return (
    <div className="min-h-screen bg-onyx-950 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-onyx-900 border border-border p-6 sm:p-10 space-y-8 shadow-2xl">
          {/* Success Banner */}
          <div className="text-center space-y-3 pb-6 border-b border-border">
            <div className="w-16 h-16 bg-volt/10 border border-volt/30 text-volt rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
              DROP ORDER CONFIRMED
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-editorial tracking-tight">
              THANK YOU, {order.customerName.split(" ")[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Your garments are booked in our workshop. A confirmation has been sent to{" "}
              <strong className="text-white">{order.customerEmail}</strong>.
            </p>
          </div>

          {/* Tracking & Logistics Card */}
          <div className="p-5 bg-onyx-800/80 border border-border space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
              <div>
                <span className="text-muted-foreground font-mono">ORDER ID:</span>
                <span className="ml-2 font-mono font-bold text-volt">{order.orderNumber}</span>
              </div>
              <div>
                <span className="text-muted-foreground font-mono">WAYBILL / TRACKING:</span>
                <span className="ml-2 font-mono font-bold text-white">{order.trackingNumber || "BD-AIR-554433"}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 flex items-center space-x-3 text-xs text-white">
              <Truck className="w-5 h-5 text-volt flex-shrink-0" />
              <span>
                Dispatched via <strong>BlueDart Express Air</strong> from New Delhi Hub. Estimated arrival in <strong>2-4 business days</strong>.
              </span>
            </div>
          </div>

          {/* Items Purchased Snapshot */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Purchased Garments ({order.items.length})
            </h3>
            <div className="divide-y divide-border/60 border border-border bg-onyx-950">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold uppercase text-white">{item.productTitle}</p>
                    <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                      SIZE: {item.size} • COLOR: {item.color} • QTY: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-volt tabular-nums">
                    {formatPrice(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Delivery Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border text-xs">
            <div className="space-y-1.5">
              <span className="font-mono text-muted-foreground uppercase text-[10px]">Delivery Destination:</span>
              <p className="text-white font-bold">{shippingAddress.fullName}</p>
              <p className="text-muted-foreground">{shippingAddress.addressLine1}</p>
              {shippingAddress.landmark && <p className="text-muted-foreground">Near: {shippingAddress.landmark}</p>}
              <p className="text-muted-foreground">
                {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
              </p>
              <p className="text-volt font-mono pt-1">Phone: +91 {shippingAddress.phone}</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-muted-foreground uppercase text-[10px]">Payment Summary:</span>
              <div className="flex justify-between text-muted-foreground">
                <span>Method</span>
                <span className="font-bold text-white uppercase">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Payment Status</span>
                <span className="font-bold text-volt uppercase">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Fulfillment Status</span>
                <span className="font-bold text-white uppercase">{order.fulfillmentStatus}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping Fee</span>
                <span className="text-white">{order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-volt">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-border">
                <span>Total Paid / Payable</span>
                <span className="text-volt tabular-nums">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Continue Action */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-4">
            <Link href="/collections/all" className="flex-1">
              <Button className="w-full font-black text-xs">
                <span>Continue Shopping Drops</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>

            <Link href="/account" className="flex-1">
              <Button variant="outline" className="w-full text-xs">
                View In Customer Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
