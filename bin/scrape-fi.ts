/**
 * scrape-fi.ts — Finland
 *
 * Finnish signs follow the Vienna Convention (Tieliikennelaki).
 * Codes are 3-digit numeric: 111–xx (warning), 211–xx (priority),
 * 311–xx (prohibitory), 411–xx (mandatory), 511–xx (information).
 *
 * Run via: yarn update --country=fi
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'fi',
  country: 'Finland',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Finland',
  headingMapExtra: [
    { pattern: 'varoitus', category: 'warning' },
    { pattern: 'etuajo', category: 'priority' },
    { pattern: 'kielto', category: 'prohibitory' },
    { pattern: 'määräys', category: 'mandatory' },
    { pattern: 'opaste', category: 'information' },
    { pattern: 'lisäkilpi', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Finland'],
  // Finnish codes: 3-digit numbers optionally followed by a letter (111, 121, 122a)
  extractCode: (text: string): string | null => {
    const num = text.match(/\b([1-5]\d{2}[a-z]?)\b/i);
    if (num) return num[1];
    // Fallback: standard letter+number
    const std = text.match(/\b([A-Z]{1,3}[-.]?\d+(?:[._-]\d+)*[a-z]?)\b/i);
    return std ? std[1].toUpperCase() : null;
  },
});
