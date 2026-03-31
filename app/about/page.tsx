"use client";

import { motion } from "framer-motion";
import {
  Award,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sectionAnim = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const cardAnim = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

const stats = [
  { number: "500+", label: "Verified Vendors" },
  { number: "12", label: "Categories" },
  { number: "3", label: "States Coming Soon" },
  { number: "2,000+", label: "Couples Helped" },
];

const pillars = [
  {
    icon: Award,
    title: "Curated Quality",
    body: "Every vendor on WedScout goes through a rigorous vetting process. We review portfolios, check references, and verify business credentials so you can browse with confidence.",
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    body: "Hidden fees and vague quotes are a thing of the past. We work with vendors to ensure pricing information is clear, honest, and upfront — before you ever make contact.",
  },
  {
    icon: Users,
    title: "Direct Connection",
    body: "No middlemen, no commission layers. WedScout connects you directly with the vendors you love, so every pound of your budget goes exactly where it should.",
  },
];

const team = [
  {
    initials: "SM",
    name: "Sarah Mitchell",
    role: "Co-Founder & CEO",
    bio: "Sarah built WedScout after spending two years planning her own wedding and realising how difficult it was to find trustworthy vendors with transparent pricing. She's been fixing that ever since.",
  },
  {
    initials: "JO",
    name: "James Okonkwo",
    role: "Head of Vendor Partnerships",
    bio: "James brings over a decade of experience in the wedding industry, having worked with hundreds of vendors across Texas. He ensures every listing meets the WedScout quality standard.",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "Product & Design Lead",
    bio: "Priya leads the product experience at WedScout, focused on making vendor discovery as seamless and delightful as possible — from first click to confirmed booking.",
  },
];

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />

      {/* Hero */}
      <section className="bg-[#F7E9D4] pt-[72px] pb-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-4">
              Our Mission
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight mb-6">
              We believe finding your dream vendors should be{" "}
              <span className="italic">effortless.</span>
            </h1>
            <p className="font-body text-base text-[#1A1A1A]/60 leading-relaxed max-w-2xl mb-10">
              WedScout was built to change the way couples find their wedding
              team. No more endless Google searches, unreturned emails, or
              hidden fees. Just a curated, transparent, stress-free path to the
              vendors who will make your day unforgettable.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="/vendors"
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold px-8 py-4 rounded-full transition-colors duration-200"
              >
                Browse Vendors <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="/contact"
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border-2 border-[#1A1A1A]/20 text-[#1A1A1A] font-body text-sm font-semibold px-8 py-4 rounded-full hover:border-[#2B895A] hover:text-[#2B895A] transition-colors duration-200"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="relative bg-[#F7E9D4] py-20 px-6 lg:px-10 overflow-hidden">
        {/* Scattered diamonds */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1200 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {[[80, 60], [280, 180], [520, 50], [750, 210], [960, 80], [1100, 300], [200, 350], [650, 390], [440, 120]].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx} ${cy}) rotate(45)`}>
              <rect x="-5" y="-5" width="10" height="10" fill="#2B895A" fillOpacity="0.14" />
            </g>
          ))}
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div {...sectionAnim} className="mb-12">
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">
              What We Stand For
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-[#1A1A1A]">
              Built on three{" "}
              <span className="italic">core beliefs.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  {...cardAnim(i * 0.1)}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-[#F7E9D4]
                    hover:shadow-lg hover:shadow-[#2B895A]/10 hover:border-[#2B895A]/20
                    transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#2B895A]/10 rounded-2xl flex items-center justify-center mb-6">
                    <Icon size={22} className="text-[#2B895A]" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-3">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-[#1A1A1A]/65 leading-relaxed">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-[#1A1A1A] py-20 px-6 lg:px-10 overflow-hidden">
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
          <defs>
            <pattern id="dots-about-stats" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" fillOpacity="0.12" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-about-stats)" />
        </svg>
        {/* Abstract watermark */}
        <svg className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none z-0" width="220" height="220" viewBox="0 0 220 220" fill="none" aria-hidden="true">
          <circle cx="110" cy="110" r="100" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
          <circle cx="110" cy="110" r="70" stroke="white" strokeOpacity="0.10" strokeWidth="1" />
          <circle cx="110" cy="110" r="40" stroke="white" strokeOpacity="0.10" strokeWidth="1" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div {...sectionAnim} className="mb-12 text-center">
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">
              The Numbers
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white">
              Growing every{" "}
              <span className="italic">single day.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center py-8 px-6 rounded-3xl bg-white/5 border border-white/8"
              >
                <p className="font-heading text-5xl font-light text-white mb-2 leading-none">
                  {stat.number}
                </p>
                <p className="font-body text-sm text-white/55">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#FFF4E2] py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...sectionAnim} className="mb-12">
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">
              The Team
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-[#1A1A1A]">
              The people behind{" "}
              <span className="italic">WedScout.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                {...cardAnim(i * 0.1)}
                className="flex flex-col"
              >
                <div className="w-16 h-16 rounded-full bg-[#2B895A] flex items-center justify-center mb-5">
                  <span className="font-body text-lg font-semibold text-white">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-0.5">
                  {member.name}
                </h3>
                <p className="font-body text-xs font-semibold text-[#2B895A] uppercase tracking-wide mb-4">
                  {member.role}
                </p>
                <p className="font-body text-sm text-[#1A1A1A]/65 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values list */}
      <section className="bg-[#F7E9D4] py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...sectionAnim}>
              <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">
                Our Values
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-[#1A1A1A] mb-6">
                What we believe{" "}
                <span className="italic">in.</span>
              </h2>
              <p className="font-body text-sm text-[#1A1A1A]/65 leading-relaxed">
                We&apos;re not just a directory. We&apos;re a team of people who genuinely
                care about your wedding experience — and who hold ourselves to the
                same standards we hold our vendors.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              {[
                "Couples always come first",
                "Honesty over hype",
                "Quality over quantity",
                "Simple beats complicated",
                "Every wedding is unique",
                "Real people, real reviews",
              ].map((value, i) => (
                <div
                  key={value}
                  className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-sm border border-[#F7E9D4]"
                >
                  <CheckCircle size={16} className="text-[#2B895A] shrink-0" />
                  <span className="font-body text-sm text-[#1A1A1A]/80 font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2B895A] py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div {...sectionAnim}>
            <p className="font-body text-xs text-white/65 uppercase tracking-widest font-semibold mb-3">
              Start Your Search
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white mb-4">
              Ready to find your{" "}
              <span className="italic">dream vendors?</span>
            </h2>
            <p className="font-body text-sm text-white/70 max-w-md mx-auto mb-8">
              Browse our curated directory of 500+ wedding vendors across Texas
              and start building your perfect team today.
            </p>
            <motion.a
              href="/vendors"
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white text-[#2B895A] font-body text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#FFF4E2] transition-colors duration-200"
            >
              Browse Vendors <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
