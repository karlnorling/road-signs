/* oxlint-disable no-await-in-loop */

/**
 * scrape-vienna.ts
 *
 * Generic scraper factory for Vienna Convention on Road Signs and Signals
 * countries. Most European countries share the same five-category taxonomy
 * and similar Wikipedia + Wikimedia Commons page structures.
 *
 * Usage: import { createViennaScraper } from './scrape-vienna';
 *        export default createViennaScraper({ cc: 'de', ... });
 */

import { parse } from 'node-html-parser';

export type ViennaCategory = 'information' | 'mandatory' | 'priority' | 'prohibitory' | 'warning';

export interface ScrapedSign {
  code: string;
  name: string;
  imageUrl: string | null;
  category: ViennaCategory;
}

export type ScrapedData = Record<ViennaCategory, ScrapedSign[]>;

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';

/** Default per-request timeout in ms. Node's fetch has none — without this a
 * stalled connection (e.g. Commons under load) hangs the script forever. */
const FETCH_TIMEOUT_MS = 60_000;

/** fetch wrapper that aborts after `timeoutMs`. */
const fetchWithTimeout = async (
  url: string,
  init: RequestInit = {},
  timeoutMs = FETCH_TIMEOUT_MS,
): Promise<Response> => {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
};

// ---------------------------------------------------------------------------
// Default heading → category map (Vienna Convention standard ordering)
// ---------------------------------------------------------------------------

const DEFAULT_HEADING_MAP: Array<{ pattern: string; category: ViennaCategory }> = [
  // Priority must precede 'prohibitory' / 'regulatory' to avoid false match.
  { pattern: 'priority', category: 'priority' },
  { pattern: 'right of way', category: 'priority' },
  { pattern: 'right-of-way', category: 'priority' },
  { pattern: 'yield', category: 'priority' },
  { pattern: 'give way', category: 'priority' },
  // 'stop' alone was too broad (matched "Stoplight", "Bus stops"). Require
  // an explicit "stop sign(s)" context instead.
  { pattern: 'stop sign', category: 'priority' },
  // Warning
  { pattern: 'warning', category: 'warning' },
  { pattern: 'danger', category: 'warning' },
  { pattern: 'hazard', category: 'warning' },
  // Mandatory (before prohibitory so "mandatory" doesn't hit "regulatory")
  { pattern: 'mandatory', category: 'mandatory' },
  { pattern: 'obligation', category: 'mandatory' },
  { pattern: 'compulsory', category: 'mandatory' },
  // Prohibitory.
  // NOTE: `regulatory` collapses into `prohibitory` because the Vienna factory's
  //   `ViennaCategory` union only has five entries. Countries that genuinely
  //   distinguish a separate Regulatory category (UK, CA, AU, BR, ZA, MY, …)
  //   either use their own scraper or override this mapping via
  //   `headingMapExtra` with their own category union.
  { pattern: 'prohibitory', category: 'prohibitory' },
  { pattern: 'prohibition', category: 'prohibitory' },
  { pattern: 'prohibit', category: 'prohibitory' },
  { pattern: 'regulatory', category: 'prohibitory' },
  { pattern: 'restriction', category: 'prohibitory' },
  { pattern: 'restrictive', category: 'prohibitory' },
  { pattern: 'speed limit', category: 'prohibitory' },
  { pattern: 'no entry', category: 'prohibitory' },
  // Information / direction / service
  { pattern: 'information', category: 'information' },
  { pattern: 'direction', category: 'information' },
  { pattern: 'service', category: 'information' },
  { pattern: 'guide', category: 'information' },
  { pattern: 'route', category: 'information' },
  { pattern: 'destination', category: 'information' },
  { pattern: 'indication', category: 'information' },
  { pattern: 'local', category: 'information' },
  { pattern: 'motorway', category: 'information' },
  { pattern: 'additional', category: 'information' },
];

/**
 * Maps a single letter (A–Z) to a category for countries that organise signs
 * purely by series letter (e.g. "Series A", "Class A").
 */
const DEFAULT_LETTER_SERIES_MAP: Record<string, ViennaCategory> = {
  A: 'warning',
  B: 'priority',
  C: 'prohibitory',
  D: 'mandatory',
  E: 'information',
  F: 'information',
  G: 'information',
  H: 'information',
  I: 'information',
  J: 'warning', // Netherlands J series = warning
};

