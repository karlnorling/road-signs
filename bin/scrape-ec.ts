/**
 * scrape-ec.ts — Ecuador
 *
 * Ecuadorian signs follow the INEN (Instituto Ecuatoriano de Normalización)
 * standard, a Vienna Convention variant. Wikipedia uses Spanish section headings.
 *
 * Run via: yarn update --country=ec
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ec',
  country: 'Ecuador',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Ecuador',
  headingMapExtra: [
    { pattern: 'preventiva', category: 'warning' },
    { pattern: 'reglamentaria', category: 'prohibitory' },
    { pattern: 'informativa', category: 'information' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'warning', category: 'warning' },
  ],
  commonsCategories: ['SVG_road_signs_in_Ecuador', 'Road_signs_in_Ecuador'],
});
