/**
 * scrape-at.ts — Austria
 *
 * Austrian signs follow the Vienna Convention (StVO).
 * Codes: letter+number similar to Germany — §15 etc. on Wikipedia but
 * Commons files use patterns like "Austria_road_sign_a1.svg".
 *
 * Run via: yarn update --country=at
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'at',
  country: 'Austria',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Austria',
  headingMapExtra: [
    { pattern: 'gefahren', category: 'warning' },
    { pattern: 'vorrang', category: 'priority' },
    { pattern: 'verbots', category: 'prohibitory' },
    { pattern: 'gebots', category: 'mandatory' },
    { pattern: 'hinweis', category: 'information' },
    { pattern: 'wegweis', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Austria'],
});
