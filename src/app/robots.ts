/**
 * robots.txt — served at /robots.txt at runtime.
 *
 * Allow-all baseline with explicit disallows for:
 *   - Auth flows (no value to indexing /login, /signup, /logout)
 *   - Personal data pages (/account, /journal, /habits, /bookmarks, /dhikr)
 *   - API routes (/api/*)
 *   - The OAuth callback
 */
import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://itafakkur.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/account',
          '/journal',
          '/habits',
          '/bookmarks',
          '/dhikr',
          '/login',
          '/signup',
          '/logout',
          '/auth/',
          '/api/',
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
