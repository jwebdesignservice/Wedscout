import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase-server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardClient from "./DashboardClient";
import type { SupabaseVendor } from "@/lib/supabase-vendors";

export default async function DashboardPage() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch saved vendors (IDs + timestamps, most recent first)
  const { data: savedRecords } = await supabase
    .from("saved_vendors")
    .select("vendor_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch enquiries
  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch full vendor data for saved vendors
  const vendorIds = (savedRecords ?? []).map((r) => r.vendor_id);
  let savedVendorData: SupabaseVendor[] = [];
  if (vendorIds.length > 0) {
    const { data } = await supabase
      .from("vendors")
      .select("*")
      .in("id", vendorIds);
    // Preserve save order (most recently saved first)
    const byId = Object.fromEntries((data ?? []).map((v) => [v.id, v]));
    savedVendorData = vendorIds.map((id) => byId[id]).filter(Boolean) as SupabaseVendor[];
  }

  return (
    <>
      <Navbar />
      <DashboardClient
        profile={profile}
        user={user}
        savedVendors={savedVendorData}
        enquiries={enquiries ?? []}
      />
      <Footer />
    </>
  );
}
