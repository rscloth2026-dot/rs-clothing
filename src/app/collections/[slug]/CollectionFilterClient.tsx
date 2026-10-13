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
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E7E2D9] mb-8">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center space-x-2 border-[#E7E2D9] text-[#1C1917] hover:border-[#8B1E1E] bg-[#FFFFFF]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B1E1E]" />
            <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
          </Button>

          <span className="text-xs font-sans text-[#78716C]">
            Showing <strong className="text-[#1C1917]">{filteredProducts.length}</strong> of {initialProducts.length} silhouettes
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[11px] font-sans uppercase font-semibold text-[#78716C]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#FFFFFF] border border-[#E7E2D9] text-[#1C1917] text-xs px-3 py-1.5 focus:outline-none focus:border-[#C5A059] rounded-sm font-sans"
          >
            <option value="newest">Newest Drops</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Panels */}
      <div className={`space-y-4 mb-8 p-5 bg-[#FFFFFF] border border-[#E7E2D9] rounded-sm shadow-xs ${mobileFilterOpen ? "block" : "hidden sm:block"}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Fit Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-sans font-semibold text-[#78716C] uppercase">Fit:</span>
            {availableFits.map((fit) => (
              <button
                key={fit}
                onClick={() => setSelectedFit(selectedFit === fit ? null : fit)}
                className={`px-3 py-1 text-xs font-sans uppercase rounded-sm border transition-all ${
                  selectedFit === fit
                    ? "bg-[#8B1E1E] border-[#8B1E1E] text-white font-bold shadow-xs"
                    : "border-[#E7E2D9] bg-[#FDFCF7] text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                {fit}
              </button>
            ))}
          </div>

          {/* Size Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-sans font-semibold text-[#78716C] uppercase">Size:</span>
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                className={`min-w-[32px] px-2.5 py-1 text-xs font-sans font-bold uppercase rounded-sm border transition-all ${
                  selectedSize === size
                    ? "bg-[#8B1E1E] border-[#8B1E1E] text-white shadow-xs"
                    : "border-[#E7E2D9] bg-[#FDFCF7] text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-sans font-semibold text-[#78716C] uppercase">Price:</span>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "under-1500" ? null : "under-1500")}
              className={`px-3 py-1 text-xs font-sans rounded-sm border transition-all ${
                selectedPriceRange === "under-1500"
                  ? "bg-[#8B1E1E] border-[#8B1E1E] text-white font-bold shadow-xs"
                  : "border-[#E7E2D9] bg-[#FDFCF7] text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              &lt; ₹1,500
            </button>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "1500-2500" ? null : "1500-2500")}
              className={`px-3 py-1 text-xs font-sans rounded-sm border transition-all ${
                selectedPriceRange === "1500-2500"
                  ? "bg-[#8B1E1E] border-[#8B1E1E] text-white font-bold shadow-xs"
                  : "border-[#E7E2D9] bg-[#FDFCF7] text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              ₹1,500 - ₹2,500
            </button>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "above-2500" ? null : "above-2500")}
              className={`px-3 py-1 text-xs font-sans rounded-sm border transition-all ${
                selectedPriceRange === "above-2500"
                  ? "bg-[#8B1E1E] border-[#8B1E1E] text-white font-bold shadow-xs"
                  : "border-[#E7E2D9] bg-[#FDFCF7] text-[#57534E] hover:text-[#1C1917]"
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
        <div className="py-20 text-center bg-[#FFFFFF] border border-[#E7E2D9] rounded-sm p-8">
          <p className="text-lg font-serif font-bold text-[#1C1917]">No silhouettes match your selected filters</p>
          <p className="text-xs text-[#78716C] font-sans mt-2">
            Try resetting your fit, size, or price filters to browse the collection.
          </p>
          <Button onClick={clearAllFilters} className="mt-4 font-sans bg-[#8B1E1E] text-white hover:bg-[#6B1414] text-xs uppercase font-bold" size="sm">
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
