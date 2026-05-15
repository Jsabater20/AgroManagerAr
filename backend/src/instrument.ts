import * as Sentry from '@sentry/nestjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const integrations: any[] = [];
try {
  // nodeProfilingIntegration requires a native binary — load it optionally
  // so a missing/incompatible binary doesn't crash the whole process.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { nodeProfilingIntegration } = require('@sentry/profiling-node');
  integrations.push(nodeProfilingIntegration());
} catch (e) {
  console.warn(
    'Sentry profiling not available (native binding missing):',
    (e as Error).message,
  );
}

Sentry.init({
  dsn: 'https://4a79913ef137482aab6f9fef644c949a@o4511355743502336.ingest.us.sentry.io/4511355770830848',
  environment: process.env.NODE_ENV ?? 'development',
  integrations,
  tracesSampleRate: 0.2,
  profilesSampleRate: 0.1,
  sendDefaultPii: true,
});
