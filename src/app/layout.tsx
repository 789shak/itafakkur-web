/**
 * Root layout — fonts, metadata, sitewide chrome.
 *
 * Fonts:
 *   - Fraunces (serif) — headings, wordmark, hero text
 *   - Geist Sans        — body text, UI
 *   - Geist Mono        — code, prayer time monospaced numerals
 *
 * All three load through next/font/google which self-hosts the font
 * files at build time (no runtime request to fonts.googleapis.com,
 * better Lighthouse scores, no CLS).
 */
import type { Metadata, Viewport } from 'next';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'iTafakkur — Your daily Muslim companion',
    template: '%s · iTafakkur',
  },
  description:
    'Accurate prayer times, the Qur\'an with authentic translations, hadith from trusted sources, and space to reflect. No ads. No noise. Just what helps you draw closer.',
  metadataBase: new URL('https://itafakkur.com'),
  openGraph: {
    type: 'website',
    siteName: 'iTafakkur',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#F8F5EF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Skip-to-content — visible only on keyboard focus. Lets
            screen-reader + keyboard users bypass the header nav on
            every page load (WCAG 2.4.1). */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-gold focus:text-brown focus:font-semibold focus:text-sm focus:shadow-lg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1 flex flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
