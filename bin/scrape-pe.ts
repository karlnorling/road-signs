/**
 * scrape-pe.ts — Peru
 *
 * Peruvian signs follow the Manual de Dispositivos de Control del Tránsito
 * Automotor para Calles y Carreteras (MTC), a Vienna Convention variant.
 * Wikipedia uses Spanish section headings.
 *
 * Run via: yarn update --country=pe
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'pe',
  country: 'Peru',
  // No Wikipedia article exists — using Wikimedia Commons only.
  headingMapExtra: [
    { pattern: 'preventiva', category: 'warning' },
    { pattern: 'reglamentaria', category: 'prohibitory' },
    { pattern: 'informativa', category: 'information' },
    { pattern: 'indicativa', category: 'information' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'warning', category: 'warning' },
  ],
  commonsCategories: ['SVG_road_signs_in_Peru', 'Road_signs_in_Peru'],
});
