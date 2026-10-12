/**
 * Small helpers shared by the section components (no React, no Astro).
 *
 *  - `slugify(text)`            "Nossa equipe!" -> "nossa-equipe"
 *  - `isExternal(href)`         true for http(s) URLs
 *  - `linkAttrs(href)`          { href, target?, rel? } — external links open in a
 *                               new tab with rel="noopener noreferrer"
 *  - `headingIdFor(id, title, fallback)`  `${id ?? slugify(title) ?? fallback}-titulo`
 *  - `stripHtml(html)`          plain text (tags removed, basic entities decoded)
 *  - `Heading` / `HeadingLevel` dynamic h1..h6 element
 */
import type { ReactNode } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function linkAttrs(href: string): { href: string; target?: '_blank'; rel?: string } {
  return isExternal(href) ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href };
}

/** Heading id for a section: `${id ?? slug(title) ?? fallback}-titulo`. */
export function headingIdFor(id: string | undefined, title: unknown, fallback: string): string {
  return `${id ?? (typeof title === 'string' ? slugify(title) : fallback)}-titulo`;
}

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  '#39': "'",
};

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, code: string) => {
      const lower = code.toLowerCase();
      if (lower in ENTITIES) return ENTITIES[lower];
      if (lower.startsWith('#x')) return String.fromCodePoint(parseInt(lower.slice(2), 16));
      if (lower.startsWith('#')) return String.fromCodePoint(parseInt(lower.slice(1), 10));
      return m;
    })
    .replace(/\s+/g, ' ')
    .trim();
}

export interface HeadingProps {
  level: HeadingLevel;
  id?: string;
  className?: string;
  children?: ReactNode;
}

export function Heading({ level, id, className, children }: HeadingProps) {
  const Element = `h${level}` as 'h2';
  return (
    <Element id={id} className={className}>
      {children}
    </Element>
  );
}
