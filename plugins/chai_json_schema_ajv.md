---
layout: plugin
permalink: plugins/chai-json-schema-ajv/
pluginName: chai-json-schema-ajv
---

# chai-json-schema-ajv

[![Build Status](https://travis-ci.org/up9cloud/chai-json-schema-ajv.svg?branch=master)](https://travis-ci.org/up9cloud/chai-json-schema-ajv)
[![Coverage Status](https://coveralls.io/repos/github/up9cloud/chai-json-schema-ajv/badge.svg?branch=master)](https://coveralls.io/github/up9cloud/chai-json-schema-ajv?branch=master)

A chai plugin for validate json schema.

This is based on [ajv](https://github.com/epoberezkin/ajv), a JSON schema Validator.

|version|ajv version|json schema version|
|---|---|---|
|[v1](https://github.com/up9cloud/chai-json-schema-ajv/tree/v1)|4.11.8|[JSON Schema draft 4](http://json-schema.org/)|
|[v2](https://github.com/up9cloud/chai-json-schema-ajv/tree/v2)|5.5.2|[JSON Schema draft-06](https://trac.tools.ietf.org/html/draft-wright-json-schema-validation-01)|
|[v3](https://github.com/up9cloud/chai-json-schema-ajv/tree/v3)|^6.7.0|[JSON Schema draft-07](http://json-schema.org/latest/json-schema-validation.html)|
|v4|Up to you||
|v5|Up to you|Same as v4, but different message format|

## Installation

```sh
npm i ajv --save-dev # Or any version you prefer `npm i ajv@4 --save-dev`
npm i chai-json-schema-ajv --save-dev
```

## Usage

### Validate data (jsonSchema)

```js
const chai = require('chai')
chai.use(require('chai-json-schema-ajv'))
const expect = chai.expect
const assert = chai.assert

const apple = {
  name: 'foo',
  color: ['red', 'green', 'yellow'],
  value: 10
}
const car = {
  name: 'bar',
  speed: 1.1
}
const schema = {
  title: 'fruit schema v0.1',
  type: 'object',
  required: ['name', 'color', 'value'],
  properties: {
    name: {
      type: 'string',
      minLength: 3
    },
    color: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string'
      }
    },
    value: {
      type: 'integer',
      minimum: 5
    }
  }
}

expect(apple).to.be.jsonSchema(schema, 'custom flag')
expect(car).to.not.be.jsonSchema(schema, 'custom flag')

assert.jsonSchema(apple, schema, 'custom flag')
assert.notJsonSchema(car, schema, 'custom flag')
```

### Validate schema (validJsonSchema)

```js
const chai = require('chai')
chai.use(require('chai-json-schema-ajv'))
const expect = chai.expect
const assert = chai.assert

const schema = {
  title: 'valid schema',
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minLength: 3
    }
  }
}

expect(schema, 'custom flag').to.be.validJsonSchema
expect({ type: '__invalid__' }, 'custom flag').to.not.be.validJsonSchema

assert.validJsonSchema(schema, 'custom flag')
assert.notValidJsonSchema({ type: '__invalid__' }, 'custom flag')
```

### Custom options

Options will also pass to [ajv](https://github.com/epoberezkin/ajv#options)

```js
...
const options = { ... }
chai.use(
  require('chai-json-schema-ajv').create(options)
)
...

// Basically, it's same as `new Ajv(options)`
```

#### Option verbose

Default error message is parsed by `ajv.errorsText`.

```js
...
chai.use(
  require('chai-json-schema-ajv')
)
...
```

```console
expected data to match json-schema
data should have required property 'color'
```

If you go with option `{verbose: true}`, it will print full errors.

```js
...
chai.use(
  require('chai-json-schema-ajv').create({
    verbose: true
  })
)
...
```

```console
expected { name: 'bar', speed: 1.1 } to match json-schema
[ { keyword: 'required',
    dataPath: '',
    schemaPath: '#/required',
    params: { missingProperty: 'color' },
    message: 'should have required property \'color\'',
    schema: 
     { name: { type: 'string', minLength: 3 },
       color: 
        { type: 'array',
          minItems: 1,
          uniqueItems: true,
          items: { type: 'string' } },
       value: { type: 'integer', minimum: 5 } },
    parentSchema: 
     { title: 'fruit schema v0.1',
       type: 'object',
       required: [ 'name', 'color', 'value' ],
       properties: 
        { name: { type: 'string', minLength: 3 },
          color: 
           { type: 'array',
             minItems: 1,
             uniqueItems: true,
             items: { type: 'string' } },
          value: { type: 'integer', minimum: 5 } } },
    data: { name: 'bar', speed: 1.1 } } ]
```

#### Option ajv

If you want to reuse ajv instance, you can

```js
const ajv = new Ajv
...
chai.use(
  require('chai-json-schema-ajv').create({
    ajv
  })
)
...

assert.ok(ajv === chai.ajv)
```

### Access ajv instance

```js
...
chai.use(
  require('chai-json-schema-ajv')
)
...

assert.ok(chai.ajv instanceof Ajv)
```

## TODO

- Support browser side
- Move to es2017 async/await
- ~~Add linter~~
- ~~Send option to ajv~~ (thanks @dimac)

## License

MIT
