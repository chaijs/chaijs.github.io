---
  title: Using Flags
  weight: 20
  render-file: false
---

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
