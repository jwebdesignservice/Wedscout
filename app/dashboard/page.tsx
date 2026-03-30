import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import { vendors } from "@/lib/vendors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardClient from "./DashboardClient";

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

  // Fetch saved vendors
  const { data: savedVendors } = await supabase
    .from("saved_vendors")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch enquiries
  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Match saved vendor IDs to vendor data
  const savedVendorData = (savedVendors ?? [])
    .map((sv) => vendors.find((v) => v.id === sv.vendor_id))
    .filter(Boolean);

  return (
    <>
      <Navbar />
      <DashboardClient
        profile={profile}
        user={user}
        savedVendors={savedVendorData as typeof vendors}
        enquiries={enquiries ?? []}
      />
      <Footer />
    </>
  );
}
