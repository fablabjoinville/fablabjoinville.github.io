import type { ReactNode } from 'react';
import { Button } from '@/components/ui';
import { site } from '@/data/site';
import { navLinkProps } from '@/data/paths';
import { brandMark } from '@/data/brand';

const logo = brandMark('marca-azul.svg');

/** "Faça parte" lives as a button after Buscar, so it is left out of the nav links. */
const CTA_HREF = '/faca-parte';

export interface SiteHeaderProps {
  /** `Astro.url.pathname` of the page being rendered (drives the active nav item). */
  currentPath: string;
  /** Search trigger island (passed by SiteHeader.astro as the `search` slot). */
  search?: ReactNode;
  /** Mobile menu island (passed by SiteHeader.astro as the `menu` slot). */
  menu?: ReactNode;
}

/**
 * Static site header (no client JS). One row on desktop: logo · centered nav · search.
 * On ≤1024px (64em) the nav is hidden and the `menu` island (hamburger) takes over.
 */
export function SiteHeader({ currentPath, search, menu }: SiteHeaderProps) {
  return (
    <header className="flj-header">
      <div className="flj-header__bar flj-container">
        <a className="flj-header__brand" href="/" aria-label={`${site.name} — página inicial`}>
          {logo ? (
            <img
              className="flj-header__logo"
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt={site.name}
            />
          ) : (
            <span className="flj-wordmark flj-header__logo">{site.name}</span>
          )}
        </a>
        <nav className="flj-header__nav" aria-label="Principal">
          <ul className="flj-header__list" role="list">
            {site.nav
              .filter((item) => item.href !== CTA_HREF)
              .map((item) => (
                <li key={item.href}>
                  <a {...navLinkProps(currentPath, item.href, 'flj-header__link')} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
        <div className="flj-header__actions">
          {search}
          <span className="flj-header__cta">
            <Button variant="primary" size="sm" href={CTA_HREF} data-track="header-faca-parte">
              Faça parte
            </Button>
          </span>
          {menu}
        </div>
      </div>
    </header>
  );
}
