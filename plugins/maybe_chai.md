---
layout: plugin
permalink: plugins/maybe-chai/
pluginName: maybe-chai
---

[![Build Status](https://travis-ci.org/kwirke/maybe-chai.svg?branch=master)](https://travis-ci.org/kwirke/maybe-chai)
[![Coverage Status](https://coveralls.io/repos/github/kwirke/maybe-chai/badge.svg?branch=master)](https://coveralls.io/github/kwirke/maybe-chai?branch=master)

# maybe-chai
Chai plugin for Maybe monads. Adaptable to any monad library.

## Installation
```
npm install maybe-chai --save-dev
```

```javascript
// Before all the tests (use --require in mocha)
import chai from 'chai'
import maybeChai from 'maybe-chai'

chai.use( maybeChai() )
```

## Adapting it to your Maybe library
Maybe-chai, as a default, works out of the box for `true-myth` library because reasons.
If you want to use another library, you will need to pass it an adapter (we have [pre-cooked adapters](./adapters.md))

You can configure an adapter by passing an object to `maybeChai()` that follows this signature:
```javascript
maybeChai( {
    match: (maybe: Maybe<T>, cases: MatchCases<T, U>) => U,
    isMaybe: (maybe: Maybe<T>) => Boolean,
} )

type MatchCases<T, U> = {
    Just: (value: T) => U,
    Nothing: () => U,
}
```
Types will not be strictly enforced, but you should check your tests work properly.

However, the aim of this library is to provide an adapter for each of the most popular Monad libraries out there.

You can [check the list of adapters here](./adapters.md).


## Usage

### `just`
Asserts that the target is an instance of **Maybe.Just** by using provided `match` function.

```javascript
expect( Maybe.just(5) ).to.be.a.just()      // OK!
expect( Maybe.just(5) ).to.be.just(5)       // OK!
expect( Maybe.nothing() ).to.be.just(5)     // fails
expect( Maybe.nothing() ).to.not.be.just(5) // OK!
expect( 'string' ).to.be.just(5)            // fails
expect( 'string' ).to.not.be.just(5)        // OK!
```

`.just` also deep equals the contents of the monad.

```javascript
expect( Maybe.just({a: 'test'}) ).to.be.just({a: 'test'})
```

Moreover, `.just` changes the target of any assertions that follow in the chain to be the value inside the original Just object.

```javascript
expect( Maybe.just( { status: 200 } ) ).to.be.a.just()
    .and.to.have.property( 'status', 200 ) // OK
```

### `nothing`
Asserts that the target is an instance of **Maybe.Nothing** by using provided `match` function.

```javascript
expect( Maybe.nothing() ).to.be.nothing()   // OK!
expect( Maybe.just(5) ).to.be.nothing()     // fails
expect( Maybe.just(5) ).to.not.be.nothing() // OK!
expect( 'string' ).to.be.nothing()          // fails
expect( 'string' ).to.not.be.nothing()      // OK!
```

## Supported libs
Although the library allows you to provide an adapter to any library,
the aim of the library is to provide a recipe [here](./adapters.md) for each of the
most popular monad libraries in Javascript:

- [x] True Myth
- [x] Sanctuary
- [ ] TSMonad
- [ ] Folktale
- [ ] Monet
- [ ] Funfix
- [ ] Crocks
- [ ] KudoJS
- [ ] Purify

If yours is not here, you are welcome to issue a request, and PRs will be appreciated!
