---
layout: plugin
permalink: plugins/chai-graphql/
pluginName: chai-graphql
---

chai-graphql [![npm version](https://badge.fury.io/js/chai-graphql.svg)](https://badge.fury.io/js/chai-graphql) [![Build Status](https://travis-ci.org/bustle/chai-graphql.svg?branch=master)](https://travis-ci.org/bustle/chai-graphql) [![devDependency Status](https://david-dm.org/bustle/chai-graphql/dev-status.svg)](https://david-dm.org/bustle/chai-graphql#info=devDependencies)
===========

GraphQL response matcher for [Chai](http://chaijs.com/) assertion library

Works with both parsed JSON responses and local object responses.

## Installation
```
npm install --save-dev chai-graphql
```

## API

Methods will "unwrap" the data and/or payload from a response to make testing less repetitive.

- `assert.graphQl(response, [expectedData])` performs a deep equals on the `response.data` or `response.data.payload` and `expectedData` if present. Throws if there are any errors in `response.errors`. Returns `response.data`
- `assert.graphQLSubset(response, [subsetOfExpectedData])` performs a subset match of `response.data` or `response.data.payload` and expectedData if present. Throws if there are any errors in `response.errors`. Returns `response.data`
- `assert.graphQLError(response, [errorMatcher])` throws if there are not any `response.errors`, returns the `response.errors`. `errorMatcher` can be a string, regex or an array of strings or regexes. In the string or regex form the error's message property will be [`match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) by the `errorMatcher`. In the array form, each `errorMatcher` is tested against each error in order. If there a greater or fewer number of matchers than errors an it will throw.

## Usage
In your setup
```js
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
chai.use(chaiGraphQL)
```

in your spec.js
```js
var goodResponse = {
  data: {
    foo: 'bar'
  }
}

// Passes
assert.graphQL(goodResponse, { foo: 'bar' })
assert.graphQLSubset(goodResponse, { foo: 'bar' })
assert.graphQL(goodResponse)
assert.graphQLSubset(goodResponse)
assert.graphQLSubset(goodResponse, { })
assert.notGraphQLError(goodResponse)
expect(goodResponse).to.be.graphQl({ foo: 'bar' })

// Fails
assert.graphQL(goodResponse, { foo: 'FAIL' })
assert.graphQL(goodResponse, { })
assert.graphQLError(goodResponse)
expect(goodResponse).to.be.graphQLError()

const badResponse = {
  errors: [
    {
      message: 'Error message',
      stack: 'Prints if present'
    },
    new GraphQLError('GraphQL Error Object'),
    new Error('Regular Error')
  ]
}

// Passes
assert.graphQLError(badResponse)
expect(badResponse).to.be.graphQLError()

assert.graphQLError(badResponse, 'Error message')
assert.graphQLError(badResponse, /GraphQL Error Object/)
assert.graphQLError(badResponse, [
  'Error message',
  /GraphQL Error Object/
])

// fails
assert.graphQL(badResponse, { foo: 'bar' })
assert.graphQL(badResponse)
assert.notGraphQLError(badResponse)
expect(badResponse).to.be.graphQl({ foo: 'bar' })
assert.graphQLError(badResponse, 'Rando Error')
assert.graphQLError(badResponse, [ 'Error message' ])
```
