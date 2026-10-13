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
    <div className="bg-[#0A0A0A] text-[#FAFAFA] text-[11px] font-medium tracking-wider px-4 py-2 border-b border-[#262626] flex items-center justify-between select-none relative z-40 transition-colors">
      <div className="hidden md:flex items-center space-x-2 text-[10px] text-[#A3A3A3] uppercase tracking-widest font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] shadow-sm inline-block" />
        <span className="text-[#FAFAFA] font-semibold">ATELIER JODHPUR // MARWAR</span>
      </div>

      <div className="flex-1 flex items-center justify-center text-center px-2 overflow-hidden">
        <Link
          href={ANNOUNCEMENTS[index].link}
          className="inline-flex items-center space-x-2 group hover:text-[#C5A059] transition-colors focus-visible:outline-[#FAFAFA] focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xs"
        >
          <Sparkles className="w-3 h-3 text-[#C5A059] shrink-0" />
          <span className="uppercase text-[11px] font-semibold tracking-wider text-[#FAFAFA] group-hover:text-[#C5A059] transition-colors">
            {ANNOUNCEMENTS[index].text}
          </span>
          <ArrowRight className="w-3 h-3 text-[#C5A059] group-hover:translate-x-0.5 transition-transform hidden sm:inline-block" />
        </Link>
      </div>

      <div className="flex items-center space-x-3 text-[10px] text-[#A3A3A3]">
        <span className="hidden lg:inline-flex items-center gap-1 font-mono text-[#A3A3A3]">
          <ShieldCheck className="w-3 h-3 text-[#C5A059]" /> 7-DAY ATELIER EXCHANGE
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:text-[#FAFAFA] text-[#737373] transition-colors ml-2 focus-visible:outline-[#FAFAFA] focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xs"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
