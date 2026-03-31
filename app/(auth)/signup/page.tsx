"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle, Loader2, Globe, Lock, Mail, User, CheckCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

function getPasswordStrength(password: string): { label: string; color: string; width: string } {
  if (password.length === 0) return { label: "", color: "", width: "0%" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: "Weak", color: "#ef4444", width: "33%" };
  if (score <= 3) return { label: "Fair", color: "#f59e0b", width: "66%" };
  return { label: "Strong", color: "#2B895A", width: "100%" };
}

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient();
  const strength = getPasswordStrength(password);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) { setError("Please enter your full name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (!agreed) { setError("Please agree to the Terms of Use and Privacy Policy."); return; }

    setError("");
    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setSuccess(true);
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    setGoogleLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FFF4E2] flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md text-center"
        >
          <div className="flex justify-center mb-8">
            <a href="/"><Logo variant="default" /></a>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-[#F7E9D4] p-10">
            <div className="w-16 h-16 bg-[#2B895A]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={28} className="text-[#2B895A]" />
            </div>
            <h2 className="font-heading text-3xl font-light text-[#1A1A1A] mb-2">
              Check your <span className="italic">inbox</span>
            </h2>
            <p className="font-body text-sm text-[#1A1A1A]/60 leading-relaxed">
              We&apos;ve sent a confirmation link to{" "}
              <span className="font-semibold text-[#1A1A1A]">{email}</span>.
              Click the link to activate your account and start planning your perfect wedding.
            </p>
            <a
              href="/login"
              className="mt-7 inline-flex items-center justify-center w-full bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold py-3.5 rounded-full transition-colors duration-200"
            >
              Back to Sign In
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF4E2] flex items-center justify-center px-6 py-16">
      {/* Background arcs */}
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
          <h1 className="font-heading text-3xl font-light text-[#1A1A1A] mb-1">
            Create an <span className="italic">account</span>
          </h1>
          <p className="font-body text-sm text-[#1A1A1A]/55 mb-7">
            Start discovering your perfect wedding vendors.
          </p>

          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p className="font-body text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35 pointer-events-none" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-11 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Strength bar */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="h-1 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: strength.color }}
                      initial={{ width: "0%" }}
                      animate={{ width: strength.width }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="font-body text-xs mt-1" style={{ color: strength.color }}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35 pointer-events-none" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-11 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div
                onClick={() => setAgreed((a) => !a)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  agreed
                    ? "bg-[#2B895A] border-[#2B895A]"
                    : "border-[#1A1A1A]/25 group-hover:border-[#2B895A]/50"
                }`}
              >
                {agreed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="font-body text-sm text-[#1A1A1A]/65 leading-relaxed">
                I agree to the{" "}
                <a href="/terms" className="text-[#2B895A] hover:text-[#1F6944] transition-colors">Terms of Use</a>
                {" "}and{" "}
                <a href="/privacy" className="text-[#2B895A] hover:text-[#1F6944] transition-colors">Privacy Policy</a>
              </span>
            </label>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              className="w-full bg-[#2B895A] hover:bg-[#1F6944] disabled:opacity-60 text-white font-body text-sm font-semibold py-3.5 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Creating account…" : "Create Account"}
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#1A1A1A]/10" />
            <span className="font-body text-xs text-[#1A1A1A]/40">or</span>
            <div className="flex-1 h-px bg-[#1A1A1A]/10" />
          </div>

          <motion.button
            onClick={handleGoogle}
            disabled={googleLoading}
            whileTap={{ scale: googleLoading ? 1 : 0.97 }}
            className="w-full border border-[#1A1A1A]/15 hover:border-[#1A1A1A]/30 hover:bg-white text-[#1A1A1A] font-body text-sm font-medium py-3.5 rounded-full transition-all duration-200 flex items-center justify-center gap-2"
          >
            {googleLoading ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
            Sign up with Google
          </motion.button>
        </div>

        <p className="font-body text-sm text-[#1A1A1A]/55 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#2B895A] font-medium hover:text-[#1F6944] transition-colors">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
}
