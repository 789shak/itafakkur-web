/**
 * /habits — read-only habit tracker (streaks, best streaks, check-ins).
 *
 * Same principle as /journal — synced from mobile via the shared
 * Supabase backend. Web is a viewing surface; check-ins happen on
 * mobile for now (background reminders + haptic feedback matter here).
 */
import Link from 'next/link';
import { Flame } from 'lucide-react';
import { requireAuth } from '@/lib/require-auth';
import { apiFetch } from '@/lib/api';

// Auth-gated — habits are per-user. Force dynamic so no shared cache entry
// is ever built, even if the /habits endpoint is called from an edge worker.
export const dynamic = 'force-dynamic';

interface Habit {
  id: string;
  name: string;
  emoji?: string | null;
  streak: number;
  best_streak: number;
  check_ins: string[];
}

export default async function HabitsPage() {
  const session = await requireAuth();
  const habits = (await apiFetch<Habit[]>('/habits', session)) || [];

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-10">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
          Your habits
        </p>
        <h1 className="font-serif text-brown text-4xl font-medium">Consistency</h1>
      </header>

      {habits.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white/80 p-10 text-center">
          <p className="text-muted mb-4">No habits yet.</p>
          <p className="text-brown text-sm mb-6">
            Add habits in the app to track your daily Qur&rsquo;an reading, du&rsquo;a, dhikr,
            or anything else. They&rsquo;ll appear here.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center px-5 h-10 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
          >
            Get the app
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {habits.map((h) => {
            const today = new Date().toISOString().slice(0, 10);
            const checkedToday = h.check_ins?.includes(today);
            return (
              <li
                key={h.id}
                className="rounded-2xl border border-border bg-white/80 p-5 flex items-center gap-4"
              >
                <span className="text-2xl flex-shrink-0">{h.emoji || '•'}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-brown text-lg">{h.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Flame size={12} className="text-gold-dark" />
                      {h.streak} day streak
                    </span>
                    <span>·</span>
                    <span>best {h.best_streak}</span>
                  </div>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    checkedToday
                      ? 'bg-gold/20 text-brown font-semibold'
                      : 'bg-cream text-muted'
                  }`}
                >
                  {checkedToday ? 'Done today ✓' : 'Not yet'}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-10 text-center text-xs text-muted">
        Check in on your habits in the mobile app — daily reminders keep the
        streak alive.
      </p>
    </div>
  );
}
