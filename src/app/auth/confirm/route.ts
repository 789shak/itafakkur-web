/**
 * /auth/confirm — email verification handler for Supabase's newer
 * SSR flow.
 *
 * When a user signs up with email + password (or requests password
 * reset, email change, etc.), Supabase sends them an email whose link
 * points here with a `token_hash` and `type` query param. We verify
 * the token via `verifyOtp`, which sets the session cookies, then fire
 * the welcome-email trigger (idempotent server-side), then redirect.
 *
 * This route co-exists with `/auth/callback` — that one handles the
 * PKCE `?code=` flow used by OAuth providers + magic link. Both flows
 * end up with the user authenticated and the welcome email fired.
 */
import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const rawNext = searchParams.get('next') ?? '/account';

  // Same open-redirect sanitization as /auth/callback.
  const next =
    typeof rawNext === 'string' &&
    rawNext.startsWith('/') &&
    !rawNext.startsWith('//')
      ? rawNext
      : '/account';

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      // Fire welcome email trigger — awaited so Edge runtime doesn't
      // kill the fetch when the response is sent.
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
          // eslint-disable-next-line no-console
          console.log('[welcome-email/confirm]', res.status, await res.text().catch(() => ''));
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[welcome-email/confirm] fetch failed:', err);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
    // eslint-disable-next-line no-console
    console.warn('[auth/confirm] verifyOtp error:', error.message);
  }

  return NextResponse.redirect(`${origin}/login?error=verify_failed`);
}
