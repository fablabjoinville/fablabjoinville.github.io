import React from 'react';
export function Badge({ tone = 'neutral', children, style }) {
  const T = { neutral: ['var(--surface-muted)', 'var(--text-body)'], primary: ['var(--brand-primary)', 'var(--flj-white)'], accent: ['var(--brand-accent)', 'var(--flj-white)'], success: ['var(--status-success-bg)', 'var(--status-success)'], warning: ['var(--status-warning-bg)', '#7a5a00'], danger: ['var(--status-danger-bg)', 'var(--status-danger)'], info: ['var(--status-info-bg)', 'var(--status-info)'] }[tone];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 8px', background: T[0], color: T[1], font: 'var(--type-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', borderRadius: 'var(--radius-1)', whiteSpace: 'nowrap', ...style }}>{children}</span>;
}
