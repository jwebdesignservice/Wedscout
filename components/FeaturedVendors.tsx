"use client";

import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import {
  PhotographyGraphic,
  FloralsGraphic,
  VideographyGraphic,
  PlanningGraphic,
} from "@/components/graphics/VendorCardGraphics";

const vendors = [
  {
    name: "Golden Hour Studio",
    category: "Photography",
    location: "Austin, TX",
    priceRange: "$$–$$$",
    rating: 4.9,
    reviews: 127,
    tag: "Top Rated",
    Graphic: PhotographyGraphic,
  },
  {
    name: "Bloom & Co.",
    category: "Florals & Decor",
    location: "Dallas, TX",
    priceRange: "$$",
    rating: 4.8,
    reviews: 89,
    tag: "Popular",
    Graphic: FloralsGraphic,
  },
  {
    name: "Ivory Films",
    category: "Videography",
    location: "Houston, TX",
    priceRange: "$$$",
    rating: 5.0,
    reviews: 54,
    tag: "Featured",
    Graphic: VideographyGraphic,
  },
  {
    name: "The Planner Co.",
    category: "Wedding Planning",
    location: "San Antonio, TX",
    priceRange: "$$–$$$$",
    rating: 4.7,
    reviews: 203,
    tag: "Top Rated",
    Graphic: PlanningGraphic,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturedVendors() {
  return (
    <section className="bg-[#FFF4E2] py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">
              Featured Vendors
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#1A1A1A] leading-tight">
              Handpicked for{" "}
              <span className="italic">your big day.</span>
            </h2>
          </div>
          <a
            href="#"
            className="font-body text-sm font-medium text-[#2B895A] underline underline-offset-4 hover:text-[#1F6944] transition-colors whitespace-nowrap"
          >
            Browse all vendors →
          </a>
        </div>

        {/* Vendor Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {vendors.map((vendor) => {
            const { Graphic } = vendor;
            return (
              <motion.a
                key={vendor.name}
                href="#"
                variants={card}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-3xl overflow-hidden bg-white border border-transparent
                  hover:border-[#2B895A]/20 hover:shadow-xl hover:shadow-[#2B895A]/10
                  shadow-md shadow-[#1A1A1A]/5 transition-all duration-300 flex flex-col"
              >
                {/* SVG graphic placeholder */}
                <div className="h-52 relative overflow-hidden rounded-t-3xl">
                  <Graphic />
                  {/* Tag badge */}
                  <span className="absolute top-4 left-4 bg-[#2B895A] text-white font-body text-[11px] font-semibold px-3 py-1 rounded-full">
                    {vendor.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <div>
                    <p className="font-body text-[11px] text-[#2B895A] font-semibold uppercase tracking-wide mb-1">
                      {vendor.category}
                    </p>
                    <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] leading-tight group-hover:text-[#2B895A] transition-colors">
                      {vendor.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#1A1A1A]/65">
                    <MapPin size={13} />
                    <span className="font-body text-xs">{vendor.location}</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F7E9D4]">
                    <div className="flex items-center gap-1.5">
                      <Star size={13} className="text-[#2B895A] fill-[#2B895A]" />
                      <span className="font-body text-sm font-semibold text-[#1A1A1A]">
                        {vendor.rating}
                      </span>
                      <span className="font-body text-xs text-[#1A1A1A]/65">
                        ({vendor.reviews})
                      </span>
                    </div>
                    <span className="font-body text-xs font-semibold text-[#1A1A1A]/65">
                      {vendor.priceRange}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="#"
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-[#2B895A] text-white font-body text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#1F6944] transition-colors duration-200"
          >
            View All Vendors <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
