"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, SlidersHorizontal, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressiveBlur, TextRoll } from "@/components/ui/skiper-ui";
import { RsLogo } from "@/components/brand/RsLogo";
import { FloatingGarmentItem } from "@/components/home/FloatingGarment";
import { CircularFloatingCanvas } from "@/components/home/CircularFloatingCanvas";
import { ClothBuyDrawer, ClothBuyProduct } from "@/components/product/ClothBuyDrawer";

// Default curated floating clothes configuration mapped to real store products
const DEFAULT_FLOATING_GARMENTS: FloatingGarmentItem[] = [
  {
    id: "float-hoodie",
    name: "Marwar Heavyweight Zip Hoodie",
    imageUrl: "/images/hero/hoodie-heavyweight.png",
    price: 3499,
    comparePrice: 4999,
    category: "Hoodies & Outerwear",
    productId: "marwar-heavyweight-zip-hoodie",
    initialX: 74,
    initialY: 10,
    mobileX: 68,
    mobileY: 8,
    sizeDesktop: 195,
    sizeMobile: 90,
    speedSeconds: 7.2,
    maxRotationDeg: 4,
    driftX: 20,
    driftY: 26,
    delaySeconds: 0,
    zIndex: 15,
    isEnabled: true,
  },
  {
    id: "float-jacket",
    name: "Rajputana Cyber Bomber Jacket",
    imageUrl: "/images/hero/jacket-cyber-bomber.png",
    price: 4999,
    comparePrice: 6999,
    category: "Hoodies & Outerwear",
    productId: "rajputana-cyber-bomber-jacket",
    initialX: 50,
    initialY: 12,
    mobileX: 38,
    mobileY: 6,
    sizeDesktop: 190,
    sizeMobile: 80,
    speedSeconds: 9.1,
    maxRotationDeg: -3,
    driftX: 18,
    driftY: 22,
    delaySeconds: 0.4,
    zIndex: 14,
    isEnabled: true,
  },
  {
    id: "float-sneakers",
    name: "Jodhpur Chunky Runner Sneakers",
    imageUrl: "/images/hero/sneakers-chunky-runner.png",
    price: 5499,
    comparePrice: 7999,
    category: "Footwear & Accessories",
    productId: "jodhpur-chunky-runner-sneakers",
    initialX: 82,
    initialY: 40,
    mobileX: 74,
    mobileY: 36,
    sizeDesktop: 175,
    sizeMobile: 85,
    speedSeconds: 8.4,
    maxRotationDeg: -5,
    driftX: 22,
    driftY: 28,
    delaySeconds: 0.8,
    zIndex: 16,
    isEnabled: true,
  },
  {
    id: "float-tee",
    name: "Acid Cyber Heavyweight Tee",
    imageUrl: "/images/hero/tshirt-oversized.png",
    price: 1499,
    comparePrice: 2199,
    category: "Oversized Tees",
    productId: "acid-cyber-oversized-heavyweight-tee",
    initialX: 68,
    initialY: 66,
    mobileX: 64,
    mobileY: 72,
    sizeDesktop: 165,
    sizeMobile: 80,
    speedSeconds: 6.8,
    maxRotationDeg: -4,
    driftX: 16,
    driftY: 20,
    delaySeconds: 1.2,
    zIndex: 17,
    isEnabled: true,
  },
  {
    id: "float-jeans",
    name: "Tokyo Skate Baggy Puddle Jeans",
    imageUrl: "/images/hero/jeans-baggy-puddle.png",
    price: 2799,
    comparePrice: 3899,
    category: "Baggy Jeans",
    productId: "tokyo-skate-90s-baggy-puddle-jeans",
    initialX: 8,
    initialY: 8,
    mobileX: 4,
    mobileY: 6,
    sizeDesktop: 155,
    sizeMobile: 75,
    speedSeconds: 7.9,
    maxRotationDeg: 5,
    driftX: 19,
    driftY: 24,
    delaySeconds: 0.6,
    zIndex: 12,
    isEnabled: true,
  },
  {
    id: "float-cap",
    name: "Royal RS Monogram Cap",
    imageUrl: "/images/hero/cap-royal-rajputana.png",
    price: 1299,
    comparePrice: 1999,
    category: "Footwear & Accessories",
    productId: "royal-rs-monogram-streetwear-cap",
    initialX: 36,
    initialY: 30,
    mobileX: 8,
    mobileY: 34,
    sizeDesktop: 140,
    sizeMobile: 70,
    speedSeconds: 6.4,
    maxRotationDeg: -6,
    driftX: 15,
    driftY: 18,
    delaySeconds: 1.5,
    zIndex: 13,
    isEnabled: true,
  },
];

