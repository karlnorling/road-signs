/**
 * scrape-cy.ts — Cyprus
 *
 * Cypriot signs follow the Vienna Convention (Road Traffic Law, Cap. 332).
 * Left-hand traffic; sign series mirrors the Vienna standard.
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=cy
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'cy',
  country: 'Cyprus',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Cyprus',
  commonsCategories: ['SVG_road_signs_in_Cyprus'],
});
