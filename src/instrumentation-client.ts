/**
 * Client-side Sentry init + PostHog init.
 *
 * Runs once in the browser on first page load. Both services silently
 * no-op if their DSN/API key env vars are absent (safe for local dev).
 */
import * as Sentry from '@sentry/nextjs';
import posthog from 'posthog-js';

// -----------------------------------------------------------------------------
// Sentry
// -----------------------------------------------------------------------------
const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    tracesSampleRate: 0.1,
    // Replay disabled for launch — enable if we want session replay later
    // (replays are expensive on Sentry quota).
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    sendDefaultPii: false,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
  });
}

// -----------------------------------------------------------------------------
// PostHog
// -----------------------------------------------------------------------------
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
if (posthogKey && typeof window !== 'undefined') {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: 'identified_only', // don't create profiles for anonymous visitors
    capture_pageview: true,
    capture_pageleave: true,
    // Match mobile: no session recording by default (privacy-first).
    disable_session_recording: true,
    autocapture: true,
  });
}

// Sentry Next.js SDK — must export this from the client instrumentation.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
