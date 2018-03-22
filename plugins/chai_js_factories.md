---
layout: plugin
permalink: plugins/chai-js-factories/
pluginName: chai-js-factories
---

# chai-js-factories

[![NPM Version](https://fury-badge.herokuapp.com/js/chai-js-factories.png)](http://badge.fury.io/js/chai-js-factories)

`chai-js-factories` adds support of [js-factories][] to [Chai][]. In essence, it's a wrapper around the js-factories library and makes it available within the Chai namespace.


## Installation

`chai-js-factories` is designed to work in most JavaScript environments, including Node and the browser.

### Node

Run `npm install {--save-dev} chai-js-factories`; then, to use:

```javascript
var chai = require('chai');
var chaiJsFactories = require('chai-js-factories');
chai.use(chaiJsFactories);
```

### AMD

Include [`chai`][Chai] and [`js-factories`][js-factories] per their respective readmes directions, then include `chai-js-factories` as a normal AMD module.

Note that unlike the other methods, you will need to explicitly initialize `chai-js-factories` with the `chai-js-factories` library:

```javascript
require(['chai', 'js-factories', 'chai-js-factories'], function(chai, Factory, chaiJsFactories) {
  chai.use(function(chai, utils) {
    chaiJsFactories(Factory, chai, utils);
  });
});
```

### `<script>` tag

Include `chai-js-factories.js` after including [`chai`][chai] and[`js-factories`][js-factories]:

```html
<script src="chai.js" encoding="utf-8"></script>
<script src="js-factories.js" encoding="utf-8"></script>
<script src="chai-js-factories.js" encoding="utf-8"></script>
```

### Karma

If you're using [Karma][], check out the accompanying [karma-chai-js-factories][] plugin.


## Usage

Access to the `js-factory` library located on the `chai.factory` object:

```javascript
chai.factory.define('testFactory', function (args) {
  return new Example(_.extend({foo: 'bar'}, args));
});

console.log(chai.factory.create('testFactory'));
console.log(chai.factory.create('testFactory', {wom: 'bat'}));
console.log(chai.factory.create('testFactory', {foo: 'wombat'}));
```

This works as expected, overriding the default arguments when they are provided at creation time. For more documentation about factories, take a look at the [js-factories][] documentation.



<!-- Links -->

[Chai]: https://github.com/chaijs/chai
[Karma]: http://karma-runner.github.io
[js-factories]: https://github.com/matthijsgroen/js-factories
[karma-chai-js-factories]: https://github.com/solatis/karma-chai-js-factories
