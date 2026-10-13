"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Sizing & Atelier Sourcing",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit concierge inquiry");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please reach us via direct email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] py-12 sm:py-16 lg:py-24 text-[#1C1917] font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="text-center space-y-3 pb-8 border-b border-[#E7E2D9]">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#8B1E1E]">
              ROYAL ATELIER CONCIERGE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold uppercase text-[#1C1917] tracking-tight mt-1">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed font-sans">
            Our private atelier client care in Jodhpur, Rajasthan is available 7 days a week for sizing consultations, styling advice, and order tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Details Card */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E7E2D9] space-y-6 rounded-sm shadow-xs">
            <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E]">
              Direct Channels
            </h2>

            <div className="space-y-5 text-xs">
              <div className="flex items-start space-x-3.5">
                <Mail className="w-4 h-4 text-[#8B1E1E] mt-0.5" />
                <div>
                  <span className="font-semibold text-[#78716C] uppercase text-[10px] block">Concierge Email</span>
                  <a href="mailto:concierge@rsclothing.in" className="text-[#1C1917] font-semibold hover:text-[#8B1E1E] transition-colors">
                    concierge@rsclothing.in
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <MessageSquare className="w-4 h-4 text-[#8B1E1E] mt-0.5" />
                <div>
                  <span className="font-semibold text-[#78716C] uppercase text-[10px] block">WhatsApp Royal Concierge</span>
                  <span className="text-[#1C1917] font-semibold">+91 98765 43210</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <MapPin className="w-4 h-4 text-[#8B1E1E] mt-0.5" />
                <div>
                  <span className="font-semibold text-[#78716C] uppercase text-[10px] block">Atelier Workshop & Dispatch Hub</span>
                  <span className="text-[#57534E] leading-relaxed block mt-0.5">
                    RS Clothing Atelier, Circuit House Road, Ratanada, Jodhpur 342001, Rajasthan, India
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="w-4 h-4 text-[#8B1E1E] mt-0.5" />
                <div>
                  <span className="font-semibold text-[#78716C] uppercase text-[10px] block">Operational Hours</span>
                  <span className="text-[#57534E] block mt-0.5">Monday - Saturday: 10:00 AM - 7:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0ECE1] flex items-center space-x-2 text-[11px] text-[#78716C]">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Priority Response Within 2 Business Hours</span>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E7E2D9] rounded-sm shadow-xs">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                <div className="w-12 h-12 rounded-full bg-[#FAF6EE] border border-[#C5A059]/40 text-[#8B1E1E] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold uppercase text-[#1C1917]">
                  Dispatch Inquiry Transmitted
                </h3>
                <p className="text-xs text-[#78716C] leading-relaxed max-w-xs">
                  Your message has reached our head of concierge. An atelier representative will reply to your registered email shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "General Sizing & Atelier Sourcing", message: "" });
                  }}
                  className="text-xs text-[#8B1E1E] font-bold hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E]">
                  Inquiry Transmission
                </h2>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-[#8B1E1E] text-xs rounded-sm">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-semibold text-[#57534E] uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Aarav Sharma"
                    className="w-full bg-[#FDFCF7] border border-[#E7E2D9] rounded-sm px-3.5 py-2.5 text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#57534E] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full bg-[#FDFCF7] border border-[#E7E2D9] rounded-sm px-3.5 py-2.5 text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#57534E] uppercase mb-1">
                    Inquiry Topic *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FDFCF7] border border-[#E7E2D9] rounded-sm px-3 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="General Sizing & Atelier Sourcing">General Sizing & Atelier Sourcing</option>
                    <option value="BlueDart Air Order Tracking">BlueDart Air Order Tracking</option>
                    <option value="7-Day Doorstep Exchange Request">7-Day Doorstep Exchange Request</option>
                    <option value="Press & Stylist Collaborations">Press & Stylist Collaborations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#57534E] uppercase mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our atelier concierge assist you?"
                    className="w-full bg-[#FDFCF7] border border-[#E7E2D9] rounded-sm p-3 text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-[#8B1E1E] hover:bg-[#6B1414] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "TRANSMITTING..." : "SUBMIT INQUIRY"}</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
