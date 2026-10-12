/**
 * Path helpers with no dependencies — safe to import from client islands.
 */

/** `true` when `href` is the current page (or a section of it). Trailing slashes are ignored. */
export function isActivePath(currentPath: string, href: string): boolean {
  const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
  const current = normalize(currentPath);
  const target = normalize(href);
  if (target === '/') return current === '/';
  return current === target || current.startsWith(`${target}/`);
}

/** `className` (+ `--active` modifier) and `aria-current` for a nav link, given its BEM base class. */
export function navLinkProps(
  currentPath: string,
  href: string,
  baseClass: string,
): { className: string; 'aria-current': 'page' | undefined } {
  const active = isActivePath(currentPath, href);
  return {
    className: `${baseClass}${active ? ` ${baseClass}--active` : ''}`,
    'aria-current': active ? 'page' : undefined,
  };
}
