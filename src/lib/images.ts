/**
 * Responsive images for static TSX sections.
 *
 * TSX sections cannot call `astro:assets` themselves (they are plain React), so
 * pages (.astro) prepare images with these helpers and pass the plain result
 * object down as a prop:
 *
 *   ---
 *   import { img, imgs } from '@/lib/images';
 *   import hero from '@/assets/old-site/home/hero.jpg';
 *   const heroImg = await img(hero, { sizes: '(min-width: 60em) 50vw, 100vw' });
 *   const photos = await imgs({ a: photoA, b: photoB });          // record
 *   ---
 *   <PageHeader title="Sobre" image={heroImg} imageAlt="..." />
 *
 * API
 *  - `img(src, opts?) => Promise<ResponsiveImage>`
 *      src: ImageMetadata (ESM import or content `image()` field).
 *      opts.widths  default [480, 800, 1200, 1600], capped at the original width
 *                   (the original width is added when it is smaller than the
 *                   largest requested width, so the srcset always has the
 *                   sharpest available candidate).
 *      opts.sizes   default '100vw'. Use `em` media queries in components (the
 *                   lint rule forbids "NNpx" literals in .tsx/.astro).
 *      opts.format  default 'webp' ('avif' also allowed). SVG/GIF are passed
 *                   through untouched (src only, empty srcset).
 *  - `imgs(record | array, opts?)` — batch version, same options for all.
 *  - `ResponsiveImage` = { src, srcset, sizes, width, height } — serialisable,
 *    so it can also be passed to hydrated islands (Carousel, VideoFacade).
 *  - `ImageSource` = ResponsiveImage | ImageMetadata-like {src,width,height};
 *    every section prop typed `ImageSource` accepts either.
 *
 * Render with `<Picture image={...} alt="..." />` from '@/components/sections'.
 */
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export interface ResponsiveImage {
  /** Fallback URL (largest generated width). */
  src: string;
  /** `srcset` attribute value ("" when not applicable, e.g. SVG). */
  srcset: string;
  /** `sizes` attribute value. */
  sizes: string;
  /** Intrinsic width of `src` (for the width attribute / aspect ratio). */
  width: number;
  /** Intrinsic height of `src`. */
  height: number;
}

/** Anything sections can render: a prepared ResponsiveImage or a raw ImageMetadata-like object. */
export type ImageSource = ResponsiveImage | { src: string; width: number; height: number; srcset?: string; sizes?: string };

export interface ImgOptions {
  widths?: number[];
  sizes?: string;
  format?: 'webp' | 'avif';
}

const DEFAULT_WIDTHS = [480, 800, 1200, 1600] as const;
const DEFAULT_SIZES = '100vw';
const PASSTHROUGH_FORMATS = new Set(['svg', 'gif']);

/** Widths ≤ original, plus the original width when a larger width was requested. */
function capWidths(requested: readonly number[], originalWidth: number): number[] {
  const capped = requested.filter((w) => w > 0 && w <= originalWidth);
  if (requested.some((w) => w > originalWidth)) capped.push(originalWidth);
  const unique = [...new Set(capped)].sort((a, b) => a - b);
  return unique.length > 0 ? unique : [originalWidth];
}

export async function img(src: ImageMetadata, opts: ImgOptions = {}): Promise<ResponsiveImage> {
  const sizes = opts.sizes ?? DEFAULT_SIZES;

  if (PASSTHROUGH_FORMATS.has(src.format)) {
    return { src: src.src, srcset: '', sizes, width: src.width, height: src.height };
  }

  const widths = capWidths(opts.widths ?? DEFAULT_WIDTHS, src.width);
  const width = widths[widths.length - 1];
  const result = await getImage({
    src,
    width,
    widths,
    sizes,
    format: opts.format ?? 'webp',
  });

  const outWidth = Number(result.attributes.width ?? width);
  const outHeight = Number(result.attributes.height ?? Math.round((width * src.height) / src.width));

  return {
    src: result.src,
    srcset: result.srcSet.attribute,
    sizes,
    width: outWidth,
    height: outHeight,
  };
}

export async function imgs<T extends Record<string, ImageMetadata>>(
  record: T,
  opts?: ImgOptions,
): Promise<{ [K in keyof T]: ResponsiveImage }> {
  const entries = await Promise.all(
    Object.entries(record).map(async ([key, src]) => [key, await img(src, opts)] as const),
  );
  return Object.fromEntries(entries) as { [K in keyof T]: ResponsiveImage };
}
