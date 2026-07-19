/**
 * /auth/callback — OAuth redirect target.
 *
 * Supabase sends the user here after they complete a provider flow
 * (Apple, Google, etc.). This route exchanges the one-time `code`
 * query param for a full session, sets the cookies, then redirects
 * to the intended destination (default: /account).
 */
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const rawNext = searchParams.get('next') ?? '/account';

  // Sanitize `next` — must be a relative path starting with a single
  // `/`. Rejects absolute URLs (open-redirect vector) and protocol-
  // relative URLs (//evil.com). Falls back to /account on anything odd.
  const next =
    typeof rawNext === 'string' &&
    rawNext.startsWith('/') &&
    !rawNext.startsWith('//')
      ? rawNext
      : '/account';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Fire welcome email trigger — idempotent server-side via
      // profiles.welcomed_at guard. Awaited so Edge runtime doesn't kill
      // the fetch when the response is sent; wrapped in try/catch so
      // failures never block the redirect.
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          const res = await fetch(
            'https://quranchat-v20-production.up.railway.app/api/user/send-welcome-email',
            {
              method: 'POST',
              headers: { Authorization: `Bearer ${session.access_token}` },
            },
          );
          // Log the result so we can debug from Vercel logs
          // eslint-disable-next-line no-console
          console.log('[welcome-email]', res.status, await res.text().catch(() => ''));
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[welcome-email] fetch failed:', err);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Something went wrong — send them back to login with an error flag.
  return NextResponse.redirect(`${origin}/login?error=oauth_failed`);
}
