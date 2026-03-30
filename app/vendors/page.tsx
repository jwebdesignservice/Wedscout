"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  Filter,
  X,
  ChevronDown,
  SlidersHorizontal,
  ArrowRight,
  Camera,
  Flower2,
  Music,
  ChefHat,
  Gem,
  Scissors,
  Video,
  CalendarDays,
  Palette,
  Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PhotographyGraphic,
  FloralsGraphic,
  VideographyGraphic,
  PlanningGraphic,
} from "@/components/graphics/VendorCardGraphics";
import { vendors, type Vendor } from "@/lib/vendors";

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Photography: Camera,
  "Florals & Decor": Flower2,
  "Music & DJ": Music,
  Catering: ChefHat,
  Jewellery: Gem,
  "Beauty & Hair": Scissors,
  Videography: Video,
  Planning: CalendarDays,
  Venues: MapPin,
  Invitations: Palette,
  Favours: Heart,
  Honeymoon: Star,
};

const categoryGraphics: Record<string, React.ComponentType> = {
  Photography: PhotographyGraphic,
  "Florals & Decor": FloralsGraphic,
  "Music & DJ": VideographyGraphic,
  Catering: PlanningGraphic,
  Jewellery: FloralsGraphic,
  "Beauty & Hair": FloralsGraphic,
  Videography: VideographyGraphic,
  Planning: PlanningGraphic,
  Venues: PlanningGraphic,
  Invitations: PhotographyGraphic,
  Favours: FloralsGraphic,
  Honeymoon: PhotographyGraphic,
};

const allCategories = [
  "Photography",
  "Florals & Decor",
  "Music & DJ",
  "Catering",
  "Jewellery",
  "Beauty & Hair",
  "Videography",
  "Planning",
  "Venues",
  "Invitations",
  "Favours",
  "Honeymoon",
];

const priceRanges = ["$", "$$", "$$$", "$$$$"];
const ratingOptions = [
  { label: "4.0+ Stars", value: 4.0 },
  { label: "4.5+ Stars", value: 4.5 },
  { label: "5.0 Stars", value: 5.0 },
];

