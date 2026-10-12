#!/usr/bin/env node
/**
 * Content parity check: old Google Sites text (scripts/migration/old-site.json)
 * vs the built static site (dist/).
 *
 *   npm run build && npm run parity
 *   node scripts/migration/verify-parity.mjs --page sobre --page faq   # subset
 *   node scripts/migration/verify-parity.mjs --verbose                 # list every checked string
 *   node scripts/migration/verify-parity.mjs --dist other-dist
 *   node scripts/migration/verify-parity.mjs --page home --route home=design-system/index.html  # debug
 *
 * For each old page, every section body + item title/text is cleaned from
 * Markdown, split into sentences/lines (>= 12 chars) and searched in the built
 * page's text (tags/scripts/styles stripped, entities decoded; whitespace,
 * case, quotes, dashes and ellipses normalised). Inventory meta-notes are
 * skipped heuristically: chrome/nav sections, "[... embed ...]" and "(...)"
 * annotation lines, English-language lines and item `text` fields (copies of
 * the body or inventory notes; item titles are checked). Image alt texts count
 * as page text (e.g. sponsor logos).
 *
 * Intentional drops/edits are listed in scripts/migration/parity-exclusions/<page>.json
 * (plus optional _global.json, applied to every page):
 *   [{ "text": "<old string>", "reason": "dead-link|recap|site.ts|typo|chrome|other", "note": "..." }]
 * A string is skipped when it contains an exclusion text or is contained in it
 * (after normalisation).
 *
 * Also checks that every <img> on those pages has a non-empty alt.
 * Exit code 1 when any page is below 100% after exclusions, an image lacks alt,
 * a built page is missing, or an exclusion file is invalid. No dependencies.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const OLD_SITE = path.join(HERE, 'old-site.json');
const EXCLUSIONS_DIR = path.join(HERE, 'parity-exclusions');
const MIN_LENGTH = 12;
const REASONS = new Set(['dead-link', 'recap', 'site.ts', 'typo', 'chrome', 'other']);

/** old slug → built file (relative to dist). */
const ROUTES = {
  home: 'index.html',
  sobre: 'sobre/index.html',
  'faca-parte': 'faca-parte/index.html',
  estrutura: 'estrutura/index.html',
  cultura: 'cultura/index.html',
  portfolio: 'portfolio/index.html',
  lerobot: 'lerobot/index.html',
  faq: 'faq/index.html',
};

// ------------------------------------------------------------------ args
const args = process.argv.slice(2);
const onlyPages = [];
let verbose = false;
let distDir = path.join(ROOT, 'dist');
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--page') onlyPages.push(args[++i]);
  else if (a === '--verbose' || a === '-v') verbose = true;
  else if (a === '--dist') distDir = path.resolve(ROOT, args[++i]);
  else if (a === '--route') {
    // --route home=design-system/index.html (debug: check a slug against another built file)
    const [slug, file] = String(args[++i]).split('=');
    ROUTES[slug] = file;
  }
  else if (a === '--help' || a === '-h') {
    console.log('Usage: node scripts/migration/verify-parity.mjs [--page <slug>]... [--verbose] [--dist <dir>]');
    process.exit(0);
  } else {
    console.error(`Unknown argument: ${a}`);
    process.exit(2);
  }
}

// ------------------------------------------------------------ normalise
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', laquo: '«', raquo: '»', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', middot: '·', copy: '©', ordm: 'º', ordf: 'ª', deg: '°' };

function decodeEntities(s) {
  return s.replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, code) => {
    const c = code.toLowerCase();
    if (c.startsWith('#x')) return String.fromCodePoint(parseInt(c.slice(2), 16));
    if (c.startsWith('#')) return String.fromCodePoint(parseInt(c.slice(1), 10));
    return ENTITIES[c] ?? m;
  });
}

