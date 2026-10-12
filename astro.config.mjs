// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import pagefind from 'astro-pagefind';
import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  // Org user-site repo (<org>.github.io) is served at the root, so no `base`.
  // Switch to https://www.fablabjoinville.com.br at the DNS cutover.
  site: 'https://fablabjoinville.github.io',
  redirects: {
    '/home': '/',
    '/faça-parte': '/faca-parte',
  },
  integrations: [
    react(),
    // Internal pages (noindex) stay out of the sitemap.
    sitemap({
      filter: (page) => !['/design-system', '/sentry-test', '/lab/'].some((path) => new URL(page).pathname.startsWith(path)),
    }),
    // No third-party scripts today; kept for future analytics (GA4/GTM).
    partytown({ config: { forward: ['dataLayer.push', 'gtag'] } }),
    pagefind(),
    sentry({
      org: 'projetoresgate-thinktank',
      project: 'fablabjoinville-website',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      // Static output: there is no server runtime on GitHub Pages.
      enabled: { client: true, server: false },
      sourcemaps: {
        // The default globs miss dist/_astro/*.map on static output.
        filesToDeleteAfterUpload: ['./dist/**/*.map'],
      },
      telemetry: false,
    }),
  ],
});
