"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getActiveVendors, type DemoVendor } from "@/lib/vendor-store";

const tagColours: Record<string, string> = {
  "Top Rated": "bg-[#2B895A] text-white",
  Popular: "bg-[#1A1A1A] text-white",
  Featured: "bg-[#1F6944] text-white",
  New: "bg-[#7890a8] text-white",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturedVendors() {
  const [vendors, setVendors] = useState<DemoVendor[]>([]);

  useEffect(() => {
    setVendors(getActiveVendors().slice(0, 4));
    
    const handleUpdate = () => setVendors(getActiveVendors().slice(0, 4));
    window.addEventListener("vendors-updated", handleUpdate);
    return () => window.removeEventListener("vendors-updated", handleUpdate);
  }, []);

  return (
    <section className="relative bg-[#FFF4E2] py-24 px-6 lg:px-10 overflow-hidden">
      {/* Decorative dot grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
        <defs>
          <pattern id="dots-featured" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#2B895A" fillOpacity="0.14" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-featured)" />
      </svg>

      {/* Decorative arc */}
      <svg className="absolute -left-32 top-1/4 w-[400px] h-[400px] pointer-events-none z-0" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        <circle cx="0" cy="240" r="200" stroke="#2B895A" strokeOpacity="0.13" strokeWidth="1" />
        <circle cx="0" cy="240" r="260" stroke="#2B895A" strokeOpacity="0.10" strokeWidth="1" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3"
            >
              Featured Vendors
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-heading text-4xl md:text-5xl font-light text-[#1A1A1A]"
            >
              Handpicked{" "}
              <span className="italic">for you.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <Link
              href="/vendors"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#2B895A] underline underline-offset-4 hover:text-[#1F6944] transition-colors"
            >
              View all vendors
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Vendor grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {vendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              variants={item}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-transparent hover:border-[#2B895A]/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#2B895A]/10 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 bg-[#F7E9D4] overflow-hidden">
                {vendor.profile_image ? (
                  <Image
                    src={vendor.profile_image}
                    alt={vendor.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-[#F7E9D4] flex items-center justify-center">
                    <span className="font-heading text-3xl text-[#2B895A]/20">{vendor.name[0]}</span>
                  </div>
                )}
                <span className={`absolute top-4 left-4 font-body text-[11px] font-semibold px-3 py-1 rounded-full ${tagColours[vendor.tag] ?? "bg-[#1A1A1A] text-white"}`}>
                  {vendor.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2">
                <p className="font-body text-[11px] text-[#2B895A] font-semibold uppercase tracking-wider">
                  {vendor.category}
                </p>
                <Link href={`/vendors/${vendor.id}`}>
                  <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] hover:text-[#2B895A] transition-colors leading-tight">
                    {vendor.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1.5 text-[#1A1A1A]/70">
                  <MapPin size={13} />
                  <span className="font-body text-xs">{vendor.location}</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F7E9D4]">
                  <div className="flex items-center gap-1.5">
                    <Star size={13} className="text-[#2B895A] fill-[#2B895A]" />
                    <span className="font-body text-sm font-semibold text-[#1A1A1A]">
                      {vendor.rating}
                    </span>
                    <span className="font-body text-xs text-[#1A1A1A]/60">
                      ({vendor.reviews})
                    </span>
                  </div>
                  <span className="font-body text-xs font-semibold text-[#1A1A1A]/70">
                    {vendor.price_range}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