function normalize(s) {
  return s
    .normalize('NFKC')
    .replace(/[​-‍﻿]/g, '')
    .replace(/[   ]/g, ' ')
    .replace(/[‘’‚‛´`]/g, "'")
    .replace(/[“”„‟«»]/g, '"')
    .replace(/[‐‑‒–—―]/g, '-')
    .replace(/…/g, '...')
    .replace(/→|->/g, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?)\]])/g, '$1')
    .replace(/([(\[])\s+/g, '$1')
    .trim();
}

// ------------------------------------------------------- built page text
const INLINE_TAGS = 'a|abbr|b|bdi|bdo|cite|code|data|dfn|em|i|kbd|mark|q|s|samp|small|span|strong|sub|sup|time|u|var|wbr';

function htmlToText(html) {
  const body = html.match(/<body[\s\S]*<\/body>/i)?.[0] ?? html;
  // Image alt texts count as page text (logos, captions baked into photos).
  const alts = [...body.matchAll(/<img\b[^>]*\salt\s*=\s*"([^"]*)"/gi)].map((m) => m[1]).join(' | ');
  return normalize(
    decodeEntities(
      body
        .replace(/<!--[\s\S]*?-->/g, '') // React SSR text separators (<!-- -->)
        .replace(/<(script|style|template|noscript|svg)\b[\s\S]*?<\/\1>/gi, ' ')
        .replace(new RegExp(`</?(?:${INLINE_TAGS})\\b[^>]*>`, 'gi'), '')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .concat(' | ', alts),
    ),
  );
}

function checkImages(html) {
  const problems = [];
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    const alt = tag.match(/\salt\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const value = alt ? (alt[2] ?? alt[3] ?? alt[4] ?? '') : null;
    if (value === null || !decodeEntities(value).trim()) {
      const src = tag.match(/\ssrc\s*=\s*"([^"]*)"/i)?.[1] ?? tag.slice(0, 80);
      problems.push(value === null ? `missing alt: ${src}` : `empty alt: ${src}`);
    }
  }
  return problems;
}

// ---------------------------------------------------- old strings (needles)
const CHROME_HEADING = /^(header|site header|navigation|navega|rodap|footer|site chrome|\(empty embed)/i;
/** Inventory annotations that are not page text. */
const META_LINE = /^(youtube embed|google maps embed|drive video|background image|cta:|preços:|no price|https?:\/\/\S+$)/i;
/** Item titles that only describe an image/button on the old page. */
const META_ITEM = /^(background image|foto \d|botão|cta:)|\((imagem clicável|youtube|google doc|google form|mailto|grupo)\)$/i;
const EN_WORDS = new Set(['the', 'and', 'is', 'are', 'with', 'of', 'to', 'this', 'that', 'it', 'on', 'for', 'by', 'from', 'an', 'be', 'has', 'have', 'was', 'were', 'which', 'its', 'into', 'each', 'inside', 'not', 'there', 'these', 'they', 'their', 'shown', 'shows', 'should', 'only', 'after', 'before', 'between', 'section', 'image', 'images', 'embed', 'iframe', 'button', 'link', 'page', 'text', 'see', 'below', 'above']);
const PT_WORDS = new Set(['de', 'da', 'do', 'das', 'dos', 'é', 'um', 'uma', 'para', 'com', 'em', 'na', 'nas', 'nos', 'que', 'por', 'ao', 'à', 'mais', 'seu', 'sua', 'nosso', 'nossa', 'nossos', 'nossas', 'ou', 'como', 'são', 'você', 'não', 'pelo', 'pela', 'sobre', 'também', 'e', 'o', 'os']);

function isEnglish(line) {
  const words = line.toLowerCase().match(/[\p{L}']+/gu) ?? [];
  let en = 0;
  let pt = 0;
  for (const w of words) {
    if (EN_WORDS.has(w)) en++;
    if (PT_WORDS.has(w)) pt++;
  }
  return en >= 2 && en > pt;
}

function cleanLine(raw) {
  let line = raw.trim();
  if (!line) return '';
  // Annotation-only lines: "[YouTube embed: ...]", "(note ...)".
  if (/^\[[^\]]*\]$/.test(line) && !/\]\(/.test(line)) return '';
  if (/^\(.*\)\.?$/.test(line)) return '';
  line = line
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → text
    .replace(/^#{1,6}\s+/, '') // headings
    .replace(/^>\s*/, '') // blockquote
    .replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '') // list markers
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|[^\w*])\*(?!\s)([^*]+?)\*(?!\w)/g, '$1$2')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\.{3,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!line || isEnglish(line) || META_LINE.test(line)) return '';
  return line;
}

function sentences(text) {
  const out = [];
  for (const raw of String(text ?? '').split(/\n+/)) {
    const line = cleanLine(raw);
    if (!line) continue;
    for (const part of line.split(/(?<=[.!?…])\s+(?=["“(]?[\p{Lu}\d])/u)) {
      const s = part.trim().replace(/[\s.:;,]+$/u, '');
      if (s.length >= MIN_LENGTH) out.push(s);
    }
  }
  return out;
}

function oldStrings(page) {
  const seen = new Set();
  const list = [];
  const add = (s, where) => {
    const n = normalize(s);
    if (n.length < MIN_LENGTH || seen.has(n)) return;
    seen.add(n);
    list.push({ text: s, norm: n, where });
  };
  for (const section of page.sections ?? []) {
    if (CHROME_HEADING.test(section.heading ?? '')) continue;
    const where = section.heading ?? section.kind;
    for (const s of sentences(section.body)) add(s, where);
    // Item `text` is either a copy of the body or an inventory note, so only
    // item titles are checked (e.g. carousel captions, sponsor names).
    for (const item of section.items ?? []) {
      if (typeof item.title !== 'string' || META_ITEM.test(item.title.trim())) continue;
      for (const s of sentences(item.title)) add(s, `${where} › item.title`);
    }
  }
  return list;
}

// ------------------------------------------------------------- exclusions
function loadExclusions(slug, errors) {
  const files = ['_global.json', `${slug}.json`].map((f) => path.join(EXCLUSIONS_DIR, f)).filter(existsSync);
  const out = [];
  for (const file of files) {
    let data;
    try {
      data = JSON.parse(readFileSync(file, 'utf8'));
    } catch (e) {
      errors.push(`${path.relative(ROOT, file)}: invalid JSON (${e.message})`);
      continue;
    }
    if (!Array.isArray(data)) {
      errors.push(`${path.relative(ROOT, file)}: must be an array`);
      continue;
    }
    data.forEach((entry, i) => {
      const at = `${path.relative(ROOT, file)}[${i}]`;
      if (!entry || typeof entry.text !== 'string' || !entry.text.trim()) return errors.push(`${at}: "text" is required`);
      if (!REASONS.has(entry.reason)) return errors.push(`${at}: "reason" must be one of ${[...REASONS].join('|')}`);
      const norm = normalize(entry.text);
      if (norm.length < 8) return errors.push(`${at}: "text" is too short to match safely (< 8 chars)`);
      out.push({ ...entry, norm, used: false });
    });
  }
  return out;
}

// -------------------------------------------------------------------- run
if (!existsSync(OLD_SITE)) {
  console.error(`Missing ${path.relative(ROOT, OLD_SITE)}`);
  process.exit(2);
}
if (!existsSync(distDir)) {
  console.error(`Missing ${path.relative(ROOT, distDir)}/ — run "npm run build" first.`);
  process.exit(2);
}

const oldSite = JSON.parse(readFileSync(OLD_SITE, 'utf8'));
const pages = oldSite.pages.filter((p) => ROUTES[p.slug] && (onlyPages.length === 0 || onlyPages.includes(p.slug)));
if (existsSync(EXCLUSIONS_DIR)) {
  for (const f of readdirSync(EXCLUSIONS_DIR)) {
    if (f.endsWith('.json') && f !== '_global.json' && !ROUTES[f.replace(/\.json$/, '')]) {
      console.warn(`warning: parity-exclusions/${f} does not match any page slug`);
    }
  }
}

let failed = false;
const summary = [];

for (const page of pages) {
  const errors = [];
  const builtFile = path.join(distDir, ROUTES[page.slug]);
  const label = `${page.slug} → ${path.relative(ROOT, builtFile)}`;
  console.log(`\n=== ${label}`);

  if (!existsSync(builtFile)) {
    console.log('  MISSING built page');
    summary.push({ slug: page.slug, pct: 0, ok: false });
    failed = true;
    continue;
  }

  const html = readFileSync(builtFile, 'utf8');
  const text = htmlToText(html);
  const exclusions = loadExclusions(page.slug, errors);
  const needles = oldStrings(page);

  let found = 0;
  let excluded = 0;
  const missing = [];
  for (const needle of needles) {
    const excl = exclusions.find((e) => needle.norm.includes(e.norm) || e.norm.includes(needle.norm));
    if (excl) {
      excl.used = true;
      excluded++;
      if (verbose) console.log(`  [excl:${excl.reason}] ${needle.text}`);
      continue;
    }
    if (text.includes(needle.norm)) {
      found++;
      if (verbose) console.log(`  [ok] ${needle.text}`);
    } else {
      missing.push(needle);
    }
  }

  const checked = needles.length - excluded;
  const pct = checked === 0 ? 100 : (found / checked) * 100;
  const imgProblems = checkImages(html);
  const ok = missing.length === 0 && imgProblems.length === 0 && errors.length === 0;
  if (!ok) failed = true;

  console.log(`  coverage ${pct.toFixed(1)}% (${found}/${checked} found, ${excluded} excluded, ${needles.length} total)`);
  for (const m of missing) console.log(`  MISSING [${m.where}] ${m.text}`);
  for (const p of imgProblems) console.log(`  IMG ${p}`);
  for (const e of errors) console.log(`  EXCLUSIONS ${e}`);
  for (const e of exclusions.filter((x) => !x.used)) console.log(`  note: unused exclusion "${e.text.slice(0, 70)}"`);
  summary.push({ slug: page.slug, pct, ok, imgs: imgProblems.length });
}

console.log('\n=== summary');
for (const s of summary) {
  console.log(`  ${s.ok ? 'PASS' : 'FAIL'}  ${s.slug.padEnd(11)} ${s.pct.toFixed(1).padStart(5)}%${s.imgs ? `  (${s.imgs} img alt problems)` : ''}`);
}
process.exit(failed ? 1 : 0);
