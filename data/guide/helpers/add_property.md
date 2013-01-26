---
  title: Adding Properties
  weight: 20
  render-file: false
---

### Adding Properties

In essence, defining a property can be done using `Object.defineProperty`,
but we encourage you to use Chai's utility helpers to ensure a standard
implementation throughout. 

For this example, we want the following test case to pass:

```javascript
var arthur = new Model('person');
expect(arthur).to.be.a.model;
```

For this, we will use be using the `addProperty` utility.

```javascript
utils.addProperty(Assertion, 'model', function () {
  this.assert(
      this._obj instanceof Model
    , 'expected #{this} to be a Model'
    , 'expected #{this} to not be a Model'
  );
});
```

<a href="/api/plugins/#addProperty-section" class="clean-button">View addProperty API</a>

Simple and concise. Chai can take it from here. It is also worth mentioning that
because this extension pattern is used so often, Chai makes it just a bit easier.
The following can be used in place of the first line above:

```javascript
Assertion.addProperty('model', function () { // ...
```

All chain extension utilities are provided both as part of the `utils` object
and directly on the Assertion constructor. For the rest of this document, however,
we will be calling the methods directly from `Assertion`.
