---
  title: Methods as Properties
  weight: 40
  render-file: false
---

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
chain is used as a either a property or a method, and one that will be invoked when only used
as a method. 

In these example, and with all of the other chainable methods in core, the only function of 
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
age exactly, or chain into Chai's numerical compartors, such as `above`, `below`, and `within`. You will
need learn how to overwrite methods without distroying core functionality, but we get to that a bit later.

Our goal will allow for all of the following to pass.

```javascript
expect(arthur).to.have.age(27);
expect(arthur).to.have.age.above(17);
expect(arthur).to.not.have.age.below(18);
```

Let's start first by composing the two function needed for a chainable method. First up is the function
to use when using invoking the `age` method.

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

We will later teach our numerical comparitors to look for that flag and change its behavior. Since we don't want to
break the core methods, we will need to safely override that method, but we'll get to that in a minute. Let's
finish up here first...

```javascript
Assertion.addChainableMethod('age', assertModelAge, chainModelAge);
```

<a href="/api/plugins/#addChainableMethod-section" class="clean-button">View addChainableMethod API</a>

Done. Now we can assert Arthur's exact age. We will pick up again with this example when learning how to overwrite methods.
