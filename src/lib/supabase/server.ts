/**
 * Supabase server client — for use in Server Components, Route Handlers,
 * and Server Actions.
 *
 * Reads + writes session cookies through the Next.js cookies() API so
 * SSR pages render with the authenticated user's state on the first
 * response (no client-side flash of unauthenticated content).
 *
 * The cookies().set() call is wrapped in try/catch because it only
 * works in Server Actions and Route Handlers — in Server Components
 * (read-only render context), Next.js throws. That's OK: middleware.ts
 * refreshes the session cookie on every request, so RSC just needs to
 * READ the cookie, not write it.
 */
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — expected, safe to ignore.
            // Middleware handles session refresh separately.
          }
        },
      },
    },
  );
}
