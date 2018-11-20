---
layout: plugin
permalink: plugins/chai-asserttype-extra/
pluginName: chai-asserttype-extra
---


# chai-asserttype

    a chai plugin for type assertions

---

## Installation

```
npm install chai chai-asserttype-extra
```

### install as chai plug-in

```ts
const ChaiPluginAssertType = require('chai-asserttype-extra');
import ChaiPluginAssertType = require('chai-asserttype-extra');
import ChaiPluginAssertType from 'chai-asserttype-extra';
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';
```

---

> choose one of ur fav way

when use `.install` will try make current chai support to new method in typescript, make without use `@ts-ignore`

```ts
const chai = ChaiPluginAssertType.install();
```

```ts
const chai = ChaiPluginAssertType.install(require('chai'));
```

```ts
const chai = require('chai-asserttype-extra').install()
```

```ts
const chai = require('chai');
chai.use(ChaiPluginAssertType);
```

```ts
const chai = require('chai');
chai.use(ChaiPluginAssertType);
```

## Usage

this usage copy from [GaneshSPatil/chai-asserttype](https://github.com/GaneshSPatil/chai-asserttype)

### ChaiPluginAssertType.list()

```ts
console.log(ChaiPluginAssertType.list());
/*
[ 'array',
  'boolean',
  'date',
  'float',
  'function',
  'integer',
  'null',
  'number',
  'object',
  'regexp',
  'string',
  'undefined' ]
*/
```

### Number
Asserts that type of `actual` is Number.

```ts
expect(1).to.be.number();
expect(0).to.be.number();
expect(-1).to.be.number();
expect(63465789908753).to.be.number();
expect(27.11).to.be.number();
```

#### integer

```ts
expect(27).to.be.integer();
```

#### float

```ts
expect(27.11).to.be.float();
```

### String
Asserts that type of `actual` is String.

```ts
expect('').to.be.string();
expect('foobar').to.be.string();
```

### Boolean
Asserts that type of `actual` is Boolean.

```ts
expect(true).to.be.boolean();
expect(false).to.be.boolean();
```

### Object
Asserts that type of `actual` is Object.

```ts
expect({}).to.be.object();
```

### Array
Asserts that type of `actual` is Array.

```ts
expect([]).to.be.array();
expect([1, 2, 3]).to.be.array();
```

### Date
Asserts that type of `actual` is date.

```ts
expect(new Date()).to.be.date();
```

### Function
Asserts that type of `actual` is Function.

```ts
expect(() => true).to.be.function();
```
