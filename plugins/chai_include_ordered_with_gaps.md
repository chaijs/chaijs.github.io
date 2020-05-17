---
layout: plugin
permalink: plugins/chai-include-ordered-with-gaps/
pluginName: chai-include-ordered-with-gaps
---

# chai-include-ordered-with-gaps
A Chai plugin to solve [Issue #1506: How can I test for an ordered subset with gaps between the elements?](https://github.com/chaijs/chai/issues/1056).

## Installing
`npm install --save-dev chai-include-ordered-with-gaps`

## Using

```js
const chai = require('chai');
const { expect, should, assert } = chai;

should();
chai.use(require('chai-include-ordered-with-gaps'));

expect([1, 2, 3, 4, 5]).to.include.ordered.members.with.gaps([2, 4, 5]);

[1, 2, 3, 4, 5].should.include.ordered.members.with.gaps([2, 4, 5]);

assert.includeOrderedMembersWithGaps([1, 2, 3, 4, 5], [3, 4, 5]);
```

Works with TypeScript too (inline declarations, no need to install a @types package).
