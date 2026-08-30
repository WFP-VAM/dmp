/**
 * Extract all UI translations (English + Khmer) into a CSV for review.
 *
 * Usage: node scripts/extract-translations.mjs [output-path]
 * Default output: translations/en-km-review.csv
 */

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const translationsDir = path.join(__dirname, '..', 'translations');

const flattenMessages = (nestedMessages, prefix = '') =>
  Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix !== '' ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});

const escapeCsv = value =>
  `"${String(value ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;

const readJson = filename =>
  JSON.parse(readFileSync(path.join(translationsDir, filename), 'utf8'));

const en = flattenMessages(readJson('en.json'));
const km = flattenMessages(readJson('km.json'));
const communes = readJson('communes.json');
const villages = readJson('villages.json');

const enCommune = flattenMessages({ commune: communes.en ?? {} });
const kmCommune = flattenMessages({ commune: communes.km ?? {} });
const enVillage = flattenMessages({ village: villages.en ?? {} });
const kmVillage = flattenMessages({ village: villages.km ?? {} });

const sections = [
  { source: 'ui', en: en, km: km },
  { source: 'communes', en: enCommune, km: kmCommune },
  { source: 'villages', en: enVillage, km: kmVillage },
];

const rows = [['key', 'en', 'km', 'missing_km', 'source'].join(',')];

for (const { source, en: enMessages, km: kmMessages } of sections) {
  const keys = [
    ...new Set([...Object.keys(enMessages), ...Object.keys(kmMessages)]),
  ].sort();

  for (const key of keys) {
    const enValue = enMessages[key] ?? '';
    const kmValue = kmMessages[key] ?? '';
    const missingKm = kmValue === '' ? 'yes' : 'no';

    rows.push(
      [
        escapeCsv(key),
        escapeCsv(enValue),
        escapeCsv(kmValue),
        missingKm,
        source,
      ].join(','),
    );
  }
}

const outputPath =
  process.argv[2] ??
  path.join(translationsDir, 'en-km-review.csv');

writeFileSync(outputPath, `${rows.join('\n')}\n`, 'utf8');
console.log(`Wrote ${rows.length - 1} translation rows to ${outputPath}`);
