---
layout: plugin
permalink: plugins/chai-bites/
pluginName: chai-bites
---

# Chai Assertions for Byte Arrays Equality

Fork of [chai-bytes](https://www.npmjs.com/package/chai-bytes) with relaxed input types.

[![Build status][workflow-image]][workflow-url]
[![Code coverage][coveralls-image]][coveralls-url]
[![Code style][code-style-image]][code-style-url]
[![License][license-image]][license-url]

[workflow-image]: https://github.com/slowli/chai-bytes/workflows/Node.js%20CI/badge.svg?branch=master
[workflow-url]: https://github.com/slowli/chai-bytes/actions
[coveralls-image]: https://img.shields.io/coveralls/slowli/chai-bytes.svg
[coveralls-url]: https://coveralls.io/github/slowli/chai-bytes
[code-style-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg
[code-style-url]: https://github.com/Flet/semistandard
[license-image]: https://img.shields.io/github/license/slowli/chai-bytes.svg
[license-url]: https://opensource.org/licenses/Apache-2.0

**chai-bites** extends [Chai][chai] with a `equalBytes` function,
which can be used to test equality of byte arrays (i.e., `Uint8Array` instances).

## Basic Usage

```javascript
const { expect, assert } = require('chai')
  .use(require('chai-bites'));

const buffer = new Uint8Array([ 1, 2, 3, 4, 5 ]);
expect(buffer).to.equalBytes('0102030405');
// `assert` style works, too
assert.equalBytes(buffer, [1, 2, 3, 4, 5], 'error message');
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

**chai-bites** uses combined code coverage from the tested browser environments
(Firefox and PhantomJS). This is because PhantomJS is a typical old environment
that may have problems with `Uint8Array`s (e.g., it misses a substantial parts
of their methods).

## License

**chai-bites** is available under [Apache-2.0 license](LICENSE).

[chai]: https://chaijs.com/
