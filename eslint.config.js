// ESLint flat config for the Fab Lab Joinville site (Astro + React islands).
//
// Provenance: the design-system adherence rules below are ported from the
// Claude Design snapshot at design-system/_adherence.oxlintrc.json. They live
// in ESLint rather than oxlint because oxlint cannot run `no-restricted-syntax`
// (AST selectors) and cannot lint .astro templates. eslint-plugin-astro parses
// .astro templates into a JSX-like AST, so the same JSXOpeningElement selectors
// match both .tsx and .astro files.
//
// Deviations from the source file (deliberate):
//  - severity is "error" instead of "warn";
//  - duplicated `style|children` entries in the allowed-prop regexes are deduped;
//  - extra props for the site's link-capable components: Button/IconButton/Card/
//    EventCard accept href, target, rel; Card accepts `as`; EventCard accepts
//    imageAlt; every component accepts `data-*` attributes (CTA tracking);
//  - raw hex / raw px literal checks only apply to src/components/** and
//    src/pages/** (.tsx/.astro);
//  - no-restricted-imports targets src/components/ui (the React port of the
//    design system) instead of the snapshot's own folder layout.

import { defineConfig, globalIgnores } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

// ---------------------------------------------------------------------------
// Design-system component prop contracts (from design-system/components/**/X.d.ts)
// ---------------------------------------------------------------------------

/**
 * Props every component accepts on top of its declared ones. `data-*` attributes
 * (e.g. data-track="visit-booking") are forwarded by Button, IconButton and Card.
 * Entries are regex fragments joined into the allowed-name pattern.
 */
const PASSTHROUGH = ['key', 'ref', 'className', 'style', 'children', 'data-[a-z0-9-]+'];
const LINK_PROPS = ['href', 'target', 'rel'];
const TONES = ['neutral', 'primary', 'accent', 'success', 'warning', 'danger', 'info'];

/**
 * name -> { props: declared props (listed in the message), enums: { prop: allowed literals } }
 * Enum checks only fire for string-literal attribute values (e.g. variant="x"),
 * matching the original selectors.
 */
const COMPONENTS = {
  Badge: { props: ['tone', 'children', 'style'], enums: { tone: TONES } },
  Button: {
    props: ['variant', 'size', 'icon', 'iconRight', 'disabled', 'fullWidth', 'type', 'onClick', 'children', 'style', ...LINK_PROPS],
    enums: {
      variant: ['primary', 'accent', 'secondary', 'ghost', 'inverse'],
      size: ['sm', 'md', 'lg'],
      type: ['button', 'submit'],
    },
  },
  Card: {
    props: ['children', 'variant', 'interactive', 'padding', 'onClick', 'style', 'as', ...LINK_PROPS],
    enums: { variant: ['outline', 'paper', 'inverse'] },
  },
  Checkbox: { props: ['label', 'checked', 'defaultChecked', 'onChange', 'disabled'] },
  Dialog: { props: ['open', 'title', 'children', 'actions', 'onClose', 'width', 'inline'] },
  EventCard: {
    props: ['image', 'imageAlt', 'day', 'month', 'title', 'kind', 'description', 'place', 'time', 'badge', 'badgeTone', 'onClick', ...LINK_PROPS],
    enums: { badgeTone: TONES },
  },
  Icon: { props: ['name', 'size', 'color', 'style'] },
  IconButton: {
    props: ['icon', 'label', 'variant', 'size', 'disabled', 'onClick', 'style', ...LINK_PROPS],
    enums: { variant: ['primary', 'secondary', 'ghost'] },
  },
  Input: {
    props: ['label', 'hint', 'error', 'placeholder', 'value', 'defaultValue', 'onChange', 'type', 'disabled', 'multiline', 'rows', 'style'],
  },
  Radio: {
    props: ['name', 'options', 'value', 'defaultValue', 'onChange', 'direction'],
    enums: { direction: ['row', 'column'] },
  },
  Select: { props: ['label', 'options', 'value', 'defaultValue', 'onChange', 'disabled', 'style'] },
  Switch: { props: ['label', 'checked', 'defaultChecked', 'onChange', 'disabled'] },
  Tabs: { props: ['tabs', 'value', 'defaultValue', 'onChange'] },
  Tag: { props: ['children', 'selected', 'onClick', 'onRemove'] },
  Toast: {
    props: ['tone', 'title', 'children', 'onClose'],
    enums: { tone: ['success', 'info', 'warning', 'danger'] },
  },
  Tooltip: {
    props: ['content', 'children', 'placement', 'open'],
    enums: { placement: ['top', 'bottom'] },
  },
};

