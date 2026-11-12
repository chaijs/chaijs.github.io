const fs = require('fs');
const files = fs.readdirSync('_data/plugins');
files.filter(function (file) {
  return file.slice(-5) === '.json';
}).forEach(function (file) {
  try {
    const name = file.slice(0, -5);
    const pluginJson = JSON.parse(fs.readFileSync('_data/plugins/' + file, 'utf8'));
    const contents = '---\nlayout: plugin\npermalink: ' + JSON.stringify('plugins/' + pluginJson.name + '/') + '\npluginName: ' + name + '\n---\n\n' + pluginJson.readme;
    fs.writeFileSync(__dirname + '/../plugins/' + name + '.md', contents, 'utf8');
    console.log('Wrote', 'plugins/' + name + '.md')
  } catch(e) {
    console.error(e.stack || e);
    process.exit(1);
  }
});
