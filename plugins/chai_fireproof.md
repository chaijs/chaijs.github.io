---
layout: plugin
permalink: plugins/chai-fireproof/
pluginName: chai-fireproof
---

chai-fireproof
==============

[![Build Status](https://travis-ci.org/casetext/chai-fireproof.svg?branch=master)](https://travis-ci.org/casetext/chai-fireproof)

Chai assertions and helpers for Firebase and Fireproof.

## Requirements
You need to be able to generate [Fireproof](https://github.com/casetext/fireproof) references.

## Usage

### Object assertions

First load the plugin like any other Chai plugin:
gulp.task('test:setup', 'Set up tests.', ['build'], function() {


  var Firebase = require('firebase'),
    chai = require('chai');

  require('./dist/chai-fireproof');
  global.chai = chai;
  global.expect = chai.expect;

  if (!process.env.FIREBASE_TEST_URL || !process.env.FIREBASE_TEST_SECRET) {

    gutil.log('Please set FIREBASE_TEST_URL and FIREBASE_TEST_SECRET.');
    process.exit(1);

  }

  global.root = new Fireproof(new Firebase(process.env.FIREBASE_TEST_URL));
  global.authToken = process.env.FIREBASE_TEST_SECRET;

});


```javascript
chai.use(require('chai-fireproof'));
```

Now you can create assertions on Fireproof objects like anything else.
Note that these return promises that you'll have to pass back to your test framework
or handle yourself.

An example with Mocha:
```javascript
describe('My Firebase', function() {
  
  var root = new Fireproof(new Firebase('https://metropolis.firebaseio.com'));

  it('should have some data in there already', function() {
    return expect(root.child('robots')).to.exist;
  });

  it('should have some users in there', function() {

    return expect(root.child('citizens')).to.deep.equal({
      fred: {
        name: 'Freder Frederson',
        hometown: 'Metropolis',
        assignment: 'Utopia'
      },
      maria: {
        name: 'Maria',
        hometown: 'Metropolis',
        assignment: 'Underworld'
      }
    });

  });

  it('should have the water level in there', function() {
    return expect(root.child('waterLevel')).to.be.lessThan(5);
  })

});
```

### Security testing

chai-fireproof includes test assertions for validating that security rules work
the way they're supposed to. Note that these assertions return promises that
you'll have to pass back to your test framework or handle yourself.

Security testing has the following additional requirements:
- firebaseio-demo.com is unsupported, as Firebase doesn't check rules there.
- Call ```chai.setFirebaseAuthToken()``` with an auth token before you make any assertions.

There are four new flags and one new method on assertions:
- ```can```
- ```cannot```
- ```read```
- ```write```
- ```ref()```

So you can write assertions that match the following syntax: 

```javascript
return expect({ uid: 'metropolis:maria' }).can.read.ref(root.child('users/maria'));
```

```javascript
return expect({ uid: 'metropolis:robotmaria'}).cannot.read.ref(root.child('users/maria'));
```

The _expectation object_ (that's to say, the thing wrapped in the assertion) is a
Javascript object with authentication credentials. For _write_ tests, you can supply
an object to attempt to write to the ref (for testing validation rules et al.):

```javascript
return expect({ uid: 'metropolis:robotmaria'}).cannot.write(true)
.to.ref(root.child('city/agitation'));
```

The following rules apply:
- If the expectation object is ```null```, the assertion assumes you mean an unauthenticated user.
- Every user object except ```null``` must supply a value for ```uid```.
- To make a token an admin token, set ```admin: true```. Note that this definitionally will cause
any test to pass.


## Documentation
There's API documentation [here.](https://github.com/casetext/chai-fireproof/blob/master/api.md)

## Warning

In order to capture annoying Firebase console messages, this library monkeypatches
```console.log()```, ```console.warn()```, and ```console.error()```. Your
mileage may vary, void where prohibited by law.
