"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Flower2,
  Music,
  ChefHat,
  Gem,
  Scissors,
  Video,
  CalendarDays,
  MapPin,
  Palette,
  Heart,
  Star,
} from "lucide-react";
import CategoriesDecor from "@/components/graphics/CategoriesDecor";

const categories = [
  { name: "Photography", icon: Camera, count: 84 },
  { name: "Florals & Decor", icon: Flower2, count: 62 },
  { name: "Music & DJ", icon: Music, count: 43 },
  { name: "Catering", icon: ChefHat, count: 55 },
  { name: "Jewellery", icon: Gem, count: 28 },
  { name: "Beauty & Hair", icon: Scissors, count: 71 },
  { name: "Videography", icon: Video, count: 39 },
  { name: "Planning", icon: CalendarDays, count: 47 },
  { name: "Venues", icon: MapPin, count: 33 },
  { name: "Invitations", icon: Palette, count: 22 },
  { name: "Favours", icon: Heart, count: 18 },
  { name: "Honeymoon", icon: Star, count: 15 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Categories() {
  return (
    <section className="relative bg-[#F7E9D4] py-24 px-6 lg:px-10 overflow-hidden">
      {/* Corner decoration */}
      <CategoriesDecor />

      {/* Diagonal hatch — bottom-left corner */}
      <svg className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none z-0" aria-hidden="true">
        <defs>
          <pattern id="hatch-categories" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="16" stroke="#2B895A" strokeWidth="1" strokeOpacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hatch-categories)" />
      </svg>

      {/* Scattered plus shapes — mid-section */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[[300, 150], [620, 80], [900, 210], [460, 360], [750, 290], [140, 270], [1050, 160]].map(([cx, cy], i) => (
          <g key={i} fill="#2B895A" fillOpacity="0.14">
            <rect x={cx - 1} y={cy - 7} width="2" height="14" />
            <rect x={cx - 7} y={cy - 1} width="14" height="2" />
          </g>
        ))}
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">
              Browse by Category
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#1A1A1A] leading-tight">
              Every detail,{" "}
              <span className="italic">covered.</span>
            </h2>
          </div>
          <a
            href="/categories"
            className="font-body text-sm font-medium text-[#2B895A] underline underline-offset-4 hover:text-[#1F6944] transition-colors whitespace-nowrap"
          >
            View all categories →
          </a>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.a
                key={cat.name}
                href={`/vendors?category=${encodeURIComponent(cat.name)}`}
                variants={item}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group bg-white rounded-2xl p-5 flex flex-col items-center gap-3 text-center
                  shadow-sm border border-[#F7E9D4]
                  hover:shadow-lg hover:shadow-[#2B895A]/10 hover:border-[#2B895A]/30
                  transition-shadow transition-colors duration-200 cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-[#2B895A]/10 group-hover:bg-[#2B895A]
                    flex items-center justify-center transition-colors duration-300"
                >
                  <Icon
                    size={22}
                    className="text-[#2B895A] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-[#1A1A1A] leading-tight">
                    {cat.name}
                  </p>
                  <p className="font-body text-xs text-[#1A1A1A]/60 mt-0.5">
                    {cat.count} vendors
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
