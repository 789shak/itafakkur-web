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
  const next = searchParams.get('next') ?? '/account';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Something went wrong — send them back to login with an error flag.
  return NextResponse.redirect(`${origin}/login?error=oauth_failed`);
}
