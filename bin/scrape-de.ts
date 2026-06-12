/**
 * scrape-de.ts — Germany
 *
 * German signs use "Zeichen NNN" (sign number) codes. The Wikipedia English
 * article uses numeric codes in captions; Wikimedia Commons filenames follow
 * the pattern "Zeichen NNN - description.svg".
 *
 * Run via: yarn update --country=de
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'de',
  country: 'Germany',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Germany',
  headingMapExtra: [
    { pattern: 'vorfahrt', category: 'priority' },
    { pattern: 'gefahrenzeichen', category: 'warning' },
    { pattern: 'vorschrift', category: 'prohibitory' },
    { pattern: 'gebot', category: 'mandatory' },
    { pattern: 'hinweis', category: 'information' },
    { pattern: 'richtzeichen', category: 'information' },
    { pattern: 'zusatzzeichen', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Germany', 'Warnschilder_(Deutschland)'],
  // German codes: "Zeichen 101", "Zeichen 306" → "101", "306"
  // Also handle plain numerics in short strings and standard letter+number codes.
  extractCode: (text: string): string | null => {
    const zeichen = text.match(/\bZeichen\s+(\d+[a-z]?(?:\s*[-–]\s*\d+[a-z]?)?)\b/i);
    if (zeichen) return zeichen[1].replace(/\s+/g, '').toUpperCase();
    // Standalone 2–4 digit number in a short field (gallery caption / table cell).
    if (text.length <= 40) {
      const num = text.match(/\b(\d{2,4}[a-z]?)\b/i);
      if (num) return num[1].toUpperCase();
    }
    // Fallback: standard letter+number (e.g. StVO annexes occasionally use letters).
    const letter = text.match(/\b([A-Z]{1,2}\d+(?:[._-]\d+)*[a-z]?)\b/i);
    return letter ? letter[1].toUpperCase() : null;
  },
});
