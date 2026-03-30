"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MessageSquare } from "lucide-react";
import HowItWorksTexture from "@/components/graphics/HowItWorksTexture";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Browse & Discover",
    desc: "Explore hundreds of curated wedding vendors across Texas, organised by category and budget.",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Filter & Compare",
    desc: "Narrow down by price range, style, location, and more to find vendors that match your vision.",
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Connect Directly",
    desc: "Reach out to your chosen vendors via our simple inquiry form — no middleman, no hidden fees.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-[#1A1A1A] py-24 px-6 lg:px-10 overflow-hidden">
      {/* Dot grid texture */}
      <HowItWorksTexture />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading text-4xl md:text-5xl font-light text-white"
          >
            Planning made{" "}
            <span className="italic">effortless.</span>
          </motion.h2>
        </div>

        {/* Steps grid with connector */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Dashed connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-11 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px border-t border-dashed border-white/15 z-0"
            aria-hidden="true"
          />

          {/* Mobile vertical connector */}
          <div
            className="md:hidden absolute left-11 top-24 bottom-24 w-px border-l border-dashed border-white/15 z-0"
            aria-hidden="true"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative z-10 flex flex-col md:items-center md:text-center gap-5
                  items-start text-left"
              >
                {/* Icon circle with hover glow */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-24 h-24 rounded-full bg-white/8 border border-white/15
                    flex items-center justify-center shrink-0 cursor-pointer
                    hover:shadow-lg hover:shadow-[#2B895A]/20 transition-shadow duration-300"
                >
                  {/* Pulse ring on entry */}
                  <motion.span
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
                    className="absolute inset-0 rounded-full ring-2 ring-[#2B895A]/30"
                  />
                  <Icon size={28} className="text-[#2B895A]" />
                  {/* Step number badge */}
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#2B895A] text-white font-body text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </motion.div>

                <div>
                  <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-white/65 leading-relaxed max-w-xs md:mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
