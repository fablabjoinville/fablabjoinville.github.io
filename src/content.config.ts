/**
 * Content collections (Astro 7 Content Layer).
 *
 * PATH RULES
 *  - `file('<path>')` and `glob({ base })` paths are relative to the PROJECT ROOT
 *    (resolved with `new URL(path, config.root)`), e.g. 'src/content/team.yaml'.
 *  - `.yaml`/`.yml` files are parsed natively by `file()` (no `parser` option
 *    needed). The file must be a top-level ARRAY of objects and EVERY item needs a
 *    unique `id` (duplicates are reported; items without id are skipped).
 *  - `image()` paths are resolved by Vite relative to the FILE THAT CONTAINS THEM
 *    (the yaml file or the .md file), not to the project root:
 *      src/content/team.yaml           → photo: ../assets/old-site/sobre/equipe-felipe-segui.jpg
 *      src/content/projects/arduino.md → src: ../../assets/old-site/portfolio/arduino-day-1.jpg
 *    The "@/assets/..." alias also resolves (tsconfig paths), but prefer relative
 *    paths. A missing file fails the build ("Image ... does not exist").
 *  - Markdown string fields in yaml (faq/charter `answer`, resources `body`,
 *    memberships `body`) are rendered at load time to `<field>Html`
 *    (see src/loaders/markdown-fields.ts). Use the `*Html` field in pages.
 *  - Markdown bodies of glob collections (pages, projects) are rendered by Astro:
 *    use `entry.rendered?.html` (string) or `const { Content } = await render(entry)`.
 *  - Sort with `order` (ascending). `src/lib/content-guard.ts` asserts entry counts.
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { beholdLoader } from './loaders/behold';
import { withMarkdownFields } from './loaders/markdown-fields';

/** https URL, mailto: link or internal path ("/faca-parte", "#contato"). */
const href = z
  .string()
  .regex(/^(https:\/\/|mailto:|\/|#)/, 'Use https://, mailto:, an internal path (/...) or #anchor');

/** Short analytics id for data-track, e.g. "membership-form". */
const track = z.string().regex(/^[a-z0-9][a-z0-9_-]*$/, 'Use lowercase kebab-case, e.g. "visit-booking"');

const link = z.object({ label: z.string().min(1), href, track: track.optional() });

/** Require `<imageKey>Alt` whenever `<imageKey>` is set. */
function altRequired<T extends Record<string, unknown>>(imageKey: keyof T & string, altKey: keyof T & string) {
  return (data: T, ctx: z.RefinementCtx) => {
    if (data[imageKey] && !(typeof data[altKey] === 'string' && (data[altKey] as string).trim())) {
      ctx.addIssue({ code: 'custom', path: [altKey], message: `${altKey} is required when ${imageKey} is set` });
    }
  };
}

/** Inner pages copy (title band + SEO). Body markdown = optional long text. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        description: z.string().min(1),
        eyebrow: z.string().optional(),
        lead: z.string().optional(),
        headerImage: image().optional(),
        headerImageAlt: z.string().optional(),
      })
      .superRefine(altRequired('headerImage', 'headerImageAlt')),
});

const team = defineCollection({
  loader: file('src/content/team.yaml'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: z.string().min(1),
      role: z.string().optional(),
      group: z.enum(['equipe', 'diretivo', 'fiscal']),
      order: z.number(),
      photo: image(),
      photoAlt: z.string().min(1),
      linkedin: z.url().optional(),
    }),
});

const sponsors = defineCollection({
  loader: file('src/content/sponsors.yaml'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: z.string().min(1),
      url: z.url().optional(),
      logo: image(),
      order: z.number(),
    }),
});

const resources = defineCollection({
  loader: withMarkdownFields(file('src/content/resources.yaml'), ['body']),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string().min(1),
      body: z.string(),
      bodyHtml: z.string(),
      image: image(),
      imageAlt: z.string().min(1),
      order: z.number(),
    }),
});

const memberships = defineCollection({
  loader: withMarkdownFields(file('src/content/memberships.yaml'), ['body']),
  schema: ({ image }) =>
    z
      .object({
        id: z.string(),
        name: z.string().min(1),
        eyebrow: z.string().optional(),
        body: z.string(),
        bodyHtml: z.string(),
        image: image().optional(),
        imageAlt: z.string().optional(),
        prices: z.array(z.object({ amount: z.string().min(1), period: z.string().min(1) })).default([]),
        cta: z.object({ label: z.string().min(1), href, track }),
        order: z.number(),
      })
      .superRefine(altRequired('image', 'imageAlt')),
});

const benefits = defineCollection({
  loader: file('src/content/benefits.yaml'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      caption: z.string().min(1),
      image: image(),
      imageAlt: z.string().min(1),
      order: z.number(),
    }),
});

const qaSchema = z.object({
  id: z.string(),
  question: z.string().min(1),
  answer: z.string().min(1),
  answerHtml: z.string(),
  /** Old Google Sites heading anchor, e.g. "h.pd04zm4v4znq" (kept as an alias id). */
  legacyId: z.string().optional(),
  order: z.number(),
});

const faq = defineCollection({
  loader: withMarkdownFields(file('src/content/faq.yaml'), ['answer']),
  schema: qaSchema,
});

const charter = defineCollection({
  loader: withMarkdownFields(file('src/content/charter.yaml'), ['answer']),
  schema: qaSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      kind: z.enum(['projeto', 'incubada']),
      order: z.number(),
      eyebrow: z.string().optional(),
      images: z.array(z.object({ src: image(), alt: z.string().min(1) })).default([]),
      links: z.array(link).optional(),
      video: z
        .object({
          provider: z.enum(['youtube', 'drive']),
          id: z.string().min(1),
          title: z.string().min(1),
        })
        .optional(),
    }),
});

const lerobotVideos = defineCollection({
  loader: file('src/content/lerobot-videos.yaml'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      team: z.string().min(1),
      driveId: z.string().min(1),
      poster: image(),
      posterAlt: z.string().min(1),
      aspect: z.enum(['16/9', '9/16']),
      duration: z.string().optional(),
      order: z.number(),
    }),
});

const instagram = defineCollection({ loader: beholdLoader });

export const collections = {
  pages,
  team,
  sponsors,
  resources,
  memberships,
  benefits,
  faq,
  charter,
  projects,
  lerobotVideos,
  instagram,
};
