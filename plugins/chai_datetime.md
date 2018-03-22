---
layout: plugin
permalink: plugins/chai-datetime/
pluginName: chai-datetime
---

# chai-datetime

Matchers for chai to help with common date comparison assertions against
JavaScript Date objects.

[![Build Status](https://travis-ci.org/mguterl/chai-datetime.png?branch=master)](https://travis-ci.org/mguterl/chai-datetime)

## Why?

Comparing date objects in JavaScript is not based on value, which
requires you to call getTime() to ensure the values match. These
matchers remove the need to do that. Additionally when comparing
getTime() values with the standard chai equality matcher you don't get
very readable output because you're comparing epoch seconds.

### Better Error Messages

Comparing date values for equality with getTime() gives unreadable
error messages:

    AssertionError: expected 1369944360000 to equal 1369944300000

Use chai-datetime to get something easier to read:

    AssertionError: expected Thu May 30 2013 16:06:00.000 (-04:00) to equal Thu May 30 2013 16:05:00.000 (-04:00)

## Usage

### Browser

```html
<script src="chai.js"></script>
<script src="chai-datetime.js"></script>
```

### Server

```javascript
var chai = require('chai');
chai.use(require('chai-datetime'));
```

## Assertions

There are a collection of assertions that work on times and dates. Any
assertion that specifies date in the name only compares the date
portion of the Date object.

* equalTime
* beforeTime
* afterTime
* withinTime
* equalDate
* beforeDate
* afterDate
* withinDate

All assertions are defined for both the BDD and TDD syntaxes.

```javascript
var d1 = new Date(2013, 4, 30, 16, 5),
    d2 = new Date(2013, 4, 30, 17);

d1.should.equalDate(d2)
expect(d1).to.equalDate(d2)
assert.equalDate(d1, d2)
```

## Thanks

Thanks to @mitchlloyd for pairing with me on this to help get me
started. Thanks to @rockwood for putting up with my continuous
trolling.

Thanks to the [chai-fuzzy](https://github.com/elliotf/chai-fuzzy)
module for giving me an idea for how to structure and test a chai
plugin.
