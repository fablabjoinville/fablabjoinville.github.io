import React from 'react';
export function Radio({ name, options = [], value, defaultValue, onChange, direction = 'column' }) {
  const [inner, setInner] = React.useState(defaultValue);
  const cur = value !== undefined ? value : inner;
  return <div role="radiogroup" style={{ display: 'flex', flexDirection: direction, gap: direction === 'row' ? 20 : 10 }}>
    {options.map(o => { const v = typeof o === 'string' ? o : o.value, l = typeof o === 'string' ? o : o.label, on = cur === v;
      return <label key={v} onClick={() => { setInner(v); onChange && onChange(v); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', font: 'var(--type-body)', color: 'var(--text-body)' }}>
        <span role="radio" aria-checked={on} style={{ width: 22, height: 22, flex: 'none', border: '2px solid var(--border-default)', borderRadius: '50%', background: 'var(--flj-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--brand-primary)' }} />}</span>{l}</label>; })}
  </div>;
}
