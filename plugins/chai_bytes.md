---
layout: plugin
permalink: plugins/chai-bytes/
pluginName: chai-bytes
---

# Chai Assertions for Byte Arrays Equality

[![Build status][travis-image]][travis-url]
[![Code coverage][coveralls-image]][coveralls-url]
[![Code style][code-style-image]][code-style-url]
[![License][license-image]][license-url]

[travis-image]: https://img.shields.io/travis/slowli/chai-bytes.svg?style=flat-square
[travis-url]: https://travis-ci.org/slowli/chai-bytes
[coveralls-image]: https://img.shields.io/coveralls/slowli/chai-bytes.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/slowli/chai-bytes
[code-style-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
[code-style-url]: https://github.com/Flet/semistandard
[license-image]: https://img.shields.io/github/license/slowli/chai-bytes.svg?style=flat-square
[license-url]: https://opensource.org/licenses/Apache-2.0

**chai-bytes** extends [Chai][chai] with a `equalBytes` function,
which can be used to test equality of byte arrays (i.e., `Uint8Array` instances).

## Basic Usage

```javascript
const expect = require('chai')
  .use(require('chai-bytes'))
  .expect();

var buffer = new Uint8Array([ 1, 2, 3, 4, 5 ]);
expect(buffer).to.equalBytes('0102030405');
```

An expected value passed to `equalBytes` can be:

- Hexadecimal string, e.g., `'c0ffee'`
- Array, e.g., `[1, 2, 3]`
- Array-like object (i.e., an object having the `length` property
  and items accessible by integer properties).
  This includes `Uint8Array` instances, among other things

If the passed value does not fall into any of these categories,
a `TypeError` is thrown.

## Developer Notes

**chai-bytes** uses combined code coverage from the tested browser environments
(Firefox and PhantomJS). This is because PhantomJS is a typical old environment
that may have problems with `Uint8Array`s (e.g., it misses a substantial parts
of their methods).

## License

(c) 2017 Alex Ostrovski

**chai-bytes** is available under [Apache-2.0 license](LICENSE).

[chai]: https://chaijs.com/
