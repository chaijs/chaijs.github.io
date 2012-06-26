---
  title: Overwriting Methods
  weight: 70
  render-file: false
---

### Overwriting Methods

Overwriting methods follow the name structure of overwriting properties.
For this example we will be returning to our example of asserting Arthurs
age to be above a minimum thresh-hold.

```javascript
var arthur = new Model('person');
arthur.set('age', 27);
expect(arthur).to.have.age.above(17);
```

We already have our `age` chain in place to flag the assertion with `model.age`
so all we have to do is check if that exists.

```javascript
Assertion.overwriteMethod('above', function (_super) {
  return function assertAge (n) {
    if (utils.flag(this, 'model.age')) {
      var obj = this._obj;

      // first we assert we are actually working with a model
      new Assertion(obj).instanceof(Model);

      // next, make sure we have an age
      new Assertion(obj).to.have.deep.property('_attrs.age').a('number');

      // now we compare
      var age = obj.get('age');
      this.assert(
          age > n
        , "expected #{this} to have an age above #{exp} but got #{act}"
        , "expected #{this} to not have an age above #{exp} but got #{act}"
        , n
        , age
      );
    } else {
      _super.apply(this, arguments);
    }
  };
});
```

<a href="/api/plugins/#overwriteMethod-section" class="clean-button">View overwriteMethod API</a>

This covers both positive an negative scenarios. No need to transfer flags in this
case as `this.assert` handles that automatically. The same pattern can also be used
for `below` and `within`. 
