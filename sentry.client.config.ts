import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: 'https://a6f102c315ccfd60751c700250caf376@o4506578567364608.ingest.us.sentry.io/4512239912288256',
  environment: import.meta.env.MODE,
  // `release` is injected by the Sentry Vite plugin (GITHUB_SHA in Actions).

  integrations: [
    Sentry.browserTracingIntegration(),
    // Public marketing site: keep text/media visible in replays; inputs stay masked.
    Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false }),
    // v11 has no `enableLogs` flag: Sentry.logger.* always sends; this also forwards console warn/error.
    Sentry.consoleLoggingIntegration({ levels: ['warn', 'error'] }),
  ],

  tracesSampleRate: 1.0,
  replaysSessionSampleRate: import.meta.env.PROD ? 0.25 : 1.0,
  replaysOnErrorSampleRate: 1.0,

  // LGPD: do not collect user info / IP on a public site.
  dataCollection: { userInfo: false },
});
