"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle, Loader2, Globe, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    setGoogleLoading(false);
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
          <h1 className="font-heading text-3xl font-light text-[#1A1A1A] mb-1">
            Welcome <span className="italic">back</span>
          </h1>
          <p className="font-body text-sm text-[#1A1A1A]/55 mb-7">
            Sign in to your WedScout account.
          </p>

          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p className="font-body text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4" noValidate>
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
                  className="w-full pl-10 pr-4 py-3 font-body text-sm bg-[#FFF4E2] border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors"
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
                  placeholder="Your password"
                  autoComplete="current-password"
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

            {/* Forgot password */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="font-body text-xs text-[#2B895A] hover:text-[#1F6944] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              className="w-full bg-[#2B895A] hover:bg-[#1F6944] disabled:opacity-60 text-white font-body text-sm font-semibold py-3.5 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Signing in…" : "Sign In"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#1A1A1A]/10" />
            <span className="font-body text-xs text-[#1A1A1A]/40">or</span>
            <div className="flex-1 h-px bg-[#1A1A1A]/10" />
          </div>

          {/* Google */}
          <motion.button
            onClick={handleGoogle}
            disabled={googleLoading}
            whileTap={{ scale: googleLoading ? 1 : 0.97 }}
            className="w-full border border-[#1A1A1A]/15 hover:border-[#1A1A1A]/30 hover:bg-[#FFF4E2] text-[#1A1A1A] font-body text-sm font-medium py-3.5 rounded-full transition-all duration-200 flex items-center justify-center gap-2"
          >
            {googleLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Globe size={16} />
            )}
            Continue with Google
          </motion.button>
        </div>

        <p className="font-body text-sm text-[#1A1A1A]/55 text-center mt-6">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-[#2B895A] font-medium hover:text-[#1F6944] transition-colors">
            Create one
          </a>
        </p>
      </motion.div>
    </div>
  );
}
