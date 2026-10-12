import React from 'react';
import { Icon } from './Icon.jsx';
export function IconButton({ icon, label, variant = 'secondary', size = 40, disabled, onClick, style }) {
  const [h, setH] = React.useState(false);
  const V = { primary: ['var(--brand-primary)', 'var(--flj-white)', 'var(--brand-primary)'], secondary: ['var(--flj-white)', 'var(--brand-primary)', 'var(--brand-primary)'], ghost: [h ? 'var(--surface-muted)' : 'transparent', 'var(--brand-primary)', 'transparent'] }[variant];
  return <button aria-label={label} title={label} disabled={disabled} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: V[0], color: V[1], border: `2px solid ${V[2]}`, borderRadius: 'var(--radius-1)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .4 : 1, padding: 0,
      boxShadow: h && variant !== 'ghost' && !disabled ? 'var(--shadow-offset-sm)' : 'none', transform: h && variant !== 'ghost' && !disabled ? 'translate(-2px,-2px)' : 'none', transition: 'all var(--dur-fast) var(--ease-out)', ...style }}>
    <Icon name={icon} size={Math.round(size * 0.5)} /></button>;
}
