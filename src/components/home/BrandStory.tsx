"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BrandStory() {
  const pillars = [
    {
      stat: "240+ GSM",
      title: "Heavyweight French Terry",
      desc: "Zero cling. Heavy drape that holds its boxy architectural shape throughout the humid Indian climate.",
    },
    {
      stat: "100%",
      title: "Combed Ring-Spun Cotton",
      desc: "Pure long-staple cotton fibers biowashed and pre-shrunk for an ultra-soft feel that never piles or fades.",
    },
    {
      stat: "0% SAG",
      title: "Reinforced 1x1 Rib Collar",
      desc: "Double-needle cover stitched collar engineered to stay crisp even after 100+ machine washes.",
    },
    {
      stat: "14 OZ",
      title: "Rigid Streetwear Denim",
      desc: "Authentic heavyweight raw and stone-washed denim cut with skate puddling volume over sneakers.",
    },
  ];

  return (
    <section className="py-24 bg-onyx-900 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
              BRAND MANIFESTO
            </span>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-editorial leading-tight">
              WE DON&apos;T DO FAST FASHION<span className="text-volt">.</span><br />
              WE BUILD HEAVYWEIGHT ARMOR<span className="text-volt">.</span>
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Mainstream Indian fashion brands cut corners with paper-thin 160 GSM blends that lose their shape in two washes. KULT was founded in Bengaluru and New Delhi to dismantle that cycle. We engineer oversized garments with unapologetic weight, relaxed streetwear drape, and military-grade durability.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-volt flex-shrink-0" />
                <span>Custom Drop-Shoulder Patterns</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-volt flex-shrink-0" />
                <span>Deep Pockets Built for Big Phones</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-volt flex-shrink-0" />
                <span>Chemical-Free Organic Enzyme Washes</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-volt flex-shrink-0" />
                <span>Pan-India BlueDart Express Logistics</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/about">
                <Button variant="outline" className="font-extrabold flex items-center space-x-2">
                  <span>Read The Full Manifesto</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image & Spec Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="p-5 bg-onyx-950 border border-border/80 hover:border-volt/50 transition-colors"
                >
                  <span className="text-2xl sm:text-3xl font-black font-editorial text-volt tabular-nums">
                    {p.stat}
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mt-1">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative aspect-[16/9] w-full bg-onyx-800 border border-border overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop"
                alt="Streetwear Textile Craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-widest text-volt">
                PROUDLY SOURCED & KNITTED IN TIRUPPUR & SURAT, INDIA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
