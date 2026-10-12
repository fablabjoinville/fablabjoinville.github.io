import { Icon } from '@/components/ui';
import { linkAttrs } from '@/components/sections/utils';

/**
 * <MapEmbed /> — OpenStreetMap embed (no cookies or tracking, so it loads
 * directly — lazily — instead of behind a click-to-load placeholder).
 *
 * Renders the <iframe> plus a caption bar with the address and an "Abrir no
 * Google Maps" link. OSM attribution is shown inside the embed itself. Fully static: a plain React component with no hooks or state, so it
 * is rendered to HTML at build time. Use it WITHOUT a `client:` directive.
 *
 * Props (all serialisable)
 *  - src: string      OSM embed URL (site.links.mapEmbed)
 *  - title: string    iframe title, e.g. "Mapa: Fab Lab Joinville no Ágora Tech Park"
 *  - href?: string    "Abrir no Google Maps" link (site.links.mapLink)
 *  - address?: string one-line address shown in the caption
 *  - aspect?: string  CSS aspect-ratio of the map (default '4/3')
 *
 * Tracking: the "open" link carries data-track="map-open".
 */
export type MapEmbedProps = {
  src: string;
  title: string;
  href?: string;
  address?: string;
  aspect?: string;
};

export function MapEmbed({ src, title, href, address, aspect = '4/3' }: MapEmbedProps) {
  const style = { aspectRatio: aspect.replace('/', ' / ') };
  return (
    <figure className="flj-map">
      <div className="flj-map__viewport" style={style}>
        <iframe className="flj-map__frame" src={src} title={title} loading="lazy" referrerPolicy="no-referrer" />
      </div>
      <figcaption className="flj-map__caption">
        {address && (
          <span className="flj-map__address">
            <Icon name="map-pin" size={16} className="flj-map__pin" />
            {address}
          </span>
        )}
        <span className="flj-map__meta">
          {href && (
            <a className="flj-map__link" {...linkAttrs(href)} data-track="map-open">
              Abrir no Google Maps
              <Icon name="arrow-up-right" size={16} />
            </a>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
