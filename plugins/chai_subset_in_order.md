---
layout: plugin
permalink: plugins/chai-subset-in-order/
pluginName: chai-subset-in-order
---

"containSubsetInOrder" object properties matcher for [Chai](http://chaijs.com/) assertion library

It works in similar way as [chai-subset](https://www.npmjs.com/package/chai-subset).
However in arrays it must be the same order to pass an assertion.

Installation
===========

`npm install --save-dev chai-subset-in-order`

Usage
=====

```js
const chai = require('chai');
const chaiSubsetInOrder = require('chai-subset-in-order');

chai.use(chaiSubsetInOrder);
const expect = chai.expect;

expect({ foo: 2, bar: 3 }).to.containSubsetInOrder({ foo: 2 });
expect({ foo: 2, bar: 3 }).to.containSubsetInOrder({ bar: 3 });
expect({ foo: 2, bar: 3 }).to.containSubsetInOrder({ foo:2, bar: 3 });
expect({ foo: 2, bar: 3 }).to.not.containSubsetInOrder({ foo: 5 });
expect([{ foo: 123, bar: 456 }, { baz: 111 }]).to.containSubsetInOrder([{ foo: 123 }]);
expect([{ foo: 123, bar: 456 }, { baz: 111 }]).to.containSubsetInOrder([{ bar: 456 }]);
expect([{ foo: 123, bar: 456 }, { baz: 111 }]).to.containSubsetInOrder([{ foo: 123 }, { baz: 111 }]);
expect([{ foo: 123, bar: 456 }, { baz: 111 }]).to.not.containSubsetInOrder([{ baz: 111 }, { foo: 123 }]);
```