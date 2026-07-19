/**
 * instrumentation.ts — Next.js 16+ runtime hook, called once per
 * server startup (Node runtime AND Edge runtime).
 *
 * We use it to initialize Sentry so JS errors on the server are
 * captured. Client-side Sentry is initialized in `instrumentation-client.ts`.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

// Automatically report React Server Component errors to Sentry.
// Types are inferred from Next.js — using Parameters<typeof> keeps us
// aligned with whichever signature the installed Sentry SDK expects.
type SentryModule = typeof import('@sentry/nextjs');
export const onRequestError: SentryModule['captureRequestError'] = async (
  ...args
) => {
  const Sentry = await import('@sentry/nextjs');
  return Sentry.captureRequestError(...args);
};
