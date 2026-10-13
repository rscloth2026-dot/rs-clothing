import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/utils";
import { AccountAuthClient } from "./AccountAuthClient";
import { Package, MapPin, User, LogOut, ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen bg-[#FDFCF7] py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Royal Patron Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-10 border-b border-[#E7E2D9] gap-5">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B1E1E] to-[#6B1414] text-[#FFFFFF] flex items-center justify-center font-serif font-bold text-xl shadow-md shrink-0 border border-[#C5A059]">
              {initials}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-sans text-[#8B1E1E] uppercase tracking-[0.2em] font-bold flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>ROYAL PATRON ARCHIVE</span>
                </span>
                <span className="px-2 py-0.5 bg-[#FAF6EE] border border-[#C5A059]/30 text-[9px] font-sans font-semibold text-[#8B1E1E] rounded-full uppercase">
                  MEMBER
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C1917] mt-0.5">
                {user.name}
              </h1>
              <p className="text-xs text-[#78716C] mt-0.5 font-sans">
                Patron ID: {user.id.substring(0, 12)}... • {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="px-4 py-2 bg-[#FFFFFF] border border-[#E7E2D9] text-xs font-sans uppercase font-bold text-[#57534E] hover:text-[#8B1E1E] hover:border-[#8B1E1E] rounded-sm transition-colors flex items-center space-x-1.5 shadow-xs"
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
            <div className="flex items-center space-x-2.5 pb-3 border-b border-[#E7E2D9]">
              <Package className="w-4 h-4 text-[#8B1E1E]" />
              <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-[#1C1917]">
                Your Order Vault ({orders.length})
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="p-8 sm:p-12 bg-[#FFFFFF] border border-[#E7E2D9] rounded-sm text-center space-y-3.5 shadow-sm">
                <Package className="w-10 h-10 text-[#A8A29E] mx-auto stroke-1" />
                <p className="text-lg font-serif font-bold text-[#1C1917]">No orders placed yet</p>
                <p className="text-xs text-[#78716C] font-sans max-w-sm mx-auto leading-relaxed">
                  Browse our newest Rajasthani atelier drops and acquire your first 380 GSM oversized fit.
                </p>
                <Link href="/collections/all" className="inline-block mt-3">
                  <span className="px-6 py-2.5 bg-[#8B1E1E] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-sm inline-block shadow-sm hover:bg-[#6B1414] transition-colors">
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
                      className="p-6 bg-[#FFFFFF] border border-[#E7E2D9] hover:border-[#C5A059] transition-colors rounded-sm space-y-4 shadow-sm"
                    >
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0ECE1] text-xs">
                        <div>
                          <span className="font-sans text-[#78716C]">ORDER:</span>{" "}
                          <span className="font-mono font-bold text-[#1C1917]">{ord.orderNumber}</span>
                          <span className="text-[#A8A29E] text-[11px] ml-2 font-sans">
                            ({formatDate(ord.createdAt)})
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-0.5 bg-[#FAF6EE] border border-[#E7E2D9] text-[10px] font-sans font-semibold text-[#57534E] uppercase rounded-sm">
                            {ord.paymentStatus} ({ord.paymentMethod})
                          </span>
                          <span className="px-2.5 py-0.5 bg-[#8B1E1E] text-white text-[10px] font-sans font-bold uppercase rounded-sm">
                            {ord.fulfillmentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Delivery Status Stepper */}
                      <div className="py-2.5 bg-[#FDFCF7] p-3.5 rounded-sm border border-[#E7E2D9]">
                        <div className="flex items-center justify-between text-[10px] font-sans font-bold uppercase text-[#78716C] mb-2">
                          <span className={ord.fulfillmentStatus !== "CANCELLED" ? "text-[#8B1E1E]" : ""}>1. Placed</span>
                          <span className={isInTransit || isDelivered ? "text-[#8B1E1E]" : ""}>2. Processed</span>
                          <span className={isInTransit || isDelivered ? "text-[#8B1E1E]" : ""}>3. BlueDart Air</span>
                          <span className={isDelivered ? "text-[#8B1E1E]" : ""}>4. Delivered</span>
                        </div>
                        <div className="w-full bg-[#E7E2D9] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#8B1E1E] h-full rounded-full transition-all duration-500"
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
                              <span className="font-semibold text-[#1C1917] font-sans uppercase tracking-wide">{item.productTitle}</span>
                              <span className="text-[#78716C] text-[11px] font-sans ml-2">
                                SIZE: {item.size} • QTY: {item.quantity}
                              </span>
                            </div>
                            <span className="text-[#1C1917] tabular-nums font-sans font-bold">
                              {formatPrice(item.subtotal)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tracking & Receipt Link */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#F0ECE1] text-xs">
                        <div className="flex items-center space-x-2 text-[#78716C] font-sans">
                          <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>
                            Tracking: <strong className="text-[#1C1917]">{ord.trackingNumber || "Assigned on Dispatch"}</strong>
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-bold text-[#8B1E1E] tabular-nums font-sans">
                            Total: {formatPrice(ord.totalAmount)}
                          </span>
                          <Link
                            href={`/order-success/${ord.id}`}
                            className="text-[#1C1917] hover:text-[#8B1E1E] flex items-center space-x-1 font-bold text-[11px] transition-colors"
                          >
                            <span>Receipt</span>
                            <ArrowRight className="w-3 h-3 text-[#C5A059]" />
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
            <div className="p-6 bg-[#FFFFFF] border border-[#E7E2D9] space-y-4 rounded-sm shadow-sm">
              <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-[#1C1917] flex items-center space-x-2 border-b border-[#F0ECE1] pb-3">
                <User className="w-4 h-4 text-[#8B1E1E]" />
                <span>Patron Profile</span>
              </h3>
              <div className="space-y-3 text-xs font-sans">
                <div>
                  <span className="text-[#78716C] block text-[10px] uppercase font-semibold">Full Name</span>
                  <span className="text-[#1C1917] font-semibold">{user.name}</span>
                </div>
                <div>
                  <span className="text-[#78716C] block text-[10px] uppercase font-semibold">Email Address</span>
                  <span className="text-[#1C1917]">{user.email}</span>
                </div>
                <div>
                  <span className="text-[#78716C] block text-[10px] uppercase font-semibold">Membership Tier</span>
                  <span className="text-[#8B1E1E] font-bold uppercase">ROYAL ARCHIVE PRIVILEGED</span>
                </div>
              </div>
            </div>

            {/* Saved Shipping Addresses Card */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E7E2D9] space-y-4 rounded-sm shadow-sm">
              <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-[#1C1917] flex items-center space-x-2 border-b border-[#F0ECE1] pb-3">
                <MapPin className="w-4 h-4 text-[#8B1E1E]" />
                <span>Saved Shipping Vault</span>
              </h3>
              {addresses.length === 0 ? (
                <p className="text-xs text-[#78716C] font-sans leading-relaxed">
                  Your delivery address entered during checkout will appear here for 1-click reorders.
                </p>
              ) : (
                <div className="space-y-3 font-sans">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="p-3.5 bg-[#FDFCF7] border border-[#E7E2D9] text-xs space-y-1.5 rounded-sm">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-[#1C1917]">{addr.fullName}</p>
                        {addr.isDefault && (
                          <span className="text-[9px] font-sans font-bold text-[#8B1E1E] bg-[#FAF6EE] px-2 py-0.5 rounded-full border border-[#C5A059]/30">
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <p className="text-[#57534E]">{addr.addressLine1}</p>
                      <p className="text-[#57534E]">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-[#8B1E1E] font-medium text-[11px]">Phone: {addr.phone}</p>
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
