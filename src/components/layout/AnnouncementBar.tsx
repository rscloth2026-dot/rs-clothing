"use client";

import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-volt text-black text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 flex items-center justify-between select-none relative z-40">
      <div className="flex-1 flex items-center justify-center space-x-3 text-center">
        <Sparkles className="w-3.5 h-3.5 animate-pulse hidden sm:inline-block" />
        <span>
          ⚡ DROP 01 LIVE // FREE EXPRESS SHIPPING ON ORDERS ABOVE ₹999 // USE CODE:{" "}
          <span className="underline decoration-black decoration-2">WELCOME10</span>
        </span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse hidden sm:inline-block" />
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="p-1 hover:opacity-70 transition-opacity ml-2"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
