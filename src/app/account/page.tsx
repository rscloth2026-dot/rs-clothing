import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/utils";
import { AccountAuthClient } from "./AccountAuthClient";
import { Package, MapPin, User, LogOut, ArrowRight, Truck, Sparkles } from "lucide-react";

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

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12 lg:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Royal Patron Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-10 border-b border-[#E5E5E5] gap-5">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-[#0A0A0A] text-[#FAFAFA] flex items-center justify-center font-serif font-bold text-xl shadow-md shrink-0 border border-[#262626]">
              {initials}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-[0.2em] font-semibold flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>ROYAL PATRON ARCHIVE</span>
                </span>
                <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E5E5] text-[9px] font-mono font-semibold text-[#0A0A0A] rounded-none uppercase">
                  MEMBER
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#0A0A0A] mt-0.5">
                {user.name}
              </h1>
              <p className="text-xs text-[#71717A] mt-0.5 font-sans">
                Patron ID: {user.id.substring(0, 12)}... • {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="px-4 py-2 bg-[#FFFFFF] border border-[#E5E5E5] text-xs font-sans uppercase font-bold text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A] rounded-none transition-colors flex items-center space-x-1.5 shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Orders Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-[#E5E5E5]">
              <Package className="w-4 h-4 text-[#0A0A0A]" />
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0A0A0A]">
                Your Order Vault ({orders.length})
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="p-8 sm:p-12 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none text-center space-y-3.5 shadow-sm">
                <Package className="w-10 h-10 text-[#A1A1AA] mx-auto stroke-1" />
                <p className="text-lg font-serif font-bold text-[#0A0A0A]">No orders placed yet</p>
                <p className="text-xs text-[#71717A] font-sans max-w-sm mx-auto leading-relaxed">
                  Browse our newest atelier drops and acquire your first 380 GSM oversized fit.
                </p>
                <Link href="/collections/all" className="inline-block mt-3">
                  <span className="px-6 py-2.5 bg-[#0A0A0A] text-white text-xs font-sans font-bold uppercase tracking-widest rounded-none inline-block shadow-sm hover:bg-[#262626] transition-colors">
                    Explore Drops
                  </span>
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map((ord) => {
                  const isDelivered = ord.fulfillmentStatus === "DELIVERED";
                  const isInTransit = ord.fulfillmentStatus === "SHIPPED";

                  return (
                    <div
                      key={ord.id}
                      className="p-6 bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors rounded-none space-y-4 shadow-sm"
                    >
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F4F4F5] text-xs">
                        <div>
                          <span className="font-sans text-[#71717A]">ORDER:</span>{" "}
                          <span className="font-mono font-bold text-[#0A0A0A]">{ord.orderNumber}</span>
                          <span className="text-[#A1A1AA] text-[11px] ml-2 font-sans">
                            ({formatDate(ord.createdAt)})
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-0.5 bg-[#FAFAFA] border border-[#E5E5E5] text-[10px] font-sans font-semibold text-[#525252] uppercase rounded-none">
                            {ord.paymentStatus} ({ord.paymentMethod})
                          </span>
                          <span className="px-2.5 py-0.5 bg-[#0A0A0A] text-white text-[10px] font-mono font-bold uppercase rounded-none">
                            {ord.fulfillmentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Delivery Status Stepper */}
                      <div className="py-2.5 bg-[#FAFAFA] p-3.5 rounded-none border border-[#E5E5E5]">
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-[#71717A] mb-2">
                          <span className={ord.fulfillmentStatus !== "CANCELLED" ? "text-[#0A0A0A]" : ""}>1. Placed</span>
                          <span className={isInTransit || isDelivered ? "text-[#0A0A0A]" : ""}>2. Processed</span>
                          <span className={isInTransit || isDelivered ? "text-[#0A0A0A]" : ""}>3. BlueDart Air</span>
                          <span className={isDelivered ? "text-[#0A0A0A]" : ""}>4. Delivered</span>
                        </div>
                        <div className="w-full bg-[#E5E5E5] h-1 rounded-none overflow-hidden">
                          <div
                            className="bg-[#0A0A0A] h-full rounded-none transition-all duration-500"
                            style={{
                              width: isDelivered ? "100%" : isInTransit ? "75%" : "35%",
                            }}
                          />
                        </div>
                      </div>

                      {/* Item Breakdown */}
                      <div className="space-y-2.5">
                        {ord.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-xs">
                            <div>
                              <span className="font-semibold text-[#0A0A0A] font-sans uppercase tracking-wide">{item.productTitle}</span>
                              <span className="text-[#71717A] text-[11px] font-sans ml-2">
                                SIZE: {item.size} • QTY: {item.quantity}
                              </span>
                            </div>
                            <span className="text-[#0A0A0A] tabular-nums font-serif font-bold">
                              {formatPrice(item.subtotal)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tracking & Receipt Link */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#F4F4F5] text-xs">
                        <div className="flex items-center space-x-2 text-[#71717A] font-sans">
                          <Truck className="w-3.5 h-3.5 text-[#0A0A0A]" />
                          <span>
                            Tracking: <strong className="text-[#0A0A0A]">{ord.trackingNumber || "Assigned on Dispatch"}</strong>
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-bold text-[#0A0A0A] tabular-nums font-serif">
                            Total: {formatPrice(ord.totalAmount)}
                          </span>
                          <Link
                            href={`/order-success/${ord.id}`}
                            className="text-[#0A0A0A] hover:underline flex items-center space-x-1 font-bold text-[11px] transition-colors"
                          >
                            <span>Receipt</span>
                            <ArrowRight className="w-3 h-3 text-[#0A0A0A]" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile & Saved Addresses Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Credentials Card */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E5E5E5] space-y-4 rounded-none shadow-sm">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] flex items-center space-x-2 border-b border-[#E5E5E5] pb-3">
                <User className="w-4 h-4 text-[#0A0A0A]" />
                <span>Patron Profile</span>
              </h3>
              <div className="space-y-3 text-xs font-sans">
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-semibold">Full Name</span>
                  <span className="text-[#0A0A0A] font-semibold">{user.name}</span>
                </div>
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-semibold">Email Address</span>
                  <span className="text-[#0A0A0A]">{user.email}</span>
                </div>
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-semibold">Membership Tier</span>
                  <span className="text-[#0A0A0A] font-bold uppercase font-mono">ROYAL ARCHIVE PRIVILEGED</span>
                </div>
              </div>
            </div>

            {/* Saved Shipping Addresses Card */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E5E5E5] space-y-4 rounded-none shadow-sm">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] flex items-center space-x-2 border-b border-[#E5E5E5] pb-3">
                <MapPin className="w-4 h-4 text-[#0A0A0A]" />
                <span>Saved Shipping Vault</span>
              </h3>
              {addresses.length === 0 ? (
                <p className="text-xs text-[#71717A] font-sans leading-relaxed">
                  Your delivery address entered during checkout will appear here for 1-click reorders.
                </p>
              ) : (
                <div className="space-y-3 font-sans">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="p-3.5 bg-[#FAFAFA] border border-[#E5E5E5] text-xs space-y-1.5 rounded-none">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-[#0A0A0A]">{addr.fullName}</p>
                        {addr.isDefault && (
                          <span className="text-[9px] font-mono font-bold text-[#0A0A0A] bg-[#FFFFFF] px-2 py-0.5 rounded-none border border-[#E5E5E5]">
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <p className="text-[#525252]">{addr.addressLine1}</p>
                      <p className="text-[#525252]">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-[#0A0A0A] font-medium text-[11px]">Phone: {addr.phone}</p>
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
