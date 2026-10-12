import type * as React from 'react';
import { Icon } from './Icon';
import { pickDataAttributes, type DataAttributes } from './data-attributes';
import './core.css';

/**
 * Square icon-only button for toolbars, carousels, close actions. `label` is
 * required and becomes the accessible name (aria-label) and tooltip (title).
 *
 * Extension beyond the DS contract: `href` (+ `target`, `rel`). When `href` is
 * set it renders as an `<a class="flj-iconbtn ...">` (e.g. social links in the
 * footer). `target="_blank"` defaults `rel` to "noopener noreferrer".
 * Any `data-*` attribute (e.g. `data-track="instagram"`) is forwarded.
 */
export interface IconButtonProps extends DataAttributes {
  icon: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Square side in px (default 40). The glyph is half of it. */
  size?: number;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  /** Render as a link (<a>) instead of <button>. */
  href?: string;
  /** Link target; only used with `href`. */
  target?: React.HTMLAttributeAnchorTarget;
  /** Link rel; only used with `href`. */
  rel?: string;
}

const DEFAULT_SIZE = 40;

export function IconButton({
  icon,
  label,
  variant = 'secondary',
  size = DEFAULT_SIZE,
  disabled,
  onClick,
  style,
  className,
  href,
  target,
  rel,
  ...rest
}: IconButtonProps) {
  const data = pickDataAttributes(rest);
  const cls = ['flj-iconbtn', `flj-iconbtn--${variant}`, className].filter(Boolean).join(' ');
  // Non-default sizes go through a CSS custom property; the default is in core.css.
  const sizedStyle =
    size !== DEFAULT_SIZE
      ? ({ '--flj-iconbtn-size': `${size}px`, ...style } as React.CSSProperties)
      : style;
  const glyph = <Icon name={icon} size={Math.round(size * 0.5)} />;

  if (href !== undefined) {
    const linkRel = rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);
    return (
      <a
        {...data}
        className={cls}
        style={sizedStyle}
        href={disabled ? undefined : href}
        target={target}
        rel={linkRel}
        aria-label={label}
        title={label}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
      >
        {glyph}
      </a>
    );
  }

  return (
    <button
      {...data}
      type="button"
      className={cls}
      style={sizedStyle}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
    >
      {glyph}
    </button>
  );
}
