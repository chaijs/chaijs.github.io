---
layout: plugin
permalink: plugins/chai-assertions-count/
pluginName: chai-assertions-count
---

# Chai Assertions Count

[![CI](https://github.com/onechiporenko/chai-assertions-count/actions/workflows/ci.yml/badge.svg)](https://github.com/onechiporenko/chai-assertions-count/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/chai-assertions-count.png)](http://badge.fury.io/js/chai-assertions-count)
[![Downloads](http://img.shields.io/npm/dm/chai-assertions-count.svg)](https://www.npmjs.com/package/chai-assertions-count)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

> Plugin for ChaiJS allows checking how many assertions or expects were run per each test.

## Why do we need to check it?

Let's look at the test:

```js
import InstanceGenerator from '../lib/instances-generator';

describe('suite #1', () => {
  it('test #1', () => {
    class S1T1A {
      /* Other props and methods are skipped */
      /**
       * I'm called after any instance of S1T1A is created
       */
      afterCreate(...args) {
        // I need to check `args` here
        // chai.expect(args)... 
      }
    }
    InstanceGenerator.create(S1T1A, 3); // create 3 instances of S1T1A
  });
});
```

Test looks pretty dummy, but its main idea that it's not possible to figure out was `afterCreate` called or not without dummy flag. It must be initialized on the top of the test. Then it must be toggle inside `afterCreate` and another `expect` must be added at the end of the test.

Tests becomes less readable.

Better way is to check how many `expect` were done.

## Install

```shell
npm i -D chai-assertions-count
```

or

```shell
yarn add -D chai-assertions-count
```

## Plugin

Use this plugin as you would all other Chai plugins.

```js
const chai = require('chai');
const chaiAssertionsCount = require('chai-assertions-count');

chai.use(chaiAssertionsCount);
```

## Usage

```js
const chai = require('chai');
const chaiAssertionsCount = require('chai-assertions-count');
chai.use(chaiAssertionsCount);

describe('suite #2', () => {
  beforeEach(() => {
    chai.Assertion.resetAssertsCheck();
  });
  afterEach(() => {
    // you don't need both of them
    chai.Assertion.checkAssertionsCount();
    chai.Assertion.checkExpectsCount();
  });
});
```

Method `resetAssertsCheck` just drops internal counters and **must** be used before each test.

Method `checkExpectsCount` calculated how many times `chai.expect` was called. Use it in case when your tests use [Expect](https://www.chaijs.com/guide/styles/#expect) style.

Method `checkAssertionsCount` calculated how many assertions were done. Main difference between this method and previous one is that single `expect` may do more than one `assertion`. Example below illustrates this:

```js
const chai = require('chai');
const chaiAssertionsCount = require('chai-assertions-count');
chai.use(chaiAssertionsCount);

describe('suite #3', () => {
  it('test #1', () => {
    chai.Assertion.expectAssertions(3);
    chai.Assertion.expectExpects(2);

    chai.expect(1).to.be.equal(1);
    chai.expect([]).to.have.property('length', 0);
  });
});
```

Here are **two** expects and we "expect" that two of them will be executed. In the same time there are **three** assertions "under the hood". First `expect` has a single assertion. However, second `expect` has two of them. First one checks that property `length` exists and another one checks its value. So, be aware with `expectAssertions` counter.

Method `expectExpects` can cover most cases, so `expectAssertions` won't be used in 99.9%.

## Restrictions

* Works only with [Expect](https://www.chaijs.com/guide/styles/#expect) style.
* Stop other tests in the current suite on `expectExpects` or `expectAssertions` fail.