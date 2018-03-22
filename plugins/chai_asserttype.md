---
layout: plugin
permalink: plugins/chai-asserttype/
pluginName: chai-asserttype
---

# chai-asserttype
a simple chai plugin for js type assertions

---

## Installation
```
npm install chai-asserttype
```

---

## Usage

### plug-in

```
const chai = require('chai');
const asserttype = require('chai-asserttype');
chai.use(asserttype);
```

### Number
Asserts that type of `actual` is Number.

```
expect(1).to.be.number();
expect(0).to.be.number();
expect(-1).to.be.number();
expect(63465789908753).to.be.number();
expect(27.11).to.be.number();
```

### String
Asserts that type of `actual` is String.

```
expect('').to.be.string();
expect('foobar').to.be.string();
```

### Boolean
Asserts that type of `actual` is Boolean.

```
expect(true).to.be.boolean();
expect(false).to.be.boolean();
```

### Object
Asserts that type of `actual` is Object.

```
expect({}).to.be.object();
```

### Array
Asserts that type of `actual` is Array.

```
expect([]).to.be.array();
expect([1, 2, 3]).to.be.array();
```

### Date
Asserts that type of `actual` is date.

```
expect(new Date()).to.be.date();
```

### Function
Asserts that type of `actual` is Function.

```
expect(() => true).to.be.function();
```
