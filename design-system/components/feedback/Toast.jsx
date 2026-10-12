import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Toast({ tone = 'success', title, children, onClose }) {
  const T = { success: ['var(--status-success)', 'circle-check'], info: ['var(--status-info)', 'info'], warning: ['var(--status-warning)', 'triangle-alert'], danger: ['var(--status-danger)', 'circle-x'] }[tone];
  return <div role="status" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', width: 360, maxWidth: '100%', boxSizing: 'border-box', padding: '14px 16px', background: 'var(--surface-inverse)', color: 'var(--text-inverse)', borderRadius: 'var(--radius-1)', boxShadow: `4px 4px 0 0 ${T[0]}` }}>
    <Icon name={T[1]} size={20} color={T[0]} style={{ marginTop: 1 }} />
    <div style={{ flex: 1 }}>{title && <div style={{ font: '600 15px/1.3 var(--font-body)' }}>{title}</div>}{children && <div style={{ font: 'var(--type-small)', opacity: .85, marginTop: 2 }}>{children}</div>}</div>
    {onClose && <button onClick={onClose} aria-label="Fechar" style={{ background: 'none', border: 0, color: 'inherit', cursor: 'pointer', padding: 0, display: 'flex' }}><Icon name="x" size={16} /></button>}
  </div>;
}
