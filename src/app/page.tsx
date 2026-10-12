import React from "react";
import Link from "next/link";
import { ArrowRight, Star, Flame, Sparkles, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/db";
import { HeroCampaign } from "@/components/home/HeroCampaign";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ShopTheLook } from "@/components/home/ShopTheLook";
import { BrandStory } from "@/components/home/BrandStory";
import { ProductCard } from "@/components/product/ProductCard";

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  // Fetch real database records
  const [categories, newDrops, bestsellers, allProducts, reviews] = await Promise.all([
    prisma.category.findMany({
      orderBy: { displayOrder: "asc" },
    }),
    prisma.product.findMany({
      where: { status: "PUBLISHED", isNewDrop: true },
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        variants: true,
        category: true,
      },
      take: 4,
    }),
    prisma.product.findMany({
      where: { status: "PUBLISHED", isBestseller: true },
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        variants: true,
        category: true,
      },
      take: 4,
    }),
    prisma.product.findMany({
      where: { status: "PUBLISHED" },
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        variants: true,
        category: true,
      },
      take: 8,
    }),
    prisma.review.findMany({
      where: { isApproved: true },
      include: { product: true },
      take: 3,
    }),
  ]);

  // Formatted data for Shop the Look
  const lookProducts = allProducts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    basePrice: p.basePrice,
    imageUrl: p.images[0]?.url || "/placeholder.jpg",
    category: p.category.name,
    fit: p.fit,
    variants: p.variants.map((v) => ({
      id: v.id,
      size: v.size,
      color: v.color,
      stockQuantity: v.stockQuantity,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-onyx-950">
      {/* 1. Hero Campaign Section */}
      <HeroCampaign />

      {/* 2. Shop by Category (Silhouettes) */}
      <CategoryGrid
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description || "",
          imageUrl: c.imageUrl || "/placeholder.jpg",
        }))}
      />

      {/* 3. New Drops Product Grid */}
      <section className="py-20 bg-onyx-950 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF4D00] mb-2">
                <Flame className="w-3.5 h-3.5 fill-[#FF4D00]" />
                <span>FRESH DROP FROM THE VAULT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-editorial">
                NEW DROPS
              </h2>
            </div>
            <Link
              href="/collections/all?tag=new"
              className="group inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-volt hover:underline mt-4 sm:mt-0"
            >
              <span>View All Drops</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newDrops.map((product) => (
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
        </div>
      </section>

      {/* 4. Shop The Look Curated Fit */}
      <ShopTheLook products={lookProducts} />

      {/* 5. Bestsellers Section */}
      <section className="py-20 bg-onyx-950 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-volt mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-volt" />
                <span>MOST WANTED SILHOUETTES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-editorial">
                BESTSELLERS
              </h2>
            </div>
            <Link
              href="/collections/all"
              className="group inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-volt hover:underline mt-4 sm:mt-0"
            >
              <span>Explore All Garments</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map((product) => (
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
        </div>
      </section>

      {/* 6. Brand Story & Craftsmanship */}
      <BrandStory />

      {/* 7. Verified Social Proof & Customer Reviews */}
      <section className="py-20 bg-onyx-950 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-volt">
              VERIFIED INDIAN BUYER REVIEWS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-editorial">
              STREETWEAR COMMUNITY VOICES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 bg-onyx-900 border border-border/80 flex flex-col justify-between space-y-4 hover:border-volt/50 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-volt">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-volt" />
                    ))}
                  </div>
                  <h4 className="text-sm font-bold uppercase text-white tracking-wide">
                    &ldquo;{rev.title || "Elite drape & fit"}&rdquo;
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-bold text-white block">{rev.customerName}</span>
                    <span className="text-[10px] text-volt font-mono">✓ Verified Buyer</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase font-mono">
                    {rev.product?.title ? rev.product.title.substring(0, 18) + "..." : "KULT"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
