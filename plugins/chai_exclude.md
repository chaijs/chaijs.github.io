---
layout: plugin
permalink: plugins/chai-exclude/
pluginName: chai-exclude
---

# chai-exclude

[![npm](https://img.shields.io/npm/v/chai-exclude.svg)](https://www.npmjs.com/package/chai-exclude)
[![npm](https://img.shields.io/npm/dt/chai-exclude.svg)](https://www.npmjs.com/package/chai-exclude)
[![Build Status](https://travis-ci.org/mesaugat/chai-exclude.svg?branch=master)](https://travis-ci.org/mesaugat/chai-exclude)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/18c8dd78120442688cb4b19f758c4b96)](https://www.codacy.com/app/mesaugat/chai-exclude?utm_source=github.com&utm_medium=referral&utm_content=mesaugat/chai-exclude&utm_campaign=badger)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Exclude keys to compare from a deep equal operation with chai [expect](http://chaijs.com/api/bdd/) or [assert](http://chaijs.com/api/assert/).

## Why?

Sometimes you'll need to exclude object properties that generate unique values while doing a deep equal operation. This plugin makes it easier to remove those properties from comparison.

https://github.com/chaijs/chai/issues/885

Works with both array of objects and objects.

## Installation

```bash
npm install chai-exclude --only=dev
```

```bash
yarn add chai-exclude --dev
```

## Usage

### Require

```js
const chai = require('chai');
const chaiExclude = require('chai-exclude');

chai.use(chaiExclude);
```

### ES6 Import

```js
import { use } from 'chai';
import chaiExclude from 'chai-exclude';

use(chaiExclude);
```

### TypeScript

```js
import { use } from 'chai';
import chaiExclude = require('chai-exclude');

use(chaiExclude);

// The typings for chai-exclude are included with the package itself.
```

## Example

### a) excluding

1. Excluding a top level property from an object

```js
// Object
assert.deepEqualExcluding({ a: 'a', b: 'b' }, { b: 'b' }, 'a')
assert.deepEqualExcluding({ a: 'a', b: 'b' }, { a: 'z', b: 'b' }, 'a')

expect({ a: 'a', b: 'b' }).excluding('a').to.deep.equal({ b: 'b' })
expect({ a: 'a', b: 'b' }).excluding('a').to.deep.equal({ a: 'z', b: 'b' })

// Array
assert.deepEqualExcluding([{ a: 'a', b: 'b' }], [{ b: 'b' }], 'a')
assert.deepEqualExcluding([{ a: 'a', b: 'b' }], [{ a: 'z', b: 'b' }], 'a')

expect([{ a: 'a', b: 'b' }]).excluding('a').to.deep.equal([{ b: 'b' }])
expect([{ a: 'a', b: 'b' }]).excluding('a').to.deep.equal([{ a: 'z', b: 'b' }])
```

2. Excluding multiple top level properties from an object

```js
const obj = {
  a: 'a',
  b: 'b',
  c: {
    d: 'd',
    e: 'e'
  }
}

// Object
assert.deepEqualExcluding(obj, { b: 'b' }, ['a', 'c'])
assert.deepEqualExcluding(obj, { a: 'z', b: 'b' }, ['a', 'c'])

expect(obj).excluding(['a', 'c']).to.deep.equal({ b: 'b' })
expect(obj).excluding(['a', 'c']).to.deep.equal({ a: 'z', b: 'b' })

const array = [
  {
    a: 'a',
    b: 'b',
    c: {
      d: 'd',
      e: 'e'
    }
  }
]

// Array
assert.deepEqualExcluding(array, [{ b: 'b' }], ['a', 'c'])
assert.deepEqualExcluding(array, [{ a: 'z', b: 'b' }], ['a', 'c'])

expect(array).excluding(['a', 'c']).to.deep.equal([{ b: 'b' }])
expect(array).excluding(['a', 'c']).to.deep.equal([{ a: 'z', b: 'b' }])
```

### b) excludingEvery

1. Excluding every property in a deeply nested object

```js
const actualObj = {
  a: 'a',
  b: 'b',
  c: {
    a: 'a',
    b: {
      a: 'a',
      d: {
        a: 'a',
        b: 'b',
        d: null
      }
    }
  },
  d: ['a', 'c']
}

const actualArray = [actualObj]

const expectedObj = {
  a: 'z',     // a is excluded from comparison
  b: 'b',
  c: {
    b: {
      d: {
        b: 'b',
        d: null
      }
    }
  },
  d: ['a', 'c']
}

const expectedObj = [expectedObj]

// Object
assert.deepEqualExcludingEvery(actualObj, expectedObj, 'a')
expect(actualObj).excludingEvery('a').to.deep.equal(expectedObj)

// Array
assert.deepEqualExcludingEvery(actualArray, expectedArray, 'a')
expect(actualArray).excludingEvery('a').to.deep.equal(expectedArray)
```

2. Excluding multiple properties in a deeply nested object

```js
const actualObj = {
  a: 'a',
  b: 'b',
  c: {
    a: 'a',
    b: {
      a: 'a',
      d: {
        a: 'a',
        b: 'b',
        d: null
      }
    }
  },
  d: ['a', 'c']
}

const actualArray = [actualObj]

const expectedObj = {
  b: 'b',
  c: {
    b: {
    }
  }
}

const expectedArray = [expectedObj]

// Object
assert.deepEqualExcludingEvery(actualObj, expectedObj, ['a', 'd'])
expect(actualObj).excludingEvery(['a', 'd']).to.deep.equal(expectedObj)

// Array
assert.deepEqualExcludingEvery(actualArray, expectedArray, ['a', 'd'])
expect(actualArray).excludingEvery(['a', 'd']).to.deep.equal(expectedArray)
```

## Contributing

Contributions are welcome. If you have any questions create an issue [here](https://github.com/mesaugat/chai-exclude/issues).

## License

[MIT](LICENSE)
