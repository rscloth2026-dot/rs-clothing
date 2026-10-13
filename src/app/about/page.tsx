import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF7] py-16 lg:py-24 text-[#1C1917] font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 pb-8 border-b border-[#E7E2D9]">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E]">
              ORIGINS & ATELIER ETHOS
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
            The Marwar Manifesto
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] max-w-xl mx-auto leading-relaxed">
            Born in the blue city of Jodhpur, the historic capital of Marwar. Crafted to merge imperial Rajput dignity with uncompromising heavyweight contemporary streetwear armor.
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full bg-[#FFFFFF] border border-[#E7E2D9] rounded-sm overflow-hidden shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop"
            alt="RS Clothing Jodhpur Rajasthan Streetwear Philosophy"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-8 text-sm text-[#57534E] leading-relaxed">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase text-[#1C1917]">
              1. Why 380 GSM Heavyweight French Terry
            </h2>
            <p className="mt-2 text-[#57534E] leading-relaxed">
              Standard commercial retail brands in India utilize 140 to 180 GSM cotton because it&apos;s inexpensive to knit and easy to ship. But lightweight fabric clings, loses shape, and collapses after a few washes. At RS Clothing Atelier, our benchmark standard is 380 GSM combed long-staple French Terry cotton. The substantial weight creates an unapologetic architectural boxy drape that hangs cleanly off the shoulders without sagging.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase text-[#1C1917]">
              2. Jodhpur Court Craftsmanship & Mehrangarh Heritage
            </h2>
            <p className="mt-2 text-[#57534E] leading-relaxed">
              Rooted in Jodhpur, our silhouettes celebrate the craftsmanship legacy of Marwar: custom antique brass hardware inspired by Mehrangarh armories, reinforced twin-needle collars, and non-stretch 14.5oz ring-spun denim that puddles effortlessly over sneakers. Every garment is pre-shrunk with natural enzyme bio-washes for a silk-soft hand feel that lasts generations.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E7E2D9] rounded-sm text-center space-y-4 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-serif font-bold uppercase text-[#1C1917]">
            Experience The Royal Collection
          </h3>
          <p className="text-xs text-[#78716C] max-w-md mx-auto">
            Limited drops released directly from our Jodhpur workshop with complimentary BlueDart Air delivery nationwide.
          </p>
          <Link href="/collections/all" className="inline-block pt-2">
            <Button className="bg-[#8B1E1E] hover:bg-[#6B1414] text-white font-bold h-12 px-8 text-xs uppercase tracking-wider rounded-sm shadow-sm">
              <span>Explore The Full Catalog</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