const quoteList = (values) => values.map((v) => `'${v}'`).join(' | ');

/** Same selector shapes as the adherence file, generated from COMPONENTS. */
const componentSelectors = Object.entries(COMPONENTS).flatMap(([name, { props, enums = {} }]) => {
  const allowed = [...new Set([...props, ...PASSTHROUGH])];
  return [
    {
      selector: `JSXOpeningElement[name.name='${name}'] > JSXAttribute > JSXIdentifier[name!=/^(?:${allowed.join('|')})$/]`,
      message: `<${name}> doesn't accept that prop. Declared props: ${props.join(', ')}.`,
    },
    ...Object.entries(enums).map(([prop, values]) => ({
      selector: `JSXOpeningElement[name.name='${name}'] > JSXAttribute[name.name='${prop}'] > Literal[value!=/^(?:${values.join('|')})$/]`,
      message: `<${name}> ${prop} must be one of ${quoteList(values)}.`,
    })),
  ];
});

const fontFamilySelector = {
  selector: String.raw`Literal[value=/font-family\s*:\s*(?!['\"]?(?:JetBrains Mono|IBM Plex Sans))/i]`,
  message: 'Font not provided by the design system. Available: JetBrains Mono, IBM Plex Sans.',
};

const rawValueSelectors = [
  {
    selector: String.raw`Literal[value=/#[0-9a-fA-F]{3,8}\b/]`,
    message: 'Raw hex color — use a design-system color token via var().',
  },
  {
    selector: String.raw`Literal[value=/\b\d+px\b/]`,
    message: 'Raw px value — use a design-system spacing token via var().',
  },
];

const SOURCE_FILES = ['src/**/*.{ts,tsx,js,jsx,mjs,astro}'];
const RAW_VALUE_FILES = ['src/components/**/*.{tsx,astro}', 'src/pages/**/*.{tsx,astro}'];

export default defineConfig(
  globalIgnores([
    'dist/**',
    '.astro/**',
    'node_modules/**',
    'design-system/**',
    'public/**',
    'scripts/migration/**',
  ]),

  // TypeScript (.ts/.tsx) — syntax-only recommended rules, no type-aware linting.
  tseslint.configs.recommended,

  // Astro components (template parsed into a JSX-like AST).
  astro.configs['flat/recommended'],

  // Design-system adherence: component prop/enum contracts + font families, all of src/.
  {
    name: 'flj/design-system-adherence',
    files: SOURCE_FILES,
    rules: {
      'no-restricted-syntax': ['error', fontFamilySelector, ...componentSelectors],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/components/ui/*/*', '@/components/ui/*/*', '@/components/ui/*'],
              message: "Import design-system components from '@/components/ui', not component internals.",
            },
            {
              group: ['**/design-system/**'],
              message:
                "design-system/ is a read-only Claude Design snapshot. Import components from '@/components/ui'.",
            },
          ],
        },
      ],
    },
  },

  // Raw hex / px literals are forbidden in components and pages (flat config replaces
  // rule options per block, so this block repeats the selectors above).
  {
    name: 'flj/design-system-adherence/raw-values',
    files: RAW_VALUE_FILES,
    rules: {
      'no-restricted-syntax': ['error', ...rawValueSelectors, fontFamilySelector, ...componentSelectors],
    },
  },

  // Inside the design-system implementation, sibling/internal imports are expected.
  {
    name: 'flj/design-system-internals',
    files: ['src/components/ui/**'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
);
