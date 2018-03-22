---
layout: plugin
permalink: plugins/chai-samsam/
pluginName: chai-samsam
---

# chai-samsam [![Build Status](https://travis-ci.org/TimBeyer/chai-samsam.svg?branch=master)](https://travis-ci.org/TimBeyer/chai-samsam) [![codecov](https://codecov.io/gh/TimBeyer/chai-samsam/branch/master/graph/badge.svg)](https://codecov.io/gh/TimBeyer/chai-samsam)


Extends [Chai](http://chaijs.com/) with an assertion for deeply matching just about any kind of object using [samsam](https://github.com/busterjs/samsam).  
This project started out as a fork of [chai-deep-match](https://github.com/JamesMGreene/chai-deep-match).  
Its interface and test cases have been retained and all pass. Thus it can be used as a drop in replacement.  
However, it allows for much looser and deeper matching. ([See the samsam docs](https://github.com/busterjs/samsam#matchobject-matcher))

## Install

```shell
$ npm install --save chai
$ npm install --save chai-samsam
```

## Usage

```js
const chai = require('chai')
const chaiSamSam = require('chai-samsam')

chai.use(chaiSamSam)

expect([{
  firstName: 'John',
  lastName: 'Doe',
  jobs: [{ bartender: true, barista: true }]
}]).to.deep.match([
  { jobs: [{ barista: true }] }
])
// =>  pass

expect([{
  firstName: 'John',
  lastName: 'Doe',
  jobs: [{ bartender: true, barista: true }]
}]).to.not.deep.match([
  { jobs: [{ pilot: true }] }
])
// =>  pass

// also possible
assert.deepMatch(a, b)
assert.notDeepMatch(a, b)
```

## License

Copyright (c) 2017, Tim Beyer (MIT License)
