import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/utils";
import { IndianRupee, ShoppingBag, Shirt, AlertTriangle, ArrowRight, ExternalLink, Sparkles } from "lucide-react";

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
    <div className="space-y-10 text-[#1C1917] font-sans">
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#8B1E1E]">
            ATELIER OPERATIONS CONSOLE
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
          Executive KPI Dashboard
        </h1>
        <p className="text-xs text-[#78716C] mt-1">
          Real-time metrics across national store transactions, order pipeline, and catalog health.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Revenue */}
        <div className="p-6 bg-[#FFFFFF] border border-[#E7E2D9] space-y-2 rounded-sm shadow-xs">
          <div className="flex justify-between items-center text-[#78716C]">
            <span className="text-xs font-semibold uppercase">Gross Paid Revenue</span>
            <IndianRupee className="w-4 h-4 text-[#8B1E1E]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#1C1917] tabular-nums">
            {formatPrice(totalRevenue)}
          </div>
          <p className="text-[11px] text-[#A8A29E]">Across verified Razorpay & COD receipts</p>
        </div>

        {/* Card 2: Total Orders */}
        <div className="p-6 bg-[#FFFFFF] border border-[#E7E2D9] space-y-2 rounded-sm shadow-xs">
          <div className="flex justify-between items-center text-[#78716C]">
            <span className="text-xs font-semibold uppercase">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#8B1E1E]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#1C1917] tabular-nums">
            {totalOrdersCount}
          </div>
          <p className="text-[11px] text-[#A8A29E]">Active national dispatch pipeline</p>
        </div>

        {/* Card 3: Products */}
        <div className="p-6 bg-[#FFFFFF] border border-[#E7E2D9] space-y-2 rounded-sm shadow-xs">
          <div className="flex justify-between items-center text-[#78716C]">
            <span className="text-xs font-semibold uppercase">Active Catalog</span>
            <Shirt className="w-4 h-4 text-[#8B1E1E]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#1C1917] tabular-nums">
            {publishedProductsCount}
          </div>
          <p className="text-[11px] text-[#A8A29E]">Live published Rajasthani garments</p>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="p-6 bg-[#FFFFFF] border border-[#E7E2D9] space-y-2 rounded-sm shadow-xs">
          <div className="flex justify-between items-center text-[#78716C]">
            <span className="text-xs font-semibold uppercase">Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-[#8B1E1E]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#8B1E1E] tabular-nums">
            {lowStockVariants.length}
          </div>
          <p className="text-[11px] text-[#A8A29E]">SKUs with ≤ 5 units in stock</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="p-6 bg-[#FFFFFF] border border-[#E7E2D9] space-y-5 rounded-sm shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
          <h2 className="text-base font-serif font-bold uppercase text-[#1C1917]">
            Recent Order Transmissions
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#8B1E1E] hover:underline flex items-center space-x-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#FAF6EE] text-[#78716C] border-b border-[#E7E2D9] font-bold">
                <th className="p-3.5">ORDER ID</th>
                <th className="p-3.5">CUSTOMER</th>
                <th className="p-3.5">DATE</th>
                <th className="p-3.5">TOTAL</th>
                <th className="p-3.5">PAYMENT</th>
                <th className="p-3.5">FULFILLMENT</th>
                <th className="p-3.5">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0ECE1] text-[#1C1917]">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FDFCF7] transition-colors">
                  <td className="p-3.5 font-bold font-mono text-[#8B1E1E]">{ord.orderNumber}</td>
                  <td className="p-3.5">
                    <span className="block font-semibold text-[#1C1917]">{ord.customerName}</span>
                    <span className="text-[10px] text-[#78716C]">{ord.customerPhone}</span>
                  </td>
                  <td className="p-3.5 text-[#78716C]">{formatDate(ord.createdAt)}</td>
                  <td className="p-3.5 font-serif font-bold tabular-nums text-[#1C1917]">{formatPrice(ord.totalAmount)}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-[#FAF6EE] border border-[#E7E2D9] text-[10px] uppercase font-semibold text-[#57534E] rounded-xs">
                      {ord.paymentStatus} ({ord.paymentMethod})
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-[#8B1E1E] text-white text-[10px] font-bold uppercase rounded-xs">
                      {ord.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Link
                      href={`/order-success/${ord.id}`}
                      className="text-[#8B1E1E] hover:underline flex items-center space-x-1 font-bold"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
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
