import type { ReactNode } from 'react';
import { Icon } from '@/components/ui';
import type { ImageSource } from '@/lib/images';
import { cx } from '@/lib/cx';
import { Picture } from './Picture';

/**
 * <Testimonial> — pull quote: accent quote glyph, large body text, attribution
 * with an optional square portrait. Paper card with 2px navy rule on the left.
 *
 * Props
 *  - quote?: ReactNode   plain text/JSX quote
 *  - html?: string       trusted HTML (multi-paragraph); takes precedence over `quote`
 *  - name: string; role?: string
 *  - image?: ImageSource; imageAlt?: string (defaults to "Foto de <name>")
 */
export interface TestimonialProps {
  quote?: ReactNode;
  html?: string;
  name: string;
  role?: string;
  image?: ImageSource;
  imageAlt?: string;
  className?: string;
}

export function Testimonial({ quote, html, name, role, image, imageAlt, className }: TestimonialProps) {
  return (
    <figure className={cx('flj-testimonial', className)}>
      <Icon name="quote" size={40} className="flj-testimonial__glyph" />
      {html !== undefined ? (
        <blockquote className="flj-testimonial__quote" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <blockquote className="flj-testimonial__quote">
          <p>{quote}</p>
        </blockquote>
      )}
      <figcaption className="flj-testimonial__by">
        {image && (
          <Picture image={image} alt={imageAlt ?? `Foto de ${name}`} sizes="5rem" className="flj-testimonial__img" />
        )}
        <span>
          <span className="flj-testimonial__name">{name}</span>
          {role && <span className="flj-testimonial__role">{role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
