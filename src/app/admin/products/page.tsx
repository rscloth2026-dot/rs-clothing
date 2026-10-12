import React from "react";
import { prisma } from "@/lib/db";
import { ProductManagerClient } from "./ProductManagerClient";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        images: true,
        variants: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany(),
  ]);

  return <ProductManagerClient initialProducts={products} categories={categories} />;
}
