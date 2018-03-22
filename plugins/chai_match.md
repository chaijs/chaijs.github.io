---
layout: plugin
permalink: plugins/chai-match/
pluginName: chai-match
---

Chai Match
==========

Advanced RegExp assertions for Chai.js.

Installation
------------

```
npm i --save-dev chai-match
```

```javascript
var chai = require('chai');
chai.use(require('chai-match'));
```

API
---

### `.capture(n)`

Sets the assertion object to a previous match's capture.

```javascript
expect('some thing to test').to.match(/some (\w+) to test/).and.capture(0).equals('thing');
'Here in London'.should.match(/(here|there) in (\w+)/i).and.capture(1).equals('London');
```
