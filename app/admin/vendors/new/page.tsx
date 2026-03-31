"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  X,
  Upload,
  GripVertical,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  getVendors,
  saveVendors,
  type DemoVendor,
} from "@/lib/vendor-store";

const allCategories = [
  "Photography",
  "Florals & Decor",
  "Music & DJ",
  "Catering",
  "Jewellery",
  "Beauty & Hair",
  "Videography",
  "Planning",
  "Venues",
  "Invitations",
  "Favours",
  "Honeymoon",
];

const allTags: DemoVendor["tag"][] = ["Top Rated", "Popular", "Featured", "New"];

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const InputClass = (hasError?: boolean) =>
  `w-full px-4 py-3 font-body text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B895A]/20 text-[#1A1A1A] placeholder-[#1A1A1A]/40 transition-colors ${
    hasError ? "border-red-400" : "border-[#1A1A1A]/15 focus:border-[#2B895A]"
  }`;

const LabelClass = "font-body text-xs font-semibold text-[#1A1A1A]/70 uppercase tracking-wide block mb-2";

interface PricingTier {
  name: string;
  price: string;
  inclusions: string[];
}

export default function NewVendorPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Basic Info
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [tag, setTag] = useState<DemoVendor["tag"]>("New");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Stats
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [weddingsDone, setWeddingsDone] = useState(0);
  const [responseTime, setResponseTime] = useState("Within 24 hours");

  // Contact/Social
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [website, setWebsite] = useState("");

  // Media
  const [profileImage, setProfileImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  // Bio (multiple paragraphs)
  const [bio, setBio] = useState<string[]>([""]);

  // Services
  const [services, setServices] = useState<string[]>([""]);

  // Pricing Tiers
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    { name: "Basic", price: "", inclusions: [""] },
    { name: "Standard", price: "", inclusions: [""] },
    { name: "Premium", price: "", inclusions: [""] },
  ]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!category) errs.category = "Category is required";
    if (!location.trim()) errs.location = "Location is required";
    if (!priceRange.trim()) errs.priceRange = "Price range is required";
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSaving(true);
    setErrors({});

    setTimeout(() => {
      const newVendor: DemoVendor = {
        id: generateSlug(name),
        name: name.trim(),
        category,
        location: location.trim(),
        price_range: priceRange.trim(),
        tag,
        description: description.trim(),
        rating,
        reviews,
        years_experience: yearsExperience,
        weddings_done: weddingsDone,
        response_time: responseTime.trim(),
        instagram: instagram.trim(),
        tiktok: tiktok.trim(),
        website: website.trim(),
        profile_image: profileImage.trim() || "https://picsum.photos/seed/vendor/400/400",
        gallery_images: galleryImages.filter(url => url.trim()),
        bio: bio.filter(p => p.trim()),
        services: services.filter(s => s.trim()),
        pricing_tiers: pricingTiers
          .filter(t => t.price.trim())
          .map(t => ({
            name: t.name,
            price: t.price.trim(),
            inclusions: t.inclusions.filter(i => i.trim()),
          })),
        is_active: isActive,
      };

      const vendors = getVendors();
      vendors.push(newVendor);
      saveVendors(vendors);

      setSuccess(true);
      setSaving(false);

      setTimeout(() => {
        router.push("/admin/vendors");
      }, 1500);
    }, 500);
  };

  // Bio handlers
  const addBioParagraph = () => setBio([...bio, ""]);
  const updateBio = (index: number, value: string) => {
    const updated = [...bio];
    updated[index] = value;
    setBio(updated);
  };
  const removeBio = (index: number) => {
    if (bio.length > 1) setBio(bio.filter((_, i) => i !== index));
  };

  // Services handlers
  const addService = () => setServices([...services, ""]);
  const updateService = (index: number, value: string) => {
    const updated = [...services];
    updated[index] = value;
    setServices(updated);
  };
  const removeService = (index: number) => {
    if (services.length > 1) setServices(services.filter((_, i) => i !== index));
  };

  // Gallery handlers
  const addGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setGalleryImages([...galleryImages, newGalleryUrl.trim()]);
      setNewGalleryUrl("");
    }
  };
  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  // Pricing handlers
  const updatePricingTier = (index: number, field: keyof PricingTier, value: string | string[]) => {
    const updated = [...pricingTiers];
    if (field === "inclusions") {
      updated[index].inclusions = value as string[];
    } else {
      updated[index][field] = value as string;
    }
    setPricingTiers(updated);
  };
  const addInclusion = (tierIndex: number) => {
    const updated = [...pricingTiers];
    updated[tierIndex].inclusions.push("");
    setPricingTiers(updated);
  };
  const updateInclusion = (tierIndex: number, incIndex: number, value: string) => {
    const updated = [...pricingTiers];
    updated[tierIndex].inclusions[incIndex] = value;
    setPricingTiers(updated);
  };
  const removeInclusion = (tierIndex: number, incIndex: number) => {
    const updated = [...pricingTiers];
    if (updated[tierIndex].inclusions.length > 1) {
      updated[tierIndex].inclusions = updated[tierIndex].inclusions.filter((_, i) => i !== incIndex);
      setPricingTiers(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4E2]">
      {/* Header */}
      <div className="bg-white border-b border-[#F7E9D4] sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin/vendors")}
              className="flex items-center gap-2 font-body text-sm text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Vendors
            </button>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 font-body text-sm text-[#1A1A1A]/70">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-[#1A1A1A]/20 text-[#2B895A] focus:ring-[#2B895A]/20"
              />
              Active
            </label>
            <button
              onClick={handleSave}
              disabled={saving || success}
              className="flex items-center gap-2 bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold px-5 py-2.5 rounded-full transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : success ? (
                <>
                  <CheckCircle size={16} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Vendor
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-heading text-3xl font-light text-[#1A1A1A] mb-8">
          Add New <span className="italic">Vendor</span>
        </h1>

        {/* Error Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8">
            <div className="flex items-center gap-2 text-red-600 font-body text-sm font-semibold mb-2">
              <AlertCircle size={16} />
              Please fix the following errors:
            </div>
            <ul className="list-disc list-inside font-body text-sm text-red-600">
              {Object.values(errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-8">
          {/* Basic Information */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#1A1A1A]/5">
            <h2 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={LabelClass}>Vendor Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Golden Hour Studio"
                  className={InputClass(!!errors.name)}
                />
              </div>

              <div>
                <label className={LabelClass}>Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`${InputClass(!!errors.category)} appearance-none`}
                >
                  <option value="">Select category...</option>
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={LabelClass}>Location *</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Austin, TX"
                  className={InputClass(!!errors.location)}
                />
              </div>

              <div>
                <label className={LabelClass}>Price Range *</label>
                <input
                  type="text"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  placeholder="e.g. $$–$$$"
                  className={InputClass(!!errors.priceRange)}
                />
              </div>

              <div>
                <label className={LabelClass}>Tag</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as DemoVendor["tag"])}
                  className={`${InputClass()} appearance-none`}
                >
                  {allTags.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={LabelClass}>Short Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="A brief tagline or description shown on vendor cards"
                  className={`${InputClass()} resize-none`}
                />
              </div>
            </div>
          </section>

          {/* Stats & Response */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#1A1A1A]/5">
            <h2 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-6">Stats & Response</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                <label className={LabelClass}>Rating</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
                  className={InputClass()}
                />
              </div>

              <div>
                <label className={LabelClass}>Reviews</label>
                <input
                  type="number"
                  min="0"
                  value={reviews}
                  onChange={(e) => setReviews(parseInt(e.target.value) || 0)}
                  className={InputClass()}
                />
              </div>

              <div>
                <label className={LabelClass}>Years Experience</label>
                <input
                  type="number"
                  min="0"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(parseInt(e.target.value) || 0)}
                  className={InputClass()}
                />
              </div>

              <div>
                <label className={LabelClass}>Weddings Done</label>
                <input
                  type="number"
                  min="0"
                  value={weddingsDone}
                  onChange={(e) => setWeddingsDone(parseInt(e.target.value) || 0)}
                  className={InputClass()}
                />
              </div>

              <div>
                <label className={LabelClass}>Response Time</label>
                <input
                  type="text"
                  value={responseTime}
                  onChange={(e) => setResponseTime(e.target.value)}
                  placeholder="Within 24 hours"
                  className={InputClass()}
                />
              </div>
            </div>
          </section>

          {/* Contact & Social */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#1A1A1A]/5">
            <h2 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-6">Contact & Social</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={LabelClass}>Instagram Handle</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@goldenhour"
                  className={InputClass()}
                />
              </div>

              <div>
                <label className={LabelClass}>TikTok Handle</label>
                <input
                  type="text"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  placeholder="@goldenhour"
                  className={InputClass()}
                />
              </div>

              <div>
                <label className={LabelClass}>Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="goldenhour.com"
                  className={InputClass()}
                />
              </div>
            </div>
          </section>

          {/* Profile Image */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#1A1A1A]/5">
            <h2 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-6">Profile Image</h2>
            
            <div className="flex items-start gap-6">
              {profileImage && (
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-[#F7E9D4] shrink-0">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <label className={LabelClass}>Image URL</label>
                <input
                  type="text"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={InputClass()}
                />
                <p className="font-body text-xs text-[#1A1A1A]/50 mt-2">
                  Enter a URL for the vendor&apos;s profile image (recommended: square, at least 400x400px)
                </p>
              </div>
            </div>
          </section>

          {/* Gallery Images */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#1A1A1A]/5">
            <h2 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-6">Gallery Images</h2>
            
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {galleryImages.map((url, i) => (
                  <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-[#F7E9D4]">
                    <Image
                      src={url}
                      alt={`Gallery ${i + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <input
                type="text"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                placeholder="https://example.com/gallery-image.jpg"
                className={`${InputClass()} flex-1`}
                onKeyDown={(e) => e.key === "Enter" && addGalleryImage()}
              />
              <button
                onClick={addGalleryImage}
                className="flex items-center gap-2 bg-[#F7E9D4] hover:bg-[#E8DAC5] text-[#1A1A1A] font-body text-sm font-medium px-4 py-3 rounded-xl transition-colors"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </section>

          {/* About / Bio */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#1A1A1A]/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-[#1A1A1A]">About / Bio</h2>
              <button
                onClick={addBioParagraph}
                className="flex items-center gap-1 font-body text-sm text-[#2B895A] hover:text-[#1F6944] transition-colors"
              >
                <Plus size={14} />
                Add Paragraph
              </button>
            </div>
            
            <div className="space-y-4">
              {bio.map((paragraph, i) => (
                <div key={i} className="flex gap-3">
                  <textarea
                    value={paragraph}
                    onChange={(e) => updateBio(i, e.target.value)}
                    rows={4}
                    placeholder={`Paragraph ${i + 1}...`}
                    className={`${InputClass()} resize-none flex-1`}
                  />
                  {bio.length > 1 && (
                    <button
                      onClick={() => removeBio(i)}
                      className="text-red-400 hover:text-red-600 transition-colors mt-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Services */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#1A1A1A]/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-[#1A1A1A]">Services</h2>
              <button
                onClick={addService}
                className="flex items-center gap-1 font-body text-sm text-[#2B895A] hover:text-[#1F6944] transition-colors"
              >
                <Plus size={14} />
                Add Service
              </button>
            </div>
            
            <div className="space-y-3">
              {services.map((service, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => updateService(i, e.target.value)}
                    placeholder="e.g. Full-day wedding coverage"
                    className={`${InputClass()} flex-1`}
                  />
                  {services.length > 1 && (
                    <button
                      onClick={() => removeService(i)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Tiers */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#1A1A1A]/5">
            <h2 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-6">Pricing Tiers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.map((tier, ti) => (
                <div key={ti} className="bg-[#FFF4E2] rounded-2xl p-5">
                  <div className="mb-4">
                    <label className={LabelClass}>{tier.name} Price</label>
                    <input
                      type="text"
                      value={tier.price}
                      onChange={(e) => updatePricingTier(ti, "price", e.target.value)}
                      placeholder="$2,200"
                      className={InputClass()}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className={LabelClass}>Inclusions</label>
                      <button
                        onClick={() => addInclusion(ti)}
                        className="text-[#2B895A] hover:text-[#1F6944]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {tier.inclusions.map((inc, ii) => (
                        <div key={ii} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={inc}
                            onChange={(e) => updateInclusion(ti, ii, e.target.value)}
                            placeholder="e.g. 8 hours of coverage"
                            className={`${InputClass()} text-xs py-2 flex-1`}
                          />
                          {tier.inclusions.length > 1 && (
                            <button
                              onClick={() => removeInclusion(ti, ii)}
                              className="text-red-400 hover:text-red-600"
                            >
                              <X size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Save Button (bottom) */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => router.push("/admin/vendors")}
              className="font-body text-sm font-medium text-[#1A1A1A]/60 hover:text-[#1A1A1A] px-6 py-3 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || success}
              className="flex items-center gap-2 bg-[#2B895A] hover:bg-[#1F6944] text-white font-body text-sm font-semibold px-8 py-3 rounded-full transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : success ? (
                <>
                  <CheckCircle size={16} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Vendor
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
