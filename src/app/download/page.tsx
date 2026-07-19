/**
 * /download — App Store + Google Play install links.
 *
 * Also the target for the "Search Quran" card on the home page (since
 * AI chat is app-only per the spec).
 */
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Get iTafakkur for iPhone & Android',
  description:
    'Download iTafakkur — a free Muslim companion for iPhone and Android. Prayer times, Qur\'an, hadith, dhikr, and more.',
  openGraph: {
    title: 'Download iTafakkur',
    description: 'Free Muslim companion for iPhone and Android.',
  },
};

// Placeholder App Store / Play Store URLs — swap with the real ones
// once v1.4.0 is live in production stores. Both start with the correct
// scheme so link previews look right.
const APP_STORE_URL = 'https://apps.apple.com/app/id6766188629';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=net.quranchat.app';

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <header className="text-center mb-12">
        <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight mb-4">
          Get iTafakkur on your phone
        </h1>
        <p className="text-muted text-base max-w-xl mx-auto leading-relaxed">
          Prayer alarms, Qibla direction, offline Qur&rsquo;an with translations,
          AI-powered Search Qur&rsquo;an, journal, habits — free forever, no ads.
        </p>
      </header>

      <div className="rounded-3xl border border-border bg-white/80 p-8 sm:p-10 mb-10">
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-brown text-cream text-sm font-medium hover:bg-brown/90 transition-colors"
          >
            <span className="text-2xl"></span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-wider opacity-70">Download on the</span>
              <span className="text-base font-semibold">App Store</span>
            </span>
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-brown text-cream text-sm font-medium hover:bg-brown/90 transition-colors"
          >
            <span className="text-xl">▶</span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-wider opacity-70">Get it on</span>
              <span className="text-base font-semibold">Google Play</span>
            </span>
          </a>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {[
          ['🕌', 'Accurate prayer times', 'For your exact location, with adhan reminders.'],
          ['📖', 'Full Qur\'an, offline', 'Read + listen with scholar-vetted translations.'],
          ['🧭', 'Qibla direction', 'Point to Makkah from anywhere — including AR view.'],
          ['💛', 'Free forever', 'No ads. No selling data. Just what helps you draw closer.'],
        ].map(([emoji, title, desc]) => (
          <div key={title} className="rounded-2xl border border-border bg-white/70 p-5">
            <p className="text-2xl mb-2">{emoji}</p>
            <p className="font-serif text-brown text-base font-medium mb-1">{title}</p>
            <p className="text-muted text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted">
        Already have an account?{' '}
        <Link href="/login" className="underline text-brown">
          Sign in on the web
        </Link>
      </p>
    </div>
  );
}
