---
layout: plugin
permalink: plugins/chai-ip/
pluginName: chai-ip
---

# chai-ip

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> ip address testing with Chai assertions.

## Features

- esm module only, support node >= 16 and modern browsers
- chai `expect` and `should` interfaces

## Install

```
$ npm install chai-ip
```

## Plugin

```js
import { use } from 'chai';
import ip from 'chai-ip';

use(ip);
```

## Assertions

### .ip


Assert that a string represents valid ip address.

```js
expect('127.0.0.1').to.be.an.ip;
expect('2001:0db8:85a3:0000:0000:8a2e:0370:7334').to.be.an.ip;
```

### .ipv4


Assert that a string represents valid ipv4 address.

```js
expect('127.0.0.1').to.be.an.ipv4;
expect('2001:0db8:85a3:0000:0000:8a2e:0370:7334').to.not.be.an.ipv4;
```

### .ipv6


Assert that a string represents valid ipv6 address.

```js
expect('127.0.0.1').to.not.be.an.ipv6;
expect('2001:0db8:85a3:0000:0000:8a2e:0370:7334').to.be.an.ipv6;
```

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/github/workflow/status/dotcore64/chai-ip/test/master?style=flat-square
[build]: https://github.com/dotcore64/chai-ip/actions

[npm-badge]: https://img.shields.io/npm/v/chai-ip.svg?style=flat-square
[npm]: https://www.npmjs.org/package/chai-ip

[coveralls-badge]: https://img.shields.io/coveralls/dotcore64/chai-ip/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/dotcore64/chai-ip

[dependency-status-badge]: https://david-dm.org/dotcore64/chai-ip.svg?style=flat-square
[dependency-status]: https://david-dm.org/dotcore64/chai-ip

[dev-dependency-status-badge]: https://david-dm.org/dotcore64/chai-ip/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/dotcore64/chai-ip#info=devDependencies
