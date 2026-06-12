/**
 * scrape-lu.ts — Luxembourg
 *
 * Luxembourg follows the Vienna Convention (Code de la route / Straßenverkehrsordnung).
 * There is no English Wikipedia article for Luxembourg road signs, so scraping
 * produces no data. All signs are populated by fill-gaps.ts from Wikimedia Commons.
 *
 * Run via: yarn update --country=lu
 */

export default async () => ({
  warning: [],
  priority: [],
  prohibitory: [],
  mandatory: [],
  information: [],
});
