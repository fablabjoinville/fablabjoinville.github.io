/**
 * Brand marks (logos) resolved from src/assets/brand/.
 *
 * The official files (marca-{azul,branco,preto}.svg, simbolo-*.svg, icon-app.png)
 * are NOT in the design-system snapshot yet. They are loaded with an optional glob so
 * the site builds without them: callers render a text wordmark when a mark is missing.
 * Once the files are copied into src/assets/brand/, they are picked up automatically.
 */
import type { ImageMetadata } from 'astro';

const marks = import.meta.glob<ImageMetadata>('../assets/brand/*.{svg,png}', {
  eager: true,
  import: 'default',
});

export type BrandMark =
  | 'marca-azul.svg'
  | 'marca-branco.svg'
  | 'marca-preto.svg'
  | 'simbolo-cor.svg'
  | 'simbolo-preto.svg'
  | 'simbolo-branco.svg'
  | 'icon-app.png';

/** Returns the imported asset, or `undefined` when the file is not in src/assets/brand/ yet. */
export function brandMark(name: BrandMark): ImageMetadata | undefined {
  return marks[`../assets/brand/${name}`];
}

/** Browser theme colour (<meta name="theme-color">). Mirrors --flj-navy-800 in tokens/colors.css. */
export const themeColor = '#082c3b';
