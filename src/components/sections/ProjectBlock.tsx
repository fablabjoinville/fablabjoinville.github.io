import type { ReactNode } from 'react';
import { Button } from '@/components/ui';
import type { ImageSource } from '@/lib/images';
import { Picture } from './Picture';
import { Heading, isExternal, type HeadingLevel } from './utils';

/**
 * <ProjectBlock> — one portfolio project: text column (eyebrow, title,
 * markdown body, link buttons) beside a photo column (first photo large in the
 * offset frame, the rest as a ruled thumbnail row). Alternate sides with
 * `reverse` for a zig-zag page.
 *
 * Props
 *  - id: string (anchor, e.g. "maratona-lab-code"); title: string
 *  - eyebrow?: string
 *  - html: string                 rendered markdown body (entry.rendered?.html)
 *  - images?: { image: ImageSource; alt: string }[]
 *  - links?: { label: string; href: string; track?: string }[]   secondary buttons;
 *                                 external ones open in a new tab
 *  - reverse?: boolean            photos on the left (from 60em)
 *  - headingLevel?: 2 | 3 (default 3)
 *  - children?: ReactNode         media slot rendered in the photo column ABOVE the
 *                                 images — use it for islands, e.g.
 *                                 <ProjectBlock ...><VideoFacade client:visible .../></ProjectBlock>
 */
export interface ProjectLink {
  label: string;
  href: string;
  track?: string;
}

export interface ProjectBlockProps {
  id: string;
  title: string;
  eyebrow?: string;
  html: string;
  images?: { image: ImageSource; alt: string }[];
  links?: ProjectLink[];
  reverse?: boolean;
  headingLevel?: HeadingLevel;
  className?: string;
  children?: ReactNode;
}

export function ProjectBlock({
  id,
  title,
  eyebrow,
  html,
  images = [],
  links = [],
  reverse,
  headingLevel = 3,
  className,
  children,
}: ProjectBlockProps) {
  const [first, ...rest] = images;
  const hasMedia = Boolean(first || children);
  const cls = [
    'flj-project',
    reverse && 'flj-project--reverse',
    !hasMedia && 'flj-project--text-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article id={id} className={cls} aria-labelledby={`${id}-titulo`}>
      <div className="flj-project__text">
        {eyebrow && <p className="flj-eyebrow">{eyebrow}</p>}
        <Heading level={headingLevel} id={`${id}-titulo`} className="flj-project__title">
          {title}
        </Heading>
        <div className="flj-prose flj-project__body" dangerouslySetInnerHTML={{ __html: html }} />
        {links.length > 0 && (
          <div className="flj-project__links">
            {links.map((link) => {
              const external = isExternal(link.href);
              return (
                <Button
                  key={link.href}
                  variant="secondary"
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  iconRight={external ? 'arrow-up-right' : 'arrow-right'}
                  data-track={link.track}
                >
                  {link.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
      {hasMedia && (
        <div className="flj-project__media">
          {children && <div className="flj-project__slot">{children}</div>}
          {first && (
            <figure className="flj-photo flj-photo--offset flj-photo--cropped flj-project__main">
              <div className="flj-photo__frame">
                <Picture
                  image={first.image}
                  alt={first.alt}
                  sizes="(min-width: 60em) 34rem, 100vw"
                  className="flj-photo__img"
                />
              </div>
            </figure>
          )}
          {rest.length > 0 && (
            <ul className="flj-project__thumbs" role="list">
              {rest.map((item, i) => (
                <li key={`${item.image.src}-${i}`}>
                  <Picture image={item.image} alt={item.alt} sizes="(min-width: 60em) 11rem, 33vw" className="flj-project__thumb" />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
