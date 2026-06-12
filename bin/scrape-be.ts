/**
 * scrape-be.ts — Belgium
 *
 * Belgian signs follow the Vienna Convention.
 * Codes: A (warning), B (priority/give-way), C (prohibitory), D (mandatory), E–X (information).
 *
 * Run via: yarn update --country=be
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'be',
  country: 'Belgium',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Belgium',
  headingMapExtra: [
    { pattern: 'gevaar', category: 'warning' },
    { pattern: 'voorrang', category: 'priority' },
    { pattern: 'verbod', category: 'prohibitory' },
    { pattern: 'gebod', category: 'mandatory' },
    { pattern: 'aanwijzing', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Belgium'],
});
