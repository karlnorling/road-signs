/**
 * scrape-jp.ts — Japan
 *
 * Japanese road signs are governed by the Road Traffic Law (道路交通法).
 * Signs are categorised as: regulatory (規制標識), warning (警戒標識),
 * instruction (指示標識), and guide (案内標識).
 * Codes are numeric (e.g. 101, 201, 301).
 *
 * Run via: yarn update --country=jp
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'jp',
  country: 'Japan',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Japan',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'regulation', category: 'prohibitory' },
    { pattern: 'prohibitory', category: 'prohibitory' },
    { pattern: 'warning', category: 'warning' },
    { pattern: 'instruction', category: 'mandatory' },
    { pattern: 'guide', category: 'information' },
    { pattern: 'information', category: 'information' },
    { pattern: '規制', category: 'prohibitory' },
    { pattern: '警戒', category: 'warning' },
    { pattern: '指示', category: 'mandatory' },
    { pattern: '案内', category: 'information' },
  ],
  commonsCategories: ['Road_signs_in_Japan'],
  // Japanese codes: 3–4 digit numbers (101, 201, 302, etc.)
  extractCode: (text: string): string | null => {
    const num = text.match(/\b([1-4]\d{2}(?:-\d+)?)\b/);
    if (num) return num[1];
    // Fallback: standard code
    const std = text.match(/\b([A-Z]{1,3}[-.]?\d+(?:[._-]\d+)*[a-z]?)\b/i);
    return std ? std[1].toUpperCase() : null;
  },
});
