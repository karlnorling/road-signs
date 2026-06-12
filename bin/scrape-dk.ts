/**
 * scrape-dk.ts — Denmark
 *
 * Danish signs follow the Vienna Convention (Færdselsloven).
 * Codes: A (warning), B (priority/give-way), C (prohibitory), D (mandatory), E–F (information).
 *
 * Run via: yarn update --country=dk
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'dk',
  country: 'Denmark',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Denmark',
  headingMapExtra: [
    { pattern: 'advarsel', category: 'warning' },
    { pattern: 'vigepligt', category: 'priority' },
    { pattern: 'forbud', category: 'prohibitory' },
    { pattern: 'påbud', category: 'mandatory' },
    { pattern: 'oplysning', category: 'information' },
    { pattern: 'vejledning', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Denmark', 'Road_signs_in_Denmark'],
});
