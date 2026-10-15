import React from "react";
import { prisma } from "@/lib/db";
import { HeroManagerClient } from "./HeroManagerClient";

export const revalidate = 0;

export default async function AdminHeroPage() {
  const [products, heroSetting] = await Promise.all([
    prisma.product.findMany({
      where: { status: "PUBLISHED" },
      include: {
        category: true,
        images: { orderBy: { displayOrder: "asc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.storeSetting.findUnique({
      where: { key: "hero_floating_garments_v1" },
    }),
  ]);

  let savedGarments = null;
  if (heroSetting?.value) {
    try {
      savedGarments = JSON.parse(heroSetting.value);
    } catch (e) {
      // Fallback
    }
  }

  const formattedProducts = products.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    basePrice: p.basePrice,
    comparePrice: p.comparePrice,
    categoryName: p.category.name,
    imageUrl: p.images[0]?.url || "/placeholder.jpg",
  }));

  return (
    <HeroManagerClient
      initialGarments={savedGarments}
      availableProducts={formattedProducts}
    />
  );
}
