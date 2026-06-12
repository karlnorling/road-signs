/**
 * scrape-ao.ts — Angola
 *
 * Angola uses a Portuguese-influenced sign system (Vienna Convention) with
 * codes A (warning), B (priority), C (prohibition), D (mandatory), H/M
 * (information). Run via: yarn update --country=ao
 */
import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ao',
  country: 'Angola',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Angola',
  headingMapExtra: [
    { pattern: 'aviso', category: 'warning' },
    { pattern: 'prioridade', category: 'priority' },
    { pattern: 'proibi', category: 'prohibitory' },
    { pattern: 'obriga', category: 'mandatory' },
    { pattern: 'informa', category: 'information' },
    { pattern: 'adicional', category: 'information' },
  ],
  letterSeriesMap: {
    A: 'warning',
    B: 'priority',
    C: 'prohibitory',
    D: 'mandatory',
    H: 'information',
    M: 'information',
  },
  commonsCategories: ['SVG_road_signs_in_Angola'],
});