const tagColours: Record<string, string> = {
  "Top Rated": "bg-[#2B895A]",
  Popular: "bg-[#1A1A1A]",
  Featured: "bg-[#1F6944]",
  New: "bg-[#7890a8]",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function VendorsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const filtered = vendors.filter((v) => {
    const matchSearch =
      !search ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase());
    const matchLocation =
      !location ||
      v.location.toLowerCase().includes(location.toLowerCase());
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(v.category);
    const matchPrice =
      selectedPrices.length === 0 ||
      selectedPrices.some((p) => v.priceRange.includes(p));
    const matchRating = !minRating || v.rating >= minRating;
    return matchSearch && matchLocation && matchCategory && matchPrice && matchRating;
  });

  const visible = filtered.slice(0, visibleCount);

  const activeFilters: { label: string; clear: () => void }[] = [
    ...selectedCategories.map((c) => ({
      label: c,
      clear: () => setSelectedCategories((prev) => prev.filter((x) => x !== c)),
    })),
    ...selectedPrices.map((p) => ({
      label: p,
      clear: () => setSelectedPrices((prev) => prev.filter((x) => x !== p)),
    })),
    ...(minRating
      ? [
          {
            label: `${minRating}+ Stars`,
            clear: () => setMinRating(null),
          },
        ]
      : []),
  ];

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const togglePrice = (p: string) =>
    setSelectedPrices((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-body text-sm font-semibold text-[#1A1A1A] uppercase tracking-widest mb-4">
          Category
        </h3>
        <div className="space-y-2.5">
          {allCategories.map((cat) => {
            const Icon = categoryIcons[cat];
            const checked = selectedCategories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors duration-150 ${
                    checked
                      ? "bg-[#2B895A] border-[#2B895A]"
                      : "border-[#1A1A1A]/30 group-hover:border-[#2B895A]"
                  }`}
                  onClick={() => toggleCategory(cat)}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleCategory(cat)}
                />
                {Icon && (
                  <Icon
                    size={14}
                    className={`transition-colors ${checked ? "text-[#2B895A]" : "text-[#1A1A1A]/50"}`}
                  />
                )}
                <span
                  className={`font-body text-sm transition-colors ${
                    checked ? "text-[#1A1A1A] font-medium" : "text-[#1A1A1A]/70"
                  }`}
                >
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-body text-sm font-semibold text-[#1A1A1A] uppercase tracking-widest mb-4">
          Price Range
        </h3>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((p) => (
            <button
              key={p}
              onClick={() => togglePrice(p)}
              className={`font-body text-sm px-4 py-1.5 rounded-full border transition-all duration-150 ${
                selectedPrices.includes(p)
                  ? "bg-[#2B895A] border-[#2B895A] text-white"
                  : "border-[#1A1A1A]/20 text-[#1A1A1A]/70 hover:border-[#2B895A] hover:text-[#2B895A]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-body text-sm font-semibold text-[#1A1A1A] uppercase tracking-widest mb-4">
          Rating
        </h3>
        <div className="space-y-2">
          {ratingOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                setMinRating(minRating === opt.value ? null : opt.value)
              }
              className={`w-full flex items-center gap-2 text-left font-body text-sm px-3 py-2 rounded-xl transition-all duration-150 ${
                minRating === opt.value
                  ? "bg-[#2B895A]/10 text-[#2B895A] font-medium"
                  : "text-[#1A1A1A]/70 hover:bg-[#F7E9D4]"
              }`}
            >
              <Star
                size={13}
                className={`fill-current ${minRating === opt.value ? "text-[#2B895A]" : "text-[#1A1A1A]/40"}`}
              />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-body text-sm font-semibold text-[#1A1A1A] uppercase tracking-widest mb-4">
          Location
        </h3>
        <div className="relative">
          <MapPin
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40"
          />
          <input
            type="text"
            placeholder="City or area..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-8 pr-3 py-2.5 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors"
          />
        </div>
      </div>

      {/* Clear all */}
      {activeFilters.length > 0 && (
        <button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedPrices([]);
            setMinRating(null);
            setLocation("");
          }}
          className="font-body text-sm text-[#2B895A] underline underline-offset-4 hover:text-[#1F6944] transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />

      {/* Page Header */}
      <section className="bg-[#FFF4E2] pt-[72px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs text-[#2B895A] uppercase tracking-widest font-semibold mb-3">
              Directory
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight mb-4">
              Browse Wedding{" "}
              <span className="italic">Vendors</span>
            </h1>
            <p className="font-body text-base text-[#1A1A1A]/60 max-w-xl mb-10">
              Discover curated wedding vendors across Texas — from photographers
              and florists to planners and venues. Filter by category, price, and
              location to find your perfect match.
            </p>

            {/* Search bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40"
                />
                <input
                  type="text"
                  placeholder="Search vendors or categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-full focus:outline-none focus:border-[#2B895A] focus:ring-2 focus:ring-[#2B895A]/10 text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-all shadow-sm"
                />
              </div>
              <button
                onClick={() => setDrawerOpen(true)}
                className="md:hidden flex items-center gap-2 bg-white border border-[#1A1A1A]/15 rounded-full px-5 py-3.5 font-body text-sm font-medium text-[#1A1A1A]/70 shadow-sm"
              >
                <SlidersHorizontal size={15} />
                Filters
                {activeFilters.length > 0 && (
                  <span className="bg-[#2B895A] text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Active filter pills */}
      {activeFilters.length > 0 && (
        <div className="bg-[#FFF4E2] border-t border-[#F7E9D4]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-4 flex flex-wrap gap-2 items-center">
            <span className="font-body text-xs text-[#1A1A1A]/50 mr-1">
              Active filters:
            </span>
            {activeFilters.map((f, i) => (
              <button
                key={i}
                onClick={f.clear}
                className="flex items-center gap-1.5 bg-[#2B895A]/10 text-[#2B895A] font-body text-xs font-medium px-3 py-1.5 rounded-full hover:bg-[#2B895A]/20 transition-colors"
              >
                {f.label}
                <X size={11} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main layout */}
      <section className="bg-[#F7E9D4] py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-[88px] bg-white rounded-3xl p-6 shadow-sm border border-[#F7E9D4]">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={15} className="text-[#2B895A]" />
                <h2 className="font-body text-sm font-semibold text-[#1A1A1A]">
                  Filters
                </h2>
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Vendor Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="font-body text-sm text-[#1A1A1A]/60">
                Showing{" "}
                <span className="font-semibold text-[#1A1A1A]">
                  {Math.min(visibleCount, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#1A1A1A]">
                  {filtered.length}
                </span>{" "}
                vendor{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-heading text-3xl text-[#1A1A1A]/30 mb-2">
                  No vendors found
                </p>
                <p className="font-body text-sm text-[#1A1A1A]/40">
                  Try adjusting your filters or search term.
                </p>
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {visible.map((vendor) => {
                  const Graphic = categoryGraphics[vendor.category] || PhotographyGraphic;
                  const tagBg = tagColours[vendor.tag] || "bg-[#1A1A1A]";
                  return (
                    <motion.a
                      key={vendor.id}
                      href={`/vendors/${vendor.id}`}
                      variants={card}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group rounded-3xl overflow-hidden bg-white border border-transparent
                        hover:border-[#2B895A]/20 hover:shadow-xl hover:shadow-[#2B895A]/10
                        shadow-md shadow-[#1A1A1A]/5 transition-all duration-300 flex flex-col"
                    >
                      {/* Graphic */}
                      <div className="h-52 relative overflow-hidden rounded-t-3xl">
                        <Graphic />
                        <span
                          className={`absolute top-4 left-4 ${tagBg} text-white font-body text-[11px] font-semibold px-3 py-1 rounded-full`}
                        >
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

                        <p className="font-body text-xs text-[#1A1A1A]/60 leading-relaxed line-clamp-2">
                          {vendor.description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-[#F7E9D4] mt-auto">
                          <div className="flex items-center gap-1.5">
                            <Star
                              size={13}
                              className="text-[#2B895A] fill-[#2B895A]"
                            />
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

                        <motion.span
                          whileTap={{ scale: 0.97 }}
                          className="mt-2 w-full flex items-center justify-center gap-2 bg-[#2B895A] group-hover:bg-[#1F6944] text-white font-body text-sm font-semibold py-2.5 rounded-full transition-colors duration-200"
                        >
                          View Profile <ArrowRight size={14} />
                        </motion.span>
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>
            )}

            {/* Load more */}
            {visibleCount < filtered.length && (
              <div className="text-center mt-12">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setVisibleCount((c) => c + 6)}
                  className="inline-flex items-center gap-2 border-2 border-[#2B895A] text-[#2B895A] font-body text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#2B895A] hover:text-white transition-all duration-200"
                >
                  Load more vendors
                  <ChevronDown size={16} />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] bg-[#1A1A1A]/50 backdrop-blur-sm md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-[80] w-80 max-w-[90vw] bg-[#FFF4E2] shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#F7E9D4]">
                <div className="flex items-center gap-2">
                  <Filter size={15} className="text-[#2B895A]" />
                  <h2 className="font-body text-sm font-semibold text-[#1A1A1A]">
                    Filters
                  </h2>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] p-1"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <FilterPanel />
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setDrawerOpen(false)}
                  className="w-full mt-8 bg-[#2B895A] text-white font-body text-sm font-semibold py-3.5 rounded-full hover:bg-[#1F6944] transition-colors"
                >
                  Show {filtered.length} vendor{filtered.length !== 1 ? "s" : ""}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
}

export default function VendorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF4E2]" />}>
      <VendorsContent />
    </Suspense>
  );
}
