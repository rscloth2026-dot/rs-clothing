"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Flame, Bookmark, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ProgressiveBlur } from "@/components/ui/skiper-ui";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { openCart, getItemCount } = useCartStore();
  const wishlistItems = useWishlistStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCartCount = mounted ? getItemCount() : 0;
  const totalWishlistCount = mounted ? wishlistItems.length : 0;

  // Don't show bottom nav on checkout or PDP (PDP has dedicated bottom action dock)
  if (pathname === "/checkout" || pathname.startsWith("/products/")) {
    return null;
  }

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Drops",
      href: "/collections/all",
      icon: Flame,
      isActive: pathname.startsWith("/collections"),
      badge: "DROP",
    },
    {
      label: "Vault",
      href: "/wishlist",
      icon: Bookmark,
      isActive: pathname === "/wishlist",
      count: totalWishlistCount,
    },
    {
      label: "Account",
      href: "/account",
      icon: User,
      isActive: pathname === "/account",
    },
  ];

  return (
    <>
      {/* Skiper-UI 41: Optical Progressive Blur above bottom dock */}
      <ProgressiveBlur
        position="bottom"
        backgroundColor="#FFFFFF"
        height="22px"
        blurAmount="6px"
        className="md:hidden fixed bottom-[62px] left-0 right-0 z-30 opacity-70 pointer-events-none"
      />

      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-[#E7E2D9] px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom,8px),8px)] shadow-[0_-4px_25px_rgba(28,25,23,0.06)]"
      >
        <div className="grid grid-cols-5 items-center justify-around h-14">
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex flex-col items-center justify-center h-full active:scale-90 transition-transform ${
                  item.isActive ? "text-[#8B1E1E]" : "text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                <motion.div whileTap={{ scale: 0.85 }} className="relative">
                  <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-3 px-1 py-0.2 bg-[#8B1E1E] text-white text-[8px] font-bold font-sans leading-tight rounded-[2px]">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
                <span
                  className={`text-[10px] font-medium tracking-tight mt-1 ${
                    item.isActive ? "font-bold text-[#8B1E1E]" : "text-[#78716C]"
                  }`}
                >
                  {item.label}
                </span>
                {item.isActive && (
                  <motion.span
                    layoutId="mobileNavActiveIndicator"
                    className="absolute bottom-0 w-3 h-0.5 rounded-full bg-[#8B1E1E]"
                  />
                )}
              </Link>
            );
          })}

          {/* Center Bag Button (Hero Touch Target with Haptic Spring) */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={openCart}
            className="relative flex flex-col items-center justify-center h-full"
            aria-label="Open Shopping Bag"
          >
            <div className="relative w-11 h-11 rounded-full bg-[#8B1E1E] border border-[#C5A059]/40 flex items-center justify-center shadow-md group hover:bg-[#721818] transition-colors">
              <ShoppingBag className="w-5 h-5 text-white stroke-[2.2]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C5A059] text-white text-[10px] font-bold font-mono flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold tracking-wider text-[#8B1E1E] uppercase mt-0.5">
              Bag
            </span>
          </motion.button>

          {navItems.slice(2).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex flex-col items-center justify-center h-full active:scale-90 transition-transform ${
                  item.isActive ? "text-[#8B1E1E]" : "text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                <motion.div whileTap={{ scale: 0.85 }} className="relative">
                  <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
                  {item.count !== undefined && item.count > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-[#F4EFE6] border border-[#E7E2D9] text-[#1C1917] text-[9px] font-bold font-mono flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </motion.div>
                <span
                  className={`text-[10px] font-medium tracking-tight mt-1 ${
                    item.isActive ? "font-bold text-[#8B1E1E]" : "text-[#78716C]"
                  }`}
                >
                  {item.label}
                </span>
                {item.isActive && (
                  <motion.span
                    layoutId="mobileNavActiveIndicator"
                    className="absolute bottom-0 w-3 h-0.5 rounded-full bg-[#8B1E1E]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
