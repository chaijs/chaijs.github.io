---
  title: Assertion Styles
  layout: guide
  bodyClass: guide
  weight: 0
  order: 20
  headings:
    - Assert
    - Expect
    - Should
    - Differences
    - Should Extras
    - Configuration
---

# Assertion Styles

This section of the guide introduces you to the three different assertion styles that you may use in your testing environment. Once you have made your selection, it is recommended that you look at the API Documentation for your selected style.


## Assert

<a href="{{site.github.url}}/api/assert" class="clean-button">View full Assert API</a>

The assert style is exposed through `assert` interface. This provides
the classic assert-dot notation, similar to that packaged with
node.js. This assert module, however, provides several additional
tests and is browser compatible.

```js
var assert = require('chai').assert
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

assert.typeOf(foo, 'string'); // without optional message
assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
```

In all cases, the assert style allows you to include an optional message as the
last parameter in the `assert` statement. These will be included in the
error messages should your assertion not pass.


## BDD

<a href="{{site.github.url}}/api/bdd" class="clean-button">View full BDD API</a>

The BDD style comes in two flavors: `expect` and `should`. Both use the same
chainable language to construct assertions, but they differ in the way an
assertion is initially constructed. In the case of `should`, there are also
some caveats and additional tools to overcome the caveats.

### Expect

The BDD style is exposed through `expect` or `should` interfaces. In both
scenarios, you chain together natural language assertions.

```js
var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);
```

Expect also allows you to include arbitrary messages to prepend to any failed
assertions that might occur.

```js
var answer = 43;

// AssertionError: expected 43 to equal 42.
expect(answer).to.equal(42);

// AssertionError: topic [answer]: expected 43 to equal 42.
expect(answer, 'topic [answer]').to.equal(42);
```

This comes in handy when being used with non-descript topics such as
booleans or numbers.


### Should

The `should` style allows for the same chainable assertions as the
`expect` interface, however it extends each object with a `should`
property to start your chain. This style has some issues when used with Internet
Explorer, so be aware of browser compatibility.

```js
var should = require('chai').should() //actually call the function
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
beverages.should.have.property('tea').with.lengthOf(3);
```

### Differences

First of all, notice that the `expect` require is just a reference to the
`expect` function, whereas with the `should` require, the function is
being executed.

```js
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
```

The `expect` interface provides a function as a starting point for chaining
your language assertions. It works on node.js and in all browsers.

The `should` interface extends `Object.prototype` to provide a single getter as
the starting point for your language assertions. It works on node.js and in
all modern browsers except Internet Explorer.


### Should Extras

Given that `should` works by extending `Object.prototype`, there are
some scenarios where `should` will not work. Mainly, if you are trying
to check the existence of an object. Take the following pseudocode:

```js
db.get(1234, function (err, doc) {
  // we expect error to not exist
  // we expect doc to exist and be an object
});
```

Given that `err` should be null or undefined, `err.should.not.exist` is
not a valid statement as `undefined` and `null` haven't been extended
with a `should` chain starter. As such, the appropriate few assertions
for this scenario are as follows:

```js
var should = require('chai').should();
db.get(1234, function (err, doc) {
  should.not.exist(err);
  should.exist(doc);
  doc.should.be.an('object');
});
```

Provided you assigned `should` to a var, you have access to several
quick helpers to keep you out of trouble when using `should`.

- `should.exist`
- `should.not.exist`
- `should.equal`
- `should.not.equal`
- `should.Throw`
- `should.not.Throw`

### Using Should in ES2015

It isn't possible to chain a function call from an ES2015 `import`
statement – it has to go on its own line, which looks a little
verbose:

```js
import chai from 'chai';
chai.should();
```

For a cleaner look, you can do this instead:

```js
import 'chai/register-should';
```

## Configuration

### config.includeStack

- **@param** _{Boolean}_
- **@default** `false`

User configurable property, influences whether stack trace is included in
Assertion error message. Default of `false` suppresses stack trace in the error
message.

```javascript
chai.config.includeStack = true; // turn on stack trace
```

### config.showDiff

- **@param** _{Boolean}_
- **@default** `true`

User configurable property, influences whether or not the `showDiff` flag
should be included in the thrown AssertionErrors. `false` will always be `false`;
`true` will be true when the assertion has requested a diff be shown.

```javascript
chai.config.showDiff = false; // turn off reporter diff display
```

### config.truncateThreshold

- **@param** _{Number}_
- **@default** `40`

User configurable property, sets length threshold for actual and expected values
in assertion errors. If this threshold is exceeded, the value is truncated.

Set it to zero if you want to disable truncating altogether.

```javascript
chai.config.truncateThreshold = 0; // disable truncating
```
