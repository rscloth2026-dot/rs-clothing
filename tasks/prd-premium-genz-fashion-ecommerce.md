# PRD: Premium Gen-Z Men's Fashion E-Commerce Platform

## 1. Introduction / Overview
Build a high-fashion, production-grade e-commerce web platform for an Indian Gen-Z men's streetwear label (focusing on oversized tees, graphic/essential tees, baggy/relaxed/straight-fit jeans, limited drops, and curated looks). Inspired by the modern merchandising and discovery flow of top direct-to-consumer streetwear powerhouses like The Souled Store, while maintaining an original, dark/editorial high-contrast visual identity with custom typography, INR (₹) pricing, Indian sizing (S, M, L, XL, XXL, 28, 30, 32, 34, 36), Indian address formats, PIN-code delivery estimates, Razorpay integration, and a comprehensive role-gated admin control center.

---

## 2. Goals
- Deliver an editorial, high-conversion mobile-first storefront tailored to Gen-Z men in India.
- Provide end-to-end e-commerce journeys: discovery -> filter/sort -> rich product detail pages -> size guide -> cart drawer -> Indian checkout -> Razorpay payment & Cash on Delivery -> order confirmation & tracking.
- Deliver a complete, secure admin dashboard connected to live database models for products, variants, inventory, orders, discount coupons, homepage hero campaigns, and customer analytics.
- Enforce strict server-side validation: pricing, coupons, inventory deduction, payment signature checks (Razorpay HMAC-SHA256), and role-based permissions.
- Comply with SEO best practices (JSON-LD Schema, OpenGraph, sitemap, meta tags, semantic HTML) and Core Web Vitals performance benchmarks.

---

## 3. User Stories

### US-001: Next.js Foundation & Design System Setup
**Description:** As a developer, I need the Next.js App Router project initialized with TypeScript, Tailwind CSS, Lucide icons, and shadcn/ui components configured so that all UI components have a consistent design language.
**Acceptance Criteria:**
- [ ] Next.js 14+ App Router project initialized with TypeScript and Tailwind CSS.
- [ ] `components.json` and reusable shadcn/ui primitives (`Button`, `Card`, `Badge`, `Dialog`, `Drawer`, `Input`, `Select`, `Toast`) installed.
- [ ] Editorial typography and custom color tokens (Onyx Black, Off-White, Acid Volt / Electric Lime accent) established.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.

### US-002: Database Schema & ORM Setup
**Description:** As a database architect, I need a complete database schema with models for users, products, variants, inventory, cart, orders, order items, coupons, banners, and audit logs.
**Acceptance Criteria:**
- [ ] Database schema defined with Prisma/Drizzle covering: User, Address, Product, ProductImage, Category, Variant, InventoryItem, CartItem, Order, OrderItem, Payment, Coupon, Banner, Review.
- [ ] Unique constraints, foreign keys, and indexes configured for performance.
- [ ] Initial migration generated and executed.
- [ ] Seed script (`prisma/seed.ts` or `scripts/seed.ts`) populated with realistic Indian streetwear demo products, categories, and test admin credentials.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.

### US-003: Brand Navigation, Announcement Bar & Footer
**Description:** As a shopper, I want an announcement bar, sticky header with navigation, search autocomplete, bag counter, and an informative footer so that I can easily navigate the brand.
**Acceptance Criteria:**
- [ ] Announcement bar with dismissible, configurable promotional message and shipping notice.
- [ ] Sticky header with logo, category links (Tees, Jeans, Oversized, Essentials, New Arrivals, Sale), search bar, wishlist button, and cart counter.
- [ ] Responsive mobile drawer menu for navigation on phones and tablets.
- [ ] Complete footer with newsletter subscription, brand links, Indian support details, policies, and payment badges.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.
- [ ] Verify in browser using dev-browser skill.

