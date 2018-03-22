---
layout: plugin
permalink: plugins/chai-cron/
pluginName: chai-cron
---

# chai-cron

[![pipeline status](https://gitlab.com/wondermonger/chai-cron/badges/v1.0.15/pipeline.svg)](https://gitlab.com/wondermonger/chai-cron/pipelines/15893056) [![coverage report](https://gitlab.com/wondermonger/chai-cron/badges/v1.0.16/coverage.svg)](https://wondermonger.gitlab.io/-/chai-cron/-/jobs/47040079/artifacts/coverage/index.html)

Cron time expression assertion plugin for the [Chai Assertion Library](http://chaijs.com/).

Powered by [cron-parser](https://github.com/harrisiirak/cron-parser).

## Installation

```shell
yarn add chai-cron
```

**OR**

```shell
npm i chai-cron
```

## Usage

```javascript
const chai = require('chai');
const chaiCron = require('chai-cron');

const { expect } = chai;

chai.use(chaiCron);

expect('0 0 1,15 * *').to.be.cron();
expect('0 0 1,15 * *').to.be.cronTime();
expect('0 0 1,15 * *').to.be.a.cronExpression();
expect('0 0 1,15 * *').to.be.a.cronTimeExpression();
```

## Tests

```shell
yarn test
```

**Linting**

```shell
yarn lint
```

**Unit Tests**

```shell
yarn test:unit
```

**Integration Tests**

```shell
yarn test:integration
```

## License

The MIT License (MIT)

Copyright (c) 2017-2018 Michael J. Bondra <mjbondra@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
