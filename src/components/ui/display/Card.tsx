import type * as React from 'react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { pickDataAttributes, type DataAttributes } from '../core/data-attributes';
import './display.css';
import { cx } from '@/lib/cx';
import { relFor } from '../core/rel';

export type CardVariant = 'outline' | 'paper' | 'inverse';

/**
 * Container surface. Interactive cards lift with a hard navy offset shadow.
 * `data-*` attributes are forwarded to the card surface (the <a> when `href`).
 */
export interface CardProps extends DataAttributes {
  children?: ReactNode;
  variant?: CardVariant;
  interactive?: boolean;
  /** Inner padding. Numbers are px; strings are used as-is (e.g. "var(--space-4)"). Default var(--space-5). */
  padding?: number | string;
  onClick?: () => void;
  /** Renders the card surface as a link. Implies `interactive`. */
  href?: string;
  /** Link target; only used with `href`. `_blank` defaults `rel` to "noopener noreferrer". */
  target?: React.HTMLAttributeAnchorTarget;
  /** Link rel; only used with `href`. */
  rel?: string;
  /** Outer element. With `href`, the <a> card is nested inside it (e.g. <li><a/></li>). */
  as?: 'div' | 'article' | 'li';
  className?: string;
  style?: CSSProperties;
}

export function Card({
  children,
  variant = 'outline',
  interactive,
  padding,
  onClick,
  href,
  target,
  rel,
  as = 'div',
  className,
  style,
  ...rest
}: CardProps) {
  const data = pickDataAttributes(rest);
  const isInteractive = Boolean(interactive || href || onClick);
  const cls = cx(
    'flj-card',
    `flj-card--${variant}`,
    isInteractive && 'flj-card--interactive',
    className,
  );

  const mergedStyle: CSSProperties | undefined =
    padding === undefined
      ? style
      : ({
          ['--flj-card-padding' as string]: typeof padding === 'number' ? `${padding}px` : padding,
          ...style,
        } as CSSProperties);

  if (href) {
    const link = (
      <a
        {...data}
        href={href}
        target={target}
        rel={relFor(target, rel)}
        className={cls}
        style={mergedStyle}
        onClick={onClick ? () => onClick() : undefined}
      >
        {children}
      </a>
    );
    if (as === 'div') return link;
    const Outer = as;
    return <Outer className="flj-card-item">{link}</Outer>;
  }

  const Root = as;
  if (onClick) {
    const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    };
    return (
      <Root
        {...data}
        className={cls}
        style={mergedStyle}
        role="button"
        tabIndex={0}
        onClick={() => onClick()}
        onKeyDown={onKeyDown}
      >
        {children}
      </Root>
    );
  }

  return (
    <Root {...data} className={cls} style={mergedStyle}>
      {children}
    </Root>
  );
}
