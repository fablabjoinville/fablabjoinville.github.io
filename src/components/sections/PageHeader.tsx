import type { ReactNode } from 'react';
import type { ImageSource } from '@/lib/images';
import { Photo } from './Photo';

/**
 * <PageHeader> — top-of-page title band for inner pages: flat navy (inverse)
 * band, "// EYEBROW", uppercase h1, optional lead, optional photo in the offset
 * frame on the right. No gradients/overlays; the photo never sits behind text.
 *
 * Props
 *  - title: ReactNode (h1)            - eyebrow?: string
 *  - lead?: ReactNode                 - image?: ImageSource; imageAlt?: string
 *  - children?: ReactNode             extra content under the lead (e.g. buttons)
 *  - id?: string
 *
 * The header image is the LCP candidate, so it is loaded eagerly with high priority.
 */
export interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: ImageSource;
  imageAlt?: string;
  id?: string;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, lead, image, imageAlt, id, children }: PageHeaderProps) {
  return (
    <header id={id} className={image ? 'flj-pagehead flj-pagehead--with-image' : 'flj-pagehead'}>
      <div className="flj-container flj-pagehead__grid">
        <div className="flj-pagehead__text">
          {eyebrow && <p className="flj-eyebrow flj-pagehead__eyebrow">{eyebrow}</p>}
          <h1 className="flj-pagehead__title">{title}</h1>
          {lead && <p className="flj-pagehead__lead">{lead}</p>}
          {children && <div className="flj-pagehead__extra">{children}</div>}
        </div>
        {image && (
          <Photo
            image={image}
            alt={imageAlt ?? (typeof title === 'string' ? title : '')}
            aspect="4/3"
            onInverse
            priority
            sizes="(min-width: 60em) 36rem, 100vw"
            className="flj-pagehead__photo"
          />
        )}
      </div>
    </header>
  );
}
