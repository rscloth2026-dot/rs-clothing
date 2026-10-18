import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { HeroCampaign } from "@/components/home/HeroCampaign";
import { type FloatingGarmentItem } from "@/components/home/FloatingGarment";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { RoyalProductRail } from "@/components/home/RoyalProductRail";
import { BrandStory } from "@/components/home/BrandStory";

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
      take: 3,
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
    <div className="flex flex-col min-h-screen bg-[#0A0A1A]">
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

      {/* 6. Verified Patronage & Customer Reviews - Static 3-Card Regal Grid */}
      <section className="py-16 sm:py-24 bg-[#0A0A1A] border-b border-[#1F294D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#16213E] border border-[#1F294D] rounded-full mb-3 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#00FF87]">
                ROYAL COMMENDATIONS // 4.9 RATING
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F8FAFC] tracking-tight">
              Words From Our Patrons
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-sans mt-2">
              4.9/5 Rating across 1,800+ authenticated orders. Verified fabric weight and zero sagging collars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(reviews.length > 0 ? reviews : [
              {
                id: "r1",
                customerName: "Ranveer Rathore",
                city: "Jodhpur, RJ",
                rating: 5,
                comment: "The 380 GSM weight is unreal. It has that authentic heavy haveli drape that cheap retail brands can never replicate. Collar stays crisp after 10+ washes.",
                productTitle: "Royal Haveli Oversized Tee",
              },
              {
                id: "r2",
                customerName: "Aarav Singhania",
                city: "South Mumbai",
                rating: 5,
                comment: "The French Terry texture and antique brass hardware details are unmatched. Received compliments the very first day in Bandra. Legit luxury feel.",
                productTitle: "Marwar Palace Zip Hoodie",
              },
              {
                id: "r3",
                customerName: "Kabir Mehta",
                city: "Indiranagar, Bengaluru",
                rating: 5,
                comment: "BlueDart express arrived in 48 hours. Packaging came with custom wax seal stamp and fabric care card. Truly a five-star experience.",
                productTitle: "Raw Selvedge Baggy Denim",
              },
            ]).map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="p-6 bg-[#16213E] border border-[#1F294D] hover:border-[#60EFFF]/80 hover:shadow-[0_12px_28px_rgba(0,255,135,0.1)] transition-all rounded-none shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-[#FBBF24] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#E2E8F0] font-sans leading-relaxed italic mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1F294D] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold font-sans text-[#F8FAFC] flex items-center space-x-1.5">
                      <span>{rev.customerName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF87]" />
                    </div>
                    <div className="text-[11px] text-[#94A3B8] font-sans">
                      {("city" in rev && rev.city) ? rev.city : "Verified Buyer"}
                    </div>
                  </div>
                  <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#00FF87] bg-[#00FF87]/10 px-2 py-0.5 rounded-none border border-[#00FF87]/30">
                    {("product" in rev && rev.product?.title) ? rev.product.title : (rev as any).productTitle || "Verified"}
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
