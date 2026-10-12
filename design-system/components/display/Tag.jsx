import React from 'react';
export function Tag({ children, selected, onClick, onRemove }) {
  const [h, setH] = React.useState(false);
  return <span onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', border: '2px solid var(--border-default)', borderRadius: 'var(--radius-pill)', background: selected ? 'var(--brand-primary)' : h && onClick ? 'var(--surface-muted)' : 'var(--flj-white)', color: selected ? 'var(--flj-white)' : 'var(--text-body)', font: '500 14px/1 var(--font-body)', cursor: onClick ? 'pointer' : 'default', userSelect: 'none' }}>
    {children}{onRemove && <span onClick={e => { e.stopPropagation(); onRemove(); }} style={{ cursor: 'pointer', font: '700 14px/1 var(--font-mono)' }}>×</span>}</span>;
}
