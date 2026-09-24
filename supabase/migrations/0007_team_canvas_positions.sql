-- Run this once in the Supabase SQL editor for the shared project.
-- Adds free-form 2D canvas positions to team_members, so each member can
-- be placed anywhere relative to the Luit Studio root instead of being
-- auto-arranged into fixed tiers. Additive and idempotent.

alter table team_members add column if not exists canvas_x double precision not null default 0;
alter table team_members add column if not exists canvas_y double precision not null default 0;

-- Give already-existing rows a scattered starting layout instead of
-- leaving them all stacked at (0, 0) on top of the root until someone
-- opens the new layout editor. Only touches rows still at the (0, 0)
-- default, so re-running this after positions are customized is a no-op.
with ordered as (
  select id, row_number() over (order by display_order, created_at) - 1 as idx,
    count(*) over () as total
  from team_members
  where canvas_x = 0 and canvas_y = 0
)
update team_members t
set
  canvas_x = case when ordered.total <= 1 then 0
    else -450 + (900.0 / (ordered.total - 1)) * ordered.idx end,
  canvas_y = case
    when ordered.idx = 0 or ordered.idx = ordered.total - 1 then -60
    when ordered.idx = floor((ordered.total - 1) / 2.0) then 20
    else 140
  end
from ordered
where t.id = ordered.id;
