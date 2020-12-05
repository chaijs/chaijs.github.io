---
layout: plugin
permalink: plugins/api-contract-validator/
pluginName: api-contract-validator
---

[![npm](https://img.shields.io/npm/v/api-contract-validator.svg)](https://www.npmjs.com/package/api-contract-validator)
[![npm](https://img.shields.io/npm/dm/api-contract-validator)](https://www.npmjs.com/package/api-contract-validator)
[![Build Status](https://travis-ci.com/PayU/api-contract-validator.svg?branch=master)](https://travis-ci.com/PayU/api-contract-validator)
[![Coverage Status](https://coveralls.io/repos/github/PayU/api-contract-validator/badge.svg?branch=master)](https://coveralls.io/github/PayU/api-contract-validator?branch=master)
[![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/PayU/api-contract-validator.svg)](https://snyk.io/test/github/PayU/api-contract-validator?targetFile=package.json)
![style](https://img.shields.io/badge/code%20style-airbnb-ff5a5f.svg)
![NPM](https://img.shields.io/npm/l/api-contract-validator.svg)
<!-- [![npm](https://img.shields.io/npm/dm/api-contract-validator.svg)](https://www.npmjs.com/package/api-contract-validator) -->

# api-contract-validator
This plugin for assertion libraries is for validating API response schemas against Swagger/OpenAPI definition. 

Using the plugin is easy. Simply point the plugin to your API definitions file path and add one line to your integration test to validate that your application adheres to its design contract. 

## Highlights 
- Asserts according to API definitions document
- Descriptive assertion failures
- Simple and concise usage
- Coverage report (can be printed to your terminal or exported to a json file)
- Supports response format from `axios`, `superagent`, `supertest`, `request` and `light-my-request` (used by `fastify`)
- Supports OpenAPI 3.0
- Supports multiple definition files
  

## How does it work?
The api-contract-validator transforms your API definition into a json-schema based on the provided API documentation file. Then whenever the `matchApiSchema` assertion is called, it automatically extracts the method, path and status code from the response object returned by the API request that you invoked and validates the response object. Both the response headers and body are validated.

## How to use?
***Installation***
```bash
> npm i --save-dev api-contract-validator
```

### ***Chai.js***
```js
const matchApiSchema = require('api-contract-validator').chaiPlugin;
const path = require('path');
const { expect, use } = require('chai');

// API definitions path
const apiDefinitionsPath = path.join(__dirname, 'myApp.yaml'); 

// add as chai plugin
use(matchApiSchema({ apiDefinitionsPath }));

it('GET /pets/123', async () => {
    const response = await request.get('/pet/123');
    expect(response).to.have.status(200).and.to.matchApiSchema();

    // alternatively pass
    const { statusCode, headers, body } = response
    expect({
        path: '/pet/123',
        method: 'get',
        status: statusCode,
        body: body,
        headers: headers,
    }).to.have.status(200).and.to.matchApiSchema();
})
```

### ***Should.js***
```js
const matchApiSchema = require('api-contract-validator').shouldPlugin;

// API definitions path
const apiDefinitionsPath = path.join(__dirname, 'myApp.yaml');

// add as should plugin
matchApiSchema(should, { apiDefinitionsPath });

it('GET /pets/123', async () => {
    const response = await request.get('/pet/123');
    should(response).have.status(200).and.matchApiSchema();
})
```

### ***Jest***
```js
const matchApiSchema = require('api-contract-validator').jestPlugin;

// API definitions path
const apiDefinitionsPath = path.join(__dirname, 'myApp.yaml');

// add as jest plugin
matchApiSchema({ apiDefinitionsPath });

it('GET /pets/123', async () => {
    const response = await request.get('/pet/123');
    expect(response).toHaveStatus(200);
    expect(response).toMatchApiSchema();
})
```
## ***Multiple api definitions files***
use apiDefinitionsPath option with an array of files paths
```js
const apiDefinitionsPath = [path.join(__dirname, 'myApp.yaml'), path.join(__dirname, 'myApp2.yaml')];
```

## Descriptive assertion failures
```js
AssertionError: expected response to match API schema
+ expected - actual

{
    "body": {
-    "age": -1
+    "age": "should be >= 0"
+    "name": "should have required property"
    }
    "headers": {
-    "x-expires-after": []
-    "x-rate-limit": -5
+    "x-expires-after": "should be string"
+    "x-rate-limit": "should be >= 0"
    }
}
```

## Coverage report
By providing in the plugin options, the flag `reportCoverage:true`, the plugin generates a report of all uncovered API definitions.
```js
use(matchApiSchema({
    apiDefinitionsPath,
    reportCoverage: true
}));
```

```bash
* API definitions coverage report *

Uncovered API definitions found:
*ROUTE*                    | *METHOD*   | *STATUSES* 
/v2/pet                    | POST       | 405        
/v2/pet                    | PUT        | 400,404,405
/v2/pet/findByStatus       | GET        | 200,400    
/v2/pet/findByTags         | GET        | 200,400    
/v2/pet/:petId             | GET        | 400,404    
/v2/pet/:petId             | POST       | 405        
/v2/pet/:petId             | DELETE     | 400,404    
/v2/pet/:petId/uploadImage | POST       | 200         
```

# Exporting the report: 
When providing `exportCoverage: true` a `coverage.json` file will be created in your cwd with following structure: 
```js
use(matchApiSchema({
    apiDefinitionsPath,
    exportCoverage: true
}));
```
coverage.json:
```js
[{"route":"/v2/pet","method":"POST","statuses":"405"},
{"route":"/v2/pet","method":"PUT","statuses":"400,404,405"},
{"route":"/v2/pet/:petId","method":"GET","statuses":"200"},
{"route":"/v2/pet/:petId","method":"POST","statuses":"405"},
{"route":"/v2/pet/:petId","method":"DELETE","statuses":"404"}]
```
## Supported request libraries
- supertest
- axios
- request-promise*
- more to come

*\* When using request-promise `resolveWithFullResponse:true` must be added to the request options, in order to properly extract the request details*

## Supported assertion libraries
- chai.js
- should.js
- jest
- more to come

<!-- The validation function itself is also exposed, allowing this plugin to be assertion-library agnostic. -->
