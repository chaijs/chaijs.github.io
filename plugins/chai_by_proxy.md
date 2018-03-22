---
layout: plugin
permalink: plugins/chai-by-proxy/
pluginName: chai-by-proxy
---

# chai-by-proxy

## Getting started

```bash
$ npm install --save-dev chai-by-proxy
```

### node < 6

```bash
$ npm install --save-dev harmony-reflect

$ echo "--harmony_proxies"         >> test/mocha.opts
$ echo "--require harmony-reflect" >> test/mocha.opts
```

### node 0.10

```bash
$ echo "--harmony_collections" >> test/mocha.opts
```

## Usage

```javascript
var chai = require('chai')
chai.use(require('chai-by-proxy'))
```

### `have/has` (starts a chain)

```javascript
obj = { foo: { bar: 'baz' } })

obj.should.have.foo.bar.eq('baz')
// same as
obj.should.have.property('foo').property('bar').eq('baz')
```

### `chai`'s properties are prior to your object's

```javascript
obj = { a: { property: '' } }
// you can't do
obj.should.have.a.property
// instead, fallback to old style
obj.should.have.deep.property('a.property')
```

### `and` (goes back to the last have/has)

```javascript
obj = { foo: { bar: '' },
        baz: { qux: 11 } }

obj.should.have.foo.bar.with.a('string')
           .and.baz.qux.eq(11)
```

### `without` (negates)

```javascript
obj = { foo: {} }

obj.should.have.foo.without.bar
```

### `=` (equals)

```javascript
obj = { foo: { bar: 'baz' } }

obj.should.have.foo.bar= 'baz'
```

### `not=` (not.equals)

```javascript
obj = { foo: { bar: 'baz' } }

obj.should.have.foo.bar.not= 'qux'
```

### long live the chain

```coffeescript
response =
  status: 200
  body:
    data:
      count: 1
      items: [
        { name: 'party pooper' }
      ]

response.should.have.status.which.eq(200)
                .and.body.without.error
                .and.body.data.has.count.above(0)
                              .and.items[0].name= 'party pooper'
```

