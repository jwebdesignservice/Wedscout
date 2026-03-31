import { vendors as seedVendors } from "./vendors";

export interface DemoVendor {
  id: string;
  name: string;
  category: string;
  location: string;
  price_range: string;
  rating: number;
  reviews: number;
  tag: "Top Rated" | "Popular" | "Featured" | "New";
  description: string;
  bio: string[];
  years_experience: number;
  weddings_done: number;
  response_time: string;
  services: string[];
  pricing_tiers: Array<{ name: string; price: string; inclusions: string[] }>;
  instagram: string;
  tiktok: string;
  website: string;
  profile_image: string;
  gallery_images: string[];
  is_active: boolean;
}

const STORAGE_KEY = "wedscout_vendors";

// Convert seed vendor to demo format
const convertToDemo = (v: typeof seedVendors[0]): DemoVendor => ({
  id: v.id,
  name: v.name,
  category: v.category,
  location: v.location,
  price_range: v.priceRange,
  rating: v.rating,
  reviews: v.reviews,
  tag: v.tag as DemoVendor["tag"],
  description: v.description,
  bio: v.bio,
  years_experience: v.yearsExperience,
  weddings_done: v.weddingsDone,
  response_time: v.responseTime,
  services: v.services,
  pricing_tiers: v.pricingTiers,
  instagram: v.instagram,
  tiktok: v.tiktok,
  website: v.website,
  profile_image: v.profileImage,
  gallery_images: v.galleryImages,
  is_active: true,
});

// Get initial seed data
const getInitialVendors = (): DemoVendor[] => seedVendors.map(convertToDemo);

// Get vendors from localStorage or seed data
export function getVendors(): DemoVendor[] {
  if (typeof window === "undefined") return getInitialVendors();
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return getInitialVendors();
    }
  }
  
  // First time - seed localStorage
  const initial = getInitialVendors();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

// Get only active vendors (for public pages)
export function getActiveVendors(): DemoVendor[] {
  return getVendors().filter(v => v.is_active);
}

// Get single vendor by ID
export function getVendorById(id: string): DemoVendor | null {
  const vendors = getVendors();
  return vendors.find(v => v.id === id) || null;
}

// Save vendors to localStorage
export function saveVendors(vendors: DemoVendor[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vendors));
  // Dispatch custom event so other components can react
  window.dispatchEvent(new CustomEvent("vendors-updated"));
}

// Add a vendor
export function addVendor(vendor: DemoVendor): void {
  const vendors = getVendors();
  vendors.push(vendor);
  saveVendors(vendors);
}

// Update a vendor
export function updateVendor(id: string, data: Partial<DemoVendor>): void {
  const vendors = getVendors();
  const index = vendors.findIndex(v => v.id === id);
  if (index !== -1) {
    vendors[index] = { ...vendors[index], ...data };
    saveVendors(vendors);
  }
}

// Delete a vendor (soft delete - set inactive)
export function deleteVendor(id: string): void {
  const vendors = getVendors();
  const index = vendors.findIndex(v => v.id === id);
  if (index !== -1) {
    vendors[index].is_active = false;
    saveVendors(vendors);
  }
}

// Hard delete (remove completely)
export function removeVendor(id: string): void {
  const vendors = getVendors().filter(v => v.id !== id);
  saveVendors(vendors);
}

// Reset to seed data
export function resetVendors(): void {
  saveVendors(getInitialVendors());
}
