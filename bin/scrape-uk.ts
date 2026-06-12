/* oxlint-disable no-await-in-loop */

/**
 * scrape-uk.ts
 *
 * Primary source: Wikipedia "Road signs in the United Kingdom".
 * Supplement: Wikimedia Commons API for SVG road signs in the UK.
 *
 * UK signs are identified by TSRGD (Traffic Signs Regulations and General
 * Directions 2016) diagram numbers, e.g. "601", "2025", "7001".
 * The gov.uk Highway Code page uses raster images only and is not used here.
 *
 * Run via: yarn update --country=uk
 */

import { parse } from 'node-html-parser';

export type UKCategory = 'direction' | 'information' | 'regulatory' | 'temporary' | 'warning';

export interface ScrapedSign {
  code: string;
  name: string;
  imageUrl: string | null;
  category: UKCategory;
}

export type ScrapedData = Record<UKCategory, ScrapedSign[]>;

const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/Road_signs_in_the_United_Kingdom';
const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';

// ---------------------------------------------------------------------------
// Category mapping
// ---------------------------------------------------------------------------

const HEADING_CATEGORY_MAP: Array<{ pattern: string; category: UKCategory }> = [
  { pattern: 'road work', category: 'temporary' },
  { pattern: 'road-work', category: 'temporary' },
  { pattern: 'temporary', category: 'temporary' },
  { pattern: 'work zone', category: 'temporary' },
  { pattern: 'warning', category: 'warning' },
  { pattern: 'giving order', category: 'regulatory' },
  { pattern: 'regulatory', category: 'regulatory' },
  { pattern: 'prohibitory', category: 'regulatory' },
  { pattern: 'restriction', category: 'regulatory' },
  { pattern: 'direction', category: 'direction' },
  { pattern: 'motorway', category: 'direction' },
  { pattern: 'route', category: 'direction' },
  { pattern: 'information', category: 'information' },
  { pattern: 'informatory', category: 'information' },
  { pattern: 'service', category: 'information' },
];

/**
 * TSRGD diagram numbers: 3-4 digits, optionally followed by a decimal
 * portion and/or an uppercase letter suffix.
 * Examples: "601", "2025", "660.1", "545A", "7001"
 *
 * We require at least 3 digits to avoid matching arbitrary numbers in prose.
 */
const DIAGRAM_RE = /\b(\d{3,4}(?:\.\d+)?[A-Z]?)\b/;

const extractCode = (text: string): string | null => {
  // Only look for the pattern in short strings (table cells / captions).
  // This avoids pulling numbers out of long descriptive sentences.
  if (text.length > 60) return null;
  const m = text.match(DIAGRAM_RE);
  return m ? m[1] : null;
};

/**
 * Extract TSRGD diagram number from a Wikimedia Commons filename.
 * "UK traffic sign 601.svg" → "601"
 * "UK traffic sign 2025.svg" → "2025"
 */
const extractCodeFromFilename = (filename: string): string | null => {
  const stripped = filename
    .replace(/^File:/i, '')
    .replace(/\.svg$/i, '')
    .replace(/^UK[_\s]+traffic[_\s]+sign[_\s]+/i, '')
    .replace(/_/g, ' ')
    .trim();
  // After stripping the prefix, the remainder should be the diagram number.
  const m = stripped.match(/^(\d{1,4}(?:\.\d+)?[A-Z]?)$/i);
  return m ? m[1] : null;
};

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const resolveCategory = (headingText: string): UKCategory | null => {
  const lower = headingText.toLowerCase();
  for (const { pattern, category } of HEADING_CATEGORY_MAP) {
    if (lower.includes(pattern)) return category;
  }
  return null;
};

// ---------------------------------------------------------------------------
// Wikipedia scraper helpers
// ---------------------------------------------------------------------------

