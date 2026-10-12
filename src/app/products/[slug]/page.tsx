import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ProductDetailClient } from "./ProductDetailClient";

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, category: true },
  });

  if (!product) {
    return { title: "Product Not Found | KULT" };
  }

  const primaryImage = product.images[0]?.url || "/placeholder.jpg";

  return {
    title: `${product.title} | KULT Streetwear India`,
    description: `${product.description} Available in ${product.fit} fit with 100% combed cotton. Free express shipping in India above ₹999.`,
    openGraph: {
      title: `${product.title} - KULT`,
      description: product.description,
      images: [{ url: primaryImage }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      variants: true,
      category: true,
      reviews: {
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) {
    notFound();
  }

  // Related products from same category
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      status: "PUBLISHED",
    },
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      variants: true,
      category: true,
    },
    take: 4,
  });

  // JSON-LD Structured Data for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.map((img) => img.url),
    description: product.description,
    sku: product.variants[0]?.sku || product.slug,
    brand: {
      "@type": "Brand",
      name: "KULT",
    },
    offers: {
      "@type": "Offer",
      url: `https://kult.in/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.basePrice,
      availability: product.variants.some((v) => v.stockQuantity > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
