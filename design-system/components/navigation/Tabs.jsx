import React from 'react';
export function Tabs({ tabs = [], value, defaultValue, onChange }) {
  const [inner, setInner] = React.useState(defaultValue ?? (tabs[0] && (tabs[0].value ?? tabs[0])));
  const cur = value !== undefined ? value : inner;
  return <div role="tablist" style={{ display: 'flex', gap: 0, borderBottom: '2px solid var(--border-default)' }}>
    {tabs.map(t => { const v = t.value ?? t, l = t.label ?? t, on = v === cur;
      return <button key={v} role="tab" aria-selected={on} onClick={() => { setInner(v); onChange && onChange(v); }}
        style={{ height: 44, padding: '0 18px', marginBottom: -2, background: on ? 'var(--brand-primary)' : 'transparent', color: on ? 'var(--flj-white)' : 'var(--text-body)', border: 'none', borderBottom: on ? '2px solid var(--brand-primary)' : '2px solid transparent', font: '700 13px/1 var(--font-display)', letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 'var(--radius-1) var(--radius-1) 0 0' }}>{l}</button>; })}
  </div>;
}
