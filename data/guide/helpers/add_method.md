---
  title: Adding Methods
  weight: 30
  render-file: false
---

### Adding Methods

Though a property is an elegant solution, it is likely not specific enough for 
the helper we are constructing. As our models have types, it would be beneficial
to assert our model is of specific type. For this, we need a method.

```javascript
// goal
expect(arthur).to.be.a.model('person');

// language chain method
Assertion.addMethod('model', function (type) {
  var obj = this._obj;

  // first, our instanceof check, shortcut
  new Assertion(this._obj).to.be.instanceof(Model);

  // second, our type check
  this.assert(
      obj._type === type
    , "expected #{this} to be of type #{exp} but got #{act}"
    , "expected #{this} to not be of type #{act}"
    , type        // expected
    , obj._type   // actual
  );
});
```

<a href="/api/plugins/#addMethod-section" class="clean-button">View addMethod API</a>

All calls to `assert` are syncronous, so if the first one fails the `AssertionError`
is thrown and second one will not be reached. It is up to the test runner to interpret
the message and handle display of any failed assertions.
