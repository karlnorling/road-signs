/* oxlint-disable no-await-in-loop */

/**
 * scrape-ca.ts
 *
 * Primary source: Wikipedia "Road signs in Canada".
 * Supplement: Wikimedia Commons — typed subcategories (regulatory, warning,
 * school, temporary) plus all provincial categories (BC, QC, ON, AB, …).
 *
 * Canadian road signs use MUTCDC codes (RA-2, WA-8, WC-1, TC-1) and
 * provincial codes (CA-BC R-001, CA-QC P-010, CA-ON Rb-001).
 *
 * Run via: yarn update --country=ca
 */

import { parse } from 'node-html-parser';

export type CACategory = 'information' | 'regulatory' | 'school' | 'temporary' | 'warning';

export interface ScrapedSign {
  code: string;
  name: string;
  imageUrl: string | null;
  category: CACategory;
}

export type ScrapedData = Record<CACategory, ScrapedSign[]>;

const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/Road_signs_in_Canada';
const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';

// ---------------------------------------------------------------------------
// Category mapping
// ---------------------------------------------------------------------------

const HEADING_CATEGORY_MAP: Array<{ pattern: string; category: CACategory }> = [
  { pattern: 'school', category: 'school' },
  { pattern: 'pedestrian', category: 'warning' },
  { pattern: 'temporary', category: 'temporary' },
  { pattern: 'construction', category: 'temporary' },
  { pattern: 'work zone', category: 'temporary' },
  { pattern: 'warning', category: 'warning' },
  { pattern: 'regulatory', category: 'regulatory' },
  { pattern: 'prohibitory', category: 'regulatory' },
  { pattern: 'prohibition', category: 'regulatory' },
  { pattern: 'guide', category: 'information' },
  { pattern: 'destination', category: 'information' },
  { pattern: 'information', category: 'information' },
  { pattern: 'service', category: 'information' },
  { pattern: 'direction', category: 'information' },
];

/** Matches MUTCDC and provincial CA sign codes. */
const SIGN_CODE_RE =
  /\b([A-Z]{1,3}(?:[A-Z])?(?:\d+|-\d+)(?:-\d+[a-zA-Z]{0,2})?(?:\s*\([^)]+\))?)\b/;

const extractCode = (text: string): string | null => {
  const m = text.toUpperCase().match(SIGN_CODE_RE);
  if (!m) return null;
  if (/^[A-Z]{2,4}$/.test(m[1])) return null; // reject plain words
  return m[1].trim();
};

/**
 * Extract a MUTCDC or provincial code from a Wikimedia Commons filename.
 *
 * Handled patterns (after stripping File: prefix and .svg suffix):
 *   CA-MUTCDC_RA-002        → RA-002
 *   CA-BC_road_sign_R-001   → R-001
 *   CA-ON_road_sign_Rb-001  → Rb-001
 *   CA-QC_road_sign_P-010   → P-010
 *   Canada_road_sign_WA-006 → WA-006
 */
const extractCodeFromFilename = (rawTitle: string): string | null => {
  const base = rawTitle
    .replace(/^File:/i, '')
    .replace(/\.svg$/i, '')
    .replace(/_/g, ' ');

  // Try stripping known CA prefixes first, then extract code from the remainder.
  const stripped = base
    .replace(/^CA-MUTCDC\s+/i, '')
    .replace(/^CA-[A-Z]{2}\s+road\s+sign\s+/i, '')
    .replace(/^Canada\s+road\s+sign\s+/i, '')
    .replace(/^Canada\s+/i, '')
    .trim();

  const code = extractCode(stripped);
  if (code) return code;

  // Fallback: try extracting directly from the full base string.
  return extractCode(base);
};

/**
 * Infer MUTCDC / provincial category from sign code.
 *
 * MUTCDC:  RA/RB → regulatory, WA/WB → warning, WC → school, TC → temporary
 * BC:      R → regulatory, W → warning, S → school, T → temporary, I/G → info
 * QC:      A → warning (Avertissement), P → regulatory (Prescriptions), D → info
 * ON:      Ra/Rb → regulatory, Wa/Wb → warning
 */
