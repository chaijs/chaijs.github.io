---
layout: plugin
permalink: plugins/chai-null/
pluginName: chai-null
---

# Chai Null

This is a addon plugin for the [Chai Assertion Library](http://github.com/logicalparadox/chai). It is simple implementation
of [Null Object Pattern](http://en.wikipedia.org/wiki/Null_Object_pattern) for Node.js and the browser.

## Installation

#### Node.js

      $ npm install chai-null

#### Browser

Include `chai-null.js` after including `chai.js`. 

```html
<script src="chai-null.js"></script>
```

## Plug In

If you are using `chai-null` in the browser, there is nothing you need to do. It will detect `chai` in the global
namespace and automagically get used.

If you are using node, here is a useful bit.

```js
var chai = require('chai')
  , nil = require('chai-null');

chai.use(nil);
```

## Building for the Browser

If you are developing an addon for chai, one thing you might find useful is the contents of the `support` folder.
This directly contains everything that is needed to package all js files in a directory for browser use. Provided
there are no external dependencies, everything will be packaged and wrapped with a CommonJS `require` style loader
by [folio](https://github.com/logicalparadox/folio), a small JS packaging tool. Please consult the comments in `support/compile.js`.

## Usage

#### Build object from scratch:

```js
var nullobject = chai.Null().method('foo').method('bar').create();
```

#### Build object with null properties and methods that just return null:

Class:

```js
var nullobject = chai.Null(Klass).create();
```

Object:

```js
var nullobject = chai.Null(obj).create();
```

## Tests

Tests are written using [mocha](http://github.com/visionmedia/mocha).
Node tests can be executed using `make test`. Browser tests can be seen by opening `test/browser/index.html`.

## License

(The MIT License)

Copyright (c) Veselin Todorov <hi@vesln.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