const HERO_SLIDES = [
  {
    id: "01",
    tag: "ROYAL DROP 01 // 380 GSM ATELIER EDITION",
    title: "RAJPUTANA",
    subtitle: "STREETWEAR.",
    description:
      "Architectural boxy drape crafted from 380 GSM combed French Terry cotton. Hand-treated vegetable dye accents fused with modern skate culture.",
    ctaText: "Explore Oversized Tees",
    ctaLink: "/collections/oversized-tees",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=85&w=1400&auto=format&fit=crop",
    metric1: "380 GSM",
    metric1Sub: "French Terry",
    metric2: "14.5 OZ",
    metric2Sub: "Raw Selvedge",
  },
  {
    id: "02",
    tag: "ROYAL DROP 02 // ARCHIVAL SKATE CUT",
    title: "MARWAR",
    subtitle: "PUDDLE DENIM.",
    description:
      "Wide-leg puddle drape pooling over luxury kicks. Non-stretch Japanese ring-spun denim tailored with copper rivets in Rajasthan.",
    ctaText: "Shop Baggy Denim",
    ctaLink: "/collections/baggy-jeans",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=85&w=1400&auto=format&fit=crop",
    metric1: "14.5 OZ",
    metric1Sub: "Rigid Selvedge",
    metric2: "4.9/5",
    metric2Sub: "Fit Rating",
  },
  {
    id: "03",
    tag: "ROYAL DROP 03 // ARTISANAL GRAPHIC CUT",
    title: "JODHPUR",
    subtitle: "GRAPHIC DROPS.",
    description:
      "Tactile high-density embroidery and rubber typographic backprints with anti-sag double-ribbed collar architecture.",
    ctaText: "Shop Graphic Tees",
    ctaLink: "/collections/graphic-tees",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=85&w=1400&auto=format&fit=crop",
    metric1: "260 GSM",
    metric1Sub: "Compact Cotton",
    metric2: "100%",
    metric2Sub: "Bio-Washed",
  },
];

