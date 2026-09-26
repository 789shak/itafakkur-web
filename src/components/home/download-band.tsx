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
          {/* Bug fix (2026-09-21 audit): was a bare  glyph (U+F8FF, Apple's
              Private Use Area codepoint) — only renders on Apple's San
              Francisco font, so every other OS/browser showed an empty
              button. Same fix as /download/page.tsx: inline SVG instead. */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-brown text-cream text-sm font-medium hover:bg-brown/90 hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.632-3.635c.842-1.012 1.41-2.427 1.253-3.83-1.207.052-2.662.805-3.532 1.817-.78.896-1.454 2.338-1.271 3.714 1.338.104 2.708-.688 3.55-1.701" />
            </svg>
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
