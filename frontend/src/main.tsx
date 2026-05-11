import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.tsx'

Sentry.init({
  dsn: 'https://df9d9c15a61303f8317e56f49c49df4e@o4511355743502336.ingest.us.sentry.io/4511355818082304',
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.2,
  integrations: [Sentry.browserTracingIntegration()],
  sendDefaultPii: true,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
