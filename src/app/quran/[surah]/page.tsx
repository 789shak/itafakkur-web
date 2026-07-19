/**
 * /quran/[surah] — per-chapter reading view.
 *
 * Server component. Fetches Arabic + English (Saheeh International) at
 * build time via ISR (weekly revalidate — Quran text never changes).
 *
 * Layout:
 *   - Chapter header with Arabic title + English name + revelation info
 *   - Bismillah line (except for Surah 9 — At-Tawbah)
 *   - Per-verse block: Arabic on top (larger, serif), English underneath
 *   - Verse number in a gold pill anchor (each is a jump target for
 *     deep-linking: /quran/2#255 = Ayat al-Kursi)
 *   - Prev/next chapter navigation
 *
 * SEO gold — 114 chapter pages, each fully indexable with Arabic +
 * English text. Every verse gets an id so /quran/2#255 lands on the
 * right verse. Total ~7,000 URL fragments Google can index.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { QURAN_CHAPTERS, getChapter } from '@/data/quran-chapters';
import { getSurahVerses } from '@/lib/quran-com';

// ISR — verses are cached for a week (Quran text is fixed forever, we
// just want to rebuild if we ever change the translation ID).
export const revalidate = 604800;

export function generateStaticParams() {
  return QURAN_CHAPTERS.map((c) => ({ surah: String(c.number) }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ surah: string }> },
): Promise<Metadata> {
  const { surah } = await params;
  const c = getChapter(parseInt(surah, 10));
  if (!c) return { title: 'Surah not found' };
  return {
    title: `Surah ${c.name_translit} (${c.name_english})`,
    description: `Read Surah ${c.name_translit} — chapter ${c.number} of the Holy Qur'an. ${c.verses} verses in Arabic with English translation by Saheeh International. Revealed in ${c.revelation === 'Meccan' ? 'Makkah' : 'Madinah'}.`,
    openGraph: {
      title: `Surah ${c.name_translit} — ${c.name_english}`,
      description: `Full Arabic text + English translation of Surah ${c.name_translit}.`,
    },
  };
}

export default async function SurahPage(
  { params }: { params: Promise<{ surah: string }> },
) {
  const { surah } = await params;
  const chapterNum = parseInt(surah, 10);
  const c = getChapter(chapterNum);
  if (!c) notFound();

  const verses = await getSurahVerses(chapterNum);
  // Skip Bismillah for At-Tawbah (chapter 9) per tradition.
  const showBismillah = chapterNum !== 9 && chapterNum !== 1;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-6 text-sm">
        <Link href="/quran" className="text-muted hover:text-brown">
          ← All chapters
        </Link>
      </nav>

      {/* Chapter header */}
      <header className="text-center mb-10 pb-8 border-b border-border">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-4">
          Surah {c.number} of 114 · {c.verses} verses · {c.revelation === 'Meccan' ? 'Revealed in Makkah' : 'Revealed in Madinah'}
        </p>
        <h1
          className="font-serif text-brown text-6xl sm:text-7xl font-medium tracking-tight mb-3"
          dir="rtl"
        >
          {c.name_arabic}
        </h1>
        <p className="font-serif text-brown text-2xl mb-1">{c.name_translit}</p>
        <p className="text-muted">{c.name_english}</p>
      </header>

      {/* Bismillah — shown at the start of every chapter except 1 (already opens with it) and 9 */}
      {showBismillah && (
        <p
          dir="rtl"
          className="text-center font-serif text-brown text-3xl sm:text-4xl mb-10 leading-relaxed"
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
      )}

      {/* Verses */}
      {verses.length === 0 ? (
        <div className="text-center text-muted py-16">
          Verses are being loaded. Please refresh in a moment.
        </div>
      ) : (
        <ol className="space-y-10">
          {verses.map((v) => {
            const ayahNum = v.verse_number;
            const englishText = v.translations[0]?.text || '';
            return (
              <li key={v.id} id={String(ayahNum)} className="scroll-mt-24">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-brown font-serif text-sm mt-1"
                  >
                    {ayahNum}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-serif text-brown text-2xl sm:text-3xl leading-loose mb-4"
                      style={{ fontFamily: 'var(--font-fraunces), serif' }}
                    >
                      {v.text_uthmani}
                    </p>
                    <p className="text-muted text-[15px] leading-relaxed">
                      {englishText}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {/* Prev/Next */}
      <div className="mt-16 pt-8 border-t border-border flex items-center justify-between text-sm">
        {chapterNum > 1 ? (
          <Link href={`/quran/${chapterNum - 1}`} className="text-muted hover:text-brown">
            ← {getChapter(chapterNum - 1)?.name_translit}
          </Link>
        ) : <span />}
        {chapterNum < 114 ? (
          <Link href={`/quran/${chapterNum + 1}`} className="text-muted hover:text-brown">
            {getChapter(chapterNum + 1)?.name_translit} →
          </Link>
        ) : <span />}
      </div>

      {/* App CTA */}
      <div className="mt-10 rounded-2xl bg-gold/10 border border-gold/30 p-6 text-center">
        <p className="text-brown text-sm mb-3">
          Read with audio recitation, per-verse reflections, and translations in your language.
        </p>
        <Link
          href="/download"
          className="inline-flex items-center px-5 h-10 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
        >
          Get the iTafakkur app
        </Link>
      </div>

      {/* JSON-LD structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: `Surah ${c.name_translit} — ${c.name_english}`,
            alternateName: c.name_arabic,
            about: 'The Holy Qur\'an',
            inLanguage: ['ar', 'en'],
            hasPart: {
              '@type': 'CreativeWork',
              name: `Chapter ${c.number}`,
              numberOfPages: c.verses,
            },
          }),
        }}
      />
    </div>
  );
}
