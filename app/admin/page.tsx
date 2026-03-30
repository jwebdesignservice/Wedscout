"use client";

import { useEffect, useState } from "react";
import { Tag, MessageSquare, Users, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { vendors } from "@/lib/vendors";

interface Enquiry {
  id: string;
  vendor_name: string;
  name: string;
  email: string;
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

export default function AdminDashboard() {
  const supabase = createClient();

  const [totalEnquiries, setTotalEnquiries] = useState<number>(0);
  const [pendingEnquiries, setPendingEnquiries] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [
        { count: enquiryCount },
        { count: pendingCount },
        { count: userCount },
        { data: recent },
      ] = await Promise.all([
        supabase.from("enquiries").select("*", { count: "exact", head: true }),
        supabase
          .from("enquiries")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase
          .from("enquiries")
          .select("id, vendor_name, name, email, created_at, status")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setTotalEnquiries(enquiryCount ?? 0);
      setPendingEnquiries(pendingCount ?? 0);
      setTotalUsers(userCount ?? 0);
      setRecentEnquiries(recent ?? []);
      setLoading(false);
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = [
    {
      label: "Total Vendors",
      value: vendors.length,
      icon: Tag,
      colour: "bg-[#2B895A]/10 text-[#2B895A]",
    },
    {
      label: "Total Enquiries",
      value: totalEnquiries,
      icon: MessageSquare,
      colour: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      colour: "bg-purple-50 text-purple-600",
    },
    {
      label: "Pending Enquiries",
      value: pendingEnquiries,
      icon: Clock,
      colour: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-light text-[#1A1A1A]">
          Admin <span className="italic">Dashboard</span>
        </h1>
        <p className="font-body text-sm text-[#1A1A1A]/55 mt-1">
          Overview of your WedScout platform activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, colour }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#F7E9D4]"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colour}`}>
              <Icon size={18} />
            </div>
            <p className="font-heading text-3xl font-semibold text-[#1A1A1A]">
              {loading && label !== "Total Vendors" ? "—" : value}
            </p>
            <p className="font-body text-xs text-[#1A1A1A]/55 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#F7E9D4] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F7E9D4]">
          <h2 className="font-heading text-xl font-light text-[#1A1A1A]">
            Recent <span className="italic">Enquiries</span>
          </h2>
        </div>
        {loading ? (
          <div className="px-6 py-10 text-center font-body text-sm text-[#1A1A1A]/40">
            Loading…
          </div>
        ) : recentEnquiries.length === 0 ? (
          <div className="px-6 py-10 text-center font-body text-sm text-[#1A1A1A]/40">
            No enquiries yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F7E9D4]">
                  {["Vendor", "From", "Date", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left font-body text-xs font-semibold text-[#1A1A1A]/40 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7E9D4]">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#FFF4E2]/50 transition-colors">
                    <td className="px-6 py-4 font-body text-sm text-[#1A1A1A] font-medium">
                      {enq.vendor_name}
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-[#1A1A1A]/70">
                      {enq.name}
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-[#1A1A1A]/55">
                      {new Date(enq.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-body text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusBadge(enq.status)}`}
                      >
                        {enq.status}
                      </span>
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
