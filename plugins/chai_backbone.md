---
layout: plugin
permalink: plugins/chai-backbone/
pluginName: chai-backbone
---

chai-backbone
=============

[![Build Status](https://travis-ci.org/matthijsgroen/chai-backbone.png?branch=master)](https://travis-ci.org/matthijsgroen/chai-backbone)
[![NPM Version](https://fury-badge.herokuapp.com/js/chai-backbone.png)](http://badge.fury.io/js/chai-backbone)

chai-backbone is an extension to the [chai](http://chaijs.com/) assertion library that
provides a set of backbone specific assertions.

Use the assertions with chai's `expect` or `should` assertions.

Dependencies
------------

- [sinon](http://sinonjs.org/)
- [chai-changes](https://github.com/matthijsgroen/chai-changes)
- [underscore](http://underscorejs.org/)
- [backbone](http://backbonejs.org/)

Assertions
----------

### `trigger`

```javascript
model.should.trigger("change", { with: [model] }).when(function() {
  model.set({ attribute: "value" });
});
```

this can also be chained further:

```javascript
model.should.trigger("change").and.trigger("change:attribute").when(function() {
  model.set({ attribute: "value" });
});

model.should.trigger("change").and.not.trigger("reset").when(function() {
  model.set({ attribute: "value" });
});
```

### `route.to`

Tests if a route is delegated to the correct router and if the arguments
are extracted in the expected manner.

```javascript
"page/3".should.route.to(myRouter, "openPage", { arguments: ["3"] });
"pages/3".should.not.route.to(myRouter, "openPage");
"page/3".should.route.to(myRouter, "openPage", { considering: [conflictingRouter] });
```

### `call`

This assertion is ideal for testing view callbacks it will rebind view
events to test DOM events

```javascript
view.should.call('startAuthentication').when(function() {
  view.$('a.login').trigger('click');
});
```

## Installation and Setup

### Node

Do an `npm install chai-backbone` to get up and running. Then:

```javascript
var chai = require("chai");
var chaiBackbone = require("chai-backbone");

chai.use(chaiBackbone);
```

You can of course put this code in a common test fixture file; for an example using [Mocha][mocha]

### AMD

Chai Backbone supports being used as an [AMD][amd] module, registering itself anonymously (just like Chai). So,
assuming you have configured your loader to map the Chai and Chai
Backbone files to the respective module IDs
`"chai"` and `"chai-backbone"`, you can use them as follows:

```javascript
define(function (require, exports, module) {
    var chai = require("chai");
    var chaiBackbone = require("chai-backbone");

    chai.use(chaiBackbone);
});
```

### `<script>` tag

If you include Chai Backbone directly with a `<script>` tag, after the one for Chai itself,
then it will automatically plug in to Chai and be ready for use:

```html
<script src="chai.js"></script>
<script src="chai-backbone.js"></script>
```

## License

Copyright (c) 2012-2015 Matthijs Groen

MIT License (see the LICENSE file)

[chai]: http://chaijs.com/
[mocha]: http://visionmedia.github.com/mocha/
[amd]: https://github.com/amdjs/amdjs-api/wiki/AMD

