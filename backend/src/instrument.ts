import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: 'https://4a79913ef137482aab6f9fef644c949a@o4511355743502336.ingest.us.sentry.io/4511355770830848',
  environment: process.env.NODE_ENV ?? 'development',
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 0.2,
  profilesSampleRate: 0.1,
  sendDefaultPii: true,
});
