---
layout: plugin
permalink: plugins/chai-v8-optimisation/
pluginName: chai-v8-optimisation
---

<!-- TITLE -->
<!-- BADGES/ -->

[![Build Status](https://img.shields.io/travis/pflannery/chai-v8-optimisation/master.svg)](http://travis-ci.org/pflannery/chai-v8-optimisation "Check this project's build status on TravisCI")
[![NPM version](https://img.shields.io/npm/v/chai-v8-optimisation.svg)](https://npmjs.org/package/chai-v8-optimisation "View this project on NPM")
[![NPM downloads](https://img.shields.io/npm/dm/chai-v8-optimisation.svg)](https://npmjs.org/package/chai-v8-optimisation "View this project on NPM")
[![Dependency Status](https://img.shields.io/david/pflannery/chai-v8-optimisation.svg)](https://david-dm.org/pflannery/chai-v8-optimisation)
[![Dev Dependency Status](https://img.shields.io/david/dev/pflannery/chai-v8-optimisation.svg)](https://david-dm.org/pflannery/chai-v8-optimisation#info=devDependencies)<br/>
[![Gratipay donate button](https://img.shields.io/gratipay/pflannery.svg)](https://www.gratipay.com/pflannery/ "Donate weekly to this project using Gratipay")

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

A V8 optimisation assertion plugin for chai.

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

## Install

### [NPM](http://npmjs.org/)
- Use: `require('chai-v8-optimisation')`
- Install: `npm install --save chai-v8-optimisation`

<!-- /INSTALL -->

## Usage

Using with [chaijs](http://chaijs.com/)
```js
var chai = require("chai"),
    v8opt = require("chai-v8-optimisation");
    
chai.use(v8opt);
```

Running your tests: (in order to analyse optimisation the ```--allow-natives-syntax``` flag needs to be passed to node or iojs)
```sh
node --allow-natives-syntax your-optimisation-tests.js
```

Testing your functions:
```js
function fn() {}
expect(fn).optimisation("yes");
expect(fn).optimization("yes"); // american spelling

expect(fn).to.be.optimised;
expect(fn).to.be.optimized;     // american spelling
```
```js
function fn() {
  try{}catch(e){}
}
expect(fn).optimisation("no");
expect(fn).optimization("no");    // american spelling
expect(fn).not.to.be.optimised;
expect(fn).not.to.be.optimized;   // american spelling
```

Passing parameters to the function being tested
```js
function fn(a, b, c) {}
expect(fn).optimisation("yes", [1, 2, 3], thisArg);
```

**Other usages for the optimisation method**

```js
expect(fn).optimisation("always");  // always-optimised
expect(fn).optimisation("never");   // never-optimised
expect(fn).optimisation("maybe");   // maybe-deoptimised
```

<!-- CONTRIBUTE/ -->

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/pflannery/chai-v8-optimisation/blob/master/CONTRIBUTING.md#files)

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

## Backers

### Maintainers

These amazing people are maintaining this project:

- pflannery (https://github.com/pflannery)

### Sponsors

No sponsors yet! Will you be the first?

[![Gratipay donate button](https://img.shields.io/gratipay/pflannery.svg)](https://www.gratipay.com/pflannery/ "Donate weekly to this project using Gratipay")

### Contributors

These amazing people have contributed code to this project:

- [pflannery](https://github.com/pflannery) — [view contributions](https://github.com/pflannery/chai-v8-optimisation/commits?author=pflannery)

[Become a contributor!](https://github.com/pflannery/chai-v8-optimisation/blob/master/CONTRIBUTING.md#files)

<!-- /BACKERS -->


<!-- LICENSE/ -->

## License

Unless stated otherwise all works are:

- Copyright &copy; 2015+ pflannery (https://github.com/pflannery)

and licensed under:

- The #{type} License

<!-- /LICENSE -->


