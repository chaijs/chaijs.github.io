---
layout: plugin
permalink: plugins/chai-postman/
pluginName: chai-postman
---

# chai-postman [![Build Status](https://travis-ci.com/postmanlabs/chai-postman.svg?branch=develop)](https://travis-ci.com/postmanlabs/chai-postman) [![codecov](https://codecov.io/gh/postmanlabs/chai-postman/branch/develop/graph/badge.svg)](https://codecov.io/gh/postmanlabs/chai-postman)

[Chai plugin](http://chaijs.com/api/plugins/) to assert on Postman Collections

## Install
```bash
$ npm install chai-postman --save-dev
```

## Usage
In order to use this plugin, ensure that you have [postman-collection](https://www.npmjs.com/package/postman-collection)
and [lodash](https://www.npmjs.com/package/lodash) installed.

```javascript
var _ = require('lodash'),
    chai = require('chai'),
    sdk = require('postman-collection'),
    chaiPostman = require('chai-postman'),

    req,
    res,
    expect = chai.expect;

chai.use(chaiPostman(sdk, _));

// create postman-collection request and response instances
req = new sdk.Request({
    header: [{
        key: 'Content-Type',
        value: 'application/json; charset=utf-8'
    }]
});
res = new sdk.Response({ code: 200 });

// request assertions
expect(req).to.be.a.postmanRequest;
expect(req).to.have.header('Content-Type'); // an optional second argument can also be provided to assert value

// response assertions
expect(res).to.be.a.postmanResponse;
expect(res).to.have.statusCode(200);
```

Check the [tests](https://github.com/postmanlabs/chai-postman/tree/develop/test/unit) for a complete reference.
