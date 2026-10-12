import type { ImageSource } from '@/lib/images';

/**
 * <Picture> — renders one responsive <img> from an `ImageSource`
 * (a `ResponsiveImage` from `img()` in '@/lib/images', or a raw ImageMetadata).
 *
 * Props
 *  - image: ImageSource (required)
 *  - alt: string (required; pass "" only for purely decorative images)
 *  - sizes?: string — overrides image.sizes (use `em` media queries, not px)
 *  - loading?: 'lazy' | 'eager' (default 'lazy'); priority?: boolean → eager +
 *    fetchpriority="high" + decoding="sync" (use for the LCP image only)
 *  - className?: string
 *
 * Static TSX, no client JS. Usable inside islands too (only imports a type).
 */
export interface PictureProps {
  image: ImageSource;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  className?: string;
}

export function Picture({ image, alt, sizes, loading, priority, className }: PictureProps) {
  const srcSet = image.srcset || undefined;
  return (
    <img
      src={image.src}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? image.sizes) : undefined}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? 'eager' : (loading ?? 'lazy')}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
    />
  );
}
