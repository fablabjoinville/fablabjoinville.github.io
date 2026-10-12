import * as Sentry from '@sentry/astro';

// The widget lives in a shadow root that only exposes a few CSS variables: square the remaining corners (brand has no radius).
function squareFeedbackCorners() {
  const root = document.getElementById('sentry-feedback')?.shadowRoot;
  if (!root || root.getElementById('flj-square')) return;
  const style = document.createElement('style');
  style.id = 'flj-square';
  style.textContent = '*, *::before, *::after { border-radius: 0 !important; }';
  root.append(style);
}

Sentry.init({
  dsn: 'https://a6f102c315ccfd60751c700250caf376@o4506578567364608.ingest.us.sentry.io/4512239912288256',
  environment: import.meta.env.MODE,
  // `release` is injected by the Sentry Vite plugin (GITHUB_SHA in Actions).

  integrations: [
    Sentry.browserTracingIntegration(),
    // Public marketing site: keep text/media visible in replays; inputs stay masked.
    Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false }),
    // v11 has no `enableLogs` flag: Sentry.logger.* always sends; this also forwards console log/warn/error.
    Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
    // Needs the `Document-Policy: js-profiling` header, which GitHub Pages cannot send: inert until a proxy/CDN adds it.
    Sentry.browserProfilingIntegration(),
    // User feedback widget, themed with the design tokens.
    Sentry.feedbackIntegration({
      colorScheme: 'light',
      showBranding: false,
      isNameRequired: false,
      isEmailRequired: false,
      triggerLabel: 'Enviar feedback',
      formTitle: 'Enviar feedback',
      submitButtonLabel: 'Enviar',
      cancelButtonLabel: 'Cancelar',
      messageLabel: 'Mensagem',
      messagePlaceholder: 'Conte o que aconteceu ou o que podemos melhorar.',
      nameLabel: 'Nome',
      namePlaceholder: 'Seu nome',
      emailLabel: 'E-mail',
      emailPlaceholder: 'voce@exemplo.com.br',
      isRequiredLabel: '(obrigatório)',
      addScreenshotButtonLabel: 'Anexar captura de tela',
      removeScreenshotButtonLabel: 'Remover captura de tela',
      highlightToolText: 'Destacar',
      removeHighlightText: 'Remover',
      hideToolText: 'Ocultar',
      instructions: 'Arraste para destacar ou ocultar partes da página.',
      confirmButtonLabel: 'Confirmar',
      errorTitle: 'Não foi possível enviar',
      formError: 'Não foi possível enviar o feedback. Tente novamente.',
      onFormOpen: squareFeedbackCorners,
      successMessageText: 'Obrigado pelo feedback!',
      themeLight: {
        background: 'var(--flj-white)',
        foreground: 'var(--text-body)',
        accentBackground: 'var(--flj-navy-900)',
        accentForeground: 'var(--flj-white)',
        border: '2px solid var(--flj-navy-900)',
        boxShadow: '4px 4px 0 var(--flj-navy-900)',
        fontFamily: 'var(--font-body)',
      },
    }),
  ],

  tracesSampleRate: 1.0,
  // Static site, no own API: only same-origin and local dev get trace headers (third-party requests stay untouched).
  tracePropagationTargets: [/^\//, 'localhost'],
  replaysSessionSampleRate: import.meta.env.PROD ? 0.25 : 1.0,
  replaysOnErrorSampleRate: 1.0,
  profileSessionSampleRate: 1.0,
  profileLifecycle: 'trace',

  // LGPD: do not collect user info / IP on a public site.
  dataCollection: { userInfo: false },
});
