/**
 * scrape-mx.ts — Mexico
 *
 * Mexican signs follow the SCT (Secretaría de Comunicaciones y Transportes)
 * manual, a Vienna Convention variant. Wikipedia uses Spanish section headings.
 *
 * Run via: yarn update --country=mx
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'mx',
  country: 'Mexico',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Mexico',
  headingMapExtra: [
    { pattern: 'preventiva', category: 'warning' },
    { pattern: 'restrictiva', category: 'prohibitory' },
    { pattern: 'informativa', category: 'information' },
    { pattern: 'indicativa', category: 'information' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'warning', category: 'warning' },
  ],
  commonsCategories: ['SVG_road_signs_in_Mexico', 'Road_signs_in_Mexico'],
});
