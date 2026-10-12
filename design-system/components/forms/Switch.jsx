import React from 'react';
export function Switch({ label, checked, defaultChecked, onChange, disabled }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const t = () => { if (disabled) return; setInner(!on); onChange && onChange(!on); };
  return <label onClick={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .45 : 1, font: 'var(--type-body)', color: 'var(--text-body)', userSelect: 'none' }}>
    <span role="switch" aria-checked={on} style={{ width: 44, height: 24, flex: 'none', boxSizing: 'border-box', border: '2px solid var(--border-default)', borderRadius: 'var(--radius-1)', background: on ? 'var(--brand-primary)' : 'var(--flj-white)', position: 'relative', transition: 'background var(--dur)' }}>
      <span style={{ position: 'absolute', top: 2, left: on ? 22 : 2, width: 16, height: 16, background: on ? 'var(--flj-laser-500)' : 'var(--brand-primary)', transition: 'left var(--dur) var(--ease-out)' }} /></span>{label}</label>;
}
