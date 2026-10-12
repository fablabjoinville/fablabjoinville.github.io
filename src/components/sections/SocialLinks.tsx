import { IconButton } from '@/components/ui';
import { site } from '@/data/site';

/**
 * <SocialLinks> — row of square icon links for the profiles in
 * `site.social` (src/data/site.ts): brand glyphs, aria-label from `label`,
 * new tab, data-track="<name lowercased>" (instagram, linkedin, whatsapp, youtube).
 *
 * Props
 *  - variant?: 'light' | 'dark'   'light' = on white/paper (navy outline buttons),
 *                                 'dark' = on navy bands (white glyphs). Default 'light'.
 *  - only?: string[]              subset by name, e.g. ['Instagram', 'LinkedIn', 'WhatsApp']
 *  - size?: number                button side in px (default 44)
 *  - label?: string               accessible name of the list (default "Redes sociais")
 */
export interface SocialLinksProps {
  variant?: 'light' | 'dark';
  only?: string[];
  size?: number;
  label?: string;
  className?: string;
}

export function SocialLinks({ variant = 'light', only, size = 44, label = 'Redes sociais', className }: SocialLinksProps) {
  const items = only ? site.social.filter((s) => only.includes(s.name)) : site.social;
  return (
    <ul
      className={['flj-social', `flj-social--${variant}`, className].filter(Boolean).join(' ')}
      role="list"
      aria-label={label}
    >
      {items.map((s) => (
        <li key={s.name}>
          <IconButton
            icon={s.icon}
            label={s.label}
            variant={variant === 'dark' ? 'ghost' : 'secondary'}
            size={size}
            href={s.href}
            target="_blank"
            className="flj-social__btn"
            data-track={s.name.toLowerCase()}
          />
        </li>
      ))}
    </ul>
  );
}
