/**
 * generate-docs.ts
 *
 * Generates coverage documentation in two places:
 *   1. packages/@road-signs/docs/  — standalone publishable markdown package
 *   2. apps/docs/src/content/docs/countries/{cc}.mdx — injects a ## Coverage
 *      section into each Astro Starlight country page (between marker comments)
 *
 * Usage: yarn generate-docs
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// ---------------------------------------------------------------------------
// Country metadata
// ---------------------------------------------------------------------------

interface CountryMeta {
  name: string;
  standard: string;
  sources: Array<{ label: string; url: string }>;
  notes?: string;
}

const COUNTRIES: Record<string, CountryMeta> = {
  al: {
    name: 'Albania',
    standard: 'Kodi Rrugor — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Albania',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Albania',
      },
    ],
  },
  ar: {
    name: 'Argentina',
    standard: 'Decreto 779/95 — Reglamento Nacional de Tránsito (Vienna Convention variant)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Argentina',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Argentina',
      },
      {
        label: 'Wikimedia Commons — Road signs in Argentina (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Argentina',
      },
    ],
  },
  at: {
    name: 'Austria',
    standard: 'StVO (Straßenverkehrs-Ordnung) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Austria',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Austria',
      },
    ],
  },
  au: {
    name: 'Australia',
    standard: 'AS1742 (Manual of Uniform Traffic Control Devices)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Australia',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Australia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Australia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Australia',
      },
    ],
    notes:
      'Sign codes and designs vary by state/territory; national AS1742 standards are used where available.',
  },
  ba: {
    name: 'Bosnia and Herzegovina',
    standard: 'Zakon o osnovama bezbjednosti saobraćaja na cestama — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Bosnia and Herzegovina',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bosnia_and_Herzegovina',
      },
    ],
  },
  be: {
    name: 'Belgium',
    standard: 'Code de la route / Verkeersreglement — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Belgium',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belgium',
      },
    ],
  },
  bg: {
    name: 'Bulgaria',
    standard: 'Закон за движението по пътищата (ZDP) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Bulgaria',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bulgaria',
      },
    ],
  },
  bn: {
    name: 'Brunei',
    standard: 'Road Traffic Act — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Brunei',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Brunei',
      },
    ],
    notes:
      'No Wikipedia road signs article exists. Signs are sourced directly from Wikimedia Commons subcategories (warning, information, prohibitory, mandatory, priority, regulatory).',
  },
  cl: {
    name: 'Chile',
    standard: 'Manual de Señalización de Tránsito (DGOP/MOP) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Chile',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Chile',
      },
      {
        label: 'Wikimedia Commons — Road signs in Chile (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Chile',
      },
    ],
  },
  co: {
    name: 'Colombia',
    standard: 'Manual de Señalización Vial (MSV/INVIAS) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Colombia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Colombia',
      },
      {
        label: 'Wikimedia Commons — Road signs in Colombia (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Colombia',
      },
    ],
  },
  cr: {
    name: 'Costa Rica',
    standard:
      'Manual Centroamericano de Dispositivos Uniformes para el Control del Tránsito (SIECA) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in Costa Rica',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Costa_Rica',
      },
      {
        label: 'Wikimedia Commons — Road signs in Costa Rica',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Costa_Rica',
      },
      {
        label: 'Wikimedia Commons — Road signs in Costa Rica (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Costa_Rica',
      },
    ],
    notes:
      'Follows the Central American SIECA manual. Headings: Preventiva (warning), Reglamentaria (prohibitory), Informativa (information).',
  },
  cy: {
    name: 'Cyprus',
    standard: 'Road Traffic Law (Cap. 332) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Cyprus',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cyprus',
      },
    ],
  },
  br: {
    name: 'Brazil',
    standard: 'CTB (Código de Trânsito Brasileiro) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Brazil',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Brazil',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Brazil',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Brazil',
      },
    ],
  },
  ca: {
    name: 'Canada',
    standard: 'MUTCDC (Manual of Uniform Traffic Control Devices for Canada)',
    sources: [
      {
        label: 'Wikimedia Commons — Regulatory signs of Canada',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_regulatory_road_signs_of_Canada',
      },
      {
        label: 'Wikimedia Commons — Warning signs of Canada',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_warning_road_signs_of_Canada',
      },
      {
        label: 'Wikimedia Commons — School signs of Canada',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_school_road_signs_of_Canada',
      },
      {
        label: 'Wikimedia Commons — Temporary signs of Canada',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_temporary_road_signs_of_Canada',
      },
      {
        label: 'Wikimedia Commons — British Columbia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_British_Columbia',
      },
      {
        label: 'Wikimedia Commons — Quebec',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Quebec',
      },
      {
        label: 'Wikimedia Commons — Ontario',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Ontario',
      },
      {
        label: 'Wikimedia Commons — Alberta',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Alberta',
      },
      {
        label: 'Wikimedia Commons — Manitoba',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Manitoba',
      },
      {
        label: 'Wikimedia Commons — Nova Scotia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Nova_Scotia',
      },
      {
        label: 'Wikimedia Commons — New Brunswick',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_New_Brunswick',
      },
      {
        label: 'Wikimedia Commons — Saskatchewan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Saskatchewan',
      },
      {
        label: 'Wikimedia Commons — Prince Edward Island',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Prince_Edward_Island',
      },
      {
        label: 'Wikimedia Commons — Newfoundland and Labrador',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Newfoundland_and_Labrador',
      },
    ],
  },
  ch: {
    name: 'Switzerland',
    standard: 'SVV / SSV (Signalisationsverordnung) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Switzerland',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Switzerland',
      },
    ],
    notes:
      'Codes use decimal format: 1.xx (warning), 2.xx (priority), 3.xx (prohibitory), 4.xx (mandatory), 5–6.xx (information).',
  },
  ec: {
    name: 'Ecuador',
    standard: 'INEN (Instituto Ecuatoriano de Normalización) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in Ecuador',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Ecuador',
      },
      {
        label: 'Wikimedia Commons — Road signs in Ecuador',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ecuador',
      },
      {
        label: 'Wikimedia Commons — Road signs in Ecuador (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Ecuador',
      },
    ],
    notes:
      'Headings: Preventiva (warning), Reglamentaria (prohibitory), Informativa (information).',
  },
  de: {
    name: 'Germany',
    standard: 'StVO (Straßenverkehrs-Ordnung) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Germany',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Germany',
      },
      {
        label: 'Wikimedia Commons — Warnschilder (Deutschland)',
        url: 'https://commons.wikimedia.org/wiki/Category:Warnschilder_(Deutschland)',
      },
    ],
  },
  dk: {
    name: 'Denmark',
    standard: 'Færdselsloven — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Denmark',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Denmark',
      },
      {
        label: 'Wikimedia Commons — Road signs in Denmark (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Denmark',
      },
    ],
  },
  ee: {
    name: 'Estonia',
    standard: 'Liiklusseadus — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Estonia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Estonia',
      },
    ],
  },
  is: {
    name: 'Iceland',
    standard: 'Umferðarlög — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Iceland',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Iceland',
      },
      {
        label: 'Wikimedia Commons — Road signs in Iceland (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Iceland',
      },
    ],
  },
  es: {
    name: 'Spain',
    standard: 'Reglamento General de Circulación — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Spain',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Spain',
      },
    ],
    notes:
      'S-series (additional panel / service) signs are raster-only on Wikimedia; SVG coverage is ~89%.',
  },
  fi: {
    name: 'Finland',
    standard: 'Tieliikennelaki — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Finland',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Finland',
      },
    ],
    notes:
      'Codes are 3-digit numeric: 111–199 (warning), 211–299 (priority), 311–399 (prohibitory), 411–499 (mandatory), 511+ (information).',
  },
  fr: {
    name: 'France',
    standard: 'Code de la route — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in France',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_France',
      },
    ],
  },
  cz: {
    name: 'Czech Republic',
    standard: 'Zákon č. 361/2000 Sb. — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in the Czech Republic',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Czech_Republic',
      },
    ],
  },
  gr: {
    name: 'Greece',
    standard: 'ΚΟΚ (Κώδικας Οδικής Κυκλοφορίας) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Greece',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Greece',
      },
    ],
    notes: 'Codes use romanized ΚΟΚ series: K (warning), R (prohibitory), P (information).',
  },
  hr: {
    name: 'Croatia',
    standard: 'Pravilnik o prometnim znakovima — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Croatia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Croatia',
      },
    ],
  },
  hu: {
    name: 'Hungary',
    standard: 'KRESZ (Közúti Közlekedési Szabályzat) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Hungary',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Hungary',
      },
    ],
  },
  in: {
    name: 'India',
    standard: 'Motor Vehicles Act — IRC:67 standard',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in India',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_India',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in India',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_India',
      },
    ],
    notes:
      'Categories: Cautionary (warning), Mandatory (prohibitory/regulatory), Informatory (information).',
  },
  ie: {
    name: 'Ireland',
    standard: 'Road Traffic (Signs) Regulations — TSRGD-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Ireland',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Ireland',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Ireland',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ireland',
      },
    ],
  },
  il: {
    name: 'Israel',
    standard: 'Israeli Traffic Ordinance — Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Israel',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Israel',
      },
      {
        label: 'Wikimedia Commons — Road signs in Israel',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Israel',
      },
      {
        label: 'Wikimedia Commons — Road signs in Israel (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Israel',
      },
    ],
  },
  it: {
    name: 'Italy',
    standard: 'Codice della strada — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Italy',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Italy',
      },
    ],
    notes:
      'Panel (A/B/P/Q series) and traffic light signs exist only as raster images on Wikipedia.',
  },
  jp: {
    name: 'Japan',
    standard: 'Road Traffic Law (道路交通法)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Japan',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Japan',
      },
    ],
    notes:
      'Codes are 3-digit numeric: 1xx (regulatory), 2xx (warning), 3xx (instruction), 4xx (guide).',
  },
  kr: {
    name: 'South Korea',
    standard: 'Road Traffic Act (도로교통법)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in South Korea',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_South_Korea',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in South Korea',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_South_Korea',
      },
    ],
    notes:
      'Codes are numeric: 1xx (regulatory/prohibitory), 2xx (warning), 3xx (instruction), 4xx (guide).',
  },
  li: {
    name: 'Liechtenstein',
    standard: 'SSV/SVV (Signalisationsverordnung) — same signs as Switzerland',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Liechtenstein',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Liechtenstein',
      },
      {
        label: 'Wikimedia Commons — Road signs in Switzerland (shared)',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Switzerland',
      },
    ],
    notes:
      'Liechtenstein uses identical signs to Switzerland. Codes use decimal format: 1.xx (warning), 2.xx (priority), 3.xx (prohibitory), 4.xx (mandatory), 5–6.xx (information).',
  },
  lt: {
    name: 'Lithuania',
    standard: 'Kelių eismo taisyklės — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Lithuania',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Lithuania',
      },
    ],
  },
  lu: {
    name: 'Luxembourg',
    standard: 'Code de la route — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Luxembourg',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Luxembourg',
      },
    ],
  },
  lv: {
    name: 'Latvia',
    standard: 'Ceļu satiksmes noteikumi — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Latvia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Latvia',
      },
    ],
  },
  ma: {
    name: 'Morocco',
    standard: 'Code de la route (Dahir 1-10-07) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Morocco',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Morocco',
      },
      {
        label: 'Wikimedia Commons — Road signs in Morocco (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Morocco',
      },
    ],
  },
  me: {
    name: 'Montenegro',
    standard: 'Zakon o bezbjednosti saobraćaja na putevima — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Montenegro',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Montenegro',
      },
    ],
  },
  mg: {
    name: 'Madagascar',
    standard: 'SADC regional standard (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in the Southern African Development Community',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Southern_African_Development_Community',
      },
    ],
    notes:
      'Madagascar uses the SADC regional sign standard. No Madagascar-specific SVG diagrams exist on Wikimedia Commons; signs are sourced from the shared SADC category.',
  },
  my: {
    name: 'Malaysia',
    standard: 'Road Transport (Traffic Signs) Rules 1959 — Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Malaysia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Malaysia',
      },
      {
        label: 'Wikimedia Commons — Road signs in Malaysia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Malaysia',
      },
      {
        label: 'Wikimedia Commons — Road signs in Malaysia (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Malaysia',
      },
    ],
  },
  mk: {
    name: 'North Macedonia',
    standard: 'Закон за безбедност на сообраќајот на патиштата — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in North Macedonia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_North_Macedonia',
      },
    ],
  },
  mt: {
    name: 'Malta',
    standard: 'Traffic Ordinance (Chapter 65) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Malta',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Malta',
      },
      {
        label: 'Wikimedia Commons — Road signs in Malta (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Malta',
      },
    ],
  },
  mu: {
    name: 'Mauritius',
    standard: 'Traffic Signs Regulations 1990 — UK-derived system',
    sources: [
      {
        label: 'Wikipedia — Road signs in Mauritius',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Mauritius',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Mauritius',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mauritius',
      },
    ],
    notes:
      'Mauritius uses a UK-derived system (Traffic Signs Regulations 1990) rather than the SADC regional standard used by most neighbouring countries.',
  },
  mx: {
    name: 'Mexico',
    standard: 'SCT (Secretaría de Comunicaciones y Transportes) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Mexico',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mexico',
      },
      {
        label: 'Wikimedia Commons — Road signs in Mexico (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Mexico',
      },
    ],
  },
  nl: {
    name: 'Netherlands',
    standard: 'RVV 1990 (Reglement Verkeersregels en Verkeerstekens) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in the Netherlands',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Netherlands',
      },
    ],
    notes:
      'Several series (J, B, E, G, H, L, K) are raster-only on Wikimedia; SVG coverage is ~67%.',
  },
  no: {
    name: 'Norway',
    standard: 'Skiltforskriften — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Norway',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Norway',
      },
    ],
    notes:
      'Codes are numeric: 1xx (warning), 2xx (priority), 3xx (prohibitory), 4xx (mandatory), 5–7xx (information).',
  },
  nz: {
    name: 'New Zealand',
    standard: 'Traffic Control Devices Rule (NZTA)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in New Zealand',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_New_Zealand',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in New Zealand',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_New_Zealand',
      },
    ],
  },
  pe: {
    name: 'Peru',
    standard:
      'Manual de Dispositivos de Control del Tránsito Automotor (MTC) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in Peru',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Peru',
      },
      {
        label: 'Wikimedia Commons — Road signs in Peru',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Peru',
      },
      {
        label: 'Wikimedia Commons — Road signs in Peru (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Peru',
      },
    ],
    notes:
      'Headings: Preventiva (warning), Reglamentaria (prohibitory), Informativa/Indicativa (information).',
  },
  pl: {
    name: 'Poland',
    standard: 'Prawo o ruchu drogowym — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Poland',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Poland',
      },
    ],
    notes: 'Several code series (A–W) scraped from Wikipedia lack matching SVG assets on Commons.',
  },
  pt: {
    name: 'Portugal',
    standard: 'Código da Estrada — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Portugal',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Portugal',
      },
    ],
  },
  ro: {
    name: 'Romania',
    standard: 'Codul rutier (OUG 195/2002) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Romania',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Romania',
      },
    ],
  },
  rs: {
    name: 'Serbia',
    standard: 'Zakon o bezbednosti saobraćaja na putevima — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Serbia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Serbia',
      },
    ],
  },
  se: {
    name: 'Sweden',
    standard: 'Vägmärkesförordning (VMF) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Sweden',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Sweden',
      },
      {
        label: 'Wikimedia Commons — Road signs in Sweden (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Sweden',
      },
    ],
  },
  sg: {
    name: 'Singapore',
    standard: 'Road Traffic Act (Traffic Signs) Rules — Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Singapore',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Singapore',
      },
      {
        label: 'Wikimedia Commons — Road signs in Singapore',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Singapore',
      },
      {
        label: 'Wikimedia Commons — Road signs in Singapore (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Singapore',
      },
    ],
  },
  si: {
    name: 'Slovenia',
    standard: 'Pravilnik o prometni signalizaciji — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Slovenia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Slovenia',
      },
    ],
  },
  sk: {
    name: 'Slovakia',
    standard: 'Zákon č. 8/2009 Z. z. — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Slovakia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Slovakia',
      },
    ],
  },
  uk: {
    name: 'United Kingdom',
    standard: 'TSRGD (Traffic Signs Regulations and General Directions)',
    sources: [
      {
        label: 'Wikimedia Commons — Warning signs of the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:Warning_signs_of_the_United_Kingdom',
      },
      {
        label: 'Wikimedia Commons — Regulatory signs of the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:Regulatory_signs_of_the_United_Kingdom',
      },
      {
        label: 'Wikimedia Commons — Information signs of the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:Information_signs_of_the_United_Kingdom',
      },
      {
        label: 'Wikimedia Commons — Direction signs of the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:Direction_signs_of_the_United_Kingdom',
      },
      {
        label: 'Wikimedia Commons — Road works signs of the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_works_signs_of_the_United_Kingdom',
      },
      {
        label: 'Wikimedia Commons — Road signs in the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_United_Kingdom',
      },
    ],
    notes:
      'Variable-message motorway signs (direction/temporary categories) are raster-only on Wikimedia.',
  },
  th: {
    name: 'Thailand',
    standard: 'Land Traffic Act (พระราชบัญญัติจราจรทางบก)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Thailand',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Thailand',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Thailand',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Thailand',
      },
    ],
  },
  tr: {
    name: 'Turkey',
    standard: 'Karayolları Trafik Yönetmeliği — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Turkey',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Turkey',
      },
      {
        label: 'Wikimedia Commons — Road signs in Turkey (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Turkey',
      },
    ],
  },
  tw: {
    name: 'Taiwan',
    standard: 'Road Traffic Safety Rules (道路交通標誌標線號誌設置規則)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Taiwan',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Taiwan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Taiwan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Taiwan',
      },
    ],
  },
  ua: {
    name: 'Ukraine',
    standard: 'Правила дорожнього руху (PDR) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Ukraine',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ukraine',
      },
    ],
    notes:
      'Codes use decimal format: 1.xx (warning), 2.xx (priority), 3.xx (prohibitory), 4.xx (mandatory), 5.xx (information).',
  },
  us: {
    name: 'United States',
    standard: 'MUTCD (Manual on Uniform Traffic Control Devices) — FHWA',
    sources: [
      {
        label: 'FHWA MUTCD Standard Highway Signs (ZIP)',
        url: 'https://mutcd.fhwa.dot.gov/ser-shs_millennium.htm',
      },
      {
        label: 'Wikimedia Commons — MUTCD signs',
        url: 'https://commons.wikimedia.org/wiki/Category:MUTCD',
      },
      {
        label: 'Wikipedia — Manual on Uniform Traffic Control Devices',
        url: 'https://en.wikipedia.org/wiki/Manual_on_Uniform_Traffic_Control_Devices',
      },
    ],
    notes:
      'Informational (M/I series) signs have ~59% SVG coverage — remaining signs exist only in FHWA PDFs.',
  },
  uy: {
    name: 'Uruguay',
    standard: 'Decreto 374/004 — Reglamento Nacional de Tránsito (Vienna Convention variant)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Uruguay',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uruguay',
      },
      {
        label: 'Wikimedia Commons — Road signs in Uruguay (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Uruguay',
      },
    ],
  },
  za: {
    name: 'South Africa',
    standard: 'SARTSM (South African Road Traffic Signs Manual)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in South Africa',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_South_Africa',
      },
      {
        label: 'Wikimedia Commons — Road signs in South Africa',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_South_Africa',
      },
    ],
  },
  // New countries
  ae: {
    name: 'United Arab Emirates',
    standard: 'British-derived, bilingual Arabic/English',
    sources: [
      {
        label: 'Wikipedia — Road signs in the UAE',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_United_Arab_Emirates',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the UAE',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_United_Arab_Emirates',
      },
    ],
  },
  by: {
    name: 'Belarus',
    standard: 'Vienna Convention (STB 1140-2013)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Belarus',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Belarus',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Belarus',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belarus',
      },
    ],
  },
  cn: {
    name: 'China',
    standard: 'GB 5768 national standard (non-Vienna)',
    sources: [
      {
        label: 'Wikipedia — Road signs in China',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_China',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in China',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_China',
      },
    ],
  },
  eg: {
    name: 'Egypt',
    standard: 'British-derived (Egypt Traffic Signs Manual)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Egypt',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Egypt',
      },
    ],
  },
  ge: {
    name: 'Georgia',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Georgia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Georgia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Georgia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Georgia_(country)',
      },
    ],
  },
  id: {
    name: 'Indonesia',
    standard: 'Vienna Convention based (Minister of Transport Regulation 2014)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Indonesia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Indonesia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Indonesia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Indonesia',
      },
    ],
  },
  ke: {
    name: 'Kenya',
    standard: 'British-derived (NTSA Highway Code)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Kenya',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kenya',
      },
    ],
  },
  ng: {
    name: 'Nigeria',
    standard: 'British-derived',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Nigeria',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Nigeria',
      },
    ],
  },
  ph: {
    name: 'Philippines',
    standard: 'Vienna Convention (original signatory)',
    sources: [
      {
        label: 'Wikipedia — Road signs in the Philippines',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Philippines',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Philippines',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Philippines',
      },
    ],
  },
  ru: {
    name: 'Russia',
    standard: 'Vienna Convention (ГОСТ Р 52290)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Russia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Russia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Russia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Russia',
      },
    ],
  },
  sa: {
    name: 'Saudi Arabia',
    standard: 'Vienna Convention, bilingual Arabic/English',
    sources: [
      {
        label: 'Wikipedia — Road signs in Saudi Arabia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Saudi_Arabia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Saudi Arabia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Saudi_Arabia',
      },
    ],
  },
  vn: {
    name: 'Vietnam',
    standard: 'Vienna Convention adjacent (Ministry of Transport 2019)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Vietnam',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Vietnam',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Vietnam',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Vietnam',
      },
    ],
  },
  // Batch 3
  bz: {
    name: 'Belize',
    standard: 'UK-influenced / SIECA (Manual Centroamericano)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Belize',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belize',
      },
    ],
  },
  cu: {
    name: 'Cuba',
    standard: 'Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in Cuba',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Cuba',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Cuba',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cuba',
      },
    ],
  },
  do: {
    name: 'Dominican Republic',
    standard: 'MUTCD-influenced / Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in the Dominican Republic',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Dominican_Republic',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Dominican Republic',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Dominican_Republic',
      },
    ],
  },
  et: {
    name: 'Ethiopia',
    standard: 'Vienna Convention / British-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Ethiopia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ethiopia',
      },
    ],
  },
  gh: {
    name: 'Ghana',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Ghana',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Ghana',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Ghana',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ghana',
      },
    ],
  },
  kg: {
    name: 'Kyrgyzstan',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Kyrgyzstan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Kyrgyzstan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Kyrgyzstan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kyrgyzstan',
      },
    ],
  },
  la: {
    name: 'Laos',
    standard: 'Vienna Convention (Lao PDR Road Traffic Law)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Laos',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Laos',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Laos',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Laos',
      },
    ],
  },
  mn: {
    name: 'Mongolia',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Mongolia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Mongolia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Mongolia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mongolia',
      },
    ],
  },
  ni: {
    name: 'Nicaragua',
    standard: 'Manual Centroamericano de Dispositivos Uniformes (SIECA)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Nicaragua',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Nicaragua',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Nicaragua',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Nicaragua',
      },
    ],
  },
  np: {
    name: 'Nepal',
    standard: 'British-derived (Department of Roads)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Nepal',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Nepal',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Nepal',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Nepal',
      },
    ],
  },
  sv: {
    name: 'El Salvador',
    standard: 'Manual Centroamericano de Dispositivos Uniformes (SIECA)',
    sources: [
      {
        label: 'Wikipedia — Road signs in El Salvador',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_El_Salvador',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in El Salvador',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_El_Salvador',
      },
    ],
  },
  tj: {
    name: 'Tajikistan',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Tajikistan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Tajikistan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Tajikistan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Tajikistan',
      },
    ],
  },
  tm: {
    name: 'Turkmenistan',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Turkmenistan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Turkmenistan',
      },
    ],
  },
  tz: {
    name: 'Tanzania',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Tanzania',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Tanzania',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Tanzania',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Tanzania',
      },
    ],
  },
  uz: {
    name: 'Uzbekistan',
    standard: 'Vienna Convention (ГОСТ Р 52290)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Uzbekistan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Uzbekistan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Uzbekistan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uzbekistan',
      },
    ],
  },
  zw: {
    name: 'Zimbabwe',
    standard: 'British-derived (Road Traffic Act, left-hand traffic)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Zimbabwe',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Zimbabwe',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Zimbabwe',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Zimbabwe',
      },
    ],
  },
  // Batch 2
  am: {
    name: 'Armenia',
    standard: 'Vienna Convention (ՀՀ ճանապարհային նշաններ)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Armenia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Armenia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Armenia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Armenia',
      },
    ],
  },
  az: {
    name: 'Azerbaijan',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Azerbaijan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Azerbaijan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Azerbaijan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Azerbaijan',
      },
    ],
  },
  bd: {
    name: 'Bangladesh',
    standard: 'Vienna Convention (UK-influenced)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Bangladesh',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Bangladesh',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Bangladesh',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bangladesh',
      },
    ],
  },
  bo: {
    name: 'Bolivia',
    standard: 'Manual de Señalización Vial (SIECA-based)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Bolivia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bolivia',
      },
    ],
  },
  dz: {
    name: 'Algeria',
    standard: 'Code de la route — Vienna Convention / French-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Algeria',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Algeria',
      },
    ],
  },
  gt: {
    name: 'Guatemala',
    standard: 'Manual Centroamericano de Dispositivos Uniformes (SIECA)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Central America',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Central_America',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Guatemala',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Guatemala',
      },
    ],
  },
  hn: {
    name: 'Honduras',
    standard: 'Manual Centroamericano de Dispositivos Uniformes (SIECA)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Central America',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Central_America',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Honduras',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Honduras',
      },
    ],
  },
  jo: {
    name: 'Jordan',
    standard: 'Vienna Convention, bilingual Arabic/English (GCC Manual)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Jordan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Jordan',
      },
    ],
  },
  kh: {
    name: 'Cambodia',
    standard: 'Vienna Convention (Prakas on Road Signs 2014)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Cambodia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Cambodia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Cambodia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cambodia',
      },
    ],
  },
  kw: {
    name: 'Kuwait',
    standard: 'Vienna Convention, bilingual Arabic/English (GCC Manual)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Kuwait',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kuwait',
      },
    ],
  },
  kz: {
    name: 'Kazakhstan',
    standard: 'Vienna Convention (ГОСТ РК 1.1)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Kazakhstan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Kazakhstan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Kazakhstan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kazakhstan',
      },
    ],
  },
  lb: {
    name: 'Lebanon',
    standard: 'Vienna Convention / French-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Lebanon',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Lebanon',
      },
    ],
    notes: 'Very limited SVG coverage on Wikimedia Commons for Lebanon.',
  },
  lk: {
    name: 'Sri Lanka',
    standard: 'British-derived (Motor Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Sri Lanka',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Sri_Lanka',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Sri Lanka',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Sri_Lanka',
      },
    ],
  },
  ly: {
    name: 'Libya',
    standard: 'Vienna Convention / Italian-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Libya',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Libya',
      },
    ],
    notes: 'Limited SVG coverage on Wikimedia Commons for Libya.',
  },
  md: {
    name: 'Moldova',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Moldova',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Moldova',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Moldova',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Moldova',
      },
    ],
  },
  mm: {
    name: 'Myanmar',
    standard: 'Vienna Convention / UK-influenced',
    sources: [
      {
        label: 'Wikipedia — Road signs in Myanmar',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Myanmar',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Myanmar',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_warning_road_signs_of_Myanmar',
      },
    ],
    notes: 'Limited SVG coverage on Wikimedia Commons for Myanmar.',
  },
  om: {
    name: 'Oman',
    standard: 'Vienna Convention, bilingual Arabic/English (GCC Manual)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Oman',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Oman',
      },
    ],
  },
  pa: {
    name: 'Panama',
    standard: 'Manual Centroamericano de Dispositivos Uniformes (SIECA)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Panama',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Panama',
      },
    ],
  },
  pk: {
    name: 'Pakistan',
    standard: 'British-derived (National Highway Authority)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Pakistan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Pakistan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Pakistan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Pakistan',
      },
    ],
  },
  py: {
    name: 'Paraguay',
    standard: 'Manual de Señalización Vial — Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in Paraguay',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Paraguay',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Paraguay',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Paraguay',
      },
    ],
  },
  qa: {
    name: 'Qatar',
    standard: 'Vienna Convention, bilingual Arabic/English (GCC Manual)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Qatar',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Qatar',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Qatar',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Qatar',
      },
    ],
  },
  tn: {
    name: 'Tunisia',
    standard: 'Code de la route — Vienna Convention / French-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Tunisia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Tunisia',
      },
    ],
    notes: 'Limited SVG coverage on Wikimedia Commons for Tunisia.',
  },
  ve: {
    name: 'Venezuela',
    standard: 'Manual Venezolano de Dispositivos Uniformes (MVDU)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Venezuela',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Venezuela',
      },
    ],
  },
  // Batch 4
  ad: {
    name: 'Andorra',
    standard: 'Vienna Convention (Code de la circulation)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Andorra',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Andorra',
      },
    ],
  },
  bw: {
    name: 'Botswana',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Botswana',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Botswana',
      },
    ],
  },
  ci: {
    name: "Côte d'Ivoire",
    standard: 'Vienna Convention / French-influenced',
    sources: [
      {
        label: "Wikimedia Commons — SVG road signs in Côte d'Ivoire",
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ivory_Coast',
      },
      {
        label: 'AGEROUTE — Agence de Gestion des Routes (national road authority)',
        url: 'https://www.ageroute.ci/',
      },
    ],
    notes:
      "No SVG assets currently on Wikimedia Commons. Côte d'Ivoire uses a French-influenced sign system. The national road authority is AGEROUTE (Agence de Gestion des Routes). Official sign specifications are not publicly available online.",
  },
  cm: {
    name: 'Cameroon',
    standard: 'Vienna Convention / French-influenced (CEMAC Highway Code)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Cameroon',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cameroon',
      },
      {
        label: 'Ministère des Transports du Cameroun (national transport authority)',
        url: 'https://www.mintransports.gov.cm/',
      },
      {
        label: 'Road signs in Cameroon — sign guide (third-party)',
        url: 'https://temovision.com/highway-code-road-signs-meaning-in-cameroon/',
      },
    ],
    notes:
      "No SVG assets currently on Wikimedia Commons. Cameroon uses the CEMAC (Communauté Économique et Monétaire de l'Afrique Centrale) highway code, a French-influenced regional standard. Official sign PDFs are not publicly available online.",
  },
  xk: {
    name: 'Kosovo',
    standard: 'Vienna Convention (Ligji për Siguri në Komunikacion Rrugor)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Kosovo',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Kosovo',
      },
    ],
    notes:
      'No Kosovo-specific SVG sign diagrams exist on Wikimedia Commons. The sign set mirrors Serbia — Kosovo inherited the Yugoslav/Serbian road sign system and follows the Vienna Convention.',
  },
  ag: {
    name: 'Antigua and Barbuda',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Diagrams of road signs of Antigua and Barbuda',
        url: 'https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_Antigua_and_Barbuda',
      },
    ],
  },
  bb: {
    name: 'Barbados',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Barbados',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Barbados',
      },
    ],
    notes:
      'Very limited SVG coverage on Wikimedia Commons (give way and stop signs only). Barbados uses a British-derived sign system under the Road Traffic Act, administered by the Ministry of Transport and Works.',
  },
  bs: {
    name: 'Bahamas',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Diagrams of road signs of the Bahamas',
        url: 'https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_the_Bahamas',
      },
    ],
    notes:
      'Very limited SVG coverage on Wikimedia Commons. The Bahamas uses a British-derived sign system under the Road Traffic Act.',
  },
  dm: {
    name: 'Dominica',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Diagrams of road signs of Dominica',
        url: 'https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_Dominica',
      },
    ],
    notes:
      'Very limited SVG coverage on Wikimedia Commons (give way sign only). Dominica uses a British-derived sign system under the Road Traffic Act.',
  },
  gd: {
    name: 'Grenada',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Grenada',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Grenada',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Grenada uses a British-derived sign system under the Road Traffic Act.',
  },
  kn: {
    name: 'Saint Kitts and Nevis',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Saint Kitts and Nevis',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Saint_Kitts_and_Nevis',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Saint Kitts and Nevis uses a British-derived sign system under the Road Traffic Act.',
  },
  lc: {
    name: 'Saint Lucia',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Saint Lucia',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Saint_Lucia',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Saint Lucia uses a British-derived sign system under the Road Traffic Act.',
  },
  sr: {
    name: 'Suriname',
    standard: 'Vienna Convention / Dutch-influenced (Verkeerstekenbesluit)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Suriname',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Suriname',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Netherlands',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Netherlands',
      },
      {
        label: 'Wikipedia — Road signs in the Netherlands',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Netherlands',
      },
    ],
    notes:
      'No Suriname-specific SVG sign diagrams exist on Wikimedia Commons. Suriname uses a Dutch-derived sign system inherited from the colonial period, virtually identical to Netherlands road signs (same Vienna Convention base, same series lettering A–L). This package mirrors the Netherlands sign set, following the same pattern as Monaco→France and San Marino→Italy.',
  },
  vc: {
    name: 'Saint Vincent and the Grenadines',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Saint Vincent and the Grenadines',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Saint_Vincent_and_the_Grenadines',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Saint Vincent and the Grenadines uses a British-derived sign system under the Road Traffic Act.',
  },
  fj: {
    name: 'Fiji',
    standard: 'British-derived (Land Transport Act / MOTSAM)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Fiji',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Fiji',
      },
      {
        label: 'Fiji Roads Authority — MOTSAM documents',
        url: 'https://www.fijiroads.org/index.php/motsam-documents/',
      },
      { label: 'Land Transport Authority Fiji', url: 'https://www.lta.gov.fj/' },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Official sign specifications are published in the Fiji Roads Authority MOTSAM (Manual of Traffic Signs and Markings / Fiji Supplement to Austroads), available as PDF sections on the Fiji Roads Authority website.',
  },
  gy: {
    name: 'Guyana',
    standard: 'British-derived (Motor Vehicles and Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Guyana',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Guyana',
      },
      {
        label: 'Ministry of Public Works — road infrastructure authority',
        url: 'https://mopw.gov.gy/',
      },
      {
        label: 'Motor Vehicles and Road Traffic Act (PDF)',
        url: 'https://moha.gov.gy/wp-content/uploads/2021/04/Motor-Vehicle-and-Road-Act.pdf',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Guyana follows a British-derived sign system. Sign specifications are governed by the Motor Vehicles and Road Traffic Act, administered by the Ministry of Public Works.',
  },
  ht: {
    name: 'Haiti',
    standard: 'Vienna Convention / French-influenced (Code de la route)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Haiti',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Haiti',
      },
      {
        label: 'Ministère des Travaux Publics, Transports et Communications (MTPTC)',
        url: 'https://mtptc.gouv.ht/',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Haiti uses a French-influenced sign system based on the Vienna Convention. The governing authority is the Ministère des Travaux Publics, Transports et Communications (MTPTC). No publicly available official sign manual PDF has been located.',
  },
  iq: {
    name: 'Iraq',
    standard: 'Vienna Convention, bilingual Arabic/English',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Iraq',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Iraq',
      },
      { label: 'Iraqi Ministry of Transport (وزارة النقل)', url: 'https://www.motrans.gov.iq/' },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Iraq uses bilingual Arabic/English signs based on the Vienna Convention. No publicly available official sign manual PDF has been located.',
  },
  ir: {
    name: 'Iran',
    standard: 'Vienna Convention adjacent (Road Signs Manual of Iran)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Iran',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Iran',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Iran',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Iran',
      },
    ],
  },
  jm: {
    name: 'Jamaica',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Jamaica',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Jamaica',
      },
    ],
  },
  mc: {
    name: 'Monaco',
    standard: 'Vienna Convention (Code de la route) — shared with France',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Monaco',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Monaco',
      },
      {
        label: 'Wikimedia Commons — Diagrams of road signs of Monaco',
        url: 'https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_Monaco',
      },
      {
        label: 'Direction de la Sûreté Publique de Monaco',
        url: 'https://www.gouv.mc/Action-Gouvernementale/La-Securite-des-Personnes/La-Surete-Publique',
      },
    ],
    notes:
      'Monaco uses the French sign system (Code de la route) without country-specific variants. SVG assets on Wikimedia Commons are limited to a small number of Monaco-specific signs. French sign packages (FR) provide comprehensive coverage of the shared sign set.',
  },
  mz: {
    name: 'Mozambique',
    standard: 'Vienna Convention / Portuguese-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Mozambique',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mozambique',
      },
    ],
  },
  na: {
    name: 'Namibia',
    standard: 'South African-derived (Road Traffic and Transport Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Namibia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Namibia',
      },
    ],
  },
  pg: {
    name: 'Papua New Guinea',
    standard: 'British-derived (Motor Traffic Act / Road User Rules 2017)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Papua New Guinea',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Papua_New_Guinea',
      },
      { label: 'Road Traffic Authority Papua New Guinea', url: 'https://www.rta.gov.pg/' },
      {
        label: 'Road User Rules 2017 (PDF)',
        url: 'https://rta.gov.pg/pdfs/licences&approvals/RTR_RoadUserRules2017.pdf',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Papua New Guinea uses a British-derived sign system governed by the Road Traffic Authority (RTA) under the Road User Rules 2017.',
  },
  rw: {
    name: 'Rwanda',
    standard: 'Vienna Convention / Belgian-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Rwanda',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Rwanda',
      },
    ],
  },
  sm: {
    name: 'San Marino',
    standard: 'Vienna Convention (Codice della strada) — shared with Italy',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in San Marino',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_San_Marino',
      },
      {
        label: 'Wikimedia Commons — Diagrams of road signs of San Marino',
        url: 'https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_San_Marino',
      },
      {
        label: "Segreteria di Stato per il Territorio e l'Ambiente (road authority)",
        url: 'https://www.gov.sm/pub/Siti/SSTA/home.html',
      },
    ],
    notes:
      'San Marino uses the Italian sign system (Codice della strada) without country-specific variants. SVG assets on Wikimedia Commons are very limited. Italian sign packages (IT) provide comprehensive coverage of the shared sign set.',
  },
  sn: {
    name: 'Senegal',
    standard: 'Vienna Convention / French-influenced (Code de la route sénégalais)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Senegal',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Senegal',
      },
      {
        label: 'Ministère des Infrastructures et des Transports Terrestres',
        url: 'https://www.transports.gouv.sn/',
      },
      { label: 'Code de la Route Sénégal (reference guide)', url: 'https://codesenegal.com/' },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Senegal uses a French-influenced Code de la Route based on the Vienna Convention. The governing authority is the Ministère des Infrastructures et des Transports Terrestres.',
  },
  sy: {
    name: 'Syria',
    standard: 'Vienna Convention, bilingual Arabic/English',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Syria',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Syria',
      },
      { label: 'Syrian Ministry of Transport (وزارة النقل)', url: 'https://www.mot.gov.sy/' },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Syria uses bilingual Arabic/English signs based on the Vienna Convention. No publicly available official sign manual PDF has been located.',
  },
  tt: {
    name: 'Trinidad and Tobago',
    standard: 'British-derived (Motor Vehicles and Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Trinidad and Tobago',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Trinidad_and_Tobago',
      },
      {
        label: 'Ministry of Works and Transport — Highways Division signage',
        url: 'https://www.mowt.gov.tt/Divisions/Highways-Division/Services/Highways-Signage',
      },
      {
        label: 'Trinidad and Tobago Highway Code (TTRegs)',
        url: 'https://www.ttregs.com/thc-the-highway-code.php',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Trinidad and Tobago uses a British-derived sign system under the Motor Vehicles and Road Traffic Act, administered by the Ministry of Works and Transport.',
  },
  ug: {
    name: 'Uganda',
    standard: 'British-derived (Traffic and Road Safety Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Uganda',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uganda',
      },
    ],
  },
  ye: {
    name: 'Yemen',
    standard: 'Vienna Convention, bilingual Arabic/English',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Yemen',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Yemen',
      },
      { label: 'Yemen Ministry of Transport (وزارة النقل)', url: 'https://www.mot.gov.ye/' },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Yemen uses bilingual Arabic/English signs based on the Vienna Convention. No publicly available official sign manual PDF has been located.',
  },
  zm: {
    name: 'Zambia',
    standard: 'British-derived (Roads and Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Zambia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Zambia',
      },
    ],
  },
  ao: {
    name: 'Angola',
    standard: 'Vienna Convention / Portuguese-influenced (Código da Estrada)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Angola',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Angola',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Angola',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Angola',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Angola uses a Portuguese-influenced sign system based on the Vienna Convention with codes A (warning), B (priority), C (prohibition), D (mandatory), H/M (information).',
  },
  ls: {
    name: 'Lesotho',
    standard: 'SADC regional standard (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in the Southern African Development Community',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Southern_African_Development_Community',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Southern African Development Community',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Southern_African_Development_Community',
      },
    ],
    notes:
      'Lesotho uses the SADC regional sign standard. No Lesotho-specific SVG diagrams exist on Wikimedia Commons; signs are sourced from the shared SADC category.',
  },
  sz: {
    name: 'Eswatini',
    standard: 'SADC regional standard (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in the Southern African Development Community',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Southern_African_Development_Community',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Southern African Development Community',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Southern_African_Development_Community',
      },
    ],
    notes:
      'Eswatini uses the SADC regional sign standard. No Eswatini-specific SVG diagrams exist on Wikimedia Commons; signs are sourced from the shared SADC category.',
  },
  kp: {
    name: 'North Korea',
    standard: 'DPRK road sign system (도로 표시)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in North Korea',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_North_Korea',
      },
    ],
    notes:
      'North Korean road signs use Korean-language names with no alphanumeric codes. The 29 SVG diagrams on Wikimedia Commons are mapped to descriptive English slugs.',
  },
  mw: {
    name: 'Malawi',
    standard: 'SADC regional standard (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in the Southern African Development Community',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Southern_African_Development_Community',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Southern African Development Community',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Southern_African_Development_Community',
      },
    ],
    notes:
      'Malawi uses the SADC regional sign standard. No Malawi-specific SVG diagrams exist on Wikimedia Commons; signs are sourced from the shared SADC category.',
  },
  va: {
    name: 'Vatican City',
    standard: 'Italian Codice della Strada (re-exported from @road-signs/it)',
    sources: [
    {
      label: 'Wikipedia — Road signs in Italy (Vatican uses the Italian system)',
      url: 'https://en.wikipedia.org/wiki/Road_signs_in_Italy',
    },
    ],
    notes:
      'Vatican City is fully integrated into the Italian road-sign system. @road-signs/va re-exports @road-signs/it.',
  },
  af: {
    name: 'Afghanistan',
    standard: 'Vienna Convention adjacent (Ministry of Public Works)',
    sources: [
    {
      label: 'Wikipedia — Transport in Afghanistan',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Afghanistan',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Awaiting future PDF/web scrape.',
  },
  bf: {
    name: 'Burkina Faso',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Burkina Faso',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Burkina_Faso',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Likely uses the French Vienna-Convention sign system with local variants.',
  },
  bh: {
    name: 'Bahrain',
    standard: 'GCC Traffic Signs Manual (bilingual Arabic/English)',
    sources: [
    {
      label: 'Wikipedia — Transport in Bahrain',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Bahrain',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Bahrain follows the shared GCC Traffic Signs Manual.',
  },
  bi: {
    name: 'Burundi',
    standard: 'Code de la route (French / Belgian influence)',
    sources: [
    {
      label: 'Wikipedia — Transport in Burundi',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Burundi',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  bj: {
    name: 'Benin',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Benin',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Benin',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  bt: {
    name: 'Bhutan',
    standard: 'Bhutan Road Safety and Transport Authority (RSTA)',
    sources: [
    {
      label: 'Wikipedia — Transport in Bhutan',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Bhutan',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  cd: {
    name: 'DR Congo',
    standard: 'Code de la route (French/Belgian-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in the Democratic Republic of the Congo',
      url: 'https://en.wikipedia.org/wiki/Transport_in_the_Democratic_Republic_of_the_Congo',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  cf: {
    name: 'Central African Republic',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in the Central African Republic',
      url: 'https://en.wikipedia.org/wiki/Transport_in_the_Central_African_Republic',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  cg: {
    name: 'Republic of the Congo',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in the Republic of the Congo',
      url: 'https://en.wikipedia.org/wiki/Transport_in_the_Republic_of_the_Congo',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  cv: {
    name: 'Cape Verde',
    standard: 'Código da Estrada (Portuguese-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Cape Verde',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Cape_Verde',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  dj: {
    name: 'Djibouti',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Djibouti',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Djibouti',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  er: {
    name: 'Eritrea',
    standard: 'Italian-influenced (Codice della Strada heritage)',
    sources: [
    {
      label: 'Wikipedia — Transport in Eritrea',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Eritrea',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Eritrea has historically used Italian-derived road signage.',
  },
  fm: {
    name: 'Federated States of Micronesia',
    standard: 'US MUTCD-influenced (Compact of Free Association)',
    sources: [
    {
      label: 'Wikipedia — Transport in the Federated States of Micronesia',
      url: 'https://en.wikipedia.org/wiki/Transport_in_the_Federated_States_of_Micronesia',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Likely follows US MUTCD under the Compact of Free Association.',
  },
  ga: {
    name: 'Gabon',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Gabon',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Gabon',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  gm: {
    name: 'Gambia',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
    {
      label: 'Wikipedia — Transport in the Gambia',
      url: 'https://en.wikipedia.org/wiki/Transport_in_the_Gambia',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  gn: {
    name: 'Guinea',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Guinea',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Guinea',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  gq: {
    name: 'Equatorial Guinea',
    standard: 'Spanish-influenced (Reglamento General de Circulación heritage)',
    sources: [
    {
      label: 'Wikipedia — Transport in Equatorial Guinea',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Equatorial_Guinea',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  gw: {
    name: 'Guinea-Bissau',
    standard: 'Código da Estrada (Portuguese-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Guinea-Bissau',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Guinea-Bissau',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  ki: {
    name: 'Kiribati',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
    {
      label: 'Wikipedia — Transport in Kiribati',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Kiribati',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  km: {
    name: 'Comoros',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in the Comoros',
      url: 'https://en.wikipedia.org/wiki/Transport_in_the_Comoros',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  lr: {
    name: 'Liberia',
    standard: 'US MUTCD-influenced',
    sources: [
    {
      label: 'Wikipedia — Transport in Liberia',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Liberia',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Liberia has historically used a US-influenced sign system.',
  },
  mh: {
    name: 'Marshall Islands',
    standard: 'US MUTCD-influenced (Compact of Free Association)',
    sources: [
    {
      label: 'Wikipedia — Transport in the Marshall Islands',
      url: 'https://en.wikipedia.org/wiki/Transport_in_the_Marshall_Islands',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Likely follows US MUTCD under the Compact of Free Association.',
  },
  ml: {
    name: 'Mali',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Mali',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Mali',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  mr: {
    name: 'Mauritania',
    standard: 'Code de la route (French / Arabic bilingual)',
    sources: [
    {
      label: 'Wikipedia — Transport in Mauritania',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Mauritania',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  mv: {
    name: 'Maldives',
    standard: 'British-derived (Maldives Transport Authority)',
    sources: [
    {
      label: 'Wikipedia — Transport in the Maldives',
      url: 'https://en.wikipedia.org/wiki/Transport_in_the_Maldives',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  ne: {
    name: 'Niger',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Niger',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Niger',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  nr: {
    name: 'Nauru',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
    {
      label: 'Wikipedia — Transport in Nauru',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Nauru',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  ps: {
    name: 'Palestine',
    standard: 'Bilingual Arabic/English/Hebrew (Israeli-derived in West Bank)',
    sources: [
    {
      label: 'Wikipedia — Transport in the Palestinian territories',
      url: 'https://en.wikipedia.org/wiki/Transport_in_the_Palestinian_territories',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  pw: {
    name: 'Palau',
    standard: 'US MUTCD-influenced (Compact of Free Association)',
    sources: [
    {
      label: 'Wikipedia — Transport in Palau',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Palau',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Likely follows US MUTCD under the Compact of Free Association.',
  },
  sb: {
    name: 'Solomon Islands',
    standard: 'British-derived (Road Transport Act)',
    sources: [
    {
      label: 'Inland Revenue Division — Solomon Islands',
      url: 'https://www.ird.gov.sb/',
    },
    {
      label: 'Wikipedia — Transport in the Solomon Islands',
      url: 'https://en.wikipedia.org/wiki/Transport_in_the_Solomon_Islands',
    },
    ],
    notes:
      'Empty package: candidate PDF sources identified at ird.gov.sb (driver’s licence guide, Road Transport Amendment Regulations 2014 gazette). Awaiting extraction.',
  },
  sc: {
    name: 'Seychelles',
    standard: 'British-derived (Road Transport Act)',
    sources: [
    {
      label: 'Wikipedia — Transport in Seychelles',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Seychelles',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  sd: {
    name: 'Sudan',
    standard: 'British-derived (Highway Code)',
    sources: [
    {
      label: 'Wikipedia — Transport in Sudan',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Sudan',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  sl: {
    name: 'Sierra Leone',
    standard: 'British-derived (Sierra Leone Road Safety Authority)',
    sources: [
    {
      label: 'Wikipedia — Transport in Sierra Leone',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Sierra_Leone',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  so: {
    name: 'Somalia',
    standard: 'Italian heritage / British-influenced (Highway Code)',
    sources: [
    {
      label: 'Wikipedia — Transport in Somalia',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Somalia',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  ss: {
    name: 'South Sudan',
    standard: 'British-derived (Highway Code)',
    sources: [
    {
      label: 'Wikipedia — Transport in South Sudan',
      url: 'https://en.wikipedia.org/wiki/Transport_in_South_Sudan',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  st: {
    name: 'São Tomé and Príncipe',
    standard: 'Código da Estrada (Portuguese-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in São Tomé and Príncipe',
      url: 'https://en.wikipedia.org/wiki/Transport_in_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  td: {
    name: 'Chad',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Chad',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Chad',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  tg: {
    name: 'Togo',
    standard: 'Code de la route (French-influenced)',
    sources: [
    {
      label: 'Wikipedia — Transport in Togo',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Togo',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  tl: {
    name: 'Timor-Leste',
    standard: 'Portuguese / Indonesian-influenced',
    sources: [
    {
      label: 'Wikipedia — Transport in East Timor',
      url: 'https://en.wikipedia.org/wiki/Transport_in_East_Timor',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  to: {
    name: 'Tonga',
    standard: 'British-derived (Traffic Act)',
    sources: [
    {
      label: 'Wikipedia — Transport in Tonga',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Tonga',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  tv: {
    name: 'Tuvalu',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
    {
      label: 'Wikipedia — Transport in Tuvalu',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Tuvalu',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  vu: {
    name: 'Vanuatu',
    standard: 'British / French-influenced bilingual',
    sources: [
    {
      label: 'Wikipedia — Transport in Vanuatu',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Vanuatu',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
  ws: {
    name: 'Samoa',
    standard: 'New Zealand-derived (Land Transport Authority)',
    sources: [
    {
      label: 'Wikipedia — Transport in Samoa',
      url: 'https://en.wikipedia.org/wiki/Transport_in_Samoa',
    },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located.',
  },
};

// ---------------------------------------------------------------------------
// Coverage computation
// ---------------------------------------------------------------------------

interface CategoryStats {
  scraped: number;
  withSvg: number;
}

interface CountryCoverage {
  cc: string;
  meta: CountryMeta;
  totalScraped: number;
  totalWithSvg: number;
  categories: Record<string, CategoryStats>;
}

const normalise = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const buildLocalPathTokens = (assetsRoot: string): string[] =>
  globSync(path.join(assetsRoot, '**', '*.svg'))
    .filter((f) => !/_\d+x\d+\.svg$/.test(f))
    .map((f) =>
      f
        .replace(/\\/g, '/')
        .toLowerCase()
        .replace(/[^a-z0-9/]/g, ''),
    );

const sanitize = (s: string): string =>
  s
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s/g, '_')
    .toLowerCase();

const svgExistsForCode = (code: string, pathTokens: string[], assetsRoot: string): boolean => {
  const dirs = globSync(path.join(assetsRoot, '*', sanitize(code)));
  if (dirs.some((d) => globSync(path.join(d, '*.svg')).length > 0)) return true;
  const token = normalise(code);
  if (token.length < 2) return false;
  return pathTokens.some((p) => p.includes(token));
};

const computeCoverage = (cc: string): CountryCoverage | null => {
  if (!COUNTRIES[cc]) return null;
  const scrapedPath = path.join('data', cc, 'scraped.json');

  // Country has metadata but no scrape yet — emit a zero-coverage record so
  // the docs page still gets a `## Coverage` section that honestly says
  // "no signs scraped yet".
  if (!fs.existsSync(scrapedPath)) {
    return { cc, meta: COUNTRIES[cc], totalScraped: 0, totalWithSvg: 0, categories: {} };
  }

  const scraped: Record<string, Array<{ code: string; name: string }>> = JSON.parse(
    fs.readFileSync(scrapedPath, 'utf-8'),
  );
  const assetsRoot = path.join('packages', '@road-signs', cc, 'assets');
  const pathTokens = buildLocalPathTokens(assetsRoot);

  const categories: Record<string, CategoryStats> = {};
  for (const [category, signs] of Object.entries(scraped)) {
    let withSvg = 0;
    for (const sign of signs) {
      if (svgExistsForCode(sign.code, pathTokens, assetsRoot)) withSvg++;
    }
    categories[category] = { scraped: signs.length, withSvg };
  }

  const totalScraped = Object.values(categories).reduce((s, c) => s + c.scraped, 0);
  const totalWithSvg = Object.values(categories).reduce((s, c) => s + c.withSvg, 0);

  return { cc, meta: COUNTRIES[cc], totalScraped, totalWithSvg, categories };
};

// ---------------------------------------------------------------------------
// Markdown helpers
// ---------------------------------------------------------------------------

const pct = (n: number, total: number): string =>
  total === 0 ? '—' : `${Math.round((n / total) * 100)}%`;

// ---------------------------------------------------------------------------
// Coverage section body (shared between the package docs and the Astro site)
// ---------------------------------------------------------------------------

const coverageSectionBody = (cov: CountryCoverage): string => {
  const { meta, totalScraped, totalWithSvg, categories } = cov;
  const missing = totalScraped - totalWithSvg;

  const lines: string[] = [
    `## Coverage`,
    ``,
    `| Metric | Value |`,
    `| ------ | ----- |`,
    `| Signs scraped | ${totalScraped} |`,
    `| Signs with SVG | ${totalWithSvg} |`,
    `| Missing SVG | ${missing} |`,
    `| Overall | **${pct(totalWithSvg, totalScraped)}** |`,
    ``,
    `| Category | Scraped | With SVG | Missing | % |`,
    `| -------- | ------: | -------: | ------: | -: |`,
  ];

  for (const [cat, stats] of Object.entries(categories)) {
    const miss = stats.scraped - stats.withSvg;
    lines.push(
      `| \`${cat}\` | ${stats.scraped} | ${stats.withSvg} | ${miss} | ${pct(stats.withSvg, stats.scraped)} |`,
    );
  }

  lines.push(``, `**Standard:** ${meta.standard}`, ``);
  lines.push(`**SVG sources:**`, ``);
  for (const src of meta.sources) {
    lines.push(`- [${src.label}](${src.url})`);
  }

  if (meta.notes) {
    lines.push(``, `:::note`, meta.notes, `:::`);
  }

  // Link back to the full coverage package page.
  lines.push(
    ``,
    `_Coverage data is also published in the [\`@road-signs/docs\`](https://www.npmjs.com/package/@road-signs/docs) package._`,
  );

  return lines.join('\n');
};

// ---------------------------------------------------------------------------
// Per-country standalone markdown (for @road-signs/docs package)
// ---------------------------------------------------------------------------

const generateCountryDoc = (cov: CountryCoverage): string => {
  const { cc, meta, totalScraped, totalWithSvg, categories } = cov;
  const pctTotal = pct(totalWithSvg, totalScraped);
  const missing = totalScraped - totalWithSvg;

  const lines: string[] = [
    `# ${meta.name} (${cc.toUpperCase()})`,
    ``,
    `**Standard:** ${meta.standard}`,
    ``,
    `**Package:** [\`@road-signs/${cc}\`](https://www.npmjs.com/package/@road-signs/${cc})`,
    ``,
    `## SVG Coverage`,
    ``,
    `| Metric | Value |`,
    `| ------ | ----- |`,
    `| Total signs scraped | ${totalScraped} |`,
    `| Signs with SVG asset | ${totalWithSvg} |`,
    `| Missing SVG | ${missing} |`,
    `| Overall coverage | **${pctTotal}** |`,
    ``,
    `## Coverage by Category`,
    ``,
    `| Category | Scraped | With SVG | Missing | Coverage |`,
    `| -------- | ------: | -------: | ------: | -------: |`,
  ];

  for (const [cat, stats] of Object.entries(categories)) {
    const miss = stats.scraped - stats.withSvg;
    lines.push(
      `| \`${cat}\` | ${stats.scraped} | ${stats.withSvg} | ${miss} | ${pct(stats.withSvg, stats.scraped)} |`,
    );
  }

  lines.push(``, `## Sources`, ``);
  for (const src of meta.sources) {
    lines.push(`- [${src.label}](${src.url})`);
  }

  if (meta.notes) {
    lines.push(``, `## Notes`, ``, meta.notes);
  }

  return lines.join('\n') + '\n';
};

// ---------------------------------------------------------------------------
// Overview README (for @road-signs/docs package)
// ---------------------------------------------------------------------------

const generateOverview = (coverages: CountryCoverage[]): string => {
  const now = new Date().toISOString().slice(0, 10);

  const lines: string[] = [
    `# @road-signs/docs`,
    ``,
    `Coverage documentation for the [\`@road-signs/*\`](https://github.com/karlnorling/road-signs) packages.`,
    `All SVG assets are sourced from [Wikimedia Commons](https://commons.wikimedia.org/) and are in the public domain`,
    `(Creative Commons or similar open licences).`,
    ``,
    `_Last updated: ${now}_`,
    ``,
    `## Coverage Summary`,
    ``,
    `| Country | Package | Signs | SVG | Missing | Coverage |`,
    `| ------- | ------- | ----: | --: | ------: | -------: |`,
  ];

  for (const cov of coverages) {
    const { cc, meta, totalScraped, totalWithSvg } = cov;
    const miss = totalScraped - totalWithSvg;
    lines.push(
      `| [${meta.name}](./coverage/${cc}.md) | [\`@road-signs/${cc}\`](https://www.npmjs.com/package/@road-signs/${cc}) | ${totalScraped} | ${totalWithSvg} | ${miss} | ${pct(totalWithSvg, totalScraped)} |`,
    );
  }

  lines.push(
    ``,
    `## Sources`,
    ``,
    `All SVGs are sourced from Wikimedia Commons under open licences (CC BY-SA or public domain).`,
    `The US package additionally draws from the FHWA Standard Highway Signs archive (public domain).`,
    ``,
    `See the per-country pages under [coverage/](./coverage/) for detailed source links and notes.`,
    ``,
    `## Licence`,
    ``,
    `Documentation and generated data: MIT.`,
    `SVG assets: see individual Wikimedia Commons file pages for per-file licences.`,
  );

  return lines.join('\n') + '\n';
};

// ---------------------------------------------------------------------------
// Astro MDX injection
// ---------------------------------------------------------------------------

const MARKER_START = '{/* COVERAGE:START */}';
const MARKER_END = '{/* COVERAGE:END */}';
const HERO_START = '{/* HERO:START */}';
const HERO_END = '{/* HERO:END */}';

