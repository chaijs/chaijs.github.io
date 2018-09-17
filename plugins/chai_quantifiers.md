---
layout: plugin
permalink: plugins/chai-quantifiers/
pluginName: chai-quantifiers
---

# chai-quantifiers

Array quantifier assertions for [Chai](http://chaijs.com/) assertion library.

[![Build Status](https://travis-ci.org/frankthelen/chai-quantifiers.svg?branch=master)](https://travis-ci.org/frankthelen/chai-quantifiers)
[![Coverage Status](https://coveralls.io/repos/github/frankthelen/chai-quantifiers/badge.svg?branch=master)](https://coveralls.io/github/frankthelen/chai-quantifiers?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/frankthelen/chai-quantifiers.svg)](https://greenkeeper.io/)
[![Maintainability](https://api.codeclimate.com/v1/badges/44fb4c780c3f36b0d04f/maintainability)](https://codeclimate.com/github/frankthelen/chai-quantifiers/maintainability)
[![node](https://img.shields.io/node/v/chai-quantifiers.svg)]()
[![code style](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)
[![License Status](http://img.shields.io/npm/l/chai-quantifiers.svg)]()

## Install

```bash
npm install --save-dev chai chai-quantifiers
```

## Usage

There are three assertions available, applicable to arrays.
 * containAll -- Asserts that all array items are true in respect to a predicate.
 * containOne -- Asserts that at least one array item is true in respect to a predicate.
 * containExactlyOne -- Asserts that exactly one array item is true in respect to a predicate.

A quick example:
```javascript
const chai = require('chai');
const chaiQuantifiers = require('chai-quantifiers');

chai.use(chaiQuantifiers);

const { expect } = chai;

describe('chai-quantifiers', () => {
  it('containAll should be true if all items are true', () => {
    expect([0, 1, 2, 3]).to.containAll(item => item < 4);
  });
  it('containOne should be true if at least one item is true', () => {
    expect([0, 1, 2, 3]).to.containOne(item => item >= 2);
  });
  it('containExactlyOne should be true if exactly one item is true', () => {
    expect([0, 1, 2, 3]).to.containExactlyOne(item => item === 2);
  });
});
```
