/**
 * Aladhan API client — same source the mobile app's backend uses.
 *
 * Public, unauthenticated, no rate limit hit in production use.
 * Called directly from server components (SSR + ISR) so we don't have
 * to expose our own backend to unauthenticated web traffic.
 *
 * Docs: https://aladhan.com/prayer-times-api
 */

const ALADHAN_BASE = 'https://api.aladhan.com/v1';

// Aladhan calculation method IDs. 3 = MWL (Muslim World League) —
// standard global default, matches the mobile app's default.
export const DEFAULT_METHOD = 3;
export const DEFAULT_SCHOOL = 0; // 0 = Shafi'i (default), 1 = Hanafi

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface HijriDate {
  date: string;        // "dd-mm-yyyy"
  day: string;
  month: { number: number; en: string; ar: string };
  year: string;
  weekday: { en: string; ar: string };
}

export interface DateInfo {
  readable: string;    // "DD MMM YYYY"
  hijri: HijriDate;
  gregorian: {
    date: string;
    day: string;
    month: { number: number; en: string };
    year: string;
    weekday: { en: string };
  };
}

/**
 * Prayer timings for a specific date at a specific location.
 *
 * `dateDMY` format: "DD-MM-YYYY" (Aladhan's convention). Defaults to
 * today in UTC — Aladhan converts to the requested location's local
 * time internally.
 */
export async function getPrayerTimes(
  lat: number,
  lon: number,
  options?: {
    dateDMY?: string;
    method?: number;
    school?: number;
    /** Next.js fetch cache options. */
    revalidate?: number;
  },
): Promise<{ timings: PrayerTimings; date: DateInfo } | null> {
  const dateDMY = options?.dateDMY ?? formatDateDMY(new Date());
  const method = options?.method ?? DEFAULT_METHOD;
  const school = options?.school ?? DEFAULT_SCHOOL;
  const revalidate = options?.revalidate ?? 3600; // 1 hour default

  const url = new URL(`${ALADHAN_BASE}/timings/${dateDMY}`);
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('method', String(method));
  url.searchParams.set('school', String(school));

  try {
    const res = await fetch(url.toString(), { next: { revalidate } });
    if (!res.ok) return null;
    const body = await res.json();
    if (body?.code !== 200 || !body?.data) return null;
    return {
      timings: body.data.timings,
      date: body.data.date,
    };
  } catch {
    return null;
  }
}

/**
 * Convert a Gregorian date to a Hijri date + weekday. Cached for 24h
 * since date conversion is deterministic.
 */
export async function gregorianToHijri(
  date: Date = new Date(),
): Promise<HijriDate | null> {
  const dateDMY = formatDateDMY(date);
  const url = `${ALADHAN_BASE}/gToH/${dateDMY}`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const body = await res.json();
    if (body?.code !== 200 || !body?.data) return null;
    return body.data.hijri;
  } catch {
    return null;
  }
}

/**
 * Full Hijri month calendar — returns 29 or 30 entries, each with
 * gregorian + hijri date. Used for the /hijri-calendar page.
 */
export async function getHijriCalendar(
  hijriYear: number,
  hijriMonth: number,
  lat = 21.4225,     // Makkah default — Hijri months are moon-visible-from-here
  lon = 39.8262,
): Promise<Array<{ date: DateInfo; timings: PrayerTimings }> | null> {
  const url = new URL(`${ALADHAN_BASE}/hijriCalendar/${hijriYear}/${hijriMonth}`);
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const body = await res.json();
    if (body?.code !== 200 || !Array.isArray(body?.data)) return null;
    return body.data;
  } catch {
    return null;
  }
}

/** Utility — format Date as "DD-MM-YYYY" per Aladhan convention. */
function formatDateDMY(d: Date): string {
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yy = d.getUTCFullYear();
  return `${dd}-${mm}-${yy}`;
}

/**
 * Format a prayer time "HH:MM" (24h, possibly with " (EEST)" suffix)
 * to a clean display string. Strips timezone abbreviation.
 */
export function cleanTimeString(raw: string): string {
  return raw.split(' ')[0] || raw;
}

/**
 * Convert 24h "HH:MM" to a locale-aware 12h string with AM/PM.
 * Used across all prayer-time renders for consistency.
 */
export function formatTime12h(hhmm24: string): string {
  const clean = cleanTimeString(hhmm24);
  const [hStr, mStr] = clean.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (Number.isNaN(h) || Number.isNaN(m)) return clean;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}
