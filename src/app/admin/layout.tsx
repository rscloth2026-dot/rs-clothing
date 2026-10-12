import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Tag,
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
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-onyx-950">
        <div className="max-w-md w-full bg-onyx-900 border border-border p-8 text-center space-y-5">
          <div className="w-14 h-14 bg-volt/10 border border-volt/30 text-volt rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-mono text-volt uppercase tracking-widest block">
            SECURITY GATE
          </span>
          <h1 className="text-2xl font-black uppercase text-white font-editorial">
            Admin Access Required
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This protected workspace controls live product inventories, Razorpay transactions, and fulfillment in India.
          </p>
          <Link
            href="/account"
            className="inline-flex items-center justify-center space-x-2 w-full py-3 bg-volt text-black text-xs font-black uppercase tracking-wider hover:bg-[#B8E600]"
          >
            <span>Sign In with Admin Credentials</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[11px] font-mono text-muted-foreground">
            Seed admin: admin@kult.in / admin123
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
  ];

  return (
    <div className="min-h-screen bg-onyx-950 flex flex-col md:flex-row border-t border-border">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-onyx-900 border-r border-border p-6 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          <div className="pb-4 border-b border-border/80">
            <span className="text-[10px] font-mono text-volt uppercase tracking-widest font-bold block">
              CONTROL CENTER
            </span>
            <span className="text-xl font-black uppercase text-white font-editorial tracking-tight">
              KULT OPERATIONS
            </span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-white hover:bg-onyx-800 transition-colors border-l-2 border-transparent hover:border-volt"
                >
                  <Icon className="w-4 h-4 text-volt" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-border/60 space-y-3 text-xs">
          <div className="text-[11px] font-mono text-muted-foreground">
            Logged in: <strong className="text-white">{user.name}</strong>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-2 text-volt hover:underline text-xs font-mono"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
