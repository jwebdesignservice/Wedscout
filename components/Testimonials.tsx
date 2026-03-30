"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import TestimonialsQuote from "@/components/graphics/TestimonialsQuote";

const testimonials = [
  {
    quote:
      "WedScout saved us weeks of research. We found our photographer and florist in a single afternoon — both within our budget.",
    name: "Sarah & James",
    location: "Austin, TX",
    initials: "SJ",
  },
  {
    quote:
      "I was overwhelmed before finding WedScout. The categories made it so easy to see everything in one place and compare who felt right.",
    name: "Melissa Thompson",
    location: "Dallas, TX",
    initials: "MT",
  },
  {
    quote:
      "The vendor profiles are detailed and the inquiry process is seamless. Got responses from three vendors within 24 hours.",
    name: "Carlos & Priya",
    location: "Houston, TX",
    initials: "CP",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-[#2B895A] py-24 px-6 lg:px-10 overflow-hidden">
      {/* Decorative quote mark */}
      <TestimonialsQuote />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-body text-xs text-white/60 uppercase tracking-widest font-semibold mb-3"
          >
            What Couples Say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading text-4xl md:text-5xl font-light text-white"
          >
            Real stories,{" "}
            <span className="italic">real weddings.</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white/12 backdrop-blur-sm rounded-3xl p-8 flex flex-col gap-5
                border border-white/20 hover:bg-white/18 transition-all duration-300 cursor-pointer"
            >
              <Quote size={32} className="text-white/25 shrink-0" />

              <p className="font-body text-sm text-white/90 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <span className="font-body text-xs font-bold text-[#2B895A]">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-white/60">
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
