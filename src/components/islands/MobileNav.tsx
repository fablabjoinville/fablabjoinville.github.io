import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Button, Icon } from '@/components/ui';
import { navLinkProps } from '@/data/paths';
import { withIslandBoundary } from './IslandBoundary';

export type MobileNavProps = {
  items: ReadonlyArray<{ label: string; href: string }>;
  currentPath: string;
  /** Primary CTA repeated at the bottom of the menu. */
  cta?: { label: string; href: string };
};

const FOCUSABLE = 'summary, a[href], button:not([disabled])';

/**
 * Full-screen navy menu for ≤960px.
 *
 * Built on <details>/<summary> so the SSR markup opens and closes without JS.
 * Once hydrated it adds: Escape to close (focus returns to the toggle), focus
 * moves into the menu on open, Tab is kept inside toggle + menu, page scroll is
 * locked while open, and the menu closes if the viewport grows past the breakpoint.
 */
function MobileNavImpl({ items, currentPath, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const panelId = useId();

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) summaryRef.current?.focus();
  }, []);

  // Keep React state in sync with the native toggle (click/Enter/Space on <summary>).
  const onToggle = () => setOpen(detailsRef.current?.open ?? false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('flj-scroll-lock', open);
    if (!open) return;

    // Move focus to the first menu link.
    detailsRef.current?.querySelector<HTMLElement>('.flj-mnav__panel a[href]')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== 'Tab' || !detailsRef.current) return;
      const nodes = Array.from(detailsRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia('(min-width: 64.0625em)');
    const onMedia = () => desktop.matches && close(false);

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onMedia);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onMedia);
      root.classList.remove('flj-scroll-lock');
    };
  }, [open, close]);

  return (
    <details ref={detailsRef} className="flj-mnav" open={open} onToggle={onToggle}>
      <summary
        ref={summaryRef}
        className="flj-mnav__toggle"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-controls={panelId}
      >
        <Icon name="menu" size={22} className="flj-mnav__icon flj-mnav__icon--open" />
        <Icon name="x" size={22} className="flj-mnav__icon flj-mnav__icon--close" />
      </summary>
      <div id={panelId} className="flj-mnav__panel">
        <nav aria-label="Menu principal">
          <p className="flj-mnav__eyebrow flj-eyebrow">Menu</p>
          <ul className="flj-mnav__list" role="list">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  {...navLinkProps(currentPath, item.href, 'flj-mnav__link')}
                  href={item.href}
                  onClick={() => close(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {cta && (
            <div className="flj-mnav__cta" data-track="mobile_nav_cta">
              <Button
                variant="accent"
                size="lg"
                fullWidth
                iconRight="arrow-right"
                href={cta.href}
                onClick={() => close(false)}
              >
                {cta.label}
              </Button>
            </div>
          )}
        </nav>
      </div>
    </details>
  );
}

export const MobileNav = withIslandBoundary(MobileNavImpl, 'MobileNav');
export default MobileNav;
