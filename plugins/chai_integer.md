---
layout: plugin
permalink: plugins/chai-integer/
pluginName: chai-integer
---

# Usage:

``` javascript
var chai = require('chai')
  , expect = chai.expect
  , chai.use( require('chai-integer') );

expect(2015).to.be.an.integer();
expect(2.015).not.to.be.an.integer();
```