const inferCategoryFromCode = (code: string): CACategory => {
  const u = code.toUpperCase().replace(/[-_\s]/g, '');
  if (u.startsWith('TC')) return 'temporary';
  if (u.startsWith('WC')) return 'school';
  if (u.startsWith('WA') || u.startsWith('WB') || u.startsWith('W')) return 'warning';
  if (u.startsWith('RA') || u.startsWith('RB') || u.startsWith('R')) return 'regulatory';
  if (u.startsWith('S')) return 'school';
  if (u.startsWith('T')) return 'temporary';
  // Quebec-specific: A = warning, P = regulatory, D = information
  if (u.startsWith('A')) return 'warning';
  if (u.startsWith('P')) return 'regulatory';
  if (u.startsWith('D')) return 'information';
  if (/^[GIM]/.test(u)) return 'information';
  return 'information';
};

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const resolveCategory = (headingText: string): CACategory | null => {
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
  category: CACategory,
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
        .replace(/^[\s\-–—]+/, '')
        .trim() ||
      (code ?? '');

    if (!code && !name) continue;
    signs.push({ code: code ?? slugify(name), name, imageUrl, category });
  }
  return signs;
};

const scrapeTable = (tableNode: ReturnType<typeof parse>, category: CACategory): ScrapedSign[] => {
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

    // Also try extracting from the file href.
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
          .replace(/^[\s\-–—]+/, '')
          .trim();
      } else if (!name && text.length > 2 && text.length < 120) {
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
 * MUTCDC typed subcategories — category is already known from the Commons
 * category name, so no code-prefix inference needed.
 */
const COMMONS_TYPED: Array<{ name: string; category: CACategory }> = [
  { name: 'SVG_regulatory_road_signs_of_Canada', category: 'regulatory' },
  { name: 'SVG_warning_road_signs_of_Canada', category: 'warning' },
  { name: 'SVG_school_road_signs_of_Canada', category: 'school' },
  { name: 'SVG_temporary_road_signs_of_Canada', category: 'temporary' },
];

/**
 * Provincial categories — category is inferred from the sign code since
 * provincial collections are mixed.
 */
const COMMONS_PROVINCIAL = [
  'SVG_road_signs_of_British_Columbia',
  'SVG_road_signs_of_Quebec',
  'SVG_road_signs_of_Ontario',
  'SVG_road_signs_of_Alberta',
  'SVG_road_signs_of_Manitoba',
  'SVG_road_signs_of_Nova_Scotia',
  'SVG_road_signs_of_New_Brunswick',
  'SVG_road_signs_of_Saskatchewan',
  'SVG_road_signs_of_Prince_Edward_Island',
  'SVG_road_signs_of_Newfoundland_and_Labrador',
];

const fetchCommonsCategory = async (
  categoryName: string,
  forcedCategory?: CACategory,
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
        const name =
          title
            .replace(/^File:/i, '')
            .replace(/\.svg$/i, '')
            .replace(/_/g, ' ')
            .replace(/^CA-MUTCDC\s+/i, '')
            .replace(/^CA-[A-Z]{2}\s+road\s+sign\s+/i, '')
            .replace(/^Canada\s+road\s+sign\s+/i, '')
            .replace(code, '')
            .trim() || code;

        const category = forcedCategory ?? inferCategoryFromCode(code);
        signs.push({ code, name, imageUrl, category });
      }

      if (!json.continue?.cmcontinue) break;
      continueParam = json.continue.cmcontinue;
      await sleep(200);
    } catch (err) {
      console.warn(`  Warning: Commons ${categoryName}: ${(err as Error).message}`);
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

  // Typed subcategories — category is already known.
  for (const { name, category } of COMMONS_TYPED) {
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

  // Provincial categories — infer category from code.
  for (const name of COMMONS_PROVINCIAL) {
    console.log(`  commons/${name}...`);
    const signs = await fetchCommonsCategory(name);
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
    school: [],
    temporary: [],
    information: [],
  };

  let activeCategory: CACategory | null = null;
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
