/**
 * /quran/[surah] — per-chapter page.
 *
 * W3 placeholder: shows the chapter's metadata + CTA to open in the
 * mobile app. The full virtual-book reader (react-pageflip, verse-level
 * pages) lands in W4. This stub exists so the /quran index links don't
 * 404 during the build-out.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { QURAN_CHAPTERS, getChapter } from '@/data/quran-chapters';

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
    title: `Surah ${c.name_translit} (${c.name_english}) — Chapter ${c.number}`,
    description: `Read Surah ${c.name_translit} — chapter ${c.number} of the Holy Qur\'an. ${c.verses} verses, revealed in ${c.revelation === 'Meccan' ? 'Makkah' : 'Madinah'}. ${c.name_english}.`,
  };
}

export default async function SurahPage(
  { params }: { params: Promise<{ surah: string }> },
) {
  const { surah } = await params;
  const c = getChapter(parseInt(surah, 10));
  if (!c) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-6 text-sm">
        <Link href="/quran" className="text-muted hover:text-brown">
          ← All chapters
        </Link>
      </nav>

      <header className="text-center mb-10">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-4">
          Surah {c.number} of 114
        </p>
        <h1 className="font-serif text-brown text-5xl sm:text-6xl font-medium tracking-tight mb-3" dir="rtl">
          {c.name_arabic}
        </h1>
        <p className="font-serif text-brown text-2xl mb-1">{c.name_translit}</p>
        <p className="text-muted">{c.name_english}</p>
      </header>

      <div className="rounded-2xl border border-border bg-white/80 p-6 mb-8 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-[11px] text-muted uppercase tracking-wider mb-1">Verses</p>
          <p className="font-serif text-brown text-2xl">{c.verses}</p>
        </div>
        <div>
          <p className="text-[11px] text-muted uppercase tracking-wider mb-1">Revealed in</p>
          <p className="font-serif text-brown text-2xl">
            {c.revelation === 'Meccan' ? 'Makkah' : 'Madinah'}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-gold/10 border border-gold/30 p-8 text-center">
        <p className="font-serif text-brown text-xl mb-2">
          The full reader is on its way.
        </p>
        <p className="text-muted text-sm mb-6 max-w-md mx-auto">
          Read Surah {c.name_translit} with translation, audio recitation,
          and per-verse reflections in the iTafakkur app today. Web reader
          launches with translations and per-verse deep links soon.
        </p>
        <Link
          href="/download"
          className="inline-flex items-center px-6 h-11 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
        >
          Open in iTafakkur app
        </Link>
      </div>

      {/* Prev/Next navigation between chapters */}
      <div className="mt-10 flex items-center justify-between text-sm">
        {c.number > 1 ? (
          <Link
            href={`/quran/${c.number - 1}`}
            className="text-muted hover:text-brown"
          >
            ← {getChapter(c.number - 1)?.name_translit}
          </Link>
        ) : <span />}
        {c.number < 114 ? (
          <Link
            href={`/quran/${c.number + 1}`}
            className="text-muted hover:text-brown"
          >
            {getChapter(c.number + 1)?.name_translit} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
