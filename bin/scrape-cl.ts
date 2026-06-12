/**
 * scrape-cl.ts — Chile
 *
 * Chilean signs follow the Manual de Señalización de Tránsito (DGOP/MOP),
 * a Vienna Convention variant. Wikipedia uses Spanish section headings.
 *
 * Run via: yarn update --country=cl
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'cl',
  country: 'Chile',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Chile',
  headingMapExtra: [
    { pattern: 'preventiva', category: 'warning' },
    { pattern: 'reglamentaria', category: 'prohibitory' },
    { pattern: 'informativa', category: 'information' },
    { pattern: 'indicativa', category: 'information' },
    { pattern: 'regulatory', category: 'prohibitory' },
  ],
  commonsCategories: ['SVG_road_signs_in_Chile', 'Road_signs_in_Chile'],
});
