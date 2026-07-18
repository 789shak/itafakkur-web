/**
 * Middleware — refreshes the Supabase auth session on every request.
 *
 * Runs on the Edge runtime before any page/route renders. If the user
 * has a valid session cookie, this call:
 *   1. Validates the JWT
 *   2. Refreshes it if within the refresh window
 *   3. Writes the fresh cookies to the response
 *
 * Without this, Server Component reads of the session would eventually
 * see expired tokens and force re-login. With it, sessions persist
 * seamlessly across long browsing sessions.
 *
 * The matcher excludes static assets to keep middleware overhead off
 * every image/font/favicon request.
 */
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Do not remove this line — the auth token refresh depends
  // on getUser() being called before the response is returned.
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (Next.js build output)
     * - _next/image (image optimization)
     * - favicon.ico
     * - static image files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
