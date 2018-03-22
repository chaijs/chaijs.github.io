var fs = require('fs');
var files = fs.readdirSync('_data/plugins');
files.filter(function (file) {
  return file.slice(-5) === '.json';
}).forEach(function (file) {
  try {
    var name = file.slice(0, -5);
    var pluginJson = JSON.parse(fs.readFileSync('_data/plugins/' + file, 'utf8'));
    var contents = '---\nlayout: plugin\npermalink: plugins/' + pluginJson.name + '/\npluginName: ' + pluginJson.name + '\n---\n\n' + pluginJson.readme;
    fs.writeFileSync(__dirname + '/../plugins/' + name + '.md', contents, 'utf8');
    console.log('Wrote', 'plugins/' + name + '.md')
  } catch(e) {
    console.error(e.stack || e);
    process.exit(1);
  }
});
