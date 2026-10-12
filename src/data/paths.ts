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
