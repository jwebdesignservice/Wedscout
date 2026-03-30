"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFF4E2] flex flex-col">
      <Navbar />

      {/* Animated background blob */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#2B895A]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.04, 0.07, 0.04],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#2B895A]"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-lg"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-[120px] md:text-[160px] font-light text-[#1A1A1A]/08 leading-none select-none"
          >
            404
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="-mt-6 md:-mt-10"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-light text-[#1A1A1A] mb-3">
              Page not <span className="italic">found</span>
            </h1>
            <p className="font-body text-sm text-[#1A1A1A]/55 leading-relaxed mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.a
                href="/"
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold px-8 py-3.5 rounded-full transition-colors duration-200"
              >
                Go Home
              </motion.a>
              <motion.a
                href="/vendors"
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#1A1A1A]/20 hover:border-[#2B895A] hover:text-[#2B895A] text-[#1A1A1A] font-body text-sm font-semibold px-8 py-3.5 rounded-full transition-colors duration-200"
              >
                Browse Vendors
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
