/**
 * scrape-pt.ts — Portugal
 *
 * Portuguese signs follow the Vienna Convention.
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E–L (information).
 *
 * Run via: yarn update --country=pt
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'pt',
  country: 'Portugal',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Portugal',
  headingMapExtra: [
    { pattern: 'perigo', category: 'warning' },
    { pattern: 'cedência', category: 'priority' },
    { pattern: 'proibição', category: 'prohibitory' },
    { pattern: 'obrigação', category: 'mandatory' },
    { pattern: 'informação', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Portugal'],
});
