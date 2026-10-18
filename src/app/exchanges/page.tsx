import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExchangesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 lg:py-24 text-[#0A0A0A] font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 pb-8 border-b border-[#E5E5E5]">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#71717A]">
              ROYAL PATRON PROMISE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold uppercase text-[#0A0A0A] tracking-tight">
            7-Day Doorstep Exchanges
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] max-w-md mx-auto leading-relaxed">
            Need a different size? We arrange prompt doorstep pickup and courier your replacement anywhere across India.
          </p>
        </div>

        <div className="space-y-6 text-xs text-[#525252] leading-relaxed">
          <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E5E5E5] space-y-3.5 rounded-none shadow-xs">
            <h3 className="text-sm font-serif font-bold uppercase text-[#0A0A0A] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#0A0A0A]" />
              <span>Exchange Protocol</span>
            </h3>
            <ol className="list-decimal list-inside space-y-2.5 pl-2 text-[#525252]">
              <li>Message our WhatsApp concierge at <strong className="text-[#0A0A0A]">+91 98765 43210</strong> or email <strong className="text-[#0A0A0A]">concierge@onlycollection.in</strong> within 7 days of delivery.</li>
              <li>Share your Order ID (e.g. OC-COD-1001 or OC-RZP-1001) and your desired replacement size.</li>
              <li>Our BlueDart courier partner arrives at your address for doorstep verification and pickup.</li>
              <li>Your replacement garment is dispatched immediately with live Air express tracking.</li>
            </ol>
          </div>

          <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E5E5E5] space-y-3.5 rounded-none shadow-xs">
            <h3 className="text-sm font-serif font-bold uppercase text-[#0A0A0A] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#0A0A0A]" />
              <span>Inspection & Policy Terms</span>
            </h3>
            <ul className="list-disc list-inside space-y-2.5 pl-2 text-[#525252]">
              <li>Garments must remain unworn, unwashed, and in original luxury packaging with seal tags intact.</li>
              <li>Doorstep reverse pickups are serviced seamlessly across 19,000+ PIN codes in India.</li>
              <li>If returning for refund, payouts are credited back to your original UPI or bank source within 48 hours of studio inspection.</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link href="/collections/all">
            <Button className="bg-[#0A0A0A] hover:bg-[#262626] text-white font-bold uppercase tracking-widest text-xs h-12 px-8 rounded-none shadow-sm transition-all">
              <span>Back to Collections</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
