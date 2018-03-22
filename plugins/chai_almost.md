---
layout: plugin
permalink: plugins/chai-almost/
pluginName: chai-almost
---

# chai-almost

[![travis](https://travis-ci.org/nmuldavin/chai-almost.svg?branch=master)](https://travis-ci.org/nmuldavin/chai-almost)
[![npm](https://img.shields.io/npm/v/chai-almost.svg)](https://www.npmjs.com/package/chai-almost)
[![node](https://img.shields.io/badge/node-%3E=0.10-green.svg)](https://www.npmjs.com/package/chai-almost)

Extends [chai](https://github.com/chaijs/chai) with assertions that allow numbers to be "almost" equal (as in, within some tolerance of one another). This is useful in particular when accounting for floating point rounding errors or other approximations.

## Installation

```
npm install chai-almost --save-dev
```

## Use
To use, import the module then invoke it with `chai.use`:

```
const chai = require('chai');
const chaiAlmost = require('chai-almost');

chai.use(chaiAlmost());
```

By default, `chai-almost` allows a tolerance of 1 x 10<sup>-6</sup>. This will let most rounding errors pass safely but will still reject most true inequalities. You may override this value by passing your desired tolerance as an argument to the module on invocation:

```
chai.use(chaiAlmost(0.1));
```

### Assertions

The `almost` assertion may be used chainably with deep or shallow equality:

```
// shallow
expect(3.9999999).to.almost.equal(4);	        // passes
expect(3.9).to.almost.equal(4);			// fails
expect(4.0000001).to.be.almost(4);		// passes
expect(4.1).to.not.be.almost(4);		// passes

// deep
expect({ taco: 'pastor', num: 3.9999999 }).to.almost.eql({ taco: 'pastor', num: 4 }); // passes
expect([[1, 2, 2.9999999], 1.0000001]).to.be.deep.almost([[1, 2, 3], 1]);             // passes
expect({ taco: 'pastor', num: 3.9 }).to.not.almost.eql({ taco: 'pastor', num: 4 });   // passes
```

Equality checks on non-numbers are left unchanged:

```
expect('taco').to.almost.equal('taco');   // still passes
expect({ x: 5 }).to.be.almost({ x: 5 });  // still fails (shallow equality)
expect(['tacos', 2, 3]).to.be.deep.almost(['burritos', 2, 2.9999999]); // still fails
```

### Specific tolerance

A single-instance custom tolerance for shallow or deep equality may be passed in as the second argument to `almost`:

```
expect(10).to.be.almost(15, 10)                   // passes
expect([4, 2, 5]).to.be.deep.almost([3, 4, 7], 3) // passes
```
