/* oxlint-disable no-await-in-loop */

/**
 * scrape-us.ts
 *
 * Primary source: Wikipedia "Road signs in the United States".
 * Supplement: hallsigns.com (fills gaps Wikipedia misses — recreational,
 * bicycle facility, railroad crossing, plus any codes absent from Wikipedia's
 * tables for regulatory/warning/guide/school/construction).
 *
 * Run via: yarn update --country=us
 */

import { parse } from 'node-html-parser';

export type USCategory =
  | 'construction'
  | 'guide'
  | 'informational'
  | 'recreational'
  | 'regulatory'
  | 'school'
  | 'warning';

export interface ScrapedSign {
  code: string;
  name: string;
  imageUrl: string | null;
  category: USCategory;
}

export type ScrapedData = Record<USCategory, ScrapedSign[]>;

const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/Road_signs_in_the_United_States';
const HALLSIGNS_BASE = 'https://www.hallsigns.com/signs/traffic-signs/';

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';

// ---------------------------------------------------------------------------
// Wikipedia scraper helpers
// ---------------------------------------------------------------------------

/**
 * Maps heading text patterns to MUTCD categories.
 * Longer/more-specific patterns must come before shorter ones.
 */
const HEADING_CATEGORY_MAP: Array<{ pattern: string; category: USCategory }> = [
  { pattern: 'warning', category: 'warning' },
  { pattern: 'regulatory', category: 'regulatory' },
  { pattern: 'destination', category: 'guide' },
  { pattern: 'route marker', category: 'guide' },
  { pattern: 'freeway', category: 'guide' },
  { pattern: 'expressway', category: 'guide' },
  { pattern: 'guide', category: 'guide' },
  { pattern: 'school', category: 'school' },
  { pattern: 'construction', category: 'construction' },
  { pattern: 'work zone', category: 'construction' },
  { pattern: 'recreational', category: 'recreational' },
  { pattern: 'recreation', category: 'recreational' },
  { pattern: 'general information', category: 'informational' },
  { pattern: 'emergency management', category: 'informational' },
  { pattern: 'motorist', category: 'informational' },
  { pattern: 'informational', category: 'informational' },
  { pattern: 'service', category: 'informational' },
];

/** Matches MUTCD sign codes like W1-1, R2-1, D1-1, M1-1 */
const SIGN_CODE_RE = /\b([A-Z]{1,2}\d+(?:-\d+[a-z]?)?(?:\s*\([^)]+\))?)\b/;

const extractCode = (text: string): string | null => {
  const m = text.match(SIGN_CODE_RE);
  return m ? m[1].trim() : null;
};

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const resolveCategory = (headingText: string): USCategory | null => {
  const lower = headingText.toLowerCase();
  for (const { pattern, category } of HEADING_CATEGORY_MAP) {
    if (lower.includes(pattern)) return category;
  }
  return null;
};

const scrapeGallery = (
  galleryNode: ReturnType<typeof parse>,
  category: USCategory,
): ScrapedSign[] => {
  const signs: ScrapedSign[] = [];
  for (const li of galleryNode.querySelectorAll('li.gallerybox')) {
    const imgLink = li.querySelector('.thumb a, .gallery-image-body a');
    const href = imgLink?.getAttribute('href') ?? null;
    const imageUrl = href ? `https://en.wikipedia.org${href}` : null;

    const captionEl = li.querySelector('.gallerytext, figcaption');
    const caption = captionEl?.textContent?.trim() ?? '';

    const code = extractCode(caption) ?? (href ? extractCode(decodeURIComponent(href)) : null);
    const name =
      caption
        .replace(code ?? '', '')
        .replace(/^[\s\-–—]+/, '')
        .trim() ||
      (code ?? '');

    if (!code && !name) continue;
    signs.push({ code: code ?? slugify(name), name, imageUrl, category });
  }
  return signs;
};

const scrapeTable = (tableNode: ReturnType<typeof parse>, category: USCategory): ScrapedSign[] => {
  const signs: ScrapedSign[] = [];
  const rows = tableNode.querySelectorAll('tr');

  for (const row of rows) {
    const cells = row.querySelectorAll('td');
    if (cells.length < 2) continue;

    const imgCell = cells[0];
    const imgLink = imgCell.querySelector('a');
    const href = imgLink?.getAttribute('href') ?? null;
    const imageUrl = href?.startsWith('/wiki/File:') ? `https://en.wikipedia.org${href}` : null;

    let code: string | null = null;
    let name = '';

    for (const cell of cells) {
      const text = cell.textContent?.trim() ?? '';
      const found = extractCode(text);
      if (found && !code) {
        code = found;
        name = text
          .replace(found, '')
          .replace(/^[\s\-–—]+/, '')
          .trim();
      }
    }

    if (!code && !imageUrl) continue;
    const finalName = name || code || '';
    signs.push({ code: code ?? slugify(finalName), name: finalName, imageUrl, category });
  }
  return signs;
};

// ---------------------------------------------------------------------------
// hallsigns.com supplement helpers
// ---------------------------------------------------------------------------

/**
 * hallsigns.com sign text is always "{CODE} {Description}".
 * Matches codes like R3-17aP, RS-068, W11-15, HS2-1, CW1-2.
 * Rejects non-code tokens like "AHA" (no digit/dash separator).
 */
const HALLSIGNS_CODE_RE = /^([A-Za-z]{1,4}[-\d][\w-]*)\s+(.+)$/;

