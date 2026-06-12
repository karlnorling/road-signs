/**
 * scrape-pl.ts — Poland
 *
 * Polish signs use letter+dash+number codes: A-1 (ostrzegawcze/warning),
 * B-1 (zakazu/prohibitory), C-1 (nakazu/mandatory), D-1 (informacyjne/info),
 * E (kierunku/direction), F (uzupełniające/supplementary), T (tabliczki).
 *
 * Run via: yarn update --country=pl
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'pl',
  country: 'Poland',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Poland',
  headingMapExtra: [
    { pattern: 'ostrzegawcze', category: 'warning' },
    { pattern: 'pierwszeństwo', category: 'priority' },
    { pattern: 'zakazu', category: 'prohibitory' },
    { pattern: 'nakazu', category: 'mandatory' },
    { pattern: 'informacyjne', category: 'information' },
    { pattern: 'kierunku', category: 'information' },
    { pattern: 'uzupełniające', category: 'information' },
  ],
  letterSeriesMap: {
    A: 'warning',
    B: 'prohibitory',
    C: 'mandatory',
    D: 'information',
    E: 'information',
    F: 'information',
    G: 'information',
    T: 'information',
  },
  commonsCategories: ['SVG_road_signs_in_Poland'],
});
