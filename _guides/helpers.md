---
  title: Building a Helper
  order: 40
  headings:
    - Adding Language Chains
    - Adding Properties
    - Adding Methods
    - Methods as Properties
    - Overwriting Language Chains
    - Overwriting Properties
    - Overwriting Methods
---

# Building a Helper

> This tutorial assumes that you are familiar with the plugin [core concepts]({{site.github.url}}/guide/plugins/).
> If you have not yet read that article, it is recommended that you do so before continuing.

Providing chainable helper assertions is the most common use of the plugin utilities
that Chai exposes. Before we get into the basics, we are going to need a topic
for which we will extend Chai's assertions to comprehend. For this, we will be
using a very minimal data model object.

```javascript
/**
 * # Model
 *
 * A constructor for a simple data model
 * object. Has a `type` and contains arbitrary
 * attributes.
 *
 * @param {String} type
 */

function Model (type) {
  this._type = type;
  this._attrs = {};
}

/**
 * .set (key, value)
 *
 * Set an attribute to be stored in this model.
 *
 * @param {String} key
 * @param {Mixted} value
 */

Model.prototype.set = function (key, value) {
  this._attrs[key] = value;
};

/**
 * .get (key)
 *
 * Get an attribute that is stored in this model.
 *
 * @param {String} key
 */

Model.prototype.get = function (key) {
  return this._attrs[key];
};
```

Practically speaking, this could be any data model object returned from an
ORM database in node or constructed from your MVC framework of choice in
the browser.

Hopefully our `Model` class is self explanatory, but as an example,
here we construct a person object.

```javascript
var arthur = new Model('person');
arthur.set('name', 'Arthur Dent');
arthur.set('occupation', 'traveller');
console.log(arthur.get('name')); // Arthur Dent
```

Now that we have our subject, we can move on to the basics of plugins.

## Adding Language Chains

Now we are getting to the fun part! Adding properties and methods
are what Chai's plugin API is really for.


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
utils.addProperty(Assertion.prototype, 'model', function () {
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

### Adding Methods

> Note: Multiple plugins defining the same method name using `addMethod` will conflict, with the last-registered plugin winning. The plugin API is pending a major overhaul in future versions of Chai that will, among other things, deal with this conflict. In the mean time, please prefer using `overwriteMethod`.

Though a property is an elegant solution, it is likely not specific enough for
the helper we are constructing. As our models have types, it would be beneficial
to assert that our model is of a specific type. For this, we need a method.

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

All calls to `assert` are synchronous, so if the first one fails the `AssertionError`
is thrown and the second one will not be reached. It is up to the test runner to interpret
the message and handle display of any failed assertions.

### Methods as Properties

Chai includes a unique utility that allows you to construct a language chain that can function
as either a property or a method. We call these "chainable methods". Despite the fact that we
demonstrated the "is model of model" as both a property and a method, these assertions are NOT
a good use case for chainable methods.

##### When to Use

To understand when to best use chainable methods we will examine a chainable method from Chai's
core.

```javascript
var arr = [ 1, 2, 3 ]
  , obj = { a: 1, b: 2 };

expect(arr).to.contain(2);
expect(obj).to.contain.key('a');
```

For this to work, two seperate functions are needed. One that will be invoked when the
chain is used as either a property or a method, and one that will be invoked when only used
as a method.

In these examples, and with all of the other chainable methods in core, the only function
of `contain` as a property is to set a `contains` flag to true. This indicates to `keys` to
behave differently. In this case, when `key` is used in conjunction with `contain`, it will check
for the inclusion of a key, instead of checking the exact match to all keys.

##### When NOT to Use

Let's say we set up a chainable method for `model` to behave as we indicated above: do an `instanceof`
check if used as a property, and a `_type` check if used as a method. The following conflict would occur...

The following would work...

```javascript
expect(arthur).to.be.a.model;
expect(arthur).to.be.a.model('person');
expect(arr).to.not.be.a.model;
```

But the following would not...

```javascript
expect(arthur).to.not.be.a.model('person');
```

Remember, since the function used as the property assertion is invoked when also used as a method,
and negation impacts ALL assertions after it is set, we would receive an error message resembling
`expected [object Model] not to be instance of [object Model]`. As such, please obey this general
guideline when constructing chainable methods.

> When constructing chainable methods, the property function should only serve to set a flag
> for later modifying the behavior of an existing assertion.

##### An Appropriate Example

For use with our model example, we are going to construct an example that allows us to test Arthur's
age exactly, or chain into Chai's numerical comparators, such as `above`, `below`, and `within`. You will
need to learn how to overwrite methods without destroying core functionality, but we get to that a bit later.

Our goal will allow for all of the following to pass.

```javascript
expect(arthur).to.have.age(27);
expect(arthur).to.have.age.above(17);
expect(arthur).to.not.have.age.below(18);
```

Let's start first by composing the two functions needed for a chainable method. First up is the function
to use when invoking the `age` method.

```javascript
function assertModelAge (n) {
  // make sure we are working with a model
  new Assertion(this._obj).to.be.instanceof(Model);

  // make sure we have an age and its a number
  var age = this._obj.get('age');
  new Assertion(age).to.be.a('number');

  // do our comparison
  this.assert(
      age === n
    , "expected #{this} to have have #{exp} but got #{act}"
    , "expected #{this} to not have age #{act}"
    , n
    , age
  );
}
```

By now, that should be self-explanitory. Now for our property function.

```javascript
function chainModelAge () {
  utils.flag(this, 'model.age', true);
}
```

We will later teach our numerical comparators to look for that flag and change its behavior. Since we don't want to
break the core methods, we will need to safely override that method, but we'll get to that in a minute. Let's
finish up here first...

```javascript
Assertion.addChainableMethod('age', assertModelAge, chainModelAge);
```

<a href="/api/plugins/#addChainableMethod-section" class="clean-button">View addChainableMethod API</a>

Done. Now we can assert Arthur's exact age. We will pick up again with this example when learning how to overwrite methods.

## Overwriting Language Chains

Now that we can successfully add assertions to the language chain,
we should work on being able to safely overwrite existing assertions,
such as those from Chai's core or other plugins.

Chai provides a number of utilities that allow you to overwrite
existing behavior of an already existing assertion, but revert to
the already defined assertion behavior if the subject of the assertion
does not meet your criteria.

Let's start with a simple example of overwriting a property.

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

### Overwriting Methods

Overwriting methods follow the same structure of overwriting properties.
For this example we will be returning to our example of asserting Arthur's
age to be above a minimum threshold.

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

This covers both positive and negative scenarios. No need to transfer flags in this
case as `this.assert` handles that automatically. The same pattern can also be used
for `below` and `within`.
