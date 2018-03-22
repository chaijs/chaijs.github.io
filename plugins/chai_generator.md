---
layout: plugin
permalink: plugins/chai-generator/
pluginName: chai-generator
---

# chai-generator [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

This is a plugin for [chai](http://chaijs.com) to simplify the testing of
Javascript generators, as introduced in ES6 / ES2015.

Because the yield / return signature of generators is a little obtuse, it can
result in annoyingly verbose tests:

```javascript
expect(generator.next()).to.deep.equal({ done: false, value: 15 })
expect(generator.next()).to.deep.equal({ done: true, value: -1 })
```

`chai-generator` removes the muck so your test can look like your intent:

```javascript
expect(generator).to.yield(15)
expect(generator).to.return(-1)
```

## Setup

### node.js / io.js

```javascript
var chai = require('chai')
chai.use(require('chai-generator'))
```

### Browser

```html
<script src="chai.js"></script>
<script src="chai-generator.js"></script>
```

## Assertions

### .yield

Assert that a value is yielded from `generator.next()`. Returned values are not
considered yielded.

```javascript
expect(generator).to.yield()
expect(generator).to.yield(1)
expect(generator).not.to.yield('missing')
expect(generator.next(10)).to.yield(10)

generator.should.yield()
generator.should.yield(1)
generator.should.not.yield('missing')
generator.next(10).should.yield(10)

assert.yield(generator, 1)
assert.notYield(generator, 'missing')
assert.yield(generator.next(10), 10)
```

`.yield` works with the `.deep` chain:

```javascript
expect(generator).to.deep.yield([1, 2, 3])
generator.should.deep.yield([1, 2, 3])
assert.deepYield([1, 2, 3])
```

`.yield` can also be chained with other assertions (not available with assert):

```javascript
expect(generator).to.yield().and.equal(1)
generator.should.yield().and.equal(1)
```

### .return

Assert that a value is returned from `generator.next()`. Yielded values are not
considered returned.

```javascript
expect(generator).to.return()
expect(generator).to.return(1)
expect(generator).not.to.return('missing')
expect(generator.next(10)).to.return(10)

generator.should.return()
generator.should.return(1)
generator.should.not.return('missing')
generator.next(10).should.return(10)

assert.return(generator)
assert.return(generator, 1)
assert.notReturn(generator, 'missing')
assert.return(generator.next(10), 10)
```

`.return` works with the `.deep` chain:

```javascript
expect(generator).to.deep.return([1, 2, 3])
generator.should.deep.return([1, 2, 3])
assert.deepReturn([1, 2, 3])
```

`.return` can also be chained with other assertions (not available with assert):

```javascript
expect(generator).to.return().and.equal(1)
generator.should.return().and.equal(1)
```

# License

`chai-generator` is released under the [MIT License](https://github.com/fengb/chai-generator/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/chai-generator.svg?style=flat
[npm-url]: https://npmjs.org/package/chai-generator
[travis-image]: https://img.shields.io/travis/fengb/chai-generator.svg?style=flat
[travis-url]: https://travis-ci.org/fengb/chai-generator
