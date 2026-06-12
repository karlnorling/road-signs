/**
 * scrape-cr.ts — Costa Rica
 *
 * Costa Rican signs follow the Manual Centroamericano de Dispositivos Uniformes
 * para el Control del Tránsito (SIECA), a Vienna Convention variant.
 * Wikipedia uses Spanish section headings.
 *
 * Run via: yarn update --country=cr
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'cr',
  country: 'Costa Rica',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Costa_Rica',
  headingMapExtra: [
    { pattern: 'preventiva', category: 'warning' },
    { pattern: 'reglamentaria', category: 'prohibitory' },
    { pattern: 'informativa', category: 'information' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'warning', category: 'warning' },
  ],
  commonsCategories: ['SVG_road_signs_in_Costa_Rica', 'Road_signs_in_Costa_Rica'],
});
