---
  title: Adding Properties
  weight: 20
  render-file: false
---

### Adding Properties

In essense, defining a property can be done using `Object.defineProperty`,
but we encourage you to use Chai's utility helpers to ensure a standard
implmentation throughout. 

For this example, we will want to following test case to pass...

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

Simple and concise. Chai can take it from here. Though, before we get further
it is worth mentioning that because we this extension pattern is used so often, 
Chai makes it just a bit easier. The following can be used as the first line...

```javascript
Assertion.addProperty('model', function () { // ...
```

As will all of the chain extension utilities, they are provided as part of the `utils`
object or directly on Assertion constructor. Should you find yourself composing
your own interface, that might come in handy. For the rest of this document however
we will be using the methods from directly off `Assertion`.
