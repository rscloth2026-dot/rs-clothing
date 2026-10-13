import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.newsletter.deleteMany();

  // Create Admin User & Demo Customer
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin Kult",
      email: "admin@kult.in",
      passwordHash: adminPassword,
      role: "ADMIN",
      phone: "+91 9876543210",
    },
  });

  const customerPassword = await bcrypt.hash("customer123", 10);
  const customer = await prisma.user.create({
    data: {
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      passwordHash: customerPassword,
      role: "CUSTOMER",
      phone: "+91 9823456789",
      addresses: {
        create: {
          fullName: "Aarav Sharma",
          phone: "9823456789",
          addressLine1: "Flat 402, Skyline Residency, Indiranagar 100ft Road",
          landmark: "Near Toit Brewery",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560038",
          isDefault: true,
        },
      },
    },
  });

  console.log("👤 Created admin (admin@kult.in) and demo customer.");

  // Create Categories
  const catOversized = await prisma.category.create({
    data: {
      name: "Oversized Tees",
      slug: "oversized-tees",
      description: "Drop-shoulder, 240+ GSM heavyweight luxury cotton silhouettes.",
      imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
      displayOrder: 1,
    },
  });

  const catGraphic = await prisma.category.create({
    data: {
      name: "Graphic Tees",
      slug: "graphic-tees",
      description: "High-density puff prints and distressed cyber-brutalist artworks.",
      imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
      displayOrder: 2,
    },
  });

  const catEssentials = await prisma.category.create({
    data: {
      name: "Essential Tees",
      slug: "essential-tees",
      description: "Clean, unbranded everyday streetwear essentials built to last forever.",
      imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      displayOrder: 3,
    },
  });

  const catBaggy = await prisma.category.create({
    data: {
      name: "Baggy Jeans",
      slug: "baggy-jeans",
      description: "Ultra-wide leg, puddle-hem denim crafted from 13.5oz rigid cotton.",
      imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop",
      displayOrder: 4,
    },
  });

  const catStraight = await prisma.category.create({
    data: {
      name: "Straight-Fit Jeans",
      slug: "straight-fit-jeans",
      description: "Timeless skate-ready straight cut denim with vintage stone washes.",
      imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop",
      displayOrder: 5,
    },
  });

  const catRelaxed = await prisma.category.create({
    data: {
      name: "Relaxed-Fit Jeans",
      slug: "relaxed-fit-jeans",
      description: "Roomy thigh fit tapering down to sneaker-friendly leg openings.",
      imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop",
      displayOrder: 6,
    },
  });

  console.log("📁 Categories created.");

  // Products Data
  const products = [
    {
      title: "Acid Cyber Oversized Heavyweight Tee",
      slug: "acid-cyber-oversized-heavyweight-tee",
      description: "Engineered with an exaggerated boxy drape, structured dropped shoulders, and our signature acid cyber typographic backprint. Built from 240 GSM pre-shrunk French Terry cotton for supreme breathability in Indian weather.",
      fabricDetails: "240 GSM 100% Combed Compact Cotton, Single Jersey knit, silicon softened",
      fit: "Oversized",
      careInstructions: "Machine wash cold inside out with similar colors. Do not iron directly on print.",
      basePrice: 1499,
      comparePrice: 2299,
      isFeatured: true,
      isNewDrop: true,
      isBestseller: true,
      categoryId: catOversized.id,
      images: [
        { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop", isPrimary: true, altText: "Acid Cyber Tee Front Fit" },
        { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop", isPrimary: false, altText: "Acid Cyber Tee Back Graphic" },
      ],
      variants: [
        { size: "S", color: "Washed Onyx", colorHex: "#141414", stock: 15, sku: "KULT-ACID-S-BLK" },
        { size: "M", color: "Washed Onyx", colorHex: "#141414", stock: 24, sku: "KULT-ACID-M-BLK" },
        { size: "L", color: "Washed Onyx", colorHex: "#141414", stock: 30, sku: "KULT-ACID-L-BLK" },
        { size: "XL", color: "Washed Onyx", colorHex: "#141414", stock: 18, sku: "KULT-ACID-XL-BLK" },
        { size: "XXL", color: "Washed Onyx", colorHex: "#141414", stock: 8, sku: "KULT-ACID-XXL-BLK" },
        { size: "M", color: "Bone Chalk", colorHex: "#EAE6DF", stock: 12, sku: "KULT-ACID-M-WHT" },
        { size: "L", color: "Bone Chalk", colorHex: "#EAE6DF", stock: 20, sku: "KULT-ACID-L-WHT" },
      ],
    },
    {
      title: "Vandalism High-Density Puff Tee",
      slug: "vandalism-high-density-puff-tee",
      description: "Bold tactile high-density puff rubber print on the chest with distressed streetwear edge typography. Cut in our proprietary anti-sag collar silhouette.",
      fabricDetails: "260 GSM Ultra Heavy Cotton, biowashed & pre-shrunk",
      fit: "Oversized",
      careInstructions: "Gentle cold cycle. Hang dry in shade. Low tumble dry.",
      basePrice: 1699,
      comparePrice: 2499,
      isFeatured: true,
      isNewDrop: true,
      isBestseller: false,
      categoryId: catGraphic.id,
      images: [
        { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop", isPrimary: true, altText: "Vandalism Puff Tee" },
        { url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop", isPrimary: false, altText: "Detail Puff Print" },
      ],
      variants: [
        { size: "S", color: "Distressed Graphite", colorHex: "#222226", stock: 10, sku: "KULT-VAND-S-GRY" },
        { size: "M", color: "Distressed Graphite", colorHex: "#222226", stock: 19, sku: "KULT-VAND-M-GRY" },
        { size: "L", color: "Distressed Graphite", colorHex: "#222226", stock: 22, sku: "KULT-VAND-L-GRY" },
        { size: "XL", color: "Distressed Graphite", colorHex: "#222226", stock: 14, sku: "KULT-VAND-XL-GRY" },
      ],
    },
    {
      title: "Core Minimal Raw Essential Tee",
      slug: "core-minimal-raw-essential-tee",
      description: "Zero branding on the exterior. Pure silhouette excellence. Finished with an embroidered tonal hem tag and reinforced double-needle cover stitching.",
      fabricDetails: "220 GSM 100% Organic Pima Cotton, ultra-soft luxury touch",
      fit: "Relaxed",
      careInstructions: "Normal machine wash at 30°C. Medium iron.",
      basePrice: 1199,
      comparePrice: 1799,
      isFeatured: false,
      isNewDrop: false,
      isBestseller: true,
      categoryId: catEssentials.id,
      images: [
        { url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop", isPrimary: true, altText: "Core Minimal Essential Tee Front" },
        { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop", isPrimary: false, altText: "Core Minimal Tee Fabric Close" },
      ],
      variants: [
        { size: "S", color: "Pure Jet Black", colorHex: "#0D0D0E", stock: 25, sku: "KULT-CORE-S-BLK" },
        { size: "M", color: "Pure Jet Black", colorHex: "#0D0D0E", stock: 40, sku: "KULT-CORE-M-BLK" },
        { size: "L", color: "Pure Jet Black", colorHex: "#0D0D0E", stock: 35, sku: "KULT-CORE-L-BLK" },
        { size: "XL", color: "Pure Jet Black", colorHex: "#0D0D0E", stock: 20, sku: "KULT-CORE-XL-BLK" },
        { size: "M", color: "Acid Olive", colorHex: "#414833", stock: 15, sku: "KULT-CORE-M-OLV" },
        { size: "L", color: "Acid Olive", colorHex: "#414833", stock: 18, sku: "KULT-CORE-L-OLV" },
      ],
    },
    {
      title: "Tokyo Skate 90s Baggy Puddle Jeans",
      slug: "tokyo-skate-90s-baggy-puddle-jeans",
      description: "The definitive Gen-Z wide-leg cut. Cut loose from the hip with a subtle taper pooling gracefully over your high-top kicks and chunky runners. Finished with custom oxidized silver hardware and deep 5-pocket construction.",
      fabricDetails: "14oz 100% Rigid Ring-Spun Cotton Denim, stone washed & hand whiskered",
      fit: "Baggy",
      careInstructions: "Wash inside out in cold water. Avoid frequent washing to preserve wash aesthetics.",
      basePrice: 2899,
      comparePrice: 3999,
      isFeatured: true,
      isNewDrop: true,
      isBestseller: true,
      categoryId: catBaggy.id,
      images: [
        { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop", isPrimary: true, altText: "Tokyo Skate Baggy Jeans On Model" },
        { url: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1000&auto=format&fit=crop", isPrimary: false, altText: "Denim Hardware Detail" },
      ],
      variants: [
        { size: "28", color: "Washed Indigo", colorHex: "#32435F", stock: 8, sku: "KULT-BAGGY-28-IND" },
        { size: "30", color: "Washed Indigo", colorHex: "#32435F", stock: 16, sku: "KULT-BAGGY-30-IND" },
        { size: "32", color: "Washed Indigo", colorHex: "#32435F", stock: 20, sku: "KULT-BAGGY-32-IND" },
        { size: "34", color: "Washed Indigo", colorHex: "#32435F", stock: 14, sku: "KULT-BAGGY-34-IND" },
        { size: "36", color: "Washed Indigo", colorHex: "#32435F", stock: 6, sku: "KULT-BAGGY-36-IND" },
        { size: "30", color: "Faded Acid Black", colorHex: "#232325", stock: 12, sku: "KULT-BAGGY-30-BLK" },
        { size: "32", color: "Faded Acid Black", colorHex: "#232325", stock: 15, sku: "KULT-BAGGY-32-BLK" },
      ],
    },
    {
      title: "Raw Selvedge Straight-Fit Vintage Denim",
      slug: "raw-selvedge-straight-fit-vintage-denim",
      description: "Clean straight architectural leg line from hip to hem. Features copper rivet reinforcement, heavy-duty YKK brass zipper, and clean chain-stitched cuffs.",
      fabricDetails: "13.5oz Non-Stretch Indigo Raw Denim",
      fit: "Straight",
      careInstructions: "Cold soak only. Do not machine tumble dry.",
      basePrice: 2499,
      comparePrice: 3499,
      isFeatured: false,
      isNewDrop: false,
      isBestseller: true,
      categoryId: catStraight.id,
      images: [
        { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop", isPrimary: true, altText: "Straight Fit Vintage Denim" },
        { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop", isPrimary: false, altText: "Straight Denim Back Pocket" },
      ],
      variants: [
        { size: "30", color: "Deep Raw Indigo", colorHex: "#1B273D", stock: 14, sku: "KULT-STR-30-IND" },
        { size: "32", color: "Deep Raw Indigo", colorHex: "#1B273D", stock: 18, sku: "KULT-STR-32-IND" },
        { size: "34", color: "Deep Raw Indigo", colorHex: "#1B273D", stock: 12, sku: "KULT-STR-34-IND" },
      ],
    },
    {
      title: "Matrix Cybernetic Acid Wash Tee",
      slug: "matrix-cybernetic-acid-wash-tee",
      description: "Custom vintage snow wash treatment making every single garment unique. Features futuristic screen-printed grid graphics across chest and sleeves.",
      fabricDetails: "240 GSM 100% Combed Cotton, artisanal enzyme washed",
      fit: "Oversized",
      careInstructions: "Machine wash cold inside out. Line dry.",
      basePrice: 1599,
      comparePrice: 2399,
      isFeatured: true,
      isNewDrop: true,
      isBestseller: false,
      categoryId: catOversized.id,
      images: [
        { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop", isPrimary: true, altText: "Matrix Acid Wash Tee" },
        { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop", isPrimary: false, altText: "Acid Wash Detail" },
      ],
      variants: [
        { size: "S", color: "Mineral Acid Grey", colorHex: "#393A3D", stock: 11, sku: "KULT-MTX-S-GRY" },
        { size: "M", color: "Mineral Acid Grey", colorHex: "#393A3D", stock: 20, sku: "KULT-MTX-M-GRY" },
        { size: "L", color: "Mineral Acid Grey", colorHex: "#393A3D", stock: 25, sku: "KULT-MTX-L-GRY" },
        { size: "XL", color: "Mineral Acid Grey", colorHex: "#393A3D", stock: 15, sku: "KULT-MTX-XL-GRY" },
      ],
    },
    {
      title: "Carpenter Workwear Relaxed Jeans",
      slug: "carpenter-workwear-relaxed-jeans",
      description: "Utility aesthetic adapted for streetwear. Features hammer loop, double-layer utility pocket on side, and relaxed taper that sits cleanly above any sneaker.",
      fabricDetails: "12.5oz Cotton Canvas Twill Denim with reinforced knees",
      fit: "Relaxed",
      careInstructions: "Machine wash warm, tumble dry normal.",
      basePrice: 2699,
      comparePrice: 3699,
      isFeatured: false,
      isNewDrop: true,
      isBestseller: false,
      categoryId: catRelaxed.id,
      images: [
        { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop", isPrimary: true, altText: "Carpenter Workwear Jeans" },
        { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop", isPrimary: false, altText: "Carpenter Utility Detail" },
      ],
      variants: [
        { size: "30", color: "Washed Khaki Sand", colorHex: "#9B8B77", stock: 10, sku: "KULT-CRPT-30-KHK" },
        { size: "32", color: "Washed Khaki Sand", colorHex: "#9B8B77", stock: 14, sku: "KULT-CRPT-32-KHK" },
        { size: "34", color: "Washed Khaki Sand", colorHex: "#9B8B77", stock: 8, sku: "KULT-CRPT-34-KHK" },
      ],
    },
    {
      title: "Nightcrawler Shadow Heavy Boxy Tee",
      slug: "nightcrawler-shadow-heavy-boxy-tee",
      description: "Subtle reflective silver 3M heat-transfer logo on nape, ultra-deep armholes, and structural drop-shoulder cut.",
      fabricDetails: "250 GSM Luxury Heavy French Terry",
      fit: "Oversized",
      careInstructions: "Cold wash only. Hang dry in shade.",
      basePrice: 1499,
      comparePrice: 2199,
      isFeatured: true,
      isNewDrop: false,
      isBestseller: true,
      categoryId: catOversized.id,
      images: [
        { url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop", isPrimary: true, altText: "Nightcrawler Shadow Tee" },
        { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop", isPrimary: false, altText: "Nightcrawler Model Shot" },
      ],
      variants: [
        { size: "S", color: "Pitch Black", colorHex: "#0B0C10", stock: 15, sku: "KULT-NC-S-BLK" },
        { size: "M", color: "Pitch Black", colorHex: "#0B0C10", stock: 30, sku: "KULT-NC-M-BLK" },
        { size: "L", color: "Pitch Black", colorHex: "#0B0C10", stock: 28, sku: "KULT-NC-L-BLK" },
        { size: "XL", color: "Pitch Black", colorHex: "#0B0C10", stock: 12, sku: "KULT-NC-XL-BLK" },
      ],
    },
  ];

  for (const p of products) {
    const createdProduct = await prisma.product.create({
      data: {
        title: p.title,
        slug: p.slug,
        description: p.description,
        fabricDetails: p.fabricDetails,
        fit: p.fit,
        careInstructions: p.careInstructions,
        basePrice: p.basePrice,
        comparePrice: p.comparePrice,
        isFeatured: p.isFeatured,
        isNewDrop: p.isNewDrop,
        isBestseller: p.isBestseller,
        categoryId: p.categoryId,
        images: {
          create: p.images.map((img, idx) => ({
            url: img.url,
            altText: img.altText,
            isPrimary: img.isPrimary,
            displayOrder: idx,
          })),
        },
        variants: {
          create: p.variants.map((v) => ({
            sku: v.sku,
            size: v.size,
            color: v.color,
            colorHex: v.colorHex,
            stockQuantity: v.stock,
            additionalPrice: 0,
          })),
        },
        reviews: {
          create: [
            {
              customerName: "Rohan Kapoor",
              rating: 5,
              title: "Best oversized fit in India hands down",
              comment: "The 240 GSM fabric is genuinely thick and structured. Doesn't cling at all and the collar doesn't sag after washing. 10/10.",
              verifiedBuyer: true,
              isApproved: true,
            },
            {
              customerName: "Devansh Nair",
              rating: 5,
              title: "Insane denim drape",
              comment: "Pairs perfectly with my Jordan 1s. Length pools nicely. True to size on the waist.",
              verifiedBuyer: true,
              isApproved: true,
            },
          ],
        },
      },
    });
    console.log(`👕 Created product: ${createdProduct.title}`);
  }

  // Create Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: "WELCOME10",
        description: "10% off on your first drop order",
        discountType: "PERCENTAGE",
        discountValue: 10,
        minOrderValue: 999,
        maxDiscount: 500,
        isActive: true,
      },
      {
        code: "FLAT500",
        description: "Flat ₹500 off on orders above ₹2499",
        discountType: "FLAT",
        discountValue: 500,
        minOrderValue: 2499,
        isActive: true,
      },
      {
        code: "STREETVIBE",
        description: "15% off limited streetwear launch offer",
        discountType: "PERCENTAGE",
        discountValue: 15,
        minOrderValue: 1499,
        maxDiscount: 750,
        isActive: true,
      },
    ],
  });
  console.log("🎟️ Coupons created (WELCOME10, FLAT500, STREETVIBE).");

  // Create Banners
  await prisma.banner.create({
    data: {
      title: "YOUR FIT. YOUR RULES.",
      subtitle: "Heavyweight drop-shoulder tees and skate-drape baggy denim engineered for the new wave.",
      badgeText: "DROP 01 // AUTUMN 2026",
      ctaText: "SHOP THE DROP",
      ctaLink: "/collections/oversized-tees",
      imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
      mobileImageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      isActive: true,
      displayOrder: 1,
    },
  });

  // Create initial demo order
  const firstProduct = await prisma.product.findFirst({
    include: { variants: true },
  });

  if (firstProduct && firstProduct.variants.length > 0) {
    const v = firstProduct.variants[0];
    await prisma.order.create({
      data: {
        orderNumber: "KULT-ORD-1001",
        userId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone || "9823456789",
        shippingAddress: JSON.stringify({
          fullName: "Aarav Sharma",
          phone: "9823456789",
          addressLine1: "Flat 402, Skyline Residency, Indiranagar 100ft Road",
          landmark: "Near Toit Brewery",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560038",
        }),
        paymentMethod: "RAZORPAY",
        paymentStatus: "PAID",
        fulfillmentStatus: "SHIPPED",
        subtotal: firstProduct.basePrice,
        discount: 0,
        shippingFee: 0,
        totalAmount: firstProduct.basePrice,
        razorpayOrderId: "order_mock_123456789",
        razorpayPaymentId: "pay_mock_987654321",
        trackingNumber: "BLUEDART-IND-778899",
        items: {
          create: {
            variantId: v.id,
            productTitle: firstProduct.title,
            variantSku: v.sku,
            size: v.size,
            color: v.color,
            unitPrice: firstProduct.basePrice,
            quantity: 1,
            subtotal: firstProduct.basePrice,
          },
        },
      },
    });
    console.log("📦 Demo order created.");
  }

  console.log("✅ Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
