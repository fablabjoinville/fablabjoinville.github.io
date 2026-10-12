import React from 'react';
const labelStyle = { font: 'var(--type-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-body)' };
export function Select({ label, options = [], value, defaultValue, onChange, disabled, style }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={labelStyle}>{label}</span>}
      <span style={{ position: 'relative', display: 'block' }}>
        <select value={value} defaultValue={defaultValue} disabled={disabled} onChange={e => onChange && onChange(e.target.value)}
          style={{ width: '100%', appearance: 'none', WebkitAppearance: 'none', font: 'var(--type-body)', color: 'var(--text-body)', background: 'var(--flj-white)', height: 44, padding: '0 40px 0 12px', border: '2px solid var(--border-default)', borderRadius: 'var(--radius-1)', cursor: 'pointer', opacity: disabled ? .5 : 1 }}>
          {options.map(o => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span aria-hidden="true" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '2px solid var(--border-default)', pointerEvents: 'none', font: '700 12px var(--font-mono)' }}>▼</span>
      </span>
    </label>
  );
}
