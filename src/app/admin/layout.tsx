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
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#FDFCF7] text-[#1C1917] font-sans">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E7E2D9] p-8 text-center space-y-5 shadow-lg rounded-sm">
          <div className="w-14 h-14 bg-[#FAF6EE] border border-[#C5A059]/40 text-[#8B1E1E] rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-sans font-bold text-[#8B1E1E] uppercase tracking-widest block">
            AUTHENTICATED PERSONNEL ONLY
          </span>
          <h1 className="text-2xl font-serif font-bold uppercase text-[#1C1917]">
            Admin Clearance Required
          </h1>
          <p className="text-xs text-[#78716C] leading-relaxed">
            This executive workspace manages live atelier inventories, transactions, and nationwide dispatch operations.
          </p>
          <Link
            href="/account"
            className="inline-flex items-center justify-center space-x-2 w-full py-3 bg-[#8B1E1E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6B1414] transition-colors rounded-sm shadow-sm"
          >
            <span>Sign In with Admin Credentials</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[11px] font-sans text-[#A8A29E]">
            Demo credentials: admin@rsclothing.in / admin123
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Overview & Analytics", href: "/admin", icon: LayoutDashboard },
    { label: "Products & Inventory", href: "/admin/products", icon: Shirt },
    { label: "Orders & Dispatch", href: "/admin/orders", icon: ShoppingBag },
    { label: "Coupons & Marketing", href: "/admin/marketing", icon: Tag },
    { label: "Social Media & Handles", href: "/admin/social", icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF7] flex flex-col md:flex-row border-t border-[#E7E2D9] text-[#1C1917] font-sans">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#FFFFFF] border-r border-[#E7E2D9] p-6 flex flex-col justify-between space-y-6 shadow-xs">
        <div className="space-y-6">
          <div className="pb-4 border-b border-[#E7E2D9]">
            <div className="flex items-center space-x-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] font-sans text-[#8B1E1E] uppercase tracking-widest font-bold block">
                EXECUTIVE ATELIER PORTAL
              </span>
            </div>
            <span className="text-xl font-serif font-bold uppercase text-[#1C1917] tracking-tight">
              RS CLOTHING
            </span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#57534E] hover:text-[#8B1E1E] hover:bg-[#FAF6EE] rounded-sm transition-colors border-l-2 border-transparent hover:border-[#8B1E1E]"
                >
                  <Icon className="w-4 h-4 text-[#8B1E1E]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#E7E2D9] space-y-3 text-xs">
          <div className="text-[11px] font-sans text-[#78716C]">
            Logged in: <strong className="text-[#1C1917]">{user.name}</strong>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-2 text-[#8B1E1E] hover:underline text-xs font-semibold"
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
