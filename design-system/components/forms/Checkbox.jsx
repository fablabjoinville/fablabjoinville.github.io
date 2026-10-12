import React from 'react';
export function Checkbox({ label, checked, defaultChecked, onChange, disabled }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const toggle = () => { if (disabled) return; setInner(!on); onChange && onChange(!on); };
  return <label onClick={toggle} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .45 : 1, font: 'var(--type-body)', color: 'var(--text-body)', userSelect: 'none' }}>
    <span role="checkbox" aria-checked={on} style={{ width: 22, height: 22, flex: 'none', border: '2px solid var(--border-default)', borderRadius: 'var(--radius-1)', background: on ? 'var(--brand-primary)' : 'var(--flj-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--flj-white)', font: '800 14px/1 var(--font-mono)' }}>{on ? '✓' : ''}</span>{label}</label>;
}
