"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Loader2, Mail, CheckCircle, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    setError("");
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF4E2] flex items-center justify-center px-6 py-16">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <svg className="absolute -top-40 -right-40 opacity-[0.06]" width="600" height="600" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="#2B895A" strokeWidth="60" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <a href="/"><Logo variant="default" /></a>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-[#F7E9D4] p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2B895A]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={28} className="text-[#2B895A]" />
              </div>
              <h2 className="font-heading text-3xl font-light text-[#1A1A1A] mb-2">
                Link <span className="italic">sent</span>
              </h2>
              <p className="font-body text-sm text-[#1A1A1A]/60 leading-relaxed mb-7">
                We sent a password reset link to{" "}
                <span className="font-semibold text-[#1A1A1A]">{email}</span>.
                Check your inbox and follow the instructions.
              </p>
              <a
                href="/login"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold py-3.5 rounded-full transition-colors duration-200"
              >
                <ArrowLeft size={15} />
                Back to Sign In
              </a>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-3xl font-light text-[#1A1A1A] mb-1">
                Reset <span className="italic">password</span>
              </h1>
              <p className="font-body text-sm text-[#1A1A1A]/55 mb-7">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p className="font-body text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  className="w-full bg-[#2B895A] hover:bg-[#1F6944] disabled:opacity-60 text-white font-body text-sm font-semibold py-3.5 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {loading ? "Sending…" : "Send Reset Link"}
                </motion.button>
              </form>
            </>
          )}
        </div>

        <p className="font-body text-sm text-[#1A1A1A]/55 text-center mt-6">
          <a href="/login" className="inline-flex items-center gap-1.5 text-[#2B895A] font-medium hover:text-[#1F6944] transition-colors">
            <ArrowLeft size={13} />
            Back to Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
}