### US-004: Editorial Homepage Experience
**Description:** As a shopper, I want to explore a dynamic homepage featuring an editorial hero campaign, category tiles, new drops, bestsellers, "Shop the Look", brand manifesto, and social proof.
**Acceptance Criteria:**
- [ ] Hero campaign section with bold tagline ("YOUR FIT. YOUR RULES."), CTA buttons, and high-impact streetwear visuals.
- [ ] Shop by Category section with visual cards for Oversized Tees, Graphic Tees, Baggy Jeans, Straight-Fit Jeans, etc.
- [ ] New Drops and Bestsellers dynamic product carousels/grids with quick-view and hover states.
- [ ] "Shop the Look" interactive outfit bundle section allowing multi-item purchase.
- [ ] Brand Story section articulating fabric quality, oversized silhouettes, and Gen-Z streetwear culture.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.
- [ ] Verify in browser using dev-browser skill.

### US-005: Product Catalog & Dynamic Collection Filtering
**Description:** As a shopper, I want to browse products with sort options and multi-facet filters (size, color, fit, price, category) so that I can quickly find the clothes I want.
**Acceptance Criteria:**
- [ ] Responsive product grid with alternate hover image, pricing in INR, discount badges, and color swatches.
- [ ] Filtering by Category, Fit (Oversized, Relaxed, Baggy, Straight), Size (S-XXL, 28-36), and Price range.
- [ ] Sorting by Newest, Price (Low to High / High to Low), and Popularity.
- [ ] URL search parameter sync for shareable filter states.
- [ ] Active filter chips with "Clear All" action and clean empty states.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.
- [ ] Verify in browser using dev-browser skill.

### US-006: High-Fidelity Product Detail Page (PDP)
**Description:** As a shopper, I want an immersive PDP with high-res gallery, size selector, Indian PIN code delivery checker, fabric details, size guide modal, and stock indicators so that I can make a confident purchase.
**Acceptance Criteria:**
- [ ] Multi-image gallery with zoom preview and thumbnail navigation.
- [ ] Size selector with real-time stock status (In Stock / Low Stock / Out of Stock).
- [ ] Interactive Size Guide modal with Indian size measurements (Chest, Length, Waist).
- [ ] Indian PIN code checker verifying delivery availability and estimated delivery days.
- [ ] "Add to Bag" and instant "Buy Now" actions with validation feedback.
- [ ] Product highlights, fabric specifications (e.g., 240 GSM French Terry Cotton, 100% Rigid Denim), and wash care instructions.
- [ ] Customer reviews and "Complete the Look" recommendations.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.
- [ ] Verify in browser using dev-browser skill.

### US-007: Cart Drawer & Full Cart Experience
**Description:** As a shopper, I want to view my cart in a slide-over drawer or dedicated page, adjust quantities, apply coupons, and review the cost breakdown so that I am ready to checkout.
**Acceptance Criteria:**
- [ ] Slide-out Cart Drawer accessible from any page with live item count and badge update.
- [ ] Quantity increment/decrement, item removal, and variant change.
- [ ] Coupon code input with instant server-side discount validation and calculation.
- [ ] Transparent order summary showing Subtotal, Shipping (Free above ₹999), Discount, and Total in INR.
- [ ] Local storage persistence for guest shoppers and database sync for logged-in users.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.
- [ ] Verify in browser using dev-browser skill.

### US-008: Checkout & Address Handling
**Description:** As a shopper, I want a frictionless checkout supporting guest shopping and Indian address validation so that I can enter my delivery information quickly.
**Acceptance Criteria:**
- [ ] Checkout supports both Guest checkout and authenticated checkout.
- [ ] Indian address form with Full Name, 10-digit mobile number, Email, Address, Landmark, City, State dropdown, and 6-digit PIN code.
- [ ] Address saving to customer profile for logged-in users.
- [ ] Shipping method selection and Cash on Delivery (COD) / Online Payment selection.
- [ ] Server-side validation of all address fields and contact formats.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.
- [ ] Verify in browser using dev-browser skill.

