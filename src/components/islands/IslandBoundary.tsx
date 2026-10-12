import type { ComponentType } from 'react';
import * as Sentry from '@sentry/react';

/**
 * Wrap a hydrated island in a Sentry error boundary.
 *
 * - The error is reported to Sentry tagged `island:<name>` (beforeCapture).
 * - A structured warning is also sent through Sentry Logs (onError).
 * - The island is replaced by a small, quiet fallback so the rest of the
 *   static page keeps working.
 *
 * Never calls Sentry.init — the SDK is initialised once by sentry.client.config.ts
 * (@sentry/astro integration). `@sentry/react` re-exports `logger` from @sentry/browser.
 */
export function withIslandBoundary<P extends Record<string, unknown>>(
  Component: ComponentType<P>,
  name: string,
) {
  const Wrapped = Sentry.withErrorBoundary(Component, {
    fallback: (
      <span className="flj-island-fallback" role="status">
        Este recurso não pôde ser carregado. Recarregue a página.
      </span>
    ),
    beforeCapture: (scope) => {
      scope.setTag('island', name);
    },
    onError: (error, _componentStack, eventId) => {
      Sentry.logger.warn(Sentry.logger.fmt`Island "${name}" crashed and rendered its fallback`, {
        island: name,
        eventId,
        error: error instanceof Error ? error.message : String(error),
      });
    },
  });
  Wrapped.displayName = `IslandBoundary(${name})`;
  return Wrapped;
}
