/**
 * /dhikr — daily dhikr tracker view.
 *
 * Read-only: shows today's count and lifetime. Counting happens in
 * the mobile app (haptic feedback + volume-button counting are
 * platform-native features that don't translate to web).
 */
import Link from 'next/link';
import { requireAuth } from '@/lib/require-auth';
import { apiFetch } from '@/lib/api';

interface DhikrToday {
  today: number;
  lifetime: number;
}

export default async function DhikrPage() {
  const session = await requireAuth();
  const stats = (await apiFetch<DhikrToday>('/dhikr/today', session)) || {
    today: 0,
    lifetime: 0,
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <header className="mb-10 text-center">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
          Your dhikr
        </p>
        <h1 className="font-serif text-brown text-4xl font-medium">Remembrance</h1>
      </header>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-2xl border border-border bg-white/80 p-8 text-center">
          <p className="text-[11px] text-muted uppercase tracking-wider mb-2">Today</p>
          <p className="font-serif text-brown text-5xl font-medium">{stats.today}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white/80 p-8 text-center">
          <p className="text-[11px] text-muted uppercase tracking-wider mb-2">Lifetime</p>
          <p className="font-serif text-brown text-5xl font-medium">{stats.lifetime.toLocaleString()}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-gold/10 border border-gold/30 p-6 text-center">
        <p className="text-brown text-sm mb-3">
          Count your dhikr with haptic feedback and volume-button support in the app.
        </p>
        <Link
          href="/download"
          className="inline-flex items-center px-5 h-10 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
        >
          Get iTafakkur
        </Link>
      </div>

      <p className="mt-8 text-center text-xs text-muted italic max-w-md mx-auto">
        &ldquo;So remember Me; I will remember you.&rdquo; — Qur&rsquo;an 2:152
      </p>
    </div>
  );
}
