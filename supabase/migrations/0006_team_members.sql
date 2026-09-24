-- Run this once in the Supabase SQL editor for the shared project.
-- Backs the About page's Team section (/about#people), replacing the
-- two hardcoded founder cards with a manageable roster editable from
-- the admin dashboard.

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  image_url text,
  is_founder boolean not null default false,
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table team_members enable row level security;

drop policy if exists "Public can view published team members" on team_members;
create policy "Public can view published team members" on team_members
  for select using (status = 'published');

drop policy if exists "Authenticated can manage team members" on team_members;
create policy "Authenticated can manage team members" on team_members
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Seed the two co-founders so the section isn't empty on first deploy.
-- No image_url yet -- the public component falls back to an initials
-- card until a real portrait is uploaded from /admin/team. Guarded by
-- name instead of a real unique constraint, since re-running this
-- migration should never duplicate the seed rows.
insert into team_members (name, role, bio, is_founder, display_order, status)
select 'Abhishek Kumar Prasad', 'Co-Founder', 'Full-stack development and AI automation.', true, 1, 'published'
where not exists (select 1 from team_members where name = 'Abhishek Kumar Prasad');

insert into team_members (name, role, bio, is_founder, display_order, status)
select 'Prince Das', 'Co-Founder', 'Frontend craft, marketing, and social.', true, 2, 'published'
where not exists (select 1 from team_members where name = 'Prince Das');
