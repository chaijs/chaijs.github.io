---
layout: plugin
permalink: plugins/chai-changes/
pluginName: chai-changes
---

chai-changes
============

[![Build Status](https://travis-ci.org/matthijsgroen/chai-changes.png?branch=master)](https://travis-ci.org/matthijsgroen/chai-changes)
[![NPM Version](https://fury-badge.herokuapp.com/js/chai-changes.png)](http://badge.fury.io/js/chai-changes)

chai-changes is an extension to the [chai](http://chaijs.com/) assertion library that
provides a set of change-specific assertions.

Assertions
----------

All assertions use a `when` mechanism.

Using 'expect':

```coffeescript
expect(-> codeThatYieldsAChangedResult).to....when ->
  executeTheCodeThatCausesTheChange()
```

The code within the `expect` section will be executed first, then the
code in the `when` section will be executed and then the code in the
`expect` section will be executed again and the differences will be
asserted.

Same test using 'should':

```coffeescript
(-> codeThatYieldsAChangedResult).should....when ->
  executeTheCodeThatCausesTheChange()
```

### when

Executes the build up pre- and post-conditions. First it executes the
pre-conditions, then it will execute the provided callback. And after
the callback it will assert the post-conditions. It will change the
object in the assertion chain to the result of the callback.

#### Promises

When the callback returns a promise, the post-conditions are executed
when the promise is fulfilled.

The `when` statement will return an assertion promise when the result of
the `when` block is a promise. To use in mocha, you can specify an
`notify` key to trigger `done()`

```coffeescript
expect(-> value).to.change.when(
  -> promise
  notify: done
)
```

if you use
[mocha-as-promised](https://github.com/domenic/mocha-as-promised), you
don't need to specify this notify method

an alternative would be:

```coffeescript
expect(-> value).to.change.when(-> promise).then
  -> done()
  (error) -> done(error)
```

### `change`

Assert if the 'expect/should' changes its outcome when 'when' is
executed

```coffeescript
result = 0
(-> result).should.change.when -> result += 1
expect(-> result).to.change.when -> result -= 1
expect(-> result).not.to.change.when -> result = result * 1
```

### `change.by(delta)`

Assert if the change of the 'expect/should' has the provided delta

```coffeescript
result = 0
(-> result).should.change.by(3).when -> result += 3
expect(-> result).not.to.change.by(-3).when -> result += 1
expect(-> result).to.change.by(-2).when -> result -= 2
```

### `change.from(startValue)`

Assert if the change starts from a certain value. The value is
compared using a deep equal.

```coffeescript
result = ['a', 'b']
(-> result).should.change.from(['a', 'b']).when -> result.push('c')
(-> result).should.change.from(['a', 'b']).to(['a', 'b', 'c']).when -> result.push('c')
```

### `change.to(endValue)`

Assert if the change ends in a certain value. The value is
compared using a deep equal.

```coffeescript
result = ['a', 'b']
(-> result).should.change.to(['a', 'b', 'c']).when -> result.push('c')
(-> result).should.change.from(['a', 'b']).to(['a', 'c']).when -> result = ['a', 'c']
```

### `increase`

Assert if the value increases when an action is performed

```coffeescript
result = 0
expect(-> result).to.increase.when -> result += 1
expect(-> result).not.to.increase.when -> result
expect(-> result).not.to.increase.when -> result -= 1
```

### `decrease`

Assert if the value decreases when an action is performed

```coffeescript
result = 0
expect(-> result).to.decrease.when -> result -= 1
expect(-> result).not.to.decrease.when -> result
expect(-> result).not.to.decrease.when -> result += 1
```

### `atLeast(amount)`

Assert if the value has a minimal change of 'amount'

```coffeescript
result = 0
expect(-> result).to.change.by.atLeast(4).when -> result += 5
expect(-> result).to.change.by.atLeast(4).when -> result -= 10
```

### `atMost(amount)`

Assert if the value has a maximum change of 'amount'

```coffeescript
result = 0
expect(-> result).to.change.by.atMost(7).when -> result += 5
expect(-> result).to.change.by.atMost(14).when -> result -= 10
```

## Installation and Setup

### Node

Do an `npm install chai-changes` to get up and running. Then:

```javascript
var chai = require("chai");
var chaiChanges = require("chai-changes");

chai.use(chaiChanges);
```

You can of course put this code in a common test fixture file; for an example using [Mocha][mocha]

### AMD

Chai Changes supports being used as an [AMD][amd] module, registering itself anonymously (just like Chai). So,
assuming you have configured your loader to map the Chai and Chai Changes files to the respective module IDs
`"chai"` and `"chai-changes"`, you can use them as follows:

```javascript
define(function (require, exports, module) {
    var chai = require("chai");
    var chaiChanges = require("chai-changes");

    chai.use(chaiChanges);
});
```

### `<script>` tag

If you include Chai Changes directly with a `<script>` tag, after the one for Chai itself, then it will
automatically plug in to Chai and be ready for use:

```html
<script src="chai.js"></script>
<script src="chai-changes.js"></script>
```

## License

Copyright (c) 2012 Matthijs Groen

MIT License (see the LICENSE file)

[chai]: http://chaijs.com/
[mocha]: http://visionmedia.github.com/mocha/
[amd]: https://github.com/amdjs/amdjs-api/wiki/AMD
