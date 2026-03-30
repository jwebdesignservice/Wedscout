"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";
import type { User as SupaUser } from "@supabase/supabase-js";

const navLinks = [
  { label: "Browse Vendors", href: "/vendors" },
  { label: "Categories", href: "/categories" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact", href: "/contact" },
];

function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name && name.trim()) {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "?";
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<SupaUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const initials = getInitials(user?.user_metadata?.full_name, user?.email);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Logo variant="default" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={`relative font-body text-sm font-medium transition-colors duration-200 py-1 ${
                    active ? "text-[#2B895A]" : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                  }`}
                  initial="rest"
                  whileHover="hover"
                  animate={active ? "hover" : "rest"}
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 h-px bg-[#2B895A]"
                    variants={{ rest: { width: "0%" }, hover: { width: "100%" } }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  />
                </motion.a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {/* Bell */}
                <button
                  aria-label="Notifications"
                  className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors p-1"
                >
                  <Bell size={18} />
                </button>

                {/* Avatar + dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="flex items-center gap-2 group"
                    aria-label="User menu"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#2B895A] flex items-center justify-center">
                      <span className="font-body text-xs font-semibold text-white">{initials}</span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`text-[#1A1A1A]/50 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-lg border border-[#F7E9D4] overflow-hidden py-1"
                      >
                        <a
                          href="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#1A1A1A] hover:bg-[#FFF4E2] transition-colors"
                        >
                          <User size={14} className="text-[#1A1A1A]/50" />
                          Dashboard
                        </a>
                        <a
                          href="/account"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-[#1A1A1A] hover:bg-[#FFF4E2] transition-colors"
                        >
                          <Settings size={14} className="text-[#1A1A1A]/50" />
                          Account
                        </a>
                        <div className="h-px bg-[#F7E9D4] my-1" />
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 font-body text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="font-body text-sm font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
                >
                  Sign In
                </a>
                <motion.a
                  href="/vendors"
                  whileTap={{ scale: 0.97 }}
                  className="font-body text-sm font-semibold bg-[#2B895A] text-white px-5 py-2.5 rounded-full hover:bg-[#1F6944] hover:shadow-md transition-all duration-200"
                >
                  Browse Vendors
                </motion.a>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#1A1A1A] p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#FFF4E2] flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#F7E9D4] shrink-0">
              <Logo variant="default" />
              <button
                className="text-[#1A1A1A] p-1"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col px-8 pt-12 pb-10 gap-8 flex-1">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07, ease: "easeOut" }}
                    className={`font-heading text-[2.6rem] font-light leading-tight transition-colors ${
                      active ? "text-[#2B895A]" : "text-[#1A1A1A] hover:text-[#2B895A]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: navLinks.length * 0.07 + 0.05 }}
                className="mt-4 flex flex-col gap-3"
              >
                <a
                  href="/vendors"
                  className="inline-flex items-center justify-center bg-[#2B895A] text-white font-body text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#1F6944] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Browse Vendors
                </a>
                {user ? (
                  <>
                    <a
                      href="/dashboard"
                      className="inline-flex items-center justify-center border border-[#1A1A1A]/20 text-[#1A1A1A] font-body text-sm font-medium px-8 py-4 rounded-full hover:bg-[#F7E9D4] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={() => { setMenuOpen(false); handleSignOut(); }}
                      className="inline-flex items-center justify-center gap-2 border border-red-200 text-red-600 font-body text-sm font-medium px-8 py-4 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="inline-flex items-center justify-center border border-[#1A1A1A]/20 text-[#1A1A1A] font-body text-sm font-medium px-8 py-4 rounded-full hover:bg-[#F7E9D4] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </a>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
