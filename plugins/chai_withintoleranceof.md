---
layout: plugin
permalink: plugins/chai-withintoleranceof/
pluginName: chai-withintoleranceof
---


chai-withintoleranceof
==============================================================================

[![npm](https://img.shields.io/npm/v/chai-withintoleranceof.svg)](https://github.com/RmiTtro/chai-withintoleranceof)

A chai plugin to assert that a number is within tolerance of an expected value


Installation
------------------------------------------------------------------------------

```
npm install --save-dev chai-withintoleranceof
```

Example Usage
------------------------------------------------------------------------------

```js
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-withintoleranceof'));

// check that 515 is within tolerance of 500 +/- 5% (475 .. 525)
expect(515).to.be.withinToleranceOf(500, 0.05);

// check that 786 is within tolerance of 1000 +30% / -70% (300 .. 1300)
expect(786).to.be.withinToleranceOf(1000, [+0.3, -0.7]);
expect(786).to.be.withinToleranceOf(1000, [-0.7, +0.3]);

// check that 400 is within tolerance of 350 +15% (350 .. 402.5)
expect(400).to.be.withinToleranceOf(350, [+0.15]);

// check that 500 is within tolerance of 555 -37% (349.65 .. 555)
expect(500).to.be.withinToleranceOf(555, [-0.37]);

// check that -645 is within tolerance of -1000 +30% / -70% (-1300 .. -300)
expect(-645).to.be.withinToleranceOf(-1000, [+0.3, -0.7]);
expect(-645).to.be.withinToleranceOf(-1000, [-0.7, +0.3]);

// Can also be used in conjunction with `length`
// check that the length of 'foo' is within tolerance of 2 +/- 50% (1 .. 3)
expect('foo').to.have.length.withinToleranceOf(2, 0.5);

// check that the length of the array is within tolerance of
// 2 +50% / -40% (1.2 .. 3)
expect([ 1, 2, 3 ]).to.have.length.withinToleranceOf(2, [+0.5, -0.4]);

// There is also an abbreviated form
expect(786).to.be.withinTolOf(1000, [+0.3, -0.7]);
```


License
------------------------------------------------------------------------------
chai-withintoleranceof is licensed under the [MIT License](LICENSE).