// ---------------------------------------------------------------------------
// Default sign code extractor — handles most Vienna Convention formats
// ---------------------------------------------------------------------------

/**
 * Matches standard Vienna Convention sign codes:
 *   A1, B-3, C22e, J22, R-100, P-1a, S-7, RA-2 (Canada-style), etc.
 * Rejects pure numbers (those are TSRGD / UK diagram codes).
 */
const DEFAULT_CODE_RE = /\b([A-Z]{1,3}[-.]?\d+(?:[._-]\d+)*[a-z]?)\b/i;

const defaultExtractCode = (text: string): string | null => {
  const m = text.match(DEFAULT_CODE_RE);
  if (!m) return null;
  // Reject if the match is suspiciously short (< 2 chars) — avoids false positives.
  if (m[1].replace(/[^a-z0-9]/gi, '').length < 2) return null;
  return m[1].toUpperCase();
};

// ---------------------------------------------------------------------------
// Config interface
// ---------------------------------------------------------------------------

export interface ViennaCountryConfig {
  /** ISO 3166-1 alpha-2 country code, lowercase. */
  cc: string;
  /** Display name, e.g. "Germany". */
  country: string;
  /** Wikipedia article URL. Omit or set to empty string to use Commons-only. */
  wikipediaUrl?: string;
  /**
   * Additional heading → category patterns prepended before the defaults.
   * Use this for country-specific heading text not covered by the defaults.
   */
  headingMapExtra?: Array<{ pattern: string; category: ViennaCategory }>;
  /**
   * Per-letter series mapping override (for countries like NL that organise
   * signs as "Series A", "Series B" etc.). Falls back to DEFAULT_LETTER_SERIES_MAP.
   */
  letterSeriesMap?: Record<string, ViennaCategory>;
  /** Wikimedia Commons category names to use as SVG supplement. */
  commonsCategories: string[];
  /**
   * Custom code extractor — override when the country uses a non-standard
   * code format (e.g. Germany's "Zeichen 101").
   */
  extractCode?: (text: string) => string | null;
}

// ---------------------------------------------------------------------------
// Shared scraping helpers
// ---------------------------------------------------------------------------

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const buildResolveCategory = (
  headingMapExtra: Array<{ pattern: string; category: ViennaCategory }> | undefined,
  letterSeriesMap: Record<string, ViennaCategory> | undefined,
) => {
  const map = [...(headingMapExtra ?? []), ...DEFAULT_HEADING_MAP];
  const seriesMap = letterSeriesMap ?? DEFAULT_LETTER_SERIES_MAP;

  return (headingText: string): ViennaCategory | null => {
    const lower = headingText.toLowerCase();
    for (const { pattern, category } of map) {
      if (lower.includes(pattern)) return category;
    }
    // Try "Series X" / "Class X" / "X signs" pattern.
    const seriesMatch =
      lower.match(/\b(?:series|class|type)\s+([a-z])\b/) ??
      lower.match(/\b([a-z])\s+(?:sign|class|series)\b/);
    if (seriesMatch) {
      const letter = seriesMatch[1].toUpperCase();
      return seriesMap[letter] ?? null;
    }
    return null;
  };
};

