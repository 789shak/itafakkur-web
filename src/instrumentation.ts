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
export const onRequestError = async (
  err: unknown,
  request: { path: string; method: string },
  context: { routerKind: 'Pages Router' | 'App Router'; routePath: string; routeType: string },
) => {
  const Sentry = await import('@sentry/nextjs');
  Sentry.captureRequestError(err, request, context);
};
