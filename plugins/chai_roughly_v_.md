---
layout: plugin
permalink: plugins/chai-roughly-v2/
pluginName: chai-roughly-v2
---

chai-roughly
==============================================================================

![CI Build](https://github.com/micdah/chai-roughly/actions/workflows/ci.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/chai-roughly-v2.svg)](https://www.npmjs.com/package/chai-roughly-v2)

Deep equal assertions with tolerance for [chai](https://www.npmjs.com/package/chai).

### Why a v2?

This is a forked version from [Turbo87/chai-roughly](https://github.com/Turbo87/chai-roughly), which have been updated
to use the latest version of [chaijs/deep-eql](https://github.com/chaijs/deep-eql), rather than using a modified forked
version.

## Installation

```shell
npm install --save-dev chai-roughly-v2
```

## Usage

After importing `chai`, add the following code to use `chai-roughly-v2` assertions:

```js
const chai = require('chai');

chai.use(require('chai-roughly-v2'));
```

Now you can use the `expect(...).to.roughly.deep.equal(...)` chain for deep
equals assertions with tolerance for numbers. The default tolerance is `1e-6`
and can be overwritten by using e.g.
`expect(...).to.roughly(0.001).deep.equal(...)`.

```js
const { expect } = chai;

it('works', () => {
  const result = { value: 41.9999999 };
  expect(result).to.roughly.deep.equal({ value: 42 });
});
```

## License

chai-roughly is licensed under the [MIT License](LICENSE).
