/**
 * `withMarkdownFields(loader, fields)` — wraps any Content Layer loader (e.g.
 * `file('src/content/faq.yaml')`) so that the listed string fields are also
 * rendered from Markdown to HTML at load time with Astro's own pipeline
 * (`context.renderMarkdown`, same remark/rehype config as .md pages).
 *
 * For every field `x` in `fields`, the entry gets `xHtml: string` next to the
 * raw `x`. The collection schema must declare both, e.g.
 *   answer: z.string(), answerHtml: z.string()
 * Pages render it with <Prose html={entry.data.answerHtml} /> or pass it to
 * <QaList items=[{ answerHtml }]>.
 */
import type { Loader } from 'astro/loaders';

export function withMarkdownFields(loader: Loader, fields: readonly string[]): Loader {
  return {
    ...loader,
    name: `${loader.name}+markdown`,
    load: (context) =>
      loader.load({
        ...context,
        parseData: async (props) => {
          const data: Record<string, unknown> = { ...props.data };
          await Promise.all(
            fields.map(async (field) => {
              const value = data[field];
              if (typeof value === 'string') data[`${field}Html`] = (await context.renderMarkdown(value)).html;
            }),
          );
          return context.parseData({ ...props, data: data as typeof props.data });
        },
      }),
  };
}
