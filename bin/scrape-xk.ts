/**
 * scrape-xk.ts — Kosovo
 *
 * Kosovo follows the Vienna Convention. No Kosovo-specific SVG sign diagrams
 * exist on Wikimedia Commons; the sign set mirrors Serbia (inherited from the
 * Yugoslav/Serbian road sign system). Run via: yarn update --country=xk
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'xk',
  country: 'Kosovo',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Serbia',
  headingMapExtra: [
    { pattern: 'danger warning', category: 'warning' },
    { pattern: 'right of way', category: 'priority' },
    { pattern: 'prohibition', category: 'prohibitory' },
    { pattern: 'obligation', category: 'mandatory' },
    { pattern: 'special regulation', category: 'information' },
    { pattern: 'guide', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Serbia'],
});
