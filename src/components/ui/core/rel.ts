/** `rel` for links: explicit value wins; `target="_blank"` defaults to "noopener noreferrer". */
export function relFor(target?: string, rel?: string): string | undefined {
  return rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);
}
