import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ProductDetailClient } from "./ProductDetailClient";
import { generateProductSchema, generateBreadcrumbSchema, SITE_CONFIG } from "@/lib/seo";

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
    return { title: "Product Not Found | OnlyCollection" };
  }

  const primaryImage = product.images[0]?.url || SITE_CONFIG.ogImage;
  const canonicalUrl = `${SITE_CONFIG.url}/products/${product.slug}`;

  return {
    title: product.title,
    description: `${product.description} Hand-crafted in ${product.fit} fit with 100% long-staple cotton. Complimentary Express BlueDart Air Shipping across India above ₹999.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.title} | OnlyCollection Atelier`,
      description: product.description,
      url: canonicalUrl,
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 1500,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [primaryImage],
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

  // Comprehensive JSON-LD Structured Data
  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: product.category?.name || "Collections", url: `/collections/${product.category?.slug || "all"}` },
    { name: product.title, url: `/products/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
