"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  LogOut,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase";
import type { User as SupaUser } from "@supabase/supabase-js";

type Tab = "profile" | "security";

function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name && name.trim()) {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "?";
}

interface InlineMsg {
  type: "success" | "error";
  text: string;
}

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [tab, setTab] = useState<Tab>("profile");

  // Profile tab
  const [fullName, setFullName] = useState("");
  const [profileMsg, setProfileMsg] = useState<InlineMsg | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Security tab
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [securityMsg, setSecurityMsg] = useState<InlineMsg | null>(null);
  const [securityLoading, setSecurityLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      setUser(data.user);
      // Pre-fill name from profile metadata
      setFullName(data.user.user_metadata?.full_name ?? "");
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) { setProfileMsg({ type: "error", text: "Name cannot be empty." }); return; }
    setProfileMsg(null);
    setProfileLoading(true);
    const { error } = await supabase.from("profiles").update({
      full_name: fullName,
      updated_at: new Date().toISOString(),
    }).eq("id", user!.id);
    if (!error) {
      await supabase.auth.updateUser({ data: { full_name: fullName } });
    }
    setProfileLoading(false);
    setProfileMsg(error
      ? { type: "error", text: error.message }
      : { type: "success", text: "Profile updated successfully." }
    );
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) { setSecurityMsg({ type: "error", text: "Password must be at least 8 characters." }); return; }
    if (newPassword !== confirmPassword) { setSecurityMsg({ type: "error", text: "Passwords do not match." }); return; }
    setSecurityMsg(null);
    setSecurityLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSecurityLoading(false);
    if (error) {
      setSecurityMsg({ type: "error", text: error.message });
    } else {
      setSecurityMsg({ type: "success", text: "Password updated successfully." });
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFF4E2] flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-[#2B895A]" />
      </div>
    );
  }

  const initials = getInitials(user.user_metadata?.full_name, user.email);

  return (
    <>
      <Navbar />
      <main className="bg-[#FFF4E2] min-h-screen pt-[72px]">
        {/* Header */}
        <section className="bg-[#F7E9D4] py-12 px-6 lg:px-10 border-b border-[#EBD9C0]">
          <div className="max-w-3xl mx-auto">
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-1">
              Account
            </p>
            <h1 className="font-heading text-3xl font-light text-[#1A1A1A]">
              Your <span className="italic">Settings</span>
            </h1>
          </div>
        </section>

        <section className="py-10 px-6 lg:px-10">
          <div className="max-w-3xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-1 bg-[#F7E9D4] rounded-full p-1 mb-8 w-fit">
              {(["profile", "security"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`font-body text-sm font-medium px-5 py-2 rounded-full capitalize transition-all duration-200 ${
                    tab === t
                      ? "bg-white text-[#1A1A1A] shadow-sm"
                      : "text-[#1A1A1A]/55 hover:text-[#1A1A1A]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Profile Tab */}
            {tab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-3xl border border-[#F7E9D4] shadow-sm p-8">
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#F7E9D4]">
                    <div className="w-16 h-16 rounded-full bg-[#2B895A] flex items-center justify-center shrink-0">
                      <span className="font-heading text-2xl font-semibold text-white">{initials}</span>
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-[#1A1A1A]">
                        {user.user_metadata?.full_name || "No name set"}
                      </p>
                      <p className="font-body text-xs text-[#1A1A1A]/50">{user.email}</p>
                    </div>
                  </div>

                  {profileMsg && (
                    <div
                      className={`flex items-start gap-2.5 rounded-xl px-4 py-3 mb-5 ${
                        profileMsg.type === "success"
                          ? "bg-[#2B895A]/8 border border-[#2B895A]/20 text-[#2B895A]"
                          : "bg-red-50 border border-red-200 text-red-700"
                      }`}
                    >
                      {profileMsg.type === "success" ? (
                        <CheckCircle size={15} className="shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      )}
                      <p className="font-body text-sm">{profileMsg.text}</p>
                    </div>
                  )}

                  <form onSubmit={handleProfileSave} className="space-y-5">
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
                          className="w-full pl-10 pr-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email (read-only) */}
                    <div>
                      <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                        Email <span className="font-normal normal-case tracking-normal text-[#1A1A1A]/40">(cannot be changed here)</span>
                      </label>
                      <input
                        type="email"
                        value={user.email ?? ""}
                        readOnly
                        className="w-full px-4 py-3 font-body text-sm bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-xl text-[#1A1A1A]/50 cursor-not-allowed"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={profileLoading}
                      whileTap={{ scale: profileLoading ? 1 : 0.97 }}
                      className="bg-[#2B895A] hover:bg-[#1F6944] disabled:opacity-60 text-white font-body text-sm font-semibold px-7 py-3 rounded-full transition-colors duration-200 flex items-center gap-2"
                    >
                      {profileLoading ? <Loader2 size={15} className="animate-spin" /> : null}
                      {profileLoading ? "Saving…" : "Save Changes"}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {tab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="bg-white rounded-3xl border border-[#F7E9D4] shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 bg-[#2B895A]/10 rounded-xl flex items-center justify-center">
                      <Shield size={17} className="text-[#2B895A]" />
                    </div>
                    <h2 className="font-heading text-xl font-light text-[#1A1A1A]">
                      Change Password
                    </h2>
                  </div>

                  {securityMsg && (
                    <div
                      className={`flex items-start gap-2.5 rounded-xl px-4 py-3 mb-5 ${
                        securityMsg.type === "success"
                          ? "bg-[#2B895A]/8 border border-[#2B895A]/20 text-[#2B895A]"
                          : "bg-red-50 border border-red-200 text-red-700"
                      }`}
                    >
                      {securityMsg.type === "success" ? (
                        <CheckCircle size={15} className="shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      )}
                      <p className="font-body text-sm">{securityMsg.text}</p>
                    </div>
                  )}

                  <form onSubmit={handlePasswordSave} className="space-y-4">
                    {/* New password */}
                    <div>
                      <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35 pointer-events-none" />
                        <input
                          type={showNew ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="At least 8 characters"
                          autoComplete="new-password"
                          className="w-full pl-10 pr-11 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew((p) => !p)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
                        >
                          {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm password */}
                    <div>
                      <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35 pointer-events-none" />
                        <input
                          type={showConfirm ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Repeat new password"
                          autoComplete="new-password"
                          className="w-full pl-10 pr-11 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] transition-colors"
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

                    <motion.button
                      type="submit"
                      disabled={securityLoading}
                      whileTap={{ scale: securityLoading ? 1 : 0.97 }}
                      className="bg-[#2B895A] hover:bg-[#1F6944] disabled:opacity-60 text-white font-body text-sm font-semibold px-7 py-3 rounded-full transition-colors duration-200 flex items-center gap-2"
                    >
                      {securityLoading ? <Loader2 size={15} className="animate-spin" /> : null}
                      {securityLoading ? "Updating…" : "Update Password"}
                    </motion.button>
                  </form>
                </div>

                {/* Danger zone */}
                <div className="bg-white rounded-3xl border border-[#F7E9D4] shadow-sm p-8">
                  <h3 className="font-heading text-lg font-light text-[#1A1A1A] mb-4">
                    Sign Out
                  </h3>
                  <p className="font-body text-sm text-[#1A1A1A]/55 mb-5">
                    You&apos;ll be signed out of your WedScout account on this device.
                  </p>
                  <motion.button
                    onClick={handleSignOut}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 border-2 border-red-300 text-red-600 hover:bg-red-50 font-body text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-200"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
