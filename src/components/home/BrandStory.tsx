"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BrandStory() {
  const pillars = [
    {
      stat: "380 GSM",
      title: "Royal French Terry",
      desc: "Substantial architectural drape that holds its regal silhouette in any climate without clinging.",
    },
    {
      stat: "100%",
      title: "Long-Staple Indian Cotton",
      desc: "Lustrous combed fibers, biowashed with organic natural enzymes for timeless silk-soft endurance.",
    },
    {
      stat: "JODHPUR",
      title: "Marwar Atelier Craftsmanship",
      desc: "Hand-finished twin-needle hems and antique brass hardware inspired by royal Mehrangarh armories.",
    },
    {
      stat: "14.5 OZ",
      title: "Selvedge Heritage Denim",
      desc: "Custom loomed puddle denim tailored with contemporary volume over luxury sneakers and juttis.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#09090B] border-y border-zinc-800/80 relative overflow-hidden">
      {/* Decorative ambient subtle glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-300">
                RAJASTHANI TEXTILE LEGACY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-[1.1] tracking-tight">
              Where Imperial Rajputana Heritage Meets Modern Streetwear Armor.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              Mainstream commercial fast fashion cuts corners with flimsy 160 GSM synthetic blends that collapse after one wash. OnlyCollection Atelier revives the regal dignity of Marwar court craftsmanship: 380 GSM loopback cotton, hand-finished silhouettes, and antique brass details built to last generations.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Custom Boxy Drop-Shoulder Patterns</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Heavyweight Antique Brass Hardware</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Organic Enzyme Bio-Washed Fabrics</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Insured Express Delivery Across India</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/about">
                <Button className="bg-white hover:bg-zinc-200 text-black font-sans text-xs uppercase tracking-widest px-6 py-6 font-bold flex items-center space-x-2 shadow-sm rounded-none transition-all border border-transparent">
                  <span>Explore The Marwar Manifesto</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2 text-xs text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-zinc-300" />
                <span>7-Day Hassle-Free Royal Exchanges</span>
              </div>
            </div>
          </div>

          {/* Right Spec Cards & Atelier Imagery */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="p-5 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all rounded-none shadow-xs group"
                >
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums block group-hover:text-zinc-200 transition-colors">
                    {p.stat}
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mt-1 font-sans">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-snug font-sans">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative aspect-[16/9] w-full bg-zinc-950 border border-zinc-800 overflow-hidden rounded-none shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop"
                alt="Marwar Atelier Textile Craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-sans font-medium uppercase tracking-widest text-white">
                <span className="bg-zinc-900/90 backdrop-blur-md px-3 py-1 border border-zinc-800 text-zinc-300">
                  KNITTED & TAILORED IN JODHPUR, MARWAR // INDIA
                </span>
                <span className="text-white font-bold">100% PRE-SHRUNK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
