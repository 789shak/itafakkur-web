/**
 * api.ts — client for the iTafakkur FastAPI backend on Railway.
 *
 * Attaches the current user's Supabase JWT as a Bearer token so the
 * backend's `get_active_user` dependency validates cleanly. Called
 * from Server Components (they pass the session from `createClient()`
 * in @/lib/supabase/server).
 *
 * Backend URL — hardcoded per the reference-project-endpoints memory.
 * If backend host ever moves, change here + Railway simultaneously.
 */
import type { Session } from '@supabase/supabase-js';

const BACKEND_URL = 'https://quranchat-v20-production.up.railway.app/api';

interface FetchOptions extends Omit<RequestInit, 'body'> {
  json?: unknown;
}

/**
 * Authenticated fetch to the FastAPI backend.
 *
 * @param path e.g. '/journal' — no leading `/api`, that's added here
 * @param session Supabase session (or null → unauthenticated request)
 */
export async function apiFetch<T = unknown>(
  path: string,
  session: Session | null,
  options: FetchOptions = {},
): Promise<T | null> {
  const headers = new Headers(options.headers);
  if (session?.access_token) {
    headers.set('Authorization', `Bearer ${session.access_token}`);
  }
  if (options.json !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      ...options,
      headers,
      body: options.json !== undefined ? JSON.stringify(options.json) : options.body,
      // Never cache authenticated requests — data is user-scoped.
      cache: 'no-store',
    });
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.warn(`[api] ${path} → ${res.status}`);
      return null;
    }
    if (res.status === 204) return null;
    return (await res.json()) as T;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`[api] ${path} failed:`, err);
    return null;
  }
}
