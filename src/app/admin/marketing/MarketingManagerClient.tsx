"use client";

import React, { useState } from "react";
import { Plus, Tag, Mail, Power, Sparkles } from "lucide-react";
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
  const [desc, setDesc] = useState("Exclusive royal seasonal drop discount");
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
    <div className="space-y-10 text-[#1C1917] font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#8B1E1E]">
              PROMOTIONS & AUDIENCE
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
            Coupons & Audience Marketing
          </h1>
          <p className="text-xs text-[#78716C] mt-1">
            Manage promotional discounts, cart triggers, and drop subscriber lists.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#8B1E1E] hover:bg-[#6B1414] text-white flex items-center space-x-2 font-bold uppercase tracking-wider text-xs h-11 px-5 rounded-sm shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          <span>Create Promo Coupon</span>
        </Button>
      </div>

      {/* Coupons Table */}
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] p-6 space-y-4 rounded-sm shadow-xs">
        <h2 className="text-base font-serif font-bold uppercase text-[#1C1917] flex items-center space-x-2">
          <Tag className="w-4 h-4 text-[#8B1E1E]" />
          <span>Active Discount Codes ({coupons.length})</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#FAF6EE] text-[#78716C] border-b border-[#E7E2D9] font-bold">
                <th className="p-3.5">COUPON CODE</th>
                <th className="p-3.5">DISCOUNT VALUE</th>
                <th className="p-3.5">MIN ORDER VALUE</th>
                <th className="p-3.5">USAGE COUNT</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0ECE1] text-[#1C1917]">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-[#FDFCF7] transition-colors">
                  <td className="p-3.5">
                    <span className="font-bold text-[#8B1E1E] text-sm block font-mono">{c.code}</span>
                    <span className="text-[10px] text-[#78716C]">{c.description}</span>
                  </td>
                  <td className="p-3.5 font-bold text-[#1C1917]">
                    {c.discountType === "PERCENTAGE"
                      ? `${c.discountValue}% OFF (Max ₹${c.maxDiscount || "No cap"})`
                      : `Flat ₹${c.discountValue} OFF`}
                  </td>
                  <td className="p-3.5 text-[#78716C] tabular-nums font-semibold">
                    {formatPrice(c.minOrderValue)}
                  </td>
                  <td className="p-3.5 font-bold tabular-nums text-[#1C1917]">{c.usageCount} orders</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 border text-[10px] font-bold uppercase rounded-xs ${
                        c.isActive
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-neutral-100 text-neutral-600 border-neutral-300"
                      }`}
                    >
                      {c.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => handleToggleActive(c.id, c.isActive)}
                      className="text-xs text-[#8B1E1E] hover:underline flex items-center space-x-1 font-bold"
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
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] p-6 space-y-4 rounded-sm shadow-xs">
        <h2 className="text-base font-serif font-bold uppercase text-[#1C1917] flex items-center space-x-2">
          <Mail className="w-4 h-4 text-[#8B1E1E]" />
          <span>VIP Drop Newsletter Subscribers ({subscribers.length})</span>
        </h2>

        {subscribers.length === 0 ? (
          <p className="text-xs text-[#78716C]">
            No subscribers yet. Patrons subscribing in the footer appear here automatically.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {subscribers.map((sub) => (
              <div key={sub.id} className="p-3.5 bg-[#FAF6EE] border border-[#E7E2D9] text-xs flex justify-between items-center rounded-sm">
                <span className="text-[#1C1917] font-semibold">{sub.email}</span>
                <span className="text-[10px] text-[#A8A29E]">{formatDate(sub.subscribedAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Coupon Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] border border-[#E7E2D9] max-w-md w-full p-6 space-y-5 shadow-2xl rounded-sm">
            <div className="flex justify-between items-center border-b border-[#F0ECE1] pb-3">
              <h3 className="text-lg font-serif font-bold uppercase text-[#1C1917]">
                Create Promotional Coupon
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-[#78716C] hover:text-[#1C1917]">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                  Coupon Code *
                </label>
                <Input
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FLASH20"
                  className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                  Discount Type *
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full h-11 bg-[#FFFFFF] border border-[#E7E2D9] px-3 text-[#1C1917] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
                >
                  <option value="PERCENTAGE">Percentage (%) Discount</option>
                  <option value="FLAT">Flat ₹ Discount</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                    Value ({discountType === "PERCENTAGE" ? "%" : "₹"}) *
                  </label>
                  <Input
                    required
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder="10"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                    Min Order Value (₹) *
                  </label>
                  <Input
                    required
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    placeholder="999"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {discountType === "PERCENTAGE" && (
                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                    Max Discount Cap (₹)
                  </label>
                  <Input
                    type="number"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    placeholder="500"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                  Offer Description
                </label>
                <Input
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)} className="text-[#78716C]">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="bg-[#8B1E1E] hover:bg-[#6B1414] text-white font-bold uppercase tracking-wider">
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
