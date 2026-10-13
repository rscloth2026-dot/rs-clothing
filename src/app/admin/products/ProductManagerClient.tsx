"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, ExternalLink, Check, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProductManagerClient({
  initialProducts,
  categories,
}: {
  initialProducts: any[];
  categories: any[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState("");

  // Create form state
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newComparePrice, setNewComparePrice] = useState("");
  const [newCategoryId, setNewCategoryId] = useState(categories[0]?.id || "");
  const [newFit, setNewFit] = useState("Oversized");
  const [newFabric, setNewFabric] = useState("380 GSM 100% Combed Heavyweight Indian Cotton");
  const [newDesc, setNewDesc] = useState("Royal oversized luxury streetwear garment crafted with dropped shoulders, haveli tailoring, and double-needle collar.");
  const [newImageUrl, setNewImageUrl] = useState("https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop");
  const [creating, setCreating] = useState(false);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category?.name && p.category.name.toLowerCase().includes(search.toLowerCase())) ||
      p.fit.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStock = async (variantId: string, quantity: number) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, stockQuantity: quantity }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => ({
            ...p,
            variants: p.variants.map((v: any) =>
              v.id === variantId ? { ...v, stockQuantity: quantity } : v
            ),
          }))
        );
        setEditingStockId(null);
      }
    } catch (err) {
      console.error("Stock update error", err);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    setCreating(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          basePrice: parseFloat(newPrice),
          comparePrice: newComparePrice ? parseFloat(newComparePrice) : null,
          categoryId: newCategoryId,
          fit: newFit,
          fabricDetails: newFabric,
          description: newDesc,
          imageUrl: newImageUrl,
        }),
      });

      const data = await res.json();
      if (res.ok && data.product) {
        setProducts([data.product, ...products]);
        setIsCreateOpen(false);
        setNewTitle("");
        setNewPrice("");
        setNewComparePrice("");
      }
    } catch (err) {
      console.error("Create error", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-8 text-[#1C1917] font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#8B1E1E]">
              CATALOG & INVENTORY
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
            Products & Inventory Management
          </h1>
          <p className="text-xs text-[#78716C] mt-1">
            Publish new garment drops, update live variant stock quantities, and inspect PDP listings.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#8B1E1E] hover:bg-[#6B1414] text-white text-xs font-bold uppercase tracking-wider h-11 px-5 rounded-sm shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Launch New Garment Drop</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 bg-[#FFFFFF] border border-[#E7E2D9] p-2 rounded-sm shadow-xs">
        <Search className="w-4 h-4 text-[#78716C] ml-2" />
        <input
          type="text"
          placeholder="Filter products by title, category, or fit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none px-2 font-sans"
        />
      </div>

      {/* Products Table */}
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] overflow-x-auto rounded-sm shadow-xs">
        <table className="w-full text-xs text-left border-collapse font-sans">
          <thead>
            <tr className="bg-[#FAF6EE] text-[#78716C] border-b border-[#E7E2D9] font-bold">
              <th className="p-3.5">IMAGE</th>
              <th className="p-3.5">PRODUCT TITLE</th>
              <th className="p-3.5">CATEGORY & FIT</th>
              <th className="p-3.5">PRICE (INR)</th>
              <th className="p-3.5">VARIANT INVENTORY</th>
              <th className="p-3.5">STATUS</th>
              <th className="p-3.5">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0ECE1] text-[#1C1917]">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-[#FDFCF7] transition-colors">
                <td className="p-3.5">
                  <div className="relative w-12 h-16 bg-[#FAF6EE] overflow-hidden border border-[#E7E2D9] rounded-xs">
                    <Image
                      src={prod.images[0]?.url || "/placeholder.jpg"}
                      alt={prod.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="font-bold block text-[#1C1917]">{prod.title}</span>
                  <span className="text-[10px] text-[#78716C]">Slug: {prod.slug}</span>
                </td>
                <td className="p-3.5">
                  <span className="block text-[#1C1917] font-semibold">{prod.category?.name || "Streetwear"}</span>
                  <span className="text-[10px] text-[#78716C] uppercase font-semibold">{prod.fit} FIT</span>
                </td>
                <td className="p-3.5 font-bold tabular-nums">
                  <span className="text-[#8B1E1E] font-serif text-sm">{formatPrice(prod.basePrice)}</span>
                  {prod.comparePrice && (
                    <span className="text-[10px] text-[#A8A29E] line-through block font-sans">
                      {formatPrice(prod.comparePrice)}
                    </span>
                  )}
                </td>
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {prod.variants.map((v: any) => (
                      <div
                        key={v.id}
                        className={`px-1.5 py-0.5 border text-[10px] flex items-center space-x-1 rounded-xs ${
                          v.stockQuantity <= 5
                            ? "border-amber-300 bg-amber-50 text-amber-900"
                            : "border-[#E7E2D9] bg-[#FAF6EE] text-[#57534E]"
                        }`}
                      >
                        <span className="font-bold">{v.size}:</span>
                        {editingStockId === v.id ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              className="w-10 bg-[#FFFFFF] border border-[#8B1E1E] text-[#1C1917] px-1 text-[10px]"
                              value={newStockVal}
                              onChange={(e) => setNewStockVal(e.target.value)}
                              autoFocus
                            />
                            <button
                              onClick={() => handleUpdateStock(v.id, parseInt(newStockVal))}
                              className="text-[#8B1E1E]"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <span
                            onClick={() => {
                              setEditingStockId(v.id);
                              setNewStockVal(v.stockQuantity.toString());
                            }}
                            className="cursor-pointer hover:underline text-[#1C1917] font-bold"
                            title="Click to edit stock"
                          >
                            {v.stockQuantity}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 bg-[#FAF6EE] text-[#1C1917] border border-[#E7E2D9] text-[10px] font-bold uppercase rounded-xs">
                    {prod.status}
                  </span>
                </td>
                <td className="p-3.5">
                  <Link
                    href={`/products/${prod.slug}`}
                    target="_blank"
                    className="text-[#8B1E1E] hover:underline flex items-center space-x-1 text-[11px] font-bold"
                  >
                    <span>View PDP</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Product Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] border border-[#E7E2D9] max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl rounded-sm max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#F0ECE1] pb-3">
              <h3 className="text-xl font-serif font-bold uppercase text-[#1C1917]">
                Launch New Streetwear Garment
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-[#78716C] hover:text-[#1C1917]">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                  Product Title *
                </label>
                <Input
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Royal Haveli Heavyweight Oversized Tee"
                  className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                    Selling Price (₹) *
                  </label>
                  <Input
                    required
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="1499"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                    Compare Price (₹)
                  </label>
                  <Input
                    type="number"
                    value={newComparePrice}
                    onChange={(e) => setNewComparePrice(e.target.value)}
                    placeholder="2299"
                    className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategoryId}
                    onChange={(e) => setNewCategoryId(e.target.value)}
                    className="w-full h-11 bg-[#FFFFFF] border border-[#E7E2D9] px-3 text-[#1C1917] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                    Fit Silhouette *
                  </label>
                  <select
                    value={newFit}
                    onChange={(e) => setNewFit(e.target.value)}
                    className="w-full h-11 bg-[#FFFFFF] border border-[#E7E2D9] px-3 text-[#1C1917] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
                  >
                    <option value="Oversized">Oversized</option>
                    <option value="Relaxed">Relaxed</option>
                    <option value="Baggy">Baggy</option>
                    <option value="Straight">Straight</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                  High-Res Image URL (Unsplash / Cloudinary) *
                </label>
                <Input
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                  Textile Composition (Fabric)
                </label>
                <Input
                  value={newFabric}
                  onChange={(e) => setNewFabric(e.target.value)}
                  placeholder="380 GSM 100% Combed French Terry Cotton"
                  className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#57534E] uppercase mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E7E2D9] p-3 text-[#1C1917] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)} className="text-[#78716C]">
                  Cancel
                </Button>
                <Button type="submit" disabled={creating} className="bg-[#8B1E1E] hover:bg-[#6B1414] text-white font-bold uppercase tracking-wider">
                  {creating ? "Launching Drop..." : "Publish To Live Store"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
