---
layout: plugin
permalink: plugins/chai-luxon/
pluginName: chai-luxon
---

# chai-luxon

A [Chai](https://www.chaijs.com/) plugin that adds matchers for dates and formatted date strings powered by [Luxon](https://moment.github.io/luxon/)

[![NPM Version](https://img.shields.io/npm/v/chai-luxon.svg?style=flat)]()
[![NPM License](https://img.shields.io/npm/l/all-contributors.svg?style=flat)](http://www.tldrlegal.com/license/mit-license)
[![NPM Downloads](https://img.shields.io/npm/dt/chai-luxon.svg?style=flat)]()  
[![NPM](https://nodei.co/npm/chai-luxon.png?downloads=true)](https://www.npmjs.com/package/chai-luxon)  
## Using

Also see the [tests](https://github.com/cadam11/chai-luxon/tree/master/test/)

### browser-side

include chai luxon after chai and luxon:

    <script src="luxon.js"></script>
    <script src="chai.js"></script>
    <script src="chai-luxon.js"></script>

### server-side

have chai use chai-luxon:

```javascript
var chai = require('chai');
chai.use(require('chai-luxon'));
```

## Assertions

Compare any Luxon compatible date/string/whatever with another, with optional granularity.

When using granularity, please use one of the following: `year`, `month`, `week`, `day`, `hour`, `minute`, `second`. When using tdd-style assertions, if you do not use one of the listed granularities, the argument will be interpreted as a custom error message.

### sameDateTime

```javascript
var dateString = '2020-04-21',
  date = new Date(2020, 3, 21),
  milliseconds = 1461222000000, // assumes system has PDT timezone
  obj = { year: 2020, month: 3, day: 21 },
  luxonDateTime = DateTime.fromISO('2020-04-21'),
  oneDayLater = DateTime.fromISO('2020-04-22');

// using should-style assertions
dateString.should.be.sameDateTime(date);
dateString.should.be.sameDateTime(oneDayLater, 'month');

// using expect-style assertions
expect(milliseconds).to.be.sameDateTime(obj);
expect(dateString).to.be.sameDateTime(oneDayLater, 'month');

// using tdd assertions
assert.sameDateTime(luxonDateTime, luxonDateTime);
assert.sameDateTime(luxonDateTime, oneDayLater, 'month');
assert.sameDateTime(luxonDateTime, oneDayLater, 'month', 'custom error message');
assert.sameDateTime(luxonDateTime, oneDayLater, 'custom error message'); // fails
```

### beforeDateTime

```javascript
var dateString = '2020-04-21',
  oneDayLater = '2020-04-22';

// using should-style assertions
dateString.should.be.beforeDateTime(oneDayLater);
dateString.should.be.beforeDateTime(oneDayLater, 'month'); // fails

// using expect-style assertions
expect(dateString).to.be.beforeDateTime(oneDayLater);
expect(dateString).to.be.beforeDateTime(oneDayLater, 'month'); // fails

// using tdd assertions
assert.beforeDateTime(luxonDateTime, oneDayLater);
assert.beforeDateTime(luxonDateTime, oneDayLater, 'month'); // fails
assert.beforeDateTime(luxonDateTime, oneDayLater, 'month', 'custom error message'); // fails
assert.beforeDateTime(luxonDateTime, oneDayLater, 'custom error message');
```

### afterDateTime

```javascript
var dateString = '2020-04-21',
  oneDayLater = '2020-04-22';

// using should-style assertions
oneDayLater.should.be.afterDateTime(luxonDateTime);
oneDayLater.should.be.afterDateTime(luxonDateTime, 'month'); // fails

// using expect-style assertions
expect(oneDayLater).to.be.afterDateTime(luxonDateTime);
expect(oneDayLater).to.be.afterDateTime(luxonDateTime, 'month'); // fails

// using tdd assertions
assert.afterDateTime(oneDayLater, luxonDateTime);
assert.afterDateTime(oneDayLater, luxonDateTime, 'month'); // fails
assert.afterDateTime(oneDayLater, luxonDateTime, 'month', 'custom error message'); // fails
assert.afterDateTime(oneDayLater, luxonDateTime, 'custom error message');
```

# Thanks

Thanks to [picardy](https://github.com/picardy/chai-moment/) for chai-moment, which was the basis for this.
