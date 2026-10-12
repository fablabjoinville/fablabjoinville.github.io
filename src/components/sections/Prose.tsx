import type { ReactNode } from 'react';

/**
 * <Prose> — long-form text wrapper using the global `.flj-prose` styles.
 *
 * Props
 *  - children?: ReactNode   regular JSX content
 *  - html?: string          pre-rendered (trusted, build-time) markdown HTML, e.g.
 *                           `entry.rendered?.html` or a `*Html` field from a yaml
 *                           collection. When set, `children` is ignored.
 *  - as?: 'div' | 'article' (default 'div')
 *  - className?: string
 */
export interface ProseProps {
  children?: ReactNode;
  html?: string;
  as?: 'div' | 'article';
  className?: string;
}

export function Prose({ children, html, as: Element = 'div', className }: ProseProps) {
  const cls = className ? `flj-prose ${className}` : 'flj-prose';
  if (html !== undefined) {
    return <Element className={cls} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <Element className={cls}>{children}</Element>;
}
