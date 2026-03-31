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
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoriesDecor from "@/components/graphics/CategoriesDecor";

const categories = [
  {
    name: "Photography",
    icon: Camera,
    count: 84,
    description:
      "Capture every emotion, from first look to final send-off, with a photographer who matches your style.",
  },
  {
    name: "Florals & Decor",
    icon: Flower2,
    count: 62,
    description:
      "Transform your venue with seasonal blooms, botanical installations, and bespoke floral artistry.",
  },
  {
    name: "Music & DJ",
    icon: Music,
    count: 43,
    description:
      "Set the perfect atmosphere with live music, curated DJ sets, and a talented MC to keep the energy alive.",
  },
  {
    name: "Catering",
    icon: ChefHat,
    count: 55,
    description:
      "From farm-to-table dinners to elegant plated menus, find a caterer that makes food the talk of the night.",
  },
  {
    name: "Jewellery",
    icon: Gem,
    count: 28,
    description:
      "Discover bespoke rings, bands, and bridal jewellery crafted by artisan makers for your once-in-a-lifetime moment.",
  },
  {
    name: "Beauty & Hair",
    icon: Scissors,
    count: 71,
    description:
      "Look and feel your best all day long with expert bridal makeup artists and hair stylists.",
  },
  {
    name: "Videography",
    icon: Video,
    count: 39,
    description:
      "Relive your wedding day through cinematic films that capture the moments photos can't.",
  },
  {
    name: "Planning",
    icon: CalendarDays,
    count: 47,
    description:
      "From full-service planning to day-of coordination, find a planner who handles every detail so you don't have to.",
  },
  {
    name: "Venues",
    icon: MapPin,
    count: 33,
    description:
      "Browse stunning indoor and outdoor wedding venues across Texas — from intimate estates to grand ballrooms.",
  },
  {
    name: "Invitations",
    icon: Palette,
    count: 22,
    description:
      "Set the tone with beautifully designed stationery suites, from save-the-dates through to place cards.",
  },
  {
    name: "Favours",
    icon: Heart,
    count: 18,
    description:
      "Delight your guests with personalised, hand-crafted favours they'll actually want to take home.",
  },
  {
    name: "Honeymoon",
    icon: Star,
    count: 15,
    description:
      "Start your forever with a bespoke honeymoon itinerary crafted around your dream destination.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CategoriesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />

      {/* Page Header */}
      <section className="relative bg-[#F7E9D4] pt-[136px] pb-16 px-6 lg:px-10 overflow-hidden">
        <CategoriesDecor />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">
              All Categories
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight mb-4">
              Browse by{" "}
              <span className="italic">Category</span>
            </h1>
            <p className="font-body text-base text-[#1A1A1A]/60 leading-relaxed">
              Every detail of your perfect wedding, covered. Explore all 12
              vendor categories and find the specialists who will bring your
              vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="relative bg-[#FFF4E2] py-20 px-6 lg:px-10 overflow-hidden">
        {/* Wavy line decoration — top-right */}
        <svg className="absolute top-0 right-0 w-80 h-64 pointer-events-none z-0" viewBox="0 0 320 256" fill="none" aria-hidden="true">
          <path d="M320 30 Q270 55 320 80 Q370 105 320 130 Q270 155 320 180 Q370 205 320 230" stroke="#2B895A" strokeOpacity="0.13" strokeWidth="1.5" fill="none" />
          <path d="M300 10 Q250 35 300 60 Q350 85 300 110 Q250 135 300 160 Q350 185 300 210 Q250 235 300 256" stroke="#2B895A" strokeOpacity="0.12" strokeWidth="1" fill="none" />
          <path d="M280 0 Q230 25 280 50 Q330 75 280 100 Q230 125 280 150 Q330 175 280 200 Q230 225 280 256" stroke="#2B895A" strokeOpacity="0.10" strokeWidth="1" fill="none" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                  className="group bg-white rounded-3xl p-7 flex flex-col gap-5
                    shadow-sm border border-[#F7E9D4]
                    hover:shadow-xl hover:shadow-[#2B895A]/10 hover:border-[#2B895A]/20
                    transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-14 h-14 rounded-2xl bg-[#2B895A]/10 group-hover:bg-[#2B895A]
                        flex items-center justify-center transition-colors duration-300"
                    >
                      <Icon
                        size={26}
                        className="text-[#2B895A] group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-[#1A1A1A]/25 group-hover:text-[#2B895A] transition-colors duration-300 mt-1"
                    />
                  </div>

                  <div>
                    <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] leading-tight mb-1 group-hover:text-[#2B895A] transition-colors duration-200">
                      {cat.name}
                    </h2>
                    <p className="font-body text-xs font-semibold text-[#2B895A] mb-3">
                      {cat.count} vendors
                    </p>
                    <p className="font-body text-sm text-[#1A1A1A]/60 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-[#F7E9D4] flex items-center gap-2">
                    <span className="font-body text-sm font-medium text-[#2B895A] group-hover:text-[#1F6944] transition-colors">
                      Browse {cat.name}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-[#2B895A] group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#FFF4E2] py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#2B895A] rounded-3xl px-8 py-14 text-center"
          >
            <p className="font-body text-xs text-white/65 uppercase tracking-widest font-semibold mb-3">
              Get Started
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white mb-4">
              Not sure where to start?
            </h2>
            <p className="font-body text-sm text-white/70 max-w-lg mx-auto mb-8">
              Browse all vendors and use our filters to narrow down by category,
              budget, and location — finding your perfect match has never been
              easier.
            </p>
            <motion.a
              href="/vendors"
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white text-[#2B895A] font-body text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#FFF4E2] transition-colors duration-200"
            >
              Browse All Vendors <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
