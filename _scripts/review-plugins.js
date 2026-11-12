// Usage: node _scripts/review-plugins.js [--min-downloads <monthly>]

const fs = require('fs');
const readline = require('readline/promises');
const {parseArgs} = require('util');

const {values: args} = parseArgs({
  options: {'min-downloads': {type: 'string', default: '0'}}
});
const minDownloads = Number(args['min-downloads']);

const SEARCH_URL = 'https://registry.npmjs.org/-/v1/search?text=keywords:chai-plugin';
const PAGE_SIZE = 250;
const LIST_FILE = '_plugins.json';

const search = async () => {
  const results = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const res = await fetch(`${SEARCH_URL}&size=${PAGE_SIZE}&from=${from}`);
    if (!res.ok) throw new Error(`Search failed: ${res.status} ${res.statusText}`);
    const {objects, total} = await res.json();
    results.push(...objects);
    if (!objects.length || results.length >= total) return results;
  }
};

const save = (list) => {
  list.accepted.sort();
  list.rejected.sort();
  fs.writeFileSync(LIST_FILE, JSON.stringify(list, null, 2) + '\n');
};

const main = async () => {
  const list = JSON.parse(fs.readFileSync(LIST_FILE, 'utf8'));
  const known = new Set([...list.accepted, ...list.rejected]);
  const unreviewed = (await search()).filter((result) => !known.has(result.package.name));
  const pending = unreviewed
    .filter((result) => result.downloads.monthly >= minDownloads)
    .sort((a, b) => b.downloads.monthly - a.downloads.monthly);
  const hidden = unreviewed.length - pending.length;
  const hiddenNote = hidden ? ` (${hidden} below ${minDownloads} monthly downloads hidden)` : '';

  if (!pending.length) {
    console.log(`No new plugins to review${hiddenNote}.`);
    return;
  }

  const rl = readline.createInterface({input: process.stdin, output: process.stdout});
  console.log(`${pending.length} plugins to review${hiddenNote}.\n`);

  try {
    for (const [i, {package: pkg, downloads}] of pending.entries()) {
      console.log(`[${i + 1}/${pending.length}] ${pkg.name}@${pkg.version}`);
      if (pkg.description) console.log(`  ${pkg.description}`);
      console.log(`  ${downloads.monthly.toLocaleString()} monthly downloads, last published ${pkg.date.slice(0, 10)}`);
      console.log(`  ${pkg.links.repository || pkg.links.npm}`);

      let answer;
      while (!['a', 'r', 's', 'q'].includes(answer)) {
        answer = (await rl.question('  (a)ccept, (r)eject, (s)kip, (q)uit? ')).trim().toLowerCase();
      }
      console.log();

      if (answer === 'q') break;
      if (answer === 's') continue;
      list[answer === 'a' ? 'accepted' : 'rejected'].push(pkg.name);
      save(list);
    }
  } finally {
    rl.close();
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
