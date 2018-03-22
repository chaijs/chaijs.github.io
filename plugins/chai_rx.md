---
layout: plugin
permalink: plugins/chai-rx/
pluginName: chai-rx
---

# Chai Assertions for RxJS Observables

**ChaiRx** extends [Chai](http://chaijs.com/) with a simple utility method `emit` for testing emits from an RxJS Observable stream using the [`Rx.TestScheduler`](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/testing/testscheduler.md).

```javascript
import Rx from 'rx';
import chai from 'chai';
import chaiRx from 'chai-rx';

chai.use(chaiRx);

const { onNext, onCompleted } = Rx.ReactiveTest;
const scheduler = new Rx.TestScheduler();

const xs = scheduler.createHotObservable(
  onNext(150, 1),
  onNext(210, 2),
  onNext(220, 3),
  onCompleted(230)
);

// Note we'll start at 200 for subscribe, hence missing the 150 mark
const output = scheduler.startScheduler(() => xs.map(x => x * x), {
  created: 100,
  subscribed: 200,
  disposed: 300
});

expect(output).to.emit([
  onNext(210, 4),
  onNext(220, 9),
  onCompleted(230)
]);

```

## Usage

### `expect` / `should` syntax

```javascript
const xs = scheduler.createHotObservable(onNext(250, { 'foo': 'bar' }), onError(300, new Error('An error')));
const output = scheduler.startScheduler(() => xs);

// expect
expect(output).to.emit([
  onNext(250, { 'foo': 'bar' }),
  onError(300, ({error}) => error.message === 'An error')
]);

// should
output.should.emit([
  onNext(250, { 'foo': 'bar' }),
  onError(300, ({error}) => error.message === 'An error')
]);
```

### Language chains

```javascript
const const xs = scheduler.createHotObservable(onNext(250));
const output = scheduler.startScheduler(() => xs);

// with `not`
expect(output).to.not.emit([
  onNext(300)
]);

```

## Installation

```shell
npm install chai-rx
```

### ES6 Imports

```javascript
import chai from 'chai';
import chaiRx from 'chai-rx';

chai.use(chaiRx);
```

### AMD

```javascript
var chai = require('chai');
var chaiRx = require('chai-rx');

chai.use(chaiRx);
```

### `<script>` tag

If you include ChaiRx directly with a `<script>` tag, after the one for Chai itself, then it will automatically plug in to Chai and be ready for use:

```html
<script src="chai.js"></script>
<script src="chai-rx.js"></script>
```
