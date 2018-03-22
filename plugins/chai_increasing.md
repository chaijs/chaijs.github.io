---
layout: plugin
permalink: plugins/chai-increasing/
pluginName: chai-increasing
---

# chai-increasing

*Flexible chai matchers for snabbdom*

A [chai](http://chaijs.com/) plugin for forming assertions on [increasing/decreasing sequences](https://en.wikipedia.org/wiki/Sequence#Increasing_and_decreasing).

## Usage

Monotonic increasing/decreasing:
```javascript
expect([1,2,2,3,3,4]).to.be.increasing;
expect([5,4,4,4,4,3]).to.be.decreasing;
expect([1,1,1,1,1,1]).to.be.increasing;
expect([1,1,1,1,1,1]).to.be.decreasing;
```

Strictly increasing/decreasing:
```javascript
expect([1,2,3,4,5]).to.be.strictly.increasing;
expect([1,2,3,3,4,5]).not.to.be.strictly.increasing;
expect([10,9,8,7,6]).to.be.strictly.increasing;
expect([10,9,8,7,7]).not.to.be.strictly.decreasing;
```

Empty arrays are [vacuously](https://en.wikipedia.org/wiki/Vacuous_truth) increasing/decreasing:
```javascript
expect([]).to.be.increasing;
expect([]).to.be.decreasing;
expect([]).to.be.strictly.increasing;
expect([]).to.be.strictly.decreasing;
```

Extras:
```javascript
// supports Strings, Floats and Immutable.js Lists
expect(['Apple','Banana','Coconut']).to.be.strictly.increasing;
expect([1.15, 1.75, 3.28, 4.96]).to.be.strictly.increasing;
expect(Immutable.List.of([1,2,3,4])).to.be.strictly.increasing;
```

Nondecreasing/Nonincreasing aliases:
```javascript
// "nondecreasing" and "nonincreasing" may be used instead 
// of "increasing" and "decreasing" for clarity; the behaviour is the same.
expect([1,1,1]).to.be.increasing;
expect([1,1,1]).to.be.nondecreasing;
```

## Installation

```bash
npm install chai-increasing --save-dev
```

```javascript
var chai = require('chai');
chai.use(require('chai-increasing'));
```

## License

MIT License.    
Copyright © 2016 James Lawson
