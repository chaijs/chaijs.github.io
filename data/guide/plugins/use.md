---
  title: Accessing Utilities
  weight: 10
  render-file: false
---

## Accessing Utilties

Chai comes with a number of utilities to assist in the construction of assertions,
but it does not provide these directly on the `chai` export. These can be accessed 
by using the `use` method of the chai export, which accepts a single function as
an argument.

```javascript
chai.use(function (_chai, utils) {
  // ...
});
```

The function which will be used gets passes two parameters to its scope. The first
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
