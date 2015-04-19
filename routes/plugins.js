var filtr = require('filtr')
  , fs = require('fs')
  , join = require('path').join
  , highlight = require('highlight.js')
  , marked = require('marked')
  , request = require('superagent');

var site_tags = []
  , blacklistedTags = [
        'chai'
      , 'chai-plugin'
      , 'chai-plugin-browser'
      , 'chai-plugin-browser-only'
      , 'plugin'
      , 'assertions'
      , 'assert'
      , 'testing'
    ]
  , plugin_tags = {};

var plugins = fs.readdirSync(process.cwd() + '/out/plugins').map(function (name) {
    var json = JSON.parse(fs.readFileSync('./out/plugins/' + name));
    try {
      json.htmlReadme = parseMarkdown(json.readme || 'No information provided');
    } catch(ex) {
      console.log(ex);
      json.htmlReadme = '<p>Error parsing markdown.</p>';
    }
    json.latest = {};
    if ((json['dist-tags'] || {}).latest) {
        json.latest = json.versions[json['dist-tags'].latest];
    }
    return json;
});

plugins.forEach(function (plug) {
  if (!plug.keywords || !Array.isArray(plug.keywords)) return;
  plug.keywords.forEach(function (tag) {
    if (blacklistedTags.indexOf(tag) !== -1) return;
    if (!~site_tags.indexOf(tag)) site_tags.push(tag);
  });
});

function sortAlpha (a, b) {
  if ('object' === typeof a) a = a.name;
  if ('object' === typeof b) b = b.name;
  var A = a.toLowerCase()
    , B = b.toLowerCase();
  if (A < B) return -1;
  else if (A > B) return 1;
  else return 0;
};

site_tags.sort(sortAlpha);

site_tags.forEach(function (tag) {
  var query = filtr({ 'keywords': { $all: [ tag ] } })
    , res = query.test(plugins).map(function (pkg) { return pkg.name; }).sort(sortAlpha);
  plugin_tags[tag] = res;
});

var site_locals = JSON.parse(fs.readFileSync(join(__dirname, '..', 'data', 'codex.json'))).locals;

app.get('/plugins', function (req, res) {
  var locals = {
      site: site_locals
    , plugin_tags: plugin_tags
    , plugins: plugins
    , file: {
          template: 'plugins'
        , href: '/plugins/'
        , title: 'Chai Plugins'
      }
  }
  res.render('plugins', locals);
});

app.get('/plugins/tags.json', function (req, res) {
  var json = {};
  for (var name in plugin_tags) {
    json[name] = [];
    plugin_tags[name].forEach(function (plugin) {
      json[name].push(plugin);
    });
  }
  res.json(json);
});

app.get('/plugins/:id', function (req, res, next) {
  var query = filtr({ 'name': req.params.id })
    , plugin = query.test(plugins)[0];

  if (!plugin) return next();

  res.render('plugins/plugin', {
      site: site_locals
    , plugin: plugin
    , file: {
        template: 'plugin'
      , href: '/plugins/' + req.params.id
      , title: plugin.name
    }
  });
});


function parseMarkdown (text) {
  var tokens = marked.lexer(text)
    , l = tokens.length
    , token;

  for (var i = 0; i < l; i++) {
    token = tokens[i];
    if (token.type == 'code') {
      var lang = token.lang || 'javascript';
      if (lang == 'js') lang = 'javascript';
      if (lang == 'html') lang = 'xml';
      token.text = highlight.highlight(lang, token.text).value;
      token.escaped = true;
    }
  }

  text = marked.parser(tokens);
  return text;
};
