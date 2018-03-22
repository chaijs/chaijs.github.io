---
layout: plugin
permalink: plugins/chai-contained/
pluginName: chai-contained
---

# chai-contained

Usage example:
``` javascript
var chai = require('chai')
  , expect = chai.expect
  , chaiContained = require('chai-contained');

expect('foo').to.be.containedIn(['foo', 'bar']); // will pass
expect('foo').to.be.containedIn(['noFoo', 'baz']); // will fail
```

The later will fail with message: `AssertionError: expected 'foo' to be one of the [ 'noFoo', 'baz' ]`
