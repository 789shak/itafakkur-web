/**
 * /account — profile + subscription summary + sign-out.
 *
 * Reads the current user from the Supabase session (server-side) and
 * their Plus status from the backend's /user/profile endpoint. Shows
 * a link to open the app for Plus purchase (web is app-preview-only
 * for subscription per our locked spec).
 */
import Link from 'next/link';
import { requireAuth } from '@/lib/require-auth';
import { apiFetch } from '@/lib/api';

// Auth-gated — never cache across users. Explicit force-dynamic guards
// against any accidental static/ISR promotion by Next.js's inference.
export const dynamic = 'force-dynamic';

interface BackendProfile {
  name?: string | null;
  email?: string | null;
  is_premium?: boolean | null;
  language?: string | null;
}

export default async function AccountPage() {
  const session = await requireAuth();
  const profile = await apiFetch<BackendProfile>('/user/profile', session);

  const displayName = profile?.name || session.user.user_metadata?.name || 'Friend';
  const isPlus = Boolean(profile?.is_premium);
  const email = session.user.email;

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <header className="mb-10">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
          Your account
        </p>
        <h1 className="font-serif text-brown text-4xl font-medium">
          As-salaamu alaykum, {displayName}.
        </h1>
      </header>

      <section className="rounded-2xl border border-border bg-white/80 p-6 mb-6">
        <h2 className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-4">Profile</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Email</dt>
            <dd className="text-brown">{email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Name</dt>
            <dd className="text-brown">{displayName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Subscription</dt>
            <dd className={isPlus ? 'text-brown font-semibold' : 'text-muted'}>
              {isPlus ? 'iTafakkur Plus ✓' : 'Free'}
            </dd>
          </div>
        </dl>
        {!isPlus && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-brown text-sm mb-3">
              Get unlimited AI chat, offline audio, and premium features.
            </p>
            <Link
              href="/download"
              className="inline-flex items-center px-4 h-9 rounded-full bg-gold text-brown text-xs font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
            >
              Upgrade in the app
            </Link>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-white/80 p-6 mb-6">
        <h2 className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-4">Your data</h2>
        <ul className="space-y-2 text-sm">
          <li><Link href="/journal" className="text-brown hover:text-gold-dark">Journal →</Link></li>
          <li><Link href="/habits" className="text-brown hover:text-gold-dark">Habits →</Link></li>
          <li><Link href="/bookmarks" className="text-brown hover:text-gold-dark">Bookmarks →</Link></li>
          <li><Link href="/dhikr" className="text-brown hover:text-gold-dark">Dhikr →</Link></li>
        </ul>
      </section>

      <form action="/logout" method="post">
        <button
          type="submit"
          className="text-sm text-muted hover:text-brown underline"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
