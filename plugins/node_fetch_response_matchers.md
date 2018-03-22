---
layout: plugin
permalink: plugins/node-fetch-response-matchers/
pluginName: node-fetch-response-matchers
---

# node-fetch-response-matchers

[![Build Status](https://travis-ci.org/kfiron/node-fetch-response-matchers.svg?branch=master)](https://travis-ci.org/kfiron/node-fetch-response-matchers)

Chai plugin with matchers for node-fetch promise response.
It helps the tests to be more declarative.

## TL;DR

- This lib gives you a declarative way to assert fetch response, Also it hides the promises and their callbacks noise:
```javascript
   it('some-test', function(){
     return expect(fetch('http://localhost/')).to.be.successful()
                            .and.to.haveBodyText('foo');

   });
```

- If you are not using this lib it becomes very verbose:
```javascript
   it('some-test', function(done){
      fetch('http://localhost/')
         .then(res => {
            expect(res.status).to.equal(200);
            return res.text();
         }).then(text => {
            expect(text).to.equal('foo');
            done();
         })
   });
```



## Install (for dev only - used by tests)
```shell
$ npm install --save-dev node-fetch-response-matchers
```

## Usage example
```javascript

const nodeFetchMatchers = require('node-fetch-response-matchers');
const fetch = require('node-fetch');
const chai = require('chai');

chai.use(nodeFetchMatchers);

describe('test suite', function(){
    it('http success test', function(){
        return expect(fetch('http://localhost/')).to.be.successful();
    });
    it('and', function(){
          return expect(fetch('http://localhost/')).to.be.successful()
                                                    .and.haveBodyText('foo');
    });
});
```

### Chai native plugin
You can all use chai "not"

```javascript
   it('not', function(){
      return expect(fetch('http://localhost/')).to.not.be.successful();
   });
```



## Status matchers

```javascript
   it('http success test', function(){
      return expect(fetch('http://localhost/')).to.be.successful();
   });
   it('http status assert', function(){
        return expect(fetch('http://localhost/')).to.haveStatus(500);
   });
```

#### Full status matchers list

| API function         | params   | description                      |
| ---------------------|----------| ---------------------------------|
| successful()         | ()       | Assert that the status is 200 OK |
| created()            | ()       | Assert that the status is 201    |
| badRequest()         | ()       | Assert that the status is 400    |
| unauthorized()       | ()       | Assert that the status is 401    |
| rejected()           | ()       | Assert that the status is 403    |
| notFound()           | ()       | Assert that the status is 404    |
| serverError()        | ()       | Assert that the status is 500    |
| serviceUnAvailable() | ()       | Assert that the status is 503    |
| haveStatus()         | (status) | Assert that the status is provided number argument    |



## Body matchers

```javascript
   it('have body object', () => {
     return expect(fetch('http://localhost/').to.haveBodyObject({foo: 'bar'});
   });
```
#### Full body matchers list

| API function         | params             | description                                                  |
| ----------------------|-------------------| -------------------------------------------------------------|
| haveBodyObject()      | (obj)             | Assert equal provided object                                 |
| haveBodyText()        | (text)            | Assert equal provided string text                            |
| haveBodyBuffer()      | (Buffer)          | Assert equal provided Node Buffer                            |
| haveBodyRegexpMatch() | (regexp)          | Assert match body on regular expression                      |
| haveBodyThat()        | (predicate(text)) | Assert match body on provided function predicate on the text |


## Header matchers

```javascript
   it('have header', () => {
     return expect(fetch('http://localhost/').to.haveHeader('connection', 'close');
   });
```
#### Headers matchers list

| API function    | params                  | description                                                                     |
| ----------------|-------------------------| --------------------------------------------------------------------------------|
| haveHeader()    | (name, value)           | Assert that response contains header by provided name and value                 |
| headerExists()  | (name)                  | Assert that response contains header by provided name                           |
| haveHeaderThat()| (name, predicate(value))| Assert that header with given name have true on the value for a given predicate |
| haveHeaders()   | (headersMap)            | Assert that given key-value headers are exists in headers response              |

## Cookie matchers

```javascript
   it('have cookie', () => {
     return expect(fetch('http://localhost/').to.haveCookie('foo', 'bar');
   });
```
#### Cookie matchers list


| API function       | params                     | description                                                               |
| -------------------|----------------------------| --------------------------------------------------------------------------|
| haveCookieByName() | (name)                     | Assert that cookie by name is written to the response                     |
| haveCookie()       | (name, value)              | Assert that cookie by name and value is written to the response           |
| haveCookieThat()   | (name, predicate(cookie))  | Assert that cookie by name and match given predicate on cookie properties |

## Cache control response matchers

```javascript
   it('must-revalidate', () => {
     return expect(fetch('http://localhost/').to.have.cacheControlMustRevalidate();
   });
   it('max-age', () => {
        return expect(fetch('http://localhost/').to.have.cacheControlmMaxAge(120);
   });
```
#### cache control full matchers list


| API function                  | params      |
| ------------------------------|-------------|
| cacheControlMustRevalidate()  | ()          |
| cacheControlNoCache()         | ()          |
| cacheControlNoStore()         | ()          |
| cacheControlNoTransform()     | ()          |
| cacheControlPublic()          | ()          |
| cacheControlPrivate()         | ()          |
| cacheControlProxyMaxRevalidate| ()          |
| cacheControlmMaxAge()         | (age-in-sec)|
| cacheControlSMaxAge()         | (age-in-sec)|


