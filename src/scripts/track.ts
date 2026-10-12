/**
 * Delegated CTA click tracking.
 *
 * Any element (or ancestor) with `data-track="<target>"` emits a Sentry counter
 * `cta_click` with the attribute `target`. One listener for the whole document,
 * so it also covers markup rendered by islands after hydration.
 *
 * Sentry is initialised by sentry.client.config.ts (@sentry/astro); this module
 * only uses the already-initialised client. If Sentry is disabled the call is a no-op.
 * API (@sentry/core 11): metrics.count(name, value?, { unit?, attributes?, scope? }).
 */
import * as Sentry from '@sentry/astro';

const MAX_TARGET_LENGTH = 64;

function onClick(event: MouseEvent): void {
  if (!(event.target instanceof Element)) return;
  const el = event.target.closest<HTMLElement>('[data-track]');
  const target = el?.dataset.track?.trim().slice(0, MAX_TARGET_LENGTH);
  if (!target) return;
  try {
    Sentry.metrics.count('cta_click', 1, { attributes: { target } });
  } catch {
    // Telemetry must never break navigation.
  }
}

document.addEventListener('click', onClick, { capture: true, passive: true });
