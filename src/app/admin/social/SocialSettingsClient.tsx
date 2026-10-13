"use client";

import React, { useState } from "react";
import {
  Share2,
  Mail,
  CheckCircle2,
  Sparkles,
  Save,
  Globe,
  ExternalLink,
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
import { Input } from "@/components/ui/input";

interface SocialSettingsClientProps {
  initialSettings: Record<string, string>;
}

export function SocialSettingsClient({ initialSettings }: SocialSettingsClientProps) {
  const [formData, setFormData] = useState({
    site_name: initialSettings.site_name || "RS Clothing",
    brand_tagline: initialSettings.brand_tagline || "Marwar Atelier // Jodhpur",
    instagram: initialSettings.instagram || "https://instagram.com/rsclothing.jodhpur",
    whatsapp: initialSettings.whatsapp || "+91 98765 43210",
    youtube: initialSettings.youtube || "https://youtube.com/@rsclothing",
    twitter: initialSettings.twitter || "https://x.com/rsclothing",
    facebook: initialSettings.facebook || "https://facebook.com/rsclothing.jodhpur",
    pinterest: initialSettings.pinterest || "https://pinterest.com/rsclothing",
    support_email: initialSettings.support_email || "concierge@rsclothing.in",
    phone: initialSettings.phone || "+91 98765 43210",
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: formData }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update settings");
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7E2D9] gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mb-2">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E]">
              SOCIAL CHANNELS & STORE IDENTITY
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
            Social Media & Brand Handles
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1 font-sans">
            Manage your official RS Clothing social handles, concierge WhatsApp line, and storefront identity.
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-[#8B1E1E] hover:bg-[#6B1414] text-white text-xs font-bold uppercase tracking-wider h-11 px-6 rounded-[2px] shadow-sm transition-all tactile-btn flex items-center space-x-2 shrink-0"
        >
          {saving ? (
            <span>Saving Changes...</span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save All Handles</span>
            </>
          )}
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-[#FAF6EE] border border-[#C5A059] rounded-[2px] flex items-center space-x-3 text-xs text-[#8B1E1E] animate-accordion-down">
          <CheckCircle2 className="w-5 h-5 text-[#8B1E1E] shrink-0" />
          <span className="font-semibold">
            Social media handles and brand identity successfully synchronized! Storefront footers and concierge channels are live.
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-[2px] text-xs text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Social Media Channels */}
        <div className="bg-white border border-[#E7E2D9] p-6 rounded-[2px] shadow-xs space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#F0ECE1]">
            <Share2 className="w-4 h-4 text-[#8B1E1E]" />
            <h2 className="text-xs font-sans font-bold uppercase tracking-[0.15em] text-[#1C1917]">
              Official Social Profiles
            </h2>
          </div>

          {/* Instagram */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#1C1917] uppercase">
              <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>Instagram Profile URL</span>
            </label>
            <div className="flex items-center space-x-2">
              <Input
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/rsclothing.jodhpur"
                className="text-xs h-10 border-[#E7E2D9] focus:border-[#C5A059]"
              />
              {formData.instagram && (
                <a
                  href={formData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#E7E2D9] text-[#78716C] hover:text-[#8B1E1E] rounded-[2px]"
                  title="Test link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* WhatsApp Concierge */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#1C1917] uppercase">
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Concierge Hotline</span>
            </label>
            <Input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="text-xs h-10 border-[#E7E2D9] focus:border-[#C5A059]"
            />
            <p className="text-[10px] text-[#78716C]">
              Patrons will be directly connected to your Jodhpur atelier private concierge on click.
            </p>
          </div>

          {/* YouTube */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#1C1917] uppercase">
              <YoutubeIcon className="w-3.5 h-3.5 text-[#FF0000]" />
              <span>YouTube Channel URL</span>
            </label>
            <Input
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/@rsclothing"
              className="text-xs h-10 border-[#E7E2D9] focus:border-[#C5A059]"
            />
          </div>

          {/* X / Twitter */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#1C1917] uppercase">
              <TwitterIcon className="w-3.5 h-3.5 text-[#1DA1F2]" />
              <span>X / Twitter Profile URL</span>
            </label>
            <Input
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="https://x.com/rsclothing"
              className="text-xs h-10 border-[#E7E2D9] focus:border-[#C5A059]"
            />
          </div>

          {/* Facebook */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#1C1917] uppercase">
              <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
              <span>Facebook Page URL</span>
            </label>
            <Input
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/rsclothing.jodhpur"
              className="text-xs h-10 border-[#E7E2D9] focus:border-[#C5A059]"
            />
          </div>

          {/* Pinterest */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#1C1917] uppercase">
              <Globe className="w-3.5 h-3.5 text-[#E60023]" />
              <span>Pinterest / Lookbook Board URL</span>
            </label>
            <Input
              name="pinterest"
              value={formData.pinterest}
              onChange={handleChange}
              placeholder="https://pinterest.com/rsclothing"
              className="text-xs h-10 border-[#E7E2D9] focus:border-[#C5A059]"
            />
          </div>
        </div>

        {/* Section 2: Brand Identity & Concierge Details */}
        <div className="space-y-8">
          <div className="bg-white border border-[#E7E2D9] p-6 rounded-[2px] shadow-xs space-y-5">
            <div className="flex items-center space-x-2 pb-3 border-b border-[#F0ECE1]">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.15em] text-[#1C1917]">
                Store Identity & Concierge
              </h2>
            </div>

            {/* Site Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-sans font-semibold text-[#1C1917] uppercase block">
                Official Brand Name
              </label>
              <Input
                name="site_name"
                value={formData.site_name}
                onChange={handleChange}
                placeholder="RS Clothing"
                className="text-xs h-10 border-[#E7E2D9] focus:border-[#C5A059]"
              />
            </div>

            {/* Tagline */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-sans font-semibold text-[#1C1917] uppercase block">
                Brand Heritage Tagline
              </label>
              <Input
                name="brand_tagline"
                value={formData.brand_tagline}
                onChange={handleChange}
                placeholder="Marwar Atelier // Jodhpur"
                className="text-xs h-10 border-[#E7E2D9] focus:border-[#C5A059]"
              />
            </div>

            {/* Concierge Email */}
            <div className="space-y-1.5">
              <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#1C1917] uppercase">
                <Mail className="w-3.5 h-3.5 text-[#8B1E1E]" />
                <span>Client Care Concierge Email</span>
              </label>
              <Input
                name="support_email"
                value={formData.support_email}
                onChange={handleChange}
                placeholder="concierge@rsclothing.in"
                className="text-xs h-10 border-[#E7E2D9] focus:border-[#C5A059]"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-sans font-semibold text-[#1C1917] uppercase block">
                Atelier Direct Phone
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="text-xs h-10 border-[#E7E2D9] focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* Live Storefront Preview Card */}
          <div className="p-6 bg-[#FAF6EE] border border-[#C5A059]/40 rounded-[2px] space-y-4">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#8B1E1E] block">
              LIVE FOOTER PREVIEW
            </span>
            <div className="bg-white p-4 rounded-[2px] border border-[#E7E2D9] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-serif font-bold text-base text-[#1C1917] block">
                  {formData.site_name || "RS Clothing"}
                </span>
                <span className="text-[10px] font-sans text-[#78716C]">
                  {formData.brand_tagline || "Marwar Atelier // Jodhpur"}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-[#1C1917]">
                {formData.instagram && <InstagramIcon className="w-4 h-4 text-[#8B1E1E]" />}
                {formData.whatsapp && <WhatsAppIcon className="w-4 h-4 text-[#C5A059]" />}
                {formData.youtube && <YoutubeIcon className="w-4 h-4 text-[#1C1917]" />}
                {formData.twitter && <TwitterIcon className="w-4 h-4 text-[#1C1917]" />}
              </div>
            </div>
            <p className="text-[11px] text-[#78716C] leading-relaxed">
              When updated here, all customer-facing touchpoints (Announcement Bar, Header, Concierge buttons, and Storefront Footer) will link to these verified channels.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
