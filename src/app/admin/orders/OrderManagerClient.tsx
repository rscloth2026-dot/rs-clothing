"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Truck, ExternalLink, CheckCircle, Package, Clock, ShieldCheck } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-8">
      <div>
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
          FULFILLMENT OPERATIONS
        </span>
        <h1 className="text-3xl font-black uppercase text-white font-editorial tracking-tight">
          ORDERS & DISPATCH
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Monitor BlueDart air deliveries, verify customer details, and update tracking stages.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-onyx-900 border border-border p-3">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="w-4 h-4 text-muted-foreground ml-2" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, phone, or waybill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white placeholder:text-muted-foreground focus:outline-none px-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono uppercase text-muted-foreground">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-onyx-800 border border-border text-white text-xs px-2.5 py-1.5 focus:outline-none focus:border-volt"
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
      <div className="bg-onyx-900 border border-border overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse font-mono">
          <thead>
            <tr className="bg-onyx-800 text-muted-foreground border-b border-border">
              <th className="p-3">ORDER / DATE</th>
              <th className="p-3">CUSTOMER & PHONE</th>
              <th className="p-3">ITEMS SNAPSHOT</th>
              <th className="p-3">PAYABLE AMOUNT</th>
              <th className="p-3">PAYMENT STATUS</th>
              <th className="p-3">DISPATCH STAGE</th>
              <th className="p-3">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-white">
            {filtered.map((ord) => (
              <tr key={ord.id} className="hover:bg-onyx-800/40 transition-colors">
                <td className="p-3">
                  <span className="font-bold text-volt block">{ord.orderNumber}</span>
                  <span className="text-[10px] text-muted-foreground">{formatDate(ord.createdAt)}</span>
                  <span className="text-[10px] text-muted-foreground font-mono block">
                    WB: {ord.trackingNumber || "N/A"}
                  </span>
                </td>

                <td className="p-3">
                  <span className="font-bold block text-white">{ord.customerName}</span>
                  <span className="text-[10px] text-muted-foreground">{ord.customerEmail}</span>
                  <span className="text-[10px] text-volt block">{ord.customerPhone}</span>
                </td>

                <td className="p-3">
                  <div className="space-y-1 max-w-xs">
                    {ord.items.map((item: any) => (
                      <div key={item.id} className="text-[11px] truncate">
                        • {item.productTitle} ({item.size}) x{item.quantity}
                      </div>
                    ))}
                  </div>
                </td>

                <td className="p-3 font-bold tabular-nums">
                  <span className="text-white text-sm">{formatPrice(ord.totalAmount)}</span>
                  <span className="text-[10px] text-muted-foreground block uppercase font-mono">
                    via {ord.paymentMethod}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 border text-[10px] font-bold uppercase ${
                      ord.paymentStatus === "PAID"
                        ? "bg-volt/10 text-volt border-volt/30"
                        : "bg-amber-400/10 text-amber-300 border-amber-400/30"
                    }`}
                  >
                    {ord.paymentStatus}
                  </span>
                </td>

                <td className="p-3">
                  <select
                    disabled={updatingId === ord.id}
                    value={ord.fulfillmentStatus}
                    onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                    className="bg-onyx-800 border border-border text-white text-xs px-2 py-1 font-bold focus:outline-none focus:border-volt"
                  >
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>

                <td className="p-3">
                  <Link
                    href={`/order-success/${ord.id}`}
                    target="_blank"
                    className="text-volt hover:underline flex items-center space-x-1 text-[11px]"
                  >
                    <span>View Bill</span>
                    <ExternalLink className="w-3 h-3" />
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
