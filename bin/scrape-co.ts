/**
 * scrape-co.ts — Colombia
 *
 * Colombian signs follow the Manual de Señalización Vial (MSV / INVIAS),
 * a Vienna Convention variant. Wikipedia uses Spanish section headings.
 *
 * Run via: yarn update --country=co
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'co',
  country: 'Colombia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Colombia',
  headingMapExtra: [
    { pattern: 'preventiva', category: 'warning' },
    { pattern: 'reglamentaria', category: 'prohibitory' },
    { pattern: 'informativa', category: 'information' },
    { pattern: 'indicativa', category: 'information' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'warning', category: 'warning' },
  ],
  commonsCategories: ['SVG_road_signs_in_Colombia', 'Road_signs_in_Colombia'],
});
