/**
 * /logout — POST route that clears the Supabase session.
 *
 * Called from the header/account page as a `<form action="/logout" method="post">`.
 * Redirects to home on success.
 */
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/', request.url), { status: 303 });
}
