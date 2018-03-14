---
layout: plugin
permalink: plugins/chaid/
pluginName: chaid
---

chaId
==============

Id equality assertions for chai.

[![NPM version](http://img.shields.io/npm/v/chaid.svg?style=flat-square)](https://www.npmjs.org/package/chaid)
[![Build Status](http://img.shields.io/travis/hurrymaplelad/chaid/master.svg?style=flat-square)](https://travis-ci.org/hurrymaplelad/chaid)

Ids come in [lots of flavors](http://bites.goodeggs.com/posts/ids-in-mongoose-json-and-backbone/).  Sometimes they're strings, sometimes objects.  Sometimes you'll find them at `.id`, other times at `._id`.  ChaId lets you test for equality by comparing string representations of ids, with minimal fretting about initial representation or location:

```js
{_id: 'foo'}.should.have.id('foo')
'foo'.should.id({id: 'foo'})
{id: 'foo', bar: 2}.should.have.same.id({id: 'foo', baz: 3})
{_id: 'foo'}.should.not.have.same.id({_id: 'bar'})
{_id: 'foo'}.should.have.same.id({id: {toString: function() { return 'foo'}})
{_id: 'foo'}.should.have.id(new ObjectId('foo'))
```
You can also compare lists of objects by id:
```js
[{id:'a'}, {id:'b'}].should.have.ids ['a', 'b']
['a', 'b'].should.be.ids ['a', 'b']
[{id:'a'}, {id:'b'}].should.have.same.ids [{id:'a'}, {id:'b'}]
[{id:'a'}, {id:'b'}].should.not.have.same.ids [{id:'b'}, {id:'a'}]
```
By default, order matters.  To ignore order, chain `unordered`:
```js
[{id:'a'}, {id:'b'}].should.have.same.unordered.ids [{id:'b'}, {id:'a'}]
```
You can test for a subset of ids by chaining `include` or `contain`:
```js
[{id:'a'}, {id:'b'}].should.include.same.ids [{id:'a'}]
```

Works well with [MongoDB ObjectIds](https://github.com/mongodb/node-mongodb-native):
```js
doc.should.have.id(new ObjectId())
doc.should.have.same.id(otherDoc)
(new ObjectId()).should.id(doc)
```

#### Installation

This is a plugin for the [Chai Assertion Library](http://chaijs.com). Install via [npm](http://npmjs.org).

    npm install chaid


#### Plugin

Use this plugin as you would all other Chai plugins.

```js
var chai = require('chai')
  , chaid = require('chaid');

chai.use(chaid);
```
