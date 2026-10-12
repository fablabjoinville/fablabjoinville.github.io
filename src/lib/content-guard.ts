/**
 * Content completeness guard for the old-site migration.
 *
 *   ---
 *   import { assertCounts } from '@/lib/content-guard';
 *   await assertCounts(); // in src/pages/index.astro frontmatter
 *   ---
 *
 * Throws (failing the build) when a collection's entry count differs from
 * EXPECTED. While pages are being migrated, a collection that is still entirely
 * EMPTY is skipped silently — unless CONTENT_GUARD=strict is set in the
 * environment (the parity verifier/CI runs with it), in which case empty
 * collections fail too.
 *
 * Also exports `getSorted(name)` — getCollection sorted by `order` ascending.
 */
import { getCollection, type CollectionKey } from 'astro:content';

export const EXPECTED = {
  team: 14,
  faq: 7,
  charter: 7,
  projects: 15,
  memberships: 3,
  resources: 6,
  benefits: 5,
  sponsors: 8,
  lerobotVideos: 7,
} as const satisfies Partial<Record<CollectionKey, number>>;

function isStrict(): boolean {
  return (typeof process !== 'undefined' ? process.env.CONTENT_GUARD : undefined) === 'strict';
}

export async function assertCounts(expected: Partial<Record<CollectionKey, number>> = EXPECTED): Promise<void> {
  const strict = isStrict();
  const problems: string[] = [];
  for (const [name, want] of Object.entries(expected) as [CollectionKey, number][]) {
    const got = (await getCollection(name)).length;
    if (got === 0 && !strict) continue;
    if (got !== want) problems.push(`${name}: expected ${want}, found ${got}`);
  }
  if (problems.length > 0) {
    throw new Error(
      `Content guard failed${strict ? ' (CONTENT_GUARD=strict)' : ''}:\n  - ${problems.join('\n  - ')}`,
    );
  }
}

/** Entries of a collection whose items have a numeric `order`, sorted ascending. */
export async function getSorted<C extends CollectionKey>(name: C) {
  const entries = await getCollection(name);
  const orderOf = (e: (typeof entries)[number]) => {
    const order = (e.data as { order?: unknown }).order;
    return typeof order === 'number' ? order : Number.MAX_SAFE_INTEGER;
  };
  return [...entries].sort((a, b) => orderOf(a) - orderOf(b));
}
