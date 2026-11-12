// Usage: node _scripts/fetch-plugins.js

const fs = require('fs');
const path = require('path');

const REGISTRY = 'https://registry.npmjs.org';
const OUT_DIR = '_data/plugins';
const CONCURRENCY = 8;

const {accepted} = JSON.parse(fs.readFileSync('_plugins.json', 'utf8'));

const fetchPackage = async (name) => {
  const res = await fetch(`${REGISTRY}/${name.replace('/', '%2F')}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${name}: ${res.status} ${res.statusText}`);
  return res.json();
};

const skipReason = (doc) => {
  if (!doc) return 'not found';
  const latest = doc['dist-tags']?.latest;
  if (!latest || doc.time?.unpublished) return 'unpublished';
  if (doc.versions[latest].deprecated) return 'deprecated';
  return null;
};

const writePlugin = (doc) => {
  const basename = doc.name.replace(/^@/, '').replace(/[^a-z]/g, '_');
  const file = path.join(OUT_DIR, `${basename}.json`);
  const data = {
    name: doc.name,
    description: doc.description,
    keywords: doc.keywords,
    repository: doc.repository,
    author: doc.author,
    readme: doc.readme
  };
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
};

const main = async () => {
  fs.mkdirSync(OUT_DIR, {recursive: true});
  const queue = [...accepted];

  const worker = async () => {
    while (queue.length) {
      const name = queue.shift();
      const doc = await fetchPackage(name);
      const reason = skipReason(doc);
      if (reason) {
        console.log(`Skipped ${name} (${reason})`);
        continue;
      }
      writePlugin(doc);
    }
  };

  await Promise.all(Array.from({length: CONCURRENCY}, worker));
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
