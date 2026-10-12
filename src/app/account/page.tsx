import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/utils";
import { AccountAuthClient } from "./AccountAuthClient";
import { Package, MapPin, User, LogOut, ArrowRight, ShieldCheck } from "lucide-react";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <AccountAuthClient />;
  }

  // Fetch customer orders and saved addresses
  const [orders, addresses] = await Promise.all([
    prisma.order.findMany({
      where: {
        OR: [{ userId: user.id }, { customerEmail: user.email }],
      },
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.address.findMany({
      where: { userId: user.id },
      orderBy: { isDefault: "desc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-onyx-950 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-10 border-b border-border gap-4">
          <div>
            <span className="text-[11px] font-mono text-volt uppercase tracking-widest font-bold">
              CUSTOMER CONTROL
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-editorial">
              WELCOME, {user.name}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Account ID: {user.id} • {user.email}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {user.role === "ADMIN" && (
              <Link href="/admin">
                <span className="px-3 py-2 bg-volt text-black text-xs font-black uppercase tracking-wider rounded-sm hover:bg-[#B8E600] inline-block">
                  ⚡ Open Admin Control
                </span>
              </Link>
            )}
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="px-3 py-2 bg-onyx-800 border border-border text-xs font-mono uppercase text-muted-foreground hover:text-white flex items-center space-x-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </form>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Orders Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center space-x-2 pb-3 border-b border-border">
              <Package className="w-4 h-4 text-volt" />
              <h2 className="text-sm font-black uppercase tracking-wider text-white">
                Your Order History ({orders.length})
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="p-8 bg-onyx-900 border border-border text-center space-y-3">
                <p className="text-sm font-bold uppercase text-white">No orders placed yet</p>
                <p className="text-xs text-muted-foreground">
                  Browse our newest drops and get your first oversized fit.
                </p>
                <Link href="/collections/all" className="inline-block mt-3">
                  <span className="px-4 py-2 bg-volt text-black text-xs font-bold uppercase inline-block">
                    Explore Drops
                  </span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 bg-onyx-900 border border-border space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/60 text-xs">
                      <div>
                        <span className="font-mono text-muted-foreground">ORDER:</span>{" "}
                        <span className="font-mono font-bold text-white">{ord.orderNumber}</span>
                        <span className="text-muted-foreground text-[11px] ml-2">
                          ({formatDate(ord.createdAt)})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 bg-onyx-800 border border-border text-[10px] font-mono text-volt uppercase">
                          {ord.paymentStatus} ({ord.paymentMethod})
                        </span>
                        <span className="px-2 py-0.5 bg-volt text-black text-[10px] font-mono font-bold uppercase">
                          {ord.fulfillmentStatus}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-white uppercase">{item.productTitle}</span>
                            <span className="text-muted-foreground text-[11px] font-mono ml-2">
                              SIZE: {item.size} • QTY: {item.quantity}
                            </span>
                          </div>
                          <span className="text-volt tabular-nums font-bold">
                            {formatPrice(item.subtotal)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs">
                      <span className="text-muted-foreground font-mono">
                        Tracking: {ord.trackingNumber || "Assigned on Dispatch"}
                      </span>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-black text-white tabular-nums">
                          Total: {formatPrice(ord.totalAmount)}
                        </span>
                        <Link
                          href={`/order-success/${ord.id}`}
                          className="text-volt hover:underline flex items-center space-x-1 font-bold text-[11px]"
                        >
                          <span>Receipt</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile & Saved Addresses Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-onyx-900 border border-border space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-volt flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile Credentials</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px]">NAME</span>
                  <span className="text-white font-bold">{user.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">EMAIL</span>
                  <span className="text-white font-mono">{user.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">ROLE</span>
                  <span className="text-volt font-mono font-bold">{user.role}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-onyx-900 border border-border space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-volt flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Saved Shipping Addresses</span>
              </h3>
              {addresses.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Your address entered during checkout will appear here for 1-click reorders.
                </p>
              ) : (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="p-3 bg-onyx-800 border border-border text-xs space-y-1">
                      <p className="font-bold text-white">{addr.fullName}</p>
                      <p className="text-muted-foreground">{addr.addressLine1}</p>
                      <p className="text-muted-foreground">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-volt font-mono text-[11px]">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
