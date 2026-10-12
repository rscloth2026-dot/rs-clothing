import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/utils";
import { IndianRupee, ShoppingBag, Shirt, AlertTriangle, ArrowRight, ExternalLink } from "lucide-react";

export const revalidate = 0; // Dynamic data for operations

export default async function AdminOverviewPage() {
  const [orders, products, variants, subscribersCount] = await Promise.all([
    prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      include: { variants: true },
    }),
    prisma.variant.findMany(),
    prisma.newsletter.count(),
  ]);

  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.paymentStatus === "PAID" ? ord.totalAmount : 0), 0);
  const totalOrdersCount = orders.length;
  const publishedProductsCount = products.filter((p) => p.status === "PUBLISHED").length;
  const lowStockVariants = variants.filter((v) => v.stockQuantity <= 5);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-10">
      <div>
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
          EXECUTIVE OVERVIEW
        </span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-white font-editorial tracking-tight">
          OPERATIONAL KPI DASHBOARD
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Live database metrics across the Indian storefront.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Revenue */}
        <div className="p-6 bg-onyx-900 border border-border space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-xs font-mono uppercase">Gross Paid Sales</span>
            <IndianRupee className="w-4 h-4 text-volt" />
          </div>
          <div className="text-3xl font-black text-volt font-editorial tabular-nums">
            {formatPrice(totalRevenue)}
          </div>
          <p className="text-[11px] text-muted-foreground">Across verified Razorpay payments</p>
        </div>

        {/* Card 2: Total Orders */}
        <div className="p-6 bg-onyx-900 border border-border space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-xs font-mono uppercase">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-black text-white font-editorial tabular-nums">
            {totalOrdersCount}
          </div>
          <p className="text-[11px] text-muted-foreground">Active dispatch pipeline</p>
        </div>

        {/* Card 3: Products */}
        <div className="p-6 bg-onyx-900 border border-border space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-xs font-mono uppercase">Live Catalog</span>
            <Shirt className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-black text-white font-editorial tabular-nums">
            {publishedProductsCount}
          </div>
          <p className="text-[11px] text-muted-foreground">Published streetwear styles</p>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="p-6 bg-onyx-900 border border-border space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-xs font-mono uppercase">Low Stock SKUs</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 font-editorial tabular-nums">
            {lowStockVariants.length}
          </div>
          <p className="text-[11px] text-muted-foreground">Variants with ≤ 5 units remaining</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="p-6 bg-onyx-900 border border-border space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h2 className="text-base font-black uppercase text-white font-editorial">
            Recent Order Transmissions
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs font-mono text-volt hover:underline flex items-center space-x-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-mono">
            <thead>
              <tr className="bg-onyx-800 text-muted-foreground border-b border-border">
                <th className="p-3">ORDER ID</th>
                <th className="p-3">CUSTOMER</th>
                <th className="p-3">DATE</th>
                <th className="p-3">TOTAL</th>
                <th className="p-3">PAYMENT</th>
                <th className="p-3">FULFILLMENT</th>
                <th className="p-3">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-white">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-onyx-800/40 transition-colors">
                  <td className="p-3 font-bold text-volt">{ord.orderNumber}</td>
                  <td className="p-3">
                    <span className="block font-bold">{ord.customerName}</span>
                    <span className="text-[10px] text-muted-foreground">{ord.customerPhone}</span>
                  </td>
                  <td className="p-3 text-muted-foreground">{formatDate(ord.createdAt)}</td>
                  <td className="p-3 font-bold tabular-nums">{formatPrice(ord.totalAmount)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-onyx-800 border border-border text-[10px] uppercase">
                      {ord.paymentStatus} ({ord.paymentMethod})
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-volt text-black text-[10px] font-bold uppercase">
                      {ord.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/order-success/${ord.id}`}
                      className="text-volt hover:underline flex items-center space-x-1"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
