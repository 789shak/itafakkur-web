/**
 * /daily — verse, hadith, dua of the day.
 *
 * Deterministic rotation based on day-of-year. All 3 items change
 * daily at midnight UTC. Content is hand-curated (15 items per
 * category, growing pool).
 *
 * Server-rendered with revalidate=3600 (1 hour) so any given hour of
 * the day serves the same content globally, and rotates at UTC
 * midnight naturally.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  DAILY_VERSES, DAILY_HADITH, DAILY_DUAS, todayIndex,
} from '@/data/daily-pool';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Today\'s Verse, Hadith, and Dua',
  description:
    'A verse from the Qur\'an, a hadith from Sahih Bukhari or Muslim, and an authentic dua — refreshed daily.',
  openGraph: {
    title: 'Today on iTafakkur',
    description: 'A verse. A hadith. A dua. Refreshed every day.',
  },
};

export default function DailyPage() {
  const verse = DAILY_VERSES[todayIndex(DAILY_VERSES.length)];
  const hadith = DAILY_HADITH[todayIndex(DAILY_HADITH.length)];
  const dua = DAILY_DUAS[todayIndex(DAILY_DUAS.length)];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="text-center mb-12">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-4">
          Today on iTafakkur
        </p>
        <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight">
          A verse. A hadith. A dua.
        </h1>
      </header>

      {/* Verse */}
      <section className="rounded-3xl border border-border bg-white/80 p-8 sm:p-10 mb-8">
        <p className="text-[11px] font-semibold text-gold-dark uppercase tracking-[0.2em] mb-6">
          Verse of the Day
        </p>
        <p
          dir="rtl"
          className="font-serif text-brown text-3xl sm:text-4xl leading-loose mb-6"
        >
          {verse.arabic}
        </p>
        <p className="text-brown text-lg leading-relaxed mb-4">
          &ldquo;{verse.english}&rdquo;
        </p>
        <p className="text-muted text-sm">— Qur&rsquo;an, {verse.reference}</p>
      </section>

      {/* Hadith */}
      <section className="rounded-3xl border border-border bg-white/80 p-8 sm:p-10 mb-8">
        <p className="text-[11px] font-semibold text-gold-dark uppercase tracking-[0.2em] mb-6">
          Hadith of the Day
        </p>
        <p
          dir="rtl"
          className="font-serif text-brown text-2xl sm:text-3xl leading-loose mb-6"
        >
          {hadith.arabic}
        </p>
        <p className="text-brown text-lg leading-relaxed mb-4">
          &ldquo;{hadith.english}&rdquo;
        </p>
        <p className="text-muted text-sm">
          Narrated by {hadith.narrator} — {hadith.source}
        </p>
      </section>

      {/* Dua */}
      <section className="rounded-3xl border border-border bg-white/80 p-8 sm:p-10 mb-10">
        <p className="text-[11px] font-semibold text-gold-dark uppercase tracking-[0.2em] mb-6">
          Dua of the Day
        </p>
        <p
          dir="rtl"
          className="font-serif text-brown text-2xl sm:text-3xl leading-loose mb-4"
        >
          {dua.arabic}
        </p>
        <p className="text-muted text-sm italic mb-4">{dua.transliteration}</p>
        <p className="text-brown text-lg leading-relaxed mb-4">
          &ldquo;{dua.english}&rdquo;
        </p>
        <p className="text-muted text-sm">— {dua.source}</p>
      </section>

      <div className="rounded-2xl bg-gold/10 border border-gold/30 p-6 text-center">
        <p className="text-brown text-sm mb-3">
          Get today&rsquo;s reflection delivered to your notifications each morning.
        </p>
        <Link
          href="/download"
          className="inline-flex items-center px-5 h-10 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
        >
          Get iTafakkur
        </Link>
      </div>
    </div>
  );
}
