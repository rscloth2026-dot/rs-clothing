"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";

interface ProductItem {
  id: string;
  title: string;
  slug: string;
  basePrice: number;
  comparePrice?: number | null;
  fit: string;
  isNewDrop?: boolean;
  isBestseller?: boolean;
  category: { name: string };
  images: Array<{ url: string; altText?: string | null; isPrimary: boolean }>;
  variants: Array<{
    id: string;
    sku: string;
    size: string;
    color: string;
    colorHex: string;
    stockQuantity: number;
  }>;
}

export function CollectionFilterClient({
  initialProducts,
  currentCategory,
}: {
  initialProducts: ProductItem[];
  currentCategory: string;
}) {
  const [selectedFit, setSelectedFit] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available unique sizes across these products
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    initialProducts.forEach((p) => {
      p.variants.forEach((v) => sizeSet.add(v.size));
    });
    return Array.from(sizeSet);
  }, [initialProducts]);

  // Available unique fits
  const availableFits = useMemo(() => {
    const fitSet = new Set<string>();
    initialProducts.forEach((p) => fitSet.add(p.fit));
    return Array.from(fitSet);
  }, [initialProducts]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    if (selectedFit) {
      list = list.filter((p) => p.fit === selectedFit);
    }

    if (selectedSize) {
      list = list.filter((p) => p.variants.some((v) => v.size === selectedSize && v.stockQuantity > 0));
    }

    if (selectedPriceRange === "under-1500") {
      list = list.filter((p) => p.basePrice < 1500);
    } else if (selectedPriceRange === "1500-2500") {
      list = list.filter((p) => p.basePrice >= 1500 && p.basePrice <= 2500);
    } else if (selectedPriceRange === "above-2500") {
      list = list.filter((p) => p.basePrice > 2500);
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.basePrice - a.basePrice);
    }

    return list;
  }, [initialProducts, selectedFit, selectedSize, selectedPriceRange, sortBy]);

  const hasActiveFilters = selectedFit || selectedSize || selectedPriceRange;

  const clearAllFilters = () => {
    setSelectedFit(null);
    setSelectedSize(null);
    setSelectedPriceRange(null);
  };

  return (
    <div>
      {/* Control Bar: Filter toggle & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5] mb-8">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center space-x-2 border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A] bg-[#FFFFFF] rounded-none"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0A0A0A]" />
            <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
          </Button>

          <span className="text-xs font-sans text-[#71717A]">
            Showing <strong className="text-[#0A0A0A]">{filteredProducts.length}</strong> of {initialProducts.length} silhouettes
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[11px] font-sans uppercase font-semibold text-[#71717A]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#FFFFFF] border border-[#E5E5E5] text-[#0A0A0A] text-xs px-3 py-1.5 focus:outline-none focus:border-[#0A0A0A] rounded-none font-sans"
          >
            <option value="newest">Newest Drops</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Panels */}
      <div className={`space-y-4 mb-8 p-5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none shadow-xs ${mobileFilterOpen ? "block" : "hidden sm:block"}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Fit Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-sans font-semibold text-[#71717A] uppercase">Fit:</span>
            {availableFits.map((fit) => (
              <button
                key={fit}
                onClick={() => setSelectedFit(selectedFit === fit ? null : fit)}
                className={`px-3 py-1 text-xs font-sans uppercase rounded-none border transition-all ${
                  selectedFit === fit
                    ? "bg-[#0A0A0A] border-[#0A0A0A] text-white font-bold shadow-xs"
                    : "border-[#E5E5E5] bg-[#FAFAFA] text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A]"
                }`}
              >
                {fit}
              </button>
            ))}
          </div>

          {/* Size Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-sans font-semibold text-[#71717A] uppercase">Size:</span>
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                className={`min-w-[32px] px-2.5 py-1 text-xs font-sans font-bold uppercase rounded-none border transition-all ${
                  selectedSize === size
                    ? "bg-[#0A0A0A] border-[#0A0A0A] text-white shadow-xs"
                    : "border-[#E5E5E5] bg-[#FAFAFA] text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-sans font-semibold text-[#71717A] uppercase">Price:</span>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "under-1500" ? null : "under-1500")}
              className={`px-3 py-1 text-xs font-sans rounded-none border transition-all ${
                selectedPriceRange === "under-1500"
                  ? "bg-[#0A0A0A] border-[#0A0A0A] text-white font-bold shadow-xs"
                  : "border-[#E5E5E5] bg-[#FAFAFA] text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A]"
              }`}
            >
              &lt; ₹1,500
            </button>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "1500-2500" ? null : "1500-2500")}
              className={`px-3 py-1 text-xs font-sans rounded-none border transition-all ${
                selectedPriceRange === "1500-2500"
                  ? "bg-[#0A0A0A] border-[#0A0A0A] text-white font-bold shadow-xs"
                  : "border-[#E5E5E5] bg-[#FAFAFA] text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A]"
              }`}
            >
              ₹1,500 - ₹2,500
            </button>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "above-2500" ? null : "above-2500")}
              className={`px-3 py-1 text-xs font-sans rounded-none border transition-all ${
                selectedPriceRange === "above-2500"
                  ? "bg-[#0A0A0A] border-[#0A0A0A] text-white font-bold shadow-xs"
                  : "border-[#E5E5E5] bg-[#FAFAFA] text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A]"
              }`}
            >
              &gt; ₹2,500
            </button>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#8B1E1E] hover:underline flex items-center space-x-1 font-sans font-bold"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#FFFFFF] border border-[#E5E5E5] rounded-none p-8">
          <p className="text-lg font-serif font-bold text-[#0A0A0A]">No silhouettes match your selected filters</p>
          <p className="text-xs text-[#71717A] font-sans mt-2">
            Try resetting your fit, size, or price filters to browse the collection.
          </p>
          <Button onClick={clearAllFilters} className="mt-4 font-sans bg-[#0A0A0A] text-white hover:bg-[#262626] text-xs uppercase font-bold rounded-none" size="sm">
            Clear Active Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              slug={p.slug}
              basePrice={p.basePrice}
              comparePrice={p.comparePrice}
              fit={p.fit}
              categoryName={p.category.name}
              isNewDrop={p.isNewDrop}
              isBestseller={p.isBestseller}
              images={p.images}
              variants={p.variants}
            />
          ))}
        </div>
      )}
    </div>
  );
}
