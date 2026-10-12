import React from 'react';
import { Icon } from './Icon.jsx';
const SIZES = { sm: { h: 36, px: 14, fs: 13 }, md: { h: 44, px: 20, fs: 14 }, lg: { h: 56, px: 28, fs: 16 } };
export function Button({ variant = 'primary', size = 'md', icon, iconRight, disabled, fullWidth, children, onClick, type = 'button', style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const V = {
    primary: { bg: 'var(--brand-primary)', fg: 'var(--text-inverse)', bd: 'var(--brand-primary)', sh: 'var(--shadow-offset-accent)' },
    accent: { bg: 'var(--brand-accent)', fg: 'var(--flj-white)', bd: 'var(--flj-navy-800)', sh: 'var(--shadow-offset-sm)' },
    secondary: { bg: 'var(--flj-white)', fg: 'var(--brand-primary)', bd: 'var(--brand-primary)', sh: 'var(--shadow-offset-sm)' },
    ghost: { bg: hover ? 'var(--surface-muted)' : 'transparent', fg: 'var(--brand-primary)', bd: 'transparent', sh: 'none' },
    inverse: { bg: 'var(--flj-white)', fg: 'var(--brand-primary)', bd: 'var(--flj-white)', sh: '4px 4px 0 0 var(--flj-laser-500)' },
  }[variant];
  const lift = variant !== 'ghost' && hover && !disabled && !press;
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: s.h, padding: `0 ${s.px}px`, width: fullWidth ? '100%' : undefined,
        font: `700 ${s.fs}px/1 var(--font-display)`, letterSpacing: '0.04em', textTransform: 'uppercase', color: V.fg, background: V.bg,
        border: `2px solid ${V.bd}`, borderRadius: 'var(--radius-1)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        boxShadow: lift ? V.sh : 'none', transform: lift ? 'translate(-3px,-3px)' : press ? 'translate(1px,1px)' : 'none',
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)', ...style }}>
      {icon && <Icon name={icon} size={s.fs + 4} />}{children}{iconRight && <Icon name={iconRight} size={s.fs + 4} />}
    </button>
  );
}
