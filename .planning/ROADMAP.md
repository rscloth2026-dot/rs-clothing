# Project Roadmap: Premium Gen-Z Men's Fashion Platform

## Phase 1: Foundation & Data Architecture (Milestone M1)
- [ ] Next.js 14+ App Router project scaffolding with TypeScript, Tailwind CSS, shadcn/ui.
- [ ] Prisma schema with comprehensive models (User, Product, Variant, Inventory, Cart, Order, Coupon, Banner).
- [ ] Database migrations and comprehensive seed data (realistic Indian streetwear products, categories, admin user).

## Phase 2: Design System & Core Storefront Layout (Milestone M2)
- [ ] Editorial high-fashion streetwear design system (Onyx Black, Crisp Off-White, Acid Volt accent).
- [ ] Sticky Header with search autocomplete, category mega-menu, cart counter badge, and mobile drawer.
- [ ] Announcement bar with promotional notifications and free shipping threshold alerts.
- [ ] Comprehensive footer with newsletter subscription, Indian brand support, and policy pages.

## Phase 3: Homepage & Visual Merchandising (Milestone M3)
- [ ] Editorial Hero Campaign ("YOUR FIT. YOUR RULES.") with responsive desktop/mobile creative.
- [ ] Shop by Category visual tiles (Oversized, Graphic, Baggy Jeans, Straight Jeans).
- [ ] New Drops & Bestsellers product grids with quick-add size selectors and hover states.
- [ ] "Shop the Look" multi-product curated outfit bundle builder.
- [ ] Brand Story manifesto and verified social proof / review cards.

## Phase 4: Product Catalog & Product Detail Experience (Milestone M4)
- [ ] Collection pages with multi-facet filters (Size, Fit, Price, Category) and sorting (Newest, Price, Popularity).
- [ ] Immersive PDP with multi-image gallery, zoom, Indian size guide modal, and live stock indicator.
- [ ] Indian 6-digit PIN code delivery feasibility and estimated transit time calculator.

## Phase 5: Cart, Indian Checkout & Razorpay Integration (Milestone M5)
- [ ] Slide-out Cart Drawer and dedicated `/cart` page with coupon code discount engine.
- [ ] Frictionless checkout supporting Guest & Registered shoppers with Indian address validation.
- [ ] Razorpay payment integration with server-side HMAC-SHA256 signature verification.
- [ ] Cash on Delivery (COD) order placement with atomic stock decrement.
- [ ] Order confirmation page (`/order-success/[orderId]`) with tracking updates.

## Phase 6: Customer Portal & Role-Protected Admin Control Center (Milestone M6)
- [ ] Customer authentication (JWT / session cookie, bcryptjs) with order history and address book.
- [ ] Role-based access control (`ADMIN` vs `CUSTOMER`).
- [ ] `/admin/products`: Product & variant catalog editor with live inventory tracking.
- [ ] `/admin/orders`: Order fulfillment status pipeline (Processing, Shipped, Delivered).
- [ ] `/admin/marketing`: Coupon code creator, banner editor, and newsletter list.

## Phase 7: SEO, Security, Performance & CodeRabbit Verification (Milestone M7)
- [ ] Dynamic JSON-LD structured data (Product, Organization, BreadcrumbList), OpenGraph tags, sitemap.xml, robots.txt.
- [ ] Security hardening (rate limiting, Zod schema validation, secure HTTP-only cookies, security headers).
- [ ] CodeRabbit review and full test suite verification.
