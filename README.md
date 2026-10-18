# ONLYCOLLECTION — Haute Streetwear Atelier

![OnlyCollection Brand](https://raw.githubusercontent.com/sam1001-pixel/Onlycollection/main/public/og-image.jpg)

**OnlyCollection** is a high-craft luxury streetwear storefront and e-commerce experience built with Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, and HTML5 Canvas 3D interactive physics.

---

## 🏛️ Brand Essence & Visual Language

- **Monogram**: Architectural minimalist **OC** crest with obsidian base and platinum hairline accents.
- **Palette**: Deep Obsidian `#070709`, Brushed Platinum `#F5F5F7`, Soft Zinc `#A1A1AA`, and Subtle Emerald accents.
- **Philosophy**: 380–450 GSM French Terry, bespoke drop-shoulder tailoring, minimal hyper-tactile geometry.

---

## ✨ Features

- **Orbital 3D Turntable**: Interactive cloth pedestal with real-time mouse/touch drag physics, depth sorting, and direct product detail drawer.
- **Responsive Mobile First UX**: Fluid responsive navigation with spring-animated touch sheet, bottom sticky action bars, and swipe gestures.
- **Dynamic Storefront**:
  - Live inventory tracking & real-time stock indicators.
  - Cart drawer with persistent local storage.
  - Razorpay Online Payments & Cash on Delivery (COD) workflows.
  - Autocomplete coupon system (e.g. `ONLY10`, `STREET20`).
- **Comprehensive Admin Portal**:
  - Protected behind edge middleware with cryptographic session tokens.
  - Dedicated dashboards for Orders, Products, Hero campaigns, Marketing banners, and Social links.
  - Full audit logging and security headers (`X-Frame-Options`, `nosniff`, `Referrer-Policy`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation & Physics**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) with SQLite / PostgreSQL support
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing & Quality**: CodeRabbit AI automated security and code audits

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### 2. Installation
```bash
git clone https://github.com/sam1001-pixel/Onlycollection.git
cd Onlycollection
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="your-secure-secret-key-at-least-32-chars-long"
ADMIN_PASSWORD="radhasolanki"

# Optional Payment Gateway
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your-key-secret"
```

### 4. Database Setup & Seed
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🔐 Administrative Access

The admin management suite is located at `/admin`:

- **Admin Login Route**: `/account`
- **Identifier**: `sujal@rscloth`
- **Password**: `radhasolanki`

*Note: All admin paths (`/admin/*` and `/api/admin/*`) are strictly enforced via Next.js Edge Middleware (`src/middleware.ts`).*

---

## 📦 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com/):

```bash
npm run build
```

---

## 📄 License & Rights

© 2026 OnlyCollection Atelier India Pvt. Ltd. All rights reserved.
