import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase-server";
import VendorProfilePage from "./VendorProfilePage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerClient();

  const { data: vendor } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!vendor) notFound();

  return <VendorProfilePage vendor={vendor} />;
}
