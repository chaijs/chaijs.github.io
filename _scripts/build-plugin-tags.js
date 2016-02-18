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
  'true',
  'false',
  'arbitrary',
  'big',
  'number',
  'schema',
  'interface',
  'no-jquery',
  'API',
  'api',
];
var keywordMap = {
  'jquery': 'jQuery',
  'mongo': 'MongoDB',
  'mongodb': 'MongoDB',
  'xml': 'XML',
  'assertXml': 'XML',
  'react': 'React',
  'json': 'JSON',
  'json-schema': 'JSON Schema',
  'array': 'Array',
  'arrays': 'Array',
  'file': 'filesystem',
  'path': 'filesystem',
  'color': 'Colors',
  'colors': 'Colors',
  'math': 'Math',
  'backbone': 'Backbone',
  'promises': 'Promises',
  'promises-aplus': 'Promises',
}
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
}).sort().reduce(function (total, keyword) {
  var addition = keyword.trim();
  if (keywordMap[keyword]) {
    keyword = keywordMap[keyword];
  }
  total[keyword] = (total[keyword] || []).concat(addition);
  return total;
}, {});

console.log(keywords);

fs.writeFileSync('_data/plugin_keywords.json', JSON.stringify(keywords, null, 2), 'utf8');
