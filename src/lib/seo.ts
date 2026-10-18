export const SITE_CONFIG = {
  name: "OnlyCollection",
  legalName: "OnlyCollection Atelier India Pvt. Ltd.",
  description:
    "Engineered heavyweight oversized T-shirts, graphic tees, and baggy puddle jeans with royal Rajputana craftsmanship from Jodhpur, Rajasthan. 380 GSM combed cotton.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://onlycollection.in",
  ogImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
  telephone: "+91 98765 43210",
  contactEmail: "concierge@onlycollection.in",
  sameAs: [
    "https://instagram.com/onlycollection",
    "https://x.com/onlycollection",
    "https://youtube.com/@onlycollection",
  ],
  currency: "INR",
  country: "IN",
};

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    image: SITE_CONFIG.ogImage,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.telephone,
    email: SITE_CONFIG.contactEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Circuit House Road, Ratanada",
      addressLocality: "Jodhpur",
      addressRegion: "Rajasthan",
      postalCode: "342001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.2389",
      longitude: "73.0243",
    },
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, UPI, NetBanking",
    sameAs: SITE_CONFIG.sameAs,
  };
}

export function generateProductSchema(product: {
  id: string;
  slug: string;
  title: string;
  description: string;
  basePrice: number;
  images: { url: string }[];
  variants: { sku: string; stockQuantity: number }[];
  category?: { name: string };
}) {
  const inStock = product.variants.some((v) => v.stockQuantity > 0);
  const primarySku = product.variants[0]?.sku || product.slug;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((img) => img.url),
    sku: primarySku,
    mpn: primarySku,
    category: product.category?.name || "Streetwear",
    brand: {
      "@type": "Brand",
      name: "OnlyCollection",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_CONFIG.url}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.basePrice,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      itemCondition: "https://schema.org/NewCondition",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: product.basePrice >= 999 ? 0 : 99,
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 4,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}
