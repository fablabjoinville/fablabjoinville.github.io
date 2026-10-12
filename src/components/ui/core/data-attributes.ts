/**
 * `data-*` attribute passthrough for DS components (Button, IconButton, Card).
 *
 * Used for analytics hooks such as `data-track="visit-booking"` (see
 * src/scripts/track.ts). Only keys starting with `data-` are forwarded, so the
 * DS prop contract stays unchanged.
 */
export type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

/** Returns only the `data-*` entries of a props object. */
export function pickDataAttributes(props: object): DataAttributes {
  const out: DataAttributes = {};
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('data-') && value !== undefined) {
      out[key as `data-${string}`] = value as string | number | boolean;
    }
  }
  return out;
}
