import React from 'react';
const labelStyle = { font: 'var(--type-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-body)' };
export function Input({ label, hint, error, placeholder, value, defaultValue, onChange, type = 'text', disabled, multiline, rows = 4, style }) {
  const [f, setF] = React.useState(false);
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={labelStyle}>{label}</span>}
      <Tag type={multiline ? undefined : type} rows={multiline ? rows : undefined} placeholder={placeholder} value={value} defaultValue={defaultValue} disabled={disabled}
        onChange={e => onChange && onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ font: 'var(--type-body)', color: 'var(--text-body)', background: disabled ? 'var(--surface-muted)' : 'var(--flj-white)', padding: multiline ? '10px 12px' : '0 12px', height: multiline ? 'auto' : 44, resize: 'vertical',
          border: `2px solid ${error ? 'var(--status-danger)' : 'var(--border-default)'}`, borderRadius: 'var(--radius-1)', outline: 'none',
          boxShadow: f ? `3px 3px 0 0 ${error ? 'var(--status-danger)' : 'var(--focus-ring)'}` : 'none', transition: 'box-shadow var(--dur-fast)' }} />
      {(error || hint) && <span style={{ font: 'var(--type-small)', color: error ? 'var(--status-danger)' : 'var(--text-muted)' }}>{error || hint}</span>}
    </label>
  );
}
