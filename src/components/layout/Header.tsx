"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ProgressiveBlur, TextRoll } from "@/components/ui/skiper-ui";

export function Header() {
  const router = useRouter();
  const { openCart, getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/collections/all?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const navLinks = [
    { label: "Oversized Tees", href: "/collections/oversized-tees" },
    { label: "Graphic Drops", href: "/collections/graphic-tees" },
    { label: "Baggy Denim", href: "/collections/baggy-jeans" },
    { label: "Straight Fit", href: "/collections/straight-fit-jeans" },
    { label: "Royal Vault", href: "/collections/all?tag=new" },
    { label: "Lookbook", href: "/#shop-the-look" },
  ];

  const quickSearchTags = [
    "380 GSM Heavyweight",
    "Bagru Block Print",
    "Japanese Selvedge",
    "Boxy Drop Shoulder",
    "Indigo Raw Denim",
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#060D1A]/95 backdrop-blur-md border-[#1E3A5F] py-3 shadow-[0_4px_25px_rgba(2,6,23,0.7)]"
            : "bg-[#060D1A]/85 backdrop-blur-sm border-[#1E3A5F] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Trigger & Brand Wordmark */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#94A3B8] hover:text-white transition-colors rounded-sm hover:bg-[#0F1D36]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo - Cormorant Garamond Royal Heritage */}
            <Link href="/" className="flex items-baseline space-x-2 group">
              <span className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-white group-hover:text-[#C5A059] transition-colors">
                RS CLOTHING
              </span>
              <span className="text-[9px] font-sans tracking-[0.25em] text-[#C5A059] font-bold uppercase border-l border-[#1E3A5F] pl-2">
                JODHPUR
              </span>
            </Link>

            {/* Desktop Navigation Links with Skiper-UI TextRoll */}
            <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold uppercase tracking-wider pl-2 font-sans">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#CBD5E1] hover:text-white transition-colors relative py-1 group"
                >
                  <TextRoll className="py-0.5">{link.label}</TextRoll>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-[#CBD5E1] hover:text-white transition-colors rounded-sm hover:bg-[#0F1D36] flex items-center space-x-2 text-xs font-sans"
              aria-label="Search collection"
            >
              <Search className="w-4 h-4 text-[#38BDF8]" />
              <span className="hidden md:inline text-[11px] text-[#94A3B8]">Search</span>
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="p-2.5 text-[#CBD5E1] hover:text-white transition-colors relative hidden sm:flex items-center rounded-sm hover:bg-[#0F1D36]"
              aria-label="View wishlist"
            >
              <Heart className="w-4 h-4" />
              {mounted && wishlistItems.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#8B1E1E] text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-sm">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Customer Account Portal */}
            <Link
              href="/account"
              className="p-2.5 text-[#CBD5E1] hover:text-white transition-colors flex items-center rounded-sm hover:bg-[#0F1D36]"
              aria-label="Customer account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Shopping Bag Button (Tactile Sandstone Pill) */}
            <button
              onClick={openCart}
              className="tactile-btn inline-flex items-center space-x-2.5 bg-[#0F1D36] text-[#F1EFEA] border border-[#1E3A5F] hover:border-[#C5A059] font-bold text-xs px-3.5 py-2 rounded-full shadow-sm ml-1"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[11px] font-sans tracking-wider text-[#94A3B8] hidden sm:inline uppercase">
                BAG
              </span>
              <span className="bg-[#8B1E1E] text-white font-mono font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {mounted ? getItemCount() : 0}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Command-Search Overlay */}
        {isSearchOpen && (
          <div className="border-t border-[#1E3A5F] bg-[#060D1A] px-4 py-4 shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-3">
              <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3 bg-[#0B172C] border border-[#1E3A5F] rounded-sm px-3.5 py-2.5 focus-within:border-[#C5A059] transition-colors">
                <Search className="w-4 h-4 text-[#38BDF8]" />
                <input
                  type="text"
                  placeholder="Search royal heavyweight tees, selvedge denim, boxy cuts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-sm text-[#F1EFEA] placeholder:text-[#64748B] focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-xs font-bold uppercase tracking-wider text-white bg-[#8B1E1E] hover:bg-[#721818] px-3.5 py-1.5 rounded-[2px] transition-colors shadow-sm"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 text-[#94A3B8] hover:text-white"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>

              {/* Quick tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-sans uppercase text-[#94A3B8] mr-1 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>Trending:</span>
                </span>
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      router.push(`/collections/all?search=${encodeURIComponent(tag)}`);
                      setIsSearchOpen(false);
                    }}
                    className="text-[11px] font-sans px-2.5 py-1 bg-[#0F1D36] border border-[#1E3A5F] text-[#CBD5E1] hover:text-[#C5A059] hover:border-[#C5A059] rounded-full transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Skiper-UI 41: Optical Progressive Blur under sticky header */}
      {isScrolled && (
        <ProgressiveBlur
          position="top"
          backgroundColor="#060C18"
          height="16px"
          blurAmount="4px"
          className="sticky top-[61px] z-30 opacity-70"
        />
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#060D1A] border-r border-[#1E3A5F] p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1E3A5F]">
                <div className="flex items-baseline space-x-2">
                  <span className="font-serif font-bold text-2xl text-white">
                    RS CLOTHING
                  </span>
                  <span className="text-[9px] font-sans tracking-widest text-[#C5A059] uppercase font-bold">
                    JODHPUR
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#94A3B8] hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-3.5">
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#94A3B8]">
                  Atelier Catalog
                </p>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-semibold uppercase tracking-wider text-[#F1EFEA] hover:text-[#C5A059] transition-colors py-2 flex items-center justify-between border-b border-[#1E3A5F]/50"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[#1E3A5F] pt-6 space-y-3">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs font-semibold uppercase text-[#F1EFEA] hover:text-[#C5A059] transition-colors"
              >
                Client Account & Orders
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs font-semibold uppercase text-[#94A3B8] hover:text-white transition-colors"
              >
                Atelier Concierge & Support
              </Link>
              <p className="text-[11px] text-[#64748B] leading-relaxed pt-2">
                Handcrafted 380 GSM silhouettes engineered with royal Rajasthani heritage.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
