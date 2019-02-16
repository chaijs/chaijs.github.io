---
layout: plugin
permalink: plugins/chai-jest-mocks/
pluginName: chai-jest-mocks
---

# chai-jest-mocks

[![npm version](https://badge.fury.io/js/chai-jest-mocks.svg)](https://badge.fury.io/js/chai-jest-mocks)
[![CircleCI](https://circleci.com/gh/CaffeinatedCM/chai-jest-mocks/tree/master.svg?style=svg)](https://circleci.com/gh/CaffeinatedCM/chai-jest-mocks/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/CaffeinatedCM/chai-jest-mocks/badge.svg?branch=master)](https://coveralls.io/github/CaffeinatedCM/chai-jest-mocks?branch=master)

Chai plugin that adds assertions for jest mock functions

### __NOTE__ this is still very much a work in progress, more matchers and better documentation (and tests) are coming!

## Installation

On the command line:

```
$ npm install --save-dev chai-jest-mocks
```

## Usage

First, tell `chai` that you want to use `chai-jest-mocks`

```javascript
const chai = require('chai');
const chaiJestMock = require('chai-jest-mocks');

chai.use(chaiJestMock);
```

Then you will have access to the new assertions:

```javascript
// Expect a mock to be called
expect(mockFn).to.have.beenCalled();

// Expect a mock to have been called a certain number of times
expect(mockFn).to.have.beenCalledTimes(4);

// Expect a mock to have been called with specific arguments
expect(mockFn).to.have.beenCalledWith('hello', 'world');

// Expect a mock to have been last called with specific arguments
expect(mockFn).to.have.beenLastCalledWith('hello', 'world');

// Expect a mock to have been nth (in this case, second) called with specific arguments
expect(mockFn).to.have.beenNthCalledWith(2, 'hello', 'world');

// Expect a mock to have returned succesfully (i.e, not throw)
expect(mockFn).to.have.returned();

// Expect a mock to have returned succesfully a certain number of times
expect(mockFn).to.have.returnedTimes(3);
```
