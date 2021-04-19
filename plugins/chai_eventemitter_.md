---
layout: plugin
permalink: plugins/chai-eventemitter2/
pluginName: chai-eventemitter2
---

# chai-eventemitter2
This is a [chai](chaijs.com) plugin for testing node-style
[EventEmitters](https://nodejs.org/api/events.html).

## Compatibility

- ECMAScript 2020 (Node.js 14+)

## Installation

1. Install the plugin:

	- Using NPM:

		```bash
		npm install -D chai-eventemitter2
		```

	- Using Yarn:

		```bash
		yarn add -D chai-eventemitter2
		```

1. Add this your test setup:

	```js
	const chai = require('chai');
	const eventemitter2 = require('chai-eventemitter2');

	chai.use(eventemitter2());
	```

## Usage

With [Expect API](https://www.chaijs.com/api/bdd/):

```js
const emitter = new EventEmitter();

expect(emitter).to.be.an.eventEmitter;

expect(emitter)
	.to.emit('foo')
	.to.emit('bar', {count: 2})
	.to.emit('baz', {withArgs: ['X', 'Y', 'Z']})
	.to.emit('error', {count: 0})
	.on(() =>
	{
		emitter.emit('foo');
		emitter.emit('bar');
		emitter.emit('bar');
		emitter.emit('baz', 'X', 'Y', 'Z');
	});
```

## API

### `Assertion.eventEmitter`

Validates if the asserted object is an EventEmitter based on it's properties.
(i.e. it must be an object with `on` and `emit` methods, etc.)

See an example in the [usage](#usage) section.

### `Assertion.emit(event[, options])`

Registers an expected event.

- `event: string`
	The name of the event.
- `options.count: number|{min: number?, max: number?}`
	Determines the number of times the event is expected to be emitted.
	Can be a fixed amount or a range.
	[default=1]
- `option.argsMatch: 'deep'|'exact'|'soft'`
	If you pass an array of expected arguments to the `withArgs` option,
	you can use this option to determine how the actual event arguments will be
	compared to the expected values.

	- `'deep'` Makes a deep comparison between the elements of the `withArgs`
		array and the event arguments.
	- `'exact'` Makes reference-equality comparison (`===`) between each element
		of the `withArgs` array and the event arguments.
	- `'soft'` Expects the emitted event to contain the arguments set in the
		`withArgs` array, but ignores extra arguments.
		If the array contains objects, search for the object properties in the
		emitted event arguments but ignores extra properties.

		This is the default comparison method.

	If `withArgs` option is omitted or is not an array, this option is ignored.
- `options.withArgs: any[]|(...any) => boolean`
	Used to validate the event arguments.
	If you pass an array, the plugin will expect the event arguments to match
	the values of the array.
	If you pass a callback function, it will be called with the arguments of the
	event so that you can make complex validations.

### `Assertion.on((EventEmitter) => undefined)`

Call this method with a callback function with the code that emits events.
The callback will be called and it is expected to emit all the events that were
registered with `emit`, otherwise the test fails.

See an example in the [usage](#usage) section.

## Known Issues

- ⚠️ It doesn't handle circular references in the `withArgs`.
	The test might break if your event arguments have circular references.
- ⚠️ It doesn't work with the "not" flag (`.not`).
	You can work around this issue using the `count` option.
	(i.e. assert that an event is emitted `0` times)
- ⚠️ Not tested for asynchrony.

## Disclaimer

Inspired by [fengb/chai-eventemitter](https://github.com/fengb/chai-eventemitter).

## License

MIT
