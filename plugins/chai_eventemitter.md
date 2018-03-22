---
layout: plugin
permalink: plugins/chai-eventemitter/
pluginName: chai-eventemitter
---

# chai-eventemitter [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

This is a plugin for [chai](http://chaijs.com) to simplify the testing of
EventEmitter.

EventEmitters can be testing using spies, but they are rather heavyweight for
most usecases:

```javascript
var spy = sinon.spy()

ee.on('test', spy)
ee.emit('test')
expect(spy).to.have.been.called()

spy.reset()
ee.emit('test', args)
expect(spy).to.have.been.calledWith(args)
```

`chai-eventemitter` replaces this with something much more digestable:

```javascript
expect(function(){ ee.emit('test') }).to.emitFrom(ee, 'test')
expect(function(){ ee.emit('test', arg) }).to.emitFrom(ee, 'test', arg)
```

## Setup

### node.js / io.js

```javascript
var chai = require('chai')
chai.use(require('chai-eventemitter'))
```

### Browser

```html
<script src="chai.js"></script>
<script src="chai-eventemitter.js"></script>
```

# License

`chai-eventemitter` is released under the [MIT License](https://github.com/fengb/chai-eventemitter/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/chai-eventemitter.svg?style=flat
[npm-url]: https://npmjs.org/package/chai-eventemitter
[travis-image]: https://img.shields.io/travis/fengb/chai-eventemitter.svg?style=flat
[travis-url]: https://travis-ci.org/fengb/chai-eventemitter
