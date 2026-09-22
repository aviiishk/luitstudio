-- Run this once in the Supabase SQL editor for the shared project.
-- Backs the public contact form at /contact, which previously had no
-- backend at all (every submission was silently dropped).

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  interest text not null,
  budget text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;

-- Anyone (including the anonymous/public client) can submit the form,
-- but nobody using the public anon key can read submissions back.
drop policy if exists "Public can submit contact form" on contact_submissions;
create policy "Public can submit contact form" on contact_submissions
  for insert with check (true);

drop policy if exists "Authenticated can view contact submissions" on contact_submissions;
create policy "Authenticated can view contact submissions" on contact_submissions
  for select using (auth.role() = 'authenticated');

drop policy if exists "Authenticated can manage contact submissions" on contact_submissions;
create policy "Authenticated can manage contact submissions" on contact_submissions
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
