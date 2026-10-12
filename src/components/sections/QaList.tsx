import { Icon } from '@/components/ui';
import { Heading, stripHtml, type HeadingLevel } from './utils';

/**
 * <QaList> — accordion of questions built on native <details>/<summary>
 * (works without JS). Used by /faq and /cultura (Fab Charter).
 *
 * Props
 *  - items: { id: string; question: string; answerHtml: string; legacyId?: string }[]
 *      id        → id of the <details> (deep link: /faq#<id>)
 *      legacyId  → empty <span id={legacyId}> inside the summary so old Google
 *                  Sites anchors (e.g. #h.pd04zm4v4znq) keep working
 *      answerHtml→ trusted build-time HTML (e.g. `entry.data.answerHtml`)
 *  - headingLevel?: 2 | 3 (default 3) — the question is a heading inside <summary>
 *  - openFirst?: boolean — first item starts open
 *
 * A tiny inline script opens the item targeted by the URL hash (on load and on
 * hashchange), including legacy ids. Without JS the browser still scrolls to it.
 *
 * Also exports `faqJsonLd(items)` → schema.org FAQPage object for
 * <BaseLayout jsonLd={faqJsonLd(items)}>. Answers are converted to plain text.
 */
export interface QaItem {
  id: string;
  question: string;
  answerHtml: string;
  legacyId?: string;
}

export interface QaListProps {
  items: QaItem[];
  headingLevel?: HeadingLevel;
  openFirst?: boolean;
  className?: string;
}

const OPEN_FROM_HASH = `(function(){function o(){var h=location.hash.slice(1);if(!h)return;var t;try{t=document.getElementById(decodeURIComponent(h))}catch(e){return}var d=t&&t.closest('details.flj-qa__item');if(d&&!d.open){d.open=true;t.scrollIntoView()}}o();addEventListener('hashchange',o)})();`;

export function QaList({ items, headingLevel = 3, openFirst, className }: QaListProps) {
  return (
    <div className={['flj-qa', className].filter(Boolean).join(' ')}>
      {items.map((item, i) => (
        <details key={item.id} id={item.id} className="flj-qa__item" open={openFirst && i === 0 ? true : undefined}>
          <summary className="flj-qa__summary">
            {item.legacyId && <span id={item.legacyId} className="flj-qa__anchor" />}
            <Heading level={headingLevel} className="flj-qa__question">
              {item.question}
            </Heading>
            <Icon name="chevron-down" size={24} className="flj-qa__chevron" />
          </summary>
          <div className="flj-qa__answer flj-prose" dangerouslySetInnerHTML={{ __html: item.answerHtml }} />
        </details>
      ))}
      <script dangerouslySetInnerHTML={{ __html: OPEN_FROM_HASH }} />
    </div>
  );
}

/** schema.org FAQPage JSON-LD for a list of Q&A items. */
export function faqJsonLd(items: Pick<QaItem, 'question' | 'answerHtml'>[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.answerHtml) },
    })),
  };
}
