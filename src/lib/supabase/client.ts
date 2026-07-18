/**
 * Supabase browser client — for use in Client Components ('use client').
 *
 * Instantiate a fresh client per component/hook use. Do NOT export a
 * singleton — @supabase/ssr's design assumes per-render clients so that
 * cookies and auth state stay consistent with the server.
 *
 * The SAME Supabase project as the mobile app (identical URL + anon key
 * from your existing env). Shared users, shared sessions, shared tables.
 * When a user signs in on web, their mobile session sees the update
 * (and vice versa) via Supabase's realtime auth broadcast.
 */
'use client';

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
