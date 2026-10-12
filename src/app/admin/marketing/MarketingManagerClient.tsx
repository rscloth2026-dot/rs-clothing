"use client";

import React, { useState } from "react";
import { Plus, Tag, Mail, Check, Power, Sparkles } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MarketingManagerClient({
  initialCoupons,
  subscribers,
}: {
  initialCoupons: any[];
  subscribers: any[];
}) {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New coupon form state
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("Exclusive seasonal drop discount");
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FLAT">("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState("10");
  const [minOrder, setMinOrder] = useState("999");
  const [maxDiscount, setMaxDiscount] = useState("500");
  const [loading, setLoading] = useState(false);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          description: desc,
          discountType,
          discountValue,
          minOrderValue: minOrder,
          maxDiscount: discountType === "PERCENTAGE" ? maxDiscount : null,
        }),
      });

      const data = await res.json();
      if (res.ok && data.coupon) {
        setCoupons([data.coupon, ...coupons]);
        setIsCreateOpen(false);
        setCode("");
      }
    } catch (err) {
      console.error("Create coupon error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !current }),
      });

      if (res.ok) {
        setCoupons((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isActive: !current } : c))
        );
      }
    } catch (err) {
      console.error("Toggle coupon error", err);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
            GROWTH & CAMPAIGNS
          </span>
          <h1 className="text-3xl font-black uppercase text-white font-editorial tracking-tight">
            COUPONS & PROMOTIONS
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage promotional discounts, cart triggers, and drop subscriber audiences.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="flex items-center space-x-2 font-black text-xs">
          <Plus className="w-4 h-4 text-black" />
          <span>Create Promo Coupon</span>
        </Button>
      </div>

      {/* Coupons Table */}
      <div className="bg-onyx-900 border border-border p-6 space-y-4">
        <h2 className="text-base font-black uppercase text-white font-editorial flex items-center space-x-2">
          <Tag className="w-4 h-4 text-volt" />
          <span>Active Discount Codes ({coupons.length})</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-mono">
            <thead>
              <tr className="bg-onyx-800 text-muted-foreground border-b border-border">
                <th className="p-3">COUPON CODE</th>
                <th className="p-3">DISCOUNT VALUE</th>
                <th className="p-3">MIN ORDER VALUE</th>
                <th className="p-3">USAGE COUNT</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-white">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-onyx-800/40 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-volt text-sm block">{c.code}</span>
                    <span className="text-[10px] text-muted-foreground">{c.description}</span>
                  </td>
                  <td className="p-3 font-bold text-white">
                    {c.discountType === "PERCENTAGE"
                      ? `${c.discountValue}% OFF (Max ₹${c.maxDiscount || "No cap"})`
                      : `Flat ₹${c.discountValue} OFF`}
                  </td>
                  <td className="p-3 text-muted-foreground tabular-nums">
                    {formatPrice(c.minOrderValue)}
                  </td>
                  <td className="p-3 font-bold tabular-nums">{c.usageCount} orders</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 border text-[10px] font-bold uppercase ${
                        c.isActive ? "bg-volt/10 text-volt border-volt/30" : "bg-onyx-800 text-muted-foreground border-border"
                      }`}
                    >
                      {c.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleToggleActive(c.id, c.isActive)}
                      className="text-xs text-muted-foreground hover:text-white underline flex items-center space-x-1"
                    >
                      <Power className="w-3 h-3" />
                      <span>{c.isActive ? "Deactivate" : "Activate"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Newsletter Subscribers Section */}
      <div className="bg-onyx-900 border border-border p-6 space-y-4">
        <h2 className="text-base font-black uppercase text-white font-editorial flex items-center space-x-2">
          <Mail className="w-4 h-4 text-volt" />
          <span>VIP Drop Newsletter Subscribers ({subscribers.length})</span>
        </h2>

        {subscribers.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No subscribers yet. Users subscribing in the footer appear here automatically.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {subscribers.map((sub) => (
              <div key={sub.id} className="p-3 bg-onyx-800 border border-border text-xs flex justify-between items-center">
                <span className="text-white font-mono">{sub.email}</span>
                <span className="text-[10px] text-muted-foreground">{formatDate(sub.subscribedAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Coupon Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-onyx-900 border border-border max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-lg font-black uppercase text-white font-editorial">
                CREATE PROMOTIONAL COUPON
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-muted-foreground hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                  Coupon Code *
                </label>
                <Input
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FLASH20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                  Discount Type *
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full h-11 bg-onyx-800 border border-border px-3 text-white focus:outline-none focus:border-volt"
                >
                  <option value="PERCENTAGE">Percentage (%) Discount</option>
                  <option value="FLAT">Flat ₹ Discount</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Value ({discountType === "PERCENTAGE" ? "%" : "₹"}) *
                  </label>
                  <Input
                    required
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Min Order Value (₹) *
                  </label>
                  <Input
                    required
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    placeholder="999"
                  />
                </div>
              </div>

              {discountType === "PERCENTAGE" && (
                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Max Discount Cap (₹)
                  </label>
                  <Input
                    type="number"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    placeholder="500"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                  Offer Description
                </label>
                <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="font-black">
                  {loading ? "Creating..." : "Save Coupon"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
