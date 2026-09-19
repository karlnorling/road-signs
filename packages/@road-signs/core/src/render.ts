import type { Sign } from './types';

/** Escape a string for interpolation into HTML text or a quoted attribute. */
export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');

/**
 * Locate the root `<svg …>` opening tag.
 *
 * Scanning for the closing `>` while tracking quotes, rather than matching
 * `/<svg[^>]*>/`, keeps this correct for attribute values that contain `>`
 * (SVGO leaves them in `style` and `d` attributes often enough to matter).
 */
const findRootSvgTag = (svg: string): { start: number; end: number } | null => {
  const start = svg.search(/<svg\b/);
  if (start === -1) return null;
  let quote: string | null = null;
  for (let i = start + 4; i < svg.length; i++) {
    const ch = svg[i];
    if (quote !== null) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === '>') return { start, end: i + 1 };
  }
  return null;
};

export interface DecorateSvgOptions {
  description: string;
  descId: string;
  height: number | string;
  title: string;
  titleId: string;
  width: number | string;
}

/**
 * Add sizing and accessible name/description to an inline SVG.
 *
 * Anything before the root element (XML declarations, DOCTYPEs, the
 * `<!-- Created with Inkscape -->` comment that SVGO-failed artwork keeps) is
 * dropped: it is invalid inside an HTML document, and an earlier version of
 * this code injected the `<title>` after the first `>` in the string, which
 * for those signs landed inside the comment and silently lost the label.
 *
 * Returns the input unchanged if no root element can be found.
 */
export const decorateSvg = (svg: string, options: DecorateSvgOptions): string => {
  const tag = findRootSvgTag(svg);
  if (tag === null) return svg;

  const open = svg.slice(tag.start, tag.end);
  const selfClosing = open.endsWith('/>');
  const attrs =
    ` role="img" aria-labelledby="${escapeHtml(options.titleId)} ${escapeHtml(options.descId)}"` +
    ` width="${escapeHtml(String(options.width))}" height="${escapeHtml(String(options.height))}"`;
  const openWithAttrs = `${open.slice(0, selfClosing ? -2 : -1)}${attrs}>`;

  const a11y =
    `<title id="${escapeHtml(options.titleId)}">${escapeHtml(options.title)}</title>` +
    `<desc id="${escapeHtml(options.descId)}">${escapeHtml(options.description)}</desc>`;

  const rest = selfClosing ? '</svg>' : svg.slice(tag.end);
  return `${openWithAttrs}${a11y}${rest}`;
};

export type SignArtwork = { kind: 'png'; src: string } | { kind: 'svg'; svg: string };

/**
 * Pick the artwork a sign should render with.
 *
 * Only `svg` and `png` are considered: `sign.assets` holds paths into the
 * monorepo's build-time assets/ tree, which is not published, so rendering
 * from it would produce broken images for every consumer.
 */
export const signArtwork = (sign: Sign): SignArtwork | null => {
  if (sign.svg) return { kind: 'svg', svg: sign.svg };
  if (sign.png) return { kind: 'png', src: sign.png };
  return null;
};
