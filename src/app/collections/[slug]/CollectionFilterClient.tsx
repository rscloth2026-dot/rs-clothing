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
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1E3A5F]/70 mb-8">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center space-x-2 border-[#1E3A5F] text-[#F8FAFC] hover:border-[#C5A059] bg-[#0B172C]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
          </Button>

          <span className="text-xs font-sans text-[#94A3B8]">
            Showing <strong className="text-[#F8FAFC]">{filteredProducts.length}</strong> of {initialProducts.length} silhouettes
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[11px] font-sans uppercase font-semibold text-[#94A3B8]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0B172C] border border-[#1E3A5F] text-[#F8FAFC] text-xs px-3 py-1.5 focus:outline-none focus:border-[#C5A059] rounded-sm font-sans"
          >
            <option value="newest" className="bg-[#0B172C] text-[#F8FAFC]">Newest Drops</option>
            <option value="price-asc" className="bg-[#0B172C] text-[#F8FAFC]">Price: Low to High</option>
            <option value="price-desc" className="bg-[#0B172C] text-[#F8FAFC]">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Panels */}
      <div className={`space-y-4 mb-8 p-5 bg-[#0B172C]/85 backdrop-blur-md border border-[#1E3A5F] rounded-sm shadow-xs ${mobileFilterOpen ? "block" : "hidden sm:block"}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Fit Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-sans font-semibold text-[#94A3B8] uppercase">Fit:</span>
            {availableFits.map((fit) => (
              <button
                key={fit}
                onClick={() => setSelectedFit(selectedFit === fit ? null : fit)}
                className={`px-3 py-1 text-xs font-sans uppercase rounded-sm border transition-all ${
                  selectedFit === fit
                    ? "bg-[#8B1E1E] border-[#C5A059]/60 text-white font-bold shadow-xs"
                    : "border-[#1E3A5F] bg-[#0F1D36] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#C5A059]"
                }`}
              >
                {fit}
              </button>
            ))}
          </div>

          {/* Size Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-sans font-semibold text-[#94A3B8] uppercase">Size:</span>
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                className={`min-w-[32px] px-2.5 py-1 text-xs font-sans font-bold uppercase rounded-sm border transition-all ${
                  selectedSize === size
                    ? "bg-[#8B1E1E] border-[#C5A059]/60 text-white shadow-xs"
                    : "border-[#1E3A5F] bg-[#0F1D36] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#C5A059]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-sans font-semibold text-[#94A3B8] uppercase">Price:</span>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "under-1500" ? null : "under-1500")}
              className={`px-3 py-1 text-xs font-sans rounded-sm border transition-all ${
                selectedPriceRange === "under-1500"
                  ? "bg-[#8B1E1E] border-[#C5A059]/60 text-white font-bold shadow-xs"
                  : "border-[#1E3A5F] bg-[#0F1D36] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#C5A059]"
              }`}
            >
              &lt; ₹1,500
            </button>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "1500-2500" ? null : "1500-2500")}
              className={`px-3 py-1 text-xs font-sans rounded-sm border transition-all ${
                selectedPriceRange === "1500-2500"
                  ? "bg-[#8B1E1E] border-[#C5A059]/60 text-white font-bold shadow-xs"
                  : "border-[#1E3A5F] bg-[#0F1D36] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#C5A059]"
              }`}
            >
              ₹1,500 - ₹2,500
            </button>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "above-2500" ? null : "above-2500")}
              className={`px-3 py-1 text-xs font-sans rounded-sm border transition-all ${
                selectedPriceRange === "above-2500"
                  ? "bg-[#8B1E1E] border-[#C5A059]/60 text-white font-bold shadow-xs"
                  : "border-[#1E3A5F] bg-[#0F1D36] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#C5A059]"
              }`}
            >
              &gt; ₹2,500
            </button>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#C5A059] hover:underline flex items-center space-x-1 font-sans font-bold"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#0B172C]/85 backdrop-blur-md border border-[#1E3A5F] rounded-sm p-8">
          <p className="text-lg font-serif font-bold text-[#F8FAFC]">No silhouettes match your selected filters</p>
          <p className="text-xs text-[#94A3B8] font-sans mt-2">
            Try resetting your fit, size, or price filters to browse the collection.
          </p>
          <Button onClick={clearAllFilters} className="mt-4 font-sans bg-[#8B1E1E] text-white hover:bg-[#A12424] text-xs uppercase font-bold border border-[#C5A059]/40" size="sm">
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
