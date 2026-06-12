/**
 * scrape-no.ts — Norway
 *
 * Norwegian signs follow the Vienna Convention (Vegtrafikkloven / Skiltforskriften).
 * Codes: 1xx (warning), 2xx (priority), 3xx (prohibitory), 4xx (mandatory), 5xx–7xx (information).
 *
 * Run via: yarn update --country=no
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'no',
  country: 'Norway',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Norway',
  headingMapExtra: [
    { pattern: 'advarsel', category: 'warning' },
    { pattern: 'vikeplikt', category: 'priority' },
    { pattern: 'forbud', category: 'prohibitory' },
    { pattern: 'påbud', category: 'mandatory' },
    { pattern: 'opplysning', category: 'information' },
    { pattern: 'vegvisning', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Norway'],
  // Norwegian codes: 100-series warning, 200-series priority, etc.
  extractCode: (text: string): string | null => {
    // Prefer 3-digit numeric codes (1xx–7xx) with optional suffix
    const num = text.match(/\b([1-7]\d{2}(?:\.\d+)?[a-z]?)\b/i);
    if (num) return num[1];
    // Fallback: standard letter+number
    const std = text.match(/\b([A-Z]{1,3}[-.]?\d+(?:[._-]\d+)*[a-z]?)\b/i);
    return std ? std[1].toUpperCase() : null;
  },
});
