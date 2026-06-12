/**
 * scrape-ma.ts — Morocco
 *
 * Moroccan signs follow the Vienna Convention (Code de la route, Dahir 1-10-07).
 * Wikipedia uses French section headings.
 *
 * Run via: yarn update --country=ma
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ma',
  country: 'Morocco',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Morocco',
  headingMapExtra: [
    { pattern: 'danger', category: 'warning' },
    { pattern: 'priorité', category: 'priority' },
    { pattern: 'interdiction', category: 'prohibitory' },
    { pattern: 'obligation', category: 'mandatory' },
    { pattern: 'indication', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Morocco', 'Road_signs_in_Morocco'],
});
