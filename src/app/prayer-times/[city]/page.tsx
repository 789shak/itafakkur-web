/**
 * /prayer-times/[city] — server-rendered per-city prayer times page.
 *
 * SEO strategy: 60 city pages generated at build time, each with unique
 * metadata (title, description, JSON-LD structured data). Google indexes
 * queries like "prayer times riyadh" → user lands here → sees today's
 * times + "get the app" CTA.
 *
 * ISR: revalidate every hour. Prayer times change daily; hourly cache
 * is enough freshness for a landing page while keeping the Aladhan API
 * quota comfortable.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CITIES, getCityBySlug } from '@/data/cities';
import { formatTime12h, getPrayerTimes } from '@/lib/aladhan';

export const revalidate = 3600; // 1 hour

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ city: string }> },
): Promise<Metadata> {
  const { city } = await params;
  const c = getCityBySlug(city);
  if (!c) return { title: 'Prayer times' };
  return {
    title: `Prayer Times in ${c.name}`,
    description: `Accurate Fajr, Dhuhr, Asr, Maghrib, and Isha times for ${c.name}, ${c.country}. Updated daily.`,
    openGraph: {
      title: `Prayer Times in ${c.name}`,
      description: `Today's salah times for ${c.name}, ${c.country}.`,
    },
  };
}

export default async function CityPrayerTimesPage(
  { params }: { params: Promise<{ city: string }> },
) {
  const { city } = await params;
  const c = getCityBySlug(city);
  if (!c) notFound();

  const data = await getPrayerTimes(c.lat, c.lon, { revalidate: 3600 });

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-6 text-sm">
        <Link href="/prayer-times" className="text-muted hover:text-brown">
          ← All cities
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight mb-2">
          Prayer Times in {c.name}
        </h1>
        <p className="text-muted text-base">
          {c.country} · {data?.date?.readable || 'Today'}
          {data?.date?.hijri && (
            <>
              {' · '}
              <span>
                {data.date.hijri.day} {data.date.hijri.month.en} {data.date.hijri.year} AH
              </span>
            </>
          )}
        </p>
      </header>

      {data ? (
        <div className="rounded-2xl border border-border bg-white/80 p-8 mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((name) => (
              <div key={name} className="text-center">
                <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
                  {name}
                </p>
                <p className="font-serif text-2xl text-brown">
                  {formatTime12h(data.timings[name])}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-[11px] text-muted uppercase tracking-wider mb-1">Sunrise</p>
              <p className="text-brown font-medium">{formatTime12h(data.timings.Sunrise)}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted uppercase tracking-wider mb-1">Sunset</p>
              <p className="text-brown font-medium">{formatTime12h(data.timings.Sunset)}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted uppercase tracking-wider mb-1">Midnight</p>
              <p className="text-brown font-medium">{formatTime12h(data.timings.Midnight)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-white/80 p-8 mb-10 text-center text-muted">
          Prayer times temporarily unavailable. Please refresh.
        </div>
      )}

      <div className="rounded-2xl bg-gold/10 border border-gold/30 p-6 text-center">
        <p className="text-brown text-sm mb-3">
          Get accurate prayer alarms + Qibla direction for {c.name} on your phone.
        </p>
        <Link
          href="/download"
          className="inline-flex items-center px-5 h-10 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
        >
          Get iTafakkur for iPhone & Android
        </Link>
      </div>

      {/* JSON-LD for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `Prayer Times in ${c.name}`,
            description: `Fajr, Dhuhr, Asr, Maghrib, Isha times for ${c.name}, ${c.country}.`,
            about: {
              '@type': 'Place',
              name: c.name,
              geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lon },
            },
          }),
        }}
      />
    </div>
  );
}
