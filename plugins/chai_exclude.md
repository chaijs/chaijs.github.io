---
layout: plugin
permalink: "plugins/chai-exclude/"
pluginName: chai_exclude
---

# chai-exclude

[![npm](https://img.shields.io/npm/v/chai-exclude.svg)](https://www.npmjs.com/package/chai-exclude)
[![npm](https://img.shields.io/npm/dw/chai-exclude.svg)](https://www.npmjs.com/package/chai-exclude)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CI Status](https://github.com/mesaugat/chai-exclude/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/mesaugat/chai-exclude/actions/workflows/test.yml)

Exclude keys to compare from a deep equal operation with chai [expect](http://chaijs.com/api/bdd/) or [assert](http://chaijs.com/api/assert/).

## Why?

Sometimes you'll need to exclude object properties that generate unique values while doing an assertion. This plugin makes it easier to remove those properties from comparison.

Works with both objects and array of objects with or without circular references.

## Installation

`chai-exclude` is an ESM package targeting Chai v5 and above.

```bash
npm install chai-exclude --save-dev
```

If you are using Chai v4, you can use the CommonJS version of the package.

```bash
npm install chai-exclude@2.1.1 --save-dev
```

## Usage

```js
import { use } from 'chai'
import chaiExclude from 'chai-exclude'

// If you are using TypeScript, the typings for chai-exclude are included in the package
use(chaiExclude)
```

## Examples

All these examples are for JavaScript. If you are using TypeScript and `assert`, you'll need to deal with strict types. Take a look at the [type definition](index.d.ts).

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

const expectedArray = [expectedObj]

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
