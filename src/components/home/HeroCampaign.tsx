"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressiveBlur, TextRoll, CssArrowLink } from "@/components/ui/skiper-ui";

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

export function HeroCampaign() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  // Mobile Swipe Gesture Handlers
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }
  };

  return (
    <section
      className="relative w-full bg-[#FDFCF7] overflow-hidden border-b border-[#E7E2D9]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Hero Card Container */}
      <div className="relative w-full min-h-[84vh] sm:min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-end">
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
                className="object-cover object-top sm:object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Sandstone gradients for impeccable typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF7] via-[#FDFCF7]/80 to-transparent" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#FDFCF7]/95 via-[#FDFCF7]/60 to-transparent w-3/4" />
        </div>

        {/* Skiper-UI 41: Progressive Blur Overlays for Depth and Polish */}
        <ProgressiveBlur
          position="top"
          backgroundColor="#FDFCF7"
          height="110px"
          blurAmount="10px"
          className="z-[2]"
        />
        <ProgressiveBlur
          position="bottom"
          backgroundColor="#FDFCF7"
          height="140px"
          blurAmount="12px"
          className="z-[2]"
        />

        {/* Top Controls: Slide Switcher & Quick Navigation */}
        <div className="absolute top-6 right-4 sm:right-8 z-20 flex items-center space-x-2">
          {/* Mobile slide swipe helper indicator */}
          <div className="flex items-center space-x-1 p-1 bg-white/95 backdrop-blur-md border border-[#E7E2D9] rounded-full shadow-sm">
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              className="p-1 rounded-full text-[#78716C] hover:text-[#1C1917] transition-colors"
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
                    ? "bg-[#8B1E1E] text-white shadow-sm"
                    : "text-[#78716C] hover:text-[#1C1917]"
                }`}
                aria-label={`Switch to slide ${s.id}`}
              >
                <TextRoll active={currentSlide === idx}>{s.id}</TextRoll>
              </button>
            ))}

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="p-1 rounded-full text-[#78716C] hover:text-[#1C1917] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 pt-28 sm:pt-36 w-full">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            {/* Live Drop Pill */}
            <motion.div
              key={`tag-${slide.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/95 border border-[#C5A059]/60 text-[#8B1E1E] text-[10px] font-sans font-bold uppercase tracking-[0.2em] rounded-full shadow-sm backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] animate-pulse" />
              <span>{slide.tag}</span>
            </motion.div>

            {/* Regal Cormorant Garamond Headline */}
            <motion.h1
              key={`title-${slide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#1C1917] font-serif leading-[0.95]"
            >
              {slide.title}
              <br />
              <span className="text-[#8B1E1E] italic font-normal">{slide.subtitle}</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              key={`desc-${slide.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm text-[#57534E] font-normal max-w-lg leading-relaxed line-clamp-3 sm:line-clamp-none font-sans"
            >
              {slide.description}
            </motion.p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href={slide.ctaLink} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 min-h-[48px] bg-[#8B1E1E] text-white hover:bg-[#721818] font-bold uppercase tracking-wider text-xs px-8 rounded-[2px] shadow-sm transition-transform flex items-center justify-center space-x-2 rajasthan-btn-shimmer active:scale-[0.97]"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <Link href="/collections/all" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 min-h-[48px] border-[#E7E2D9] bg-white/95 text-[#1C1917] hover:border-[#C5A059] font-bold uppercase tracking-wider text-xs px-6 rounded-[2px] shadow-sm active:scale-[0.97]"
                >
                  <TextRoll>View All Royal Drops</TextRoll>
                </Button>
              </Link>
            </div>

            {/* Quality Specs Grid with Skiper-UI Micro-Interactions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E7E2D9]/80 max-w-md">
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-bold text-[#1C1917] tabular-nums">
                  {slide.metric1}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#78716C]">
                  {slide.metric1Sub}
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-bold text-[#8B1E1E] tabular-nums">
                  {slide.metric2}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#78716C]">
                  {slide.metric2Sub}
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="block text-xl sm:text-2xl font-serif font-bold text-[#C5A059]">
                  JODHPUR
                </span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#78716C]">
                  Atelier Origin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
