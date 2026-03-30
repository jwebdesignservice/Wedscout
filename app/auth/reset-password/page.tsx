"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle, Loader2, Lock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("Please enter a new password.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFF4E2] flex items-center justify-center px-6 py-16">
      {/* Background arc */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <svg className="absolute -top-40 -right-40 opacity-[0.06]" width="600" height="600" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="#2B895A" strokeWidth="60" />
        </svg>
        <svg className="absolute -bottom-32 -left-32 opacity-[0.05]" width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="#2B895A" strokeWidth="40" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/">
            <Logo variant="default" />
          </a>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-[#F7E9D4] p-8">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-[#2B895A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-[#2B895A]" />
              </div>
              <h2 className="font-heading text-2xl font-light text-[#1A1A1A] mb-2">
                Password <span className="italic">updated</span>
              </h2>
              <p className="font-body text-sm text-[#1A1A1A]/55">
                Your password has been changed successfully. Redirecting you to sign in…
              </p>
            </motion.div>
          ) : (
            <>
              <h1 className="font-heading text-3xl font-light text-[#1A1A1A] mb-1">
                New <span className="italic">password</span>
              </h1>
              <p className="font-body text-sm text-[#1A1A1A]/55 mb-7">
                Enter and confirm your new password below.
              </p>

              {error && (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p className="font-body text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* New password */}
                <div>
                  <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      className="w-full pl-10 pr-11 py-3 font-body text-sm bg-[#FFF4E2] border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35 pointer-events-none" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      className="w-full pl-10 pr-11 py-3 font-body text-sm bg-[#FFF4E2] border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  className="w-full bg-[#2B895A] hover:bg-[#1F6944] disabled:opacity-60 text-white font-body text-sm font-semibold py-3.5 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {loading ? "Updating…" : "Update Password"}
                </motion.button>
              </form>
            </>
          )}
        </div>

        <p className="font-body text-sm text-[#1A1A1A]/55 text-center mt-6">
          Remember your password?{" "}
          <a href="/login" className="text-[#2B895A] font-medium hover:text-[#1F6944] transition-colors">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
}
