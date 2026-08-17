/**
 * DownloadBand — closing CTA before the footer.
 *
 * Reuses the exact store URLs from /download rather than duplicating
 * a second, possibly-drifting copy of them.
 *
 * The buttons intentionally use bg-brown/text-cream (which now render
 * as light-pill / dark-icon since the 2026-08-17 dark theme flip) —
 * that happens to match Apple's own "white badge on dark background"
 * App Store guidance, so leave this pairing as-is rather than
 * "fixing" it to bg-surface.
 */
const APP_STORE_URL = 'https://apps.apple.com/app/id6766188629';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=net.quranchat.app';

export function DownloadBand() {
  return (
    <section className="py-20 sm:py-24 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-brown text-3xl sm:text-4xl font-medium tracking-tight mb-4">
          Free forever. No catch.
        </h2>
        <p className="text-muted text-base leading-relaxed max-w-md mx-auto mb-10">
          Everything on this page, in your pocket — prayer alarms, offline
          Qur&rsquo;an, Qibla direction, journal, and habits.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 max-w-sm mx-auto">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-brown text-cream text-sm font-medium hover:bg-brown/90 hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
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
            className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-brown text-cream text-sm font-medium hover:bg-brown/90 hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
          >
            <span className="text-xl">▶</span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-wider opacity-70">Get it on</span>
              <span className="text-base font-semibold">Google Play</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
