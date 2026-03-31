"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Star,
  Check,
  Heart,
  Mail,
  Phone,
  CalendarDays,
  Clock,
  Award,
  Users,
  Quote,
  CheckCircle,
  Loader2,
  AtSign,
  ExternalLink,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { DemoVendor } from "@/lib/vendor-store";
import { createClient } from "@/lib/supabase";

const tagColours: Record<string, string> = {
  "Top Rated": "bg-[#2B895A] text-white",
  Popular: "bg-[#1A1A1A] text-white",
  Featured: "bg-[#1F6944] text-white",
  New: "bg-[#7890a8] text-white",
};

const mockReviews = [
  {
    name: "Emma & Daniel",
    location: "Austin, TX",
    rating: 5,
    text: "Absolutely incredible experience from start to finish. We couldn't have asked for more — every detail was handled with such care and the results were beyond our wildest expectations.",
  },
  {
    name: "Sophie & James",
    location: "Dallas, TX",
    rating: 5,
    text: "Working with this team was the best decision we made for our wedding. Professional, creative, and genuinely invested in making our day perfect. Highly recommend without hesitation.",
  },
  {
    name: "Chloe & Marcus",
    location: "Houston, TX",
    rating: 5,
    text: "From our very first enquiry to the final delivery, every interaction was warm and professional. The quality exceeded what we'd hoped for. Truly a five-star experience.",
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  weddingDate: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function VendorProfilePage({ vendor }: { vendor: DemoVendor }) {
  const router = useRouter();
  const supabase = createClient();

  const [saved, setSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const tagStyle = tagColours[vendor.tag] || "bg-[#1A1A1A] text-white";

  const sectionAnim = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (!user) return;
      setUserId(user.id);

      const name = user.user_metadata?.full_name ?? "";
      const email = user.email ?? "";
      setForm((f) => ({ ...f, name, email }));

      const { data: existing } = await supabase
        .from("saved_vendors")
        .select("id")
        .eq("user_id", user.id)
        .eq("vendor_id", vendor.id)
        .maybeSingle();
      setSaved(!!existing);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor.id]);

  const handleToggleSave = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }
    setSaveLoading(true);
    if (saved) {
      await supabase
        .from("saved_vendors")
        .delete()
        .eq("user_id", userId)
        .eq("vendor_id", vendor.id);
      setSaved(false);
    } else {
      await supabase
        .from("saved_vendors")
        .insert({ user_id: userId, vendor_id: vendor.id });
      setSaved(true);
    }
    setSaveLoading(false);
  };

  const validate = () => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setEnquiryLoading(true);

    await supabase.from("enquiries").insert({
      user_id: userId ?? null,
      vendor_id: vendor.id,
      vendor_name: vendor.name,
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      wedding_date: form.weddingDate || null,
      message: form.message,
    });

    setEnquiryLoading(false);
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />

      {/* Back button */}
      <div className="bg-[#FFF4E2] pt-[72px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <a
            href="/vendors"
            className="inline-flex items-center gap-2 font-body text-sm text-[#1A1A1A]/60 hover:text-[#2B895A] transition-colors duration-200"
          >
            <ArrowLeft size={15} />
            Back to Vendors
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#FFF4E2] pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Profile image */}
            <div className="w-full lg:w-[60%] h-56 lg:h-80 rounded-3xl overflow-hidden relative shrink-0">
              <Image
                src={vendor.profile_image}
                alt={vendor.name}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Vendor info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-body text-xs text-[#2B895A] font-semibold uppercase tracking-widest">
                    {vendor.category}
                  </span>
                  <span className={`font-body text-[11px] font-semibold px-3 py-1 rounded-full ${tagStyle}`}>
                    {vendor.tag}
                  </span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl font-light text-[#1A1A1A] leading-tight mb-3">
                  {vendor.name}
                </h1>

                <div className="flex flex-wrap items-center gap-5 text-[#1A1A1A]/65 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span className="font-body text-sm">{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="fill-[#2B895A] text-[#2B895A]" />
                    <span className="font-body text-sm font-semibold text-[#1A1A1A]">{vendor.rating}</span>
                    <span className="font-body text-sm">({vendor.reviews} reviews)</span>
                  </div>
                  <span className="font-body text-sm font-semibold">{vendor.price_range}</span>
                </div>

                {/* Social links */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {vendor.instagram && (
                    <a
                      href={`https://instagram.com/${vendor.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-[#1A1A1A]/15 rounded-full px-4 py-2 font-body text-xs text-[#1A1A1A]/65 hover:border-[#2B895A] hover:text-[#2B895A] transition-colors"
                    >
                      <AtSign size={12} />
                      {vendor.instagram}
                    </a>
                  )}
                  {vendor.tiktok && (
                    <a
                      href={`https://tiktok.com/${vendor.tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-[#1A1A1A]/15 rounded-full px-4 py-2 font-body text-xs text-[#1A1A1A]/65 hover:border-[#2B895A] hover:text-[#2B895A] transition-colors"
                    >
                      <ExternalLink size={12} />
                      {vendor.tiktok}
                    </a>
                  )}
                  {vendor.website && (
                    <a
                      href={`https://${vendor.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-[#1A1A1A]/15 rounded-full px-4 py-2 font-body text-xs text-[#1A1A1A]/65 hover:border-[#2B895A] hover:text-[#2B895A] transition-colors"
                    >
                      <Globe size={12} />
                      {vendor.website}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.a
                  href="#enquiry"
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold px-8 py-3.5 rounded-full transition-colors duration-200"
                >
                  <Mail size={15} />
                  Send Enquiry
                </motion.a>
                <motion.button
                  whileTap={{ scale: saveLoading ? 1 : 0.97 }}
                  onClick={handleToggleSave}
                  disabled={saveLoading}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    saved
                      ? "bg-[#2B895A] border-[#2B895A]"
                      : "border-[#1A1A1A]/20 hover:border-[#2B895A]"
                  }`}
                >
                  {saveLoading ? (
                    <Loader2 size={15} className={`animate-spin ${saved ? "text-white" : "text-[#1A1A1A]/50"}`} />
                  ) : (
                    <Heart size={16} className={saved ? "text-white fill-white" : "text-[#1A1A1A]/50"} />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-[#F7E9D4] py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...sectionAnim}>
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">About</p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-[#1A1A1A] mb-8">
              About <span className="italic">{vendor.name}</span>
            </h2>
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-5">
                {vendor.bio.map((para, i) => (
                  <p key={i} className="font-body text-sm text-[#1A1A1A]/70 leading-relaxed">{para}</p>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  { icon: Award, number: `${vendor.years_experience}+`, label: "Years Experience" },
                  { icon: Users, number: `${vendor.weddings_done}+`, label: "Weddings Done" },
                  { icon: Clock, number: vendor.response_time, label: "Response Time" },
                ].map(({ icon: Icon, number, label }) => (
                  <div key={label} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-[#F7E9D4]">
                    <div className="w-10 h-10 bg-[#2B895A]/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#2B895A]" />
                    </div>
                    <div>
                      <p className="font-heading text-2xl font-semibold text-[#1A1A1A] leading-tight">{number}</p>
                      <p className="font-body text-xs text-[#1A1A1A]/55">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      {vendor.gallery_images && vendor.gallery_images.length > 0 && (
        <section className="bg-[#FFF4E2] py-20 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <motion.div {...sectionAnim}>
              <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">Portfolio</p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-[#1A1A1A] mb-8">
                Our <span className="italic">Work</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vendor.gallery_images.map((src, i) => (
                  <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <Image
                      src={src}
                      alt={`${vendor.name} gallery ${i + 1}`}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="bg-[#1A1A1A] py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...sectionAnim}>
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">Packages</p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white mb-10">
              Services & <span className="italic">Pricing</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vendor.pricing_tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`bg-white rounded-3xl p-7 flex flex-col ${
                    tier.name === "Standard" ? "ring-2 ring-[#2B895A] relative" : ""
                  }`}
                >
                  {tier.name === "Standard" && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2B895A] text-white font-body text-[11px] font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div className="mb-5">
                    <p className="font-body text-xs font-semibold uppercase tracking-widest text-[#2B895A] mb-1">{tier.name}</p>
                    <p className="font-heading text-3xl font-semibold text-[#1A1A1A]">{tier.price}</p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-6">
                    {tier.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check size={14} className="text-[#2B895A] shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-[#1A1A1A]/70 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.a
                    href="#enquiry"
                    whileTap={{ scale: 0.97 }}
                    className={`w-full flex items-center justify-center font-body text-sm font-semibold py-3 rounded-full transition-colors duration-200 ${
                      tier.name === "Standard"
                        ? "bg-[#2B895A] text-white hover:bg-[#1F6944]"
                        : "border-2 border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#2B895A] hover:text-[#2B895A]"
                    }`}
                  >
                    Enquire about {tier.name}
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#2B895A] py-20 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute top-8 right-10 opacity-5 pointer-events-none select-none">
          <Quote size={180} className="text-white" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div {...sectionAnim}>
            <p className="font-body text-xs text-white/65 uppercase tracking-widest font-semibold mb-3">Reviews</p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white mb-10">
              What couples <span className="italic">say</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockReviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white/12 backdrop-blur-sm rounded-3xl p-7 border border-white/15"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={13} className="text-white fill-white" />
                    ))}
                  </div>
                  <p className="font-body text-sm text-white/80 leading-relaxed mb-5 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-body text-xs font-semibold text-white">
                        {review.name.split(" & ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-white">{review.name}</p>
                      <p className="font-body text-xs text-white/60">{review.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry" className="bg-[#F7E9D4] py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...sectionAnim}>
            <div className="max-w-2xl mx-auto">
              <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">Get in touch</p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-[#1A1A1A] mb-2">
                Send an <span className="italic">Enquiry</span>
              </h2>
              <p className="font-body text-sm text-[#1A1A1A]/60 mb-10">
                Fill in the form below and{" "}
                <span className="font-medium text-[#1A1A1A]">{vendor.name}</span>{" "}
                will be in touch within {vendor.response_time.toLowerCase()}.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl p-10 text-center shadow-sm border border-[#F7E9D4]"
                >
                  <div className="w-16 h-16 bg-[#2B895A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-[#2B895A]" />
                  </div>
                  <h3 className="font-heading text-2xl text-[#1A1A1A] mb-2">Enquiry sent!</h3>
                  <p className="font-body text-sm text-[#1A1A1A]/60">
                    Thank you for reaching out. {vendor.name} will be in touch with you within{" "}
                    {vendor.response_time.toLowerCase()}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm((f) => ({ ...f, phone: "", weddingDate: "", message: "" }));
                    }}
                    className="mt-6 font-body text-sm text-[#2B895A] underline underline-offset-4 hover:text-[#1F6944] transition-colors"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-[#F7E9D4] space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className={`w-full px-4 py-3 font-body text-sm bg-[#FFF4E2] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors ${
                          errors.name ? "border-red-400" : "border-[#1A1A1A]/15 focus:border-[#2B895A]"
                        }`}
                      />
                      {errors.name && <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 font-body text-sm bg-[#FFF4E2] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors ${
                          errors.email ? "border-red-400" : "border-[#1A1A1A]/15 focus:border-[#2B895A]"
                        }`}
                      />
                      {errors.email && <p className="font-body text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 font-body text-sm bg-[#FFF4E2] border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                        Wedding Date
                      </label>
                      <input
                        type="date"
                        value={form.weddingDate}
                        onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
                        className="w-full px-4 py-3 font-body text-sm bg-[#FFF4E2] border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                      Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      placeholder={`Tell ${vendor.name} about your wedding vision, date, and any specific requirements...`}
                      className={`w-full px-4 py-3 font-body text-sm bg-[#FFF4E2] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 text-[#1A1A1A] placeholder-[#1A1A1A]/40 resize-none transition-colors ${
                        errors.message ? "border-red-400" : "border-[#1A1A1A]/15 focus:border-[#2B895A]"
                      }`}
                    />
                    {errors.message && <p className="font-body text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={enquiryLoading}
                    whileTap={{ scale: enquiryLoading ? 1 : 0.97 }}
                    className="w-full bg-[#2B895A] hover:bg-[#1F6944] disabled:opacity-60 text-white font-body text-sm font-semibold py-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {enquiryLoading ? <Loader2 size={15} className="animate-spin" /> : <Mail size={15} />}
                    {enquiryLoading ? "Sending…" : `Send Enquiry to ${vendor.name}`}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
