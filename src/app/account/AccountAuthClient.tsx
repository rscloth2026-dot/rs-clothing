"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ShieldCheck, Sparkles, User, Lock, Mail, Phone } from "lucide-react";

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
    <div className="min-h-screen bg-[#FDFCF7] py-12 sm:py-16 lg:py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E7E2D9] p-6 sm:p-8 space-y-6 shadow-md rounded-sm">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-full mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#8B1E1E]">
              MARWAR ATELIER ACCESS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] tracking-tight">
            Royal Patron Portal
          </h1>
          <p className="text-xs text-[#78716C] font-sans leading-relaxed">
            Sign in to track BlueDart deliveries, access saved delivery vaults, and preview private atelier drops.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 border border-[#E7E2D9] bg-[#FAF6EE] p-1 rounded-sm">
          <button
            onClick={() => setTab("login")}
            className={`py-2 text-xs font-sans font-bold uppercase tracking-wider rounded-sm transition-all ${
              tab === "login"
                ? "bg-[#8B1E1E] text-white shadow-xs"
                : "text-[#78716C] hover:text-[#1C1917]"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("register")}
            className={`py-2 text-xs font-sans font-bold uppercase tracking-wider rounded-sm transition-all ${
              tab === "register"
                ? "bg-[#8B1E1E] text-white shadow-xs"
                : "text-[#78716C] hover:text-[#1C1917]"
            }`}
          >
            Register
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-[#8B1E1E] text-xs font-sans rounded-sm">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase mb-1.5 flex items-center space-x-1">
                <Mail className="w-3 h-3 text-[#C5A059]" />
                <span>Email Address</span>
              </label>
              <Input
                required
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@email.com"
                className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase mb-1.5 flex items-center space-x-1">
                <Lock className="w-3 h-3 text-[#C5A059]" />
                <span>Password</span>
              </label>
              <div className="relative">
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#1C1917]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#8B1E1E] hover:bg-[#6B1414] text-white text-xs font-sans font-bold uppercase tracking-widest shadow-sm rounded-sm"
            >
              {loading ? "AUTHENTICATING..." : "ENTER ATELIER"}
            </Button>

            {/* Quick Demo Fill Button */}
            <div className="pt-3 border-t border-[#F0ECE1]">
              <button
                type="button"
                onClick={setCustomerDemo}
                className="w-full py-2 bg-[#FAF6EE] border border-[#E7E2D9] text-[11px] font-sans font-semibold text-[#8B1E1E] hover:border-[#C5A059] rounded-sm transition-colors text-center"
              >
                Use Patron Demo Account (Aarav)
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase mb-1.5 flex items-center space-x-1">
                <User className="w-3 h-3 text-[#C5A059]" />
                <span>Full Name</span>
              </label>
              <Input
                required
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="Devansh Kapoor"
                className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase mb-1.5 flex items-center space-x-1">
                <Mail className="w-3 h-3 text-[#C5A059]" />
                <span>Email Address</span>
              </label>
              <Input
                required
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="devansh@gmail.com"
                className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase mb-1.5 flex items-center space-x-1">
                <Phone className="w-3 h-3 text-[#C5A059]" />
                <span>Phone (For BlueDart SMS alerts)</span>
              </label>
              <Input
                type="tel"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                placeholder="9876543210"
                className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#57534E] uppercase mb-1.5 flex items-center space-x-1">
                <Lock className="w-3 h-3 text-[#C5A059]" />
                <span>Create Password</span>
              </label>
              <Input
                required
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="bg-[#FFFFFF] border-[#E7E2D9] text-[#1C1917] focus:border-[#C5A059]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#8B1E1E] hover:bg-[#6B1414] text-white text-xs font-sans font-bold uppercase tracking-widest shadow-sm rounded-sm"
            >
              {loading ? "CREATING..." : "JOIN ROYAL ATELIER"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