### US-009: Razorpay Payment Gateway & Order Placement
**Description:** As a shopper, I want to securely pay via Razorpay (UPI, Credit/Debit Cards, NetBanking) or choose Cash on Delivery, and receive instant confirmation.
**Acceptance Criteria:**
- [ ] Razorpay server-side order creation (`/api/checkout/razorpay/create-order`).
- [ ] Razorpay checkout SDK integration in frontend.
- [ ] Server-side cryptographic signature verification (`razorpay_signature` HMAC-SHA256) on `/api/checkout/razorpay/verify`.
- [ ] Stock decrement executed within atomic database transaction upon verified payment.
- [ ] COD order placement with instant order creation and inventory decrement.
- [ ] Order confirmation page (`/order-success/[orderId]`) with summary, tracking status, and invoice breakdown.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.

### US-010: Customer Authentication & Account Portal
**Description:** As a customer, I want to register, log in, view my past orders, track deliveries, manage saved addresses, and manage my wishlist.
**Acceptance Criteria:**
- [ ] Secure password authentication with JWT/session cookies, password hashing with bcryptjs.
- [ ] User profile dashboard at `/account` showing order history and status (Processing, Shipped, Delivered, Cancelled).
- [ ] Saved addresses management (Add, Edit, Delete, Set Default).
- [ ] Wishlist sync allowing customers to save favorites and transfer directly to bag.
- [ ] Guest shopping preserved without forced login walls.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.
- [ ] Verify in browser using dev-browser skill.

### US-011: Admin Control Center - Products & Inventory
**Description:** As an admin, I want to create, edit, publish, and delete products, manage size/color variants, and adjust stock quantities in real time.
**Acceptance Criteria:**
- [ ] Admin route `/admin/products` protected by server-side role check (`ADMIN`).
- [ ] Product creation form with title, slug, price, compare-at price, category, fit, description, fabric details, care instructions, and multiple image URLs.
- [ ] Variant manager for sizes (S to XXL, 28 to 36) and colors with individual stock quantities.
- [ ] Low-stock visual alert badges and inventory adjustment logs.
- [ ] Changes immediately reflect on the public storefront without source code edits.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.
- [ ] Verify in browser using dev-browser skill.

### US-012: Admin Control Center - Orders & Fulfillment
**Description:** As an admin, I want to search and filter orders, view customer details, update order fulfillment status, and inspect payments.
**Acceptance Criteria:**
- [ ] Admin route `/admin/orders` displaying all placed orders with status badges (Pending, Paid, Shipped, Delivered, Cancelled).
- [ ] Detailed order view showing customer address, phone, ordered items snapshot, payment ID, and tracking code.
- [ ] Order status updater (Processing -> Shipped -> Delivered) with status timestamp logging.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.
- [ ] Verify in browser using dev-browser skill.

### US-013: Admin Control Center - Marketing, Coupons & Banners
**Description:** As an admin, I want to create discount coupon codes and configure homepage announcement bar and hero banners.
**Acceptance Criteria:**
- [ ] Admin route `/admin/marketing` to create percentage and flat ₹ discount coupons with minimum order value and validity dates.
- [ ] Banner and Announcement Bar management allowing admins to update banner headlines, subtext, CTA links, and announcement texts.
- [ ] Newsletter subscriber list view with export capability.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.
- [ ] Verify in browser using dev-browser skill.

### US-014: Technical SEO & Metadata Optimization
**Description:** As an SEO specialist, I want structured JSON-LD data, dynamic OpenGraph meta tags, canonical URLs, sitemap.xml, and robots.txt so that search engines index all products and collections.
**Acceptance Criteria:**
- [ ] Dynamic meta tags (`title`, `description`, `openGraph`, `twitter`) on all PDPs, collection pages, and homepage.
- [ ] JSON-LD `Product`, `BreadcrumbList`, and `Organization` schemas implemented with truthful pricing and availability data.
- [ ] Dynamic `/sitemap.xml` and `/robots.txt` route handlers.
- [ ] `noindex, nofollow` headers on `/admin/*`, `/account/*`, and `/checkout/*`.
- [ ] Semantic HTML and alt text on all product photography.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.

