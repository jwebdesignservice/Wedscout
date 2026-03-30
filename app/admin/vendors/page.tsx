"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { vendors } from "@/lib/vendors";

export default function AdminVendorsPage() {
  const [search, setSearch] = useState("");

  const filtered = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
  );

  const tagColours: Record<string, string> = {
    "Top Rated": "bg-[#2B895A]/15 text-[#2B895A]",
    Popular: "bg-[#1A1A1A]/10 text-[#1A1A1A]/70",
    Featured: "bg-[#1F6944]/15 text-[#1F6944]",
    New: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-light text-[#1A1A1A]">
            Vendor <span className="italic">Management</span>
          </h1>
          <p className="font-body text-sm text-[#1A1A1A]/55 mt-1">
            {vendors.length} vendors in the directory
          </p>
        </div>
        <button
          onClick={() => alert("Coming soon")}
          className="flex items-center gap-2 bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold px-5 py-3 rounded-full transition-colors"
        >
          <Plus size={15} />
          Add Vendor
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search vendors by name, category or location…"
          className="w-full pl-10 pr-4 py-3 font-body text-sm bg-white border border-[#F7E9D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 focus:border-[#2B895A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors shadow-sm"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-[#F7E9D4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F7E9D4]">
                {["", "Name", "Category", "Location", "Rating", "Price", "Tag", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-body text-xs font-semibold text-[#1A1A1A]/40 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7E9D4]">
              {filtered.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-[#FFF4E2]/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                      <Image
                        src={vendor.profileImage}
                        alt={vendor.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body text-sm font-semibold text-[#1A1A1A]">
                    {vendor.name}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-[#1A1A1A]/65">
                    {vendor.category}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-[#1A1A1A]/65">
                    {vendor.location}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-[#1A1A1A]">
                    {vendor.rating}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-[#1A1A1A]/65">
                    {vendor.priceRange}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full ${tagColours[vendor.tag] ?? "bg-[#1A1A1A]/10 text-[#1A1A1A]/60"}`}>
                      {vendor.tag}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert("Coming soon")}
                        className="flex items-center gap-1.5 text-[#2B895A] border border-[#2B895A]/30 hover:border-[#2B895A] hover:bg-[#2B895A]/5 font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Edit size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => alert("Coming soon")}
                        className="flex items-center gap-1.5 text-red-500 border border-red-200 hover:border-red-400 hover:bg-red-50 font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 size={12} />
                        Delete
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
            No vendors match your search.
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#F7E9D4] flex gap-4"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
              <Image
                src={vendor.profileImage}
                alt={vendor.name}
                fill
                unoptimized
                className="object-cover"
                sizes="48px"
              />
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
                <button
                  onClick={() => alert("Coming soon")}
                  className="flex items-center gap-1.5 text-[#2B895A] border border-[#2B895A]/30 font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Edit size={11} />
                  Edit
                </button>
                <button
                  onClick={() => alert("Coming soon")}
                  className="flex items-center gap-1.5 text-red-500 border border-red-200 font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Trash2 size={11} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-10 text-center font-body text-sm text-[#1A1A1A]/40">
            No vendors match your search.
          </div>
        )}
      </div>
    </div>
  );
}
