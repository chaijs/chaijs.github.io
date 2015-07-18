---
  title: Composing an Assertion
  weight: 30
  render-file: false
---

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
