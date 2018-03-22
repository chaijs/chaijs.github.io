---
layout: plugin
permalink: plugins/zombied-chai/
pluginName: zombied-chai
---

[![npm version](https://badge.fury.io/js/zombied-chai.svg)](https://badge.fury.io/js/zombied-chai)
[![Build Status](https://travis-ci.org/tarciosaraiva/zombied-chai.svg)](https://travis-ci.org/tarciosaraiva/zombied-chai)
[![Code Climate](https://codeclimate.com/github/tarciosaraiva/zombied-chai/badges/gpa.svg)](https://codeclimate.com/github/tarciosaraiva/zombied-chai)
[![Issue Count](https://codeclimate.com/github/tarciosaraiva/zombied-chai/badges/issue_count.svg)](https://codeclimate.com/github/tarciosaraiva/zombied-chai)
[![devDependency Status](https://david-dm.org/tarciosaraiva/zombied-chai/dev-status.svg)](https://david-dm.org/tarciosaraiva/zombied-chai#info=devDependencies)

# Zombied Chai

[![Join the chat at https://gitter.im/tarciosaraiva/zombied-chai](https://badges.gitter.im/tarciosaraiva/zombied-chai.svg)](https://gitter.im/tarciosaraiva/zombied-chai?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A plugin for Chai that wraps ZombieJS assertions, but with a better DSL.

If you are using `should` or `expect` in Chai, instead of writing
```
browser.assert.status(200)
```
  you can write
```
browser.should.have.status(200)
expect(browser).to.have.status(200)
```

## How to use it
On your specHelper.js make sure you load `zombied-chai` like below:

```javascript
'use strict'

var chai = require('chai')
var zombiedChai = require('zombied-chai')

chai.should()
chai.use(zombiedChai)
```

## Assertions
Not all assertions are implemented yet but you already can do some basic things:

|Zombie assertion<br/>`browser.assert`|Zombied-Chai assertion<br/>`browser.should.be/have`|
|-------------------------------------|---------------------------------------------------|
|`.success`|`.successful`|
|`.status(200)`|`.status(200)`|
|`.element('#selector')`|`.element('#selector')`|
|`.className('#selector', 'foo')`|`.element('#selector').withClass('foo')`|
|`.hasNoClass('#selector', 'foo')`|`.element('#selector').withoutClass('foo')`|
|`.attribute('#selector', 'foo', 'bar')`|`.element('#selector').withAttribute('foo', 'bar')`|
|`.attribute('#selector', 'data-foo', 'bar')`|`.element('#selector').withData('foo', 'bar')`|
|`.hasFocus('#selector')`|`.element('#selector').focused`|
|`.link('#selector', 'link text')`|`.link('#selector', 'link text')`|
|`.link('#selector', 'link text', 'url')`|`.link('#selector', 'link text').withHref('#href')`|
|`.url('url|obj|regex')`|`.url().withHost('host')`|
|`.url('url|obj|regex')`|`.url().withPath('/path')`|
|`.url('url|obj|regex')`|`.url().withQuery('a', 'b')`|

You can chain all this:
```
.url().withHost('host').withPath('/').withQuery('a', 'b')
```

Check the tests for all assertions. More assertions will come in time.
