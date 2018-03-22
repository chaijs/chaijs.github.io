---
layout: plugin
permalink: plugins/chai-json-equal/
pluginName: chai-json-equal
---

chai-json-equal
==============

Assert on equality of json representations in Chai.

[![NPM version](http://img.shields.io/npm/v/chai-json-equal.svg?style=flat-square)](https://www.npmjs.org/package/chai-json-equal)
[![Build Status](http://img.shields.io/travis/hurrymaplelad/chai-json-equal/master.svg?style=flat-square)](https://travis-ci.org/hurrymaplelad/chai-json-equal)

```js
var ship = "ship",
    barge = {toJSON: function () {
      return "ship";
    }}
ship.should.jsonEqual(barge);
```

You can also compare array members with JSON equality:
```js
[ship].should.have.jsonEqual.members [barge]
```

#### Installation

This is a plugin for the [Chai Assertion Library](http://chaijs.com). Install via [npm](http://npmjs.org).

    npm install chai-json-equal


#### Plugin

Use this plugin as you would all other Chai plugins.

```js
var chai = require('chai')
  , chaiJsonEqual = require('chai-json-equal');

chai.use(chaiJsonEqual);
```
