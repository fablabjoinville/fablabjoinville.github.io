import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Heading, headingIdFor, type HeadingLevel } from './utils';

/**
 * <CtaBand> — full-bleed flat navy band with "// EYEBROW", uppercase title,
 * optional text and an action row. Put at most one accent Button in `actions`;
 * use variant="inverse" for secondary actions on navy.
 *
 * Props
 *  - title: ReactNode; eyebrow?: string; text?: ReactNode
 *  - actions?: ReactNode   (from .astro pass it as a named slot:
 *                            <Fragment slot="actions"><Button .../></Fragment>)
 *  - id?: string; headingLevel?: 2 | 3 (default 2)
 */
export interface CtaBandProps {
  title: ReactNode;
  eyebrow?: string;
  text?: ReactNode;
  actions?: ReactNode;
  id?: string;
  headingLevel?: HeadingLevel;
  className?: string;
}

export function CtaBand({ title, eyebrow, text, actions, id, headingLevel = 2, className }: CtaBandProps) {
  const headingId = headingIdFor(id, title, 'cta');
  return (
    <section id={id} className={cx('flj-ctaband', className)} aria-labelledby={headingId}>
      <div className="flj-container flj-ctaband__inner">
        <div className="flj-ctaband__text">
          {eyebrow && <p className="flj-eyebrow flj-ctaband__eyebrow">{eyebrow}</p>}
          <Heading level={headingLevel} id={headingId} className="flj-ctaband__title">
            {title}
          </Heading>
          {text && <p className="flj-ctaband__body">{text}</p>}
        </div>
        {actions && <div className="flj-ctaband__actions">{actions}</div>}
      </div>
    </section>
  );
}
