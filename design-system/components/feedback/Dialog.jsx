import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
export function Dialog({ open, title, children, actions, onClose, width = 480, inline }) {
  if (!open) return null;
  const panel = <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} style={{ width, maxWidth: '100%', background: 'var(--surface-card)', border: '2px solid var(--border-default)', boxShadow: 'var(--shadow-offset-lg)', borderRadius: 'var(--radius-1)' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 14px 14px 20px', borderBottom: '2px solid var(--border-default)' }}>
      <h3 style={{ margin: 0, font: '700 16px/1.2 var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{title}</h3>
      {onClose && <IconButton icon="x" label="Fechar" variant="ghost" size={32} onClick={onClose} />}</div>
    <div style={{ padding: 20, font: 'var(--type-body)', color: 'var(--text-body)' }}>{children}</div>
    {actions && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '0 20px 20px' }}>{actions}</div>}
  </div>;
  if (inline) return panel;
  return <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(4,22,30,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 1000 }}>{panel}</div>;
}
