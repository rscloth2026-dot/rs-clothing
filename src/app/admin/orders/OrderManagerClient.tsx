"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, Sparkles } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

export function OrderManagerClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(search.toLowerCase()) ||
      ord.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      (ord.trackingNumber && ord.trackingNumber.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || ord.fulfillmentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          fulfillmentStatus: newStatus,
        }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, fulfillmentStatus: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Status update error", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8 text-[#1C1917] font-sans">
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#8B1E1E]">
            LOGISTICS & SHIPMENTS
          </span>
        </div>
        <h1 className="text-3xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
          Orders & Dispatch Operations
        </h1>
        <p className="text-xs text-[#78716C] mt-1">
          Monitor BlueDart air deliveries, verify customer details, and update live fulfillment status stages.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-[#FFFFFF] border border-[#E7E2D9] p-3 rounded-sm shadow-xs">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="w-4 h-4 text-[#78716C] ml-2" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, phone, or waybill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none px-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-semibold uppercase text-[#78716C]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FAF6EE] border border-[#E7E2D9] text-[#1C1917] text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
          >
            <option value="ALL">All Orders</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] overflow-x-auto rounded-sm shadow-xs">
        <table className="w-full text-xs text-left border-collapse font-sans">
          <thead>
            <tr className="bg-[#FAF6EE] text-[#78716C] border-b border-[#E7E2D9] font-bold">
              <th className="p-3.5">ORDER / DATE</th>
              <th className="p-3.5">CUSTOMER & PHONE</th>
              <th className="p-3.5">ITEMS SNAPSHOT</th>
              <th className="p-3.5">PAYABLE AMOUNT</th>
              <th className="p-3.5">PAYMENT STATUS</th>
              <th className="p-3.5">DISPATCH STAGE</th>
              <th className="p-3.5">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0ECE1] text-[#1C1917]">
            {filtered.map((ord) => (
              <tr key={ord.id} className="hover:bg-[#FDFCF7] transition-colors">
                <td className="p-3.5">
                  <span className="font-bold text-[#8B1E1E] font-mono block">{ord.orderNumber}</span>
                  <span className="text-[10px] text-[#78716C]">{formatDate(ord.createdAt)}</span>
                  <span className="text-[10px] text-[#A8A29E] font-mono block">
                    WB: {ord.trackingNumber || "N/A"}
                  </span>
                </td>

                <td className="p-3.5">
                  <span className="font-semibold block text-[#1C1917]">{ord.customerName}</span>
                  <span className="text-[10px] text-[#78716C]">{ord.customerEmail}</span>
                  <span className="text-[10px] text-[#57534E] block">{ord.customerPhone}</span>
                </td>

                <td className="p-3.5">
                  <div className="space-y-1 max-w-xs">
                    {ord.items.map((item: any) => (
                      <div key={item.id} className="text-[11px] truncate text-[#57534E]">
                        • {item.productTitle} ({item.size}) x{item.quantity}
                      </div>
                    ))}
                  </div>
                </td>

                <td className="p-3.5 font-bold tabular-nums">
                  <span className="text-[#8B1E1E] text-sm font-serif">{formatPrice(ord.totalAmount)}</span>
                  <span className="text-[10px] text-[#78716C] block uppercase">
                    via {ord.paymentMethod}
                  </span>
                </td>

                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 border text-[10px] font-bold uppercase rounded-xs ${
                      ord.paymentStatus === "PAID"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-amber-50 text-amber-800 border-amber-300"
                    }`}
                  >
                    {ord.paymentStatus}
                  </span>
                </td>

                <td className="p-3.5">
                  <select
                    disabled={updatingId === ord.id}
                    value={ord.fulfillmentStatus}
                    onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                    className="bg-[#FAF6EE] border border-[#E7E2D9] text-[#1C1917] text-xs px-2 py-1 font-semibold focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
                  >
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>

                <td className="p-3.5">
                  <Link
                    href={`/order-success/${ord.id}`}
                    target="_blank"
                    className="text-[#8B1E1E] hover:underline flex items-center space-x-1 text-[11px] font-bold"
                  >
                    <span>View Bill</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
