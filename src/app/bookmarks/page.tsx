/**
 * /bookmarks — saved verses from the mobile app.
 *
 * Reads from the backend's /bookmarks endpoint. Each bookmark links
 * to the corresponding verse on /quran/[surah]#[ayah].
 */
import Link from 'next/link';
import { requireAuth } from '@/lib/require-auth';
import { apiFetch } from '@/lib/api';
import { getChapter } from '@/data/quran-chapters';

// Auth-gated — bookmarks are per-user. Force dynamic rendering.
export const dynamic = 'force-dynamic';

interface Bookmark {
  id: string;
  verse_id: string; // "2:255"
  note?: string | null;
  created_at: string;
}

export default async function BookmarksPage() {
  const session = await requireAuth();
  const bookmarks = (await apiFetch<Bookmark[]>('/bookmarks', session)) || [];

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-10">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
          Your bookmarks
        </p>
        <h1 className="font-serif text-brown text-4xl font-medium">Saved verses</h1>
      </header>

      {bookmarks.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white/80 p-10 text-center">
          <p className="text-muted mb-4">No bookmarks yet.</p>
          <p className="text-brown text-sm mb-6">
            Long-press any verse in the mobile Qur&rsquo;an reader and tap
            &ldquo;Bookmark&rdquo;. Saved verses appear here for easy access.
          </p>
          <Link
            href="/quran"
            className="inline-flex items-center px-5 h-10 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
          >
            Browse the Qur&rsquo;an
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {bookmarks.map((b) => {
            const [surah, ayah] = b.verse_id.split(':');
            const chap = getChapter(parseInt(surah, 10));
            return (
              <li key={b.id}>
                <Link
                  href={`/quran/${surah}#${ayah}`}
                  className="block rounded-2xl border border-border bg-white/80 p-5 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <p className="font-serif text-brown text-lg">
                      Surah {chap?.name_translit || surah}, verse {ayah}
                    </p>
                    <span className="text-xs text-muted">
                      {new Date(b.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted text-xs">
                    {chap?.name_english || ''}
                  </p>
                  {b.note && (
                    <p className="mt-3 text-brown text-sm">{b.note}</p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
