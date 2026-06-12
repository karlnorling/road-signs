/* oxlint-disable no-await-in-loop */

/**
 * scrape-se.ts
 *
 * Primary source: Wikipedia "Road signs in Sweden".
 * Supplement: Wikimedia Commons API for SVG road signs in Sweden.
 *
 * Swedish sign codes follow the Vägmärkesförordning (Road Signs Ordinance):
 *   A series — Warning signs (Varningsskyltar)
 *   B series — Priority signs (Väjningsmärkena)
 *   C series — Prohibitory signs (Förbudsmärken)
 *   D series — Mandatory signs (Påbudsmärken)
 *   E–I series — Information / direction / service signs
 *
 * Run via: yarn update --country=se
 */

import { parse } from 'node-html-parser';

export type SECategory = 'information' | 'mandatory' | 'priority' | 'prohibitory' | 'warning';

export interface ScrapedSign {
  code: string;
  name: string;
  imageUrl: string | null;
  category: SECategory;
}

export type ScrapedData = Record<SECategory, ScrapedSign[]>;

const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/Road_signs_in_Sweden';
const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';

// ---------------------------------------------------------------------------
// Category mapping
// ---------------------------------------------------------------------------

const HEADING_CATEGORY_MAP: Array<{ pattern: string; category: SECategory }> = [
  { pattern: 'warning', category: 'warning' },
  { pattern: 'priority', category: 'priority' },
  { pattern: 'right of way', category: 'priority' },
  { pattern: 'yield', category: 'priority' },
  { pattern: 'prohibitory', category: 'prohibitory' },
  { pattern: 'prohibition', category: 'prohibitory' },
  { pattern: 'speed limit', category: 'prohibitory' },
  { pattern: 'mandatory', category: 'mandatory' },
  { pattern: 'obligation', category: 'mandatory' },
  { pattern: 'information', category: 'information' },
  { pattern: 'indication', category: 'information' },
  { pattern: 'direction', category: 'information' },
  { pattern: 'service', category: 'information' },
  { pattern: 'additional', category: 'information' },
  { pattern: 'tourist', category: 'information' },
  { pattern: 'route', category: 'information' },
];

/**
 * Swedish sign code: A1, A19-1, B3, C27, D4, E2, F3, G1 etc.
 * The series letters A–I are unique to the Vägmärkesförordning.
 */
const SIGN_CODE_RE = /\b([A-I]\d+(?:\.\d+)?(?:-\d+)?[a-z]?)\b/i;

const extractCode = (text: string): string | null => {
  const m = text.match(SIGN_CODE_RE);
  return m ? m[1].toUpperCase() : null;
};

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const resolveCategory = (headingText: string): SECategory | null => {
  const lower = headingText.toLowerCase();
  for (const { pattern, category } of HEADING_CATEGORY_MAP) {
    if (lower.includes(pattern)) return category;
  }
  return null;
};

export const inferCategoryFromCode = (code: string): SECategory => {
  const u = code.toUpperCase();
  if (u.startsWith('A')) return 'warning';
  if (u.startsWith('B')) return 'priority';
  if (u.startsWith('C')) return 'prohibitory';
  if (u.startsWith('D')) return 'mandatory';
  return 'information';
};

// ---------------------------------------------------------------------------
// Wikipedia scraper helpers
// ---------------------------------------------------------------------------

const scrapeGallery = (
  galleryNode: ReturnType<typeof parse>,
  category: SECategory,
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

const scrapeTable = (tableNode: ReturnType<typeof parse>, category: SECategory): ScrapedSign[] => {
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
// Wikimedia Commons supplement
// ---------------------------------------------------------------------------

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

/**
 * Extracts the Swedish sign code from a Commons filename.
 * "Sweden road sign A1.svg" → "A1"
 * "Sweden road sign A19-1.svg" → "A19-1"
 */
const extractCodeFromFilename = (filename: string): string | null => {
  const stripped = filename
    .replace(/^File:/i, '')
    .replace(/\.svg$/i, '')
    .replace(/^Sweden[_\s]+road[_\s]+sign[_\s]+/i, '')
    .trim();
  return extractCode(stripped);
};

const COMMONS_CATEGORIES = [
  'SVG_road_signs_in_Sweden',
  'Road_signs_in_Sweden', // may contain additional SVGs
];

const fetchCommonsCategory = async (category: string): Promise<ScrapedSign[]> => {
  const signs: ScrapedSign[] = [];
  let continueParam = '';

  for (let page = 0; page < 20; page++) {
    const url =
      `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers` +
      `&cmtitle=Category:${encodeURIComponent(category)}&cmtype=file&cmlimit=500` +
      `&cmcontinue=${encodeURIComponent(continueParam)}&format=json&origin=*`;

    try {
      const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      if (!res.ok) break;
      const json = (await res.json()) as {
        query: { categorymembers: Array<{ title: string }> };
        continue?: { cmcontinue: string };
      };

      for (const member of json.query?.categorymembers ?? []) {
        const title = member.title;
        if (!title.toLowerCase().endsWith('.svg')) continue;

        const code = extractCodeFromFilename(title);
        if (!code) continue;

        const imageUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(title).replace(/%20/g, '_')}`;
        const name = title
          .replace(/^File:/i, '')
          .replace(/\.svg$/i, '')
          .replace(/^Sweden[_\s]+road[_\s]+sign[_\s]+/i, '')
          .replace(/_/g, ' ')
          .trim();

        signs.push({
          code,
          name: name || code,
          imageUrl,
          category: inferCategoryFromCode(code),
        });
      }

      if (!json.continue?.cmcontinue) break;
      continueParam = json.continue.cmcontinue;
      await sleep(200);
    } catch (err) {
      console.warn(`  Warning: failed to fetch Commons ${category}: ${(err as Error).message}`);
      break;
    }
  }

  return signs;
};

const supplementFromCommons = async (result: ScrapedData): Promise<void> => {
  const existingCodes = new Set(
    Object.values(result)
      .flat()
      .map((s) => s.code),
  );
  let added = 0;

  for (const category of COMMONS_CATEGORIES) {
    console.log(`  commons/${category}...`);
    const signs = await fetchCommonsCategory(category);
    for (const sign of signs) {
      if (!existingCodes.has(sign.code)) {
        result[sign.category].push(sign);
        existingCodes.add(sign.code);
        added++;
      }
    }
  }

  console.log(`  Added ${added} signs from Wikimedia Commons not in Wikipedia`);
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
    priority: [],
    prohibitory: [],
    mandatory: [],
    information: [],
  };

  let activeCategory: SECategory | null = null;
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

  console.log('  Supplementing with Wikimedia Commons...');
  await supplementFromCommons(result);

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
