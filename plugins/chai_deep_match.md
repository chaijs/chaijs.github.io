---
layout: plugin
permalink: plugins/chai-deep-match/
pluginName: chai-deep-match
---

# chai-deep-match
[![GitHub Latest Release](https://badge.fury.io/gh/JamesMGreene%2Fchai-deep-match.svg)](https://github.com/JamesMGreene/chai-deep-match) [![Build Status](https://secure.travis-ci.org/JamesMGreene/chai-deep-match.svg?branch=master)](https://travis-ci.org/JamesMGreene/chai-deep-match) [![Coverage Status](https://coveralls.io/repos/JamesMGreene/chai-deep-match/badge.svg?branch=master&service=github)](https://coveralls.io/github/JamesMGreene/chai-deep-match?branch=master) [![Dependency Status](https://david-dm.org/JamesMGreene/chai-deep-match.svg?theme=shields.io)](https://david-dm.org/JamesMGreene/chai-deep-match) [![Dev Dependency Status](https://david-dm.org/JamesMGreene/chai-deep-match/dev-status.svg?theme=shields.io)](https://david-dm.org/JamesMGreene/chai-deep-match#info=devDependencies)

Extends [Chai](http://chaijs.com/) with an assertion for deeply matching objects (i.e. subset equality checking).


## Install

```shell
$ npm install --save chai
$ npm install --save chai-deep-match
```



## Usage

```js
var chai = require('chai');
var chaiDeepMatch = require('chai-deep-match');

chai.use( chaiDeepMatch );


chai.expect( { a: 'foo', b: 'bar', c: 'baz' } ).to.deep.match( { a: 'foo', c: 'baz' } );
// =>  pass

chai.expect( { a: 'foo', b: 'bar', c: 'baz' } ).to.not.deep.match( { a: 'fuzz', c: 'baz' } );
// =>  pass
```



## License

Copyright (c) 2016, James M. Greene (MIT License)