const heroBlock = (cc: string): string =>
  `${HERO_START}\n\n` +
  `import CountryHero from '../../../components/CountryHero.astro';\n\n` +
  `<CountryHero cc="${cc}" />\n\n` +
  `${HERO_END}`;

/**
 * Replace content between `start` and `end` markers if both are present.
 * Returns the new content and a flag indicating whether the replace happened.
 */
const replaceBetween = (
  content: string,
  start: string,
  end: string,
  replacement: string,
): { content: string; replaced: boolean } => {
  if (!content.includes(start) || !content.includes(end)) {
    return { content, replaced: false };
  }
  const startIdx = content.indexOf(start);
  const endIdx = content.indexOf(end);
  if (endIdx <= startIdx) return { content, replaced: false };
  const after = content.slice(endIdx + end.length);
  return {
    content: content.slice(0, startIdx) + replacement + '\n' + after.replace(/^\n*/, '\n'),
    replaced: true,
  };
};

/**
 * Inject (or replace) the hero strip just after the MDX frontmatter and any
 * initial `import { Tabs, ... }` lines. Uses HERO_START / HERO_END markers
 * so subsequent runs replace cleanly. Idempotent.
 */
const injectHeroMdx = (mdxPath: string, cc: string): void => {
  if (!fs.existsSync(mdxPath)) return;
  let content = fs.readFileSync(mdxPath, 'utf-8');
  const block = heroBlock(cc);

  const updated = replaceBetween(content, HERO_START, HERO_END, block);
  if (updated.replaced) {
    fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  // First run: insert after the frontmatter closing `---` plus any leading
  // import lines (so the hero ends up just below the page title but above
  // the first prose paragraph).
  const fmEnd = content.indexOf('\n---\n');
  if (fmEnd === -1) return;
  let cursor = fmEnd + 5;
  // Skip blank lines and `import ...;` lines.
  const after = content.slice(cursor);
  const importMatch = after.match(/^(?:\s*\n|import\s+[^\n]*;\s*\n)+/);
  if (importMatch) cursor += importMatch[0].length;

  content = content.slice(0, cursor) + '\n' + block + '\n\n' + content.slice(cursor);
  fs.writeFileSync(mdxPath, content, 'utf-8');
};

/**
 * Inject (or replace) the coverage section in a country MDX file.
 * The section is wrapped in marker comments so future runs replace it cleanly.
 * It is inserted just before `## TypeScript types` (or appended if not found).
 * Any existing hand-written `## Coverage gaps` section is replaced.
 */
const injectCoverageMdx = (mdxPath: string, cov: CountryCoverage): void => {
  if (!fs.existsSync(mdxPath)) return;

  let content = fs.readFileSync(mdxPath, 'utf-8');

  const block = `${MARKER_START}\n\n${coverageSectionBody(cov)}\n\n${MARKER_END}`;

  const updated = replaceBetween(content, MARKER_START, MARKER_END, block);
  if (updated.replaced) {
    fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  // Remove any legacy hand-written coverage sections (## Coverage gaps / ## Coverage).
  content = content.replace(/\n## Coverage[^\n]*\n[\s\S]*?(?=\n## |\s*$)/g, '\n');

  // Insert before ## TypeScript types, or append.
  const tsAnchor = '\n## TypeScript types';
  const insertAt = content.indexOf(tsAnchor);
  if (insertAt !== -1) {
    content = content.slice(0, insertAt) + '\n\n' + block + '\n' + content.slice(insertAt);
  } else {
    content = content.trimEnd() + '\n\n' + block + '\n';
  }

  fs.writeFileSync(mdxPath, content, 'utf-8');
};

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const docsDir = path.join('packages', '@road-signs', 'docs');
const coverageDir = path.join(docsDir, 'coverage');
const astroPagesDir = path.join('apps', 'docs', 'src', 'content', 'docs', 'countries');

const coverages = Object.keys(COUNTRIES)
  .map(computeCoverage)
  .filter((c): c is CountryCoverage => c !== null);

fs.mkdirSync(coverageDir, { recursive: true });

console.log('Writing @road-signs/docs package...');
for (const cov of coverages) {
  const outPath = path.join(coverageDir, `${cov.cc}.md`);
  fs.writeFileSync(outPath, generateCountryDoc(cov), 'utf-8');
  console.log(`  ${outPath}`);
}
const readmePath = path.join(docsDir, 'README.md');
fs.writeFileSync(readmePath, generateOverview(coverages), 'utf-8');
console.log(`  ${readmePath}`);

console.log('\nInjecting hero strip + coverage sections into Astro docs...');
for (const cov of coverages) {
  const mdxPath = path.join(astroPagesDir, `${cov.cc}.mdx`);
  // Skip the hero if the country has no signs at all (e.g. Lebanon).
  if (cov.totalScraped > 0) injectHeroMdx(mdxPath, cov.cc);
  injectCoverageMdx(mdxPath, cov);
  console.log(`  ${mdxPath}`);
}

console.log(`\nDone — ${coverages.length} countries documented.`);
