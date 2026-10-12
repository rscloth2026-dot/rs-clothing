# Project: Premium Gen-Z Men's Fashion E-Commerce Platform

## Vision
A premier, high-fashion streetwear e-commerce platform for Indian Gen-Z men. Combining the merchandising and checkout excellence of leading D2C brands (such as The Souled Store) with an original, dark editorial high-fashion aesthetic ("YOUR FIT. YOUR RULES.").

## Target Market & Specifications
- **Geography:** India
- **Currency:** INR (₹)
- **Sizing:** Indian clothing standards (S, M, L, XL, XXL for Tops; 28, 30, 32, 34, 36 for Denim)
- **Address & Delivery:** Standard Indian address hierarchy (Full Name, 10-digit mobile, Landmark, City, State, 6-digit PIN code) with PIN code delivery estimates
- **Core Collections:** Oversized T-Shirts, Graphic Tees, Heavyweight Essentials, Baggy Jeans, Straight-Fit Jeans, Relaxed Denim, and "Shop the Look" outfit sets
- **Payments:** Razorpay (UPI, Cards, NetBanking) + Cash on Delivery (COD)

## Architecture & Technology
- **Framework:** Next.js 14+ (App Router, Server Actions, API Routes)
- **Language:** TypeScript
- **Styling & UI:** Tailwind CSS, Lucide React, Radix UI / shadcn/ui
- **Database & ORM:** Prisma ORM with SQLite (immediate zero-config local environment, seamless migration to PostgreSQL/Neon)
- **Authentication:** Custom JWT/Session Auth with bcryptjs & HTTP-only cookies
- **Payment Gateway:** Razorpay SDK + Server-side HMAC-SHA256 signature verification
- **Quality Gates:** CodeRabbit AI review, automated typechecks, and unit/integration tests
