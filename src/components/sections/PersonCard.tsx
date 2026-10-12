import { IconButton } from '@/components/ui';
import type { ImageSource } from '@/lib/images';
import { Picture } from './Picture';
import { Heading, type HeadingLevel } from './utils';

/**
 * <PersonCard> — team / board member: square photo with a 2px navy rule, name,
 * mono uppercase role label and an optional LinkedIn icon link
 * (aria-label "LinkedIn de <name>", data-track="linkedin").
 *
 * Props
 *  - name: string; role?: string
 *  - image?: ImageSource; imageAlt?: string (defaults to "Foto de <name>")
 *  - linkedin?: string (https URL)
 *  - headingLevel?: 3 | 4 (default 3)
 *
 * Use inside <CardGrid columns={4} as="ul"> with each card in an <li>, or plain.
 */
export interface PersonCardProps {
  name: string;
  role?: string;
  image?: ImageSource;
  imageAlt?: string;
  linkedin?: string;
  headingLevel?: HeadingLevel;
  className?: string;
}

export function PersonCard({ name, role, image, imageAlt, linkedin, headingLevel = 3, className }: PersonCardProps) {
  return (
    <article className={['flj-person', className].filter(Boolean).join(' ')}>
      <div className="flj-person__media">
        {image ? (
          <Picture
            image={image}
            alt={imageAlt ?? `Foto de ${name}`}
            sizes="(min-width: 60em) 17rem, (min-width: 40em) 50vw, 100vw"
            className="flj-person__img"
          />
        ) : (
          <span className="flj-person__placeholder" aria-hidden="true">
            {name
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part.charAt(0))
              .join('')}
          </span>
        )}
      </div>
      <div className="flj-person__body">
        <div>
          <Heading level={headingLevel} className="flj-person__name">
            {name}
          </Heading>
          {role && <p className="flj-person__role">{role}</p>}
        </div>
        {linkedin && (
          <IconButton
            icon="linkedin"
            label={`LinkedIn de ${name}`}
            variant="ghost"
            size={36}
            href={linkedin}
            target="_blank"
            data-track="linkedin"
          />
        )}
      </div>
    </article>
  );
}
