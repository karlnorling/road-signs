/**
 * scrape-nl.ts — Netherlands
 *
 * Dutch signs are organised by series: A (warning), B (priority),
 * C (prohibitory), D/E (mandatory), F/G (information), J (warning).
 * Wikipedia article uses "Series A", "Series B" etc. as headings.
 *
 * Run via: yarn update --country=nl
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'nl',
  country: 'Netherlands',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Netherlands',
  headingMapExtra: [
    { pattern: 'gevaar', category: 'warning' },
    { pattern: 'voorrang', category: 'priority' },
    { pattern: 'verbod', category: 'prohibitory' },
    { pattern: 'gebod', category: 'mandatory' },
    { pattern: 'aanwijzing', category: 'information' },
  ],
  letterSeriesMap: {
    A: 'warning',
    B: 'priority',
    C: 'prohibitory',
    D: 'mandatory',
    E: 'mandatory',
    F: 'information',
    G: 'information',
    H: 'information',
    J: 'warning', // J series: danger / hazard boards
    L: 'information',
  },
  commonsCategories: ['SVG_road_signs_in_the_Netherlands'],
});
