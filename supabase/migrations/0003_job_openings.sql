-- Run this once in the Supabase SQL editor for the shared project.
-- Backs a real careers system: the admin dashboard can post/edit/close
-- job openings, and the public /career page lists whatever is actually
-- published instead of a hardcoded "no open role" message. Applications
-- (both against a specific opening and general "always interested"
-- submissions) are stored the same way contact_submissions already are.

create table if not exists job_openings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  department text,
  employment_type text not null default 'Full-time',
  location text not null default 'Guwahati, Assam',
  summary text not null,
  description text not null,
  responsibilities text[] not null default '{}',
  requirements text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table job_openings enable row level security;

drop policy if exists "Public can view published openings" on job_openings;
create policy "Public can view published openings" on job_openings
  for select using (status = 'published');

drop policy if exists "Authenticated can manage job openings" on job_openings;
create policy "Authenticated can manage job openings" on job_openings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists job_applications (
  id uuid primary key default gen_random_uuid(),
  job_opening_id uuid references job_openings(id) on delete set null,
  full_name text not null,
  email text not null,
  role_interest text,
  link_url text,
  resume_url text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  created_at timestamptz not null default now()
);

alter table job_applications enable row level security;

-- Anyone can apply, including the anonymous/public client, but nobody
-- using the public anon key can read applications back.
drop policy if exists "Public can submit job application" on job_applications;
create policy "Public can submit job application" on job_applications
  for insert with check (true);

drop policy if exists "Authenticated can manage job applications" on job_applications;
create policy "Authenticated can manage job applications" on job_applications
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
