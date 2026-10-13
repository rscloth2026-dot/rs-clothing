"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const ANNOUNCEMENTS = [
  { text: "MARWAR ATELIER • COMPLIMENTARY BLUEDART AIR SHIPPING OVER ₹999 FROM JODHPUR", link: "/collections/all" },
  { text: "LIMITED JODHPUR DROP // 380 GSM HEAVYWEIGHT FRENCH TERRY NOW LIVE", link: "/collections/oversized-tees" },
  { text: "SPECIAL ATELIER PRIVILEGE: FLAT 10% OFF ON FIRST ORDER WITH CODE: ROYAL10", link: "/collections/all" },
];

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-[#F5F2EB] text-[#1C1917] text-[11px] font-medium tracking-wider px-4 py-2 border-b border-[#E7E2D9] flex items-center justify-between select-none relative z-40 transition-colors">
      <div className="hidden md:flex items-center space-x-2 text-[10px] text-[#78716C] uppercase tracking-widest font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] shadow-sm inline-block" />
        <span className="text-[#1C1917] font-semibold">ATELIER JODHPUR // MARWAR</span>
      </div>

      <div className="flex-1 flex items-center justify-center text-center px-2 overflow-hidden">
        <Link
          href={ANNOUNCEMENTS[index].link}
          className="inline-flex items-center space-x-2 group hover:text-[#8B1E1E] transition-colors"
        >
          <Sparkles className="w-3 h-3 text-[#C5A059] shrink-0" />
          <span className="uppercase text-[11px] font-semibold tracking-wider text-[#1C1917] group-hover:text-[#8B1E1E] transition-colors">
            {ANNOUNCEMENTS[index].text}
          </span>
          <ArrowRight className="w-3 h-3 text-[#C5A059] group-hover:translate-x-0.5 transition-transform hidden sm:inline-block" />
        </Link>
      </div>

      <div className="flex items-center space-x-3 text-[10px] text-[#78716C]">
        <span className="hidden lg:inline-flex items-center gap-1 font-mono text-[#78716C]">
          <ShieldCheck className="w-3 h-3 text-[#C5A059]" /> 7-DAY ROYAL EXCHANGE
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:text-[#1C1917] text-[#78716C] transition-colors ml-2"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
