"use client";

import React, { useState } from "react";
import {
  Share2,
  Mail,
  ExternalLink,
  Save,
  CheckCircle2,
  Sparkles,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SocialSettingsClientProps {
  initialSettings: Record<string, string>;
}

// Brand SVG Icons
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export function SocialSettingsClient({ initialSettings }: SocialSettingsClientProps) {
  const [formData, setFormData] = useState({
    instagram: initialSettings.instagram || "https://instagram.com/onlycollection",
    whatsapp: initialSettings.whatsapp || "+91 98765 43210",
    youtube: initialSettings.youtube || "https://youtube.com/@onlycollection",
    twitter: initialSettings.twitter || "https://x.com/onlycollection",
    facebook: initialSettings.facebook || "https://facebook.com/onlycollection",
    pinterest: initialSettings.pinterest || "https://pinterest.com/onlycollection",
    support_email: initialSettings.support_email || "concierge@onlycollection.in",
    site_name: initialSettings.site_name || "OnlyCollection",
    brand_tagline: initialSettings.brand_tagline || "Haute Streetwear Atelier",
    phone: initialSettings.phone || "+91 98765 43210",
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update brand social handles");
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E5E5] gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none mb-2">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.2em] text-[#71717A]">
              SOCIAL CHANNELS & STORE IDENTITY
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#0A0A0A] tracking-tight">
            Social Media & Brand Handles
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-1">
            Manage your official OnlyCollection social handles, concierge WhatsApp line, and storefront identity.
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-widest h-11 px-6 rounded-none shadow-sm transition-all flex items-center space-x-2 shrink-0"
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
        <div className="p-4 bg-[#FAFAFA] border border-[#0A0A0A] rounded-none flex items-center space-x-3 text-xs text-[#0A0A0A] animate-accordion-down">
          <CheckCircle2 className="w-5 h-5 text-[#0A0A0A] shrink-0" />
          <span className="font-semibold">
            Social media handles and brand identity successfully synchronized! Storefront footers and concierge channels are live.
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-none text-xs text-[#991B1B]">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Social Media Channels */}
        <div className="bg-white border border-[#E5E5E5] p-6 rounded-none shadow-xs space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#E5E5E5]">
            <Share2 className="w-4 h-4 text-[#0A0A0A]" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-[#0A0A0A]">
              Official Social Profiles
            </h2>
          </div>

          {/* Instagram */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#0A0A0A] uppercase">
              <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>Instagram Profile URL</span>
            </label>
            <div className="flex items-center space-x-2">
              <Input
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/onlycollection"
                className="text-xs h-10 border-[#E5E5E5] focus:border-[#0A0A0A] bg-[#FAFAFA] rounded-none"
              />
              {formData.instagram && (
                <a
                  href={formData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#E5E5E5] text-[#71717A] hover:text-[#0A0A0A] rounded-none"
                  title="Test link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* WhatsApp Concierge */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#0A0A0A] uppercase">
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Concierge Hotline</span>
            </label>
            <Input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="text-xs h-10 border-[#E5E5E5] focus:border-[#0A0A0A] bg-[#FAFAFA] rounded-none"
            />
            <p className="text-[10px] text-[#71717A]">
              Patrons will be directly connected to your Jodhpur atelier private concierge on click.
            </p>
          </div>

          {/* YouTube */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#0A0A0A] uppercase">
              <YoutubeIcon className="w-3.5 h-3.5 text-[#FF0000]" />
              <span>YouTube Channel URL</span>
            </label>
            <Input
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/@onlycollection"
              className="text-xs h-10 border-[#E5E5E5] focus:border-[#0A0A0A] bg-[#FAFAFA] rounded-none"
            />
          </div>

          {/* X / Twitter */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#0A0A0A] uppercase">
              <TwitterIcon className="w-3.5 h-3.5 text-[#0A0A0A]" />
              <span>X / Twitter Profile URL</span>
            </label>
            <Input
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="https://x.com/onlycollection"
              className="text-xs h-10 border-[#E5E5E5] focus:border-[#0A0A0A] bg-[#FAFAFA] rounded-none"
            />
          </div>

          {/* Facebook */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#0A0A0A] uppercase">
              <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
              <span>Facebook Page URL</span>
            </label>
            <Input
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/onlycollection"
              className="text-xs h-10 border-[#E5E5E5] focus:border-[#0A0A0A] bg-[#FAFAFA] rounded-none"
            />
          </div>

          {/* Pinterest */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#0A0A0A] uppercase">
              <Globe className="w-3.5 h-3.5 text-[#E60023]" />
              <span>Pinterest / Lookbook Board URL</span>
            </label>
            <Input
              name="pinterest"
              value={formData.pinterest}
              onChange={handleChange}
              placeholder="https://pinterest.com/onlycollection"
              className="text-xs h-10 border-[#E5E5E5] focus:border-[#0A0A0A] bg-[#FAFAFA] rounded-none"
            />
          </div>
        </div>

        {/* Section 2: Brand Identity & Concierge Details */}
        <div className="space-y-8">
          <div className="bg-white border border-[#E5E5E5] p-6 rounded-none shadow-xs space-y-5">
            <div className="flex items-center space-x-2 pb-3 border-b border-[#E5E5E5]">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-[#0A0A0A]">
                Store Identity & Concierge
              </h2>
            </div>

            {/* Site Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-sans font-semibold text-[#0A0A0A] uppercase block">
                Official Brand Name
              </label>
              <Input
                name="site_name"
                value={formData.site_name}
                onChange={handleChange}
                placeholder="OnlyCollection"
                className="text-xs h-10 border-[#E5E5E5] focus:border-[#0A0A0A] bg-[#FAFAFA] rounded-none"
              />
            </div>

            {/* Tagline */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-sans font-semibold text-[#0A0A0A] uppercase block">
                Brand Heritage Tagline
              </label>
              <Input
                name="brand_tagline"
                value={formData.brand_tagline}
                onChange={handleChange}
                placeholder="Haute Streetwear Atelier"
                className="text-xs h-10 border-[#E5E5E5] focus:border-[#0A0A0A] bg-[#FAFAFA] rounded-none"
              />
            </div>

            {/* Concierge Email */}
            <div className="space-y-1.5">
              <label className="flex items-center space-x-2 text-[11px] font-sans font-semibold text-[#0A0A0A] uppercase">
                <Mail className="w-3.5 h-3.5 text-[#0A0A0A]" />
                <span>Client Care Concierge Email</span>
              </label>
              <Input
                name="support_email"
                value={formData.support_email}
                onChange={handleChange}
                placeholder="concierge@onlycollection.in"
                className="text-xs h-10 border-[#E5E5E5] focus:border-[#0A0A0A] bg-[#FAFAFA] rounded-none"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-sans font-semibold text-[#0A0A0A] uppercase block">
                Atelier Direct Phone
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="text-xs h-10 border-[#E5E5E5] focus:border-[#0A0A0A] bg-[#FAFAFA] rounded-none"
              />
            </div>
          </div>

          {/* Live Storefront Preview Card */}
          <div className="p-6 bg-[#F4F4F5] border border-[#E5E5E5] rounded-none space-y-4">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#71717A] block">
              LIVE FOOTER PREVIEW
            </span>
            <div className="bg-white p-4 rounded-none border border-[#E5E5E5] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-serif font-bold text-base text-[#0A0A0A] block">
                  {formData.site_name || "OnlyCollection"}
                </span>
                <span className="text-[10px] font-sans text-[#71717A]">
                  {formData.brand_tagline || "Haute Streetwear Atelier"}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-[#0A0A0A]">
                {formData.instagram && <InstagramIcon className="w-4 h-4 text-[#0A0A0A]" />}
                {formData.whatsapp && <WhatsAppIcon className="w-4 h-4 text-[#0A0A0A]" />}
                {formData.youtube && <YoutubeIcon className="w-4 h-4 text-[#0A0A0A]" />}
                {formData.twitter && <TwitterIcon className="w-4 h-4 text-[#0A0A0A]" />}
              </div>
            </div>
            <p className="text-[11px] text-[#71717A] leading-relaxed">
              When updated here, all customer-facing touchpoints (Announcement Bar, Header, Concierge buttons, and Storefront Footer) will link to these verified channels.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
