"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  ChevronDown,
  X,
  Loader2,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  getVendors,
  saveVendors,
  type DemoVendor,
} from "@/lib/vendor-store";

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

const allTags: DemoVendor["tag"][] = ["Top Rated", "Popular", "Featured", "New"];

const tagColours: Record<string, string> = {
  "Top Rated": "bg-[#2B895A]/15 text-[#2B895A]",
  Popular: "bg-[#1A1A1A]/10 text-[#1A1A1A]/70",
  Featured: "bg-[#1F6944]/15 text-[#1F6944]",
  New: "bg-blue-50 text-blue-600",
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const emptyForm = {
  name: "",
  category: "",
  location: "",
  price_range: "",
  tag: "New" as DemoVendor["tag"],
  description: "",
  rating: 5,
  reviews: 0,
  years_experience: 0,
  weddings_done: 0,
  response_time: "Within 24 hours",
  instagram: "",
  tiktok: "",
  website: "",
  profile_image: "",
  is_active: true,
};

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<DemoVendor[]>([]);
  
  // Load vendors from localStorage on mount
  useEffect(() => {
    setVendors(getVendors());
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [minRating, setMinRating] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState<DemoVendor | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Auto-hide success message
  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(null), 4000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  const filtered = vendors.filter((v) => {
    const matchSearch =
      !search ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || v.category === selectedCategory;
    const matchTag = !selectedTag || v.tag === selectedTag;
    const matchRating = !minRating || v.rating >= minRating;
    return matchSearch && matchCategory && matchTag && matchRating;
  });

  const activeFilterCount = [selectedCategory, selectedTag, minRating].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedTag("");
    setMinRating(null);
  };

  const openAddForm = () => {
    setEditingVendor(null);
    setForm(emptyForm);
    setFormError(null);
    setShowForm(true);
  };

  const openEditForm = (vendor: DemoVendor) => {
    setEditingVendor(vendor);
    setForm({
      name: vendor.name,
      category: vendor.category,
      location: vendor.location,
      price_range: vendor.price_range,
      tag: vendor.tag,
      description: vendor.description || "",
      rating: vendor.rating,
      reviews: vendor.reviews,
      years_experience: vendor.years_experience,
      weddings_done: vendor.weddings_done,
      response_time: vendor.response_time,
      instagram: vendor.instagram || "",
      tiktok: vendor.tiktok || "",
      website: vendor.website || "",
      profile_image: vendor.profile_image || "",
      is_active: vendor.is_active,
    });
    setFormError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingVendor(null);
    setForm(emptyForm);
    setFormError(null);
  };

  const handleSave = () => {
    // Validate
    if (!form.name.trim()) {
      setFormError("Name is required");
      return;
    }
    if (!form.category) {
      setFormError("Category is required");
      return;
    }
    if (!form.location.trim()) {
      setFormError("Location is required");
      return;
    }
    if (!form.price_range.trim()) {
      setFormError("Price range is required");
      return;
    }

    setSaving(true);
    setFormError(null);

    // Simulate save delay
    setTimeout(() => {
      const newVendor: DemoVendor = {
        id: editingVendor ? editingVendor.id : generateSlug(form.name),
        name: form.name.trim(),
        category: form.category,
        location: form.location.trim(),
        price_range: form.price_range.trim(),
        tag: form.tag,
        description: form.description.trim(),
        rating: form.rating,
        reviews: form.reviews,
        years_experience: form.years_experience,
        weddings_done: form.weddings_done,
        response_time: form.response_time.trim(),
        instagram: form.instagram.trim(),
        tiktok: form.tiktok.trim(),
        website: form.website.trim(),
        profile_image: form.profile_image.trim() || "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop",
        gallery_images: editingVendor?.gallery_images || [],
        bio: editingVendor?.bio || [],
        services: editingVendor?.services || [],
        pricing_tiers: editingVendor?.pricing_tiers || [],
        is_active: form.is_active,
      };

      if (editingVendor) {
        const updated = vendors.map(v => v.id === editingVendor.id ? newVendor : v);
        setVendors(updated);
        saveVendors(updated);
        setSuccessMsg("Vendor updated successfully");
      } else {
        const updated = [...vendors, newVendor];
        setVendors(updated);
        saveVendors(updated);
        setSuccessMsg("Vendor created successfully");
      }

      closeForm();
      setSaving(false);
    }, 500);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setDeleting(true);
    
    // Simulate delete delay
    setTimeout(() => {
      const updated = vendors.filter(v => v.id !== deleteId);
      setVendors(updated);
      saveVendors(updated);
      setSuccessMsg("Vendor deleted successfully");
      setDeleteId(null);
      setDeleting(false);
    }, 500);
  };

  return (
    <div className="p-6 lg:p-10">
      {/* Success message */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-[60] bg-[#2B895A] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <CheckCircle size={16} />
            <span className="font-body text-sm font-medium">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-light text-[#1A1A1A]">
            Vendor <span className="italic">Management</span>
          </h1>
          <p className="font-body text-sm text-[#1A1A1A]/55 mt-1">
            {loading ? "Loading..." : `${vendors.length} vendors in the directory`}
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/admin/vendors/new"
            className="flex items-center gap-2 bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold px-5 py-3 rounded-full transition-colors"
          >
            <Plus size={15} />
            Add Vendor
          </a>
        </div>
      </div>

      {/* Search & Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors by name, category or location…"
            className="w-full pl-10 pr-4 py-3 font-body text-sm bg-white border border-[#F7E9D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors shadow-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-body text-sm font-medium transition-colors ${
            showFilters || activeFilterCount > 0
              ? "bg-[#2B895A] border-[#2B895A] text-white"
              : "bg-white border-[#F7E9D4] text-[#1A1A1A]/70 hover:border-[#2B895A]"
          }`}
        >
          <Filter size={15} />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-white text-[#2B895A] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border border-[#F7E9D4] rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[180px]">
              <label className="font-body text-xs font-semibold text-[#1A1A1A]/50 uppercase tracking-wide block mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 font-body text-sm bg-white border border-[#F7E9D4] rounded-lg focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
              >
                <option value="">All categories</option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="font-body text-xs font-semibold text-[#1A1A1A]/50 uppercase tracking-wide block mb-2">Tag</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 font-body text-sm bg-white border border-[#F7E9D4] rounded-lg focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
              >
                <option value="">All tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="font-body text-xs font-semibold text-[#1A1A1A]/50 uppercase tracking-wide block mb-2">Min Rating</label>
              <select
                value={minRating ?? ""}
                onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 font-body text-sm bg-white border border-[#F7E9D4] rounded-lg focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
              >
                <option value="">Any rating</option>
                <option value="4">4+ stars</option>
                <option value="4.5">4.5+ stars</option>
                <option value="5">5 stars only</option>
              </select>
            </div>
          </div>
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="mt-3 flex items-center gap-1.5 text-[#1A1A1A]/50 hover:text-[#2B895A] font-body text-xs transition-colors">
              <X size={12} /> Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-[#F7E9D4] animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#F7E9D4]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[#F7E9D4] rounded w-3/4" />
                  <div className="h-3 bg-[#F7E9D4] rounded w-1/2" />
                </div>
              </div>
              <div className="h-8 bg-[#F7E9D4] rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle size={24} className="text-red-500 mx-auto mb-2" />
          <p className="font-body text-sm text-red-600">{error}</p>
          <button onClick={() => setVendors(getVendors())} className="mt-3 font-body text-sm text-red-600 underline">Try again</button>
        </div>
      )}

      {/* Vendor Table */}
      {!loading && !error && (
        <>
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-[#F7E9D4] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F7E9D4]">
                    {["", "Name", "Category", "Location", "Rating", "Price", "Tag", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-body text-xs font-semibold text-[#1A1A1A]/40 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7E9D4]">
                  {filtered.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-[#FFF4E2]/40 transition-colors">
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 bg-[#F7E9D4]">
                          {vendor.profile_image && (
                            <Image src={vendor.profile_image} alt={vendor.name} fill unoptimized className="object-cover" sizes="40px" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-body text-sm font-semibold text-[#1A1A1A]">{vendor.name}</td>
                      <td className="px-4 py-3 font-body text-sm text-[#1A1A1A]/65">{vendor.category}</td>
                      <td className="px-4 py-3 font-body text-sm text-[#1A1A1A]/65">{vendor.location}</td>
                      <td className="px-4 py-3 font-body text-sm text-[#1A1A1A]">{vendor.rating}</td>
                      <td className="px-4 py-3 font-body text-sm text-[#1A1A1A]/65">{vendor.price_range}</td>
                      <td className="px-4 py-3">
                        <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full ${tagColours[vendor.tag] ?? "bg-[#1A1A1A]/10 text-[#1A1A1A]/60"}`}>
                          {vendor.tag}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full ${vendor.is_active ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                          {vendor.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <a
                            href={`/admin/vendors/${vendor.id}/edit`}
                            className="flex items-center gap-1.5 text-[#2B895A] border border-[#2B895A]/30 hover:border-[#2B895A] hover:bg-[#2B895A]/5 font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Edit size={12} /> Edit
                          </a>
                          <button
                            onClick={() => setDeleteId(vendor.id)}
                            className="flex items-center gap-1.5 text-red-500 border border-red-200 hover:border-red-400 hover:bg-red-50 font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="px-6 py-10 text-center font-body text-sm text-[#1A1A1A]/40">
                {vendors.length === 0 ? "No vendors yet. Click 'Seed Database' to add sample data." : "No vendors match your search."}
              </div>
            )}
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#F7E9D4] flex gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0 bg-[#F7E9D4]">
                  {vendor.profile_image && (
                    <Image src={vendor.profile_image} alt={vendor.name} fill unoptimized className="object-cover" sizes="48px" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-body text-sm font-semibold text-[#1A1A1A] truncate">{vendor.name}</p>
                      <p className="font-body text-xs text-[#1A1A1A]/55">{vendor.category} · {vendor.location}</p>
                    </div>
                    <span className={`font-body text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${tagColours[vendor.tag] ?? "bg-[#1A1A1A]/10 text-[#1A1A1A]/60"}`}>
                      {vendor.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <a href={`/admin/vendors/${vendor.id}/edit`} className="flex items-center gap-1.5 text-[#2B895A] border border-[#2B895A]/30 font-body text-xs font-medium px-3 py-1.5 rounded-lg">
                      <Edit size={11} /> Edit
                    </a>
                    <button onClick={() => setDeleteId(vendor.id)} className="flex items-center gap-1.5 text-red-500 border border-red-200 font-body text-xs font-medium px-3 py-1.5 rounded-lg">
                      <Trash2 size={11} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-10 text-center font-body text-sm text-[#1A1A1A]/40">
                {vendors.length === 0 ? "No vendors yet. Click 'Seed Database' to add sample data." : "No vendors match your search."}
              </div>
            )}
          </div>
        </>
      )}

      {/* Delete confirm dialog */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => !deleting && setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="font-heading text-xl text-[#1A1A1A] mb-2">Delete vendor?</h3>
              <p className="font-body text-sm text-[#1A1A1A]/60 mb-6">
                This will remove the vendor from public listings. This action can be undone by reactivating the vendor.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                  className="flex-1 border border-[#1A1A1A]/20 text-[#1A1A1A] font-body text-sm font-medium py-3 rounded-full hover:bg-[#F7E9D4] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-body text-sm font-medium py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  {deleting && <Loader2 size={14} className="animate-spin" />}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Form Slide-over */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
              className="fixed inset-0 z-50 bg-black/50"
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-[#F7E9D4] flex items-center justify-between shrink-0">
                <h2 className="font-heading text-2xl text-[#1A1A1A]">
                  {editingVendor ? "Edit Vendor" : "Add New Vendor"}
                </h2>
                <button onClick={closeForm} className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {formError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-600">
                    <AlertCircle size={16} />
                    <span className="font-body text-sm">{formError}</span>
                  </div>
                )}

                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/40 pb-2 border-b border-[#F7E9D4]">
                    Basic Information
                  </h3>
                  <div>
                    <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Vendor name"
                      className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Category *</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      >
                        <option value="">Select...</option>
                        {allCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Tag</label>
                      <select
                        value={form.tag}
                        onChange={(e) => setForm({ ...form, tag: e.target.value as DemoVendor["tag"] })}
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      >
                        {allTags.map((tag) => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Location *</label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="Austin, TX"
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Price Range *</label>
                      <input
                        type="text"
                        value={form.price_range}
                        onChange={(e) => setForm({ ...form, price_range: e.target.value })}
                        placeholder="$$-$$$"
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      placeholder="Short description..."
                      className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A] resize-none"
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/40 pb-2 border-b border-[#F7E9D4]">
                    Stats & Experience
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Rating (0-5)</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={form.rating}
                        onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })}
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Reviews</label>
                      <input
                        type="number"
                        min="0"
                        value={form.reviews}
                        onChange={(e) => setForm({ ...form, reviews: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Years Experience</label>
                      <input
                        type="number"
                        min="0"
                        value={form.years_experience}
                        onChange={(e) => setForm({ ...form, years_experience: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Weddings Done</label>
                      <input
                        type="number"
                        min="0"
                        value={form.weddings_done}
                        onChange={(e) => setForm({ ...form, weddings_done: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Response Time</label>
                    <input
                      type="text"
                      value={form.response_time}
                      onChange={(e) => setForm({ ...form, response_time: e.target.value })}
                      placeholder="Within 24 hours"
                      className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                    />
                  </div>
                </div>

                {/* Social */}
                <div className="space-y-4">
                  <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/40 pb-2 border-b border-[#F7E9D4]">
                    Social & Web
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Instagram</label>
                      <input
                        type="text"
                        value={form.instagram}
                        onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                        placeholder="@username"
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">TikTok</label>
                      <input
                        type="text"
                        value={form.tiktok}
                        onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
                        placeholder="@username"
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Website</label>
                      <input
                        type="text"
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        placeholder="example.com"
                        className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="space-y-4">
                  <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/40 pb-2 border-b border-[#F7E9D4]">
                    Profile Image
                  </h3>
                  <div>
                    <label className="font-body text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/60 block mb-2">Image URL</label>
                    <input
                      type="text"
                      value={form.profile_image}
                      onChange={(e) => setForm({ ...form, profile_image: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 font-body text-sm bg-white border border-[#1A1A1A]/15 rounded-xl focus:outline-none focus:border-[#2B895A] text-[#1A1A1A]"
                    />
                    {form.profile_image && (
                      <div className="mt-3 w-20 h-20 rounded-xl overflow-hidden relative bg-[#F7E9D4]">
                        <Image src={form.profile_image} alt="Preview" fill unoptimized className="object-cover" sizes="80px" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-4">
                  <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/40 pb-2 border-b border-[#F7E9D4]">
                    Status
                  </h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="w-5 h-5 rounded border-[#1A1A1A]/20 text-[#2B895A] focus:ring-[#2B895A]/20"
                    />
                    <span className="font-body text-sm text-[#1A1A1A]">Active (visible on website)</span>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-[#F7E9D4] flex gap-3 shrink-0">
                <button
                  onClick={closeForm}
                  className="flex-1 border border-[#1A1A1A]/20 text-[#1A1A1A] font-body text-sm font-semibold py-3.5 rounded-full hover:bg-[#F7E9D4] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {saving ? "Saving..." : "Save Vendor"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
