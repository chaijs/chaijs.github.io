---
layout: plugin
permalink: plugins/chai-colors/
pluginName: chai-colors
---

chai-colors
==============

Color assertions for chai.  Thin wrapper around [onecolor](https://github.com/One-com/one-color).

[![NPM version](http://img.shields.io/npm/v/chai-colors.svg?style=flat-square)](https://www.npmjs.org/package/chai-colors)
[![Build Status](http://img.shields.io/travis/hurrymaplelad/chai-colors/master.svg?style=flat-square)](https://travis-ci.org/hurrymaplelad/chai-colors)

Compare different color representations:

```js
'rgba(0, 0, 0, 1)'.should.be.colored('#000000');
```

Combine with [webdriver](https://github.com/admc/wd) for more fun:

```js
browser
  .elementByCss('code .hljs-keyword')
  .getComputedCss('color').should.eventually.be.colored('mintcream')
```

#### Installation

This is a addon plugin for the [Chai Assertion Library](http://chaijs.com). Install via [npm](http://npmjs.org).

    npm install chai-colors


#### Plugin

Use this plugin as you would all other Chai plugins.

```js
var chai = require('chai')
  , chaiColors = require('chai-colors');

chai.use(chaiColors);
```

#### Supported Formats

See the [onecolor API](https://github.com/One-com/one-color#api-overview).
