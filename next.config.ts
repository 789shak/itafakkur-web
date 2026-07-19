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
};

export default nextConfig;
