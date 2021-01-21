---
layout: plugin
permalink: plugins/chai-luxon/
pluginName: chai-luxon
---

# chai-luxon

A [Chai](https://www.chaijs.com/) plugin that adds matchers for dates and formatted date strings powered by [Luxon](https://moment.github.io/luxon/)

[![NPM Version](https://img.shields.io/npm/v/chai-luxon.svg?style=flat)]()
[![NPM License](https://img.shields.io/npm/l/chai-luxon.svg?style=flat)](http://www.tldrlegal.com/license/mit-license)
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

## Date-part only

The library includes convenience methods for comparing only the date portion of DateTime values. These convenience methods are aliases for using a granularity of 'day' with the above matchers. All the same date formats (object, JS Date, string, etc) are supported in the same way.

### sameDate, beforeDate, afterdate

```javascript
const date = DateTime.fromISO('2020-04-21T12:00:00Z');
const oneHourLater = date.plus({ hour: 1 });
const oneHourEarlier = date.minus({ hour: 1 });
const oneDayLater = date.plus({ day: 1 });
const oneDayEarlier = date.minus({ day: 1 });

// using should-style assertions
date.should.be.sameDate(oneHourLater);
date.should.be.beforeDate(oneHourLater); // fails
date.should.be.beforeDate(oneDayLater);
date.should.be.afterDate(oneHourEarlier); // fails
date.should.be.afterDate(oneDayLater);

// using expect-style assertions
expect(date).to.be.sameDate(oneHourLater);
expect(date).to.be.beforeDate(oneHourLater); // fails
expect(date).to.be.beforeDate(oneDayLater);
expect(date).to.be.afterDate(oneHourEarlier); // fails
expect(date).to.be.afterDate(oneDayLater);

// using tdd assertions
assert.sameDate(date, oneHourLater);
assert.beforeDate(date, oneDayLater);
assert.beforeDate(date, oneHourLater); // fails
assert.afterDate(oneDayLater, date);
assert.afterDate(oneDayLater, oneHourLater); // fails
```

## Limitations

Strings are limited to ISO-8601 strings only. Other string Date/Time formats aren't guaranteed to work (and probably won't).

# Thanks

Thanks to [picardy](https://github.com/picardy/chai-moment/) for chai-moment, which was the basis for this.
