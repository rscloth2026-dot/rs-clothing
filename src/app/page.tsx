import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { HeroCampaign } from "@/components/home/HeroCampaign";
import { type FloatingGarmentItem } from "@/components/home/FloatingGarment";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { RoyalProductRail } from "@/components/home/RoyalProductRail";
import { BrandStory } from "@/components/home/BrandStory";
import { ReviewMarquee } from "@/components/home/ReviewMarquee";

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  // Fetch real database records for categories, drops, bestsellers and reviews
  const [categories, newDrops, bestsellers, reviews, heroSetting] = await Promise.all([
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
      take: 8,
    }),
    prisma.product.findMany({
      where: { status: "PUBLISHED", isBestseller: true },
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
      take: 12,
    }),
    prisma.storeSetting.findUnique({
      where: { key: "hero_floating_garments_v1" },
    }),
  ]);

  let heroGarments: FloatingGarmentItem[] | null = null;
  if (heroSetting?.value) {
    try {
      const parsed = JSON.parse(heroSetting.value);
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (g) =>
            g &&
            typeof g === "object" &&
            typeof g.id === "string" &&
            typeof g.imageUrl === "string" &&
            typeof g.initialX === "number" &&
            typeof g.initialY === "number" &&
            typeof g.sizeDesktop === "number"
        )
      ) {
        heroGarments = parsed as FloatingGarmentItem[];
      }
    } catch (e) {
      // fallback to null (defaults in component)
    }
  }



  // Format products for royal compact product widgets
  const formattedNewDrops = newDrops.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    basePrice: p.basePrice,
    comparePrice: p.comparePrice,
    fit: p.fit,
    categoryName: p.category.name,
    isNewDrop: p.isNewDrop,
    isBestseller: p.isBestseller,
    images: p.images,
    variants: p.variants,
  }));

  const formattedBestsellers = bestsellers.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    basePrice: p.basePrice,
    comparePrice: p.comparePrice,
    fit: p.fit,
    categoryName: p.category.name,
    isNewDrop: p.isNewDrop,
    isBestseller: p.isBestseller,
    images: p.images,
    variants: p.variants,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-[#09090B]">
      {/* 1. Hero Campaign Section with Floating Interactive Clothes */}
      <HeroCampaign initialGarments={heroGarments} />

      {/* 2. Shop by Category / Royal Silhouettes (Compact silhouette runway) */}
      <CategoryGrid
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description || "",
          imageUrl: c.imageUrl || "/placeholder.jpg",
        }))}
      />

      {/* 3. New Royal Drops (Small royal product widgets) */}
      <RoyalProductRail
        badgeTitle="FRESH FROM THE JODHPUR ATELIER"
        title="New Royal Drops"
        subtitle="Handcrafted in limited runs. Heavyweight 380 GSM cotton and precision silhouettes."
        viewAllLink="/collections/new-drops"
        viewAllText={`View All Drops (${formattedNewDrops.length})`}
        products={formattedNewDrops}
        direction="normal"
        speedClass="animate-marquee"
      />

      {/* 4. Imperial Bestsellers (Small royal product widgets) */}
      <RoyalProductRail
        badgeTitle="SIGNATURE CUTS // 380 GSM HEAVYWEIGHT"
        title="Imperial Bestsellers"
        subtitle="The most celebrated cuts tested across 10,000+ patrons nationwide."
        viewAllLink="/collections/bestsellers"
        viewAllText={`Explore All Bestsellers (${formattedBestsellers.length})`}
        products={formattedBestsellers}
        direction="reverse"
        speedClass="animate-marquee-reverse"
      />

      {/* 5. Brand Story & Rajasthani Craftsmanship Manifesto */}
      <BrandStory />

      {/* 6. Verified Patronage & Customer Reviews - Compact Infinite Auto-Scrolling Marquee */}
      <section className="py-14 sm:py-20 bg-[#09090B] border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full mb-3 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-300">
                ROYAL COMMENDATIONS // 4.9 RATING
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Words From Our Patrons
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2">
              4.9/5 Rating across 1,800+ authenticated orders. Verified fabric weight and zero sagging collars.
            </p>
          </div>

          <ReviewMarquee reviews={reviews as any} />
        </div>
      </section>
    </div>
  );
}
