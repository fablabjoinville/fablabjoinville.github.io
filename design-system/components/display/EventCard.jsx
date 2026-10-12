import React from 'react';
import { Badge } from './Badge.jsx';
import { Icon } from '../core/Icon.jsx';
export function EventCard({ image, day, month, title, kind, description, place, time, badge, badgeTone = 'accent', onClick }) {
  const [h, setH] = React.useState(false);
  return <article onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface-card)', border: '2px solid var(--border-default)', borderRadius: 'var(--radius-1)', cursor: onClick ? 'pointer' : undefined, boxShadow: h ? 'var(--shadow-offset)' : 'none', transform: h ? 'translate(-4px,-4px)' : 'none', transition: 'all var(--dur) var(--ease-out)', overflow: 'hidden' }}>
    <div style={{ position: 'relative', aspectRatio: '16/10', background: 'var(--surface-muted)', borderBottom: '2px solid var(--border-default)' }}>
      {image && <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
      {day && <div style={{ position: 'absolute', left: 0, top: 0, background: 'var(--brand-primary)', color: 'var(--flj-white)', padding: '8px 12px', textAlign: 'center', fontFamily: 'var(--font-display)' }}><div style={{ font: '800 26px/1 var(--font-display)' }}>{day}</div><div style={{ font: 'var(--type-label)', letterSpacing: 'var(--ls-label)', marginTop: 4 }}>{month}</div></div>}
      {badge && <Badge tone={badgeTone} style={{ position: 'absolute', right: 10, top: 10 }}>{badge}</Badge>}
    </div>
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
      {kind && <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-accent)' }}>{kind}</span>}
      <h3 style={{ margin: 0, font: 'var(--type-h4)', color: 'var(--text-strong)', textWrap: 'pretty' }}>{title}</h3>
      {description && <p style={{ margin: 0, font: 'var(--type-small)', color: 'var(--text-muted)' }}>{description}</p>}
      {(place || time) && <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', gap: 16, flexWrap: 'wrap', font: '500 13px/1.3 var(--font-mono)', color: 'var(--text-body)' }}>
        {time && <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="clock" size={14} />{time}</span>}
        {place && <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="map-pin" size={14} />{place}</span>}</div>}
    </div>
  </article>;
}
