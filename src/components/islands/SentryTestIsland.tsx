import { useState } from 'react';
import { Button } from '@/components/ui';
import { withIslandBoundary } from './IslandBoundary';

/**
 * Test-only island for /sentry-test: after a click it throws during render, so
 * the withIslandBoundary ErrorBoundary must capture it (tag island:SentryTest)
 * and render its fallback.
 */
export type SentryTestIslandProps = Record<string, never>;

function SentryTestIslandImpl() {
  const [crash, setCrash] = useState(false);
  if (crash) {
    throw new Error(`Sentry test render error ${Date.now()}`);
  }
  return (
    <Button variant="secondary" onClick={() => setCrash(true)} data-track="sentry-test-render-error">
      Quebrar ilha React (ErrorBoundary)
    </Button>
  );
}

export const SentryTestIsland = withIslandBoundary(SentryTestIslandImpl, 'SentryTest');
