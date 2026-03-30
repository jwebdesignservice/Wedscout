-- vendors table
create table public.vendors (
  id text primary key, -- slug e.g. 'golden-hour-studio'
  name text not null,
  category text not null,
  location text not null,
  price_range text not null,
  rating numeric(3,1) default 5.0,
  reviews integer default 0,
  tag text default 'New' check (tag in ('Top Rated', 'Popular', 'Featured', 'New')),
  description text,
  bio jsonb default '[]'::jsonb, -- array of paragraph strings
  years_experience integer default 0,
  weddings_done integer default 0,
  response_time text default 'Within 24 hours',
  services jsonb default '[]'::jsonb, -- array of strings
  pricing_tiers jsonb default '[]'::jsonb, -- array of {name, price, inclusions[]}
  instagram text,
  tiktok text,
  website text,
  profile_image text,
  gallery_images jsonb default '[]'::jsonb, -- array of image URLs
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.vendors enable row level security;

-- Anyone can read active vendors
create policy "Anyone can view active vendors" on public.vendors
  for select using (is_active = true);

-- Only admins can insert/update/delete
create policy "Admins can manage vendors" on public.vendors
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Storage bucket for vendor images
insert into storage.buckets (id, name, public)
values ('vendor-images', 'vendor-images', true)
on conflict do nothing;

-- Allow public read of vendor images
create policy "Public can view vendor images" on storage.objects
  for select using (bucket_id = 'vendor-images');

-- Allow admins to upload vendor images
create policy "Admins can upload vendor images" on storage.objects
  for insert with check (
    bucket_id = 'vendor-images' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete vendor images" on storage.objects
  for delete using (
    bucket_id = 'vendor-images' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger vendors_updated_at
  before update on public.vendors
  for each row execute procedure public.handle_updated_at();
