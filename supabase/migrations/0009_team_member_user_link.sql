-- Links each team_members row to the Supabase Auth account that person logs
-- into /admin with, so blog post authorship can be auto-detected from the
-- logged-in session instead of picked manually from a dropdown.

alter table team_members
  add column if not exists user_id uuid unique references auth.users(id) on delete set null;

update team_members set user_id = '137ce04c-ad84-48ee-82cc-45d956de015e'
where name = 'Abhishek Kumar Prasad' and user_id is null;

update team_members set user_id = '7890f2c3-afdf-439d-918f-979fc87ae905'
where name = 'Prince Das' and user_id is null;
