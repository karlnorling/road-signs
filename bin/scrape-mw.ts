/**
 * scrape-mw.ts — Malawi
 *
 * Malawi uses the SADC regional sign standard (Road signs in the Southern
 * African Development Community). No Malawi-specific SVG diagrams exist on
 * Wikimedia Commons; signs are sourced from the shared SADC category.
 * Run via: yarn update --country=mw
 */
import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'mw',
  country: 'Malawi',
  commonsCategories: ['SVG_road_signs_in_Malawi'],
});
