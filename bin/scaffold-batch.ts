/**
 * scaffold-batch.ts
 *
 * One-shot: scaffolds every remaining missing-country package as an empty
 * registry with a documented standard. Each can later be populated by a
 * proper scraper or PDF crawl.
 *
 * Usage:  yarn tsx bin/scaffold-batch.ts
 */

import { spawnSync } from 'child_process';

interface Entry {
  cc: string;
  name: string;
  reexport?: string;
}

const COUNTRIES: Entry[] = [
  // Francophone West Africa
  { cc: 'bf', name: 'Burkina Faso' },
  { cc: 'bj', name: 'Benin' },
  { cc: 'gn', name: 'Guinea' },
  { cc: 'gw', name: 'Guinea-Bissau' },
  { cc: 'ml', name: 'Mali' },
  { cc: 'mr', name: 'Mauritania' },
  { cc: 'ne', name: 'Niger' },
  { cc: 'tg', name: 'Togo' },
  // Central & East Africa
  { cc: 'cd', name: 'DR Congo' },
  { cc: 'cf', name: 'Central African Republic' },
  { cc: 'cg', name: 'Republic of the Congo' },
  { cc: 'ga', name: 'Gabon' },
  { cc: 'td', name: 'Chad' },
  { cc: 'bi', name: 'Burundi' },
  { cc: 'dj', name: 'Djibouti' },
  { cc: 'er', name: 'Eritrea' },
  { cc: 'sd', name: 'Sudan' },
  { cc: 'sl', name: 'Sierra Leone' },
  { cc: 'so', name: 'Somalia' },
  { cc: 'ss', name: 'South Sudan' },
  // Small island states & Middle East
  { cc: 'cv', name: 'Cape Verde' },
  { cc: 'gm', name: 'Gambia' },
  { cc: 'gq', name: 'Equatorial Guinea' },
  { cc: 'km', name: 'Comoros' },
  { cc: 'lr', name: 'Liberia' },
  { cc: 'sc', name: 'Seychelles' },
  { cc: 'st', name: 'São Tomé and Príncipe' },
  { cc: 'mv', name: 'Maldives' },
  { cc: 'bh', name: 'Bahrain' },
  { cc: 'af', name: 'Afghanistan' },
  { cc: 'ps', name: 'Palestine' },
  { cc: 'bt', name: 'Bhutan' },
  // Pacific
  { cc: 'fm', name: 'Federated States of Micronesia' },
  { cc: 'ki', name: 'Kiribati' },
  { cc: 'mh', name: 'Marshall Islands' },
  { cc: 'nr', name: 'Nauru' },
  { cc: 'pw', name: 'Palau' },
  { cc: 'sb', name: 'Solomon Islands' },
  { cc: 'tl', name: 'Timor-Leste' },
  { cc: 'to', name: 'Tonga' },
  { cc: 'tv', name: 'Tuvalu' },
  { cc: 'vu', name: 'Vanuatu' },
  { cc: 'ws', name: 'Samoa' },
];

for (const c of COUNTRIES) {
  console.log(`\n=== ${c.cc.toUpperCase()} ${c.name} ===`);
  const args = ['tsx', 'bin/scaffold-country.ts', `--cc=${c.cc}`, `--name=${c.name}`];
  if (c.reexport) args.push(`--reexport=${c.reexport}`);
  const r = spawnSync('yarn', args, { stdio: 'inherit' });
  if (r.status !== 0) {
    console.error(`  scaffold failed for ${c.cc}`);
  }
}

console.log(`\nScaffolded ${COUNTRIES.length} countries.`);
