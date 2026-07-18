/**
 * /quran — chapter list for all 114 surahs.
 *
 * Server component, statically generated at build time. The actual
 * per-chapter reading view (virtual book with page-flip) lands in W4
 * as /quran/[surah]/page.tsx. This page is just the browsable index.
 *
 * SEO: 114 links to per-chapter pages, plus this index. Each link
 * uses the transliteration + English meaning in the anchor text so
 * queries like "Al-Fatihah meaning" or "surah Yaseen" land here.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { QURAN_CHAPTERS } from '@/data/quran-chapters';

export const metadata: Metadata = {
  title: 'Read the Qur\'an — All 114 Surahs',
  description:
    'Browse all 114 surahs of the Holy Qur\'an with translations. Al-Fatihah, Al-Baqarah, Yaseen, Al-Kahf, Ar-Rahman, and every chapter — read online for free.',
  openGraph: {
    title: 'The Holy Qur\'an — 114 Surahs',
    description: 'Read the Qur\'an online with translations in your language.',
  },
};

const REVELATION_FILTERS = ['All', 'Meccan', 'Medinan'] as const;

export default function QuranIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="text-center mb-10">
        <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight mb-3">
          The Holy Qur&rsquo;an
        </h1>
        <p className="text-muted text-base max-w-xl mx-auto">
          All 114 surahs, with translations in your language. Tap any
          chapter to read.
        </p>
      </header>

      {/* Summary strip */}
      <div className="rounded-2xl border border-border bg-white/70 p-6 mb-10 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="font-serif text-brown text-3xl font-medium">114</p>
          <p className="text-xs text-muted uppercase tracking-wider">Surahs</p>
        </div>
        <div>
          <p className="font-serif text-brown text-3xl font-medium">6,236</p>
          <p className="text-xs text-muted uppercase tracking-wider">Verses</p>
        </div>
        <div>
          <p className="font-serif text-brown text-3xl font-medium">30</p>
          <p className="text-xs text-muted uppercase tracking-wider">Juz</p>
        </div>
      </div>

      {/* Chapter grid */}
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {QURAN_CHAPTERS.map((c) => (
          <li key={c.number}>
            <Link
              href={`/quran/${c.number}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/80 border border-border hover:border-gold/40 hover:shadow-[0_2px_16px_rgba(58,40,18,0.06)] transition-all"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-brown font-serif font-medium">
                {c.number}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <p className="font-serif text-brown text-lg leading-tight truncate">
                    {c.name_translit}
                  </p>
                  <p className="text-muted text-xs">{c.verses} verses</p>
                </div>
                <p className="text-muted text-xs truncate">
                  {c.name_english} · {c.revelation}
                </p>
              </div>
              <span
                className="font-serif text-brown text-xl leading-none pl-2"
                dir="rtl"
                aria-hidden="true"
              >
                {c.name_arabic}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-center text-xs text-muted">
        Full reading view with translations, audio, and reflections
        launching soon. For the mobile experience —{' '}
        <Link href="/download" className="underline hover:text-brown">
          get the app
        </Link>
        .
      </p>
    </div>
  );
}
