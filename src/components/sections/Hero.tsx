import type { ReactNode } from 'react';
import type { ImageSource } from '@/lib/images';
import { Photo } from './Photo';
import { headingIdFor } from './utils';

/**
 * <Hero> — home hero per the UI kit (Home.jsx): white band with a 2px bottom
 * rule, "// EYEBROW", display-size uppercase h1, lead, action row and a photo
 * in the offset frame (navy block + outline) on the right.
 *
 * Props
 *  - eyebrow?: string (omit to show no eyebrow); title: ReactNode (h1; use <br/> for deliberate breaks)
 *  - lead: ReactNode
 *  - actions?: ReactNode     e.g. <Button variant="accent" size="lg" .../> (≤1 accent per view)
 *  - image?: ImageSource; imageAlt?: string   (eager, high priority — LCP)
 *  - children?: ReactNode    extra row under the actions (e.g. <SocialLinks/>)
 */
export interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  image?: ImageSource;
  imageAlt?: string;
  children?: ReactNode;
}

export function Hero({ eyebrow, title, lead, actions, image, imageAlt, children }: HeroProps) {
  const headingId = headingIdFor('hero', undefined, 'hero');
  return (
    <section className="flj-hero" aria-labelledby={headingId}>
      <div className="flj-container flj-hero__grid">
        <div className="flj-hero__text">
          {eyebrow && <p className="flj-eyebrow flj-hero__eyebrow">{eyebrow}</p>}
          <h1 id={headingId} className="flj-hero__title">
            {title}
          </h1>
          <p className="flj-hero__lead">{lead}</p>
          {actions && <div className="flj-hero__actions">{actions}</div>}
          {children && <div className="flj-hero__extra">{children}</div>}
        </div>
        {image && (
          <Photo
            image={image}
            alt={imageAlt ?? (typeof title === 'string' ? title : '')}
            aspect="4/3"
            priority
            sizes="(min-width: 60em) 36rem, 100vw"
            className="flj-hero__photo"
          />
        )}
      </div>
    </section>
  );
}
