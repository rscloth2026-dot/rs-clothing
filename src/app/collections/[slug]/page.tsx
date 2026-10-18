import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { CollectionFilterClient } from "./CollectionFilterClient";

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo";

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  let title = "All Garments";
  let description = "Engineered heavyweight Rajasthani streetwear silhouettes.";

  if (slug === "new-drops") {
    title = "New Drops & Archival Releases";
    description = "The latest heavyweight drops straight from our Jodhpur atelier workshop.";
  } else if (slug === "bestsellers") {
    title = "Bestsellers & Signature Silhouettes";
    description = "India's most coveted oversized tees, hoodies, and puddle denim.";
  } else if (slug !== "all") {
    const category = await prisma.category.findUnique({ where: { slug } });
    if (category) {
      title = category.name;
      description = category.description || description;
    }
  }

  const canonicalUrl = `${SITE_CONFIG.url}/collections/${slug}`;

  return {
    title: `${title} | OnlyCollection Atelier`,
    description: `${description} Free express shipping across India on orders above ₹999.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | OnlyCollection Atelier`,
      description,
      url: canonicalUrl,
      images: [{ url: SITE_CONFIG.ogImage }],
    },
  };
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
        categoryDesc = "The latest heavyweight drops straight from the Jodhpur workshop.";
      } else if (slug === "bestsellers") {
        categoryTitle = "Imperial Bestsellers";
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
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Collection Header */}
        <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#E5E5E5]">
          <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#1E40AF] mb-2 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E40AF] shadow-[0_0_6px_#1E40AF] animate-pulse" />
            <span>ATELIER ARCHIVE // {slug.toUpperCase()}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0A0A0A] tracking-tight">
            {categoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] font-sans mt-2 max-w-xl leading-relaxed">
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
