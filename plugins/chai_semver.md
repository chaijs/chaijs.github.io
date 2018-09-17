---
layout: plugin
permalink: plugins/chai-semver/
pluginName: chai-semver
---

# chai-semver
<p align="center">
  <a href='https://travis-ci.org/sofalse/chai-semver'><img src='https://travis-ci.org/sofalse/chai-semver.svg?branch=master' alt='Build Status' /></a>
  <a href='https://coveralls.io/github/sofalse/chai-semver?branch=master'><img src='https://coveralls.io/repos/github/sofalse/chai-semver/badge.svg?branch=master' alt='Coverage Status' /></a>
  <a href="https://badge.fury.io/js/chai-semver"><img src="https://badge.fury.io/js/chai-semver.svg" alt="npm version" height="18"></a>
  <a href='https://app.fossa.io/projects/git%2Bgithub.com%2Fsofalse%2Fchai-semver?ref=badge_shield'><img src='https://app.fossa.io/api/projects/git%2Bgithub.com%2Fsofalse%2Fchai-semver.svg?type=shield' alt='FOSSA Status' /></a>
</p>

Semver plugin for Chai

## Installation

```
npm install -D chai-semver
```

Then setup your unit test:
```javascript
const chai = require('chai')
const chaiSemver = require('chai-semver')

chai.use(chaiSemver)

```

## Assertions

```javascript
expect('1.2.0').to.be.semver() // passes if given string is in semver format, rejects if not
'1.6.3'.should.be.semver() // equivalent
expect('1.2.0').to.satisfySemver('>1.0.3') // passes if given string is in given version range, rejects if not
```

## License
This plugin is being released under MIT license.


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fsofalse%2Fchai-semver.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fsofalse%2Fchai-semver?ref=badge_large)
