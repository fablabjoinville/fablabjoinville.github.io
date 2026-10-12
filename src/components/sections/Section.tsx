import type { ReactNode } from 'react';
import { Heading, slugify, type HeadingLevel } from './utils';

/**
 * <Section> — page band with the DS rhythm (96px / --space-9 block padding),
 * centred container, "// EYEBROW" label and uppercase display h2.
 *
 * Props
 *  - eyebrow?: string        rendered as "// EYEBROW" (the "//" is added by CSS)
 *  - title?: ReactNode       section heading (write sentence case; CSS uppercases)
 *  - lead?: ReactNode        optional intro paragraph under the title
 *  - id?: string             section id (deep links); heading gets `${id}-titulo`
 *  - tone?: 'page' | 'paper' | 'inverse' | 'muted'   (default 'page')
 *  - action?: ReactNode      right-aligned element in the header row (e.g. a ghost Button)
 *  - headingLevel?: 2 | 3    (default 2)
 *  - narrow?: boolean        constrain content to reading width
 *  - className?: string
 *  - children
 *
 * Without `title`/`eyebrow`, no header row is rendered. The section is labelled
 * by its heading (aria-labelledby).
 */
export interface SectionProps {
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  id?: string;
  tone?: 'page' | 'paper' | 'inverse' | 'muted';
  action?: ReactNode;
  headingLevel?: HeadingLevel;
  narrow?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Section({
  eyebrow,
  title,
  lead,
  id,
  tone = 'page',
  action,
  headingLevel = 2,
  narrow,
  className,
  children,
}: SectionProps) {
  const headingId = title
    ? `${id ?? (typeof title === 'string' ? slugify(title) : 'secao')}-titulo`
    : undefined;
  const cls = ['flj-section', `flj-section--${tone}`, narrow && 'flj-section--narrow', className]
    .filter(Boolean)
    .join(' ');
  const hasHeader = Boolean(eyebrow || title || action || lead);

  return (
    <section id={id} className={cls} aria-labelledby={headingId}>
      <div className="flj-container flj-section__inner">
        {hasHeader && (
          <div className="flj-section__header">
            <div className="flj-section__heading">
              {eyebrow && <p className="flj-eyebrow flj-section__eyebrow">{eyebrow}</p>}
              {title && (
                <Heading level={headingLevel} id={headingId} className="flj-section__title">
                  {title}
                </Heading>
              )}
              {lead && <p className="flj-section__lead">{lead}</p>}
            </div>
            {action && <div className="flj-section__action">{action}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