### US-015: Security Hardening & Rate Limiting
**Description:** As a security engineer, I want rate limiting, input sanitization, CSRF/XSS protection, and strict server-side authorization so that customer data and payments are protected.
**Acceptance Criteria:**
- [ ] Rate limiting on auth endpoints (`/api/auth/*`), search, and checkout creation to mitigate brute force and bot attacks.
- [ ] Zod schema validation on all incoming API payloads.
- [ ] HTTP-only, Secure, SameSite cookies for session tokens.
- [ ] Protection against price tampering: prices and totals calculated strictly on server using database records.
- [ ] Security headers (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] CodeRabbit review passes.

---

## 4. Functional Requirements
- **FR-1:** The platform must display all product pricing in Indian Rupees (₹) with comma formatting (`₹1,499`).
- **FR-2:** The cart calculation must compute subtotal, apply valid coupon codes, add shipping fees (free shipping above ₹999, else ₹99), and compute the final payable amount on the server.
- **FR-3:** Variant selection (size and color) must dynamically update SKU availability. Disabled sizes cannot be added to cart.
- **FR-4:** Indian PIN code checker must validate standard 6-digit Indian PIN codes and provide realistic delivery estimates (e.g., 2-4 business days for metro, 4-7 days for standard).
- **FR-5:** Razorpay payments must generate an order ID on the backend, open the official Razorpay checkout modal, and verify the HMAC-SHA256 signature before marking the order as paid.
- **FR-6:** Cash on Delivery (COD) must be supported as an alternative payment method with an optional configurable COD convenience fee (e.g. ₹50 or Free).
- **FR-7:** Admin dashboard must require credentials with role `ADMIN`. Unauthorized requests must be redirected or rejected with 403 Forbidden.
- **FR-8:** In the database, every order item must store an immutable snapshot of product title, SKU, variant size/color, and purchase price to protect historical accounting against future product updates.

---

## 5. Non-Goals (Out of Scope)
- Multi-currency conversion (USD/EUR) - Phase 1 strictly focuses on India and INR (₹).
- Native iOS/Android app builds - the platform is a high-performance Progressive Web App (PWA) / mobile-first responsive web experience.
- Automated third-party courier warehouse robotics API integration (Shiprocket / Delhivery direct API auto-dispatch can be integrated in Phase 2; admin tracking numbers are supported manually in Phase 1).

---

## 6. Design Considerations
- **Aesthetic:** Editorial high-fashion streetwear. Dark graphite/onyx surfaces `#0B0C10`, crisp off-white `#F5F5F7`, bold accents in Acid Lime `#CCFF00` or Electric Tangerine `#FF4D00`.
- **Typography:** Heavy condensed sans-serif editorial display headings paired with clean, ultra-legible grotesque body fonts.
- **Interactions:** Subtle hover zooms on garment photography, smooth slide-out drawers, tactile size-pill selection, micro-animations on cart additions.
- **Mobile Usability:** Sticky bottom actions ("Add to Bag / ₹1,499") on product pages for effortless one-thumb thumb-zone ordering.

---

## 7. Technical Considerations
- **Framework:** Next.js 14+ (App Router), React 18/19, TypeScript.
- **ORM & DB:** Prisma ORM with SQLite for zero-config immediate local development and seamless migration to PostgreSQL (Supabase/Neon) for production.
- **Payments:** Razorpay SDK (`razorpay` node package + Razorpay standard web checkout).
- **Validation:** Zod schemas shared between client and server actions.
- **State Management:** Zustand for lightweight, persistent cart and wishlist state.

---

## 8. Success Metrics
- 100% of user stories US-001 through US-015 implemented and passing acceptance criteria.
- 0 lint or TypeScript compilation errors.
- Sub-2 second Largest Contentful Paint (LCP) on mobile 4G network simulation.
- Complete end-to-end checkout flow operational with both Razorpay test mode and Cash on Delivery.

---

## 9. Open Questions
- Brand Name choice: Confirming brand naming (e.g., **"KULT FASHION"**, **"VAULT CLOTHING"**, **"OVERRULE"**, or user custom name).
- Razorpay Credentials: Test key mode configuration (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`) vs demo simulated payment mode.
- Shipping threshold: Free shipping threshold default set to ₹999 with standard ₹99 delivery fee for smaller carts.
