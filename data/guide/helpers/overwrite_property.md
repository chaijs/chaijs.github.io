---
  title: Overwriting Properties
  weight: 60
  render-file: false
---

### Overwriting Properties

For this example, we are going to overwrite the `ok` property provided
by Chai's core. The default behavior is that `ok` will pass if an object
is truthy. We want to change that behavior so then when `ok` is used
with an instance of a model, it validates that the model is well formed.
In our example, we will consider a model `ok` if it has an `id` attribute.

Let's start out with the basic overwrite utility and a basic assertion. 

```javascript
chai.overwriteProperty('ok', function (_super) {
  return function checkModel () {
    var obj = this._obj;
    if (obj && obj instanceof Model) {
      new Assertion(obj).to.have.deep.property('_attrs.id').a('number');
    } else {
      _super.call(this);
    }
  };
});
```

<a href="/api/plugins/#overwriteProperty-section" class="clean-button">View overwriteProperty API</a>

##### Overwrite Structure

As you can see, the main difference in overwriting is that the first function
passes just one argument of `_super`. This is the function that originally 
existed, and you should be sure to call that if your criteria doesn't match.
Secondly, you will notice that we immediately return a new function that 
will serve as the actual assertion. 

With this in place, we can write positive assertions.

```javascript
var arthur = new Model('person');
arthur.set('id', 42);
expect(arthur).to.be.ok;
expect(true).to.be.ok;
```

The above expectations will pass. When working with a model it will 
run our custom assertion, and when working with non-models it will 
revert to the original behavior. We will, however, run into a bit of 
trouble if we try to negate an `ok` assertion on a model.

```javascript
var arthur = new Model('person');
arthur.set('id', 'dont panic');
expect(arthur).to.not.be.ok;
```

We would expect this expection to pass as well, as our statement is
negated and the id is not a number. Unfortunately, the negation flag
was not passed to our number assertion, so it still expects the value
to be a number. 

##### Transfering Flags

For this we will expand on this assertion by transfering all of the 
flags from the original assertion to our new assertion. The final 
property overwrite would look like this.

```javascript
chai.overwriteProperty('ok', function (_super) {
  return function checkModel () {
    var obj = this._obj;
    if (obj && obj instanceof Model) {
      new Assertion(obj).to.have.deep.property('_attrs.id'); // we always want this
      var assertId = new Assertion(obj._attrs.id);
      utils.transferFlags(this, assertId, false); // false means don't transfer `object` flag
      assertId.is.a('number');
    } else {
      _super.call(this);
    }
  };
});
```

Now, the negation flag is included in your new assertion and we can successfully
handle both positive and negative assertions on the type of id. We left the property
assertion as it was as we always want it to fail if the id is not present.

##### Enhancing Error Messages

Though, we have one more small modification to make. Should our assertion fail
for the wrong type of id attribute, we would get an error message that states 
`expected 'dont panic' to [not] be a number`. Not entirely useful when running a large
test suite, so we will provide it with a bit more information.

```javascript
var assertId = new Assertion(obj._attrs.id, 'model assert ok id type');
```

This will change our error message to be a more informative `model assert ok id type: 
expected 'dont panic' to [not] be a number`. Much more informative! 
