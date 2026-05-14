/**
 * scrape-us.ts
 *
 * Scrapes US MUTCD road sign data from the Wikipedia article
 * "Road signs in the United States".
 *
 * Returns structured data grouped by MUTCD category, with Wikimedia Commons
 * image URLs and descriptions for each sign.
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

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';

/**
 * Maps heading text patterns to MUTCD categories.
 * Wikipedia headings vary — we match on lowercase substrings.
 */
const HEADING_CATEGORY_MAP: Array<{ pattern: string; category: USCategory }> = [
  { pattern: 'warning', category: 'warning' },
  { pattern: 'regulatory', category: 'regulatory' },
  { pattern: 'guide', category: 'guide' },
  { pattern: 'school', category: 'school' },
  { pattern: 'construction', category: 'construction' },
  { pattern: 'recreational', category: 'recreational' },
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
    const name = caption.replace(code ?? '', '').replace(/^[\s\-–—]+/, '').trim() || (code ?? '');

    if (!code && !name) continue;
    signs.push({ code: code ?? slugify(name), name, imageUrl, category });
  }
  return signs;
};

const scrapeTable = (
  tableNode: ReturnType<typeof parse>,
  category: USCategory,
): ScrapedSign[] => {
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
        name = text.replace(found, '').replace(/^[\s\-–—]+/, '').trim();
      }
    }

    if (!code && !imageUrl) continue;
    const finalName = name || code || '';
    signs.push({
      code: code ?? slugify(finalName),
      name: finalName,
      imageUrl,
      category,
    });
  }
  return signs;
};

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

  // Walk all heading + sibling nodes, assigning content to the active category.
  let activeCategory: USCategory | null = null;
  const body = doc.querySelector('#mw-content-text');
  if (!body) throw new Error('Could not find Wikipedia article body');

  const nodes = body.querySelectorAll(
    'h2, h3, ul.gallery, table.wikitable, div.mw-heading2, div.mw-heading3',
  );

  for (const node of nodes) {
    const tag = node.tagName?.toLowerCase();

    if (tag === 'h2' || tag === 'h3' || tag === 'div') {
      const text = node.textContent?.trim() ?? '';
      activeCategory = resolveCategory(text);
      continue;
    }

    if (!activeCategory) continue;

    if (tag === 'ul') {
      result[activeCategory].push(...scrapeGallery(node, activeCategory));
    } else if (tag === 'table') {
      result[activeCategory].push(...scrapeTable(node, activeCategory));
    }
  }

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
