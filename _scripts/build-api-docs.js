// Usage: node _scripts/build-api-docs.js <path/to/chai/lib> > _data/chai.json

const fs = require('fs');
const path = require('path');
const {parse} = require('comment-parser');

const listFiles = (dir) =>
  fs
    .readdirSync(dir, {withFileTypes: true})
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return listFiles(full);
      return entry.name.endsWith('.js') ? [full] : [];
    });

const firstTag = (block, ...names) =>
  block.tags.find((tag) => names.includes(tag.tag));
const tagValue = (tag) =>
  [tag.name, tag.description].filter(Boolean).join(' ').trim();

const entries = [];

for (const file of listFiles(process.argv[2])) {
  const blocks = parse(fs.readFileSync(file, 'utf8'), {spacing: 'preserve'});

  for (const block of blocks) {
    const name = firstTag(block, 'name');
    // old chai uses @namespace
    const category = firstTag(block, 'category', 'namespace');
    if (!name || !category) continue;

    // The first paragraph is the summary; everything after it is the body.
    const description = block.description.trim();
    const split = description.search(/\n\s*\n/);

    entries.push({
      name: tagValue(name),
      category: tagValue(category),
      summary: split === -1 ? description : description.slice(0, split),
      body: split === -1 ? '' : description.slice(split).trim(),
      params: block.tags
        .filter((tag) => tag.tag === 'param')
        .map((tag) => ({
          name: tag.name,
          type: tag.type,
          optional: tag.optional,
          description: tag.description.trim()
        })),
      see: block.tags.filter((tag) => tag.tag === 'see').map(tagValue)
    });
  }
}

process.stdout.write(JSON.stringify(entries, null, 2) + '\n');
