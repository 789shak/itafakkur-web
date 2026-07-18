/**
 * Site footer — minimal, calm, trust-signal-forward.
 *
 * Includes: brand line, essential nav, support contact, legal links,
 * and copyright. Keep it under 4 columns and no more than 3-4 items
 * per column. Muslim companion apps live and die on trust — the
 * footer's job is to signal "we're a real, contactable organization,"
 * not to be a mega-nav.
 */
import Link from 'next/link';

const SUPPORT_EMAIL = 'support.itafakkur@gmail.com';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-gold"
            />
            <span className="text-[18px] font-medium text-brown font-serif">
              iTafakkur
            </span>
          </div>
          <p className="text-[13px] text-muted leading-relaxed max-w-[220px]">
            Your daily Muslim companion. No ads. No noise. Just what
            helps you draw closer.
          </p>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold text-brown uppercase tracking-wider mb-3">
            Explore
          </h3>
          <ul className="space-y-2 text-[14px]">
            <li>
              <Link href="/quran" className="text-muted hover:text-brown transition-colors">
                Qur&apos;an
              </Link>
            </li>
            <li>
              <Link href="/prayer-times" className="text-muted hover:text-brown transition-colors">
                Prayer Times
              </Link>
            </li>
            <li>
              <Link href="/hijri-calendar" className="text-muted hover:text-brown transition-colors">
                Hijri Calendar
              </Link>
            </li>
            <li>
              <Link href="/99-names" className="text-muted hover:text-brown transition-colors">
                99 Names
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold text-brown uppercase tracking-wider mb-3">
            About
          </h3>
          <ul className="space-y-2 text-[14px]">
            <li>
              <Link href="/about" className="text-muted hover:text-brown transition-colors">
                Our story
              </Link>
            </li>
            <li>
              <Link href="/download" className="text-muted hover:text-brown transition-colors">
                Get the app
              </Link>
            </li>
            <li>
              <Link href="/donate" className="text-muted hover:text-brown transition-colors">
                Support us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold text-brown uppercase tracking-wider mb-3">
            Contact
          </h3>
          <ul className="space-y-2 text-[14px]">
            <li>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-muted hover:text-brown transition-colors break-all"
              >
                {SUPPORT_EMAIL}
              </a>
            </li>
            <li>
              <Link href="/privacy" className="text-muted hover:text-brown transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted hover:text-brown transition-colors">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-4 text-[12px] text-muted text-center">
          © {new Date().getFullYear()} iTafakkur. Made with care.
        </div>
      </div>
    </footer>
  );
}
