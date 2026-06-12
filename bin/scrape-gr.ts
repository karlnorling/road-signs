/**
 * scrape-gr.ts — Greece
 *
 * Greek signs follow the Vienna Convention (ΚΟΚ — Κώδικας Οδικής Κυκλοφορίας).
 * Wikipedia organises them as ΚΟΚ series: Κ (warning), Ρ (regulatory/prohibitory),
 * Π (information), Πρ (additional). Commons filenames use romanized prefixes.
 *
 * Run via: yarn update --country=gr
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'gr',
  country: 'Greece',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Greece',
  headingMapExtra: [
    // Greek KOK section headings
    { pattern: 'kok series κ', category: 'warning' },
    { pattern: 'kok series ρ', category: 'prohibitory' },
    { pattern: 'kok series π', category: 'information' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'additional', category: 'information' },
    { pattern: 'temporary', category: 'information' },
  ],
  // Greek letter → category for Commons inference
  letterSeriesMap: {
    K: 'warning', // Κ romanized
    R: 'prohibitory', // Ρ romanized
    P: 'information', // Π romanized
  },
  commonsCategories: ['SVG_road_signs_in_Greece'],
  // Greek codes: K1, K10, R1, R10, P1, etc. (romanized ΚΟΚ codes)
  extractCode: (text: string): string | null => {
    // Match romanized KOK codes: K1, K1a, R1, P1, etc.
    const kok = text.match(/\b([KRP]\d+[a-z]?)\b/i);
    if (kok) return kok[1].toUpperCase();
    // Fallback: standard letter+number
    const std = text.match(/\b([A-Z]{1,3}[-.]?\d+(?:[._-]\d+)*[a-z]?)\b/i);
    return std ? std[1].toUpperCase() : null;
  },
});
