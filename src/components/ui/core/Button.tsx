import type * as React from 'react';
import { Icon } from './Icon';
import { pickDataAttributes, type DataAttributes } from './data-attributes';
import './core.css';
import { cx } from '@/lib/cx';
import { relFor } from './rel';

/**
 * Uppercase mono button. On hover it lifts and reveals a hard offset shadow
 * (the extruded-symbol motif); on press it drops back 1px. All visuals are CSS
 * (core.css), so it renders fully as static HTML.
 *
 * Extension beyond the DS contract: `href` (+ `target`, `rel`). When `href` is
 * set the button renders as an `<a class="flj-btn ...">` so static CTA links
 * need no JS. A disabled link renders without `href` and with
 * `aria-disabled="true"`. `target="_blank"` defaults `rel` to
 * "noopener noreferrer".
 *
 * Any `data-*` attribute (e.g. `data-track="visit-booking"`) is forwarded to the
 * rendered <a>/<button>.
 */
export interface ButtonProps extends DataAttributes {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  /** Icon name before the label */
  icon?: string;
  /** Icon name after the label */
  iconRight?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  /** Render as a link (<a>) instead of <button>. */
  href?: string;
  /** Link target; only used with `href`. */
  target?: React.HTMLAttributeAnchorTarget;
  /** Link rel; only used with `href`. */
  rel?: string;
}

/** Icon size per button size (label font size + 4, as in the DS). */
const ICON_SIZE = { sm: 17, md: 18, lg: 20 } as const;

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  disabled,
  fullWidth,
  type = 'button',
  onClick,
  children,
  style,
  className,
  href,
  target,
  rel,
  ...rest
}: ButtonProps) {
  const data = pickDataAttributes(rest);
  const cls = cx(
    'flj-btn',
    `flj-btn--${variant}`,
    `flj-btn--${size}`,
    fullWidth && 'flj-btn--full',
    className,
  );
  const iconSize = ICON_SIZE[size] ?? ICON_SIZE.md;
  const content = (
    <>
      {icon && <Icon name={icon} size={iconSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSize} />}
    </>
  );

  if (href !== undefined) {
    const linkRel = relFor(target, rel);
    return (
      <a
        {...data}
        className={cls}
        style={style}
        href={disabled ? undefined : href}
        target={target}
        rel={linkRel}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button {...data} type={type} className={cls} style={style} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
