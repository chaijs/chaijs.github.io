---
layout: plugin
permalink: plugins/chai-like/
pluginName: chai-like
---

[![Build status](https://img.shields.io/travis/zation/chai-like.svg?label=travis)](https://travis-ci.org/zation/chai-like)
[![Coverage Status](https://img.shields.io/coveralls/github/zation/chai-like.svg)](https://coveralls.io/github/zation/chai-like)
[![npm/chai-like version](https://img.shields.io/npm/v/chai-like.svg?label=npm/chai-like)](https://www.npmjs.com/package/chai-like)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

# chai-like

A JSON matcher for chai.
This is really useful when you are testing API and want to ignore some attributes like:
 updatedAt, createdAt, id.

##  Install

Install with [npm](https://www.npmjs.com/package/chai-like)

```bash
npm install --save-dev chai-like
```

## Assertions

### like(value)

Compare two JSON and ignore some keys based on expectation.

```js
var object = {
  id: 1,
  name: 'test',
  updatedAt: 'now'
};
object.should.like({
  name: 'test'
});
object.should.not.like({
  name: 'test1'
});
```

Deeply compare.

```js
var object = {
  id: 1,
  name: 'test',
  product: {
    id: 1,
    name: 'product'
  },
  updatedAt: 'now'
};
object.should.like({
  name: 'test',
  product: {
    name: 'product'
  }
});
object.should.not.like({
  name: 'test',
  product: {
    name: 'product1'
  }
});
```

Compare array.

```js
var array = [{
  id: 1,
  name: 'test',
  product: {
    id: 1,
    name: 'product'
  },
  updatedAt: 'now'
}];
array.should.like([{
  name: 'test',
  product: {
    name: 'product'
  }
}]);
array.should.not.like([{
  name: 'test',
  product: {
    name: 'product1'
  }
}]);
```

Compare JSON with an array sub node.

```js
var object = {
  id: 1,
  name: 'test',
  products: [{
    id: 1,
    name: 'product'
  }],
  updatedAt: 'now'
};
object.should.like({
  name: 'test',
  products: [{
    name: 'product'
  }]
});
object.should.not.like({
  name: 'test',
  products: [{
    name: 'product1'
  }]
});
```

## Plugins

You can extend chai-like with plugins as below format:

```js
var chai = require('chai');
var like = require('chai-like');

var numberStringPlugin = {
  match: function(object) {
    return !isNaN(Number(object));
  },
  assert: function(object, expected) {
    return object === Number(expected);
  }
};
like.extend(numberStringPlugin);

chai.use(like);
```

Then we can assert as below:

```js
  var object = {
    number: 123
  };
  object.should.like({
    number: '123'
  });
  object.should.not.like({
    number: 'not a number'
  });
```

### Plugin for testing strings with RegExp

If some strings require fuzzy matching we can do this with a plugin as follows: 

```js
var chai = require('chai');
var like = require('chai-like');

var regexPlugin = like.extend({
  match: function(object, expected) {
    return typeof object === 'string' && expected instanceof RegExp;
  },
  assert: function(object, expected) {
    return expected.test(object);
  }
});

like.extend(regexPlugin);

chai.use(like);
```

Then we can assert as below:

```js
var object = {
  text: 'the quick brown fox jumps over the lazy dog'
};
object.should.like({
  text: /.* jumps over .*/
});
object.should.not.like({
  text: /\d/
});
```