---
layout: plugin
permalink: plugins/chai-webdriver-exec/
pluginName: chai-webdriver-exec
---

# chai-webdriver-exec [![Build Status](https://travis-ci.org/clns/chai-webdriver-exec.svg?branch=master)](https://travis-ci.org/clns/chai-webdriver-exec)

Provides [selenium-webdriver](https://npmjs.org/package/selenium-webdriver) support for asserting executed scripts in [Chai](http://chaijs.com/). This plugin is complementary to the [chai-webdriver](http://chaijs.com/plugins/chai-webdriver/) plugin which only adds support for dom-based assertions.

## Assertions

All assertions use an `exec` mechanism and work with `chai.expect()`:

```js
chai.expect('return document.childElementCount').exec.to.equal(1)
chai.expect('return document.childElementCount').exec.to.exist
```

The script to be executed is the first argument to `chai.expect()` and will be passed to [executeScript()](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebDriver.html#executeScript). For the assertion to work the script must have a return value.

For a list of possible assertions see the [test file](test/main.js). Basically [all BDD assertions](http://chaijs.com/api/bdd/) are supported except: [`arguments`](http://chaijs.com/api/bdd/#arguments), [`itself`](http://chaijs.com/api/bdd/#itself), [`extensible`](http://chaijs.com/api/bdd/#extensible), [`sealed`](http://chaijs.com/api/bdd/#sealed), [`frozen`](http://chaijs.com/api/bdd/#frozen), [`throw`](http://chaijs.com/api/bdd/#method_throw), [`respondTo`](http://chaijs.com/api/bdd/#method_respondto), [`change`](http://chaijs.com/api/bdd/#method_change), [`increase`](http://chaijs.com/api/bdd/#method_increase), [`decrease`](http://chaijs.com/api/bdd/#method_decrease) (due to the nature of executing a script remotely).

### Asynchronous flow

All these assertions are presumed to be asynchronous (using selenium-webdriver's promise chain). They can all take callbacks, or be chained with promises. For example:

```js
expect(script).exec.to.have.ownProperty('string', function(){...})
expect(script).exec.to.have.ownProperty('string').then(function(){...})
```

Note that this usage is not required if using the [selenium-webdriver/testing](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/testing/index.html) wrappers.

## Usage

```sh
npm i --save-dev chai-webdriver-exec
```

and then in your test file:

```js
var chaiWebdriverExec = require('chai-webdriver-exec')
chai.use(chaiWebdriverExec(driver))
```

### Example

```js
var webdriver = require('selenium-webdriver'),
  test = require('selenium-webdriver/testing')
var driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build()

var chai = require('chai')
var chaiWebdriverExec = require('chai-webdriver-exec')
chai.use(chaiWebdriverExec(driver)) // here you hook it up

test.describe('some cool feature', function() {
  this.timeout(10000)
  
  test.it('should work as expected', function() {
    driver.get('http://github.com');
    chai.expect('return window.scrollX').to.be.a('number')
  })
})
```

## Tests

```sh
npm test
```
