"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Sparkles, Lock, Mail, Phone, User } from "lucide-react";

export function AccountAuthClient() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");

  const [loginEmail, setLoginEmail] = useState("aarav@gmail.com");
  const [loginPassword, setLoginPassword] = useState("customer123");
  const [showPassword, setShowPassword] = useState(false);

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to log in");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          phone: registerPhone,
          password: registerPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create account");
      setLoading(false);
    }
  };

  const setCustomerDemo = () => {
    setLoginEmail("aarav@gmail.com");
    setLoginPassword("customer123");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 sm:py-16 lg:py-24 flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E5E5E5] p-6 sm:p-8 space-y-6 shadow-sm rounded-none">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#E5E5E5] rounded-none mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#71717A]">
              MARWAR ATELIER ACCESS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A0A0A] tracking-tight">
            Royal Patron Portal
          </h1>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Sign in to track BlueDart deliveries, access saved delivery vaults, and preview private atelier drops.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 border border-[#E5E5E5] bg-[#F4F4F5] p-1 rounded-none">
          <button
            onClick={() => setTab("login")}
            className={`py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-none transition-all ${
              tab === "login"
                ? "bg-[#0A0A0A] text-white shadow-xs"
                : "text-[#71717A] hover:text-[#0A0A0A]"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("register")}
            className={`py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-none transition-all ${
              tab === "register"
                ? "bg-[#0A0A0A] text-white shadow-xs"
                : "text-[#71717A] hover:text-[#0A0A0A]"
            }`}
          >
            Register
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-[#991B1B] text-xs rounded-none">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#525252] uppercase mb-1.5 flex items-center space-x-1">
                <Mail className="w-3 h-3 text-[#71717A]" />
                <span>Email Address</span>
              </label>
              <Input
                required
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@email.com"
                className="bg-[#FAFAFA] border-[#E5E5E5] text-[#0A0A0A] focus:border-[#0A0A0A] rounded-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#525252] uppercase mb-1.5 flex items-center space-x-1">
                <Lock className="w-3 h-3 text-[#71717A]" />
                <span>Password</span>
              </label>
              <div className="relative">
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#FAFAFA] border-[#E5E5E5] text-[#0A0A0A] focus:border-[#0A0A0A] pr-10 rounded-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#0A0A0A]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-widest shadow-sm rounded-none transition-all"
            >
              {loading ? "AUTHENTICATING..." : "ENTER ATELIER"}
            </Button>

            {/* Quick Demo Fill Button */}
            <div className="pt-3 border-t border-[#E5E5E5]">
              <button
                type="button"
                onClick={setCustomerDemo}
                className="w-full py-2 bg-[#FAFAFA] border border-[#E5E5E5] text-[11px] font-mono font-semibold text-[#0A0A0A] hover:border-[#0A0A0A] rounded-none transition-colors text-center"
              >
                Use Patron Demo Account (Aarav)
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#525252] uppercase mb-1.5 flex items-center space-x-1">
                <User className="w-3 h-3 text-[#71717A]" />
                <span>Full Name</span>
              </label>
              <Input
                required
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="Devansh Kapoor"
                className="bg-[#FAFAFA] border-[#E5E5E5] text-[#0A0A0A] focus:border-[#0A0A0A] rounded-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#525252] uppercase mb-1.5 flex items-center space-x-1">
                <Mail className="w-3 h-3 text-[#71717A]" />
                <span>Email Address</span>
              </label>
              <Input
                required
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="devansh@gmail.com"
                className="bg-[#FAFAFA] border-[#E5E5E5] text-[#0A0A0A] focus:border-[#0A0A0A] rounded-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#525252] uppercase mb-1.5 flex items-center space-x-1">
                <Phone className="w-3 h-3 text-[#71717A]" />
                <span>Phone (For BlueDart SMS alerts)</span>
              </label>
              <Input
                type="tel"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                placeholder="9876543210"
                className="bg-[#FAFAFA] border-[#E5E5E5] text-[#0A0A0A] focus:border-[#0A0A0A] rounded-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#525252] uppercase mb-1.5 flex items-center space-x-1">
                <Lock className="w-3 h-3 text-[#71717A]" />
                <span>Create Password</span>
              </label>
              <Input
                required
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="bg-[#FAFAFA] border-[#E5E5E5] text-[#0A0A0A] focus:border-[#0A0A0A] rounded-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-widest shadow-sm rounded-none transition-all"
            >
              {loading ? "CREATING..." : "JOIN ROYAL ATELIER"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
