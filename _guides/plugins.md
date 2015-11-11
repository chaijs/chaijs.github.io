---
  title: Core Plugin Concepts
  order: 30
  headings:
    - Accessing Utilities
    - Using Flags
    - Composing an Assertion
---

# Core Plugin Concepts

Plugins are for more than just writing vendor integrations. As a tester, one can write
a plugin to validate input data, assert schema validation on an object, or ensure proper behavior
on a DOM element. The API is flexible enough that any synchronous tasks can easily be encapsulated
within a single assertion and reused throughout your tests.

This tutorial will show you how to access Chai's plugin API, use flags to transfer data through
the language chain, and write your first assertion (and thorough error messages). Once you have
finished here, [Building a Helper](/guide/helpers) will show you how to compose properties and
methods for use on the Chai language chain.

## Accessing Utilities

Chai comes with a number of utilities to assist in the construction of assertions,
but it does not provide these directly on the `chai` export. These can be accessed
by using the `use` method of the chai export, which accepts a single function as
an argument.

```javascript
chai.use(function (_chai, utils) {
  // ...
});
```

The function which will be used gets passed two parameters to its scope. The first
is the `chai` export, the second is an object containing a number of utility
methods (we'll get to those in a minute).

The `chai` export is included so that you can build helpers that can be used
in multiple test files, or package your helpers as a plugin to share with the
community. A more appropriate pattern for creating helpers is as follows...

For our helper file: `test/helpers/model.js`

```javascript
module.exports = function (chai, utils) {
  var Assertion = chai.Assertion;

  // your helpers here
};
```

And, for our actual test: `test/person.js`

```javascript
var chai = require('chai')
  , chaiModel = require('./helpers/model')
  , expect = chai.expect;

chai.use(chaiModel);
```

For the rest of this document, we will assume this structure...

- helper in external file
- `chai.Assertion` assigned to the `Assertion` variable
- all of our helpers will be inside exported function, located where indicated

The `Assertion` variable is now a constructor for an assertion chain;
`new Assertion(obj)` is now equivalent to `expect(obj)`.

## Using Flags

The upper-most core concept of how assertions work internally is the concept of flags.
Each assertion has a set of mostly arbitrary flags - key:value pairs - associated with it.
Chai uses a small number of these internally, but the store is also available for developers
to expand on.

### flag usage

The flag utility is exposed as `utils.flag` from within our `use` function. It can function
as either a getter or a setter, depending on the number of arguments passed to it.

```javascript
var myAssert = new Assertion(obj);
utils.flag(myAssert, 'owner', 'me'); // sets key `owner` to `me`
var owner = utils.flag(myAssert, 'owner'); // get key `owner', returns value
```

### object flag

The most important of Chai's reserved flags is the `object` flag. This is the subject
of an assertion.

```javascript
var myAssert = new Assertion('Arthur Dent');
var obj = flag(myAssert, 'object'); // obj === 'Arthur Dent';
```

This flag is so often used that a shortcut was provided as the `_obj` property of a
constructed assertion.

```javascript
var obj = myAssert._obj; // obj === `Arthur Dent`
```

The following flags are used by Chai's core assertions. Side effects may occur should you
interfere with these.

- `object`: (see above)
- `ssfi`: start stack function - used to prevent callback stacks from being shown in
errors.
- `message`: additional information to include with an error when using `assert` interface.
- `negate`: set when `.not` is included in the chain.
- `deep`: set when `.deep` is included in the chain. used by `equal` and `property`
- `contains`: set when `include` or `contain` is used as a property.
changes the behavior of `keys`.
- `lengthOf`: set when `length` is used as a property. changes the behavior of
`above`, `below`, and `within`.

## Composing an Assertion

Before we begin adding methods and properties to the language chain, we should
first examine how to invoke an assertion, and the expected behavior should it fail.

For this, each constructed `Assertion` has a method called simply `assert`. It accepts
many parameters and its behavior can change depending on whether an assertion was
negated or not.

### Basic Assertion

To begin, we will construct Arthur again, then we can assert that he is who he says he is.

```javascript
var arthur = new Assertion('Arthur Dent');

arthur.assert(
    arthur._obj === 'Arthur Dent'
  , "expected #{this} to be 'Arthur Dent'"
  , "expected #{this} to not be 'Arthur Dent'"
);
```

Chai will check the first argument; if it is `true` then the assertion passed, but if it is `false`
the assertion failed and the first error message will be thrown as part of a `chai.AssertionError`.
Conversely, if the language chain was negated, it will consider `false` a pass and `true` a failure.
The second error message will be included in the thrown error instead.

In all, the `assert` method accepts six arguments:

1. a boolean (result of a truth test)
2. a string error message to be used if the first argument is `false`
3. a string error message to be used if the assertion is negated and the first argument is `true`
4. (optional) the expected value
5. (optional) the actual value, which will default to `_obj`
6. (optional) a boolean which indicates whether to display a diff in addition to the message if the first argument is `false`


### Composing Error Messages

As you can see from the above example, Chai can accept template tags to dynamically compose
the error message. When used, these template tags will be replaced with a stringified replacement
of the object in question. There are three template tags available.

- `#{this}`: the `_obj` of the assertion
- `#{exp}`: the expected value, if it was provided in `assert`
- `#{act}`: the actual value, defaults to `_obj` but can be overwritten by value provided in `assert`
