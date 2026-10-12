import React from 'react';
export function Tooltip({ content, children, placement = 'top', open }) {
  const [h, setH] = React.useState(false);
  const show = open ?? h;
  const pos = placement === 'top' ? { bottom: 'calc(100% + 8px)' } : { top: 'calc(100% + 8px)' };
  return <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: 'relative', display: 'inline-flex' }}>
    {children}
    {show && <span role="tooltip" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', ...pos, background: 'var(--flj-navy-900)', color: 'var(--flj-white)', font: '500 12px/1.3 var(--font-mono)', padding: '6px 10px', borderRadius: 'var(--radius-1)', whiteSpace: 'nowrap', zIndex: 10, pointerEvents: 'none' }}>{content}</span>}
  </span>;
}
