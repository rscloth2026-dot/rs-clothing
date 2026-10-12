import React from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-onyx-950 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 pb-8 border-b border-border">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
            CONCIERGE & SUPPORT
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-editorial tracking-tight">
            GET IN TOUCH
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Our Indian support concierge is on standby 7 days a week for sizing advice, exchange requests, and delivery queries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details Card */}
          <div className="p-8 bg-onyx-900 border border-border space-y-6">
            <h2 className="text-xl font-black uppercase text-white font-editorial">
              Direct Channels
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-volt mt-0.5" />
                <div>
                  <span className="font-mono text-muted-foreground uppercase text-[10px] block">Customer Care</span>
                  <a href="mailto:support@kult.in" className="text-white font-bold hover:text-volt">
                    support@kult.in
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageSquare className="w-4 h-4 text-volt mt-0.5" />
                <div>
                  <span className="font-mono text-muted-foreground uppercase text-[10px] block">WhatsApp Concierge</span>
                  <span className="text-white font-mono font-bold">+91 98765 43210</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-volt mt-0.5" />
                <div>
                  <span className="font-mono text-muted-foreground uppercase text-[10px] block">Fulfillment Central</span>
                  <span className="text-muted-foreground">
                    KULT Streetwear Pvt Ltd, Okhla Phase 3 Industrial Area, New Delhi 110020, India
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-volt mt-0.5" />
                <div>
                  <span className="font-mono text-muted-foreground uppercase text-[10px] block">Hours</span>
                  <span className="text-muted-foreground">Monday - Saturday: 10:00 AM - 7:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Inquiry Form */}
          <div className="p-8 bg-onyx-900 border border-border space-y-4">
            <h2 className="text-xl font-black uppercase text-white font-editorial">
              Send a Message
            </h2>
            <form className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Aarav Sharma"
                  className="w-full h-11 bg-onyx-800 border border-border px-3 text-white focus:outline-none focus:border-volt"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="aarav@gmail.com"
                  className="w-full h-11 bg-onyx-800 border border-border px-3 text-white focus:outline-none focus:border-volt"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Need help with sizing or exchange..."
                  className="w-full bg-onyx-800 border border-border p-3 text-white focus:outline-none focus:border-volt"
                />
              </div>

              <Button type="button" className="w-full font-black">
                Send Inquiry to Concierge
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
