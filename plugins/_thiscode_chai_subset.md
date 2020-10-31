---
layout: plugin
permalink: plugins/@thiscode/chai-subset/
pluginName: @thiscode/chai-subset
---

Fork Information
================

I was searching for an subset test which can handle arrays in any order. `chai-subset` was the one that worked. But the messages are meaningless. Like this one:

```text
expected { Object (key1, key2, ...) } to contain subset { Object (key1) }
```

It would be better to show what exactky the difference is. I have tried some other libraries, but no one was suitable for me:

- chai-deep-match, chai-samsam: Cannot check array of objects in any order and no detailed diff (just like chai-subset saying something like that an object expecting another object, no different values shown)
- chai-better-shallow-deep-equal: Cannot check array of objects in any order and very messy assertion error message
- chai-match-pattern: Could work, but cannot use patterns with partial notation "..." to reach my goal
- chai-shallow-deep-equal: Cannot check array of objects in any order, but very nice assertion error which display only the (first) relevant difference

So I tried to take on the coding pattern from "chai-shallow-deep-equal" and integrate it into "chai-subset".

Now the assertion messages should be better readable like:

```text
Expected to have "some_value" but got "other_value" at path "/key1/key2"
```

@thiscode/chai-subset
=====================

"containSubset" object properties matcher for [Chai](http://chaijs.com/) assertion library

Installation
===========

`npm install --save-dev @thiscode/chai-subset`

Usage
=====

common.js
```js
var chai = require('chai');
var chaiSubset = require('@thiscode/chai-subset');
chai.use(chaiSubset);
```

in your spec.js
```js
var obj = {
	a: 'b',
	c: 'd',
	e: {
		foo: 'bar',
		baz: {
			qux: 'quux'
		}
	}
};
	
expect(obj).to.containSubset({
	a: 'b',
	e: {
		baz: {
			qux: 'quux'
		}
	}
});

// or using a compare function
expect(obj).containSubset({
	a: (expectedValue) => expectedValue,
	c: (expectedValue) => expectedValue === 'd'
})

// or with 'not'
expect(obj).to.not.containSubset({
	g: 'whatever'
});
```

Also works good with arrays and `should` interface
```js
var list = [{a: 'a', b: 'b'}, {v: 'f', d: {z: 'g'}}];

list.should.containSubset([{a:'a'}]); //Assertion error is not thrown
list.should.containSubset([{a:'a',  b: 'b'}]); //Assertion error is not thrown

list.should.containSubset([{a:'a', b: 'bd'}]); 
/*throws
AssertionError: expected
[
    {
        "a": "a",
        "b": "b"
    },
    {
        "v": "f",
        "d": {
            "z": "g"
        }
    }
]
to contain subset 
[ { a: 'a', b: 'bd' } ]
*/
```

and with `assert` interface
```js
assert.containSubset({a: 1, b: 2}, {a: 1});
```
