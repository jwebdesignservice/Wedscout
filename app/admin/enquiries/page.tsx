"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase";

interface Enquiry {
  id: string;
  vendor_name: string;
  name: string;
  email: string;
  wedding_date: string | null;
  created_at: string;
  status: string;
}

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    replied: "bg-[#2B895A]/15 text-[#2B895A]",
    closed: "bg-[#1A1A1A]/10 text-[#1A1A1A]/60",
  };
  return map[status] ?? "bg-[#1A1A1A]/10 text-[#1A1A1A]/60";
};

const TABS = ["All", "Pending", "Replied", "Closed"] as const;

export default function AdminEnquiriesPage() {
  const supabase = createClient();

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All");

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("enquiries")
      .select("id, vendor_name, name, email, wedding_date, created_at, status")
      .order("created_at", { ascending: false });
    setEnquiries(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered =
    activeTab === "All"
      ? enquiries
      : enquiries.filter((e) => e.status === activeTab.toLowerCase());

  const handleStatusChange = async (id: string, newStatus: string) => {
    await supabase.from("enquiries").update({ status: newStatus }).eq("id", id);
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await supabase.from("enquiries").delete().eq("id", id);
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-light text-[#1A1A1A]">
          Enquiries <span className="italic">Management</span>
        </h1>
        <p className="font-body text-sm text-[#1A1A1A]/55 mt-1">
          Review and respond to vendor enquiries.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 w-fit shadow-sm border border-[#F7E9D4]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-body text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === tab
                ? "bg-[#2B895A] text-white"
                : "text-[#1A1A1A]/55 hover:text-[#1A1A1A]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#F7E9D4] overflow-hidden">
        {loading ? (
          <div className="px-6 py-10 text-center font-body text-sm text-[#1A1A1A]/40">
            Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-10 text-center font-body text-sm text-[#1A1A1A]/40">
            No enquiries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F7E9D4]">
                  {["From", "Email", "Vendor", "Wedding Date", "Submitted", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left font-body text-xs font-semibold text-[#1A1A1A]/40 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7E9D4]">
                {filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#FFF4E2]/40 transition-colors">
                    <td className="px-5 py-4 font-body text-sm font-medium text-[#1A1A1A] whitespace-nowrap">
                      {enq.name}
                    </td>
                    <td className="px-5 py-4 font-body text-sm text-[#1A1A1A]/65 whitespace-nowrap">
                      {enq.email}
                    </td>
                    <td className="px-5 py-4 font-body text-sm text-[#1A1A1A]/65 whitespace-nowrap">
                      {enq.vendor_name}
                    </td>
                    <td className="px-5 py-4 font-body text-sm text-[#1A1A1A]/55 whitespace-nowrap">
                      {enq.wedding_date
                        ? new Date(enq.wedding_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-5 py-4 font-body text-sm text-[#1A1A1A]/55 whitespace-nowrap">
                      {new Date(enq.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`font-body text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 ${statusBadge(enq.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="replied">Replied</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="flex items-center gap-1.5 text-red-500 border border-red-200 hover:border-red-400 hover:bg-red-50 font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
