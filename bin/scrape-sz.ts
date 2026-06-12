/**
 * scrape-sz.ts — Eswatini
 *
 * Eswatini uses the SADC regional sign standard (Road signs in the Southern
 * African Development Community). No Eswatini-specific SVG diagrams exist on
 * Wikimedia Commons; signs are sourced from the shared SADC category.
 * Run via: yarn update --country=sz
 */
import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'sz',
  country: 'Eswatini',
  commonsCategories: ['SVG_road_signs_in_Eswatini'],
});
