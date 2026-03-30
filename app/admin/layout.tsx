"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Tag,
  MessageSquare,
  Users,
  Menu,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vendors", label: "Vendors", icon: Tag },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const NavContent = () => (
    <>
      <div className="px-6 py-6 border-b border-white/10">
        <Logo variant="light" />
        <p className="font-body text-[11px] text-white/40 mt-2 uppercase tracking-widest">Admin Panel</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium transition-all duration-200 ${
              isActive(href)
                ? "bg-[#2B895A] text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="px-6 py-4 border-t border-white/10">
        <Link
          href="/"
          className="font-body text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          ← Back to site
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F7E9D4]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col fixed left-0 top-0 bottom-0 w-64 bg-[#1A1A1A] z-40">
        <NavContent />
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#1A1A1A] z-40 px-5 py-4 flex items-center justify-between">
        <Logo variant="light" />
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-64 bg-[#1A1A1A] h-full z-10">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="lg:ml-64 pt-[64px] lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
