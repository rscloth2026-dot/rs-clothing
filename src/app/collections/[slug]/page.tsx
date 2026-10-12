import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/product/ProductCard";
import { CollectionFilterClient } from "./CollectionFilterClient";

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { slug } = params;

  let category = null;
  let categoryTitle = "All Garments";
  let categoryDesc = "The full catalog of engineered Indian streetwear silhouettes.";

  if (slug !== "all") {
    category = await prisma.category.findUnique({
      where: { slug },
    });
    if (!category) {
      // Check if it's a virtual collection like 'new-drops' or 'bestsellers'
      if (slug === "new-drops") {
        categoryTitle = "New Drops";
        categoryDesc = "The latest heavyweight drops straight from the workshop.";
      } else if (slug === "bestsellers") {
        categoryTitle = "Bestsellers";
        categoryDesc = "The most wanted oversized tees and puddle denim in India.";
      } else {
        notFound();
      }
    } else {
      categoryTitle = category.name;
      categoryDesc = category.description || categoryDesc;
    }
  }

  // Fetch all products matching category
  const whereClause: any = { status: "PUBLISHED" };
  if (category) {
    whereClause.categoryId = category.id;
  } else if (slug === "new-drops") {
    whereClause.isNewDrop = true;
  } else if (slug === "bestsellers") {
    whereClause.isBestseller = true;
  }

  // Handle URL search queries
  const searchQuery = typeof searchParams.search === "string" ? searchParams.search : undefined;
  if (searchQuery) {
    whereClause.OR = [
      { title: { contains: searchQuery } },
      { description: { contains: searchQuery } },
      { fit: { contains: searchQuery } },
    ];
  }

  const allCategoryProducts = await prisma.product.findMany({
    where: whereClause,
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      variants: true,
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-onyx-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Collection Header */}
        <div className="mb-10 pb-8 border-b border-border">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt mb-2">
            COLLECTION // {slug.toUpperCase()}
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-editorial">
            {categoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl">
            {categoryDesc}
          </p>
        </div>

        {/* Client-side Filter & Dynamic Product Grid */}
        <CollectionFilterClient
          initialProducts={allCategoryProducts}
          currentCategory={categoryTitle}
        />
      </div>
    </div>
  );
}