const buildScrapeGallery =
  (extract: (text: string) => string | null) =>
  (galleryNode: ReturnType<typeof parse>, category: ViennaCategory): ScrapedSign[] => {
    const signs: ScrapedSign[] = [];
    for (const li of galleryNode.querySelectorAll('li.gallerybox')) {
      const imgLink = li.querySelector('.thumb a, .gallery-image-body a');
      const href = imgLink?.getAttribute('href') ?? null;
      const imageUrl = href ? `https://en.wikipedia.org${href}` : null;

      const captionEl = li.querySelector('.gallerytext, figcaption');
      const caption = captionEl?.textContent?.trim() ?? '';

      const code = extract(caption) ?? (href ? extract(decodeURIComponent(href)) : null);
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

const buildScrapeTable =
  (extract: (text: string) => string | null) =>
  (tableNode: ReturnType<typeof parse>, category: ViennaCategory): ScrapedSign[] => {
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
        const found = extract(text);
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

const fetchCommonsCategory = async (
  categoryName: string,
  extract: (text: string) => string | null,
  defaultCategory: ViennaCategory,
  seriesMap: Record<string, ViennaCategory>,
): Promise<ScrapedSign[]> => {
  const signs: ScrapedSign[] = [];
  let continueParam = '';

  for (let page = 0; page < 20; page++) {
    const url =
      `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers` +
      `&cmtitle=Category:${encodeURIComponent(categoryName)}&cmtype=file&cmlimit=500` +
      `&cmcontinue=${encodeURIComponent(continueParam)}&format=json&origin=*`;

    try {
      const res = await fetchWithTimeout(url, { headers: { 'User-Agent': USER_AGENT } });
      if (!res.ok) break;
      const json = (await res.json()) as {
        query: { categorymembers: Array<{ title: string }> };
        continue?: { cmcontinue: string };
      };

      for (const member of json.query?.categorymembers ?? []) {
        const title = member.title;
        if (!title.toLowerCase().endsWith('.svg')) continue;

        // Strip "File:" prefix and ".svg" suffix, then extract code.
        const stripped = title
          .replace(/^File:/i, '')
          .replace(/\.svg$/i, '')
          .replace(/_/g, ' ');

        const code = extract(stripped);
        if (!code) continue;

        const imageUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(title).replace(/%20/g, '_')}`;

        // Infer category from the code's first A–Z letter (skipping any leading digits/punctuation).
        const firstLetter = code.match(/[A-Z]/i)?.[0]?.toUpperCase();
        const category = firstLetter
          ? (seriesMap[firstLetter] ?? defaultCategory)
          : defaultCategory;

        signs.push({
          code,
          name:
            stripped
              .replace(code, '')
              .replace(/^[\s_\-–—]+/, '')
              .trim() || code,
          imageUrl,
          category,
        });
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

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createViennaScraper =
  (config: ViennaCountryConfig) => async (): Promise<ScrapedData> => {
    const {
      country,
      wikipediaUrl,
      headingMapExtra,
      letterSeriesMap,
      commonsCategories,
      extractCode: customExtract,
    } = config;

    const extract = customExtract ?? defaultExtractCode;
    const seriesMap = letterSeriesMap ?? DEFAULT_LETTER_SERIES_MAP;
    const resolveCategory = buildResolveCategory(headingMapExtra, letterSeriesMap);
    const scrapeGallery = buildScrapeGallery(extract);
    const scrapeTable = buildScrapeTable(extract);

    const result: ScrapedData = {
      warning: [],
      priority: [],
      prohibitory: [],
      mandatory: [],
      information: [],
    };

    // --- Wikipedia ---
    if (wikipediaUrl) {
      console.log(`  Fetching Wikipedia: ${country}...`);
      const res = await fetchWithTimeout(wikipediaUrl, { headers: { 'User-Agent': USER_AGENT } });
      if (!res.ok) throw new Error(`Failed to fetch Wikipedia (${res.status}): ${wikipediaUrl}`);

      const html = await res.text();
      const doc = parse(html);

      let activeCategory: ViennaCategory | null = null;
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
    } else {
      console.log(`  No Wikipedia article — using Wikimedia Commons only.`);
    }

    // --- Wikimedia Commons supplement ---
    if (commonsCategories.length > 0) {
      console.log(`  Supplementing from Wikimedia Commons...`);
      const existingCodes = new Set(
        Object.values(result)
          .flat()
          .map((s) => s.code),
      );
      let added = 0;

      for (const cat of commonsCategories) {
        console.log(`    commons/${cat}...`);
        const signs = await fetchCommonsCategory(cat, extract, 'information', seriesMap);
        for (const sign of signs) {
          if (!existingCodes.has(sign.code)) {
            result[sign.category].push(sign);
            existingCodes.add(sign.code);
            added++;
          }
        }
      }
      console.log(`  Added ${added} signs from Wikimedia Commons`);
    }

    for (const [cat, signs] of Object.entries(result)) {
      if (signs.length === 0) console.warn(`  Warning: no signs found for category "${cat}"`);
      else console.log(`  ${cat}: ${signs.length} signs`);
    }

    return result;
  };
