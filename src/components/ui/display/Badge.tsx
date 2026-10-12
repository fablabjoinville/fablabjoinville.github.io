import type { CSSProperties, ReactNode } from 'react';
import './display.css';
import { cx } from '@/lib/cx';

export type BadgeTone = 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

/** Small mono status label (vagas, nível, status). */
export interface BadgeProps {
  tone?: BadgeTone;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Badge({ tone = 'neutral', children, className, style }: BadgeProps) {
  const cls = cx('flj-badge', `flj-badge--${tone}`, className);
  return (
    <span className={cls} style={style}>
      {children}
    </span>
  );
}
