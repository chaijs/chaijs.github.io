---
layout: plugin
permalink: plugins/chai-each/
pluginName: chai-each
---

# Chai Each
A [Chai](http://chaijs.com/) plugin that allows for assertions on each item in an array

Chai Each was inspired by [Chai Things](http://github.com/chaijs/chai-things)

## Examples

```javascript
// Each item has a "value" property that is below 20
[{"value": 4}, {"value": 11}, {"value": 15}].should.each.have.property('value').that.is.below(20)
```

## Installation
```bash
$ yarn add chai-each
```

## Usage
```javascript
import { use } from "chai";
import * as chaiEach from "chai-each";
use(chaiEach);
```

