/**
 * scrape-ar.ts — Argentina
 *
 * Argentine signs follow the Vienna Convention variant (Decreto 779/95 — Reglamento Nacional de Tránsito).
 * Wikipedia uses Spanish section headings.
 *
 * Run via: yarn update --country=ar
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ar',
  country: 'Argentina',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Argentina',
  headingMapExtra: [
    { pattern: 'preventiva', category: 'warning' },
    { pattern: 'reglamentaria', category: 'prohibitory' },
    { pattern: 'informativa', category: 'information' },
    { pattern: 'indicativa', category: 'information' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'warning', category: 'warning' },
  ],
  commonsCategories: ['SVG_road_signs_in_Argentina', 'Road_signs_in_Argentina'],
});
