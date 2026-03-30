import { createClient } from './supabase'

export interface SupabaseVendor {
  id: string
  name: string
  category: string
  location: string
  price_range: string
  rating: number
  reviews: number
  tag: 'Top Rated' | 'Popular' | 'Featured' | 'New'
  description: string
  bio: string[]
  years_experience: number
  weddings_done: number
  response_time: string
  services: string[]
  pricing_tiers: Array<{ name: string; price: string; inclusions: string[] }>
  instagram: string
  tiktok: string
  website: string
  profile_image: string
  gallery_images: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export async function getVendors(): Promise<SupabaseVendor[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getVendorById(id: string): Promise<SupabaseVendor | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function getAllVendors(): Promise<SupabaseVendor[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function createVendor(
  data: Omit<SupabaseVendor, 'created_at' | 'updated_at'>
): Promise<SupabaseVendor> {
  const supabase = createClient()
  const { data: vendor, error } = await supabase
    .from('vendors')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return vendor
}

export async function updateVendor(
  id: string,
  data: Partial<Omit<SupabaseVendor, 'id' | 'created_at' | 'updated_at'>>
): Promise<SupabaseVendor> {
  const supabase = createClient()
  const { data: vendor, error } = await supabase
    .from('vendors')
    .update(data)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return vendor
}

export async function deleteVendor(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('vendors')
    .update({ is_active: false })
    .eq('id', id)
  if (error) throw error
}

export async function seedVendors(): Promise<void> {
  const supabase = createClient()
  const { getSeedData } = await import('./seed-vendors')
  const seedData = getSeedData()
  const { error } = await supabase
    .from('vendors')
    .upsert(seedData, { onConflict: 'id' })
  if (error) throw error
}
