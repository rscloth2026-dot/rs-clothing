"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Sliders,
  Move,
  Eye,
  Info,
  Layers,
  ArrowRight,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FloatingGarmentItem } from "@/components/home/FloatingGarment";

interface ProductOption {
  id: string;
  title: string;
  slug: string;
  basePrice: number;
  comparePrice?: number | null;
  categoryName: string;
  imageUrl: string;
}

const DEFAULT_GARMENTS: FloatingGarmentItem[] = [
  {
    id: "float-hoodie",
    name: "Marwar Heavyweight Zip Hoodie",
    imageUrl: "/images/hero/hoodie-heavyweight.png",
    price: 3499,
    comparePrice: 4999,
    category: "Hoodies & Outerwear",
    productId: "marwar-heavyweight-zip-hoodie",
    initialX: 74,
    initialY: 10,
    mobileX: 68,
    mobileY: 8,
    sizeDesktop: 195,
    sizeMobile: 90,
    speedSeconds: 7.2,
    maxRotationDeg: 4,
    driftX: 20,
    driftY: 26,
    delaySeconds: 0,
    zIndex: 15,
    isEnabled: true,
  },
  {
    id: "float-jacket",
    name: "Rajputana Cyber Bomber Jacket",
    imageUrl: "/images/hero/jacket-cyber-bomber.png",
    price: 4999,
    comparePrice: 6999,
    category: "Hoodies & Outerwear",
    productId: "rajputana-cyber-bomber-jacket",
    initialX: 50,
    initialY: 12,
    mobileX: 38,
    mobileY: 6,
    sizeDesktop: 190,
    sizeMobile: 80,
    speedSeconds: 9.1,
    maxRotationDeg: -3,
    driftX: 18,
    driftY: 22,
    delaySeconds: 0.4,
    zIndex: 14,
    isEnabled: true,
  },
  {
    id: "float-sneakers",
    name: "Jodhpur Chunky Runner Sneakers",
    imageUrl: "/images/hero/sneakers-chunky-runner.png",
    price: 5499,
    comparePrice: 7999,
    category: "Footwear & Accessories",
    productId: "jodhpur-chunky-runner-sneakers",
    initialX: 82,
    initialY: 40,
    mobileX: 74,
    mobileY: 36,
    sizeDesktop: 175,
    sizeMobile: 85,
    speedSeconds: 8.4,
    maxRotationDeg: -5,
    driftX: 22,
    driftY: 28,
    delaySeconds: 0.8,
    zIndex: 16,
    isEnabled: true,
  },
  {
    id: "float-tee",
    name: "Acid Cyber Heavyweight Tee",
    imageUrl: "/images/hero/tshirt-oversized.png",
    price: 1499,
    comparePrice: 2199,
    category: "Oversized Tees",
    productId: "acid-cyber-oversized-heavyweight-tee",
    initialX: 68,
    initialY: 66,
    mobileX: 64,
    mobileY: 72,
    sizeDesktop: 165,
    sizeMobile: 80,
    speedSeconds: 6.8,
    maxRotationDeg: -4,
    driftX: 16,
    driftY: 20,
    delaySeconds: 1.2,
    zIndex: 17,
    isEnabled: true,
  },
  {
    id: "float-jeans",
    name: "Tokyo Skate Baggy Puddle Jeans",
    imageUrl: "/images/hero/jeans-baggy-puddle.png",
    price: 2799,
    comparePrice: 3899,
    category: "Baggy Jeans",
    productId: "tokyo-skate-90s-baggy-puddle-jeans",
    initialX: 8,
    initialY: 8,
    mobileX: 4,
    mobileY: 6,
    sizeDesktop: 155,
    sizeMobile: 75,
    speedSeconds: 7.9,
    maxRotationDeg: 5,
    driftX: 19,
    driftY: 24,
    delaySeconds: 0.6,
    zIndex: 12,
    isEnabled: true,
  },
  {
    id: "float-cap",
    name: "Royal RS Monogram Cap",
    imageUrl: "/images/hero/cap-royal-rajputana.png",
    price: 1299,
    comparePrice: 1999,
    category: "Footwear & Accessories",
    productId: "royal-rs-monogram-streetwear-cap",
    initialX: 36,
    initialY: 30,
    mobileX: 8,
    mobileY: 34,
    sizeDesktop: 140,
    sizeMobile: 70,
    speedSeconds: 6.4,
    maxRotationDeg: -6,
    driftX: 15,
    driftY: 18,
    delaySeconds: 1.5,
    zIndex: 13,
    isEnabled: true,
  },
];

