"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, ChevronDown } from "lucide-react";

const h1Words = ["Find", "vendors", "who"];
const h1Line2 = ["match", "your"];

const stats = [
  { value: "500+", label: "Vetted Vendors" },
  { value: "12", label: "Categories" },
  { value: "Texas", label: "Currently Available" },
];

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (locationQuery.trim()) params.set("location", locationQuery.trim());
    router.push(`/vendors${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };
  return (
    <section className="relative min-h-screen bg-[#FFF4E2] overflow-hidden px-6 lg:px-10">
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
            strokeOpacity="0.13"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>

      {/* Decorative dot grid — left column background */}
      <svg className="absolute left-0 top-0 w-1/2 h-full pointer-events-none z-0" aria-hidden="true">
        <defs>
          <pattern id="dots-hero" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#1A1A1A" fillOpacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-hero)" />
      </svg>

      {/* Scattered small diamonds — bottom-left */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[[55, 680], [120, 715], [85, 760], [195, 695], [38, 745], [165, 772], [250, 720]].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx} ${cy}) rotate(45)`}>
            <rect x="-5" y="-5" width="10" height="10" fill="#2B895A" fillOpacity="0.15" />
          </g>
        ))}
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto pt-24 md:pt-28 pb-20 w-full min-h-screen flex items-center">
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
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[61px] xl:text-[68px] font-light text-[#1A1A1A] leading-[1.05] mb-6">
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="font-body text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 bg-transparent outline-none w-full"
                  />
                </div>
                {/* Vertical divider */}
                <div className="w-px h-6 bg-[#F7E9D4] shrink-0" />
                {/* Location (fixed to Texas) */}
                <div className="flex items-center gap-2 px-4 py-3.5 shrink-0">
                  <MapPin size={15} className="text-[#2B895A] shrink-0" />
                  <span className="font-body text-sm text-[#1A1A1A]">Texas</span>
                </div>
                {/* Search button inside the pill */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSearch}
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

          {/* ---- RIGHT COLUMN — hero image ---- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="hidden lg:flex items-center justify-center w-full h-full"
          >
            <div className="relative w-full max-w-[480px] h-[580px] rounded-3xl overflow-hidden shadow-2xl shadow-[#1A1A1A]/15">
              <img
                src="/hero-couple.jpg"
                alt="Happy couple on their wedding day"
                className="w-full h-full object-cover object-top"
              />
              {/* Subtle green tint overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#2B895A]/20 to-transparent pointer-events-none" />
            </div>
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
