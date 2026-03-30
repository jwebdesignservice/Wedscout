"use client";

import { motion } from "framer-motion";
import { Search, MapPin, ChevronDown } from "lucide-react";
import HeroIllustration from "@/components/graphics/HeroIllustration";

const h1Words = ["Find", "vendors", "who"];
const h1Line2 = ["match", "your"];

const stats = [
  { value: "500+", label: "Vetted Vendors" },
  { value: "12", label: "Categories" },
  { value: "Texas", label: "Currently Available" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#FFF4E2] overflow-hidden">
      {/* Subtle SVG arc pattern behind right column */}
      <svg
        className="absolute top-0 right-0 w-[55%] h-full pointer-events-none opacity-60"
        viewBox="0 0 600 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {[120, 200, 280, 360, 440].map((r, i) => (
          <circle
            key={i}
            cx="500"
            cy="200"
            r={r}
            stroke="#2B895A"
            strokeOpacity="0.05"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-28 md:pt-36 pb-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* ---- LEFT COLUMN ---- */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#2B895A]/10 text-[#2B895A] px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B895A] inline-block" />
              Texas Wedding Vendors
            </motion.div>

            {/* H1 — word-by-word animation */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-light text-[#1A1A1A] leading-[1.05] mb-6">
              {/* Line 1 */}
              <span className="block">
                {h1Words.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              {/* Line 2 */}
              <span className="block">
                {h1Line2.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + (h1Words.length + i) * 0.07 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 + (h1Words.length + h1Line2.length) * 0.07,
                  }}
                  className="inline-block italic text-[#2B895A]"
                >
                  vision.
                </motion.span>
              </span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-base md:text-lg text-[#1A1A1A]/65 max-w-md mb-10 leading-relaxed"
            >
              WedScout connects couples with curated wedding professionals across
              Texas — beautifully organised, stress-free, and built around your day.
            </motion.p>

            {/* Search Bar — pill style */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="w-full max-w-xl mb-10"
            >
              <div className="bg-white rounded-full shadow-xl shadow-[#1A1A1A]/8 border border-[#F7E9D4] flex items-center overflow-hidden pr-2">
                {/* Vendor search */}
                <div className="flex items-center gap-3 px-5 py-3.5 flex-1">
                  <Search size={16} className="text-[#2B895A] shrink-0" />
                  <input
                    type="text"
                    placeholder="Photographers, florists…"
                    className="font-body text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 bg-transparent outline-none w-full"
                  />
                </div>
                {/* Vertical divider */}
                <div className="w-px h-6 bg-[#F7E9D4] shrink-0" />
                {/* Location */}
                <div className="flex items-center gap-2 px-4 py-3.5 w-36 shrink-0">
                  <MapPin size={15} className="text-[#2B895A] shrink-0" />
                  <input
                    type="text"
                    placeholder="Texas"
                    className="font-body text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 bg-transparent outline-none w-full"
                  />
                </div>
                {/* Search button inside the pill */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 shrink-0 whitespace-nowrap"
                >
                  Search
                </motion.button>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="flex items-center gap-0"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`${
                    i > 0 ? "pl-8 ml-8 border-l border-[#2B895A]/25" : ""
                  }`}
                >
                  <p className="font-heading text-2xl md:text-3xl font-semibold text-[#1A1A1A]">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-[#1A1A1A]/60 uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---- RIGHT COLUMN — illustration ---- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="hidden lg:flex items-center justify-center w-full h-full"
          >
            <HeroIllustration className="w-full max-w-[480px]" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-body text-[10px] text-[#1A1A1A]/40 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-[#2B895A]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
