import { vendors } from "@/lib/vendors";
import VendorProfilePage from "./VendorProfilePage";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return vendors.map((v) => ({ id: v.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vendor = vendors.find((v) => v.id === id);
  if (!vendor) notFound();
  return <VendorProfilePage vendor={vendor} />;
}
