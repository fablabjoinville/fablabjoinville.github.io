import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

/**
 * <CardGrid> — responsive grid: 1 column on phones, 2 from 40em, `columns`
 * from 60em (4 columns step through 3 at 60em and reach 4 at 75em).
 *
 * Props
 *  - columns?: 2 | 3 | 4   (default 3)
 *  - as?: 'div' | 'ul'     (default 'div'; with 'ul' wrap children in <li>)
 *  - className?, children
 */
export interface CardGridProps {
  columns?: 2 | 3 | 4;
  as?: 'div' | 'ul';
  className?: string;
  children?: ReactNode;
}

export function CardGrid({ columns = 3, as: Element = 'div', className, children }: CardGridProps) {
  const cls = cx('flj-grid', `flj-grid--${columns}`, className);
  return (
    <Element className={cls} role={Element === 'ul' ? 'list' : undefined}>
      {children}
    </Element>
  );
}
