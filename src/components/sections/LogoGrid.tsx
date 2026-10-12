import type { ImageSource } from '@/lib/images';
import { Picture } from './Picture';
import { linkAttrs, slugify } from './utils';

/**
 * <LogoGrid> — ruled partner/sponsor grid (UI kit "Partners"): 2px navy outer
 * border and cell rules, logos centred; text fallback in mono uppercase.
 *
 * Props
 *  - items: { name: string; href?: string; image?: ImageSource; imageAlt?: string }[]
 *      imageAlt defaults to "Logo <name>"; external links open in a new tab with
 *      data-track="partner-<slug(name)>".
 *  - label?: string   accessible name for the list (e.g. "Patrocinadores")
 */
export interface LogoGridItem {
  name: string;
  href?: string;
  image?: ImageSource;
  imageAlt?: string;
}

export interface LogoGridProps {
  items: LogoGridItem[];
  label?: string;
  className?: string;
}

export function LogoGrid({ items, label, className }: LogoGridProps) {
  return (
    <ul className={['flj-logos', className].filter(Boolean).join(' ')} role="list" aria-label={label}>
      {items.map((item) => {
        const content = item.image ? (
          <Picture
            image={item.image}
            alt={item.imageAlt ?? `Logo ${item.name}`}
            sizes="12rem"
            className="flj-logos__img"
          />
        ) : (
          <span className="flj-logos__name">{item.name}</span>
        );
        return (
          <li key={item.name} className="flj-logos__cell">
            {item.href ? (
              <a className="flj-logos__link" {...linkAttrs(item.href)} data-track={`partner-${slugify(item.name)}`}>
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}
