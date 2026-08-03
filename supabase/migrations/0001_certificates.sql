-- Run this once in the Supabase SQL editor for the shared project
-- (the same one backing intern_applications and blog_posts).

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  certificate_number text unique not null,
  intern_application_id uuid references intern_applications(id) on delete set null,
  student_name text not null,
  program text not null,
  start_date date,
  end_date date,
  issue_date date not null default current_date,
  status text not null default 'valid' check (status in ('valid', 'revoked')),
  certificate_file_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table certificates enable row level security;

drop policy if exists "Public can view certificates" on certificates;
create policy "Public can view certificates" on certificates
  for select using (true);

drop policy if exists "Authenticated can manage certificates" on certificates;
create policy "Authenticated can manage certificates" on certificates
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
