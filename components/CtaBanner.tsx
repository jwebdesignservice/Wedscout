"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function CtaBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F7E9D4] py-20 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1A1A1A] rounded-3xl px-10 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden"
        >
          {/* Scattered diamond texture */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {[
              { x: 48, y: 32, size: 12 },
              { x: 92, y: 88, size: 8 },
              { x: 160, y: 20, size: 10 },
              { x: 300, y: 60, size: 7 },
              { x: 380, y: 130, size: 11 },
              { x: 500, y: 28, size: 8 },
              { x: 620, y: 90, size: 9 },
              { x: 700, y: 30, size: 7 },
              { x: 820, y: 70, size: 12 },
              { x: 900, y: 140, size: 8 },
              { x: 960, y: 40, size: 10 },
              { x: 1040, y: 100, size: 7 },
              { x: 1100, y: 50, size: 9 },
              { x: 60, y: 150, size: 9 },
              { x: 140, y: 170, size: 7 },
              { x: 260, y: 180, size: 11 },
            ].map((d, i) => (
              <rect
                key={i}
                x={d.x - d.size / 2}
                y={d.y - d.size / 2}
                width={d.size}
                height={d.size}
                rx="1"
                transform={`rotate(45 ${d.x} ${d.y})`}
                fill="white"
                fillOpacity="0.04"
              />
            ))}
          </svg>

          {/* Text column */}
          <div className="relative text-left max-w-lg" ref={ref}>
            {/* Animated green rule */}
            <motion.div
              className="h-px bg-[#2B895A] mb-6 origin-left"
              animate={{ scaleX: inView ? 1 : 0 }}
              initial={{ scaleX: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              style={{ width: "48px" }}
            />
            <h2 className="font-heading text-4xl md:text-5xl font-light text-white leading-tight mb-4">
              Ready to start planning?
            </h2>
            <p className="font-body text-sm text-white/65 leading-relaxed">
              Browse hundreds of curated vendors in Texas — all in one place,
              matched to your budget and vision.
            </p>
          </div>

          {/* Buttons column */}
          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
            <motion.a
              href="#"
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-[#2B895A] text-white font-body text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#1F6944] transition-colors duration-200"
            >
              Browse Vendors <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#"
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-body text-sm font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