export function HeroCampaign({
  initialGarments,
}: {
  initialGarments?: FloatingGarmentItem[] | null;
} = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [floatingGarments, setFloatingGarments] = useState<FloatingGarmentItem[]>(
    Array.isArray(initialGarments) ? initialGarments : DEFAULT_FLOATING_GARMENTS
  );
  const [isMobile, setIsMobile] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ClothBuyProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const latestSelectionRef = useRef<string | null>(null);

  // Responsive mobile screen detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  // Garment click handler: opens QuickViewModal with full product details
  const handleSelectGarment = async (garment: any) => {
    const productSlug = garment.productId || garment.slug || garment.id;
    const currentSelectionId = `${productSlug}-${Date.now()}`;
    latestSelectionRef.current = currentSelectionId;

    const garmentName =
      typeof garment.name === "string" ? garment.name.trim().toLowerCase() : "";

    try {
      // Fetch full product record with variants and gallery
      const res = await fetch(`/api/admin/products`);
      if (res.ok) {
        const data = await res.json();
        // Ignore stale async response if another garment was clicked in the meantime
        if (latestSelectionRef.current !== currentSelectionId) return;

        const found = data.products?.find(
          (p: any) =>
            p.slug === productSlug ||
            p.id === productSlug ||
            (garmentName !== "" && p.title?.toLowerCase().includes(garmentName))
        );

        if (found) {
          setQuickViewProduct({
            id: found.id,
            title: found.title,
            slug: found.slug,
            description: found.description,
            fabricDetails: found.fabricDetails,
            fit: found.fit,
            basePrice: found.basePrice,
            comparePrice: found.comparePrice,
            categoryName: found.category?.name,
            images: found.images || [{ url: garment.imageUrl }],
            variants: found.variants || [],
          });
          setIsQuickViewOpen(true);
          return;
        }
      }
    } catch (e) {
      console.error("QuickView fetch error", e);
    }

    // Ignore stale fallback if a newer selection occurred
    if (latestSelectionRef.current !== currentSelectionId) return;

    // Non-purchasable preview when product variants could not be resolved from DB
    setQuickViewProduct({
      id: garment.id || "preview-id",
      title: garment.name,
      slug: garment.productId || "collections/all",
      description: "Authentic luxury streetwear garment handcrafted in Jodhpur with 380+ GSM combed cotton.",
      fit: "Oversized Boxy",
      basePrice: garment.price,
      comparePrice: garment.comparePrice,
      categoryName: garment.category || "ROYAL ATELIER",
      images: [{ url: garment.imageUrl, altText: garment.name }],
      variants: [], // Empty variants: view full details on product page
    });
    setIsQuickViewOpen(true);
  };


  // Filter enabled garments
  const activeGarments = floatingGarments.filter((g) => g.isEnabled !== false);

  return (
    <section className="relative w-full bg-[#090A0F] overflow-hidden border-b border-[#1E2230]">
      {/* Hero Card Container */}
      <div className="relative w-full min-h-[86vh] sm:min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-end">
        {/* Editorial Background Image with Smooth Crossfade */}
        <div className="absolute inset-0 z-0 select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-top sm:object-center grayscale-[30%] contrast-[1.10] opacity-40"
              />
            </motion.div>
          </AnimatePresence>

          {/* Editorial Atelier gradients for sharp typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/85 to-transparent" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#090A0F]/95 via-[#090A0F]/60 to-transparent w-3/4" />

          {/* Subtle Ambient Cyber Volt & Gold Lighting Accents */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4FF00]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-24 w-80 h-80 bg-[#FBBF24]/8 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Skiper-UI: Progressive Blur Overlays for Depth and Polish */}
        <ProgressiveBlur
          position="top"
          backgroundColor="#090A0F"
          height="110px"
          blurAmount="10px"
          className="z-[2]"
        />
        <ProgressiveBlur
          position="bottom"
          backgroundColor="#090A0F"
          height="140px"
          blurAmount="12px"
          className="z-[2]"
        />

        {/* ========================================================================= */}
        {/* 3D CIRCULAR / ORBITAL REVOLVING CLOTHES CANVAS */}
        {/* ========================================================================= */}
        <CircularFloatingCanvas
          garments={activeGarments}
          onSelect={handleSelectGarment}
          isMobile={isMobile}
        />

        {/* Interactive Floating Hint Pill */}
        <div className="absolute top-24 left-4 sm:left-8 z-20 hidden sm:flex items-center space-x-2 px-3 py-1 bg-[#12141D]/90 backdrop-blur-md border border-[#1E2230] text-[10px] font-sans text-[#94A3B8] uppercase tracking-widest shadow-xs">
          <Sparkles className="w-3 h-3 text-[#D4FF00]" />
          <span>Click any revolving cloth to open Buy Section</span>
        </div>

        {/* Top Controls: Slide Switcher */}
        <div className="absolute top-6 right-4 sm:right-8 z-20 flex items-center space-x-2">
          <div className="flex items-center space-x-1 p-1 bg-[#12141D]/90 backdrop-blur-md border border-[#1E2230] rounded-full shadow-sm">
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              className="p-1 rounded-full text-[#94A3B8] hover:text-[#D4FF00] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold transition-all ${
                  currentSlide === idx
                    ? "bg-[#D4FF00] text-black shadow-xs font-black"
                    : "text-[#94A3B8] hover:text-[#D4FF00]"
                }`}
                aria-label={`Switch to slide ${s.id}`}
              >
                <span>{s.id}</span>
              </button>
            ))}

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="p-1 rounded-full text-[#94A3B8] hover:text-[#D4FF00] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HERO EDITORIAL CONTENT & HEADLINE (Safe Zone — Unobstructed Center & Left) */}
        {/* ========================================================================= */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 pt-28 sm:pt-36 w-full pointer-events-auto">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            {/* Bespoke Royal RS Monogram Emblem in Hero */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-1"
            >
              <RsLogo size="md" variant="full" />
            </motion.div>

            {/* Live Drop Pill */}
            <motion.div
              key={`tag-${slide.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 bg-[#12141D]/90 border border-[#D4FF00]/40 text-[#F8FAFC] text-[10px] font-sans font-bold uppercase tracking-[0.2em] rounded-full shadow-xs backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse shadow-[0_0_8px_#D4FF00]" />
              <span className="text-[#D4FF00] font-bold">ROYAL ATELIER</span>
              <span className="text-[#475569]">•</span>
              <span className="text-[#F8FAFC]">
                {slide.tag
                  .replace("ROYAL DROP 01 // ", "")
                  .replace("ROYAL DROP 02 // ", "")
                  .replace("ROYAL DROP 03 // ", "")}
              </span>
            </motion.div>

            {/* Regal Cormorant Garamond Headline */}
            <motion.h1
              key={`title-${slide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white font-serif leading-[1.1] sm:leading-[1.05]"
            >
              {slide.title}
              <br />
              <span className="text-[#D4FF00] italic font-normal">{slide.subtitle}</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              key={`desc-${slide.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm text-[#94A3B8] font-normal max-w-lg leading-relaxed line-clamp-3 sm:line-clamp-none font-sans"
            >
              {slide.description}
            </motion.p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href={slide.ctaLink} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 min-h-[48px] bg-[#D4FF00] hover:bg-[#BCE600] text-black font-black uppercase tracking-wider text-xs px-8 rounded-none shadow-lg shadow-[#D4FF00]/15 transition-all flex items-center justify-center space-x-2 active:scale-[0.98] border border-transparent"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-black" />
                </Button>
              </Link>

              <Link href="/collections/all" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 min-h-[48px] border-[#1E2230] bg-[#12141D] text-white hover:border-[#D4FF00] hover:text-[#D4FF00] hover:bg-[#161824] font-bold uppercase tracking-wider text-xs px-6 rounded-none shadow-sm active:scale-[0.98]"
                >
                  <span>View All Royal Drops</span>
                </Button>
              </Link>
            </div>

            {/* Quality Specs Grid with Color-Coded Accents */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1E2230] max-w-md">
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-bold text-[#D4FF00] tabular-nums">
                  {slide.metric1}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#94A3B8]">
                  {slide.metric1Sub}
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-bold text-[#FBBF24] tabular-nums">
                  {slide.metric2}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#94A3B8]">
                  {slide.metric2Sub}
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="block text-xl sm:text-2xl font-serif font-bold text-white">
                  JODHPUR
                </span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4FF00] font-bold">
                  Atelier Origin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Conversion Cloth Buy Drawer */}
      <ClothBuyDrawer
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </section>
  );
}
