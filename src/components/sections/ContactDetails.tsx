import { Button, Icon } from '@/components/ui';
import { addressLines, mailto, site } from '@/data/site';
import { cx } from '@/lib/cx';
import { Heading, type HeadingLevel } from './utils';

/**
 * Static building blocks of <ContactBlock> (ContactBlock.astro), also usable on
 * their own. All data comes from src/data/site.ts (single source of truth for
 * email, address and hours — never hard-code them in pages).
 *
 *  - <ContactDetails headingLevel?={3} />  E-mail (mailto, data-track="mailto-contact"),
 *        Localização (address) and Horários (<dl>, mono times).
 *  - <VisitCard headingLevel?={3} />       navy card "Agende a sua Visita" with the
 *        accent CTA "Escolher data e horário" → site.links.visitBooking
 *        (new tab, data-track="visit-booking"). This is the view's one accent CTA.
 */
export interface ContactDetailsProps {
  headingLevel?: HeadingLevel;
  className?: string;
}

export function ContactDetails({ headingLevel = 3, className }: ContactDetailsProps) {
  return (
    <div className={cx('flj-contact', className)}>
      <div className="flj-contact__item">
        <Heading level={headingLevel} className="flj-contact__label">
          <Icon name="mail" size={18} />
          E-mail
        </Heading>
        <a className="flj-contact__email" href={mailto()} data-track="mailto-contact">
          {site.email}
        </a>
      </div>
      <div className="flj-contact__item">
        <Heading level={headingLevel} className="flj-contact__label">
          <Icon name="map-pin" size={18} />
          Localização
        </Heading>
        <address className="flj-contact__address">
          {addressLines[0]}
          <br />
          {addressLines[1]},
          <br />
          {addressLines[2]}.
        </address>
      </div>
      <div className="flj-contact__item">
        <Heading level={headingLevel} className="flj-contact__label">
          <Icon name="clock" size={18} />
          Horários
        </Heading>
        <dl className="flj-contact__hours">
          {site.hours.map((h) => (
            <div key={h.days} className="flj-contact__hours-row">
              <dt>{h.days}</dt>
              <dd>{h.time}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export interface VisitCardProps {
  headingLevel?: HeadingLevel;
  className?: string;
}

export function VisitCard({ headingLevel = 3, className }: VisitCardProps) {
  return (
    <div className={cx('flj-visit', className)}>
      <p className="flj-eyebrow flj-visit__eyebrow">Conheça o Espaço</p>
      <Heading level={headingLevel} className="flj-visit__title">
        Agende a sua Visita
      </Heading>
      <p className="flj-visit__text">
        Quer conhecer as nossas tecnologias, desenvolver um projeto ou fazer uma visita guiada? Agende um
        horário com a nossa equipe.
      </p>
      <Button
        variant="accent"
        size="lg"
        href={site.links.visitBooking}
        target="_blank"
        iconRight="arrow-right"
        data-track="visit-booking"
      >
        Escolher data e horário
      </Button>
    </div>
  );
}
