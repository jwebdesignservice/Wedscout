-- profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  role text default 'couple' check (role in ('couple', 'vendor', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- saved_vendors table
create table public.saved_vendors (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  vendor_id text not null,
  created_at timestamptz default now(),
  unique(user_id, vendor_id)
);

-- enquiries table
create table public.enquiries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  vendor_id text not null,
  vendor_name text not null,
  name text not null,
  email text not null,
  phone text,
  wedding_date date,
  message text not null,
  status text default 'pending' check (status in ('pending', 'replied', 'closed')),
  created_at timestamptz default now()
);

-- RLS policies
alter table public.profiles enable row level security;
alter table public.saved_vendors enable row level security;
alter table public.enquiries enable row level security;

create policy 'Users can view own profile' on public.profiles for select using (auth.uid() = id);
create policy 'Users can update own profile' on public.profiles for update using (auth.uid() = id);
create policy 'Users can view own saved vendors' on public.saved_vendors for all using (auth.uid() = user_id);
create policy 'Users can manage own enquiries' on public.enquiries for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
