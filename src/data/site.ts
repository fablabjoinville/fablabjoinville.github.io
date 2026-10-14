/**
 * Site-wide facts: identity, contact, hours, links, social profiles and navigation.
 * Single source of truth for the layout, SEO/JSON-LD and page content.
 *
 * The object is validated with zod at module load (fails the build on bad data)
 * and exported `as const` so consumers keep literal types.
 *
 * NOTE: this module imports zod, so import it only from server-rendered code
 * (Astro components, static TSX). Pass the values islands need as props.
 */
import { z } from 'astro/zod';

const httpsUrl = z.url({ protocol: /^https$/ });
const sitePath = z.string().regex(/^\/[a-z0-9\-/]*$/, 'Caminho interno inválido');
const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use HH:MM');
const dayOfWeek = z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

export const siteSchema = z.object({
  name: z.string().min(1),
  siteTitle: z.string().min(1),
  description: z.string().min(50).max(170),
  url: httpsUrl,
  email: z.email(),
  address: z.object({
    building: z.string(),
    street: z.string(),
    district: z.string(),
    city: z.string(),
    state: z.string().length(2),
    country: z.string().length(2),
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  /** Human-readable hours, as shown on the site. */
  hours: z.array(z.object({ days: z.string(), time: z.string() })).min(1),
  /** Machine-readable hours for schema.org `openingHoursSpecification`. */
  openingHours: z
    .array(z.object({ dayOfWeek: z.array(dayOfWeek).min(1), opens: hhmm, closes: hhmm }))
    .min(1),
  links: z.object({
    visitBooking: httpsUrl,
    membershipForm: httpsUrl,
    mapEmbed: httpsUrl,
    mapLink: httpsUrl,
    fablabNetwork: httpsUrl,
  }),
  social: z
    .array(
      z.object({
        name: z.string(),
        /** Icon name registered in `@/components/ui` (src/components/ui/core/icons.ts). */
        icon: z.string(),
        href: httpsUrl,
        /** Short accessible label (pt-BR). */
        label: z.string(),
      }),
    )
    .min(1),
  beholdFeedId: z.string().min(1),
  nav: z.array(z.object({ label: z.string(), href: sitePath })).min(1),
});

export type Site = z.infer<typeof siteSchema>;

const data = {
  name: 'Fab Lab Joinville',
  siteTitle: 'FabLab Joinville',
  description:
    'Laboratório de fabricação digital aberto e sem fins lucrativos em Joinville/SC: impressão 3D, corte a laser, CNC, eletrônica e robótica. Oficinas, eventos e projetos.',
  // Keep in sync with `site` in astro.config.mjs.
  url: 'https://www.fablabjoinville.com.br',
  email: 'contato@fablabjoinville.com.br',
  address: {
    building: 'Ágora Tech Park, Prédio Ágora Uni, Térreo',
    street: 'Rua Dona Francisca, 8300',
    district: 'Distrito Industrial',
    city: 'Joinville',
    state: 'SC',
    country: 'BR',
    lat: -26.2347,
    lng: -48.8831,
  },
  hours: [
    { days: 'Seg. à Quinta', time: '10:30 às 19:00' },
    { days: 'Sexta-feira', time: '10:30 às 17:00' },
    { days: 'Sábados', time: 'somente eventos agendados' },
  ],
  openingHours: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '10:30', closes: '19:00' },
    { dayOfWeek: ['Friday'], opens: '10:30', closes: '17:00' },
  ],
  links: {
    visitBooking: 'https://calendar.app.google/H1CyzR5XcDH9s6Fo7',
    membershipForm:
      'https://docs.google.com/forms/d/e/1FAIpQLSfxX9-qFL0dST55psG44gDg2lc0aHs2SS_iiG1FL6lFw8eWiA/viewform',
    // OpenStreetMap (no cookies/tracking): marker on the Fab Lab, Ágora Tech Park.
    mapEmbed:
      'https://www.openstreetmap.org/export/embed.html?bbox=-48.8871%2C-26.2372%2C-48.8791%2C-26.2322&layer=mapnik&marker=-26.2347%2C-48.88307',
    // External "open in maps" link stays on Google Maps (familiar for visitors).
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Fab%20Lab%20Joinville',
    fablabNetwork: 'https://www.fablabs.io/labs/map',
  },
  social: [
    {
      name: 'Instagram',
      icon: 'instagram',
      href: 'https://www.instagram.com/fablabjoinville',
      label: 'Fab Lab Joinville no Instagram',
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      href: 'https://www.linkedin.com/company/fablabjoinville',
      label: 'Fab Lab Joinville no LinkedIn',
    },
    {
      name: 'WhatsApp',
      icon: 'whatsapp',
      href: 'https://chat.whatsapp.com/F9qpOQNBrPw3Exuc2wDLTn',
      label: 'Comunidade do Fab Lab Joinville no WhatsApp',
    },
    {
      name: 'YouTube',
      icon: 'youtube',
      href: 'https://www.youtube.com/channel/UC4GLrrHRTb-Oo8Mc5NngGpg',
      label: 'Fab Lab Joinville no YouTube',
    },
  ],
  beholdFeedId: 'DaYBAvdew6N21sUyAHAs',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Faça parte', href: '/faca-parte' },
    { label: 'Nossa estrutura', href: '/estrutura' },
    { label: 'Fab Charter', href: '/cultura' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'FAQ', href: '/faq' },
  ],
} as const satisfies z.input<typeof siteSchema>;

// Throws at module load (i.e. during `astro build`/`astro dev`) if the data is invalid.
siteSchema.parse(data);

export const site = data;

export type NavItem = (typeof site.nav)[number];
export type SocialLink = (typeof site.social)[number];

/** Instagram profile URL (single source for pages that link to it). */
export const instagramUrl = site.social.find((s) => s.icon === 'instagram')!.href;

/** Address as three lines: building / street / "district, city/state" (no trailing punctuation). */
export const addressLines: string[] = [
  site.address.building,
  site.address.street,
  `${site.address.district}, ${site.address.city}/${site.address.state}`,
];

/** Full postal address on one line, e.g. for `title`/`aria-label`. */
export const fullAddress = addressLines.join(', ');


/** `mailto:` link to the site e-mail with optional prefilled subject/body ('/' kept unescaped). */
export function mailto(subject?: string, body?: string): string {
  const enc = (v: string) => encodeURIComponent(v).replace(/%2F/g, '/');
  const params = [subject !== undefined && `subject=${enc(subject)}`, body !== undefined && `body=${enc(body)}`].filter(Boolean);
  return `mailto:${site.email}${params.length ? `?${params.join('&')}` : ''}`;
}
