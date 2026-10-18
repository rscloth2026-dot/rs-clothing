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
    site_name: "OnlyCollection",
    brand_tagline: "Haute Streetwear Atelier",
    instagram: "https://instagram.com/onlycollection",
    whatsapp: "+91 98765 43210",
    youtube: "https://youtube.com/@onlycollection",
    twitter: "https://x.com/onlycollection",
    facebook: "https://facebook.com/onlycollection",
    pinterest: "https://pinterest.com/onlycollection",
    support_email: "concierge@onlycollection.in",
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
    <footer className="bg-[#09090B] border-t border-zinc-800/80 text-zinc-400 pt-16 pb-12">
      {/* Brand Guarantees Bar (Studio Cards) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-zinc-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-none flex items-center space-x-3.5 shadow-sm hover:border-zinc-600 transition-all duration-300">
            <div className="p-2.5 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-none shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">Free Express Air</p>
              <p className="text-[11px] text-zinc-400">Orders &gt; ₹999 via BlueDart</p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-none flex items-center space-x-3.5 shadow-sm hover:border-zinc-600 transition-all duration-300">
            <div className="p-2.5 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-none shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">7-Day Doorstep Swap</p>
              <p className="text-[11px] text-zinc-400">Effortless size exchange</p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-none flex items-center space-x-3.5 shadow-sm hover:border-zinc-600 transition-all duration-300">
            <div className="p-2.5 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-none shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">380 GSM Heavyweight</p>
              <p className="text-[11px] text-zinc-400">100% Combed French Terry</p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-none flex items-center space-x-3.5 shadow-sm hover:border-zinc-600 transition-all duration-300">
            <div className="p-2.5 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-none shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">Secure Indian Pay</p>
              <p className="text-[11px] text-zinc-400">UPI, COD & All Cards</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-baseline space-x-2 group">
              <span className="font-serif font-bold text-2xl tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                ONLYCOLLECTION
              </span>
              <span className="text-[9px] font-sans tracking-[0.25em] text-zinc-400 uppercase font-bold border-l border-zinc-800 pl-2">
                HAUTE ATELIER
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
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
                    className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-none text-zinc-400 hover:text-white hover:border-zinc-600 hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="OnlyCollection on Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.whatsapp && (
                  <a
                    href={`https://wa.me/${whatsappClean}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-none text-zinc-400 hover:text-white hover:border-zinc-600 hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="Chat with OnlyCollection Concierge on WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.youtube && (
                  <a
                    href={settings.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-none text-zinc-400 hover:text-white hover:border-zinc-600 hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="OnlyCollection on YouTube"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.twitter && (
                  <a
                    href={settings.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-none text-zinc-400 hover:text-white hover:border-zinc-600 hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="OnlyCollection on X"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-none text-zinc-400 hover:text-white hover:border-zinc-600 hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="OnlyCollection on Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.pinterest && (
                  <a
                    href={settings.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-none text-zinc-400 hover:text-white hover:border-zinc-600 hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-200"
                    aria-label="OnlyCollection on Pinterest"
                  >
                    <PinterestIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-white mb-2 flex items-center space-x-2">
                <span>Join The Private Royal Atelier List</span>
                <span className="text-[10px] font-sans text-zinc-400 font-bold">// 10% Off</span>
              </p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-white text-xs font-medium bg-zinc-900 p-3 border border-zinc-800 rounded-none">
                  <CheckCircle2 className="w-4 h-4 text-white" />
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
                    className="flex-1 bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 rounded-none"
                  />
                  <Button type="submit" variant="default" size="default" disabled={loading} className="rounded-none bg-white hover:bg-zinc-200 text-black font-black border-none">
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
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <CssUnderlineLink href="/collections/oversized-tees" className="hover:text-white">
                  Oversized T-Shirts
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/collections/graphic-tees" className="hover:text-white">
                  Graphic Art Drops
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/collections/baggy-jeans" className="hover:text-white">
                  Baggy Puddle Denim
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/collections/straight-fit-jeans" className="hover:text-white">
                  Straight-Fit Selvedge
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/collections/all" className="hover:text-white">
                  All Collections
                </CssUnderlineLink>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">Client Concierge</p>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <CssUnderlineLink href="/account" className="hover:text-white">
                  Track BlueDart Delivery
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/exchanges" className="hover:text-white">
                  7-Day Doorstep Exchanges
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/size-guide" className="hover:text-white">
                  Indian Size Guide
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/contact" className="hover:text-white">
                  Studio Concierge
                </CssUnderlineLink>
              </li>
              <li className="pt-2">
                <span className="block text-[10px] text-zinc-400 font-mono">WhatsApp Concierge:</span>
                <a
                  href={`https://wa.me/${whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-mono font-semibold hover:text-zinc-200 transition-colors"
                >
                  {settings.whatsapp}
                </a>
              </li>
              <li className="pt-1">
                <span className="block text-[10px] text-zinc-400 font-mono">Direct Email:</span>
                <a
                  href={`mailto:${settings.support_email}`}
                  className="text-white font-mono text-[11px] hover:text-zinc-200 transition-colors"
                >
                  {settings.support_email}
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Company */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">Atelier Studio</p>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <CssUnderlineLink href="/about" className="hover:text-white">
                  Royal Heritage Manifesto
                </CssUnderlineLink>
              </li>
              <li>
                <CssUnderlineLink href="/contact" className="hover:text-white">
                  Jodhpur Headquarters (Marwar)
                </CssUnderlineLink>
              </li>
              <li>
                <span className="block text-[11px] text-zinc-400 mt-3">Logistics Partners:</span>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-white mt-1">
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-none">BlueDart Air</span>
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-none">Delhivery</span>
                </div>
              </li>
              <li>
                <span className="block text-[11px] text-zinc-400 mt-2">Atelier Hub:</span>
                <span className="text-[11px] text-white font-medium">Jodhpur, Rajasthan 342001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and Indian payment badges */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} ONLYCOLLECTION ATELIER INDIA. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-zinc-400">
            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-none text-zinc-200">UPI 2.0</span>
            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-none text-zinc-200">RAZORPAY SECURE</span>
            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-none text-zinc-200">VISA / MASTERCARD</span>
            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-none text-zinc-200">RUPAY</span>
            <span className="px-2 py-0.5 bg-white text-black font-bold rounded-none">COD AVAILABLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
