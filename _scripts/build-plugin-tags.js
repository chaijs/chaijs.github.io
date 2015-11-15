var fs = require('fs');
var files = fs.readdirSync('_data/plugins');
var hiddenKeywords = [
  'chai',
  'chai-plugin',
  'browser',
  'browser-only',
  'browser-only',
  'test',
  'tests',
  'testing',
  'plugin',
  'assert',
  'assertion',
  'assertions',
  'unit',
  'acceptance',
  'mocha',
  'jasmine',
  'integration-tests',
  'id',
];
var keywords = files.filter(function (file) {
  return file.slice(-5) === '.json';
}).map(function (file) {
  try {
    var file = fs.readFileSync('_data/plugins/' + file, 'utf8');
    var json = JSON.parse(file);
    return json.keywords || [];
  } catch(e) {
    return [];
  }
}).reduce(function (total, current) {
  return total.concat(current);
}, []).filter(function(value, index, total) {
  return hiddenKeywords.indexOf(value) === -1 && total.indexOf(value) === index;
});

console.log(keywords);

fs.writeFileSync('_data/plugin_keywords.json', JSON.stringify(keywords, null, 2), 'utf8');
