---
layout: plugin
permalink: plugins/chai-moment-string/
pluginName: chai-moment-string
---

# chai-moment-string
chai plugin for validating a string with an expected moment format

[![Build Status](https://travis-ci.org/k24/chai-moment-string.png?branch=master)](https://travis-ci.org/k24/chai-moment-string)
[![Downloads](http://img.shields.io/npm/dm/chai-moment-string.svg)](http://img.shields.io/npm/dm/chai-moment-string.svg)

## Usage

### Browser

```html
<script src="chai.js"></script>
<script src="chai-moment-string.js"></script>
```

### Server

```javascript
var chai = require('chai');
chai.use(require('chai-moment-string'));
```

## Assertions

* momentFormat
* strict(chained by momentFormat)

### momentFormat

```javascript
// Without locale
expect('2018-01-26').to.momentFormat('YYYY-MM-DD');
// With locale
expect('2012 juillet').to.momentFormat('YYYY MMMM', 'fr');
```

### strict

```javascript
// Without locale
expect('2018-01-26').to.momentFormat.strict('YYYY-MM-DD');
// With locale
expect('2012 juillet').to.momentFormat.strict('YYYY MMMM', 'fr');
```

See more for the strict parsing: https://momentjs.com/guides/#/parsing/strict-mode/
