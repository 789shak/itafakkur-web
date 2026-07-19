/**
 * Sentry — Node runtime (Server Components, Route Handlers, API routes).
 *
 * DSN read from env at boot. Missing DSN → Sentry silently no-ops
 * (safe for local dev and PR previews).
 */
import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    // 10% traces sampling — enough to catch slow routes without inflating
    // Sentry quota. Bump for launch week to observe real-world load.
    tracesSampleRate: 0.1,
    // Don't ship PII by default — matches mobile posture.
    sendDefaultPii: false,
    environment: process.env.VERCEL_ENV || 'development',
  });
}
