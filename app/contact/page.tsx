"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Globe,
  Clock,
  ChevronDown,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

const subjectOptions = [
  "General Enquiry",
  "Vendor Partnership",
  "Press",
  "Other",
];

const faqs = [
  {
    q: "How do I list my business on WedScout?",
    a: "We accept vendor applications on a rolling basis. Head to our Vendor Partnership contact option and submit your details. Our team reviews every application within 48 hours and will be in touch to discuss your listing.",
  },
  {
    q: "Is WedScout free for couples to use?",
    a: "Yes, completely free. Browsing vendors, reading reviews, and sending enquiries costs nothing for couples. We believe every couple deserves access to transparent wedding vendor information without a paywall.",
  },
  {
    q: "How are vendors verified on WedScout?",
    a: "All vendors go through a multi-step verification process including business registration checks, portfolio review, and reference verification before appearing on the platform. We also monitor ongoing reviews for quality assurance.",
  },
  {
    q: "Can I book a vendor directly through WedScout?",
    a: "Currently WedScout connects you directly with vendors via our enquiry system — it's free, fast, and puts you in touch with the right person immediately. Direct in-platform booking is on our roadmap for later in 2026.",
  },
  {
    q: "What areas does WedScout cover?",
    a: "We currently cover Austin, Dallas, Houston, and San Antonio in Texas. We're expanding to more cities throughout 2026 — if you'd like WedScout in your area sooner, let us know via the contact form.",
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validate = () => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const InputClass = (hasError?: boolean) =>
    `w-full px-4 py-3.5 font-body text-sm bg-[#FFF4E2] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors ${
      hasError
        ? "border-red-400"
        : "border-[#1A1A1A]/15 focus:border-[#2B895A]"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />

      {/* Header */}
      <section className="bg-[#FFF4E2] pt-[72px] pb-8 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-10"
          >
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">
              Contact
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-[#1A1A1A] leading-tight">
              Get in{" "}
              <span className="italic">touch</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Two-column contact section */}
      <section className="bg-[#F7E9D4] py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left — contact info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="mb-8">
                <Logo variant="default" />
                <p className="font-body text-sm text-[#1A1A1A]/60 mt-4 leading-relaxed max-w-xs">
                  We&apos;re a small team who genuinely care about your wedding
                  experience. Reach out — we&apos;d love to hear from you.
                </p>
              </div>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#2B895A]/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={15} className="text-[#2B895A]" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide mb-0.5">
                      Email
                    </p>
                    <a
                      href="mailto:hello@wedscout.com"
                      className="font-body text-sm text-[#1A1A1A]/70 hover:text-[#2B895A] transition-colors"
                    >
                      hello@wedscout.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#2B895A]/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={15} className="text-[#2B895A]" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide mb-0.5">
                      Location
                    </p>
                    <p className="font-body text-sm text-[#1A1A1A]/70">
                      Austin, Texas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#2B895A]/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={15} className="text-[#2B895A]" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide mb-0.5">
                      Hours
                    </p>
                    <p className="font-body text-sm text-[#1A1A1A]/70">
                      Monday – Friday, 9am – 5pm CST
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-3">
                  Find us online
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Globe, label: "Website" },
                    { icon: Mail, label: "Newsletter" },
                  ].map(({ icon: Icon, label }) => (
                    <motion.a
                      key={label}
                      href="#"
                      aria-label={label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 border border-[#1A1A1A]/20 rounded-full px-4 py-2
                        hover:bg-[#2B895A] hover:border-[#2B895A] hover:text-white
                        text-[#1A1A1A]/60 transition-all duration-200"
                    >
                      <Icon size={13} />
                      <span className="font-body text-xs font-medium">{label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl p-12 text-center shadow-sm border border-[#F7E9D4] h-full flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-[#2B895A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-[#2B895A]" />
                  </div>
                  <h3 className="font-heading text-2xl text-[#1A1A1A] mb-2">
                    Message sent!
                  </h3>
                  <p className="font-body text-sm text-[#1A1A1A]/60 max-w-sm">
                    Thanks for reaching out. Our team will get back to you
                    within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-6 font-body text-sm text-[#2B895A] underline underline-offset-4 hover:text-[#1F6944] transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white rounded-3xl p-8 shadow-sm border border-[#F7E9D4] space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                        className={InputClass(!!errors.name)}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 font-body text-xs text-red-500 mt-1">
                          <AlertCircle size={11} />{errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className={InputClass(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 font-body text-xs text-red-500 mt-1">
                          <AlertCircle size={11} />{errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                      Subject *
                    </label>
                    <div className="relative">
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={`w-full appearance-none ${InputClass(!!errors.subject)} pr-10`}
                      >
                        <option value="">Select a topic...</option>
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={15}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 pointer-events-none"
                      />
                    </div>
                    {errors.subject && (
                      <p className="flex items-center gap-1 font-body text-xs text-red-500 mt-1">
                        <AlertCircle size={11} />{errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-body text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide block mb-1.5">
                      Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={6}
                      placeholder="How can we help you?"
                      className={`${InputClass(!!errors.message)} resize-none`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1 font-body text-xs text-red-500 mt-1">
                        <AlertCircle size={11} />{errors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold py-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Mail size={15} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFF4E2] py-20 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">
              FAQs
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-[#1A1A1A]">
              Frequently asked{" "}
              <span className="italic">questions</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-[#F7E9D4] overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-body text-sm font-semibold text-[#1A1A1A] pr-4">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-colors ${openFaq === i ? "text-[#2B895A]" : "text-[#1A1A1A]/40"}`}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-sm text-[#1A1A1A]/65 leading-relaxed px-6 pb-5">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
