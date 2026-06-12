/**
 * scrape-ch.ts — Switzerland
 *
 * Swiss signs follow the Vienna Convention (SVV / SSV).
 * Codes use decimal format: 1.01, 1.02 (warning), 2.xx (priority),
 * 3.xx (prohibitory), 4.xx (mandatory), 5.xx–6.xx (information).
 *
 * Run via: yarn update --country=ch
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ch',
  country: 'Switzerland',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Switzerland',
  headingMapExtra: [
    { pattern: 'gefahren', category: 'warning' },
    { pattern: 'vortrittzeichen', category: 'priority' },
    { pattern: 'verbots', category: 'prohibitory' },
    { pattern: 'gebots', category: 'mandatory' },
    { pattern: 'hinweis', category: 'information' },
    { pattern: 'richtungs', category: 'information' },
    { pattern: 'signal de danger', category: 'warning' },
    { pattern: 'signal de priorité', category: 'priority' },
    { pattern: "signal d'interdiction", category: 'prohibitory' },
    { pattern: 'signal de prescription', category: 'mandatory' },
    { pattern: "signal d'indication", category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Switzerland'],
  // Swiss codes: 1.01, 2.10, 3.01 (section.number)
  extractCode: (text: string): string | null => {
    const m = text.match(/\b([1-6]\.\d{2}[a-z]?)\b/i);
    if (m) return m[1];
    // Fallback to standard letter+number
    const std = text.match(/\b([A-Z]{1,3}[-.]?\d+(?:[._-]\d+)*[a-z]?)\b/i);
    return std ? std[1].toUpperCase() : null;
  },
});
