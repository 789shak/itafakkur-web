/**
 * Global 404 page.
 *
 * Rendered when notFound() is called from any route (e.g. invalid
 * surah number, non-existent city slug, unknown name).
 */
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <span aria-hidden="true" className="w-2 h-2 rounded-full bg-gold" />
        <span className="text-[11px] font-semibold text-muted uppercase tracking-[0.18em]">
          404
        </span>
      </div>
      <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight mb-3">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="text-muted text-base leading-relaxed mb-10">
        The link may have moved, or you may have typed something that
        doesn&rsquo;t match one of our pages.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center px-6 h-11 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
        >
          Back to home
        </Link>
        <Link
          href="/quran"
          className="inline-flex items-center px-6 h-11 rounded-full border border-border text-brown text-sm font-medium hover:bg-white transition-colors"
        >
          Read the Qur&rsquo;an
        </Link>
      </div>
    </div>
  );
}
