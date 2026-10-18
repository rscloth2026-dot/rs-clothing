"use client";

import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";

export interface ReviewItem {
  id: string;
  customerName: string;
  city?: string | null;
  rating: number;
  comment: string;
  productTitle?: string;
  product?: {
    title: string;
    slug?: string;
  } | null;
}

interface ReviewMarqueeProps {
  reviews?: ReviewItem[];
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    customerName: "Ranveer Rathore",
    city: "Jodhpur, RJ",
    rating: 5,
    comment: "The 380 GSM weight is unreal. It has that authentic heavy haveli drape that retail brands can never replicate. Collar stays crisp after 10+ washes.",
    productTitle: "Royal Haveli Oversized Tee",
  },
  {
    id: "r2",
    customerName: "Aarav Singhania",
    city: "South Mumbai",
    rating: 5,
    comment: "The French Terry texture and antique brass hardware details are unmatched. Received compliments the very first day in Bandra. Legit luxury feel.",
    productTitle: "Marwar Palace Zip Hoodie",
  },
  {
    id: "r3",
    customerName: "Kabir Mehta",
    city: "Indiranagar, Bengaluru",
    rating: 5,
    comment: "BlueDart express arrived in 48 hours. Packaging came with custom wax seal stamp and fabric care card. Truly a five-star experience.",
    productTitle: "Raw Selvedge Baggy Denim",
  },
  {
    id: "r4",
    customerName: "Devendra Shekhawat",
    city: "Jaipur, RJ",
    rating: 5,
    comment: "Boxy silhouette fits broad shoulders naturally. The fabric doesn't cling even in warm weather. You can feel the atelier heritage in every seam.",
    productTitle: "Atelier Boxy Drop-Shoulder",
  },
  {
    id: "r5",
    customerName: "Rohan Varma",
    city: "Connaught Place, New Delhi",
    rating: 5,
    comment: "Minimalist streetwear at its absolute peak. The muted obsidian black doesn't fade into grey. Will be ordering the hoodie next.",
    productTitle: "Imperial Monochrome Tee",
  },
  {
    id: "r6",
    customerName: "Vikramaditya Rao",
    city: "Jubilee Hills, Hyderabad",
    rating: 5,
    comment: "Denim stack over chunky sneakers is immaculate. Sturdy 14.5 oz selvedge that softens with wear while keeping structure.",
    productTitle: "Heritage Wide-Leg Selvedge",
  },
];

export function ReviewMarquee({ reviews }: ReviewMarqueeProps) {
  // Use provided reviews or default to authentic customer testimonials
  const activeReviews = (reviews && reviews.length > 0) ? reviews : DEFAULT_REVIEWS;
  // Duplicate array to ensure endless seamless infinite loop
  const tickerItems = [...activeReviews, ...activeReviews];

  return (
    <div className="w-full overflow-hidden py-4 select-none relative group">
      {/* Left/Right Vignette Edge Fades for Seamless Infinite Flow */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />

      {/* Auto-scrolling Track */}
      <div className="flex w-max space-x-4 sm:space-x-5 animate-marquee pause-on-hover gpu-smooth">
        {tickerItems.map((rev, idx) => {
          const title = rev.product?.title || rev.productTitle || "Verified Piece";
          return (
            <div
              key={`${rev.id}-${idx}`}
              className="w-[280px] sm:w-[320px] shrink-0 p-4 bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 rounded-lg flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-3.5 h-3.5 text-zinc-600 rotate-180" />
                </div>

                {/* Compact Review Comment */}
                <p className="text-xs text-zinc-300 font-sans leading-relaxed italic line-clamp-3 mb-3">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Footer: Patron Name & Product Tag */}
              <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                <div className="min-w-0 pr-2">
                  <div className="font-semibold text-white truncate flex items-center space-x-1">
                    <span className="truncate">{rev.customerName}</span>
                    <CheckCircle2 className="w-3 h-3 text-zinc-400 shrink-0" />
                  </div>
                  <div className="text-[10px] text-zinc-500 font-sans truncate">
                    {rev.city || "Verified Patron"}
                  </div>
                </div>

                <span className="text-[9px] font-sans uppercase tracking-wider text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2 py-0.5 rounded-xs shrink-0 max-w-[120px] truncate">
                  {title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
