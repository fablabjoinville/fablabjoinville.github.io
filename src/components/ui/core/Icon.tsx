import type * as React from 'react';
import { getIcon } from './icons';
import './core.css';

/**
 * Lucide (UI) or Simple Icons (brand) glyph, inlined as SVG at render time and
 * tinted via currentColor. No CDN request. Always decorative (aria-hidden);
 * give the surrounding control an accessible name.
 *
 * Unknown names throw, so a typo fails the static build instead of rendering
 * an empty box. Registered names live in ./icons.ts (`IconName`).
 */
export interface IconProps {
  /** Icon name, kebab-case, e.g. "arrow-right", "instagram". */
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Icon({ name, size = 20, color = 'currentColor', style, className }: IconProps) {
  const def = getIcon(name);
  if (!def) {
    throw new Error(`<Icon>: unknown icon name "${name}". Register it in src/components/ui/core/icons.ts.`);
  }
  const cls = className ? `flj-icon ${className}` : 'flj-icon';
  const spanStyle = color !== 'currentColor' ? { color, ...style } : style;

  return (
    <span className={cls} aria-hidden="true" style={spanStyle}>
      {def.kind === 'stroke' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
          dangerouslySetInnerHTML={{ __html: def.markup }}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          focusable="false"
        >
          <path d={def.path} />
        </svg>
      )}
    </span>
  );
}
