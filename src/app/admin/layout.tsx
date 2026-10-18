import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Tag,
  Share2,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // If not admin, show login prompt
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#FAFAFA] text-[#0A0A0A] font-sans">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E5E5E5] p-8 text-center space-y-5 shadow-sm rounded-none">
          <div className="w-14 h-14 bg-[#FAFAFA] border border-[#E5E5E5] text-[#0A0A0A] rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-mono font-semibold text-[#71717A] uppercase tracking-widest block">
            AUTHENTICATED PERSONNEL ONLY
          </span>
          <h1 className="text-2xl font-serif font-bold uppercase text-[#0A0A0A]">
            Admin Clearance Required
          </h1>
          <p className="text-xs text-[#71717A] leading-relaxed">
            This executive workspace manages live atelier inventories, transactions, and nationwide dispatch operations.
          </p>
          <Link
            href="/account"
            className="inline-flex items-center justify-center space-x-2 w-full py-3 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#262626] transition-colors rounded-none shadow-sm"
          >
            <span>Sign In with Admin Credentials</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[11px] font-mono text-[#A1A1AA]">
            Authorized Administrator Access Only
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Overview & Analytics", href: "/admin", icon: LayoutDashboard },
    { label: "Products & Inventory", href: "/admin/products", icon: Shirt },
    { label: "Floating Hero Clothes", href: "/admin/hero", icon: Sparkles },
    { label: "Orders & Dispatch", href: "/admin/orders", icon: ShoppingBag },
    { label: "Coupons & Marketing", href: "/admin/marketing", icon: Tag },
    { label: "Social Media & Handles", href: "/admin/social", icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row border-t border-[#E5E5E5] text-[#0A0A0A] font-sans">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#FFFFFF] border-r border-[#E5E5E5] p-6 flex flex-col justify-between space-y-6 shadow-xs">
        <div className="space-y-6">
          <div className="pb-4 border-b border-[#E5E5E5]">
            <div className="flex items-center space-x-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest font-semibold block">
                EXECUTIVE ATELIER PORTAL
              </span>
            </div>
            <span className="text-xl font-serif font-bold uppercase text-[#0A0A0A] tracking-tight">
              ONLYCOLLECTION
            </span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F4F4F5] rounded-none transition-colors border-l-2 border-transparent hover:border-[#0A0A0A]"
                >
                  <Icon className="w-4 h-4 text-[#0A0A0A]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#E5E5E5] space-y-3 text-xs">
          <div className="text-[11px] font-sans text-[#71717A]">
            Logged in: <strong className="text-[#0A0A0A]">{user.name}</strong>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-2 text-[#0A0A0A] hover:underline text-xs font-semibold"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
