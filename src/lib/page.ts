import { getEntry } from 'astro:content';
import { SIZES, img, type ResponsiveImage } from '@/lib/images';

/**
 * Load a `pages` content entry (src/content/pages/<slug>.md) and prepare its
 * header image (`SIZES.half`, undefined when the page has no `headerImage`).
 * Pass `{ headerImage: false }` when the page builds its own header image.
 */
export async function loadPage(
  slug: 'cultura' | 'faq' | 'estrutura' | 'faca-parte' | 'portfolio' | 'lerobot' | (string & {}),
  { headerImage = true }: { headerImage?: boolean } = {},
) {
  const entry = await getEntry('pages', slug as 'cultura');
  if (!entry) throw new Error(`Missing src/content/pages/${slug}.md`);
  const data = entry.data;
  const headerImg: ResponsiveImage | undefined = headerImage && data.headerImage
    ? await img(data.headerImage, { sizes: SIZES.half })
    : undefined;
  return { entry, data, headerImg };
}
