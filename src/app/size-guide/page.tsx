import React from "react";
import Link from "next/link";
import { Ruler, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-onyx-950 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 pb-8 border-b border-border">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
            PRECISION FIT METRICS
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-editorial tracking-tight">
            INDIAN SIZE GUIDE
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
            Our garments are engineered with genuine <strong>oversized drop-shoulder</strong> and <strong>skate-puddle denim silhouettes</strong>.
          </p>
        </div>

        {/* Section 1: Tops */}
        <div className="p-6 sm:p-8 bg-onyx-900 border border-border space-y-6">
          <div className="flex items-center space-x-2 text-volt">
            <Ruler className="w-5 h-5" />
            <h2 className="text-xl font-black uppercase text-white font-editorial">
              Tops: Oversized & Essential Tees (Inches)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="bg-onyx-800 text-volt border-b border-border">
                  <th className="p-3">SIZE</th>
                  <th className="p-3">CHEST</th>
                  <th className="p-3">LENGTH</th>
                  <th className="p-3">SHOULDER</th>
                  <th className="p-3">RECOMMENDED BODY CHEST</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-white">
                <tr><td className="p-3 font-bold text-volt">S</td><td className="p-3">42&quot;</td><td className="p-3">28.5&quot;</td><td className="p-3">21&quot;</td><td className="p-3 text-muted-foreground">36&quot; - 38&quot;</td></tr>
                <tr><td className="p-3 font-bold text-volt">M</td><td className="p-3">44&quot;</td><td className="p-3">29.5&quot;</td><td className="p-3">22&quot;</td><td className="p-3 text-muted-foreground">38&quot; - 40&quot;</td></tr>
                <tr><td className="p-3 font-bold text-volt">L</td><td className="p-3">46&quot;</td><td className="p-3">30.5&quot;</td><td className="p-3">23&quot;</td><td className="p-3 text-muted-foreground">40&quot; - 42&quot;</td></tr>
                <tr><td className="p-3 font-bold text-volt">XL</td><td className="p-3">48&quot;</td><td className="p-3">31.5&quot;</td><td className="p-3">24&quot;</td><td className="p-3 text-muted-foreground">42&quot; - 44&quot;</td></tr>
                <tr><td className="p-3 font-bold text-volt">XXL</td><td className="p-3">50&quot;</td><td className="p-3">32.5&quot;</td><td className="p-3">25&quot;</td><td className="p-3 text-muted-foreground">44&quot; - 46&quot;</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Denim */}
        <div className="p-6 sm:p-8 bg-onyx-900 border border-border space-y-6">
          <div className="flex items-center space-x-2 text-volt">
            <Ruler className="w-5 h-5" />
            <h2 className="text-xl font-black uppercase text-white font-editorial">
              Bottoms: Baggy & Straight-Fit Denim (Inches)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="bg-onyx-800 text-volt border-b border-border">
                  <th className="p-3">WAIST SIZE</th>
                  <th className="p-3">ACTUAL WAIST</th>
                  <th className="p-3">INSEAM LENGTH</th>
                  <th className="p-3">THIGH</th>
                  <th className="p-3">LEG OPENING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-white">
                <tr><td className="p-3 font-bold text-volt">28</td><td className="p-3">29.5&quot;</td><td className="p-3">31&quot;</td><td className="p-3">25&quot;</td><td className="p-3">18.5&quot;</td></tr>
                <tr><td className="p-3 font-bold text-volt">30</td><td className="p-3">31.5&quot;</td><td className="p-3">31.5&quot;</td><td className="p-3">26&quot;</td><td className="p-3">19&quot;</td></tr>
                <tr><td className="p-3 font-bold text-volt">32</td><td className="p-3">33.5&quot;</td><td className="p-3">32&quot;</td><td className="p-3">27&quot;</td><td className="p-3">19.5&quot;</td></tr>
                <tr><td className="p-3 font-bold text-volt">34</td><td className="p-3">35.5&quot;</td><td className="p-3">32.5&quot;</td><td className="p-3">28&quot;</td><td className="p-3">20&quot;</td></tr>
                <tr><td className="p-3 font-bold text-volt">36</td><td className="p-3">37.5&quot;</td><td className="p-3">33&quot;</td><td className="p-3">29&quot;</td><td className="p-3">20.5&quot;</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link href="/collections/all">
            <Button size="lg" className="font-extrabold">
              <span>Find Your Fit Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
