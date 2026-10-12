"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCampaign() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-onyx-950 flex flex-col justify-end overflow-hidden border-b border-border">
      {/* Background Editorial Visual with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop"
          alt="KULT Editorial Streetwear Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-55 scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Editorial Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx-950/80 via-transparent to-onyx-950/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Campaign Drop Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-volt text-black text-[11px] font-mono font-black uppercase tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.4)]">
            <Flame className="w-3.5 h-3.5 fill-black" />
            <span>DROP 01 // OVERRULE THE MAINSTREAM</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white font-editorial leading-[0.9]">
            YOUR FIT<span className="text-volt">.</span><br />
            YOUR RULES<span className="text-volt">.</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-muted-foreground/90 font-medium max-w-xl leading-relaxed">
            Engineered 240+ GSM drop-shoulder boxy silhouettes and 14oz puddle denim tailored for the Indian streetwear culture. No compromise on drape or density.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/collections/oversized-tees">
              <Button size="lg" className="group font-extrabold flex items-center space-x-2">
                <span>Shop Oversized Tees</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/collections/baggy-jeans">
              <Button size="lg" variant="secondary" className="group font-extrabold flex items-center space-x-2">
                <span>Explore Baggy Denim</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee Banner Ticker */}
      <div className="relative z-10 border-t border-border/80 bg-onyx-900/90 backdrop-blur-md py-3 overflow-hidden select-none">
        <div className="flex items-center space-x-10 whitespace-nowrap text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
          <span className="flex items-center space-x-2 text-white">
            <Sparkles className="w-3.5 h-3.5 text-volt" />
            <span>100% COMBED FRENCH TERRY COTTON</span>
          </span>
          <span>•</span>
          <span className="text-volt">FREE BLUEDART AIR SHIPPING ABOVE ₹999</span>
          <span>•</span>
          <span className="flex items-center space-x-2 text-white">
            <Shield className="w-3.5 h-3.5 text-volt" />
            <span>ANTI-SAG COLLAR ARCHITECTURE</span>
          </span>
          <span>•</span>
          <span>7-DAY DOORSTEP EXCHANGE ACROSS INDIA</span>
          <span>•</span>
          <span className="text-volt">CASH ON DELIVERY & UPI ACCEPTED</span>
        </div>
      </div>
    </section>
  );
}
