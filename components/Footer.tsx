"use client";

import { motion } from "framer-motion";
import { Globe, Mail, Heart } from "lucide-react";
import Logo from "@/components/Logo";

const links: Record<string, string[]> = {
  Platform: ["Browse Vendors", "Categories", "How It Works", "Pricing"],
  Company: ["About WedScout", "Blog", "Careers", "Press"],
  Support: ["Help Centre", "Contact Us", "Privacy Policy", "Terms of Use"],
};

const socials = [
  { icon: Globe, label: "Website" },
  { icon: Mail, label: "Email" },
  { icon: Heart, label: "Favourites" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="font-body text-sm text-white/55 mt-5 leading-relaxed max-w-xs">
              Empowering couples with the tools and resources they need to make
              informed decisions — personalised, transparent, stress-free.
            </p>
            <p className="font-body text-xs text-white/40 mt-3">
              Made for couples in Texas 🤍
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                    hover:bg-[#2B895A] hover:border-[#2B895A] transition-colors duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-white/35 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      className="relative inline-block font-body text-sm text-white/60 hover:text-white transition-colors duration-200 group"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                    >
                      {item}
                      <motion.span
                        className="absolute -bottom-0.5 left-0 h-px bg-white"
                        variants={{
                          rest: { width: "0%" },
                          hover: { width: "100%" },
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} WedScout. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/30">
            Built for couples. Powered by transparency.
          </p>
        </div>
      </div>
    </footer>
  );
}
