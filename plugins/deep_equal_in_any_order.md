---
layout: plugin
permalink: plugins/deep-equal-in-any-order/
pluginName: deep-equal-in-any-order
---

# deep-equal-in-any-order

[![MIT License](https://img.shields.io/badge/license-mit-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/oprogramador/deep-equal-in-any-order.svg?branch=master)](https://travis-ci.org/oprogramador/deep-equal-in-any-order
)

[![NPM status](https://nodei.co/npm/deep-equal-in-any-order.png?downloads=true&stars=true)](https://npmjs.org/package/deep-equal-in-any-order
)

Chai plugin to match objects and arrays deep equality with arrays (including nested ones) being in any order.

It works in similar way as `deep.equal` but it doesn't checks the arrays order (at any level of nested objects and arrays). The array elements can be any JS entity (boolean, null, number, string, object, array...).

## install
```
npm i --save deep-equal-in-any-order
```
or
```
yarn add deep-equal-in-any-order
```

## usage
```js
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);

const { expect } = chai;

expect([1, 2]).to.deep.equalInAnyOrder([2, 1]);
expect([1, 2]).to.not.deep.equalInAnyOrder([2, 1, 3]);
expect({ foo: [1, 2], bar: [4, 89, 22] }).to.deep.equalInAnyOrder({ foo: [2, 1], bar: [4, 22, 89] });
expect({ foo: ['foo-1', 'foo-2', [1, 2], null ] }).to.deep.equalInAnyOrder({ foo: [null, [1, 2], 'foo-1', 'foo-2'] });
expect({ foo: [1, 2], bar: { baz: ['a', 'b', { lorem: [5, 6] }] } }).to.deep.equalInAnyOrder({ foo: [2, 1], bar: { baz: ['b', 'a', { lorem: [6, 5] }] } });
```
