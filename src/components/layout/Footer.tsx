"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  Truck,
  Lock,
} from "lucide-react";
import {
  InstagramIcon,
  WhatsAppIcon,
  YoutubeIcon,
  TwitterIcon,
  FacebookIcon,
  PinterestIcon,
} from "@/components/ui/social-icons";
import { Button } from "@/components/ui/button";
import { CssUnderlineLink, CssArrowLink } from "@/components/ui/skiper-ui";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    site_name: "RS Clothing",
    brand_tagline: "Marwar Atelier // Jodhpur",
    instagram: "https://instagram.com/rsclothing.jodhpur",
    whatsapp: "+91 98765 43210",
    youtube: "https://youtube.com/@rsclothing",
    twitter: "https://x.com/rsclothing",
    facebook: "https://facebook.com/rsclothing.jodhpur",
    pinterest: "https://pinterest.com/rsclothing",
    support_email: "concierge@rsclothing.in",
    phone: "+91 98765 43210",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      })
      .catch(() => {
        // Fallback to initial state gracefully
      });
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappClean = settings.whatsapp.replace(/[^0-9]/g, "");

  return (
    <footer className="bg-[#080815] border-t border-[#1F294D] text-[#94A3B8] pt-16 pb-12">
      {/* Brand Guarantees Bar (Studio Cards) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-[#1F294D]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 bg-[#16213E] border border-[#1F294D] rounded-none flex items-center space-x-3.5 shadow-sm hover:border-[#60EFFF] transition-all duration-300">
            <div className="p-2.5 bg-[#0A0A1A] border border-[#1F294D] text-[#00FF87] rounded-none shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">Free Express Air</p>
              <p className="text-[11px] text-[#94A3B8]">Orders &gt; ₹999 via BlueDart</p>
            </div>
          </div>

          <div className="p-4 bg-[#16213E] border border-[#1F294D] rounded-none flex items-center space-x-3.5 shadow-sm hover:border-[#60EFFF] transition-all duration-300">
            <div className="p-2.5 bg-[#0A0A1A] border border-[#1F294D] text-[#00FF87] rounded-none shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">7-Day Doorstep Swap</p>
              <p className="text-[11px] text-[#94A3B8]">Effortless size exchange</p>
            </div>
          </div>

          <div className="p-4 bg-[#16213E] border border-[#1F294D] rounded-none flex items-center space-x-3.5 shadow-sm hover:border-[#60EFFF] transition-all duration-300">
            <div className="p-2.5 bg-[#0A0A1A] border border-[#1F294D] text-[#00FF87] rounded-none shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">380 GSM Heavyweight</p>
              <p className="text-[11px] text-[#94A3B8]">100% Combed French Terry</p>
            </div>
          </div>

          <div className="p-4 bg-[#16213E] border border-[#1F294D] rounded-none flex items-center space-x-3.5 shadow-sm hover:border-[#60EFFF] transition-all duration-300">
            <div className="p-2.5 bg-[#0A0A1A] border border-[#1F294D] text-[#00FF87] rounded-none shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">Secure Indian Pay</p>
              <p className="text-[11px] text-[#94A3B8]">UPI, COD & All Cards</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-baseline space-x-2 group">
              <span className="font-serif font-bold text-2xl tracking-tight text-white group-hover:text-[#00FF87] transition-colors">
                RS CLOTHING
              </span>
              <span className="text-[9px] font-sans tracking-[0.25em] text-[#00FF87] uppercase font-bold border-l border-[#1F294D] pl-2">
                CYBER ATELIER
              </span>
            </Link>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Architectural oversized silhouettes, heavyweight drops, and artisanal selvedge denim engineered with Royal Marwar craftsmanship from Jodhpur, Rajasthan.
            </p>

            {/* Dynamic Social Media Handles (Admin Controlled) */}
            <div className="pt-2">
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-white font-semibold mb-2.5">
                Official Channels & Handles
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-[#16213E] border border-[#1F294D] rounded-none text-[#94A3B8] hover:text-[#00FF87] hover:border-[#00FF87] hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="RS Clothing on Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.whatsapp && (
                  <a
                    href={`https://wa.me/${whatsappClean}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-[#16213E] border border-[#1F294D] rounded-none text-[#94A3B8] hover:text-[#00FF87] hover:border-[#00FF87] hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="Chat with RS Clothing Concierge on WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.youtube && (
                  <a
                    href={settings.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-[#16213E] border border-[#1F294D] rounded-none text-[#94A3B8] hover:text-[#60EFFF] hover:border-[#60EFFF] hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="RS Clothing on YouTube"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.twitter && (
                  <a
                    href={settings.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-[#16213E] border border-[#1F294D] rounded-none text-[#94A3B8] hover:text-[#00FF87] hover:border-[#00FF87] hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="RS Clothing on X"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-[#16213E] border border-[#1F294D] rounded-none text-[#94A3B8] hover:text-[#60EFFF] hover:border-[#60EFFF] hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="RS Clothing on Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.pinterest && (
                  <a
                    href={settings.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-[#16213E] border border-[#1F294D] rounded-none text-[#94A3B8] hover:text-[#60EFFF] hover:border-[#60EFFF] hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="RS Clothing on Pinterest"
                  >
                    <PinterestIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-white mb-2 flex items-center space-x-2">
                <span>Join The Private Royal Atelier List</span>
                <span className="text-[10px] font-sans text-[#00FF87] font-bold">// 10% Off</span>
              </p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-white text-xs font-medium bg-[#16213E] p-3 border border-[#1F294D] rounded-none">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF87]" />
                  <span>You have been added to the royal guest list. Welcome.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#0A0A1A] border border-[#1F294D] px-3.5 py-2.5 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00FF87] rounded-none"
                  />
                  <Button type="submit" variant="default" size="default" disabled={loading} className="rounded-none bg-gradient-to-r from-[#00FF87] to-[#60EFFF] hover:opacity-90 text-[#0A0A1A] font-black border-none">
                    <span>{loading ? "..." : "Join"}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">Collections</p>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <CssUnderlineLink href="/collections/oversized-tees" className="hover:text-[#00FF87]">
                  Oversized T-Shirts
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/collections/graphic-tees" className="hover:text-[#00FF87]">
                  Graphic Art Drops
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/collections/baggy-jeans" className="hover:text-[#00FF87]">
                  Baggy Puddle Denim
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/collections/straight-fit-jeans" className="hover:text-[#00FF87]">
                  Straight-Fit Selvedge
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/collections/all" className="hover:text-[#00FF87]">
                  All Collections
                </CssUnderlineLink>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">Client Concierge</p>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <CssUnderlineLink href="/account" className="hover:text-[#00FF87]">
                  Track BlueDart Delivery
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/exchanges" className="hover:text-[#00FF87]">
                  7-Day Doorstep Exchanges
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/size-guide" className="hover:text-[#00FF87]">
                  Indian Size Guide
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/contact" className="hover:text-[#00FF87]">
                  Studio Concierge
                </CssUnderlineLink>
              </li>
              <li className="pt-2">
                <span className="block text-[10px] text-[#94A3B8] font-mono">WhatsApp Concierge:</span>
                <a
                  href={`https://wa.me/${whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-mono font-semibold hover:text-[#00FF87] transition-colors"
                >
                  {settings.whatsapp}
                </a>
              </li>
              <li className="pt-1">
                <span className="block text-[10px] text-[#94A3B8] font-mono">Direct Email:</span>
                <a
                  href={`mailto:${settings.support_email}`}
                  className="text-white font-mono text-[11px] hover:text-[#00FF87] transition-colors"
                >
                  {settings.support_email}
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Company */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">Atelier Studio</p>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <CssUnderlineLink href="/about" className="hover:text-[#00FF87]">
                  Royal Heritage Manifesto
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/contact" className="hover:text-[#00FF87]">
                  Jodhpur Headquarters (Marwar)
                </CssUnderlineLink>
              </li>
              <li>
                <span className="block text-[11px] text-[#94A3B8] mt-3">Logistics Partners:</span>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-white mt-1">
                  <span className="px-2 py-0.5 bg-[#16213E] border border-[#1F294D] rounded-none">BlueDart Air</span>
                  <span className="px-2 py-0.5 bg-[#16213E] border border-[#1F294D] rounded-none">Delhivery</span>
                </div>
              </li>
              <li>
                <span className="block text-[11px] text-[#94A3B8] mt-2">Atelier Hub:</span>
                <span className="text-[11px] text-white font-medium">Jodhpur, Rajasthan 342001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and Indian payment badges */}
        <div className="mt-12 pt-8 border-t border-[#1F294D] flex flex-col md:flex-row items-center justify-between text-xs text-[#94A3B8] space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} RS CLOTHING RAJASTHAN ATELIER INDIA. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-[#94A3B8]">
            <span className="px-2 py-0.5 bg-[#16213E] border border-[#1F294D] rounded-none text-white">UPI 2.0</span>
            <span className="px-2 py-0.5 bg-[#16213E] border border-[#1F294D] rounded-none text-white">RAZORPAY SECURE</span>
            <span className="px-2 py-0.5 bg-[#16213E] border border-[#1F294D] rounded-none text-white">VISA / MASTERCARD</span>
            <span className="px-2 py-0.5 bg-[#16213E] border border-[#1F294D] rounded-none text-white">RUPAY</span>
            <span className="px-2 py-0.5 bg-gradient-to-r from-[#00FF87] to-[#60EFFF] border-none rounded-none text-[#0A0A1A] font-black">COD AVAILABLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
