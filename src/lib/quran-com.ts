/**
 * Quran.com API v4 client for verse text + translations.
 *
 * Public, unauthenticated, ~500ms per surah. Cached with ISR
 * (revalidate = 604800 = 1 week) since Quran text never changes.
 *
 * Translation IDs mirror the mobile app's scholar-vetted defaults:
 *   English: 20 (Saheeh International)
 *
 * Docs: https://api-docs.quran.com
 */

const QC_BASE = 'https://api.quran.com/api/v4';

// Translation IDs — matching the mobile app's mapping.
export const TRANSLATION_ID_EN = 20; // Saheeh International

export interface QuranVerse {
  id: number;
  verse_number: number;
  verse_key: string;      // e.g. "2:255"
  text_uthmani: string;   // Arabic Uthmani script
  translations: Array<{
    id: number;
    resource_id: number;
    text: string;
  }>;
}

export interface QuranChapterInfo {
  short_text: string;
  source: string;
  text: string;
}

/**
 * Fetch all verses of one surah, with the requested translation.
 *
 * Uses `per_page=300` because the largest surah (Al-Baqarah) has 286
 * verses; one page covers every chapter cleanly.
 */
export async function getSurahVerses(
  chapterNumber: number,
  translationId: number = TRANSLATION_ID_EN,
): Promise<QuranVerse[]> {
  const url = new URL(`${QC_BASE}/verses/by_chapter/${chapterNumber}`);
  url.searchParams.set('translations', String(translationId));
  url.searchParams.set('per_page', '300');
  url.searchParams.set('fields', 'text_uthmani,verse_key,verse_number');

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 604800 }, // 1 week
    });
    if (!res.ok) return [];
    const body = await res.json();
    const verses = body?.verses;
    if (!Array.isArray(verses)) return [];
    return verses.map((v: {
      id: number;
      verse_number: number;
      verse_key: string;
      text_uthmani: string;
      translations?: Array<{ id: number; resource_id: number; text: string }>;
    }) => ({
      id: v.id,
      verse_number: v.verse_number,
      verse_key: v.verse_key,
      text_uthmani: v.text_uthmani,
      translations: (v.translations || []).map((t) => ({
        ...t,
        text: stripHtmlTags(t.text || ''),
      })),
    }));
  } catch {
    return [];
  }
}

/**
 * Short chapter description from Quran.com's chapter info endpoint.
 * Optional — falls back gracefully if the API is slow.
 */
export async function getChapterInfo(
  chapterNumber: number,
): Promise<QuranChapterInfo | null> {
  try {
    const res = await fetch(
      `${QC_BASE}/chapters/${chapterNumber}/info`,
      { next: { revalidate: 604800 } },
    );
    if (!res.ok) return null;
    const body = await res.json();
    return body?.chapter_info || null;
  } catch {
    return null;
  }
}

/**
 * Quran.com's translation text often includes `<sup foot_note=...>`
 * markers for footnotes. Strip them for clean display; we don't
 * surface the footnotes on the web reader (they'd need per-footnote
 * fetches — future enhancement).
 */
function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
