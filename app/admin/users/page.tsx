"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  created_at: string;
}

const roleBadge = (role: string | null) => {
  const map: Record<string, string> = {
    couple: "bg-blue-50 text-blue-600",
    vendor: "bg-[#2B895A]/15 text-[#2B895A]",
    admin: "bg-[#1A1A1A] text-white",
  };
  return map[role ?? "couple"] ?? "bg-[#1A1A1A]/10 text-[#1A1A1A]/60";
};

export default function AdminUsersPage() {
  const supabase = createClient();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, email, role, created_at")
        .order("created_at", { ascending: false });
      setProfiles(data ?? []);
      setLoading(false);
    }
    fetchProfiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-light text-[#1A1A1A]">
          Users <span className="italic">List</span>
        </h1>
        <p className="font-body text-sm text-[#1A1A1A]/55 mt-1">
          {loading ? "Loading…" : `${profiles.length} registered users`}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#F7E9D4] overflow-hidden">
        {loading ? (
          <div className="px-6 py-10 text-center font-body text-sm text-[#1A1A1A]/40">
            Loading…
          </div>
        ) : profiles.length === 0 ? (
          <div className="px-6 py-10 text-center font-body text-sm text-[#1A1A1A]/40">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F7E9D4]">
                  {["Name", "Email", "Role", "Joined"].map((h) => (
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
                {profiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-[#FFF4E2]/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#2B895A]/15 flex items-center justify-center shrink-0">
                          <span className="font-body text-xs font-semibold text-[#2B895A]">
                            {(profile.full_name ?? profile.email ?? "?")[0].toUpperCase()}
                          </span>
                        </div>
                        <span className="font-body text-sm font-medium text-[#1A1A1A]">
                          {profile.full_name ?? "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-[#1A1A1A]/65">
                      {profile.email ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-body text-xs font-semibold px-3 py-1 rounded-full capitalize ${roleBadge(profile.role)}`}
                      >
                        {profile.role ?? "couple"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-[#1A1A1A]/55">
                      {new Date(profile.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
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
