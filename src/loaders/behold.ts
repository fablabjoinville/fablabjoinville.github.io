/**
 * Behold.so Instagram feed → Astro Content Layer loader (build time, no client JS).
 *
 *   // src/content.config.ts
 *   import { beholdLoader } from './loaders/behold';
 *   const instagram = defineCollection({ loader: beholdLoader });
 *
 *   // page
 *   const posts = (await getCollection('instagram'))
 *     .map((e) => e.data)
 *     .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
 *   <InstagramFeed posts={posts} />
 *
 * Source: GET https://feeds.behold.so/<site.beholdFeedId> (public JSON). The
 * response is `{ username, biography, ..., posts: Post[] }`. Each stored entry is
 * one post (id = Instagram media id) validated by `instagramPostSchema`:
 *   { id, timestamp (ISO 8601, "+00:00" offset), permalink, mediaType
 *     ('IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'), caption, prunedCaption (caption
 *     without trailing hashtags), hashtags, mediaUrl, thumbnailUrl?,
 *     sizes: { small|medium|large|full: { mediaUrl, width, height } } }
 * Use `sizes.*.mediaUrl` (behold.pictures, stable, square crops 400/700/1000/2000)
 * for display — raw Instagram CDN URLs (`mediaUrl`, `thumbnailUrl`) expire.
 *
 * Failure policy: on any fetch/parse error the loader logs a warning. When
 * `process.env.CI` is set it throws, so CI never deploys an empty feed. Locally
 * the store is left untouched: it keeps the last successful fetch cached in
 * .astro/ (empty on a fresh clone) and the home page renders without posts.
 */
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { site } from '../data/site';

const sizeSchema = z.object({
  mediaUrl: z.url(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

/** One Instagram post as stored in the `instagram` collection. */
export const instagramPostSchema = z.object({
  id: z.string().min(1),
  timestamp: z.string().min(1),
  permalink: z.url(),
  mediaType: z.enum(['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM']),
  caption: z.string().default(''),
  prunedCaption: z.string().default(''),
  hashtags: z.array(z.string()).default([]),
  mediaUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  sizes: z.object({
    small: sizeSchema,
    medium: sizeSchema,
    large: sizeSchema,
    full: sizeSchema,
  }),
});

export type InstagramPost = z.infer<typeof instagramPostSchema>;

/** Minimal envelope check: we only need `posts` (validated per post below). */
const feedSchema = z.object({ posts: z.array(z.record(z.string(), z.unknown())) });

/** "2026-06-04T21:32:59+0000" → "2026-06-04T21:32:59+00:00" (valid ISO 8601 for Date). */
function normalizeTimestamp(ts: unknown): unknown {
  return typeof ts === 'string' ? ts.replace(/([+-]\d{2})(\d{2})$/, '$1:$2') : ts;
}

/** Max posts kept (newest first). */
const LIMIT = 12;
const TIMEOUT_MS = 15_000;
const url = `https://feeds.behold.so/${site.beholdFeedId}`;

/** Loader for the `instagram` collection (feed id from src/data/site.ts). */
export const beholdLoader: Loader = {
  name: 'behold-instagram-loader',
  schema: instagramPostSchema,
  load: async ({ store, logger, parseData, generateDigest, meta }) => {
    let posts: Record<string, unknown>[];
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      posts = feedSchema.parse(await res.json()).posts;
    } catch (error) {
      const message = `Behold feed ${url} could not be loaded: ${error instanceof Error ? error.message : String(error)}`;
      if (process.env.CI) {
        throw new Error(`${message}. Failing the CI build so an empty Instagram feed is never deployed.`);
      }
      logger.warn(`${message}. Keeping the cached posts (${store.keys().length}).`);
      return;
    }

    const sorted = posts
      .map((p): Record<string, unknown> => ({ ...p, timestamp: normalizeTimestamp(p.timestamp) }))
      .filter((p) => p.visibility === undefined || p.visibility === 'visible')
      .sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)))
      .slice(0, LIMIT);

    store.clear();
    const results = await Promise.all(
      sorted.map(async (raw) => {
        const id = String(raw.id ?? '');
        if (!id) return undefined;
        try {
          return { id, data: await parseData({ id, data: raw }) };
        } catch (error) {
          logger.warn(`Skipping Instagram post ${id}: ${error instanceof Error ? error.message : String(error)}`);
          return undefined;
        }
      }),
    );
    for (const result of results) {
      if (result) store.set({ id: result.id, data: result.data, digest: generateDigest(result.data) });
    }
    meta.set('lastFetched', new Date().toISOString());
    logger.info(`Loaded ${store.keys().length} Instagram posts from Behold.`);
  },
};
