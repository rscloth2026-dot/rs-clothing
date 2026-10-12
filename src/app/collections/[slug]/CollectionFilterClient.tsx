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
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border mb-8">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-volt" />
            <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
          </Button>

          <span className="text-xs font-mono text-muted-foreground">
            Showing <strong className="text-white">{filteredProducts.length}</strong> of {initialProducts.length} styles
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[11px] font-mono uppercase text-muted-foreground">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-onyx-900 border border-border text-white text-xs px-2.5 py-1.5 focus:outline-none focus:border-volt"
          >
            <option value="newest">Newest Drops</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Panels (Desktop always visible / collapsible on mobile) */}
      <div className={`space-y-4 mb-8 p-5 bg-onyx-900 border border-border ${mobileFilterOpen ? "block" : "hidden sm:block"}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Fit Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-muted-foreground uppercase">Fit:</span>
            {availableFits.map((fit) => (
              <button
                key={fit}
                onClick={() => setSelectedFit(selectedFit === fit ? null : fit)}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider border transition-colors ${
                  selectedFit === fit
                    ? "bg-volt border-volt text-black"
                    : "border-border bg-onyx-800 text-muted-foreground hover:text-white"
                }`}
              >
                {fit}
              </button>
            ))}
          </div>

          {/* Size Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-muted-foreground uppercase">Size:</span>
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border transition-colors ${
                  selectedSize === size
                    ? "bg-volt border-volt text-black"
                    : "border-border bg-onyx-800 text-muted-foreground hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-muted-foreground uppercase">Price:</span>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "under-1500" ? null : "under-1500")}
              className={`px-3 py-1 text-xs font-bold uppercase border transition-colors ${
                selectedPriceRange === "under-1500"
                  ? "bg-volt border-volt text-black"
                  : "border-border bg-onyx-800 text-muted-foreground hover:text-white"
              }`}
            >
              Under ₹1,500
            </button>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "1500-2500" ? null : "1500-2500")}
              className={`px-3 py-1 text-xs font-bold uppercase border transition-colors ${
                selectedPriceRange === "1500-2500"
                  ? "bg-volt border-volt text-black"
                  : "border-border bg-onyx-800 text-muted-foreground hover:text-white"
              }`}
            >
              ₹1,500 - ₹2,500
            </button>
            <button
              onClick={() => setSelectedPriceRange(selectedPriceRange === "above-2500" ? null : "above-2500")}
              className={`px-3 py-1 text-xs font-bold uppercase border transition-colors ${
                selectedPriceRange === "above-2500"
                  ? "bg-volt border-volt text-black"
                  : "border-border bg-onyx-800 text-muted-foreground hover:text-white"
              }`}
            >
              Above ₹2,500
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center space-x-2 pt-3 border-t border-border/60 text-xs">
            <span className="text-muted-foreground">Active:</span>
            {selectedFit && (
              <span className="inline-flex items-center bg-onyx-800 px-2 py-0.5 border border-border text-volt">
                Fit: {selectedFit}
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedFit(null)} />
              </span>
            )}
            {selectedSize && (
              <span className="inline-flex items-center bg-onyx-800 px-2 py-0.5 border border-border text-volt font-mono">
                Size: {selectedSize}
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedSize(null)} />
              </span>
            )}
            {selectedPriceRange && (
              <span className="inline-flex items-center bg-onyx-800 px-2 py-0.5 border border-border text-volt">
                Price: {selectedPriceRange}
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedPriceRange(null)} />
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-muted-foreground hover:text-white underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center border border-border bg-onyx-900 p-8 space-y-3">
          <p className="text-base font-bold uppercase text-white">No products found matching filters</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Try removing some filter criteria or browse all silhouettes.
          </p>
          <Button variant="secondary" onClick={clearAllFilters} className="mt-4">
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              slug={product.slug}
              basePrice={product.basePrice}
              comparePrice={product.comparePrice}
              fit={product.fit}
              categoryName={product.category.name}
              isNewDrop={product.isNewDrop}
              isBestseller={product.isBestseller}
              images={product.images}
              variants={product.variants}
            />
          ))}
        </div>
      )}
    </div>
  );
}
