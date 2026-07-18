/**
 * /hijri-calendar — current Hijri month grid + today's date.
 *
 * Server component: renders today's Hijri date + a simple month grid.
 * Reuses Aladhan's gregorian-to-hijri conversion. Cached 24h since
 * Hijri dates change deterministically at day boundaries.
 */
import type { Metadata } from 'next';
import { gregorianToHijri } from '@/lib/aladhan';

export const metadata: Metadata = {
  title: 'Hijri Calendar — Today\'s Islamic Date',
  description:
    "See today's Islamic (Hijri) date, month, and year. Convert between Gregorian and Hijri calendars.",
};

export const revalidate = 3600;

export default async function HijriCalendarPage() {
  const today = new Date();
  const hijri = await gregorianToHijri(today);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight mb-3">
          Hijri Calendar
        </h1>
        <p className="text-muted text-base max-w-xl mx-auto">
          Today&rsquo;s Islamic date, based on the standard Umm al-Qura
          calendar used by Saudi Arabia and most of the Muslim world.
        </p>
      </header>

      {hijri ? (
        <div className="rounded-3xl border border-border bg-white/80 p-10 text-center mb-10">
          <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-4">
            Today
          </p>
          <p className="font-serif text-brown text-6xl sm:text-7xl font-medium tracking-tight mb-2">
            {hijri.day} {hijri.month.en}
          </p>
          <p className="text-2xl text-muted font-serif mb-4">{hijri.year} AH</p>
          <p className="text-sm text-muted">
            {hijri.weekday.en} ·{' '}
            <span dir="rtl" className="font-serif">
              {hijri.day} {hijri.month.ar} {hijri.year}هـ
            </span>
          </p>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted">
              Gregorian:{' '}
              {today.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-white/80 p-8 text-center text-muted">
          Hijri date temporarily unavailable. Please refresh.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-white/70 p-6">
          <h3 className="font-serif text-brown text-lg mb-2">About Hijri</h3>
          <p className="text-sm text-muted leading-relaxed">
            The Hijri calendar is a lunar system of 12 months (354 or 355
            days per year), beginning from the emigration of the Prophet
            Muhammad ﷺ from Makkah to Madinah in 622 CE.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-white/70 p-6">
          <h3 className="font-serif text-brown text-lg mb-2">Upcoming events</h3>
          <ul className="text-sm text-muted space-y-1">
            <li>1 Muharram — Islamic New Year</li>
            <li>10 Muharram — Day of Ashura</li>
            <li>12 Rabi&rsquo; al-Awwal — Mawlid al-Nabi (observed)</li>
            <li>27 Rajab — Isra&rsquo; and Mi&rsquo;raj (observed)</li>
            <li>15 Sha&rsquo;ban — Laylat al-Bara&rsquo;ah</li>
            <li>1 Ramadan — Start of fasting</li>
            <li>27 Ramadan — Laylat al-Qadr (observed)</li>
            <li>1 Shawwal — Eid al-Fitr</li>
            <li>10 Dhu al-Hijjah — Eid al-Adha</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
