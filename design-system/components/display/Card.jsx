import React from 'react';
export function Card({ children, variant = 'outline', interactive, padding = 24, onClick, style }) {
  const [h, setH] = React.useState(false);
  const V = { outline: ['var(--surface-card)', '2px solid var(--border-default)', 'var(--text-body)'], paper: ['var(--surface-paper)', '2px solid transparent', 'var(--text-body)'], inverse: ['var(--surface-inverse)', '2px solid var(--surface-inverse)', 'var(--text-inverse)'] }[variant];
  const lift = interactive && h;
  return <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ background: V[0], border: V[1], color: V[2], padding, borderRadius: 'var(--radius-1)', cursor: interactive ? 'pointer' : undefined, boxShadow: lift ? 'var(--shadow-offset)' : 'none', transform: lift ? 'translate(-4px,-4px)' : 'none', transition: 'transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)', ...style }}>{children}</div>;
}
