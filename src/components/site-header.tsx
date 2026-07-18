/**
 * Site header — sitewide navigation.
 *
 * v1 (Week 1) is a minimal shell: wordmark left, primary nav center-right,
 * account CTA right. Real nav routing lands as pages come online in
 * Weeks 3-6. For now this proves the layout skeleton works end-to-end.
 *
 * Design principles carried across the site:
 *   - Wordmark in Fraunces serif at 22px, gold accent dot as brand mark
 *   - Nav links in Geist sans, 14px, low-contrast when inactive
 *   - CTA button in gold gradient, matches app paywall
 *   - Sticky on scroll with subtle backdrop blur on cream background
 */
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="iTafakkur home"
        >
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-gold transition-transform group-hover:scale-125"
          />
          <span className="text-[22px] font-medium text-brown font-serif tracking-tight">
            iTafakkur
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[14px] text-muted">
          <Link href="/quran" className="hover:text-brown transition-colors">
            Qur&apos;an
          </Link>
          <Link href="/prayer-times" className="hover:text-brown transition-colors">
            Prayer Times
          </Link>
          <Link href="/hijri-calendar" className="hover:text-brown transition-colors">
            Hijri Calendar
          </Link>
          <Link href="/99-names" className="hover:text-brown transition-colors">
            99 Names
          </Link>
          <Link href="/daily" className="hover:text-brown transition-colors">
            Daily
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-[14px] text-muted hover:text-brown transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/download"
            className="inline-flex items-center px-4 h-9 rounded-full bg-gold text-brown text-[13px] font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
          >
            Get the app
          </Link>
        </div>
      </div>
    </header>
  );
}
