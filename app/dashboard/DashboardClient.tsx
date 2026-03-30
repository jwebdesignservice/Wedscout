"use client";

import { motion } from "framer-motion";
import { Heart, MessageSquare, CalendarDays, ArrowRight, BookmarkPlus } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { SupabaseVendor } from "@/lib/supabase-vendors";

interface Enquiry {
  id: string;
  vendor_name: string;
  created_at: string;
  status: "pending" | "replied" | "closed";
}

interface Profile {
  full_name: string | null;
  email: string | null;
  created_at: string;
}

interface Props {
  profile: Profile | null;
  user: User;
  savedVendors: SupabaseVendor[];
  enquiries: Enquiry[];
}

const statusBadge: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  replied: "bg-[#2B895A]/10 text-[#2B895A]",
  closed: "bg-[#1A1A1A]/10 text-[#1A1A1A]/60",
};

function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name && name.trim()) {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "?";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const sectionAnim = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function DashboardClient({ profile, user, savedVendors, enquiries }: Props) {
  const displayName = profile?.full_name || user.email?.split("@")[0] || "there";
  const initials = getInitials(profile?.full_name, user.email);
  const memberSince = formatDate(profile?.created_at ?? user.created_at);

  return (
    <main className="bg-[#FFF4E2] min-h-screen pt-[72px]">
      {/* Welcome header */}
      <section className="bg-[#F7E9D4] py-14 px-6 lg:px-10 border-b border-[#EBD9C0]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-5"
          >
            <div className="w-16 h-16 rounded-full bg-[#2B895A] flex items-center justify-center shrink-0">
              <span className="font-heading text-2xl font-semibold text-white">{initials}</span>
            </div>
            <div>
              <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-0.5">
                Dashboard
              </p>
              <h1 className="font-heading text-3xl md:text-4xl font-light text-[#1A1A1A]">
                Welcome back, <span className="italic">{displayName.split(" ")[0]}</span>
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <section className="py-10 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Heart, value: savedVendors.length, label: "Saved Vendors", color: "#2B895A" },
              { icon: MessageSquare, value: enquiries.length, label: "Enquiries Sent", color: "#7890a8" },
              { icon: CalendarDays, value: memberSince, label: "Member Since", color: "#c8905c" },
            ].map(({ icon: Icon, value, label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 flex items-center gap-4 border border-[#F7E9D4] shadow-sm"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: color + "15" }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <p className="font-heading text-2xl font-semibold text-[#1A1A1A] leading-tight">{value}</p>
                  <p className="font-body text-xs text-[#1A1A1A]/50">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Saved Vendors */}
      <section className="py-4 px-6 lg:px-10 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...sectionAnim}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-light text-[#1A1A1A]">
                Saved <span className="italic">Vendors</span>
              </h2>
              <a
                href="/vendors"
                className="font-body text-sm text-[#2B895A] hover:text-[#1F6944] transition-colors flex items-center gap-1"
              >
                Browse all <ArrowRight size={14} />
              </a>
            </div>

            {savedVendors.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#F7E9D4] p-12 text-center">
                <div className="w-16 h-16 bg-[#2B895A]/8 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookmarkPlus size={24} className="text-[#2B895A]/60" />
                </div>
                <h3 className="font-heading text-xl font-light text-[#1A1A1A] mb-2">No saved vendors yet</h3>
                <p className="font-body text-sm text-[#1A1A1A]/50 mb-5">
                  Heart a vendor on their profile to save them here.
                </p>
                <a
                  href="/vendors"
                  className="inline-flex items-center gap-2 bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Browse Vendors <ArrowRight size={14} />
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedVendors.map((vendor, i) => (
                  <motion.a
                    key={vendor.id}
                    href={`/vendors/${vendor.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="bg-white rounded-2xl p-5 border border-[#F7E9D4] shadow-sm hover:shadow-md transition-all duration-200 block"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-body text-[10px] text-[#2B895A] uppercase tracking-widest font-semibold mb-0.5">
                          {vendor.category}
                        </p>
                        <h3 className="font-heading text-xl font-light text-[#1A1A1A]">{vendor.name}</h3>
                        <p className="font-body text-xs text-[#1A1A1A]/50 mt-0.5">
                          {vendor.location} · {vendor.price_range}
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#2B895A] flex items-center justify-center shrink-0">
                        <Heart size={14} className="text-white fill-white" />
                      </div>
                    </div>
                    <p className="font-body text-xs text-[#1A1A1A]/55 mt-3 leading-relaxed line-clamp-2">
                      {vendor.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Recent Enquiries */}
      <section className="bg-[#F7E9D4] py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...sectionAnim}>
            <h2 className="font-heading text-2xl font-light text-[#1A1A1A] mb-6">
              Recent <span className="italic">Enquiries</span>
            </h2>

            {enquiries.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#EBD9C0] p-10 text-center">
                <p className="font-body text-sm text-[#1A1A1A]/50">No enquiries yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#EBD9C0] overflow-hidden">
                {enquiries.map((enquiry, i) => (
                  <div
                    key={enquiry.id}
                    className={`flex items-center justify-between px-6 py-4 gap-4 ${
                      i < enquiries.length - 1 ? "border-b border-[#F7E9D4]" : ""
                    }`}
                  >
                    <div>
                      <p className="font-body text-sm font-medium text-[#1A1A1A]">{enquiry.vendor_name}</p>
                      <p className="font-body text-xs text-[#1A1A1A]/45 mt-0.5">{formatDate(enquiry.created_at)}</p>
                    </div>
                    <span
                      className={`font-body text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                        statusBadge[enquiry.status] ?? statusBadge.pending
                      }`}
                    >
                      {enquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <a
              href="/vendors"
              className="inline-flex items-center gap-2 bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-200"
            >
              Browse Vendors <ArrowRight size={14} />
            </a>
            <a
              href="/account"
              className="inline-flex items-center gap-2 border border-[#1A1A1A]/20 hover:border-[#2B895A] hover:text-[#2B895A] text-[#1A1A1A] font-body text-sm font-medium px-6 py-3 rounded-full transition-colors duration-200"
            >
              Edit Profile <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
