/**
 * scrape-es.ts — Spain
 *
 * Spanish signs use letter+dash+number codes: P-1a (peligro/warning),
 * R-1 (reglamentación/regulatory), S-1 (información/information),
 * M-1 (maniobra/manoeuvre).
 *
 * Run via: yarn update --country=es
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'es',
  country: 'Spain',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Spain',
  headingMapExtra: [
    { pattern: 'peligro', category: 'warning' },
    { pattern: 'prioridad', category: 'priority' },
    { pattern: 'reglamentación', category: 'prohibitory' },
    { pattern: 'indicación', category: 'information' },
    { pattern: 'maniobra', category: 'mandatory' },
  ],
  letterSeriesMap: {
    P: 'warning',
    R: 'prohibitory',
    S: 'information',
    M: 'mandatory',
  },
  commonsCategories: ['SVG_road_signs_in_Spain'],
});
