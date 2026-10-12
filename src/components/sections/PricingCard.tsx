import type { ReactNode } from 'react';
import { Button } from '@/components/ui';
import type { ImageSource } from '@/lib/images';
import { Picture } from './Picture';
import { Heading, isExternal, type HeadingLevel } from './utils';

/**
 * <PricingCard> — membership plan card (Corporate / Lab / Academy Maker):
 * photo on top, mono eyebrow, name, description, a ruled price table with
 * mono amounts and a full-width CTA.
 *
 * Props
 *  - name: string; eyebrow?: string
 *  - description?: ReactNode   short plain text; or pass rich HTML via `children`
 *  - children?: ReactNode      rendered after the description (e.g. <Prose html/>)
 *  - image?: ImageSource; imageAlt?: string
 *  - prices: { amount: string; period: string }[]   e.g. { amount: 'R$ 100,00', period: '/mês' }
 *                                                   (empty array → no price table)
 *  - cta?: { label: string; href: string; track?: string; variant?: 'primary'|'accent'|'secondary' }
 *      external http(s) links open in a new tab; mailto links stay in the tab.
 *      Default variant 'primary' (keep ≤1 accent CTA per view).
 *  - headingLevel?: 3 | 4 (default 3)
 */
export interface PricingPrice {
  amount: string;
  period: string;
}

export interface PricingCta {
  label: string;
  href: string;
  track?: string;
  variant?: 'primary' | 'accent' | 'secondary';
}

export interface PricingCardProps {
  name: string;
  eyebrow?: string;
  description?: ReactNode;
  image?: ImageSource;
  imageAlt?: string;
  prices: PricingPrice[];
  cta?: PricingCta;
  headingLevel?: HeadingLevel;
  className?: string;
  children?: ReactNode;
}

export function PricingCard({
  name,
  eyebrow,
  description,
  image,
  imageAlt,
  prices,
  cta,
  headingLevel = 3,
  className,
  children,
}: PricingCardProps) {
  const external = cta ? isExternal(cta.href) : false;
  return (
    <article className={['flj-pricing', className].filter(Boolean).join(' ')}>
      {image && (
        <div className="flj-pricing__media">
          <Picture
            image={image}
            alt={imageAlt ?? `Foto ilustrativa do plano ${name}`}
            sizes="(min-width: 60em) 25rem, (min-width: 40em) 50vw, 100vw"
            className="flj-pricing__img"
          />
        </div>
      )}
      <div className="flj-pricing__body">
        {eyebrow && <p className="flj-eyebrow">{eyebrow}</p>}
        <Heading level={headingLevel} className="flj-pricing__name">
          {name}
        </Heading>
        {description && <p className="flj-pricing__desc">{description}</p>}
        {children && <div className="flj-pricing__extra">{children}</div>}
        {prices.length > 0 && (
          <dl className="flj-pricing__prices">
            {prices.map((p) => (
              <div key={`${p.amount}${p.period}`} className="flj-pricing__price">
                <dt className="flj-pricing__amount">{p.amount}</dt>
                <dd className="flj-pricing__period">{p.period}</dd>
              </div>
            ))}
          </dl>
        )}
        {cta && (
          <div className="flj-pricing__cta">
            <Button
              variant={cta.variant ?? 'primary'}
              size="lg"
              fullWidth
              href={cta.href}
              target={external ? '_blank' : undefined}
              iconRight={external ? 'arrow-up-right' : 'arrow-right'}
              data-track={cta.track}
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
