import { Icon, IconButton } from '@/components/ui';
import { addressLines, mailto, site } from '@/data/site';
import { brandMark } from '@/data/brand';
import { cx } from '@/lib/cx';
import { linkAttrs } from '@/components/sections/utils';

const logo = brandMark('marca-branco.svg');

export interface SiteFooterProps {
  className?: string;
}

/** Static navy footer: brand (logo, e-mail, social) | address | hours + visit booking | navigation. No client JS. */
export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cx('flj-footer', className)}>
      <div className="flj-footer__grid flj-container">
        <div className="flj-footer__brand">
          <a href="/" aria-label={`${site.name} — página inicial`}>
            {logo ? (
              <img
                className="flj-footer__logo"
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt={site.name}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="flj-wordmark flj-footer__logo">{site.name}</span>
            )}
          </a>
          <a className="flj-footer__item" href={mailto()} data-track="footer-email">
            <Icon name="mail" size={16} />
            <span>{site.email}</span>
          </a>
          <h2 id="rodape-redes" className="sr-only">
            Redes sociais
          </h2>
          <ul className="flj-footer__social" role="list" aria-labelledby="rodape-redes">
            {site.social.map((s) => (
              <li key={s.name}>
                <IconButton
                  data-track={`footer-${s.name.toLowerCase()}`}
                  className="flj-footer__social-btn"
                  icon={s.icon}
                  label={s.label}
                  variant="ghost"
                  href={s.href}
                  target="_blank"
                />
              </li>
            ))}
          </ul>
        </div>

        <section className="flj-footer__col" aria-labelledby="rodape-endereco">
          <h2 id="rodape-endereco" className="flj-footer__label">
            Endereço
          </h2>
          <address className="flj-footer__address">
            {addressLines[0]}
            <br />
            {addressLines[1]}
            <br />
            {addressLines[2]}
          </address>
          <a
            className="flj-footer__item"
            {...linkAttrs(site.links.mapLink)}
            data-track="footer-map"
          >
            <Icon name="map-pin" size={16} />
            <span>Ver no mapa</span>
          </a>
        </section>

        <section className="flj-footer__col" aria-labelledby="rodape-horarios">
          <h2 id="rodape-horarios" className="flj-footer__label">
            Horários
          </h2>
          <dl className="flj-footer__hours">
            {site.hours.map((h) => (
              <div key={h.days} className="flj-footer__hours-row">
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <a
            className="flj-footer__item"
            {...linkAttrs(site.links.visitBooking)}
            data-track="footer-visit-booking"
          >
            <Icon name="calendar" size={16} />
            <span>Agende uma visita</span>
          </a>
        </section>

        <nav className="flj-footer__col flj-footer__col--nav" aria-labelledby="rodape-navegacao">
          <h2 id="rodape-navegacao" className="flj-footer__label">
            Navegação
          </h2>
          <ul className="flj-footer__nav" role="list">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flj-footer__bottom">
        <div className="flj-footer__bottom-inner flj-container">
          <p>
            © {year} Associação {site.name}
          </p>
          <a
            {...linkAttrs(site.links.fablabNetwork)}
            data-track="footer-fablabs-network"
          >
            Parte da rede mundial de Fab Labs
            <Icon name="arrow-up-right" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
