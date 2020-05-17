---
layout: plugin
permalink: plugins/chai-nock/
pluginName: chai-nock
---

# Chai Assertions for Nock

[![Build Status](https://travis-ci.org/chrisandrews7/chai-nock.svg?branch=master)](https://travis-ci.org/chrisandrews7/chai-nock) [![Coverage Status](https://coveralls.io/repos/github/chrisandrews7/chai-nock/badge.svg?branch=master)](https://coveralls.io/github/chrisandrews7/chai-nock?branch=master) [![npm version](https://img.shields.io/npm/v/chai-nock.svg?style=flat)](https://www.npmjs.com/package/chai-nock)

**Nock Chai** extends [Chai](http://chaijs.com/) with a language for asserting facts about [Nock](https://www.npmjs.com/package/nock).

Instead of manually wiring up your expectations to intercepting a nocked request:

```javascript
const nockedRequest = nock('http://some-url');

nockedRequest.on('request', function(req, interceptor, body) {
  expect(body).to.deep.equal({ hello: 'world' });
});
```

you can write code that expresses what you really mean:

```javascript
return expect(nock('http://some-url')).to.have.been.requestedWith({
  hello: 'world'
});
```

## Installation

`npm install chai-nock`

Then add to your test setup:

```javascript
const chai = require('chai');
const chaiNock = require('chai-nock');

chai.use(chaiNock);
```

## Assertions

### requested

Asserts that a request has been made to the nock.

```javascript
it('requested', () => {
  const requestNock = nock('http://bbc.co.uk')
    .get('/')
    .reply(200);

  request({
    uri: 'http://bbc.co.uk',
  });

  return expect(requestNock).to.have.been.requested;
});
```

### requestedWith(body)

Asserts that a request has been made to the nock with a body that exactly matches the object provided.

```javascript
it('requestedWith', () => {
  const requestNock = nock('http://bbc.co.uk')
    .get('/')
    .reply(200);

  request({
    json: true,
    uri: 'http://bbc.co.uk',
    body: {
      hello: 'world'
    }
  });

  return expect(requestNock).to.have.been.requestedWith({ hello: 'world' });
});
```

### requestedWithHeaders(headers)

Asserts that a request has been made to the nock with headers that exactly match the object provided.

```javascript
it('requestedWithHeaders', () => {
  const requestNock = nock('http://bbc.co.uk')
    .get('/')
    .reply(200);

  request({
    json: true,
    uri: 'http://bbc.co.uk',
    headers: {
      myHeader: 'myHeaderValue'
    }
  });

  return expect(requestNock).to.have.been.requestedWithHeaders({
    host: 'bbc.co.uk',
    accept: 'application/json',
    myHeader: 'myHeaderValue'
  });
});
```

### requestedWithHeadersMatch(partialHeaders)

Asserts that a request has been made to the nock with headers that contain the key/value pairs in the object provided.

```javascript
it('requestedWithHeadersMatch', () => {
  const requestNock = nock('http://bbc.co.uk')
    .get('/')
    .reply(200);

  request({
    json: true,
    uri: 'http://bbc.co.uk',
    headers: {
      myHeader: 'myHeaderValue',
      otherHeader: 'otherHeaderValue'
    }
  });

  return expect(requestNock).to.have.been.requestedWithHeadersMatch({
    myHeader: 'myHeaderValue'
  });
});
```

## Setting a Timeout
* By default, a timeout of 2 seconds is applied to assertions on nock requests. This means that if nock has not intercepted the request within the set time, the assertion will be false
* You can set a custom global timeout by calling `setTimeout` on the `chaiNock` object:
```javascript
const chaiNock = require('chai-nock');

chai.use(chaiNock);
// Set a timeout of 10 seconds
chaiNock.setTimeout(10000);
```
* WARNING: If not set already, the test timeout must be greater than that of chaiNock! 
```javascript 
jest.setTimeout(12000);
```


## Usage

```javascript
const { expect } = require('chai');
const nock = require('nock');
const request = require('request-promise-native');

describe('example', () => {
  it('test', () => {
    const requestNock = nock('http://bbc.co.uk')
    .get('/')
    .reply(200);

    request({
      json: true,
      uri: 'http://bbc.co.uk',
      body: {
        hello: 'world'
      }
    });

    return expect(requestNock).to.have.been.requestedWith({ hello: 'world' });
  });
});
```