export function HeroManagerClient({
  initialGarments,
  availableProducts,
}: {
  initialGarments: FloatingGarmentItem[] | null;
  availableProducts: ProductOption[];
}) {
  const [garments, setGarments] = useState<FloatingGarmentItem[]>(
    initialGarments && initialGarments.length > 0 ? initialGarments : DEFAULT_GARMENTS
  );
  const [selectedId, setSelectedId] = useState<string>(
    garments[0]?.id || "float-hoodie"
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  const currentGarment = garments.find((g) => g.id === selectedId) || garments[0];

  // Update specific field for currently selected garment
  const updateCurrentField = (field: keyof FloatingGarmentItem, val: any) => {
    setGarments((prev) =>
      prev.map((g) => (g.id === selectedId ? { ...g, [field]: val } : g))
    );
  };

  // Connect garment to selected store product
  const handleProductSelect = (productSlug: string) => {
    const selectedProd = availableProducts.find((p) => p.slug === productSlug);
    if (!selectedProd) return;

    setGarments((prev) =>
      prev.map((g) => {
        if (g.id === selectedId) {
          return {
            ...g,
            productId: selectedProd.slug,
            name: selectedProd.title,
            price: selectedProd.basePrice,
            comparePrice: selectedProd.comparePrice,
            category: selectedProd.categoryName,
          };
        }
        return g;
      })
    );
  };

  // Handle PNG image file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        updateCurrentField("imageUrl", data.url);
      } else {
        alert(data.error || "Failed to upload PNG image.");
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Error uploading image file.");
    } finally {
      setUploading(false);
    }
  };

  // Add a new garment item
  const handleAddNew = () => {
    const newId = `float-${Date.now()}`;
    const defaultProd = availableProducts[0];
    const newGarment: FloatingGarmentItem = {
      id: newId,
      name: defaultProd ? defaultProd.title : "New Streetwear Item",
      imageUrl: "/images/hero/tshirt-oversized.png",
      price: defaultProd ? defaultProd.basePrice : 1999,
      comparePrice: defaultProd ? defaultProd.comparePrice : 2999,
      category: defaultProd ? defaultProd.categoryName : "Oversized Tees",
      productId: defaultProd ? defaultProd.slug : "acid-cyber-oversized-heavyweight-tee",
      initialX: 45,
      initialY: 25,
      mobileX: 40,
      mobileY: 20,
      sizeDesktop: 160,
      sizeMobile: 80,
      speedSeconds: 7.5,
      maxRotationDeg: 4,
      driftX: 18,
      driftY: 22,
      zIndex: 15,
      isEnabled: true,
    };

    setGarments([...garments, newGarment]);
    setSelectedId(newId);
  };

  // Delete garment item
  const handleDelete = (id: string) => {
    if (garments.length <= 1) {
      alert("At least one floating garment is required.");
      return;
    }
    const filtered = garments.filter((g) => g.id !== id);
    setGarments(filtered);
    setSelectedId(filtered[0]?.id || "");
  };

  // Reset to default configuration
  const handleResetDefaults = () => {
    if (confirm("Reset floating clothes configuration to Royal Atelier defaults?")) {
      setGarments(DEFAULT_GARMENTS);
      setSelectedId(DEFAULT_GARMENTS[0].id);
    }
  };

  // Save changes to database
  const handleSaveToDatabase = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ garments }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save hero configuration.");
      }
    } catch (err) {
      console.error("Save error", err);
      alert("Error saving hero configuration.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Page Title & Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E5E5] gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono text-[#1E40AF] uppercase tracking-widest font-bold bg-[#1E40AF]/10 px-2 py-0.5 border border-[#1E40AF]/20">
              HERO ANIMATION ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A0A0A] uppercase tracking-tight">
            Floating Clothes Management
          </h1>
          <p className="text-xs text-[#71717A] mt-1 max-w-xl">
            Upload transparent PNGs, connect garments to store products, configure non-circular floating trajectories, and publish updates live without code changes.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleResetDefaults}
            className="text-xs font-bold uppercase tracking-wider h-11 border-[#E5E5E5] hover:border-[#1E40AF] rounded-none shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            <span>Reset Defaults</span>
          </Button>

          <Button
            onClick={handleSaveToDatabase}
            disabled={saving}
            className="text-xs font-bold uppercase tracking-wider h-11 px-6 bg-[#0A0A0A] hover:bg-[#1E40AF] text-white rounded-none shadow-sm transition-all"
          >
            {saving ? (
              <span>Publishing...</span>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-[#FBBF24]" />
                <span>Live on Storefront!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1.5 text-[#FBBF24]" />
                <span>Publish to Live Hero</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Grid: Garments List (Left) & Configuration / Live Canvas (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Garments Selector List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-[#0A0A0A] flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#1E40AF]" />
              <span>Floating Garments ({garments.length})</span>
            </h2>
            <Button
              size="sm"
              onClick={handleAddNew}
              className="h-8 text-[11px] font-bold uppercase tracking-wider bg-white border border-[#E5E5E5] text-[#0A0A0A] hover:border-[#1E40AF] hover:text-[#1E40AF] rounded-none shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Add Item</span>
            </Button>
          </div>

          <div className="space-y-2">
            {garments.map((g) => {
              const isSelected = g.id === selectedId;
              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedId(g.id)}
                  className={`p-3 border rounded-none cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-white border-[#1E40AF] ring-1 ring-[#1E40AF] shadow-xs"
                      : "bg-[#FAFAFA] border-[#E5E5E5] hover:border-[#A1A1AA] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 bg-white border border-[#E5E5E5] rounded-none shrink-0 flex items-center justify-center p-1 overflow-hidden">
                      <Image
                        src={g.imageUrl}
                        alt={g.name}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-[#0A0A0A] line-clamp-1">
                          {g.name}
                        </span>
                        {g.isEnabled === false && (
                          <span className="text-[9px] bg-[#F4F4F5] text-[#71717A] px-1 py-0.2 border border-[#E5E5E5] uppercase font-bold">
                            Disabled
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-[#71717A] mt-0.5">
                        <span className="font-mono font-bold text-[#1E40AF]">
                          {formatPrice(g.price)}
                        </span>
                        <span>•</span>
                        <span>{g.category || "Atelier"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(g.id);
                    }}
                    className="p-1.5 text-[#A1A1AA] hover:text-[#991B1B] hover:bg-[#FEF2F2] transition-colors"
                    aria-label={`Delete ${g.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-white border border-[#E5E5E5] text-[11px] text-[#71717A] space-y-1.5 leading-relaxed">
            <div className="flex items-center space-x-1.5 text-[#0A0A0A] font-bold">
              <Info className="w-3.5 h-3.5 text-[#1E40AF]" />
              <span>Organic Non-Circular Floating Rules</span>
            </div>
            <p>
              Each garment floats along its own independent Lissajous trajectory with varied speeds and tilt angles.
              Position them around the edges to leave the central headline unblocked.
            </p>
          </div>
        </div>

        {/* Right Column: Garment Inspector & Live Preview */}
        <div className="lg:col-span-8 space-y-6">
          {currentGarment && (
            <div className="bg-white border border-[#E5E5E5] p-6 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <div className="flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-[#1E40AF]" />
                  <span className="text-xs font-bold font-sans uppercase tracking-widest text-[#0A0A0A]">
                    Inspecting: {currentGarment.name}
                  </span>
                </div>

                {/* Enable/Disable Toggle */}
                <label className="flex items-center space-x-2 text-xs font-bold uppercase cursor-pointer">
                  <span className={currentGarment.isEnabled !== false ? "text-[#1E40AF]" : "text-[#71717A]"}>
                    {currentGarment.isEnabled !== false ? "Enabled on Hero" : "Hidden"}
                  </span>
                  <input
                    type="checkbox"
                    checked={currentGarment.isEnabled !== false}
                    onChange={(e) => updateCurrentField("isEnabled", e.target.checked)}
                    className="w-4 h-4 accent-[#1E40AF] cursor-pointer"
                  />
                </label>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Transparent PNG Image Uploader */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                    Transparent PNG Image:
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-24 h-24 bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center p-2 shrink-0">
                      <Image
                        src={currentGarment.imageUrl}
                        alt="Garment Preview"
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="inline-flex items-center justify-center space-x-2 px-3 py-2 bg-[#FAFAFA] border border-[#E5E5E5] hover:border-[#1E40AF] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider cursor-pointer w-full shadow-xs">
                        <Upload className="w-3.5 h-3.5 text-[#1E40AF]" />
                        <span>{uploading ? "Uploading..." : "Upload Transparent PNG"}</span>
                        <input
                          type="file"
                          accept="image/png,image/webp"
                          className="hidden"
                          onChange={handleFileUpload}
                          disabled={uploading}
                        />
                      </label>
                      <Input
                        type="text"
                        value={currentGarment.imageUrl}
                        onChange={(e) => updateCurrentField("imageUrl", e.target.value)}
                        placeholder="/images/hero/my-garment.png"
                        className="text-xs font-mono h-8 rounded-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Linked Product Dropdown */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                    Link to Store Product:
                  </label>
                  <select
                    value={currentGarment.productId}
                    onChange={(e) => handleProductSelect(e.target.value)}
                    className="w-full h-11 px-3 bg-[#FAFAFA] border border-[#E5E5E5] text-xs font-sans font-medium text-[#0A0A0A] focus:border-[#1E40AF] rounded-none outline-none"
                  >
                    {availableProducts.map((p) => (
                      <option key={p.id} value={p.slug}>
                        {p.title} ({formatPrice(p.basePrice)}) — {p.categoryName}
                      </option>
                    ))}
                  </select>

                  <div className="pt-1">
                    <Link
                      href={`/products/${currentGarment.productId}`}
                      target="_blank"
                      className="text-[11px] font-sans text-[#1E40AF] hover:underline flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Live Product Page ({currentGarment.productId})</span>
                    </Link>
                  </div>
                </div>

                {/* 3. Positioning Sliders */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-[#0A0A0A] uppercase">Desktop Position X (%)</span>
                    <span className="font-mono text-[#1E40AF] font-bold">{currentGarment.initialX}%</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="88"
                    value={currentGarment.initialX}
                    onChange={(e) => updateCurrentField("initialX", Number(e.target.value))}
                    className="w-full accent-[#1E40AF] cursor-pointer"
                  />

                  <div className="flex justify-between text-xs pt-1">
                    <span className="font-bold text-[#0A0A0A] uppercase">Desktop Position Y (%)</span>
                    <span className="font-mono text-[#1E40AF] font-bold">{currentGarment.initialY}%</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="80"
                    value={currentGarment.initialY}
                    onChange={(e) => updateCurrentField("initialY", Number(e.target.value))}
                    className="w-full accent-[#1E40AF] cursor-pointer"
                  />
                </div>

                {/* 4. Mobile Positioning */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-[#0A0A0A] uppercase">Mobile Position X (%)</span>
                    <span className="font-mono text-[#1E40AF] font-bold">{currentGarment.mobileX ?? currentGarment.initialX}%</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="80"
                    value={currentGarment.mobileX ?? currentGarment.initialX}
                    onChange={(e) => updateCurrentField("mobileX", Number(e.target.value))}
                    className="w-full accent-[#1E40AF] cursor-pointer"
                  />

                  <div className="flex justify-between text-xs pt-1">
                    <span className="font-bold text-[#0A0A0A] uppercase">Mobile Position Y (%)</span>
                    <span className="font-mono text-[#1E40AF] font-bold">{currentGarment.mobileY ?? currentGarment.initialY}%</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="78"
                    value={currentGarment.mobileY ?? currentGarment.initialY}
                    onChange={(e) => updateCurrentField("mobileY", Number(e.target.value))}
                    className="w-full accent-[#1E40AF] cursor-pointer"
                  />
                </div>

                {/* 5. Scale & Sizing */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-[#0A0A0A] uppercase">Desktop Size (px)</span>
                    <span className="font-mono text-[#1E40AF] font-bold">{currentGarment.sizeDesktop}px</span>
                  </div>
                  <input
                    type="range"
                    min="90"
                    max="260"
                    value={currentGarment.sizeDesktop}
                    onChange={(e) => updateCurrentField("sizeDesktop", Number(e.target.value))}
                    className="w-full accent-[#1E40AF] cursor-pointer"
                  />

                  <div className="flex justify-between text-xs pt-1">
                    <span className="font-bold text-[#0A0A0A] uppercase">Mobile Size (px)</span>
                    <span className="font-mono text-[#1E40AF] font-bold">{currentGarment.sizeMobile}px</span>
                  </div>
                  <input
                    type="range"
                    min="55"
                    max="130"
                    value={currentGarment.sizeMobile}
                    onChange={(e) => updateCurrentField("sizeMobile", Number(e.target.value))}
                    className="w-full accent-[#1E40AF] cursor-pointer"
                  />
                </div>

                {/* 6. Motion & Physics */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-[#0A0A0A] uppercase">Cycle Speed (Seconds)</span>
                    <span className="font-mono text-[#1E40AF] font-bold">{currentGarment.speedSeconds}s</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    step="0.2"
                    value={currentGarment.speedSeconds}
                    onChange={(e) => updateCurrentField("speedSeconds", Number(e.target.value))}
                    className="w-full accent-[#1E40AF] cursor-pointer"
                  />

                  <div className="flex justify-between text-xs pt-1">
                    <span className="font-bold text-[#0A0A0A] uppercase">Rotation Tilt (Deg)</span>
                    <span className="font-mono text-[#1E40AF] font-bold">{currentGarment.maxRotationDeg}°</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={currentGarment.maxRotationDeg}
                    onChange={(e) => updateCurrentField("maxRotationDeg", Number(e.target.value))}
                    className="w-full accent-[#1E40AF] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Live Mini Preview Canvas */}
          <div className="bg-white border border-[#E5E5E5] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-[#1E40AF]" />
                <span className="text-xs font-bold font-sans uppercase tracking-widest text-[#0A0A0A]">
                  Real-time Floating Canvas Preview
                </span>
              </div>
              <div className="flex items-center space-x-1 bg-[#FAFAFA] border border-[#E5E5E5] p-0.5">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  className={`px-3 py-1 text-[10px] font-bold uppercase transition-all ${
                    previewMode === "desktop"
                      ? "bg-[#0A0A0A] text-white shadow-xs"
                      : "text-[#71717A] hover:text-[#0A0A0A]"
                  }`}
                >
                  Desktop View
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`px-3 py-1 text-[10px] font-bold uppercase transition-all ${
                    previewMode === "mobile"
                      ? "bg-[#0A0A0A] text-white shadow-xs"
                      : "text-[#71717A] hover:text-[#0A0A0A]"
                  }`}
                >
                  Mobile (390px)
                </button>
              </div>
            </div>

            {/* Simulated Hero Stage */}
            <div
              className={`relative bg-[#FAFAFA] border border-[#E5E5E5] overflow-hidden mx-auto transition-all ${
                previewMode === "desktop"
                  ? "w-full h-80 sm:h-96"
                  : "w-72 h-[380px] border-2 border-[#0A0A0A]"
              }`}
            >
              {/* Center Watermark & Headline Representation */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-0 select-none opacity-40">
                <span className="text-[9px] font-mono text-[#1E40AF] uppercase tracking-widest">
                  ROYAL ATELIER // RUNWAY
                </span>
                <span className="font-serif font-bold text-2xl uppercase tracking-tight text-[#0A0A0A]">
                  RAJPUTANA STREETWEAR
                </span>
                <span className="text-[10px] font-sans text-[#71717A] mt-1">
                  Safe headline zone — verify no floating garment overlaps text
                </span>
              </div>

              {/* Floating Items Rendered in Preview */}
              {garments
                .filter((g) => g.isEnabled !== false)
                .map((g) => {
                  const posX = previewMode === "mobile" && g.mobileX !== undefined ? g.mobileX : g.initialX;
                  const posY = previewMode === "mobile" && g.mobileY !== undefined ? g.mobileY : g.initialY;
                  const size = previewMode === "mobile" ? g.sizeMobile * 0.75 : g.sizeDesktop * 0.65;
                  const isSelected = g.id === selectedId;

                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelectedId(g.id)}
                      style={{
                        position: "absolute",
                        left: `${posX}%`,
                        top: `${posY}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `rotate(${g.maxRotationDeg}deg)`,
                      }}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? "ring-2 ring-[#1E40AF] filter drop-shadow-[0_8px_16px_rgba(30,64,175,0.3)]"
                          : "filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.12)]"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={g.imageUrl}
                          alt={g.name}
                          fill
                          className="object-contain"
                          sizes="60px"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
