---
layout: plugin
permalink: plugins/chai-sorted/
pluginName: chai-sorted
---

[![npm Version](https://img.shields.io/npm/v/chai-sorted.svg)](https://npmjs.org/package/chai-sorted)
[![License](https://img.shields.io/npm/l/chai-sorted.svg)](LICENSE)
[![Build Status](https://travis-ci.org/johntimothybailey/chai-sorted.svg?branch=master)](https://travis-ci.org/johntimothybailey/chai-sorted)
[![Code Climate](https://codeclimate.com/github/johntimothybailey/chai-sorted/badges/gpa.svg)](https://codeclimate.com/github/johntimothybailey/chai-sorted)
[![devDependency Status](https://david-dm.org/johntimothybailey/chai-sorted/dev-status.svg)](https://david-dm.org/johntimothybailey/chai-sorted#info=devDependencies)
[![peerDependency Status](https://david-dm.org/johntimothybailey/chai-sorted/peer-status.svg)](https://david-dm.org/johntimothybailey/chai-sorted#info=peerDependencies)

# Chai Sorted

Chai JS Plugin for testing if an array has sorted values (strings, numbers, booleans). Very helpful when writing tests for features that implement `Array.prototype.sort()`

## Installation

### Node.js

Install via [npm](http://npmjs.org):

```bash
npm install chai-sorted
```

Use this plugin just like other Chai plugins:


```javascript
var chai = require("chai"),
    expect = chai.expect; // preference and tested with expect

chai.use(require("chai-sorted"));
```

### In the browser

There is no planned support for keeping a browser *build* in this repository, so please consider [Webpack](https://webpack.github.io/) or similar tool.

If you do want Browser installation support, please open an issue.

## API Usage

### `.sorted` method

Test for ascending sort order of array

```javascript
expect(["a","b"]).to.be.sorted()
// or
expect(["a","b"]).to.be.sorted({descending: false}) 
```

Test for descending sort order of array

```javascript
expect(["b","apples"]).to.be.sorted({descending: true})
```

### `.sortedBy` method

Allows for sorting by an attribute

Test for ascending sort order of array by `name` attribute

```javascript
expect([{id:2,name:"apple"},{id:3,name:"bat"}]).to.be.sortedBy("name")
```

Test for descending sort order of array by `name` attribute

```javascript
expect([{id:2,name:"bat"},{id:3,name:"apples"}]).to.be.sortedBy("name", {descending: true})
```

### `.ascendingBy` method
Alternate of `sortedBy` but more explicit

Test for ascending sort order of array by `name` attribute

```javascript
expect([{id:2,name:"apple"},{id:3,name:"bat"}]).to.be.ascendingBy("name")
```

### `.descendingBy` method
Alternate of `sortedBy` but does not require passing `true` as a second parameter to `sortedBy`. It is the same as doing `sortBy("name",true)`

Test for descending sort order of array by `name` attribute

```javascript
expect([{id:2,name:"bat"},{id:3,name:"apples"}]).to.be.descendingBy("name")
```

### `ascending` property

Test for ascending sort order of array using a property syntax

```javascript
expect(["a","b"]).to.be.ascending
```

### `descending ` property

Test for descending sort order of array using a property syntax

```javascript
expect(["b","apples"]).to.be.descending
```

### Additional Usage
For additional usage or more help, please see the tests under `./test/`
