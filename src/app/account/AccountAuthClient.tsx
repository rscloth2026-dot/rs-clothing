"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Mail, Phone, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AccountAuthClient() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");

  const [loginEmail, setLoginEmail] = useState("aarav@gmail.com");
  const [loginPassword, setLoginPassword] = useState("customer123");

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

  const setAdminDemo = () => {
    setLoginEmail("admin@kult.in");
    setLoginPassword("admin123");
  };

  const setCustomerDemo = () => {
    setLoginEmail("aarav@gmail.com");
    setLoginPassword("customer123");
  };

  return (
    <div className="min-h-screen bg-onyx-950 py-16 lg:py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-onyx-900 border border-border p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-volt">
            KULT ACCESS
          </span>
          <h1 className="text-3xl font-black uppercase text-white font-editorial tracking-tight">
            CUSTOMER PORTAL
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in to track orders, access saved addresses, and manage drops.
          </p>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 border border-border bg-onyx-950 p-1">
          <button
            onClick={() => setTab("login")}
            className={`py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              tab === "login" ? "bg-volt text-black font-extrabold" : "text-muted-foreground hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("register")}
            className={`py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              tab === "register" ? "bg-volt text-black font-extrabold" : "text-muted-foreground hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-destructive/10 border border-destructive text-destructive text-xs">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                Email Address
              </label>
              <Input
                required
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@email.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                Password
              </label>
              <Input
                required
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 text-xs font-black uppercase">
              {loading ? "AUTHENTICATING..." : "SIGN IN TO KULT"}
            </Button>

            {/* Quick Demo Fill Buttons for Testing */}
            <div className="pt-4 border-t border-border space-y-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase block text-center">
                One-Click Demo Profiles for Testing:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={setCustomerDemo}
                  className="px-2 py-1.5 bg-onyx-800 border border-border text-[11px] font-mono text-white hover:border-volt hover:text-volt"
                >
                  Customer Demo (Aarav)
                </button>
                <button
                  type="button"
                  onClick={setAdminDemo}
                  className="px-2 py-1.5 bg-onyx-800 border border-border text-[11px] font-mono text-volt hover:border-volt hover:bg-volt/10"
                >
                  Admin Portal (admin@kult.in)
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                Full Name
              </label>
              <Input
                required
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="Devansh Kapoor"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                Email Address
              </label>
              <Input
                required
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="devansh@gmail.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                Phone Number (Optional)
              </label>
              <Input
                type="tel"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                placeholder="9876543210"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">
                Create Password
              </label>
              <Input
                required
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Min 6 characters"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 text-xs font-black uppercase">
              {loading ? "CREATING..." : "JOIN THE KULT"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
