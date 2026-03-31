"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { getVendorById, type DemoVendor } from "@/lib/vendor-store";
import VendorProfilePage from "./VendorProfilePage";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  const [vendor, setVendor] = useState<DemoVendor | null | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const found = getVendorById(id);
      setVendor(found);
    }
  }, [id]);

  // Loading
  if (vendor === undefined) {
    return (
      <div className="min-h-screen bg-[#FFF4E2] flex items-center justify-center">
        <div className="animate-pulse font-body text-[#1A1A1A]/50">Loading...</div>
      </div>
    );
  }

  // Not found
  if (vendor === null) {
    return notFound();
  }

  return <VendorProfilePage vendor={vendor} />;
}
