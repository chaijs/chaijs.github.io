---
layout: plugin
permalink: plugins/chai-change/
pluginName: chai-change
---

# Chai Change

[![Build Status](https://travis-ci.org/chaijs/chai-change.svg?branch=master)](https://travis-ci.org/chaijs/chai-change)

Assert that a change you expected to happen, happened, with this plugin for the [chai](http://github.com/logicalparadox/chai) assertion library. The plugin works in node and the browser, asynchronously or synchronously.

The idea of the plugin is to make your tests more robust. Rather than doing:

```javascript
users.create();
expect(users.count()).to.equal(1);
```

instead assert that the action actually causes the expected change

```javascript
expect(() => {
  users.create();
}).to.alter(users.count, { by: 1 });
```

This is more robust as it avoids false positives: in this example, if `users.count()` was already 1 and `users.create()` was not implemented, the first example would still pass. Using the change expectation, since there was not a change `{by: 1}` from the starting value, the test would correctly fail.

## Installation

#### Node.js

`chai-change` is available on npm.

      $ npm install chai-change

#### Browser

Either install via npm, or [download `chai-change`](src/plugin.js) and save as `chai-change.js`. Then simply include after `chai.js`.

```xml
<script src="chai-change.js"></script>
```

## Plug In

If you are using `chai-change` in the browser, there is nothing you need to do.

If you are using node, you just need to tell `chai` about the plugin:

```js
const chai = require('chai');

chai.use(require('chai-change'));
```

## Expect API

### .change

Asserts that the value returned by function passed to `change()` changes after the function has run:

```javascript
let x = 0;

expect(() => { x += 1; }).to.alter(() => x);
expect(() => {         }).not.to.alter(() => x);
```

You can pass options to be specific about the changes expected. Use the `from` key to enforce a starting value, a `to` key for and ending value, and a
`by` key to enforce a numeric change.

```javascript
expect(() => { x += 1 }).to.alter(() => x, { by: 1 });
expect(() => { x += 1 }).to.alter(() => x, { from: x });
expect(() => { x += 1 }).to.alter(() => x, { from: x, to: x + 1 });
expect(() => { x += 1 }).to.alter(() => x, { to: x + 1 });
```

## Assert API

### assert.alters

Asserts that the value returned by `changeWatcher`
changes after the `changer` function has run:
                                                                                       
```javascript
let x = 0;
assert.alters(changer, changeWatcher);

function changer() { x += 1; }
function changeWatcher() { return x }
```
                                                                                       
You can pass options to be specific about the changes expected. Use the `from` 
key to enforce a starting value, a `to` key for and ending value, and a
`by` key to enforce a numeric change.
                                                                                       
```javascript
assert.alters(() => { x += 1 }, () => x, { by: 1 });
assert.alters(() => { x += 1 }, () => x, { from: x });
assert.alters(() => { x += 1 }, () => x, { from: x, to: x + 1 });
assert.alters(() => { x += 1 }, () => x, { to: x + 1 });
```

### assert.unaltered

Asserts that the value returned by `changeWatcher`
doesn't change after the `changer` has run:
                                                          
```javascript
let x = 0;
const noop = () => undefined;
assert.unaltered(noop, () => x);
```

## Asynchronous asserts

Both the `changer` and `changeWatcher` callbacks can return a promise, or take a node-style callback, with `error` as the first parameter. If you provide a callback you need to give a final `callback:` option to the change assertion, that is used to notify your test runner that the test is complete.

### With promises

Many test runners - for instance [mocha](https://github.com/mochajs/mocha) - support simply returning promises from `it()` or `test()` blocks to support asynchronous tsts. chai-change supports this style.

If your runner doesn't support returning promises, you can use the `.then()` method to call a callback based API etc (or use `callback:` as in the error-first callback docs below.

```javascript

it("creates a user", () => {
  let count = 0;
  const User = {
    create(attrs) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          count += 1
          resolve();
        });
      });
    },
    count() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(count);
        });
      });
    },
  };

  // when `changer` or `changeWatcher` returns a promise the expectation will return a promise as well
  return expect(() => (
    User.create({name: "bob"});
  )).to.alter(() => (
    User.count();
  ),{
    by: 1,
  });
})
```

### With error-first callback

```javascript
let count = 0;
const User = {
  create(attrs,cb) {
    setTimeout(() => {
      count += 1
      cb();
    });
  },
  count(cb) {
    setTimeout(() => {
      cb(null,count);
    });
  },
};

expect((stepDone) => {
  User.create({name: "bob"}, stepDone)
}).to.alter((stepDone) => {
  User.count(stepDone);
},{
  by: 1,
  callback: done
});
```

## Tests

Node: `npm install && npm test`.

Browser: `npm install` then open `test/index.html`.

## Changelog

### 2.1

Promise support - thanks to [@talyssonoc](https://github.com/talyssonoc)!

Both the `changeWatcher` and `changer` functions can now return promises. The expectation also returns a promise when used with promises, which can be used directly with mocha etc.

### 2.0

- *BREAKING CHANGE* Change whole API from `change` to `alter` to avoid the `.change` method added to chai in `chai@2.0.0`.