/**
 * Infer MUTCD category from sign code prefix.
 * RS must be checked before R to avoid false match.
 */
const inferCategoryFromCode = (code: string): USCategory => {
  const u = code.toUpperCase();
  if (u.startsWith('RS')) return 'recreational';
  if (u.startsWith('R')) return 'regulatory';
  if (u.startsWith('CW') || u.startsWith('W')) return 'warning';
  if (/^(D|E|I|M)/.test(u)) return 'guide';
  if (/^(G|OM)/.test(u)) return 'construction';
  if (/^(S|HS|SCHOOL)/.test(u)) return 'school';
  if (u.startsWith('EM')) return 'informational';
  return 'informational';
};

/**
 * All hallsigns.com traffic-sign categories to supplement Wikipedia with.
 * Pages are known from inspection; we stop early if a page returns nothing.
 */
const HALLSIGNS_SLUGS: Array<{ slug: string; pages: number }> = [
  { slug: 'regulatory-signs', pages: 5 },
  { slug: 'warning-signs', pages: 5 },
  { slug: 'guide-signs', pages: 3 },
  { slug: 'bicycle-facility-signs', pages: 2 },
  { slug: 'school-zone-signs', pages: 2 },
  { slug: 'temporary-traffic-control-signs', pages: 3 },
  { slug: 'railroad-and-light-rail-crossing-signs', pages: 2 },
  { slug: 'recreation-signs', pages: 2 },
];

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const scrapeHallsignsSlug = async (slug: string, maxPages: number): Promise<ScrapedSign[]> => {
  const signs: ScrapedSign[] = [];
  for (let page = 1; page <= maxPages; page++) {
    const url = `${HALLSIGNS_BASE}${slug}/?page=${page}`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      if (!res.ok) break;
      const doc = parse(await res.text());
      const h4s = doc.querySelectorAll('h4 a');
      if (h4s.length === 0) break;
      for (const h4 of h4s) {
        const text = h4.textContent?.trim() ?? '';
        const m = text.match(HALLSIGNS_CODE_RE);
        if (!m) continue;
        const code = m[1];
        const name = m[2];
        signs.push({
          code,
          name,
          imageUrl: `https://commons.wikimedia.org/wiki/File:MUTCD_${code}.svg`,
          category: inferCategoryFromCode(code),
        });
      }
    } catch (err) {
      console.warn(`  Warning: failed to fetch ${url}: ${(err as Error).message}`);
      break;
    }
    if (page < maxPages) await sleep(300);
  }
  return signs;
};

/**
 * Scrapes all hallsigns.com categories and merges new signs into `result`.
 * Deduplicates globally by code — a sign already present in any category
 * (from Wikipedia) is never duplicated.
 */
const supplementFromHallsigns = async (result: ScrapedData): Promise<void> => {
  const existingCodes = new Set(Object.values(result).flat().map((s) => s.code));
  let added = 0;

  for (const { slug, pages } of HALLSIGNS_SLUGS) {
    console.log(`  hallsigns.com/${slug}...`);
    const signs = await scrapeHallsignsSlug(slug, pages);
    for (const sign of signs) {
      if (!existingCodes.has(sign.code)) {
        result[sign.category].push(sign);
        existingCodes.add(sign.code);
        added++;
      }
    }
  }

  console.log(`  Added ${added} signs from hallsigns.com not in Wikipedia`);
};

// ---------------------------------------------------------------------------
// Main scrape entry point
// ---------------------------------------------------------------------------

const scrape = async (): Promise<ScrapedData> => {
  const res = await fetch(WIKIPEDIA_URL, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`Failed to fetch Wikipedia: ${res.status}`);

  const html = await res.text();
  const doc = parse(html);

  const result: ScrapedData = {
    warning: [],
    regulatory: [],
    guide: [],
    school: [],
    construction: [],
    recreational: [],
    informational: [],
  };

  let activeCategory: USCategory | null = null;
  const body = doc.querySelector('#mw-content-text');
  if (!body) throw new Error('Could not find Wikipedia article body');

  const nodes = body.querySelectorAll(
    'h2, h3, ul.gallery, table.wikitable, div.mw-heading2, div.mw-heading3',
  );

  for (const node of nodes) {
    const tag = node.tagName?.toLowerCase();
    const cls = node.getAttribute('class') ?? '';

    const isH2 = tag === 'h2' || cls.includes('mw-heading2');
    const isH3 = tag === 'h3' || cls.includes('mw-heading3');

    if (isH2) {
      activeCategory = resolveCategory(node.textContent?.trim() ?? '');
      continue;
    }

    if (isH3) {
      // Only override if this H3 explicitly names a category; otherwise inherit H2's.
      const resolved = resolveCategory(node.textContent?.trim() ?? '');
      if (resolved) activeCategory = resolved;
      continue;
    }

    if (!activeCategory) continue;

    if (tag === 'ul') {
      result[activeCategory].push(...scrapeGallery(node, activeCategory));
    } else if (tag === 'table') {
      result[activeCategory].push(...scrapeTable(node, activeCategory));
    }
  }

  console.log('  Supplementing with hallsigns.com...');
  await supplementFromHallsigns(result);

  for (const [cat, signs] of Object.entries(result)) {
    if (signs.length === 0) {
      console.warn(`  Warning: no signs found for category "${cat}"`);
    } else {
      console.log(`  ${cat}: ${signs.length} signs`);
    }
  }

  return result;
};

export default scrape;
