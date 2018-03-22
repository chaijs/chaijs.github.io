---
layout: plugin
permalink: plugins/js.spec-chai/
pluginName: js.spec-chai
---

# js.spec-chai

Chai plugin for js.spec

* It used to be named `js-spec-chai`, see [#2](https://github.com/arichiardi/js.spec-chai/issues/2) *

### Usage

The only addition to `Chai.Assertion` is the `conform` method which accepts the `Spec` object to test against.

Examples can be found in the `test` folder, but the gist of it is shown below:

```typescript
import * as s from "js.spec"
import * as chai from "chai";
import jsSpecChai from "../src/index";
// fancy chai dancing
chai.use(jsSpecChai);
chai.should();

describe("Spec tests", () => {

  context("with nested maps", () => {
    const school = s.spec.map("schoolSpec", {
      city: s.string
    });
    const friend = s.spec.map("friendSpec", {
      name: s.spec.string,
      age: s.spec.number,
      school
    });

    it("conforms a good object", () => {
      const obj = {
        name: "andrea",
        age: 18,
        school: {
          city: "Turin",
        }
      };
      obj.should.conform(friend);
    })

    it("does not conform is there is a missing key", () => {
      const obj = {
        name: "andrea",
        school: {
          city: "Turin",
        }
      };
      obj.should.not.conform(friend);
    });
  });
});
```

#### License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>


