import type { CSSProperties } from 'react';
import type { ImageSource } from '@/lib/images';
import { Picture } from './Picture';

/**
 * <Photo> — real photograph in the DS "offset layers" frame: a solid navy block
 * and a thin outline stacked behind the image (the extruded FLJ symbol motif).
 *
 * Props
 *  - image: ImageSource; alt: string
 *  - frame?: 'offset' | 'plain'       (default 'offset')
 *  - aspect?: string                  CSS aspect-ratio, e.g. '4/3', '1/1', '16/9'
 *                                     (crops with object-fit: cover). Omit = natural.
 *  - onInverse?: boolean              frame colours for navy backgrounds
 *  - caption?: string                 optional <figcaption>
 *  - sizes?, priority?, className?
 */
export interface PhotoProps {
  image: ImageSource;
  alt: string;
  frame?: 'offset' | 'plain';
  aspect?: string;
  onInverse?: boolean;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function Photo({
  image,
  alt,
  frame = 'offset',
  aspect,
  onInverse,
  caption,
  sizes,
  priority,
  className,
}: PhotoProps) {
  const cls = [
    'flj-photo',
    `flj-photo--${frame}`,
    onInverse && 'flj-photo--on-inverse',
    aspect && 'flj-photo--cropped',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const style = aspect ? ({ '--flj-photo-aspect': aspect.replace('/', ' / ') } as CSSProperties) : undefined;

  return (
    <figure className={cls} style={style}>
      <div className="flj-photo__frame">
        <Picture image={image} alt={alt} sizes={sizes} priority={priority} className="flj-photo__img" />
      </div>
      {caption && <figcaption className="flj-photo__caption">{caption}</figcaption>}
    </figure>
  );
}
