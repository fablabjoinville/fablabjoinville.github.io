/** Join the truthy class names with a space; `undefined` when none (keeps the attribute omitted). */
export function cx(...parts: Array<string | false | null | undefined>): string | undefined {
  return parts.filter(Boolean).join(' ') || undefined;
}
