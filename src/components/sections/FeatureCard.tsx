import type { ReactNode } from 'react';
import { Card, Icon, Tag } from '@/components/ui';
import type { ImageSource } from '@/lib/images';
import { Picture } from './Picture';
import { Heading, type HeadingLevel } from './utils';

/**
 * <FeatureCard> — DS Card (2px navy outline) with optional photo on top (16:9,
 * ruled bottom edge) or an accent icon, a title, body and optional tags.
 *
 * Props
 *  - title: ReactNode; children?: ReactNode (body; plain JSX or <Prose html/>)
 *  - icon?: string           Icon name from '@/components/ui' (ignored when image is set)
 *  - image?: ImageSource; imageAlt?: string (defaults to the title when it is a string)
 *  - href?: string           whole card becomes a link (lift + offset shadow). Do not
 *                            put other links inside children when href is set.
 *  - track?: string          data-track id for the link
 *  - tags?: string[]         topic pills under the body
 *  - eyebrow?: string        mono label above the title
 *  - headingLevel?: 3 | 4    (default 3)
 *  - aspect?: string         image aspect ratio (default '16/9')
 */
export interface FeatureCardProps {
  title: ReactNode;
  children?: ReactNode;
  icon?: string;
  image?: ImageSource;
  imageAlt?: string;
  href?: string;
  track?: string;
  tags?: string[];
  eyebrow?: string;
  headingLevel?: HeadingLevel;
  aspect?: string;
  className?: string;
}

export function FeatureCard({
  title,
  children,
  icon,
  image,
  imageAlt,
  href,
  track,
  tags,
  eyebrow,
  headingLevel = 3,
  aspect = '16/9',
  className,
}: FeatureCardProps) {
  const external = href ? /^https?:\/\//.test(href) : false;
  return (
    <Card
      padding={0}
      href={href}
      target={external ? '_blank' : undefined}
      data-track={track}
      className={['flj-feature', className].filter(Boolean).join(' ')}
    >
      {image && (
        <div className="flj-feature__media" style={{ aspectRatio: aspect.replace('/', ' / ') }}>
          <Picture
            image={image}
            alt={imageAlt ?? (typeof title === 'string' ? title : '')}
            sizes="(min-width: 60em) 25rem, (min-width: 40em) 50vw, 100vw"
            className="flj-feature__img"
          />
        </div>
      )}
      <div className="flj-feature__body">
        {!image && icon && <Icon name={icon} size={28} className="flj-feature__icon" />}
        {eyebrow && <p className="flj-feature__eyebrow">{eyebrow}</p>}
        <Heading level={headingLevel} className="flj-feature__title">
          {title}
        </Heading>
        {children && <div className="flj-feature__text">{children}</div>}
        {tags && tags.length > 0 && (
          <div className="flj-feature__tags">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
