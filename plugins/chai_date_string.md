---
layout: plugin
permalink: plugins/chai-date-string/
pluginName: chai-date-string
---

# chai-date-string

Usage example:
``` javascript
var chai = require('chai')
  , expect = chai.expect
  , chaiDateString = require('chai-date-string');

expect('2015-11-12').to.be.a.dateString(); // will pass
expect('2015-24-12').to.be.a.dateString(); // will fail
```

It will validate time part as well.

The later will fail with message: `AssertionError: expected '2015-24-12' to be a date string.
