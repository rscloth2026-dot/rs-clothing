"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Compass, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";

const HERO_SLIDES = [
  {
    id: "01",
    tag: "ROYAL DROP 01 // 380 GSM ATELIER EDITION",
    title: "RAJPUTANA",
    subtitle: "STREETWEAR.",
    description: "Architectural boxy drape crafted from 380 GSM combed French Terry cotton. Hand-treated vegetable dye accents fused with modern skate culture.",
    ctaText: "Explore Oversized Tees",
    ctaLink: "/collections/oversized-tees",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=85&w=1400&auto=format&fit=crop",
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
    description: "Wide-leg puddle drape pooling over luxury kicks. Non-stretch Japanese ring-spun denim tailored with copper rivets in Rajasthan.",
    ctaText: "Shop Baggy Denim",
    ctaLink: "/collections/baggy-jeans",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=85&w=1400&auto=format&fit=crop",
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
    description: "Tactile high-density embroidery and rubber typographic backprints with anti-sag double-ribbed collar architecture.",
    ctaText: "Shop Graphic Tees",
    ctaLink: "/collections/graphic-tees",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=85&w=1400&auto=format&fit=crop",
    metric1: "260 GSM",
    metric1Sub: "Compact Cotton",
    metric2: "100%",
    metric2Sub: "Bio-Washed",
  },
];

export function HeroCampaign() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full bg-[#FDFCF7] overflow-hidden border-b border-[#E7E2D9]">
      {/* Hero Card Container */}
      <div className="relative w-full min-h-[82vh] sm:min-h-[88vh] lg:min-h-[90vh] flex flex-col justify-end">
        {/* Editorial Background Image with Light Scrim */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top sm:object-center transition-all duration-1000 ease-out"
          />
          {/* Multi-layer warm white sandstone gradient for pristine readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF7] via-[#FDFCF7]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF7]/60 via-transparent to-transparent h-24" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#FDFCF7]/90 via-[#FDFCF7]/50 to-transparent w-3/4" />
        </div>

        {/* Skiper39 Animated Canvas Crowd — Urban Streetwear Runway */}
        <div className="absolute inset-x-0 bottom-0 z-[5] pointer-events-none overflow-hidden h-[45vh] sm:h-[55vh] md:h-[62vh] opacity-80 sm:opacity-90">
          <CrowdCanvas
            src="/images/peeps/all-peeps.png"
            rows={15}
            cols={7}
            className="w-full h-full"
          />
          {/* Subtle bottom fade to blend with courtyard floor */}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#FDFCF7] via-[#FDFCF7]/80 to-transparent pointer-events-none" />
        </div>

        {/* Floating Slide Switcher & Runway Indicator (Top Right) */}
        <div className="absolute top-6 right-6 z-20 flex items-center space-x-2">
          <div className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 bg-white/90 backdrop-blur-md border border-[#C5A059]/40 rounded-full shadow-sm text-[10px] font-sans font-semibold tracking-wider text-[#8B1E1E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] animate-ping" />
            <span className="uppercase tracking-widest text-[9px]">Live Street Runway</span>
          </div>

          <div className="flex items-center space-x-1.5 p-1 bg-white/90 backdrop-blur-md border border-[#E7E2D9] rounded-full shadow-sm">
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
                {s.id}
              </button>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 pt-28 sm:pt-36 w-full">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            {/* Live Drop Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/90 border border-[#C5A059]/60 text-[#8B1E1E] text-[10px] font-sans font-bold uppercase tracking-[0.2em] rounded-full shadow-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] animate-pulse" />
              <span>{slide.tag}</span>
            </div>

            {/* Regal Cormorant Garamond Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#1C1917] font-serif leading-[0.95]">
              {slide.title}<br />
              <span className="text-[#8B1E1E] italic font-normal">{slide.subtitle}</span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-[#57534E] font-normal max-w-lg leading-relaxed line-clamp-3 sm:line-clamp-none font-sans">
              {slide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href={slide.ctaLink} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 min-h-[48px] bg-[#8B1E1E] text-white hover:bg-[#721818] font-bold uppercase tracking-wider text-xs px-8 rounded-[2px] shadow-sm transition-transform flex items-center justify-center space-x-2"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <Link href="/collections/all" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 min-h-[48px] border-[#E7E2D9] bg-white/90 text-[#1C1917] hover:border-[#C5A059] font-bold uppercase tracking-wider text-xs px-6 rounded-[2px] shadow-sm"
                >
                  <span>View All Royal Drops</span>
                </Button>
              </Link>
            </div>

            {/* Quality Specs Grid */}
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
