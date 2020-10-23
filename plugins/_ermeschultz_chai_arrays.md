---
layout: plugin
permalink: plugins/@ermeschultz/chai-arrays/
pluginName: @ermeschultz/chai-arrays
---

# chai-arrays  ![Continuous Integration](https://github.com/GaneshSPatil/chai-arrays/workflows/Continuous%20Integration/badge.svg)
a simple chai plugin for better array assertions

---

## Installation
```
npm install chai-arrays
```

---

## Usage

### plug-in

```
const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
```

### array

Asserts that the type of `actual` is `Array`.

```
expect([1, 2, 3]).to.be.array();
expect('foobar').not.to.be.array();

expect(new Uint8Array([1])).to.be.Uint8Array();
expect(new Uint16Array([1])).to.be.Uint16Array();
expect(new Uint32Array([1])).to.be.Uint32Array();
expect(new Uint8ClampedArray([1])).to.be.Uint8ClampedArray();
```

### ofSize

Asserts that the size of `actual` is equal to `expected`.

```
expect([1, 2, 3]).to.be.ofSize(3);
expect([1, 2, 3]).not.to.be.ofSize(5);
```

### equalTo

Asserts that the `actual` is equal to `expected`.

```
expect([1, 2, 3]).to.be.equalTo([1, 2, 3]);
expect([1, 2, 3]).not.to.be.equalTo([1, 2, 5]);
```

### containing

Asserts that the `actual` is containing the `expected` element.

```
expect([1, 2, 3]).to.be.containing(1);
expect([1, 2, 3]).not.to.be.containing(5);
```

### containingAllOf

Asserts that the `actual` is containing all of the `expected` elements.

```
expect([1, 2, 3]).to.be.containingAllOf([1]);
expect([1, 2, 3]).to.be.containingAllOf([1, 3]);
expect([1, 2, 3]).to.be.containingAllOf([1, 2, 3]);
```

### containingAnyOf

Asserts that the `actual` is containing any of the `expected` elements.

```
expect([1, 2, 3]).to.be.containingAnyOf([1]);
expect([1, 2, 3]).to.be.containingAnyOf([6, 7, 3, 5]);
expect([1, 2, 3]).to.be.containingAnyOf([1, 2, 3]);
```

### sorted

Asserts that the `actual` array is sorted.

```
expect([1, 2, 3]).to.be.sorted();
expect([1, 2, 4, 3]).not.to.be.sorted();

expect([3, 2, 1]).to.be.sorted((prev, next) => prev < next); // sorting based on the provided function
```

## License

```plain
Copyright 2020 @ GaneshSPatil

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
