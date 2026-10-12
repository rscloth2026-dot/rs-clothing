"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

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
      setIsScrolled(window.scrollY > 20);
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
    { label: "Graphic Tees", href: "/collections/graphic-tees" },
    { label: "Baggy Jeans", href: "/collections/baggy-jeans" },
    { label: "Straight Jeans", href: "/collections/straight-fit-jeans" },
    { label: "New Drops", href: "/collections/all?tag=new" },
    { label: "Shop The Look", href: "/#shop-the-look" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-200 border-b ${
          isScrolled
            ? "bg-onyx-950/95 backdrop-blur-md border-border py-3 shadow-lg"
            : "bg-onyx-950 border-border/40 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Trigger & Desktop Nav */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-foreground hover:text-volt transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="font-extrabold text-2xl tracking-tighter uppercase font-editorial text-white group-hover:text-volt transition-colors">
                KULT<span className="text-volt">.</span>
              </span>
              <span className="hidden md:inline-block text-[9px] font-mono tracking-widest text-muted-foreground uppercase border border-border px-1.5 py-0.5">
                IND
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-volt hover:after:w-full after:transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Actions (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-foreground hover:text-volt transition-colors"
              aria-label="Search clothing"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="p-2 text-foreground hover:text-volt transition-colors relative hidden sm:flex items-center"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {mounted && wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-volt text-black text-[9px] font-extrabold flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Customer Account / Admin Portal */}
            <Link
              href="/account"
              className="p-2 text-foreground hover:text-volt transition-colors flex items-center"
              aria-label="Account profile"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Shopping Bag with live count badge */}
            <button
              onClick={openCart}
              className="p-2 bg-volt text-black font-extrabold text-xs flex items-center space-x-2 px-3 py-2 rounded-sm hover:bg-[#B8E600] transition-colors relative"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-mono tabular-nums">
                {mounted ? getItemCount() : 0}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-border bg-onyx-900 px-4 py-3 animate-accordion-down">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center space-x-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search oversized tees, baggy jeans, cyber prints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="text-xs font-bold uppercase text-volt hover:underline px-2"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-muted-foreground hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-onyx-950 border-r border-border p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <span className="font-extrabold text-2xl font-editorial text-white">
                  KULT<span className="text-volt">.</span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-muted-foreground hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Collections
                </p>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-bold uppercase tracking-wider text-white hover:text-volt transition-colors py-1 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs font-bold uppercase text-muted-foreground hover:text-volt"
              >
                My Account & Orders
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs font-mono text-muted-foreground hover:text-volt"
              >
                Admin Control Center ⚡
              </Link>
              <p className="text-[11px] text-muted-foreground">
                Engineered for the Indian Streetwear Culture.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
