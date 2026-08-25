import { createClient } from "@supabase/supabase-js";

// The anon key is not a secret — it's the public, client-embeddable key
// Supabase's own docs say to ship in browser bundles; every real access
// rule is enforced server-side by Postgres Row Level Security (see
// viv-main-gui-exp/docs/supabase/0001_profiles.sql).
const SUPABASE_URL = "https://qlanrjfdgqeqxnznebnq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYW5yamZkZ3FlcXhuem5lYm5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NDI0MjgsImV4cCI6MjEwMzIxODQyOH0.tpUKsSwnuL2TXqoiou-14BqEfcKCQ5-wyxEl2NY_xFc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
