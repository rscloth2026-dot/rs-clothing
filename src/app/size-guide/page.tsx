import React from "react";
import Link from "next/link";
import { Ruler, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 lg:py-24 text-[#0A0A0A] font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 pb-8 border-b border-[#E5E5E5]">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#71717A]">
              PRECISION FIT METRICS
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase text-[#0A0A0A] tracking-tight">
            Indian Size Architecture
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] max-w-lg mx-auto leading-relaxed font-sans">
            Our garments are engineered with relaxed <strong>oversized drop-shoulder</strong> and <strong>puddle denim silhouettes</strong> tailored specifically for Indian body metrics.
          </p>
        </div>

        {/* Section 1: Tops */}
        <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E5E5E5] space-y-6 rounded-none shadow-xs">
          <div className="flex items-center space-x-2.5">
            <Ruler className="w-5 h-5 text-[#0A0A0A]" />
            <h2 className="text-xl font-serif font-bold uppercase text-[#0A0A0A]">
              Tops: Oversized & Essential Tees (Inches)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead>
                <tr className="bg-[#FAFAFA] text-[#0A0A0A] border-b border-[#E5E5E5] font-bold">
                  <th className="p-3.5">SIZE</th>
                  <th className="p-3.5">CHEST</th>
                  <th className="p-3.5">LENGTH</th>
                  <th className="p-3.5">SHOULDER</th>
                  <th className="p-3.5">RECOMMENDED BODY CHEST</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F5] text-[#0A0A0A]">
                <tr className="hover:bg-[#FAFAFA]"><td className="p-3.5 font-bold text-[#0A0A0A]">S</td><td className="p-3.5">42&quot;</td><td className="p-3.5">28.5&quot;</td><td className="p-3.5">21&quot;</td><td className="p-3.5 text-[#71717A]">36&quot; - 38&quot;</td></tr>
                <tr className="hover:bg-[#FAFAFA]"><td className="p-3.5 font-bold text-[#0A0A0A]">M</td><td className="p-3.5">44&quot;</td><td className="p-3.5">29.5&quot;</td><td className="p-3.5">22&quot;</td><td className="p-3.5 text-[#71717A]">38&quot; - 40&quot;</td></tr>
                <tr className="hover:bg-[#FAFAFA]"><td className="p-3.5 font-bold text-[#0A0A0A]">L</td><td className="p-3.5">46&quot;</td><td className="p-3.5">30.5&quot;</td><td className="p-3.5">23&quot;</td><td className="p-3.5 text-[#71717A]">40&quot; - 42&quot;</td></tr>
                <tr className="hover:bg-[#FAFAFA]"><td className="p-3.5 font-bold text-[#0A0A0A]">XL</td><td className="p-3.5">48&quot;</td><td className="p-3.5">31.5&quot;</td><td className="p-3.5">24&quot;</td><td className="p-3.5 text-[#71717A]">42&quot; - 44&quot;</td></tr>
                <tr className="hover:bg-[#FAFAFA]"><td className="p-3.5 font-bold text-[#0A0A0A]">XXL</td><td className="p-3.5">50&quot;</td><td className="p-3.5">32.5&quot;</td><td className="p-3.5">25&quot;</td><td className="p-3.5 text-[#71717A]">44&quot; - 46&quot;</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Denim */}
        <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E5E5E5] space-y-6 rounded-none shadow-xs">
          <div className="flex items-center space-x-2.5">
            <Ruler className="w-5 h-5 text-[#0A0A0A]" />
            <h2 className="text-xl font-serif font-bold uppercase text-[#0A0A0A]">
              Bottoms: Baggy & Selvedge Denim (Inches)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead>
                <tr className="bg-[#FAFAFA] text-[#0A0A0A] border-b border-[#E5E5E5] font-bold">
                  <th className="p-3.5">WAIST SIZE</th>
                  <th className="p-3.5">ACTUAL WAIST</th>
                  <th className="p-3.5">INSEAM LENGTH</th>
                  <th className="p-3.5">THIGH</th>
                  <th className="p-3.5">LEG OPENING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F5] text-[#0A0A0A]">
                <tr className="hover:bg-[#FAFAFA]"><td className="p-3.5 font-bold text-[#0A0A0A]">28</td><td className="p-3.5">29.5&quot;</td><td className="p-3.5">31&quot;</td><td className="p-3.5">25&quot;</td><td className="p-3.5">18.5&quot;</td></tr>
                <tr className="hover:bg-[#FAFAFA]"><td className="p-3.5 font-bold text-[#0A0A0A]">30</td><td className="p-3.5">31.5&quot;</td><td className="p-3.5">31.5&quot;</td><td className="p-3.5">26&quot;</td><td className="p-3.5">19&quot;</td></tr>
                <tr className="hover:bg-[#FAFAFA]"><td className="p-3.5 font-bold text-[#0A0A0A]">32</td><td className="p-3.5">33.5&quot;</td><td className="p-3.5">32&quot;</td><td className="p-3.5">27&quot;</td><td className="p-3.5">19.5&quot;</td></tr>
                <tr className="hover:bg-[#FAFAFA]"><td className="p-3.5 font-bold text-[#0A0A0A]">34</td><td className="p-3.5">35.5&quot;</td><td className="p-3.5">32.5&quot;</td><td className="p-3.5">28&quot;</td><td className="p-3.5">20&quot;</td></tr>
                <tr className="hover:bg-[#FAFAFA]"><td className="p-3.5 font-bold text-[#0A0A0A]">36</td><td className="p-3.5">37.5&quot;</td><td className="p-3.5">33&quot;</td><td className="p-3.5">29&quot;</td><td className="p-3.5">20.5&quot;</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link href="/collections/all">
            <Button className="bg-[#0A0A0A] hover:bg-[#262626] text-white font-bold uppercase tracking-widest text-xs h-12 px-8 rounded-none shadow-sm transition-all">
              <span>Find Your Fit Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
