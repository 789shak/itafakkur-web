import type { NextConfig } from 'next';

/**
 * Security + performance headers applied sitewide.
 *
 * X-Frame-Options DENY   — prevent embedding in iframes (clickjacking)
 * X-Content-Type-Options — stops MIME sniffing
 * Referrer-Policy        — only send referrer to same-origin, no cross-site tracking
 * Permissions-Policy     — deny camera/mic/payment by default; allow geolocation
 *                          (needed by /prayer-times location detection)
 * Strict-Transport-Security — enforce HTTPS for 1 year, include subdomains
 *
 * Content-Security-Policy is DELIBERATELY not set here yet. The 3D hero
 * pulls Three.js dynamically, Supabase Auth uses external OAuth
 * providers, and OG image generation loads Google Fonts at build time.
 * A too-strict CSP breaks all three. Add in a later polish pass once
 * we've measured every subresource origin.
 */
const securityHeaders = [
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), payment=(), interest-cohort=(), geolocation=(self)',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  // 2026-08-06 — legal compliance pass: the old GitHub Pages site served
  // static /privacy.html, /terms.html, /support.html. Those exact URLs
  // are what's registered as the Privacy Policy URL in App Store Connect
  // (confirmed live) and possibly Google Play Console, and are still
  // referenced in STORE-METADATA.md and old marketing copy. The App
  // Store Connect field can only be edited alongside a new version
  // submission (it's locked while the current version is live), so
  // rather than wait for that, these old URLs now redirect to their
  // Next.js equivalents. Keep these redirects permanently — do not
  // remove even after the ASC field is eventually updated, since the
  // old links may be cached, indexed, or bookmarked indefinitely.
  async redirects() {
    return [
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/support.html', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
