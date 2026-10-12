"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit2, Check, RefreshCw, Shirt, Search, ExternalLink, Trash2 } from "lucide-react";
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
  const [newPrice, setNewPrice] = useState("1599");
  const [newComparePrice, setNewComparePrice] = useState("2399");
  const [newCategoryId, setNewCategoryId] = useState(categories[0]?.id || "");
  const [newFit, setNewFit] = useState("Oversized");
  const [newDesc, setNewDesc] = useState("Heavyweight drop-shoulder tee crafted from 240 GSM combed cotton.");
  const [newFabric, setNewFabric] = useState("240 GSM 100% Combed Cotton, Silicon softened");
  const [newImageUrl, setNewImageUrl] = useState("https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000");
  const [creating, setCreating] = useState(false);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.fit.toLowerCase().includes(search.toLowerCase()) ||
      p.category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStock = async (variantId: string, quantity: number) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantStock: { variantId, quantity },
        }),
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
      console.error("Failed to update stock", err);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          basePrice: newPrice,
          comparePrice: newComparePrice,
          categoryId: newCategoryId,
          fit: newFit,
          description: newDesc,
          fabricDetails: newFabric,
          imageUrl: newImageUrl,
        }),
      });

      const data = await res.json();
      if (res.ok && data.product) {
        const cat = categories.find((c) => c.id === newCategoryId) || { name: newFit };
        setProducts([
          { ...data.product, category: cat },
          ...products,
        ]);
        setIsCreateOpen(false);
        setNewTitle("");
      }
    } catch (err) {
      console.error("Create product failed", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
            CATALOG MANAGEMENT
          </span>
          <h1 className="text-3xl font-black uppercase text-white font-editorial tracking-tight">
            PRODUCTS & INVENTORY
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Control live styles, adjust variant inventory, and launch new drops.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center space-x-2 font-black text-xs"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Launch New Garment Drop</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 bg-onyx-900 border border-border p-2">
        <Search className="w-4 h-4 text-muted-foreground ml-2" />
        <input
          type="text"
          placeholder="Filter products by title, category, or fit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-xs text-white placeholder:text-muted-foreground focus:outline-none px-2"
        />
      </div>

      {/* Products Table */}
      <div className="bg-onyx-900 border border-border overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse font-mono">
          <thead>
            <tr className="bg-onyx-800 text-muted-foreground border-b border-border">
              <th className="p-3">IMAGE</th>
              <th className="p-3">PRODUCT TITLE</th>
              <th className="p-3">CATEGORY & FIT</th>
              <th className="p-3">PRICE (INR)</th>
              <th className="p-3">VARIANT INVENTORY</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-white">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-onyx-800/40 transition-colors">
                <td className="p-3">
                  <div className="relative w-12 h-16 bg-onyx-800 overflow-hidden border border-border">
                    <Image
                      src={prod.images[0]?.url || "/placeholder.jpg"}
                      alt={prod.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                </td>
                <td className="p-3">
                  <span className="font-bold block text-white">{prod.title}</span>
                  <span className="text-[10px] text-muted-foreground">Slug: {prod.slug}</span>
                </td>
                <td className="p-3">
                  <span className="block text-volt font-bold">{prod.category?.name || "Streetwear"}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{prod.fit} FIT</span>
                </td>
                <td className="p-3 font-bold tabular-nums">
                  <span className="text-volt">{formatPrice(prod.basePrice)}</span>
                  {prod.comparePrice && (
                    <span className="text-[10px] text-muted-foreground line-through block">
                      {formatPrice(prod.comparePrice)}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {prod.variants.map((v: any) => (
                      <div
                        key={v.id}
                        className={`px-1.5 py-0.5 border text-[10px] flex items-center space-x-1 ${
                          v.stockQuantity <= 5
                            ? "border-amber-400 bg-amber-400/10 text-amber-300"
                            : "border-border bg-onyx-950 text-muted-foreground"
                        }`}
                      >
                        <span className="font-bold text-white">{v.size}:</span>
                        {editingStockId === v.id ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              className="w-10 bg-onyx-800 border border-volt text-white px-1 text-[10px]"
                              value={newStockVal}
                              onChange={(e) => setNewStockVal(e.target.value)}
                              autoFocus
                            />
                            <button
                              onClick={() => handleUpdateStock(v.id, parseInt(newStockVal))}
                              className="text-volt hover:text-white"
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
                            className="cursor-pointer hover:underline text-white font-mono"
                            title="Click to edit stock"
                          >
                            {v.stockQuantity}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-volt/20 text-volt border border-volt/40 text-[10px] font-bold uppercase">
                    {prod.status}
                  </span>
                </td>
                <td className="p-3">
                  <Link
                    href={`/products/${prod.slug}`}
                    target="_blank"
                    className="text-volt hover:underline flex items-center space-x-1 text-[11px]"
                  >
                    <span>View PDP</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Product Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-onyx-900 border border-border max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-xl font-black uppercase text-white font-editorial">
                LAUNCH NEW STREETWEAR GARMENT
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-muted-foreground hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                  Product Title *
                </label>
                <Input
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Acid Skull Heavyweight Oversized Tee"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Selling Price (₹) *
                  </label>
                  <Input
                    required
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="1499"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Compare Price (₹)
                  </label>
                  <Input
                    type="number"
                    value={newComparePrice}
                    onChange={(e) => setNewComparePrice(e.target.value)}
                    placeholder="2299"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategoryId}
                    onChange={(e) => setNewCategoryId(e.target.value)}
                    className="w-full h-11 bg-onyx-800 border border-border px-3 text-white focus:outline-none focus:border-volt"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                    Fit Silhouette *
                  </label>
                  <select
                    value={newFit}
                    onChange={(e) => setNewFit(e.target.value)}
                    className="w-full h-11 bg-onyx-800 border border-border px-3 text-white focus:outline-none focus:border-volt"
                  >
                    <option value="Oversized">Oversized</option>
                    <option value="Relaxed">Relaxed</option>
                    <option value="Baggy">Baggy</option>
                    <option value="Straight">Straight</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                  High-Res Image URL (Unsplash / Cloudinary) *
                </label>
                <Input
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                  Textile Composition (Fabric)
                </label>
                <Input
                  value={newFabric}
                  onChange={(e) => setNewFabric(e.target.value)}
                  placeholder="240 GSM 100% Combed French Terry Cotton"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-onyx-800 border border-border p-3 text-white focus:outline-none focus:border-volt"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={creating} className="font-black">
                  {creating ? "Launching Drop..." : "Publish To Live Website"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