const scrapeGallery = (
  galleryNode: ReturnType<typeof parse>,
  category: UKCategory,
): ScrapedSign[] => {
  const signs: ScrapedSign[] = [];
  for (const li of galleryNode.querySelectorAll('li.gallerybox')) {
    const imgLink = li.querySelector('.thumb a, .gallery-image-body a');
    const href = imgLink?.getAttribute('href') ?? null;
    const imageUrl = href ? `https://en.wikipedia.org${href}` : null;

    const captionEl = li.querySelector('.gallerytext, figcaption');
    const caption = captionEl?.textContent?.trim() ?? '';

    const code =
      extractCode(caption) ?? (href ? extractCodeFromFilename(decodeURIComponent(href)) : null);
    const name =
      caption
        .replace(code ?? '', '')
        .replace(/^[\s\-–—(]+/, '')
        .replace(/[)]+$/, '')
        .trim() ||
      (code ?? '');

    if (!code && !name) continue;
    signs.push({ code: code ?? slugify(name), name, imageUrl, category });
  }
  return signs;
};

const scrapeTable = (tableNode: ReturnType<typeof parse>, category: UKCategory): ScrapedSign[] => {
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

    // Also try extracting diagram number from the file href.
    if (href) {
      const fromHref = extractCodeFromFilename(decodeURIComponent(href));
      if (fromHref) code = fromHref;
    }

    for (const cell of cells) {
      const text = cell.textContent?.trim() ?? '';
      const found = extractCode(text);
      if (found && !code) {
        code = found;
        name = text
          .replace(found, '')
          .replace(/^[\s\-–—(]+/, '')
          .replace(/[)]+$/, '')
          .trim();
      } else if (!name && text.length > 2 && text.length < 120 && !found) {
        name = text;
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
 * Infer category from the name of the Commons subcategory the file came from.
 */
const inferCategoryFromCommonsCategory = (commonsCategory: string): UKCategory => {
  const lower = commonsCategory.toLowerCase();
  if (lower.includes('warning')) return 'warning';
  if (lower.includes('regulatory') || lower.includes('order') || lower.includes('prohibit'))
    return 'regulatory';
  if (lower.includes('direction') || lower.includes('motorway') || lower.includes('route'))
    return 'direction';
  if (lower.includes('temporary') || lower.includes('road work') || lower.includes('work'))
    return 'temporary';
  return 'information';
};

const COMMONS_CATEGORIES: Array<{ name: string; category: UKCategory }> = [
  { name: 'Warning_signs_of_the_United_Kingdom', category: 'warning' },
  { name: 'Regulatory_signs_of_the_United_Kingdom', category: 'regulatory' },
  { name: 'Information_signs_of_the_United_Kingdom', category: 'information' },
  { name: 'Direction_signs_of_the_United_Kingdom', category: 'direction' },
  { name: 'Road_works_signs_of_the_United_Kingdom', category: 'temporary' },
  // Catch-all — any SVG not in a subcategory above.
  { name: 'SVG_road_signs_in_the_United_Kingdom', category: 'information' },
];

const fetchCommonsCategory = async (
  categoryName: string,
  defaultCategory: UKCategory,
): Promise<ScrapedSign[]> => {
  const signs: ScrapedSign[] = [];
  let continueParam = '';

  for (let page = 0; page < 20; page++) {
    const url =
      `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers` +
      `&cmtitle=Category:${encodeURIComponent(categoryName)}&cmtype=file&cmlimit=500` +
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
          .replace(/^UK[_\s]+traffic[_\s]+sign[_\s]+/i, '')
          .replace(/_/g, ' ')
          .trim();

        const category = inferCategoryFromCommonsCategory(categoryName) ?? defaultCategory;

        signs.push({
          code,
          name: name || `Diagram ${code}`,
          imageUrl,
          category,
        });
      }

      if (!json.continue?.cmcontinue) break;
      continueParam = json.continue.cmcontinue;
      await sleep(200);
    } catch (err) {
      console.warn(`  Warning: failed to fetch Commons ${categoryName}: ${(err as Error).message}`);
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

  for (const { name, category } of COMMONS_CATEGORIES) {
    console.log(`  commons/${name}...`);
    const signs = await fetchCommonsCategory(name, category);
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
    regulatory: [],
    direction: [],
    information: [],
    temporary: [],
  };

  let activeCategory: UKCategory | null = null;
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
