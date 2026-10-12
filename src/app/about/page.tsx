import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-onyx-950 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 pb-8 border-b border-border">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
            ORIGINS & ETHOS
          </span>
          <h1 className="text-4xl sm:text-7xl font-black uppercase text-white font-editorial tracking-tight">
            THE KULT MANIFESTO
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Born from a frustration with flimsy fast fashion. Built to forge structural armor for India&apos;s youth.
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full bg-onyx-900 border border-border overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop"
            alt="KULT Streetwear Philosophy"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-2xl font-black uppercase text-white font-editorial">
            1. Why 240+ GSM Matters
          </h2>
          <p>
            Standard high-street retail brands in India utilize 140 to 180 GSM cotton because it&apos;s inexpensive to knit and easy to ship. But lightweight fabric clings to the body and turns limp within a few wash cycles. At KULT, our base layer standard is 240 GSM combed compact cotton. The extra weight gives our tees their signature architectural boxy drape that hangs cleanly off the shoulders without collapsing.
          </p>

          <h2 className="text-2xl font-black uppercase text-white font-editorial pt-4">
            2. The Skate Puddle Silhouette
          </h2>
          <p>
            Denim shouldn&apos;t restrict motion. Our jeans are designed with deep rises, roomy thighs, and wide leg hems calculated to puddle naturally above modern sneaker profiles. We use 14oz non-stretch ring-spun cotton that only gets better with age.
          </p>
        </div>

        <div className="p-8 bg-onyx-900 border border-border text-center space-y-4">
          <h3 className="text-xl font-black uppercase text-white font-editorial">
            JOIN THE STREETWEAR MOVEMENT
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Experience our Drop 01 collections with free express delivery across India.
          </p>
          <Link href="/collections/all" className="inline-block pt-2">
            <Button size="lg" className="font-black">
              <span>Explore The Full Catalog</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
