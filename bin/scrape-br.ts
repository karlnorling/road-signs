/* oxlint-disable no-await-in-loop */

/**
 * scrape-br.ts — Brazil
 *
 * Brazilian signs follow the CTB (Código de Trânsito Brasileiro).
 * Codes: A-xx (warning), R-xx (prohibitory), D-xx / S-xx (information).
 *
 * Wikipedia uses plain <table> cells (not class="wikitable"), so this is a
 * custom scraper that extracts codes from File: href attributes.
 *
 * Run via: yarn update --country=br
 */

import { parse } from 'node-html-parser';
import type { ViennaCategory } from './scrape-vienna';

export type BRCategory = ViennaCategory;
export type ScrapedData = Record<
  BRCategory,
  Array<{ code: string; name: string; imageUrl: string | null; category: BRCategory }>
>;

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';
const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/Road_signs_in_Brazil';

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Extract CTB code from filename: "Brasil_A-1a.svg" → "A-1a" */
const extractCodeFromFilename = (href: string): string | null => {
  const base = decodeURIComponent(href)
    .replace(/^.*File:/i, '')
    .replace(/\.svg$/i, '')
    .replace(/_/g, ' ');
  // Strip country prefix
  const stripped = base.replace(/^Brasil[l]?\s+/i, '').trim();
  const m = stripped.match(/^([A-Z]-\d+[a-z]?)/i) ?? stripped.match(/\b([A-Z]-\d+[a-z]?)\b/i);
  return m ? m[1].toUpperCase() : null;
};

const inferCategory = (code: string): BRCategory => {
  const u = code.toUpperCase();
  if (u.startsWith('A')) return 'warning';
  if (u.startsWith('R')) return 'prohibitory';
  return 'information';
};

const resolveHeadingCategory = (text: string): BRCategory | null => {
  const l = text.toLowerCase();
  if (l.includes('warning')) return 'warning';
  if (l.includes('regulatory')) return 'prohibitory';
  if (
    l.includes('educational') ||
    l.includes('service') ||
    l.includes('indication') ||
    l.includes('other')
  )
    return 'information';
  return null;
};

const scrape = async (): Promise<ScrapedData> => {
  const res = await fetch(WIKIPEDIA_URL, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const doc = parse(await res.text());

  const result: ScrapedData = {
    warning: [],
    priority: [],
    prohibitory: [],
    mandatory: [],
    information: [],
  };

  let activeCategory: BRCategory | null = null;
  const body = doc.querySelector('#mw-content-text');
  if (!body) throw new Error('Could not find Wikipedia article body');

  for (const node of body.querySelectorAll(
    'h2, h3, div.mw-heading2, div.mw-heading3, table, ul.gallery',
  )) {
    const tag = node.tagName?.toLowerCase();
    const cls = node.getAttribute('class') ?? '';
    const isHeading = tag === 'h2' || tag === 'h3' || cls.includes('mw-heading');
    if (isHeading) {
      const resolved = resolveHeadingCategory(node.textContent?.trim() ?? '');
      if (resolved) activeCategory = resolved;
      continue;
    }
    if (!activeCategory) continue;

    // Extract all file links from any table or gallery
    for (const a of node.querySelectorAll('a[href*="/wiki/File:"]')) {
      const href = a.getAttribute('href') ?? '';
      if (!href.toLowerCase().includes('.svg')) continue;
      const code = extractCodeFromFilename(href);
      if (!code) continue;
      const imageUrl = `https://en.wikipedia.org${href}`;
      const caption =
        a.closest('td')?.textContent?.trim() ?? a.nextSibling?.textContent?.trim() ?? '';
      const name =
        caption
          .replace(code, '')
          .replace(/^[\s\-–—]+/, '')
          .trim() || code;
      const cat = inferCategory(code);
      result[cat].push({ code, name, imageUrl, category: cat });
    }
  }

  for (const [cat, signs] of Object.entries(result)) {
    if (signs.length > 0) console.log(`  ${cat}: ${signs.length} signs`);
    else console.warn(`  Warning: no signs found for category "${cat}"`);
  }

  return result;
};

export default scrape;
