---
layout: plugin
permalink: plugins/chai-kekka/
pluginName: chai-kekka
---

# Chai-Kekka

A Chai plugin for [Kekka](https://github.com/apemb/kekka)

## Installation and Usage

Node: `npm install --save-dev chai-kekka` to get up and running.
```js
const chai = require("chai")
const chaiKekka = require("chai-kekka")
 
chai.use(chaiKekka)
```

## Documentation

### Test value is a Type Result 
The `result` property can be used to check that the tested value is an instance of the `Result` class. 
```js
expect(Success('Some String')).to.be.a.result
expect(Failure(new Error('Failure...'))).to.be.a.result
```

### Test value is a Result Success

The `success` property can be used to check that the tested value is an instance of the `Result` class of type `Success`.

```js
// Positive
expect(Success('Success String')).to.be.a.success // OK
expect(Failure(new Error('Failure...'))).to.be.a.success // FAIL
expect('Not a result').to.be.a.success // FAIL

// Negative
expect(Success('Success String')).not.to.be.a.success // FAIL
expect(Failure(new Error('Failure...'))).not.to.be.a.success // OK
expect('Not a result').not.to.be.a.success // FAIL with 'expected 'Not a result' to be an instance of Result'
```


### Test value is a Result Failure

The `failure` property can be used to check that the tested value is an instance of the `Result` class of type `Failure`.

```js
// Positive
expect(Success('Success String')).to.be.a.failure // FAIL
expect(Failure(new Error('Failure...'))).to.be.a.failure // OK
expect('Not a result').to.be.a.failure // FAIL

// Negative
expect(Success('Success String')).not.to.be.a.failure // OK
expect(Failure(new Error('Failure...'))).not.to.be.a.failure // FAIL
expect('Not a result').not.to.be.a.failure // FAIL with 'expected 'Not a result' to be an instance of Result'
```

### Test associated value of a Result Object

There are two ways to test the associated value of a Result object:
 - the methods `successWrapping` and `failureWrapping`
 - the property `associatedValue`

#### `successWrapping` and `failureWrapping`
```js
const error = new Error('Failure message')
expect(Failure(error)).to.be.a.failureWrapping(error) // OK
expect(Failure(error)).to.be.a.successWrapping(error) // FAIL - not a Success
expect(Failure(error)).to.be.a.failureWrapping('some other value') // FAIL

expect(Success('Success String')).to.be.a.successWrapping('Success String') // OK
expect(Success('Success String')).to.be.a.failureWrapping('Success String') // Fail - not a Failure

// equality modifiers can be used, such as deep, on successWrapping and failureWrapping
expect(Success({ a: '423' })).to.be.a.deep.successWrapping({ a: '423' }) 
```

#### `associatedValue`

The `associatedValue` property can be used after a `result`, `success` or `failure` property.
It changes the target of any assertions that follow in the chain to be on the result associated value.

```js
expect(Success('Success String')).to.be.a.success
  .with.associatedValue.that.equals('Success String') // OK
expect(Success({ a: '423' })).to.be.a.success
  .with.associatedValue.that.deep.equals({ a: '423' }) // OK - equality modifiers accepted
expect(Success({ a: '423' })).to.be.a.failure
  .with.associatedValue.that.deep.equals({ a: '423' }) // FAIL - not a failure
expect(Success({ a: '423' })).to.be.a.result
  .with.associatedValue.that.deep.equals({ a: '423' }) // OK
expect(Success('Success String')).to.have.associatedValue.that.equals('Success String') // FAILS 
// associatedValue must be after either a result, success or failure assertion property
```

