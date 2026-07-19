/**
 * require-auth.ts — server-side auth guard.
 *
 * Call at the top of a Server Component to redirect unauthenticated
 * visitors to /login. Returns the session so the caller can use it for
 * subsequent API calls (via apiFetch).
 *
 * Usage:
 *   export default async function JournalPage() {
 *     const session = await requireAuth();
 *     const entries = await apiFetch('/journal', session);
 *     ...
 *   }
 */
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';

export async function requireAuth() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    redirect('/login');
  }
  return session;
}

/**
 * Non-redirecting variant — returns session or null. Useful for pages
 * that render differently for logged-in vs anonymous users (e.g., home).
 */
export async function getSession() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
