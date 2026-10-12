import React from "react";
import Link from "next/link";
import { RefreshCw, Truck, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExchangesPage() {
  return (
    <div className="min-h-screen bg-onyx-950 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 pb-8 border-b border-border">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
            HASSLE-FREE POLICY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-editorial tracking-tight">
            7-DAY DOORSTEP EXCHANGES
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Got the wrong size? We arrange doorstep pickup and courier your replacement anywhere in India.
          </p>
        </div>

        <div className="space-y-6 text-xs text-muted-foreground leading-relaxed">
          <div className="p-6 bg-onyx-900 border border-border space-y-3">
            <h3 className="text-sm font-bold uppercase text-white flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-volt" />
              <span>How It Works:</span>
            </h3>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>Message our WhatsApp concierge at <strong>+91 98765 43210</strong> or email <strong>support@kult.in</strong> within 7 days of receiving your order.</li>
              <li>Share your Order ID (e.g. KULT-ORD-1001) and the requested size.</li>
              <li>Our BlueDart agent picks up the original item from your doorstep.</li>
              <li>Your replacement size is dispatched instantly with fresh tracking!</li>
            </ol>
          </div>

          <div className="p-6 bg-onyx-900 border border-border space-y-3">
            <h3 className="text-sm font-bold uppercase text-white flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-volt" />
              <span>Conditions for Return/Exchange:</span>
            </h3>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Items must be unworn, unwashed, and in their original packaging with tags intact.</li>
              <li>Doorstep reverse pickups are serviced across 19,000+ PIN codes in India.</li>
              <li>For returns, refunds are credited back to your original UPI/bank account within 48 hours of inspection.</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link href="/collections/all">
            <Button size="lg" className="font-extrabold">
              Back to Collections
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
