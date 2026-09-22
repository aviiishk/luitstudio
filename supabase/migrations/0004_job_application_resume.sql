-- Run this once in the Supabase SQL editor for the shared project.
-- Adds a dedicated resume file column (Cloudinary URL) to job_applications,
-- separate from link_url (which is now just the portfolio link). Safe to
-- run whether or not 0003_job_openings.sql has already been applied.

alter table job_applications
  add column if not exists resume_url text;
