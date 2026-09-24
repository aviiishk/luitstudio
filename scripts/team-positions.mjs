#!/usr/bin/env node
// Small maintenance CLI for the team canvas layout (canvas_x/canvas_y on
// team_members). Uses the Supabase service role key, which bypasses RLS,
// so it can read and write directly without a logged-in admin session.
// Never import this key or this script into the Next.js app itself.
//
// Usage:
//   node scripts/team-positions.mjs list
//   node scripts/team-positions.mjs set '[{"name":"Abhishek Kumar Prasad","x":-420,"y":240}]'
//   node scripts/team-positions.mjs set '[{"id":"<uuid>","x":0,"y":500}]'

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  const env = { ...process.env };
  try {
    const content = readFileSync(new URL("../.env", import.meta.url), "utf8");
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^([A-Z_]+)=(.*)$/);
      if (match && !env[match[1]]) env[match[1]] = match[2];
    }
  } catch {
    // .env not present -- rely on already-exported process.env vars.
  }
  return env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const command = process.argv[2];

if (command === "list") {
  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, role, is_founder, canvas_x, canvas_y, status")
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  console.table(data);
  process.exit(0);
}

if (command === "set") {
  const raw = process.argv[3];
  if (!raw) {
    console.error("Usage: node scripts/team-positions.mjs set '<json array>'");
    process.exit(1);
  }

  let entries;
  try {
    entries = JSON.parse(raw);
  } catch {
    console.error("Could not parse the JSON argument.");
    process.exit(1);
  }

  for (const entry of entries) {
    const match = entry.id
      ? { column: "id", value: entry.id }
      : { column: "name", value: entry.name };

    if (!match.value || typeof entry.x !== "number" || typeof entry.y !== "number") {
      console.error(`Skipping invalid entry: ${JSON.stringify(entry)}`);
      continue;
    }

    const { error } = await supabase
      .from("team_members")
      .update({ canvas_x: entry.x, canvas_y: entry.y })
      .eq(match.column, match.value);

    if (error) {
      console.error(`Failed to update ${match.value}: ${error.message}`);
    } else {
      console.log(`Updated ${match.value} -> (${entry.x}, ${entry.y})`);
    }
  }

  process.exit(0);
}

console.error("Unknown command. Use 'list' or 'set'.");
process.exit(1);
