---
layout: plugin
permalink: plugins/chai-match-pattern/
pluginName: chai-match-pattern
---

# chai-match-pattern
[![NPM](https://nodei.co/npm/chai-match-pattern.png?downloads=true)](https://www.npmjs.com/package/chai-match-pattern)

![CircleCI](https://circleci.com/gh/Originate/chai-match-pattern.svg?style=shield&circle-token=:circle-token)
[![David Dependencies](https://david-dm.org/Originate/chai-match-pattern.svg)](https://david-dm.org/Originate/chai-match-pattern)

Related Modules:
[![lodash-match-pattern](https://img.shields.io/npm/v/lodash-match-pattern.svg?label=lodash-match-pattern)](https://www.npmjs.com/package/lodash-match-pattern)
[![lodash-checkit](https://img.shields.io/npm/v/lodash-checkit.svg?label=lodash-checkit)](https://www.npmjs.com/package/lodash-checkit)

**chai-match-pattern** is a Swiss Army Knife for deep matching JSON objects. It is essentially a Chai wrapper for [`lodash-match-pattern`](https://github.com/originate/lodash-match-pattern) and detailed documentation can be found there about its pattern matching functionality. This functionality includes deep matching of JSON properties by

* Exact values
* Regex
* Any matcher from [`checkit`](https://github.com/tgriesser/checkit) (e.g. `_.isURL`, `_.isEmail`)
* Any matcher from [`lodash`](https://lodash.com/docs) (e.g. `_.isObject`, `_.isNaN`)
* Partial matches
* Custom matching functions
* Filtered values
* And more...


#### Basic Usage
```
npm install chai-match-pattern --save-dev
```
In your test file insert

```javascript
var chai = require('chai');
var chaiMatchPattern = require('chai-match-pattern');
chai.use(chaiMatchPattern);
var _ = chaiMatchPattern.getLodashModule(); // recommend using our lodash extension
```

Then use patterns to check your JSON with the `.matchPattern(pattern)` assertion function.  For example

```javascript
chai.expect({a: 1, b: 'abc'}).to.matchPattern({a: 1, b: _.isString});
```

See [`lodash-match-pattern`](https://github.com/originate/lodash-match-pattern) for way, way more details.

Additionally any of the included `isXxxx` functions can be used directly as assertion functions. For example

```javascript
chai.expect(7.5).isBetween(7, 8);
```
