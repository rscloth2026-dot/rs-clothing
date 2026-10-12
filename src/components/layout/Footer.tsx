"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, RefreshCw, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <footer className="bg-onyx-950 border-t border-border text-foreground pt-16 pb-12">
      {/* Brand Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-border/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-onyx-800 border border-border text-volt rounded-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Free Express Shipping</p>
              <p className="text-[11px] text-muted-foreground">On all orders above ₹999 across India</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-onyx-800 border border-border text-volt rounded-sm">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">7-Day Doorstep Exchange</p>
              <p className="text-[11px] text-muted-foreground">Hassle-free size swaps & easy pickups</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-onyx-800 border border-border text-volt rounded-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">100% Genuine Heavyweight</p>
              <p className="text-[11px] text-muted-foreground">240+ GSM French Terry & 14oz Denim</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-onyx-800 border border-border text-volt rounded-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Verified Razorpay Payments</p>
              <p className="text-[11px] text-muted-foreground">UPI, Cards, NetBanking & COD supported</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-extrabold text-3xl font-editorial tracking-tighter text-white">
                KULT<span className="text-volt">.</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Engineered for the Indian youth subculture. Heavyweight boxy silhouettes, skate-drape puddling denim, and uncompromised architectural streetwear tailoring.
            </p>

            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Join The Kult // Get 10% Off First Drop
              </p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-volt text-xs font-bold bg-volt/10 p-3 border border-volt/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You are on the secret drop VIP list. Welcome to KULT.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-onyx-800 border border-border px-3.5 py-2.5 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-volt"
                  />
                  <Button type="submit" size="default" disabled={loading} className="rounded-none">
                    <span>{loading ? "..." : "Join"}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-white">Collections</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/collections/oversized-tees" className="hover:text-volt transition-colors">
                  Oversized T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/collections/graphic-tees" className="hover:text-volt transition-colors">
                  High-Density Graphic Tees
                </Link>
              </li>
              <li>
                <Link href="/collections/essential-tees" className="hover:text-volt transition-colors">
                  Minimalist Essentials
                </Link>
              </li>
              <li>
                <Link href="/collections/baggy-jeans" className="hover:text-volt transition-colors">
                  Baggy Puddle Jeans
                </Link>
              </li>
              <li>
                <Link href="/collections/straight-fit-jeans" className="hover:text-volt transition-colors">
                  Straight-Fit Vintage Denim
                </Link>
              </li>
              <li>
                <Link href="/#shop-the-look" className="hover:text-volt transition-colors">
                  Shop The Look (Outfits)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-white">Customer Support</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/account" className="hover:text-volt transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/exchanges" className="hover:text-volt transition-colors">
                  Exchanges & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-volt transition-colors">
                  Indian Size Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-volt transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li className="pt-2">
                <span className="block text-[11px] text-white font-mono">WhatsApp Support:</span>
                <span className="text-volt font-mono font-bold">+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Trust & Company */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-white">Company</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-volt transition-colors">
                  Brand Manifesto
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-volt transition-colors text-volt">
                  Admin Control Center ⚡
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-volt transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-volt transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and Indian payment badges */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} KULT STREETWEAR INDIA. All rights reserved.</p>
          <div className="flex items-center space-x-3 font-mono text-[11px] text-white">
            <span className="px-2 py-1 bg-onyx-800 border border-border">UPI</span>
            <span className="px-2 py-1 bg-onyx-800 border border-border">RAZORPAY</span>
            <span className="px-2 py-1 bg-onyx-800 border border-border">VISA / MC</span>
            <span className="px-2 py-1 bg-onyx-800 border border-border">RUPAY</span>
            <span className="px-2 py-1 bg-onyx-800 border border-border">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
