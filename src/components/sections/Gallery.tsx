import type * as React from 'react';
import type { ImageSource } from '@/lib/images';
import { Picture } from './Picture';

/**
 * <Gallery> — static photo grid (2px navy rules, square-ish crops).
 *
 * Props
 *  - images: { image: ImageSource; alt: string; caption?: string }[]
 *  - columns?: 2 | 3 | 4 (default 3; 1 column on phones, 2 from 40em)
 *  - aspect?: string     crop ratio (default '4/3'); 'auto' keeps natural ratios
 *  - featured?: boolean  first image spans two columns/rows (from 40em)
 */
export interface GalleryImage {
  image: ImageSource;
  alt: string;
  caption?: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  aspect?: string;
  featured?: boolean;
  className?: string;
}

export function Gallery({ images, columns = 3, aspect = '4/3', featured, className }: GalleryProps) {
  const cls = [
    'flj-gallery',
    `flj-gallery--${columns}`,
    featured && 'flj-gallery--featured',
    aspect !== 'auto' && 'flj-gallery--cropped',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const style = aspect === 'auto' ? undefined : { '--flj-gallery-aspect': aspect.replace('/', ' / ') };
  return (
    <ul className={cls} role="list" style={style as React.CSSProperties | undefined}>
      {images.map((item, i) => (
        <li key={`${item.image.src}-${i}`} className="flj-gallery__item">
          <figure className="flj-gallery__figure">
            <Picture
              image={item.image}
              alt={item.alt}
              sizes={`(min-width: 60em) ${Math.round(75 / columns)}rem, (min-width: 40em) 50vw, 100vw`}
              className="flj-gallery__img"
            />
            {item.caption && <figcaption className="flj-gallery__caption">{item.caption}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}
