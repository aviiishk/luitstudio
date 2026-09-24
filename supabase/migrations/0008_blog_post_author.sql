-- Run this once in the Supabase SQL editor for the shared project.
-- Links blog posts to an author from the existing team_members table
-- (byline name + photo), instead of duplicating name/photo data on
-- blog_posts itself. Nullable -- older posts can stay author-less.

alter table blog_posts
  add column if not exists author_id uuid references team_members(id) on delete set null;
