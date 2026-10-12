import type { CSSProperties, ReactNode } from 'react';
import { Badge, type BadgeTone } from './Badge';
import { Icon } from '../core/Icon';
import './display.css';

/** Image source: a URL string, or an object shaped like Astro's ImageMetadata. */
export type EventCardImage = string | { src: string; width?: number; height?: number };

/** Workshop / hackathon / event listing card with date block. */
export interface EventCardProps {
  image?: EventCardImage;
  /** Alt text for the image. Defaults to "" (decorative). */
  imageAlt?: string;
  day?: string;
  month?: string;
  title: string;
  kind?: string;
  description?: string;
  place?: string;
  time?: string;
  badge?: string;
  badgeTone?: BadgeTone;
  onClick?: () => void;
  /** Makes the whole card a link (stretched title link). */
  href?: string;
  className?: string;
  style?: CSSProperties;
}

export function EventCard({
  image,
  imageAlt = '',
  day,
  month,
  title,
  kind,
  description,
  place,
  time,
  badge,
  badgeTone = 'accent',
  onClick,
  href,
  className,
  style,
}: EventCardProps) {
  const interactive = Boolean(href || onClick);
  const cls = ['flj-event', interactive && 'flj-event--interactive', className].filter(Boolean).join(' ');
  const img = typeof image === 'string' ? { src: image } : image;

  let titleContent: ReactNode = title;
  if (href) {
    titleContent = (
      <a className="flj-event__link" href={href} onClick={onClick ? () => onClick() : undefined}>
        {title}
      </a>
    );
  } else if (onClick) {
    titleContent = (
      <button type="button" className="flj-event__link" onClick={() => onClick()}>
        {title}
      </button>
    );
  }

  return (
    <article className={cls} style={style}>
      <div className="flj-event__media">
        {img && (
          <img
            className="flj-event__img"
            src={img.src}
            alt={imageAlt}
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
          />
        )}
        {day && (
          <div className="flj-event__date">
            <span className="flj-event__day">{day}</span>
            {month && <span className="flj-event__month">{month}</span>}
          </div>
        )}
        {badge && (
          <Badge tone={badgeTone} className="flj-event__badge">
            {badge}
          </Badge>
        )}
      </div>
      <div className="flj-event__body">
        {kind && <span className="flj-event__kind">{kind}</span>}
        <h3 className="flj-event__title">{titleContent}</h3>
        {description && <p className="flj-event__desc">{description}</p>}
        {(place || time) && (
          <div className="flj-event__meta">
            {time && (
              <span className="flj-event__meta-item">
                <Icon name="clock" size={14} />
                {time}
              </span>
            )}
            {place && (
              <span className="flj-event__meta-item">
                <Icon name="map-pin" size={14} />
                {place}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
