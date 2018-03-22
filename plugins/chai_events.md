---
layout: plugin
permalink: plugins/chai-events/
pluginName: chai-events
---

# Chai Events

Make assertions about event emitters.

```js
const chai = require("chai");
chai.use(require("chai-events"));
const should = chai.should();
const EventEmitter = require("events");

describe("Event Emitting", function() {
  
  let emitter = null;
  beforeEach(function() {
    emitter = new EventEmitter();
  });
  
  it("should get emitted events", function() {
    let p = emitter.should.emit("get");
    setTimeout(function() {
      emitter.emit("get");
    }, 200);
    return p;
  });
  
  it("should handle non-emitted events", function() {
    emitter.should.not.emit("missing");
  });
  
});
```
